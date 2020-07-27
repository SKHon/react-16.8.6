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

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var currentTime = 0,
  scheduledCallback = null,
  scheduledCallbackExpiration = -1,
  yieldedValues = null,
  expectedNumberOfYields = -1,
  didStop = !1,
  isFlushing = !1;
function shouldYieldToHost() {
  return (-1 !== expectedNumberOfYields &&
    null !== yieldedValues &&
    yieldedValues.length >= expectedNumberOfYields) ||
    (-1 !== scheduledCallbackExpiration &&
      scheduledCallbackExpiration <= currentTime)
    ? (didStop = !0)
    : !1;
}
function unstable_flushExpired() {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    var cb = scheduledCallback;
    scheduledCallback = null;
    isFlushing = !0;
    try {
      cb(!0);
    } finally {
      isFlushing = !1;
    }
  }
}
function unstable_flushWithoutYielding() {
  if (isFlushing) throw Error("Already flushing work.");
  isFlushing = !0;
  try {
    for (; null !== scheduledCallback; ) {
      var cb = scheduledCallback;
      scheduledCallback = null;
      cb(
        -1 !== scheduledCallbackExpiration &&
          scheduledCallbackExpiration <= currentTime
      );
    }
  } finally {
    (expectedNumberOfYields = -1), (isFlushing = didStop = !1);
  }
}
var firstCallbackNode = null,
  currentHostCallbackDidTimeout = !1,
  isSchedulerPaused = !1,
  currentPriorityLevel = 3,
  currentEventStartTime = -1,
  currentExpirationTime = -1,
  isPerformingWork = !1,
  isHostCallbackScheduled = !1;
function scheduleHostCallbackIfNeeded() {
  if (!isPerformingWork && null !== firstCallbackNode) {
    var expirationTime = firstCallbackNode.expirationTime;
    isHostCallbackScheduled
      ? ((scheduledCallback = null), (scheduledCallbackExpiration = -1))
      : (isHostCallbackScheduled = !0);
    scheduledCallback = flushWork;
    scheduledCallbackExpiration = expirationTime;
  }
}
function flushFirstCallback() {
  var currentlyFlushingCallback = firstCallbackNode,
    next = firstCallbackNode.next;
  if (firstCallbackNode === next) firstCallbackNode = null;
  else {
    var lastCallbackNode = firstCallbackNode.previous;
    firstCallbackNode = lastCallbackNode.next = next;
    next.previous = lastCallbackNode;
  }
  currentlyFlushingCallback.next = currentlyFlushingCallback.previous = null;
  lastCallbackNode = currentlyFlushingCallback.callback;
  next = currentlyFlushingCallback.expirationTime;
  currentlyFlushingCallback = currentlyFlushingCallback.priorityLevel;
  var previousPriorityLevel = currentPriorityLevel,
    previousExpirationTime = currentExpirationTime;
  currentPriorityLevel = currentlyFlushingCallback;
  currentExpirationTime = next;
  try {
    var continuationCallback = lastCallbackNode(
      currentHostCallbackDidTimeout || 1 === currentlyFlushingCallback
    );
  } catch (error) {
    throw error;
  } finally {
    (currentPriorityLevel = previousPriorityLevel),
      (currentExpirationTime = previousExpirationTime);
  }
  if ("function" === typeof continuationCallback)
    if (
      ((continuationCallback = {
        callback: continuationCallback,
        priorityLevel: currentlyFlushingCallback,
        expirationTime: next,
        next: null,
        previous: null
      }),
      null === firstCallbackNode)
    )
      firstCallbackNode = continuationCallback.next = continuationCallback.previous = continuationCallback;
    else {
      lastCallbackNode = null;
      currentlyFlushingCallback = firstCallbackNode;
      do {
        if (currentlyFlushingCallback.expirationTime >= next) {
          lastCallbackNode = currentlyFlushingCallback;
          break;
        }
        currentlyFlushingCallback = currentlyFlushingCallback.next;
      } while (currentlyFlushingCallback !== firstCallbackNode);
      null === lastCallbackNode
        ? (lastCallbackNode = firstCallbackNode)
        : lastCallbackNode === firstCallbackNode &&
          ((firstCallbackNode = continuationCallback),
          scheduleHostCallbackIfNeeded());
      next = lastCallbackNode.previous;
      next.next = lastCallbackNode.previous = continuationCallback;
      continuationCallback.next = lastCallbackNode;
      continuationCallback.previous = next;
    }
}
function flushWork(didUserCallbackTimeout) {
  if (!isSchedulerPaused) {
    isHostCallbackScheduled = !1;
    isPerformingWork = !0;
    var previousDidTimeout = currentHostCallbackDidTimeout;
    currentHostCallbackDidTimeout = didUserCallbackTimeout;
    try {
      if (didUserCallbackTimeout)
        for (; null !== firstCallbackNode && !isSchedulerPaused; )
          if (
            ((didUserCallbackTimeout = currentTime),
            firstCallbackNode.expirationTime <= didUserCallbackTimeout)
          ) {
            do flushFirstCallback();
            while (
              null !== firstCallbackNode &&
              firstCallbackNode.expirationTime <= didUserCallbackTimeout &&
              !isSchedulerPaused
            );
          } else break;
      else if (null !== firstCallbackNode) {
        do {
          if (isSchedulerPaused) break;
          flushFirstCallback();
        } while (null !== firstCallbackNode && !shouldYieldToHost());
      }
    } finally {
      (isPerformingWork = !1),
        (currentHostCallbackDidTimeout = previousDidTimeout),
        scheduleHostCallbackIfNeeded();
    }
  }
}
exports.unstable_flushWithoutYielding = unstable_flushWithoutYielding;
exports.unstable_flushNumberOfYields = function(count) {
  if (isFlushing) throw Error("Already flushing work.");
  expectedNumberOfYields = count;
  isFlushing = !0;
  try {
    for (; null !== scheduledCallback && !didStop; )
      (count = scheduledCallback),
        (scheduledCallback = null),
        count(
          -1 !== scheduledCallbackExpiration &&
            scheduledCallbackExpiration <= currentTime
        );
  } finally {
    (expectedNumberOfYields = -1), (isFlushing = didStop = !1);
  }
};
exports.unstable_flushExpired = unstable_flushExpired;
exports.unstable_clearYields = function() {
  if (null === yieldedValues) return [];
  var values = yieldedValues;
  yieldedValues = null;
  return values;
};
exports.flushAll = function() {
  if (null !== yieldedValues)
    throw Error(
      "Log is not empty. Assert on the log of yielded values before flushing additional work."
    );
  unstable_flushWithoutYielding();
  if (null !== yieldedValues)
    throw Error(
      "While flushing work, something yielded a value. Use an assertion helper to assert on the log of yielded values, e.g. expect(Scheduler).toFlushAndYield([...])"
    );
};
exports.yieldValue = function(value) {
  null === yieldedValues
    ? (yieldedValues = [value])
    : yieldedValues.push(value);
};
exports.advanceTime = function(ms) {
  currentTime += ms;
  !isFlushing &&
    -1 !== scheduledCallbackExpiration &&
    scheduledCallbackExpiration <= currentTime &&
    unstable_flushExpired();
};
exports.unstable_ImmediatePriority = 1;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_NormalPriority = 3;
exports.unstable_IdlePriority = 5;
exports.unstable_LowPriority = 4;
exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  var previousPriorityLevel = currentPriorityLevel,
    previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = currentTime;
  try {
    return eventHandler();
  } catch (error) {
    throw (scheduleHostCallbackIfNeeded(), error);
  } finally {
    (currentPriorityLevel = previousPriorityLevel),
      (currentEventStartTime = previousEventStartTime);
  }
};
exports.unstable_next = function(eventHandler) {
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      var priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  var previousPriorityLevel = currentPriorityLevel,
    previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = currentTime;
  try {
    return eventHandler();
  } catch (error) {
    throw (scheduleHostCallbackIfNeeded(), error);
  } finally {
    (currentPriorityLevel = previousPriorityLevel),
      (currentEventStartTime = previousEventStartTime);
  }
};
exports.unstable_scheduleCallback = function(
  priorityLevel,
  callback,
  deprecated_options
) {
  var startTime =
    -1 !== currentEventStartTime ? currentEventStartTime : currentTime;
  if (
    "object" === typeof deprecated_options &&
    null !== deprecated_options &&
    "number" === typeof deprecated_options.timeout
  )
    deprecated_options = startTime + deprecated_options.timeout;
  else
    switch (priorityLevel) {
      case 1:
        deprecated_options = startTime + -1;
        break;
      case 2:
        deprecated_options = startTime + 250;
        break;
      case 5:
        deprecated_options = startTime + 1073741823;
        break;
      case 4:
        deprecated_options = startTime + 1e4;
        break;
      default:
        deprecated_options = startTime + 5e3;
    }
  priorityLevel = {
    callback: callback,
    priorityLevel: priorityLevel,
    expirationTime: deprecated_options,
    next: null,
    previous: null
  };
  if (null === firstCallbackNode)
    (firstCallbackNode = priorityLevel.next = priorityLevel.previous = priorityLevel),
      scheduleHostCallbackIfNeeded();
  else {
    callback = null;
    startTime = firstCallbackNode;
    do {
      if (startTime.expirationTime > deprecated_options) {
        callback = startTime;
        break;
      }
      startTime = startTime.next;
    } while (startTime !== firstCallbackNode);
    null === callback
      ? (callback = firstCallbackNode)
      : callback === firstCallbackNode &&
        ((firstCallbackNode = priorityLevel), scheduleHostCallbackIfNeeded());
    deprecated_options = callback.previous;
    deprecated_options.next = callback.previous = priorityLevel;
    priorityLevel.next = callback;
    priorityLevel.previous = deprecated_options;
  }
  return priorityLevel;
};
exports.unstable_cancelCallback = function(callbackNode) {
  var next = callbackNode.next;
  if (null !== next) {
    if (next === callbackNode) firstCallbackNode = null;
    else {
      callbackNode === firstCallbackNode && (firstCallbackNode = next);
      var previous = callbackNode.previous;
      previous.next = next;
      next.previous = previous;
    }
    callbackNode.next = callbackNode.previous = null;
  }
};
exports.unstable_wrapCallback = function(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function() {
    var previousPriorityLevel = currentPriorityLevel,
      previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = parentPriorityLevel;
    currentEventStartTime = currentTime;
    try {
      return callback.apply(this, arguments);
    } catch (error) {
      throw (scheduleHostCallbackIfNeeded(), error);
    } finally {
      (currentPriorityLevel = previousPriorityLevel),
        (currentEventStartTime = previousEventStartTime);
    }
  };
};
exports.unstable_getCurrentPriorityLevel = function() {
  return currentPriorityLevel;
};
exports.unstable_shouldYield = function() {
  return (
    !currentHostCallbackDidTimeout &&
    ((null !== firstCallbackNode &&
      firstCallbackNode.expirationTime < currentExpirationTime) ||
      shouldYieldToHost())
  );
};
exports.unstable_continueExecution = function() {
  isSchedulerPaused = !1;
  null !== firstCallbackNode && scheduleHostCallbackIfNeeded();
};
exports.unstable_pauseExecution = function() {
  isSchedulerPaused = !0;
};
exports.unstable_getFirstCallbackNode = function() {
  return firstCallbackNode;
};
exports.unstable_now = function() {
  return currentTime;
};
