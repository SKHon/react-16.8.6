/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @preventMunge
 * @preserve-invariant-messages
 */

'use strict';

if (__DEV__) {
  (function() {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var enableSchedulerDebugging = true;

// The DOM Scheduler implementation is similar to requestIdleCallback. It
// works by scheduling a requestAnimationFrame, storing the time for the start
// of the frame, then scheduling a postMessage which gets scheduled after paint.
// Within the postMessage handler do as much work as possible until time + frame
// rate. By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

var requestHostCallback = void 0;
var cancelHostCallback = void 0;
var shouldYieldToHost = void 0;
exports.unstable_now = void 0;

var hasNativePerformanceNow =
  typeof performance === "object" && typeof performance.now === "function";

// We capture a local reference to any global, in case it gets polyfilled after
// this module is initially evaluated. We want to be using a
// consistent implementation.
var localDate = Date;

// This initialization code may run even on server environments if a component
// just imports ReactDOM (e.g. for findDOMNode). Some environments might not
// have setTimeout or clearTimeout. However, we always expect them to be defined
// on the client. https://github.com/facebook/react/pull/13088
var localSetTimeout = typeof setTimeout === "function" ? setTimeout : undefined;
var localClearTimeout =
  typeof clearTimeout === "function" ? clearTimeout : undefined;

// We don't expect either of these to necessarily be defined, but we will error
// later if they are missing on the client.
var localRequestAnimationFrame =
  typeof requestAnimationFrame === "function"
    ? requestAnimationFrame
    : undefined;
var localCancelAnimationFrame =
  typeof cancelAnimationFrame === "function" ? cancelAnimationFrame : undefined;

// requestAnimationFrame does not run when the tab is in the background. If
// we're backgrounded we prefer for that work to happen so that the page
// continues to load in the background. So we also schedule a 'setTimeout' as
// a fallback.
// TODO: Need a better heuristic for backgrounded work.
var ANIMATION_FRAME_TIMEOUT = 100;
var rAFID = void 0;
var rAFTimeoutID = void 0;
var requestAnimationFrameWithTimeout = function(callback) {
  // schedule rAF and also a setTimeout
  // 这里的 local 开头的函数指的是 request​Animation​Frame 及 setTimeout
  // request​Animation​Frame 只有页面在前台时才会执行回调
  // 如果页面在后台时就不会执行回调，这时候会通过 setTimeout 来保证执行 callback
  // 两个回调中都可以互相 cancel 定时器
  // callback 指的是 animationTick
  rAFID = localRequestAnimationFrame(function(timestamp) {
    // cancel the setTimeout
    localClearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = localSetTimeout(function() {
    // cancel the requestAnimationFrame
    localCancelAnimationFrame(rAFID);
    callback(exports.unstable_now());
  }, ANIMATION_FRAME_TIMEOUT);
};

if (hasNativePerformanceNow) {
  var Performance = performance;
  exports.unstable_now = function() {
    return Performance.now();
  };
} else {
  exports.unstable_now = function() {
    return localDate.now();
  };
}

if (
  // If Scheduler runs in a non-DOM environment, it falls back to a naive
  // implementation using setTimeout.
  typeof window === "undefined" ||
  // Check if MessageChannel is supported, too.
  typeof MessageChannel !== "function"
) {
  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
  // fallback to a naive implementation.
  var _callback = null;
  var _flushCallback = function(didTimeout) {
    if (_callback !== null) {
      try {
        _callback(didTimeout);
      } finally {
        _callback = null;
      }
    }
  };
  requestHostCallback = function(cb, ms) {
    if (_callback !== null) {
      // Protect against re-entrancy.
      setTimeout(requestHostCallback, 0, cb);
    } else {
      _callback = cb;
      setTimeout(_flushCallback, 0, false);
    }
  };
  cancelHostCallback = function() {
    _callback = null;
  };
  shouldYieldToHost = function() {
    return false;
  };
} else {
  if (typeof console !== "undefined") {
    // TODO: Remove fb.me link
    if (typeof localRequestAnimationFrame !== "function") {
      console.error(
        "This browser doesn't support requestAnimationFrame. " +
          "Make sure that you load a " +
          "polyfill in older browsers. https://fb.me/react-polyfills"
      );
    }
    if (typeof localCancelAnimationFrame !== "function") {
      console.error(
        "This browser doesn't support cancelAnimationFrame. " +
          "Make sure that you load a " +
          "polyfill in older browsers. https://fb.me/react-polyfills"
      );
    }
  }

  var scheduledHostCallback = null;
  var isMessageEventScheduled = false;
  var timeoutTime = -1;

  var isAnimationFrameScheduled = false;

  var isFlushingHostCallback = false;

  var frameDeadline = 0;
  // We start out assuming that we run at 30fps but then the heuristic tracking
  // will adjust this value to a faster fps if we get more frequent animation
  // frames.
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  shouldYieldToHost = function() {
    return frameDeadline <= exports.unstable_now();
  };

  // We use the postMessage trick to defer idle work until after the repaint.
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = function(event) {
    // 一些变量的设置
    isMessageEventScheduled = false;

    var prevScheduledCallback = scheduledHostCallback;
    var prevTimeoutTime = timeoutTime;
    scheduledHostCallback = null;
    timeoutTime = -1;
    // 获取当前时间
    var currentTime = exports.unstable_now();

    var didTimeout = false;
    // 判断之前计算的时间是否小于当前时间，时间超了也就代表在 onmessage 之前执行任务所需时间过长
    if (frameDeadline - currentTime <= 0) {
      // There's no time left in this idle period. Check if the callback has
      // a timeout and whether it's been exceeded.
      // 判断当前任务是否过期
      if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
        // Exceeded the timeout. Invoke the callback even though there's no
        // time left.
        didTimeout = true;
      } else {
        // No timeout.
        // 没过期的话再丢到下一帧去执行
        if (!isAnimationFrameScheduled) {
          // Schedule another animation callback so we retry later.
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout(animationTick);
        }
        // Exit without invoking the callback.
        scheduledHostCallback = prevScheduledCallback;
        timeoutTime = prevTimeoutTime;
        return;
      }
    }
    // 最后执行 flushWork，onmessage 中涉及到的 callback 全是 flushWork
    if (prevScheduledCallback !== null) {
      isFlushingHostCallback = true;
      try {
        prevScheduledCallback(didTimeout);
      } finally {
        isFlushingHostCallback = false;
      }
    }
  };

  var animationTick = function(rafTime) {
    // scheduledHostCallback 指的是 flushWork，是 requestHostCallback 函数传进来的
    if (scheduledHostCallback !== null) {
      // Eagerly schedule the next animation callback at the beginning of the
      // frame. If the scheduler queue is not empty at the end of the frame, it
      // will continue flushing inside that callback. If the queue *is* empty,
      // then it will exit immediately. Posting the callback at the start of the
      // frame ensures it's fired within the earliest possible frame. If we
      // waited until the end of the frame to post the callback, we risk the
      // browser skipping a frame and not firing the callback until the frame
      // after that.
      // scheduledHostCallback 不为空的话就继续递归
      // 但是注意这里的递归并不是同步的，下一帧的时候才会再执行 animationTick
      requestAnimationFrameWithTimeout(animationTick);
    } else {
      // No pending work. Exit.
      isAnimationFrameScheduled = false;
      return;
    }
    // rafTime 就是 performance.now()，无论是执行哪个定时器
    // 假如我们应用第一次执行 animationTick，那么 frameDeadline = 0 activeFrameTime = 33
    // 也就是说此时 nextFrameTime = performance.now() + 33
    // 便于后期计算，我们假设 nextFrameTime = 5000 + 33 = 5033
    // 然后 activeFrameTime 为什么是 33 呢？因为 React 这里假设你的刷新率是 30hz
    // 一秒对应 1000 毫秒，1000 / 30 ≈ 33
    // ------------------------------- 以下注释是第二次的
    // 第二次进来这里执行，因为 animationTick 回调肯定是下一帧执行的，假如我们屏幕是 60hz 的刷新率
    // 那么一帧的时间为 1000 / 60 ≈ 16
    // 此时 nextFrameTime = 5000 + 16 - 5033 + 33 = 16
    // ------------------------------- 以下注释是第三次的
    // nextFrameTime = 5000 + 16 * 2 - 5048 + 33 = 17
    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    // 这个 if 条件第一次肯定进不去
    // ------------------------------- 以下注释是第二次的
    // 此时 16 < 33 && 5033 < 33 = false，也就是说第二帧的时候这个 if 条件还是进不去
    // ------------------------------- 以下注释是第三次的
    // 此时 17 < 33 && 16 < 33 = true，进条件了，也就是说如果刷新率大于 30hz，那么得等两帧才会调整 activeFrameTime
    if (
      nextFrameTime < activeFrameTime &&
      previousFrameTime < activeFrameTime
    ) {
      // 这里小于 8 的判断，是因为不能处理大于 120 hz 刷新率以上的浏览器了
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If the calculated frame time gets lower than 8, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      // 第三帧进来以后，activeFrameTime = 16 < 17 ? 16 : 17 = 16
      // 然后下次就按照一帧 16 毫秒来算了
      activeFrameTime =
        nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      // 第一次进来 5033
      // 第二次进来 16
      previousFrameTime = nextFrameTime;
    }
    //  第一次 frameDeadline = 5000 + 33 = 5033
    // ------------------------------- 以下注释是第二次的
    // frameDeadline = 5016 + 33 = 5048
    frameDeadline = rafTime + activeFrameTime;
    // 确保这一帧内不再 postMessage
    // postMessage 属于宏任务
    // const channel = new MessageChannel();
    // const port = channel.port2;
    // channel.port1.onmessage = function(event) {
    //   console.log(1)
    // }
    // requestAnimationFrame(function (timestamp) {
    //   setTimeout(function () {
    //     console.log('setTimeout')
    //   }, 0)
    //   port.postMessage(undefined)
    //   Promise.resolve(1).then(function (value) {
    //     console.log(value, 'Promise')
    //   })
    // })
    // 以上代码输出顺序为 Promise -> onmessage -> setTimeout
    // 由此可知微任务最先执行，然后是宏任务，并且在宏任务中也有顺序之分
    // onmessage 会优先于 setTimeout 回调执行
    // 对于浏览器来说，当我们执行 request​Animation​Frame 回调后
    // 会先让页面渲染，然后判断是否要执行微任务，最后执行宏任务，并且会先执行 onmessage
    // 当然其实比 onmessage 更快的宏任务是 set​Immediate，但是这个 API 只能在 IE 下使用
    if (!isMessageEventScheduled) {
      isMessageEventScheduled = true;
      port.postMessage(undefined);
    }
  };

  requestHostCallback = function(callback, absoluteTimeout) {
    scheduledHostCallback = callback;
    timeoutTime = absoluteTimeout;
    // isFlushingHostCallback 只在 channel.port1.onmessage 被设为 true
    // 也就是说当正在执行任务或者新进来的任务已经过了过期时间
    // 马上执行新的任务，不再等到下一帧
    if (isFlushingHostCallback || absoluteTimeout < 0) {
      // Don't wait for the next frame. Continue working ASAP, in a new event.
      // 发送消息，channel.port1.onmessage 会监听到消息并执行
      port.postMessage(undefined);
    } else if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      // isAnimationFrameScheduled 设为 true 的话就不会再进这个分支了
      // 但是内部会有机制确保 callback 执行
      isAnimationFrameScheduled = true;
      requestAnimationFrameWithTimeout(animationTick);
    }
  };

  cancelHostCallback = function() {
    scheduledHostCallback = null;
    isMessageEventScheduled = false;
    timeoutTime = -1;
  };
}

/* eslint-disable no-var */

// TODO: Use symbols?
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY = maxSigned31BitInt;

// Callbacks are stored as a circular, doubly linked list.
var firstCallbackNode = null;

var currentHostCallbackDidTimeout = false;
// Pausing the scheduler is useful for debugging.
var isSchedulerPaused = false;

var currentPriorityLevel = NormalPriority;
var currentEventStartTime = -1;
var currentExpirationTime = -1;

// This is set while performing work, to prevent re-entrancy.
var isPerformingWork = false;

var isHostCallbackScheduled = false;

function scheduleHostCallbackIfNeeded() {
  // 如果已经调用 flushWork 的话
  if (isPerformingWork) {
    // Don't schedule work yet; wait until the next time we yield.
    return;
  }
  if (firstCallbackNode !== null) {
    // Schedule the host callback using the earliest expiration in the list.
    var expirationTime = firstCallbackNode.expirationTime;
    if (isHostCallbackScheduled) {
      // Cancel the existing host callback.
      cancelHostCallback();
    } else {
      isHostCallbackScheduled = true;
    }
    requestHostCallback(flushWork, expirationTime);
  }
}

function flushFirstCallback() {
  var currentlyFlushingCallback = firstCallbackNode;

  // Remove the node from the list before calling the callback. That way the
  // list is in a consistent state even if the callback throws.
  // 链表操作
  var next = firstCallbackNode.next;
  if (firstCallbackNode === next) {
    // This is the last callback in the list.
    // 当前链表中只有一个节点
    firstCallbackNode = null;
    next = null;
  } else {
    // 有多个节点，重新赋值 firstCallbackNode，用于之前函数中下一次的 while 判断
    var lastCallbackNode = firstCallbackNode.previous;
    firstCallbackNode = lastCallbackNode.next = next;
    next.previous = lastCallbackNode;
  }
  // 清空指针
  currentlyFlushingCallback.next = currentlyFlushingCallback.previous = null;

  // Now it's safe to call the callback.
  // 这个 callback 是 performAsyncWork 函数
  var callback = currentlyFlushingCallback.callback;
  var expirationTime = currentlyFlushingCallback.expirationTime;
  var priorityLevel = currentlyFlushingCallback.priorityLevel;
  var previousPriorityLevel = currentPriorityLevel;
  var previousExpirationTime = currentExpirationTime;
  currentPriorityLevel = priorityLevel;
  currentExpirationTime = expirationTime;
  var continuationCallback;
  try {
    var didUserCallbackTimeout =
      currentHostCallbackDidTimeout ||
      // Immediate priority callbacks are always called as if they timed out
      priorityLevel === ImmediatePriority;
    continuationCallback = callback(didUserCallbackTimeout);
  } catch (error) {
    throw error;
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentExpirationTime = previousExpirationTime;
  }

  // A callback may return a continuation. The continuation should be scheduled
  // with the same priority and expiration as the just-finished callback.
  // performAsyncWork 并不会返回任何值，所以这个条件也进不去
  // 但是代码我们还是看看的，核心其实和之前设置链表节点一样
  // 生成一个新节点，判断两个节点的优先级
  if (typeof continuationCallback === "function") {
    var continuationNode = {
      callback: continuationCallback,
      priorityLevel: priorityLevel,
      expirationTime: expirationTime,
      next: null,
      previous: null
    };

    // Insert the new callback into the list, sorted by its expiration. This is
    // almost the same as the code in `scheduleCallback`, except the callback
    // is inserted into the list *before* callbacks of equal expiration instead
    // of after.
    if (firstCallbackNode === null) {
      // This is the first callback in the list.
      firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
    } else {
      var nextAfterContinuation = null;
      var node = firstCallbackNode;
      do {
        if (node.expirationTime >= expirationTime) {
          // This callback expires at or after the continuation. We will insert
          // the continuation *before* this callback.
          nextAfterContinuation = node;
          break;
        }
        node = node.next;
      } while (node !== firstCallbackNode);

      if (nextAfterContinuation === null) {
        // No equal or lower priority callback was found, which means the new
        // callback is the lowest priority callback in the list.
        nextAfterContinuation = firstCallbackNode;
      } else if (nextAfterContinuation === firstCallbackNode) {
        // The new callback is the highest priority callback in the list.
        firstCallbackNode = continuationNode;
        scheduleHostCallbackIfNeeded();
      }

      var previous = nextAfterContinuation.previous;
      previous.next = nextAfterContinuation.previous = continuationNode;
      continuationNode.next = nextAfterContinuation;
      continuationNode.previous = previous;
    }
  }
}

function flushWork(didUserCallbackTimeout) {
  // Exit right away if we're currently paused
  if (enableSchedulerDebugging && isSchedulerPaused) {
    return;
  }

  // We'll need a new host callback the next time work is scheduled.
  // 一些变量的设置
  isHostCallbackScheduled = false;

  isPerformingWork = true;
  var previousDidTimeout = currentHostCallbackDidTimeout;
  currentHostCallbackDidTimeout = didUserCallbackTimeout;
  try {
    // 判断是否超时
    if (didUserCallbackTimeout) {
      // Flush all the expired callbacks without yielding.
      while (
        firstCallbackNode !== null &&
        !(enableSchedulerDebugging && isSchedulerPaused)
      ) {
        // TODO Wrap in feature flag
        // Read the current time. Flush all the callbacks that expire at or
        // earlier than that time. Then read the current time again and repeat.
        // This optimizes for as few performance.now calls as possible.
        // 超时的话，获取当前时间，判断任务是否过期，过期的话就执行任务
        // 并且判断下一个任务是否也已经过期
        var currentTime = exports.unstable_now();
        if (firstCallbackNode.expirationTime <= currentTime) {
          do {
            flushFirstCallback();
          } while (
            firstCallbackNode !== null &&
            firstCallbackNode.expirationTime <= currentTime &&
            !(enableSchedulerDebugging && isSchedulerPaused)
          );
          continue;
        }
        break;
      }
    } else {
      // Keep flushing callbacks until we run out of time in the frame.
      // 没有超时说明还有时间可以执行任务，执行任务完成后继续判断
      if (firstCallbackNode !== null) {
        do {
          if (enableSchedulerDebugging && isSchedulerPaused) {
            break;
          }
          flushFirstCallback();
          // !shouldYieldToHost 就是判断 frameDeadline > getCurrentTime()，也就是判断当前帧是否还有时间
        } while (firstCallbackNode !== null && !shouldYieldToHost());
      }
    }
  } finally {
    isPerformingWork = false;
    currentHostCallbackDidTimeout = previousDidTimeout;
    // There's still work remaining. Request another callback.
    scheduleHostCallbackIfNeeded();
  }
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = exports.unstable_now();

  try {
    return eventHandler();
  } catch (error) {
    // There's still work remaining. Request another callback.
    scheduleHostCallbackIfNeeded();
    throw error;
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;
  }
}

function unstable_next(eventHandler) {
  var priorityLevel = void 0;
  switch (currentPriorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
      // Shift down to normal priority
      priorityLevel = NormalPriority;
      break;
    default:
      // Anything lower than normal priority should remain at the current level.
      priorityLevel = currentPriorityLevel;
      break;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = exports.unstable_now();

  try {
    return eventHandler();
  } catch (error) {
    // There's still work remaining. Request another callback.
    scheduleHostCallbackIfNeeded();
    throw error;
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;
  }
}

function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function() {
    // This is a fork of runWithPriority, inlined for performance.
    var previousPriorityLevel = currentPriorityLevel;
    var previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = parentPriorityLevel;
    currentEventStartTime = exports.unstable_now();

    try {
      return callback.apply(this, arguments);
    } catch (error) {
      // There's still work remaining. Request another callback.
      scheduleHostCallbackIfNeeded();
      throw error;
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentEventStartTime = previousEventStartTime;
    }
  };
}

function unstable_scheduleCallback(
  priorityLevel,
  callback,
  deprecated_options
) {
  var startTime =
    currentEventStartTime !== -1
      ? currentEventStartTime
      : exports.unstable_now();
  // 这里其实只会进第一个 if 条件，因为外部写死了一定会传 deprecated_options.timeout
  // 接下来的 expirationTime 和之前的逻辑就反过来了
  // 变成越小优先级越高了，同时也代表一个任务的过期时间
  var expirationTime;
  if (
    typeof deprecated_options === "object" &&
    deprecated_options !== null &&
    typeof deprecated_options.timeout === "number"
  ) {
    // FIXME: Remove this branch once we lift expiration times out of React.
    expirationTime = startTime + deprecated_options.timeout;
  } else {
    // 其实我觉得这部分代码好理解多了，通过优先级来定过期时间，不用去算那个 timeout
    // 说实话计算那个时间真的看得我头疼。。
    switch (priorityLevel) {
      case ImmediatePriority:
        expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
        break;
      case UserBlockingPriority:
        expirationTime = startTime + USER_BLOCKING_PRIORITY;
        break;
      case IdlePriority:
        expirationTime = startTime + IDLE_PRIORITY;
        break;
      case LowPriority:
        expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
        break;
      case NormalPriority:
      default:
        expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
    }
  }
  // 环形双向链表结构，下面就是考验大家数据结构功底的时候了
  var newNode = {
    callback: callback,
    priorityLevel: priorityLevel,
    expirationTime: expirationTime,
    next: null,
    previous: null
  };

  // Insert the new callback into the list, ordered first by expiration, then
  // by insertion. So the new callback is inserted any other callback with
  // equal expiration.
  // 看不懂代码的话，就自己谷歌一下环形双向链表是怎么实现的，这里我就不解析实现了了
  // 核心思路就是 firstCallbackNode 优先级最高 lastCallbackNode 优先级最低
  // 新生成一个 newNode 以后，就从头开始比较优先级
  // 如果新的高，就把新的往前插入，否则就往后插，直到没有一个 node 的优先级比他低
  // 那么新的节点就变成 lastCallbackNode
  // 除了改变 lastCallbackNode 的情况，其他情况都需要重新调度，因为调度必须从 firstCallbackNode 开始
  if (firstCallbackNode === null) {
    // This is the first callback in the list.
    firstCallbackNode = newNode.next = newNode.previous = newNode;
    scheduleHostCallbackIfNeeded();
  } else {
    var next = null;
    var node = firstCallbackNode;
    do {
      if (node.expirationTime > expirationTime) {
        // The new callback expires before this one.
        next = node;
        break;
      }
      node = node.next;
    } while (node !== firstCallbackNode);

    if (next === null) {
      // No callback with a later expiration was found, which means the new
      // callback has the latest expiration in the list.
      next = firstCallbackNode;
    } else if (next === firstCallbackNode) {
      // The new callback has the earliest expiration in the entire list.
      firstCallbackNode = newNode;
      scheduleHostCallbackIfNeeded();
    }

    var previous = next.previous;
    previous.next = next.previous = newNode;
    newNode.next = next;
    newNode.previous = previous;
  }

  return newNode;
}

function unstable_pauseExecution() {
  isSchedulerPaused = true;
}

function unstable_continueExecution() {
  isSchedulerPaused = false;
  if (firstCallbackNode !== null) {
    scheduleHostCallbackIfNeeded();
  }
}

function unstable_getFirstCallbackNode() {
  return firstCallbackNode;
}

function unstable_cancelCallback(callbackNode) {
  var next = callbackNode.next;
  if (next === null) {
    // Already cancelled.
    return;
  }

  if (next === callbackNode) {
    // This is the only scheduled callback. Clear the list.
    firstCallbackNode = null;
  } else {
    // Remove the callback from its position in the list.
    if (callbackNode === firstCallbackNode) {
      firstCallbackNode = next;
    }
    var previous = callbackNode.previous;
    previous.next = next;
    next.previous = previous;
  }

  callbackNode.next = callbackNode.previous = null;
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

function unstable_shouldYield() {
  return (
    !currentHostCallbackDidTimeout &&
    ((firstCallbackNode !== null &&
      firstCallbackNode.expirationTime < currentExpirationTime) ||
      shouldYieldToHost())
  );
}

exports.unstable_ImmediatePriority = ImmediatePriority;
exports.unstable_UserBlockingPriority = UserBlockingPriority;
exports.unstable_NormalPriority = NormalPriority;
exports.unstable_IdlePriority = IdlePriority;
exports.unstable_LowPriority = LowPriority;
exports.unstable_runWithPriority = unstable_runWithPriority;
exports.unstable_next = unstable_next;
exports.unstable_scheduleCallback = unstable_scheduleCallback;
exports.unstable_cancelCallback = unstable_cancelCallback;
exports.unstable_wrapCallback = unstable_wrapCallback;
exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
exports.unstable_shouldYield = unstable_shouldYield;
exports.unstable_continueExecution = unstable_continueExecution;
exports.unstable_pauseExecution = unstable_pauseExecution;
exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;

  })();
}
