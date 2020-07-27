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
var React = require("react"),
  Transform = require("art/core/transform"),
  Mode = require("art/modes/current"),
  Scheduler = require("scheduler");
var FastNoSideEffects = require("art/modes/fast-noSideEffects");
function ReactErrorProd(code) {
  for (
    var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code,
      i = 1;
    i < arguments.length;
    i++
  )
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  return Error(
    "Minified React error #" +
      code +
      "; visit " +
      url +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings. "
  );
}
require("warning");
var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") ||
  (ReactSharedInternals.ReactCurrentDispatcher = { current: null });
var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.concurrent_mode")
    : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_EVENT_COMPONENT_TYPE = hasSymbol
    ? Symbol.for("react.event_component")
    : 60117,
  REACT_EVENT_TARGET_TYPE = hasSymbol
    ? Symbol.for("react.event_target")
    : 60118,
  REACT_EVENT_TARGET_TOUCH_HIT = hasSymbol
    ? Symbol.for("react.event_target.touch_hit")
    : 60119,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
function getComponentName(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_CONCURRENT_MODE_TYPE:
      return "ConcurrentMode";
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return "Context.Consumer";
      case REACT_PROVIDER_TYPE:
        return "Context.Provider";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        innerType = innerType.displayName || innerType.name || "";
        return (
          type.displayName ||
          ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef")
        );
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        if ((type = 1 === type._status ? type._result : null))
          return getComponentName(type);
        break;
      case REACT_EVENT_COMPONENT_TYPE:
        type = type.displayName;
        if (void 0 !== type) return type;
        break;
      case REACT_EVENT_TARGET_TYPE:
        if (type.type === REACT_EVENT_TARGET_TOUCH_HIT) return "TouchHitTarget";
        type = type.displayName;
        if (void 0 !== type) return type;
    }
  return null;
}
function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    if (0 !== (node.effectTag & 2)) return 1;
    for (; node.return; )
      if (((node = node.return), 0 !== (node.effectTag & 2))) return 1;
  }
  return 3 === node.tag ? 2 : 3;
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = isFiberMountedImpl(fiber);
    if (3 === alternate) throw ReactErrorProd(188);
    return 1 === alternate ? null : fiber;
  }
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB; ) {
        if (parentB === a) {
          if (2 !== isFiberMountedImpl(parentA)) break;
          return fiber;
        }
        if (parentB === b) {
          if (2 !== isFiberMountedImpl(parentA)) break;
          return alternate;
        }
        parentB = parentB.sibling;
      }
      throw ReactErrorProd(188);
    }
    if (a.return !== b.return) (a = parentA), (b = parentB);
    else {
      for (var didFindChild = !1, _child = parentA.child; _child; ) {
        if (_child === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        for (_child = parentB.child; _child; ) {
          if (_child === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        if (!didFindChild) throw ReactErrorProd(189);
      }
    }
    if (a.alternate !== b) throw ReactErrorProd(190);
  }
  if (3 !== a.tag) throw ReactErrorProd(188);
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiber(parent) {
  parent = findCurrentFiberUsingSlowPath(parent);
  if (!parent) return null;
  for (var node = parent; ; ) {
    if (5 === node.tag || 6 === node.tag) return node;
    if (node.child) (node.child.return = node), (node = node.child);
    else {
      if (node === parent) break;
      for (; !node.sibling; ) {
        if (!node.return || node.return === parent) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return null;
}
var TYPES = {
    CLIPPING_RECTANGLE: "ClippingRectangle",
    GROUP: "Group",
    SHAPE: "Shape",
    TEXT: "Text"
  },
  EVENT_TYPES = {
    onClick: "click",
    onMouseMove: "mousemove",
    onMouseOver: "mouseover",
    onMouseOut: "mouseout",
    onMouseUp: "mouseup",
    onMouseDown: "mousedown"
  };
function childrenAsString(children) {
  return children
    ? "string" === typeof children
      ? children
      : children.length
        ? children.join("")
        : ""
    : "";
}
function shim$1() {
  throw ReactErrorProd(305);
}
var pooledTransform = new Transform(),
  NO_CONTEXT = {},
  UPDATE_SIGNAL = {};
function createEventHandler(instance) {
  return function(event) {
    var listener = instance._listeners[event.type];
    listener &&
      ("function" === typeof listener
        ? listener.call(instance, event)
        : listener.handleEvent && listener.handleEvent(event));
  };
}
function destroyEventListeners(instance) {
  if (instance._subscriptions)
    for (var type in instance._subscriptions) instance._subscriptions[type]();
  instance._subscriptions = null;
  instance._listeners = null;
}
function applyClippingRectangleProps(instance, props) {
  applyNodeProps(
    instance,
    props,
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
  );
  instance.width = props.width;
  instance.height = props.height;
}
function applyGroupProps(instance, props) {
  applyNodeProps(
    instance,
    props,
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
  );
  instance.width = props.width;
  instance.height = props.height;
}
function applyNodeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  var scaleX =
    null != props.scaleX ? props.scaleX : null != props.scale ? props.scale : 1;
  var scaleY =
    null != props.scaleY ? props.scaleY : null != props.scale ? props.scale : 1;
  pooledTransform
    .transformTo(1, 0, 0, 1, 0, 0)
    .move(props.x || 0, props.y || 0)
    .rotate(props.rotation || 0, props.originX, props.originY)
    .scale(scaleX, scaleY, props.originX, props.originY);
  null != props.transform && pooledTransform.transform(props.transform);
  (instance.xx === pooledTransform.xx &&
    instance.yx === pooledTransform.yx &&
    instance.xy === pooledTransform.xy &&
    instance.yy === pooledTransform.yy &&
    instance.x === pooledTransform.x &&
    instance.y === pooledTransform.y) ||
    instance.transformTo(pooledTransform);
  (props.cursor === prevProps.cursor && props.title === prevProps.title) ||
    instance.indicate(props.cursor, props.title);
  instance.blend &&
    props.opacity !== prevProps.opacity &&
    instance.blend(null == props.opacity ? 1 : props.opacity);
  props.visible !== prevProps.visible &&
    (null == props.visible || props.visible
      ? instance.show()
      : instance.hide());
  for (var type in EVENT_TYPES)
    (prevProps = instance),
      (scaleX = EVENT_TYPES[type]),
      (scaleY = props[type]),
      prevProps._listeners ||
        ((prevProps._listeners = {}), (prevProps._subscriptions = {})),
      (prevProps._listeners[scaleX] = scaleY)
        ? prevProps._subscriptions[scaleX] ||
          (prevProps._subscriptions[scaleX] = prevProps.subscribe(
            scaleX,
            createEventHandler(prevProps),
            prevProps
          ))
        : prevProps._subscriptions[scaleX] &&
          (prevProps._subscriptions[scaleX](),
          delete prevProps._subscriptions[scaleX]);
}
function applyRenderableNodeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyNodeProps(instance, props, prevProps);
  prevProps.fill !== props.fill &&
    (props.fill && props.fill.applyFill
      ? props.fill.applyFill(instance)
      : instance.fill(props.fill));
  (prevProps.stroke === props.stroke &&
    prevProps.strokeWidth === props.strokeWidth &&
    prevProps.strokeCap === props.strokeCap &&
    prevProps.strokeJoin === props.strokeJoin &&
    prevProps.strokeDash === props.strokeDash) ||
    instance.stroke(
      props.stroke,
      props.strokeWidth,
      props.strokeCap,
      props.strokeJoin,
      props.strokeDash
    );
}
function applyShapeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyRenderableNodeProps(instance, props, prevProps);
  var path = props.d || childrenAsString(props.children),
    prevDelta = instance._prevDelta;
  if (
    path !== instance._prevPath ||
    path.delta !== prevDelta ||
    prevProps.height !== props.height ||
    prevProps.width !== props.width
  )
    instance.draw(path, props.width, props.height),
      (instance._prevDelta = path.delta),
      (instance._prevPath = path);
}
function applyTextProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyRenderableNodeProps(instance, props, prevProps);
  var string = props.children,
    JSCompiler_temp;
  if (!(JSCompiler_temp = instance._currentString !== string)) {
    JSCompiler_temp = props.font;
    var newFont = prevProps.font;
    JSCompiler_temp =
      JSCompiler_temp === newFont
        ? !0
        : "string" === typeof newFont || "string" === typeof JSCompiler_temp
          ? !1
          : newFont.fontSize === JSCompiler_temp.fontSize &&
            newFont.fontStyle === JSCompiler_temp.fontStyle &&
            newFont.fontVariant === JSCompiler_temp.fontVariant &&
            newFont.fontWeight === JSCompiler_temp.fontWeight &&
            newFont.fontFamily === JSCompiler_temp.fontFamily;
    JSCompiler_temp = !JSCompiler_temp;
  }
  if (
    JSCompiler_temp ||
    props.alignment !== prevProps.alignment ||
    props.path !== prevProps.path
  )
    instance.draw(string, props.font, props.alignment, props.path),
      (instance._currentString = string);
}
var scheduleTimeout = setTimeout,
  cancelTimeout = clearTimeout;
function shouldSetTextContent(type, props) {
  return (
    "string" === typeof props.children || "number" === typeof props.children
  );
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function getStackByFiberInDevAndProd(workInProgress) {
  var info = "";
  do {
    a: switch (workInProgress.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var JSCompiler_inline_result = "";
        break a;
      default:
        var owner = workInProgress._debugOwner,
          source = workInProgress._debugSource,
          name = getComponentName(workInProgress.type);
        JSCompiler_inline_result = null;
        owner && (JSCompiler_inline_result = getComponentName(owner.type));
        owner = name;
        name = "";
        source
          ? (name =
              " (at " +
              source.fileName.replace(BEFORE_SLASH_RE, "") +
              ":" +
              source.lineNumber +
              ")")
          : JSCompiler_inline_result &&
            (name = " (created by " + JSCompiler_inline_result + ")");
        JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
    }
    info += JSCompiler_inline_result;
    workInProgress = workInProgress.return;
  } while (workInProgress);
  return info;
}
var disableYielding = require("ReactFeatureFlags").disableYielding;
new Set();
var valueStack = [],
  index = -1;
function pop(cursor) {
  0 > index ||
    ((cursor.current = valueStack[index]), (valueStack[index] = null), index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {},
  contextStackCursor = { current: emptyContextObject },
  didPerformWorkStackCursor = { current: !1 },
  previousContext = emptyContextObject;
function getMaskedContext(workInProgress, unmaskedContext) {
  var contextTypes = workInProgress.type.contextTypes;
  if (!contextTypes) return emptyContextObject;
  var instance = workInProgress.stateNode;
  if (
    instance &&
    instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext
  )
    return instance.__reactInternalMemoizedMaskedChildContext;
  var context = {},
    key;
  for (key in contextTypes) context[key] = unmaskedContext[key];
  instance &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return context;
}
function isContextProvider(type) {
  type = type.childContextTypes;
  return null !== type && void 0 !== type;
}
function popContext(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function popTopLevelContextObject(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function pushTopLevelContextObject(fiber, context, didChange) {
  if (contextStackCursor.current !== emptyContextObject)
    throw ReactErrorProd(168);
  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
}
function processChildContext(fiber, type, parentContext) {
  var instance = fiber.stateNode;
  fiber = type.childContextTypes;
  if ("function" !== typeof instance.getChildContext) return parentContext;
  instance = instance.getChildContext();
  for (var contextKey in instance)
    if (!(contextKey in fiber))
      throw ReactErrorProd(
        108,
        getComponentName(type) || "Unknown",
        contextKey
      );
  return Object.assign({}, parentContext, instance);
}
function pushContextProvider(workInProgress) {
  var instance = workInProgress.stateNode;
  instance =
    (instance && instance.__reactInternalMemoizedMergedChildContext) ||
    emptyContextObject;
  previousContext = contextStackCursor.current;
  push(contextStackCursor, instance, workInProgress);
  push(
    didPerformWorkStackCursor,
    didPerformWorkStackCursor.current,
    workInProgress
  );
  return !0;
}
function invalidateContextProvider(workInProgress, type, didChange) {
  var instance = workInProgress.stateNode;
  if (!instance) throw ReactErrorProd(169);
  didChange
    ? ((type = processChildContext(workInProgress, type, previousContext)),
      (instance.__reactInternalMemoizedMergedChildContext = type),
      pop(didPerformWorkStackCursor, workInProgress),
      pop(contextStackCursor, workInProgress),
      push(contextStackCursor, type, workInProgress))
    : pop(didPerformWorkStackCursor, workInProgress);
  push(didPerformWorkStackCursor, didChange, workInProgress);
}
var onCommitFiberRoot = null,
  onCommitFiberUnmount = null;
function catchErrors(fn) {
  return function(arg) {
    try {
      return fn(arg);
    } catch (err) {}
  };
}
function injectInternals(internals) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled || !hook.supportsFiber) return !0;
  try {
    var rendererID = hook.inject(internals);
    onCommitFiberRoot = catchErrors(function(root) {
      return hook.onCommitFiberRoot(rendererID, root);
    });
    onCommitFiberUnmount = catchErrors(function(fiber) {
      return hook.onCommitFiberUnmount(rendererID, fiber);
    });
  } catch (err) {}
  return !0;
}
function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  bucketSizeMs /= 10;
  return (
    1073741822 -
    ((((1073741822 - currentTime + expirationInMs / 10) / bucketSizeMs) | 0) +
      1) *
      bucketSizeMs
  );
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.contextDependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}
function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component)
    return shouldConstruct(Component) ? 1 : 0;
  if (void 0 !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component === REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
  }
  return 2;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress
    ? ((workInProgress = createFiber(
        current.tag,
        pendingProps,
        current.key,
        current.mode
      )),
      (workInProgress.elementType = current.elementType),
      (workInProgress.type = current.type),
      (workInProgress.stateNode = current.stateNode),
      (workInProgress.alternate = current),
      (current.alternate = workInProgress))
    : ((workInProgress.pendingProps = pendingProps),
      (workInProgress.effectTag = 0),
      (workInProgress.nextEffect = null),
      (workInProgress.firstEffect = null),
      (workInProgress.lastEffect = null));
  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.contextDependencies = current.contextDependencies;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress;
}
function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  expirationTime
) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(
          pendingProps.children,
          mode,
          expirationTime,
          key
        );
      case REACT_CONCURRENT_MODE_TYPE:
        return createFiberFromMode(pendingProps, mode | 3, expirationTime, key);
      case REACT_STRICT_MODE_TYPE:
        return createFiberFromMode(pendingProps, mode | 2, expirationTime, key);
      case REACT_PROFILER_TYPE:
        return (
          (type = createFiber(12, pendingProps, key, mode | 4)),
          (type.elementType = REACT_PROFILER_TYPE),
          (type.type = REACT_PROFILER_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_TYPE:
        return (
          (type = createFiber(13, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_TYPE),
          (type.type = REACT_SUSPENSE_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONTEXT_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
            case REACT_EVENT_COMPONENT_TYPE:
              return (
                (key = createFiber(19, pendingProps, key, mode)),
                (key.elementType = type),
                (key.type = type),
                (key.stateNode = {
                  context: null,
                  props: pendingProps,
                  rootInstance: null,
                  state: null
                }),
                (key.expirationTime = expirationTime),
                key
              );
            case REACT_EVENT_TARGET_TYPE:
              return (
                (pendingProps = createFiber(20, pendingProps, key, mode)),
                (pendingProps.elementType = type),
                (pendingProps.type = type),
                (pendingProps.expirationTime = expirationTime),
                pendingProps
              );
          }
        throw ReactErrorProd(130, null == type ? type : typeof type, "");
    }
  pendingProps = createFiber(fiberTag, pendingProps, key, mode);
  pendingProps.elementType = type;
  pendingProps.type = owner;
  pendingProps.expirationTime = expirationTime;
  return pendingProps;
}
function createFiberFromFragment(elements, mode, expirationTime, key) {
  elements = createFiber(7, elements, key, mode);
  elements.expirationTime = expirationTime;
  return elements;
}
function createFiberFromMode(pendingProps, mode, expirationTime, key) {
  pendingProps = createFiber(8, pendingProps, key, mode);
  mode = 0 === (mode & 1) ? REACT_STRICT_MODE_TYPE : REACT_CONCURRENT_MODE_TYPE;
  pendingProps.elementType = mode;
  pendingProps.type = mode;
  pendingProps.expirationTime = expirationTime;
  return pendingProps;
}
function createFiberFromText(content, mode, expirationTime) {
  content = createFiber(6, content, null, mode);
  content.expirationTime = expirationTime;
  return content;
}
function createFiberFromPortal(portal, mode, expirationTime) {
  mode = createFiber(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.expirationTime = expirationTime;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function FiberRootNode(containerInfo, hydrate) {
  this.current = null;
  this.containerInfo = containerInfo;
  this.pingCache = this.pendingChildren = null;
  this.pendingCommitExpirationTime = 0;
  this.finishedWork = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.firstBatch = null;
  this.latestPingedTime = this.latestSuspendedTime = this.earliestSuspendedTime = this.latestPendingTime = this.earliestPendingTime = 0;
  this.didError = !1;
  this.expirationTime = this.nextExpirationTimeToWorkOn = 0;
  this.nextScheduledRoot = null;
}
if ("function" !== typeof require("ReactFbErrorUtils").invokeGuardedCallback)
  throw ReactErrorProd(255);
require("lowPriorityWarning");
function markPendingPriorityLevel(root, expirationTime) {
  root.didError = !1;
  var earliestPendingTime = root.earliestPendingTime;
  0 === earliestPendingTime
    ? (root.earliestPendingTime = root.latestPendingTime = expirationTime)
    : earliestPendingTime < expirationTime
      ? (root.earliestPendingTime = expirationTime)
      : root.latestPendingTime > expirationTime &&
        (root.latestPendingTime = expirationTime);
  findNextExpirationTimeToWorkOn(expirationTime, root);
}
function markSuspendedPriorityLevel(root, suspendedTime) {
  root.didError = !1;
  root.latestPingedTime >= suspendedTime && (root.latestPingedTime = 0);
  var earliestPendingTime = root.earliestPendingTime,
    latestPendingTime = root.latestPendingTime;
  earliestPendingTime === suspendedTime
    ? (root.earliestPendingTime =
        latestPendingTime === suspendedTime
          ? (root.latestPendingTime = 0)
          : latestPendingTime)
    : latestPendingTime === suspendedTime &&
      (root.latestPendingTime = earliestPendingTime);
  earliestPendingTime = root.earliestSuspendedTime;
  latestPendingTime = root.latestSuspendedTime;
  0 === earliestPendingTime
    ? (root.earliestSuspendedTime = root.latestSuspendedTime = suspendedTime)
    : earliestPendingTime < suspendedTime
      ? (root.earliestSuspendedTime = suspendedTime)
      : latestPendingTime > suspendedTime &&
        (root.latestSuspendedTime = suspendedTime);
  findNextExpirationTimeToWorkOn(suspendedTime, root);
}
function findEarliestOutstandingPriorityLevel(root, renderExpirationTime) {
  var earliestPendingTime = root.earliestPendingTime;
  root = root.earliestSuspendedTime;
  earliestPendingTime > renderExpirationTime &&
    (renderExpirationTime = earliestPendingTime);
  root > renderExpirationTime && (renderExpirationTime = root);
  return renderExpirationTime;
}
function findNextExpirationTimeToWorkOn(completedExpirationTime, root) {
  var earliestSuspendedTime = root.earliestSuspendedTime,
    latestSuspendedTime = root.latestSuspendedTime,
    earliestPendingTime = root.earliestPendingTime,
    latestPingedTime = root.latestPingedTime;
  earliestPendingTime =
    0 !== earliestPendingTime ? earliestPendingTime : latestPingedTime;
  0 === earliestPendingTime &&
    (0 === completedExpirationTime ||
      latestSuspendedTime < completedExpirationTime) &&
    (earliestPendingTime = latestSuspendedTime);
  completedExpirationTime = earliestPendingTime;
  0 !== completedExpirationTime &&
    earliestSuspendedTime > completedExpirationTime &&
    (completedExpirationTime = earliestSuspendedTime);
  root.nextExpirationTimeToWorkOn = earliestPendingTime;
  root.expirationTime = completedExpirationTime;
}
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return !0;
  if (
    "object" !== typeof objA ||
    null === objA ||
    "object" !== typeof objB ||
    null === objB
  )
    return !1;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return !1;
  for (keysB = 0; keysB < keysA.length; keysB++)
    if (
      !hasOwnProperty.call(objB, keysA[keysB]) ||
      !is(objA[keysA[keysB]], objB[keysA[keysB]])
    )
      return !1;
  return !0;
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
  }
  return baseProps;
}
function readLazyComponentType(lazyComponent) {
  var result = lazyComponent._result;
  switch (lazyComponent._status) {
    case 1:
      return result;
    case 2:
      throw result;
    case 0:
      throw result;
    default:
      lazyComponent._status = 0;
      result = lazyComponent._ctor;
      result = result();
      result.then(
        function(moduleObject) {
          0 === lazyComponent._status &&
            ((moduleObject = moduleObject.default),
            (lazyComponent._status = 1),
            (lazyComponent._result = moduleObject));
        },
        function(error) {
          0 === lazyComponent._status &&
            ((lazyComponent._status = 2), (lazyComponent._result = error));
        }
      );
      switch (lazyComponent._status) {
        case 1:
          return lazyComponent._result;
        case 2:
          throw lazyComponent._result;
      }
      lazyComponent._result = result;
      throw result;
  }
}
var emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(
  workInProgress,
  ctor,
  getDerivedStateFromProps,
  nextProps
) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps =
    null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps
      ? ctor
      : Object.assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  nextProps = workInProgress.updateQueue;
  null !== nextProps &&
    0 === workInProgress.expirationTime &&
    (nextProps.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function(component) {
    return (component = component._reactInternalFiber)
      ? 2 === isFiberMountedImpl(component)
      : !1;
  },
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime$$1();
    currentTime = computeExpirationForFiber$$1(currentTime, inst);
    var update = createUpdate(currentTime);
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    flushPassiveEffects$$1();
    enqueueUpdate(inst, update);
    scheduleWork$$1(inst, currentTime);
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime$$1();
    currentTime = computeExpirationForFiber$$1(currentTime, inst);
    var update = createUpdate(currentTime);
    update.tag = ReplaceState;
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    flushPassiveEffects$$1();
    enqueueUpdate(inst, update);
    scheduleWork$$1(inst, currentTime);
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime$$1();
    currentTime = computeExpirationForFiber$$1(currentTime, inst);
    var update = createUpdate(currentTime);
    update.tag = ForceUpdate;
    void 0 !== callback && null !== callback && (update.callback = callback);
    flushPassiveEffects$$1();
    enqueueUpdate(inst, update);
    scheduleWork$$1(inst, currentTime);
  }
};
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  workInProgress = workInProgress.stateNode;
  return "function" === typeof workInProgress.shouldComponentUpdate
    ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext)
    : ctor.prototype && ctor.prototype.isPureReactComponent
      ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
      : !0;
}
function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = !1,
    unmaskedContext = emptyContextObject;
  var context = ctor.contextType;
  "object" === typeof context && null !== context
    ? (context = readContext(context))
    : ((unmaskedContext = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (isLegacyContextConsumer = ctor.contextTypes),
      (context = (isLegacyContextConsumer =
        null !== isLegacyContextConsumer && void 0 !== isLegacyContextConsumer)
        ? getMaskedContext(workInProgress, unmaskedContext)
        : emptyContextObject));
  ctor = new ctor(props, context);
  workInProgress.memoizedState =
    null !== ctor.state && void 0 !== ctor.state ? ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternalFiber = workInProgress;
  isLegacyContextConsumer &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return ctor;
}
function callComponentWillReceiveProps(
  workInProgress,
  instance,
  newProps,
  nextContext
) {
  workInProgress = instance.state;
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress &&
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(
  workInProgress,
  ctor,
  newProps,
  renderExpirationTime
) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  var contextType = ctor.contextType;
  "object" === typeof contextType && null !== contextType
    ? (instance.context = readContext(contextType))
    : ((contextType = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (instance.context = getMaskedContext(workInProgress, contextType)));
  contextType = workInProgress.updateQueue;
  null !== contextType &&
    (processUpdateQueue(
      workInProgress,
      contextType,
      newProps,
      instance,
      renderExpirationTime
    ),
    (instance.state = workInProgress.memoizedState));
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType &&
    (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof ctor.getDerivedStateFromProps ||
    "function" === typeof instance.getSnapshotBeforeUpdate ||
    ("function" !== typeof instance.UNSAFE_componentWillMount &&
      "function" !== typeof instance.componentWillMount) ||
    ((ctor = instance.state),
    "function" === typeof instance.componentWillMount &&
      instance.componentWillMount(),
    "function" === typeof instance.UNSAFE_componentWillMount &&
      instance.UNSAFE_componentWillMount(),
    ctor !== instance.state &&
      classComponentUpdater.enqueueReplaceState(instance, instance.state, null),
    (contextType = workInProgress.updateQueue),
    null !== contextType &&
      (processUpdateQueue(
        workInProgress,
        contextType,
        newProps,
        instance,
        renderExpirationTime
      ),
      (instance.state = workInProgress.memoizedState)));
  "function" === typeof instance.componentDidMount &&
    (workInProgress.effectTag |= 4);
}
var isArray = Array.isArray;
function coerceRef(returnFiber, current$$1, element) {
  returnFiber = element.ref;
  if (
    null !== returnFiber &&
    "function" !== typeof returnFiber &&
    "object" !== typeof returnFiber
  ) {
    if (element._owner) {
      element = element._owner;
      var inst = void 0;
      if (element) {
        if (1 !== element.tag) throw ReactErrorProd(309);
        inst = element.stateNode;
      }
      if (!inst) throw ReactErrorProd(147, returnFiber);
      var stringRef = "" + returnFiber;
      if (
        null !== current$$1 &&
        null !== current$$1.ref &&
        "function" === typeof current$$1.ref &&
        current$$1.ref._stringRef === stringRef
      )
        return current$$1.ref;
      current$$1 = function(value) {
        var refs = inst.refs;
        refs === emptyRefsObject && (refs = inst.refs = {});
        null === value ? delete refs[stringRef] : (refs[stringRef] = value);
      };
      current$$1._stringRef = stringRef;
      return current$$1;
    }
    if ("string" !== typeof returnFiber) throw ReactErrorProd(284);
    if (!element._owner) throw ReactErrorProd(290, returnFiber);
  }
  return returnFiber;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  if ("textarea" !== returnFiber.type)
    throw ReactErrorProd(
      31,
      "[object Object]" === Object.prototype.toString.call(newChild)
        ? "object with keys {" + Object.keys(newChild).join(", ") + "}"
        : newChild,
      ""
    );
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;
      null !== last
        ? ((last.nextEffect = childToDelete),
          (returnFiber.lastEffect = childToDelete))
        : (returnFiber.firstEffect = returnFiber.lastEffect = childToDelete);
      childToDelete.nextEffect = null;
      childToDelete.effectTag = 8;
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber = new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key
        ? returnFiber.set(currentFirstChild.key, currentFirstChild)
        : returnFiber.set(currentFirstChild.index, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return returnFiber;
  }
  function useFiber(fiber, pendingProps, expirationTime) {
    fiber = createWorkInProgress(fiber, pendingProps, expirationTime);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return (
        (newIndex = newIndex.index),
        newIndex < lastPlacedIndex
          ? ((newFiber.effectTag = 2), lastPlacedIndex)
          : newIndex
      );
    newFiber.effectTag = 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects &&
      null === newFiber.alternate &&
      (newFiber.effectTag = 2);
    return newFiber;
  }
  function updateTextNode(
    returnFiber,
    current$$1,
    textContent,
    expirationTime
  ) {
    if (null === current$$1 || 6 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromText(
          textContent,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, textContent, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateElement(returnFiber, current$$1, element, expirationTime) {
    if (null !== current$$1 && current$$1.elementType === element.type)
      return (
        (expirationTime = useFiber(current$$1, element.props, expirationTime)),
        (expirationTime.ref = coerceRef(returnFiber, current$$1, element)),
        (expirationTime.return = returnFiber),
        expirationTime
      );
    expirationTime = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      expirationTime
    );
    expirationTime.ref = coerceRef(returnFiber, current$$1, element);
    expirationTime.return = returnFiber;
    return expirationTime;
  }
  function updatePortal(returnFiber, current$$1, portal, expirationTime) {
    if (
      null === current$$1 ||
      4 !== current$$1.tag ||
      current$$1.stateNode.containerInfo !== portal.containerInfo ||
      current$$1.stateNode.implementation !== portal.implementation
    )
      return (
        (current$$1 = createFiberFromPortal(
          portal,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, portal.children || [], expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateFragment(
    returnFiber,
    current$$1,
    fragment,
    expirationTime,
    key
  ) {
    if (null === current$$1 || 7 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          expirationTime,
          key
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, fragment, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function createChild(returnFiber, newChild, expirationTime) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          expirationTime
        )),
        (newChild.return = returnFiber),
        newChild
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (expirationTime = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              expirationTime
            )),
            (expirationTime.ref = coerceRef(returnFiber, null, newChild)),
            (expirationTime.return = returnFiber),
            expirationTime
          );
        case REACT_PORTAL_TYPE:
          return (
            (newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (newChild.return = returnFiber),
            newChild
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            expirationTime,
            null
          )),
          (newChild.return = returnFiber),
          newChild
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild)
      return null !== key
        ? null
        : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key
            ? newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  oldFiber,
                  newChild.props.children,
                  expirationTime,
                  key
                )
              : updateElement(returnFiber, oldFiber, newChild, expirationTime)
            : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key
            ? updatePortal(returnFiber, oldFiber, newChild, expirationTime)
            : null;
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return null !== key
          ? null
          : updateFragment(
              returnFiber,
              oldFiber,
              newChild,
              expirationTime,
              null
            );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    expirationTime
  ) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (existingChildren = existingChildren.get(newIdx) || null),
        updateTextNode(
          returnFiber,
          existingChildren,
          "" + newChild,
          expirationTime
        )
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  existingChildren,
                  newChild.props.children,
                  expirationTime,
                  newChild.key
                )
              : updateElement(
                  returnFiber,
                  existingChildren,
                  newChild,
                  expirationTime
                )
          );
        case REACT_PORTAL_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updatePortal(
              returnFiber,
              existingChildren,
              newChild,
              expirationTime
            )
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (existingChildren = existingChildren.get(newIdx) || null),
          updateFragment(
            returnFiber,
            existingChildren,
            newChild,
            expirationTime,
            null
          )
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    expirationTime
  ) {
    for (
      var resultingFirstChild = null,
        previousNewFiber = null,
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null;
      null !== oldFiber && newIdx < newChildren.length;
      newIdx++
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (resultingFirstChild = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return (
        deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild
      );
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        if (
          (oldFiber = createChild(
            returnFiber,
            newChildren[newIdx],
            expirationTime
          ))
        )
          (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (resultingFirstChild = oldFiber)
              : (previousNewFiber.sibling = oldFiber),
            (previousNewFiber = oldFiber);
      return resultingFirstChild;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      newIdx < newChildren.length;
      newIdx++
    )
      if (
        (nextOldFiber = updateFromMap(
          oldFiber,
          returnFiber,
          newIdx,
          newChildren[newIdx],
          expirationTime
        ))
      )
        shouldTrackSideEffects &&
          null !== nextOldFiber.alternate &&
          oldFiber.delete(
            null === nextOldFiber.key ? newIdx : nextOldFiber.key
          ),
          (currentFirstChild = placeChild(
            nextOldFiber,
            currentFirstChild,
            newIdx
          )),
          null === previousNewFiber
            ? (resultingFirstChild = nextOldFiber)
            : (previousNewFiber.sibling = nextOldFiber),
          (previousNewFiber = nextOldFiber);
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(
    returnFiber,
    currentFirstChild,
    newChildrenIterable,
    expirationTime
  ) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn) throw ReactErrorProd(150);
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw ReactErrorProd(151);
    for (
      var previousNewFiber = (iteratorFn = null),
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null,
        step = newChildrenIterable.next();
      null !== oldFiber && !step.done;
      newIdx++, step = newChildrenIterable.next()
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        step.value,
        expirationTime
      );
      if (null === newFiber) {
        oldFiber || (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (iteratorFn = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next())
        (step = createChild(returnFiber, step.value, expirationTime)),
          null !== step &&
            ((currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (iteratorFn = step)
              : (previousNewFiber.sibling = step),
            (previousNewFiber = step));
      return iteratorFn;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      !step.done;
      newIdx++, step = newChildrenIterable.next()
    )
      (step = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        step.value,
        expirationTime
      )),
        null !== step &&
          (shouldTrackSideEffects &&
            null !== step.alternate &&
            oldFiber.delete(null === step.key ? newIdx : step.key),
          (currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
          null === previousNewFiber
            ? (iteratorFn = step)
            : (previousNewFiber.sibling = step),
          (previousNewFiber = step));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return iteratorFn;
  }
  return function(returnFiber, currentFirstChild, newChild, expirationTime) {
    var isUnkeyedTopLevelFragment =
      "object" === typeof newChild &&
      null !== newChild &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      null === newChild.key;
    isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
    var isObject = "object" === typeof newChild && null !== newChild;
    if (isObject)
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            isObject = newChild.key;
            for (
              isUnkeyedTopLevelFragment = currentFirstChild;
              null !== isUnkeyedTopLevelFragment;

            ) {
              if (isUnkeyedTopLevelFragment.key === isObject) {
                if (
                  7 === isUnkeyedTopLevelFragment.tag
                    ? newChild.type === REACT_FRAGMENT_TYPE
                    : isUnkeyedTopLevelFragment.elementType === newChild.type
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    isUnkeyedTopLevelFragment.sibling
                  );
                  currentFirstChild = useFiber(
                    isUnkeyedTopLevelFragment,
                    newChild.type === REACT_FRAGMENT_TYPE
                      ? newChild.props.children
                      : newChild.props,
                    expirationTime
                  );
                  currentFirstChild.ref = coerceRef(
                    returnFiber,
                    isUnkeyedTopLevelFragment,
                    newChild
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }
                deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment);
                break;
              } else deleteChild(returnFiber, isUnkeyedTopLevelFragment);
              isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE
              ? ((currentFirstChild = createFiberFromFragment(
                  newChild.props.children,
                  returnFiber.mode,
                  expirationTime,
                  newChild.key
                )),
                (currentFirstChild.return = returnFiber),
                (returnFiber = currentFirstChild))
              : ((expirationTime = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  expirationTime
                )),
                (expirationTime.ref = coerceRef(
                  returnFiber,
                  currentFirstChild,
                  newChild
                )),
                (expirationTime.return = returnFiber),
                (returnFiber = expirationTime));
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (
              isUnkeyedTopLevelFragment = newChild.key;
              null !== currentFirstChild;

            ) {
              if (currentFirstChild.key === isUnkeyedTopLevelFragment) {
                if (
                  4 === currentFirstChild.tag &&
                  currentFirstChild.stateNode.containerInfo ===
                    newChild.containerInfo &&
                  currentFirstChild.stateNode.implementation ===
                    newChild.implementation
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  currentFirstChild = useFiber(
                    currentFirstChild,
                    newChild.children || [],
                    expirationTime
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }
                deleteRemainingChildren(returnFiber, currentFirstChild);
                break;
              } else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            currentFirstChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            );
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }
          return placeSingleChild(returnFiber);
      }
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = "" + newChild),
        null !== currentFirstChild && 6 === currentFirstChild.tag
          ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling),
            (currentFirstChild = useFiber(
              currentFirstChild,
              newChild,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild))
          : (deleteRemainingChildren(returnFiber, currentFirstChild),
            (currentFirstChild = createFiberFromText(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild)),
        placeSingleChild(returnFiber)
      );
    if (isArray(newChild))
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    if (getIteratorFn(newChild))
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment)
      switch (returnFiber.tag) {
        case 1:
        case 0:
          throw ((returnFiber = returnFiber.type),
          ReactErrorProd(
            152,
            returnFiber.displayName || returnFiber.name || "Component"
          ));
      }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT$1 = {},
  contextStackCursor$1 = { current: NO_CONTEXT$1 },
  contextFiberStackCursor = { current: NO_CONTEXT$1 },
  rootInstanceStackCursor = { current: NO_CONTEXT$1 };
function requiredContext(c) {
  if (c === NO_CONTEXT$1) throw ReactErrorProd(174);
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance, fiber);
  push(contextFiberStackCursor, fiber, fiber);
  push(contextStackCursor$1, NO_CONTEXT$1, fiber);
  pop(contextStackCursor$1, fiber);
  push(contextStackCursor$1, NO_CONTEXT, fiber);
}
function popHostContainer(fiber) {
  pop(contextStackCursor$1, fiber);
  pop(contextFiberStackCursor, fiber);
  pop(rootInstanceStackCursor, fiber);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  requiredContext(contextStackCursor$1.current) !== NO_CONTEXT &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, NO_CONTEXT, fiber));
}
function pushHostContextForEventComponent(fiber) {
  requiredContext(contextStackCursor$1.current) !== NO_CONTEXT &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, NO_CONTEXT, fiber));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber &&
    (pop(contextStackCursor$1, fiber), pop(contextFiberStackCursor, fiber));
}
var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  renderExpirationTime = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  nextCurrentHook = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  nextWorkInProgressHook = null,
  remainingExpirationTime = 0,
  componentUpdateQueue = null,
  sideEffectTag = 0,
  didScheduleRenderPhaseUpdate = !1,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function throwInvalidHookError() {
  throw ReactErrorProd(321);
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!is(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  refOrContext,
  nextRenderExpirationTime
) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber$1 = workInProgress;
  nextCurrentHook = null !== current ? current.memoizedState : null;
  ReactCurrentDispatcher$1.current =
    null === nextCurrentHook ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  workInProgress = Component(props, refOrContext);
  if (didScheduleRenderPhaseUpdate) {
    do
      (didScheduleRenderPhaseUpdate = !1),
        (numberOfReRenders += 1),
        (nextCurrentHook = null !== current ? current.memoizedState : null),
        (nextWorkInProgressHook = firstWorkInProgressHook),
        (componentUpdateQueue = workInProgressHook = currentHook = null),
        (ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdate),
        (workInProgress = Component(props, refOrContext));
    while (didScheduleRenderPhaseUpdate);
    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  current = currentlyRenderingFiber$1;
  current.memoizedState = firstWorkInProgressHook;
  current.expirationTime = remainingExpirationTime;
  current.updateQueue = componentUpdateQueue;
  current.effectTag |= sideEffectTag;
  current = null !== currentHook && null !== currentHook.next;
  renderExpirationTime = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  if (current) throw ReactErrorProd(300);
  return workInProgress;
}
function resetHooks() {
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  renderExpirationTime = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  didScheduleRenderPhaseUpdate = !1;
  renderPhaseUpdates = null;
  numberOfReRenders = 0;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    queue: null,
    baseUpdate: null,
    next: null
  };
  null === workInProgressHook
    ? (firstWorkInProgressHook = workInProgressHook = hook)
    : (workInProgressHook = workInProgressHook.next = hook);
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null !== nextWorkInProgressHook)
    (workInProgressHook = nextWorkInProgressHook),
      (nextWorkInProgressHook = workInProgressHook.next),
      (currentHook = nextCurrentHook),
      (nextCurrentHook = null !== currentHook ? currentHook.next : null);
  else {
    if (null === nextCurrentHook) throw ReactErrorProd(310);
    currentHook = nextCurrentHook;
    var newHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,
      next: null
    };
    workInProgressHook =
      null === workInProgressHook
        ? (firstWorkInProgressHook = newHook)
        : (workInProgressHook.next = newHook);
    nextCurrentHook = currentHook.next;
  }
  return workInProgressHook;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw ReactErrorProd(311);
  queue.lastRenderedReducer = reducer;
  if (0 < numberOfReRenders) {
    var _dispatch = queue.dispatch;
    if (null !== renderPhaseUpdates) {
      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
      if (void 0 !== firstRenderPhaseUpdate) {
        renderPhaseUpdates.delete(queue);
        var newState = hook.memoizedState;
        do
          (newState = reducer(newState, firstRenderPhaseUpdate.action)),
            (firstRenderPhaseUpdate = firstRenderPhaseUpdate.next);
        while (null !== firstRenderPhaseUpdate);
        is(newState, hook.memoizedState) || (didReceiveUpdate = !0);
        hook.memoizedState = newState;
        hook.baseUpdate === queue.last && (hook.baseState = newState);
        queue.lastRenderedState = newState;
        return [newState, _dispatch];
      }
    }
    return [hook.memoizedState, _dispatch];
  }
  _dispatch = queue.last;
  var baseUpdate = hook.baseUpdate;
  newState = hook.baseState;
  null !== baseUpdate
    ? (null !== _dispatch && (_dispatch.next = null),
      (_dispatch = baseUpdate.next))
    : (_dispatch = null !== _dispatch ? _dispatch.next : null);
  if (null !== _dispatch) {
    var newBaseUpdate = (firstRenderPhaseUpdate = null),
      _update = _dispatch,
      didSkip = !1;
    do {
      var updateExpirationTime = _update.expirationTime;
      updateExpirationTime < renderExpirationTime
        ? (didSkip ||
            ((didSkip = !0),
            (newBaseUpdate = baseUpdate),
            (firstRenderPhaseUpdate = newState)),
          updateExpirationTime > remainingExpirationTime &&
            (remainingExpirationTime = updateExpirationTime))
        : (newState =
            _update.eagerReducer === reducer
              ? _update.eagerState
              : reducer(newState, _update.action));
      baseUpdate = _update;
      _update = _update.next;
    } while (null !== _update && _update !== _dispatch);
    didSkip ||
      ((newBaseUpdate = baseUpdate), (firstRenderPhaseUpdate = newState));
    is(newState, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = newState;
    hook.baseUpdate = newBaseUpdate;
    hook.baseState = firstRenderPhaseUpdate;
    queue.lastRenderedState = newState;
  }
  return [hook.memoizedState, queue.dispatch];
}
function pushEffect(tag, create, destroy, deps) {
  tag = { tag: tag, create: create, destroy: destroy, deps: deps, next: null };
  null === componentUpdateQueue
    ? ((componentUpdateQueue = { lastEffect: null }),
      (componentUpdateQueue.lastEffect = tag.next = tag))
    : ((create = componentUpdateQueue.lastEffect),
      null === create
        ? (componentUpdateQueue.lastEffect = tag.next = tag)
        : ((destroy = create.next),
          (create.next = tag),
          (tag.next = destroy),
          (componentUpdateQueue.lastEffect = tag)));
  return tag;
}
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(
    hookEffectTag,
    create,
    void 0,
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(0, create, destroy, deps);
      return;
    }
  }
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(hookEffectTag, create, destroy, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref)
    return (
      (create = create()),
      ref(create),
      function() {
        ref(null);
      }
    );
  if (null !== ref && void 0 !== ref)
    return (
      (create = create()),
      (ref.current = create),
      function() {
        ref.current = null;
      }
    );
}
function mountDebugValue() {}
function dispatchAction(fiber, queue, action) {
  if (!(25 > numberOfReRenders)) throw ReactErrorProd(301);
  var alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber$1 ||
    (null !== alternate && alternate === currentlyRenderingFiber$1)
  )
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (fiber = {
        expirationTime: renderExpirationTime,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, fiber);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = fiber;
    }
  else {
    flushPassiveEffects$$1();
    var currentTime = requestCurrentTime$$1();
    currentTime = computeExpirationForFiber$$1(currentTime, fiber);
    var _update2 = {
        expirationTime: currentTime,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      },
      _last = queue.last;
    if (null === _last) _update2.next = _update2;
    else {
      var first = _last.next;
      null !== first && (_update2.next = first);
      _last.next = _update2;
    }
    queue.last = _update2;
    if (
      0 === fiber.expirationTime &&
      (null === alternate || 0 === alternate.expirationTime) &&
      ((alternate = queue.lastRenderedReducer), null !== alternate)
    )
      try {
        var currentState = queue.lastRenderedState,
          _eagerState = alternate(currentState, action);
        _update2.eagerReducer = alternate;
        _update2.eagerState = _eagerState;
        if (is(_eagerState, currentState)) return;
      } catch (error) {
      } finally {
      }
    scheduleWork$$1(fiber, currentTime);
  }
}
var ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: function(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    },
    useContext: readContext,
    useEffect: function(create, deps) {
      return mountEffectImpl(516, 192, create, deps);
    },
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(
        4,
        36,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4, 36, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = void 0 !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$1,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return (hook.memoizedState = initialValue);
    },
    useState: function(initialState) {
      var hook = mountWorkInProgressHook();
      "function" === typeof initialState && (initialState = initialState());
      hook.memoizedState = hook.baseState = initialState;
      initialState = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      initialState = initialState.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$1,
        initialState
      );
      return [hook.memoizedState, initialState];
    },
    useDebugValue: mountDebugValue
  },
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: function(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (
        null !== prevState &&
        null !== deps &&
        areHookInputsEqual(deps, prevState[1])
      )
        return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    },
    useContext: readContext,
    useEffect: function(create, deps) {
      return updateEffectImpl(516, 192, create, deps);
    },
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return updateEffectImpl(
        4,
        36,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return updateEffectImpl(4, 36, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (
        null !== prevState &&
        null !== deps &&
        areHookInputsEqual(deps, prevState[1])
      )
        return prevState[0];
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: updateReducer,
    useRef: function() {
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function(initialState) {
      return updateReducer(basicStateReducer, initialState);
    },
    useDebugValue: mountDebugValue
  },
  hydrationParentFiber = null,
  nextHydratableInstance = null,
  isHydrating = !1;
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      return (
        (nextInstance = shim$1(nextInstance, fiber.type, fiber.pendingProps)),
        null !== nextInstance ? ((fiber.stateNode = nextInstance), !0) : !1
      );
    case 6:
      return (
        (nextInstance = shim$1(nextInstance, fiber.pendingProps)),
        null !== nextInstance ? ((fiber.stateNode = nextInstance), !0) : !1
      );
    case 13:
      return (
        (nextInstance = shim$1(nextInstance)),
        null !== nextInstance
          ? ((fiber.tag = 18), (fiber.stateNode = nextInstance), !0)
          : !1
      );
    default:
      return !1;
  }
}
function tryToClaimNextHydratableInstance(fiber$jscomp$0) {
  if (isHydrating) {
    var nextInstance = nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber$jscomp$0, nextInstance)) {
        nextInstance = shim$1(firstAttemptedInstance);
        if (!nextInstance || !tryHydrate(fiber$jscomp$0, nextInstance)) {
          fiber$jscomp$0.effectTag |= 2;
          isHydrating = !1;
          hydrationParentFiber = fiber$jscomp$0;
          return;
        }
        var returnFiber = hydrationParentFiber,
          fiber = createFiber(5, null, null, 0);
        fiber.elementType = "DELETED";
        fiber.type = "DELETED";
        fiber.stateNode = firstAttemptedInstance;
        fiber.return = returnFiber;
        fiber.effectTag = 8;
        null !== returnFiber.lastEffect
          ? ((returnFiber.lastEffect.nextEffect = fiber),
            (returnFiber.lastEffect = fiber))
          : (returnFiber.firstEffect = returnFiber.lastEffect = fiber);
      }
      hydrationParentFiber = fiber$jscomp$0;
      nextHydratableInstance = shim$1(nextInstance);
    } else
      (fiber$jscomp$0.effectTag |= 2),
        (isHydrating = !1),
        (hydrationParentFiber = fiber$jscomp$0);
  }
}
var ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(
  current$$1,
  workInProgress,
  nextChildren,
  renderExpirationTime
) {
  workInProgress.child =
    null === current$$1
      ? mountChildFibers(
          workInProgress,
          null,
          nextChildren,
          renderExpirationTime
        )
      : reconcileChildFibers(
          workInProgress,
          current$$1.child,
          nextChildren,
          renderExpirationTime
        );
}
function updateForwardRef(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderExpirationTime);
  nextProps = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    ref,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    nextProps,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  if (null === current$$1) {
    var type = Component.type;
    if (
      "function" === typeof type &&
      !shouldConstruct(type) &&
      void 0 === type.defaultProps &&
      null === Component.compare &&
      void 0 === Component.defaultProps
    )
      return (
        (workInProgress.tag = 15),
        (workInProgress.type = type),
        updateSimpleMemoComponent(
          current$$1,
          workInProgress,
          type,
          nextProps,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    current$$1 = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      null,
      workInProgress.mode,
      renderExpirationTime
    );
    current$$1.ref = workInProgress.ref;
    current$$1.return = workInProgress;
    return (workInProgress.child = current$$1);
  }
  type = current$$1.child;
  if (
    updateExpirationTime < renderExpirationTime &&
    ((updateExpirationTime = type.memoizedProps),
    (Component = Component.compare),
    (Component = null !== Component ? Component : shallowEqual),
    Component(updateExpirationTime, nextProps) &&
      current$$1.ref === workInProgress.ref)
  )
    return bailoutOnAlreadyFinishedWork(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  workInProgress.effectTag |= 1;
  current$$1 = createWorkInProgress(type, nextProps, renderExpirationTime);
  current$$1.ref = workInProgress.ref;
  current$$1.return = workInProgress;
  return (workInProgress.child = current$$1);
}
function updateSimpleMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  return null !== current$$1 &&
    shallowEqual(current$$1.memoizedProps, nextProps) &&
    current$$1.ref === workInProgress.ref &&
    ((didReceiveUpdate = !1), updateExpirationTime < renderExpirationTime)
    ? bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    : updateFunctionComponent(
        current$$1,
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      );
}
function markRef(current$$1, workInProgress) {
  var ref = workInProgress.ref;
  if (
    (null === current$$1 && null !== ref) ||
    (null !== current$$1 && current$$1.ref !== ref)
  )
    workInProgress.effectTag |= 128;
}
function updateFunctionComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  var unmaskedContext = isContextProvider(Component)
    ? previousContext
    : contextStackCursor.current;
  unmaskedContext = getMaskedContext(workInProgress, unmaskedContext);
  prepareToReadContext(workInProgress, renderExpirationTime);
  Component = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    unmaskedContext,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    Component,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateClassComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  if (isContextProvider(Component)) {
    var hasContext = !0;
    pushContextProvider(workInProgress);
  } else hasContext = !1;
  prepareToReadContext(workInProgress, renderExpirationTime);
  if (null === workInProgress.stateNode)
    null !== current$$1 &&
      ((current$$1.alternate = null),
      (workInProgress.alternate = null),
      (workInProgress.effectTag |= 2)),
      constructClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      mountClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      (nextProps = !0);
  else if (null === current$$1) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType;
    "object" === typeof contextType && null !== contextType
      ? (contextType = readContext(contextType))
      : ((contextType = isContextProvider(Component)
          ? previousContext
          : contextStackCursor.current),
        (contextType = getMaskedContext(workInProgress, contextType)));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps,
      hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate;
    hasNewLifecycles ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((oldProps !== nextProps || oldContext !== contextType) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          contextType
        ));
    hasForceUpdate = !1;
    var oldState = workInProgress.memoizedState;
    oldContext = instance.state = oldState;
    var updateQueue = workInProgress.updateQueue;
    null !== updateQueue &&
      (processUpdateQueue(
        workInProgress,
        updateQueue,
        nextProps,
        instance,
        renderExpirationTime
      ),
      (oldContext = workInProgress.memoizedState));
    oldProps !== nextProps ||
    oldState !== oldContext ||
    didPerformWorkStackCursor.current ||
    hasForceUpdate
      ? ("function" === typeof getDerivedStateFromProps &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            getDerivedStateFromProps,
            nextProps
          ),
          (oldContext = workInProgress.memoizedState)),
        (oldProps =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          ))
          ? (hasNewLifecycles ||
              ("function" !== typeof instance.UNSAFE_componentWillMount &&
                "function" !== typeof instance.componentWillMount) ||
              ("function" === typeof instance.componentWillMount &&
                instance.componentWillMount(),
              "function" === typeof instance.UNSAFE_componentWillMount &&
                instance.UNSAFE_componentWillMount()),
            "function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4))
          : ("function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = oldContext)),
        (instance.props = nextProps),
        (instance.state = oldContext),
        (instance.context = contextType),
        (nextProps = oldProps))
      : ("function" === typeof instance.componentDidMount &&
          (workInProgress.effectTag |= 4),
        (nextProps = !1));
  } else
    (instance = workInProgress.stateNode),
      (oldProps = workInProgress.memoizedProps),
      (instance.props =
        workInProgress.type === workInProgress.elementType
          ? oldProps
          : resolveDefaultProps(workInProgress.type, oldProps)),
      (oldContext = instance.context),
      (contextType = Component.contextType),
      "object" === typeof contextType && null !== contextType
        ? (contextType = readContext(contextType))
        : ((contextType = isContextProvider(Component)
            ? previousContext
            : contextStackCursor.current),
          (contextType = getMaskedContext(workInProgress, contextType))),
      (getDerivedStateFromProps = Component.getDerivedStateFromProps),
      (hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate) ||
        ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
          "function" !== typeof instance.componentWillReceiveProps) ||
        ((oldProps !== nextProps || oldContext !== contextType) &&
          callComponentWillReceiveProps(
            workInProgress,
            instance,
            nextProps,
            contextType
          )),
      (hasForceUpdate = !1),
      (oldContext = workInProgress.memoizedState),
      (oldState = instance.state = oldContext),
      (updateQueue = workInProgress.updateQueue),
      null !== updateQueue &&
        (processUpdateQueue(
          workInProgress,
          updateQueue,
          nextProps,
          instance,
          renderExpirationTime
        ),
        (oldState = workInProgress.memoizedState)),
      oldProps !== nextProps ||
      oldContext !== oldState ||
      didPerformWorkStackCursor.current ||
      hasForceUpdate
        ? ("function" === typeof getDerivedStateFromProps &&
            (applyDerivedStateFromProps(
              workInProgress,
              Component,
              getDerivedStateFromProps,
              nextProps
            ),
            (oldState = workInProgress.memoizedState)),
          (getDerivedStateFromProps =
            hasForceUpdate ||
            checkShouldComponentUpdate(
              workInProgress,
              Component,
              oldProps,
              nextProps,
              oldContext,
              oldState,
              contextType
            ))
            ? (hasNewLifecycles ||
                ("function" !== typeof instance.UNSAFE_componentWillUpdate &&
                  "function" !== typeof instance.componentWillUpdate) ||
                ("function" === typeof instance.componentWillUpdate &&
                  instance.componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  ),
                "function" === typeof instance.UNSAFE_componentWillUpdate &&
                  instance.UNSAFE_componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  )),
              "function" === typeof instance.componentDidUpdate &&
                (workInProgress.effectTag |= 4),
              "function" === typeof instance.getSnapshotBeforeUpdate &&
                (workInProgress.effectTag |= 256))
            : ("function" !== typeof instance.componentDidUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 4),
              "function" !== typeof instance.getSnapshotBeforeUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 256),
              (workInProgress.memoizedProps = nextProps),
              (workInProgress.memoizedState = oldState)),
          (instance.props = nextProps),
          (instance.state = oldState),
          (instance.context = contextType),
          (nextProps = getDerivedStateFromProps))
        : ("function" !== typeof instance.componentDidUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 4),
          "function" !== typeof instance.getSnapshotBeforeUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 256),
          (nextProps = !1));
  return finishClassComponent(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    hasContext,
    renderExpirationTime
  );
}
function finishClassComponent(
  current$$1,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderExpirationTime
) {
  markRef(current$$1, workInProgress);
  var didCaptureError = 0 !== (workInProgress.effectTag & 64);
  if (!shouldUpdate && !didCaptureError)
    return (
      hasContext && invalidateContextProvider(workInProgress, Component, !1),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$2.current = workInProgress;
  var nextChildren =
    didCaptureError && "function" !== typeof Component.getDerivedStateFromError
      ? null
      : shouldUpdate.render();
  workInProgress.effectTag |= 1;
  null !== current$$1 && didCaptureError
    ? ((workInProgress.child = reconcileChildFibers(
        workInProgress,
        current$$1.child,
        null,
        renderExpirationTime
      )),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        null,
        nextChildren,
        renderExpirationTime
      )))
    : reconcileChildren(
        current$$1,
        workInProgress,
        nextChildren,
        renderExpirationTime
      );
  workInProgress.memoizedState = shouldUpdate.state;
  hasContext && invalidateContextProvider(workInProgress, Component, !0);
  return workInProgress.child;
}
function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  root.pendingContext
    ? pushTopLevelContextObject(
        workInProgress,
        root.pendingContext,
        root.pendingContext !== root.context
      )
    : root.context &&
      pushTopLevelContextObject(workInProgress, root.context, !1);
  pushHostContainer(workInProgress, root.containerInfo);
}
function updateSuspenseComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  var mode = workInProgress.mode,
    nextProps = workInProgress.pendingProps,
    nextState = workInProgress.memoizedState;
  if (0 === (workInProgress.effectTag & 64)) {
    nextState = null;
    var nextDidTimeout = !1;
  } else
    (nextState = { timedOutAt: null !== nextState ? nextState.timedOutAt : 0 }),
      (nextDidTimeout = !0),
      (workInProgress.effectTag &= -65);
  if (null === current$$1) {
    if (
      void 0 !== nextProps.fallback &&
      (tryToClaimNextHydratableInstance(workInProgress),
      18 === workInProgress.tag)
    )
      return updateDehydratedSuspenseComponent(
        null,
        workInProgress,
        renderExpirationTime
      );
    if (nextDidTimeout) {
      var nextFallbackChildren = nextProps.fallback;
      current$$1 = createFiberFromFragment(null, mode, 0, null);
      0 === (workInProgress.mode & 1) &&
        (current$$1.child =
          null !== workInProgress.memoizedState
            ? workInProgress.child.child
            : workInProgress.child);
      mode = createFiberFromFragment(
        nextFallbackChildren,
        mode,
        renderExpirationTime,
        null
      );
      current$$1.sibling = mode;
      renderExpirationTime = current$$1;
      renderExpirationTime.return = mode.return = workInProgress;
    } else
      renderExpirationTime = mode = mountChildFibers(
        workInProgress,
        null,
        nextProps.children,
        renderExpirationTime
      );
  } else
    null !== current$$1.memoizedState
      ? ((mode = current$$1.child),
        (nextFallbackChildren = mode.sibling),
        nextDidTimeout
          ? ((renderExpirationTime = nextProps.fallback),
            (nextProps = createWorkInProgress(mode, mode.pendingProps, 0)),
            0 === (workInProgress.mode & 1) &&
              ((nextDidTimeout =
                null !== workInProgress.memoizedState
                  ? workInProgress.child.child
                  : workInProgress.child),
              nextDidTimeout !== mode.child &&
                (nextProps.child = nextDidTimeout)),
            (mode = nextProps.sibling = createWorkInProgress(
              nextFallbackChildren,
              renderExpirationTime,
              nextFallbackChildren.expirationTime
            )),
            (renderExpirationTime = nextProps),
            (nextProps.childExpirationTime = 0),
            (renderExpirationTime.return = mode.return = workInProgress))
          : (renderExpirationTime = mode = reconcileChildFibers(
              workInProgress,
              mode.child,
              nextProps.children,
              renderExpirationTime
            )))
      : ((nextFallbackChildren = current$$1.child),
        nextDidTimeout
          ? ((nextDidTimeout = nextProps.fallback),
            (nextProps = createFiberFromFragment(null, mode, 0, null)),
            (nextProps.child = nextFallbackChildren),
            0 === (workInProgress.mode & 1) &&
              (nextProps.child =
                null !== workInProgress.memoizedState
                  ? workInProgress.child.child
                  : workInProgress.child),
            (mode = nextProps.sibling = createFiberFromFragment(
              nextDidTimeout,
              mode,
              renderExpirationTime,
              null
            )),
            (mode.effectTag |= 2),
            (renderExpirationTime = nextProps),
            (nextProps.childExpirationTime = 0),
            (renderExpirationTime.return = mode.return = workInProgress))
          : (mode = renderExpirationTime = reconcileChildFibers(
              workInProgress,
              nextFallbackChildren,
              nextProps.children,
              renderExpirationTime
            ))),
      (workInProgress.stateNode = current$$1.stateNode);
  workInProgress.memoizedState = nextState;
  workInProgress.child = renderExpirationTime;
  return mode;
}
function retrySuspenseComponentWithoutHydrating(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  current$$1.alternate = null;
  workInProgress.alternate = null;
  var returnFiber = workInProgress.return;
  if (null === returnFiber) throw ReactErrorProd(315);
  var last = returnFiber.lastEffect;
  null !== last
    ? ((last.nextEffect = current$$1), (returnFiber.lastEffect = current$$1))
    : (returnFiber.firstEffect = returnFiber.lastEffect = current$$1);
  current$$1.nextEffect = null;
  current$$1.effectTag = 8;
  workInProgress.tag = 13;
  workInProgress.stateNode = null;
  workInProgress.memoizedState = null;
  workInProgress.effectTag |= 2;
  return updateSuspenseComponent(null, workInProgress, renderExpirationTime);
}
function updateDehydratedSuspenseComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  var suspenseInstance = workInProgress.stateNode;
  if (null === current$$1)
    return (
      shim$1(suspenseInstance)
        ? ((current$$1 = requestCurrentTime$$1()),
          (workInProgress.expirationTime = computeExpirationBucket(
            current$$1,
            5e3,
            250
          )))
        : (workInProgress.expirationTime = 1),
      null
    );
  if (0 !== (workInProgress.effectTag & 64))
    return (workInProgress.child = null);
  if (shim$1(suspenseInstance))
    return retrySuspenseComponentWithoutHydrating(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  var hasContextChanged$$1 =
    current$$1.childExpirationTime >= renderExpirationTime;
  if (didReceiveUpdate || hasContextChanged$$1)
    return retrySuspenseComponentWithoutHydrating(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  if (shim$1(suspenseInstance))
    return (
      (workInProgress.effectTag |= 64),
      (workInProgress.child = null),
      shim$1(suspenseInstance, retryTimedOutBoundary$$1.bind(null, current$$1)),
      null
    );
  workInProgress.child = mountChildFibers(
    workInProgress,
    null,
    workInProgress.pendingProps.children,
    renderExpirationTime
  );
  return workInProgress.child;
}
function bailoutOnAlreadyFinishedWork(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  null !== current$$1 &&
    (workInProgress.contextDependencies = current$$1.contextDependencies);
  if (workInProgress.childExpirationTime < renderExpirationTime) return null;
  if (null !== current$$1 && workInProgress.child !== current$$1.child)
    throw ReactErrorProd(153);
  if (null !== workInProgress.child) {
    current$$1 = workInProgress.child;
    renderExpirationTime = createWorkInProgress(
      current$$1,
      current$$1.pendingProps,
      current$$1.expirationTime
    );
    workInProgress.child = renderExpirationTime;
    for (
      renderExpirationTime.return = workInProgress;
      null !== current$$1.sibling;

    )
      (current$$1 = current$$1.sibling),
        (renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(
          current$$1,
          current$$1.pendingProps,
          current$$1.expirationTime
        )),
        (renderExpirationTime.return = workInProgress);
    renderExpirationTime.sibling = null;
  }
  return workInProgress.child;
}
function beginWork(current$$1, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;
  if (null !== current$$1)
    if (
      current$$1.memoizedProps !== workInProgress.pendingProps ||
      didPerformWorkStackCursor.current
    )
      didReceiveUpdate = !0;
    else {
      if (updateExpirationTime < renderExpirationTime) {
        didReceiveUpdate = !1;
        switch (workInProgress.tag) {
          case 3:
            pushHostRootContext(workInProgress);
            break;
          case 5:
            pushHostContext(workInProgress);
            break;
          case 1:
            isContextProvider(workInProgress.type) &&
              pushContextProvider(workInProgress);
            break;
          case 4:
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            );
            break;
          case 10:
            pushProvider(workInProgress, workInProgress.memoizedProps.value);
            break;
          case 13:
            if (null !== workInProgress.memoizedState) {
              updateExpirationTime = workInProgress.child.childExpirationTime;
              if (
                0 !== updateExpirationTime &&
                updateExpirationTime >= renderExpirationTime
              )
                return updateSuspenseComponent(
                  current$$1,
                  workInProgress,
                  renderExpirationTime
                );
              workInProgress = bailoutOnAlreadyFinishedWork(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
              return null !== workInProgress ? workInProgress.sibling : null;
            }
            break;
          case 18:
            workInProgress.effectTag |= 64;
            break;
          case 19:
            pushHostContextForEventComponent(workInProgress);
            break;
          case 20:
            requiredContext(contextStackCursor$1.current) !== NO_CONTEXT &&
              (push(contextFiberStackCursor, workInProgress, workInProgress),
              push(contextStackCursor$1, NO_CONTEXT, workInProgress));
        }
        return bailoutOnAlreadyFinishedWork(
          current$$1,
          workInProgress,
          renderExpirationTime
        );
      }
    }
  else didReceiveUpdate = !1;
  workInProgress.expirationTime = 0;
  switch (workInProgress.tag) {
    case 2:
      updateExpirationTime = workInProgress.elementType;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      current$$1 = workInProgress.pendingProps;
      var context = getMaskedContext(
        workInProgress,
        contextStackCursor.current
      );
      prepareToReadContext(workInProgress, renderExpirationTime);
      context = renderWithHooks(
        null,
        workInProgress,
        updateExpirationTime,
        current$$1,
        context,
        renderExpirationTime
      );
      workInProgress.effectTag |= 1;
      if (
        "object" === typeof context &&
        null !== context &&
        "function" === typeof context.render &&
        void 0 === context.$$typeof
      ) {
        workInProgress.tag = 1;
        resetHooks();
        if (isContextProvider(updateExpirationTime)) {
          var hasContext = !0;
          pushContextProvider(workInProgress);
        } else hasContext = !1;
        workInProgress.memoizedState =
          null !== context.state && void 0 !== context.state
            ? context.state
            : null;
        var getDerivedStateFromProps =
          updateExpirationTime.getDerivedStateFromProps;
        "function" === typeof getDerivedStateFromProps &&
          applyDerivedStateFromProps(
            workInProgress,
            updateExpirationTime,
            getDerivedStateFromProps,
            current$$1
          );
        context.updater = classComponentUpdater;
        workInProgress.stateNode = context;
        context._reactInternalFiber = workInProgress;
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          current$$1,
          renderExpirationTime
        );
        workInProgress = finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          hasContext,
          renderExpirationTime
        );
      } else
        (workInProgress.tag = 0),
          reconcileChildren(
            null,
            workInProgress,
            context,
            renderExpirationTime
          ),
          (workInProgress = workInProgress.child);
      return workInProgress;
    case 16:
      context = workInProgress.elementType;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      current$$1 = workInProgress.pendingProps;
      context = readLazyComponentType(context);
      workInProgress.type = context;
      hasContext = workInProgress.tag = resolveLazyComponentTag(context);
      current$$1 = resolveDefaultProps(context, current$$1);
      switch (hasContext) {
        case 0:
          workInProgress = updateFunctionComponent(
            null,
            workInProgress,
            context,
            current$$1,
            renderExpirationTime
          );
          break;
        case 1:
          workInProgress = updateClassComponent(
            null,
            workInProgress,
            context,
            current$$1,
            renderExpirationTime
          );
          break;
        case 11:
          workInProgress = updateForwardRef(
            null,
            workInProgress,
            context,
            current$$1,
            renderExpirationTime
          );
          break;
        case 14:
          workInProgress = updateMemoComponent(
            null,
            workInProgress,
            context,
            resolveDefaultProps(context.type, current$$1),
            updateExpirationTime,
            renderExpirationTime
          );
          break;
        default:
          throw ReactErrorProd(306, context, "");
      }
      return workInProgress;
    case 0:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateFunctionComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 1:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateClassComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 3:
      pushHostRootContext(workInProgress);
      updateExpirationTime = workInProgress.updateQueue;
      if (null === updateExpirationTime) throw ReactErrorProd(282);
      context = workInProgress.memoizedState;
      context = null !== context ? context.element : null;
      processUpdateQueue(
        workInProgress,
        updateExpirationTime,
        workInProgress.pendingProps,
        null,
        renderExpirationTime
      );
      updateExpirationTime = workInProgress.memoizedState.element;
      updateExpirationTime === context
        ? (workInProgress = bailoutOnAlreadyFinishedWork(
            current$$1,
            workInProgress,
            renderExpirationTime
          ))
        : (reconcileChildren(
            current$$1,
            workInProgress,
            updateExpirationTime,
            renderExpirationTime
          ),
          (workInProgress = workInProgress.child));
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (hasContext = null !== current$$1 ? current$$1.memoizedProps : null),
        (getDerivedStateFromProps = context.children),
        shouldSetTextContent(updateExpirationTime, context)
          ? (getDerivedStateFromProps = null)
          : null !== hasContext &&
            shouldSetTextContent(updateExpirationTime, hasContext) &&
            (workInProgress.effectTag |= 16),
        markRef(current$$1, workInProgress),
        reconcileChildren(
          current$$1,
          workInProgress,
          getDerivedStateFromProps,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 6:
      return (
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        null
      );
    case 13:
      return updateSuspenseComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 4:
      return (
        pushHostContainer(
          workInProgress,
          workInProgress.stateNode.containerInfo
        ),
        (updateExpirationTime = workInProgress.pendingProps),
        null === current$$1
          ? (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            ))
          : reconcileChildren(
              current$$1,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
        workInProgress.child
      );
    case 11:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateForwardRef(
          current$$1,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 7:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 8:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 12:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 10:
      a: {
        updateExpirationTime = workInProgress.type._context;
        context = workInProgress.pendingProps;
        getDerivedStateFromProps = workInProgress.memoizedProps;
        hasContext = context.value;
        pushProvider(workInProgress, hasContext);
        if (null !== getDerivedStateFromProps) {
          var oldValue = getDerivedStateFromProps.value;
          hasContext = is(oldValue, hasContext)
            ? 0
            : ("function" === typeof updateExpirationTime._calculateChangedBits
                ? updateExpirationTime._calculateChangedBits(
                    oldValue,
                    hasContext
                  )
                : 1073741823) | 0;
          if (0 === hasContext) {
            if (
              getDerivedStateFromProps.children === context.children &&
              !didPerformWorkStackCursor.current
            ) {
              workInProgress = bailoutOnAlreadyFinishedWork(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
              break a;
            }
          } else
            for (
              getDerivedStateFromProps = workInProgress.child,
                null !== getDerivedStateFromProps &&
                  (getDerivedStateFromProps.return = workInProgress);
              null !== getDerivedStateFromProps;

            ) {
              var list = getDerivedStateFromProps.contextDependencies;
              if (null !== list) {
                oldValue = getDerivedStateFromProps.child;
                for (var dependency = list.first; null !== dependency; ) {
                  if (
                    dependency.context === updateExpirationTime &&
                    0 !== (dependency.observedBits & hasContext)
                  ) {
                    1 === getDerivedStateFromProps.tag &&
                      ((dependency = createUpdate(renderExpirationTime)),
                      (dependency.tag = ForceUpdate),
                      enqueueUpdate(getDerivedStateFromProps, dependency));
                    getDerivedStateFromProps.expirationTime <
                      renderExpirationTime &&
                      (getDerivedStateFromProps.expirationTime = renderExpirationTime);
                    dependency = getDerivedStateFromProps.alternate;
                    null !== dependency &&
                      dependency.expirationTime < renderExpirationTime &&
                      (dependency.expirationTime = renderExpirationTime);
                    scheduleWorkOnParentPath(
                      getDerivedStateFromProps.return,
                      renderExpirationTime
                    );
                    list.expirationTime < renderExpirationTime &&
                      (list.expirationTime = renderExpirationTime);
                    break;
                  }
                  dependency = dependency.next;
                }
              } else
                10 === getDerivedStateFromProps.tag
                  ? (oldValue =
                      getDerivedStateFromProps.type === workInProgress.type
                        ? null
                        : getDerivedStateFromProps.child)
                  : 18 === getDerivedStateFromProps.tag
                    ? (getDerivedStateFromProps.expirationTime <
                        renderExpirationTime &&
                        (getDerivedStateFromProps.expirationTime = renderExpirationTime),
                      (oldValue = getDerivedStateFromProps.alternate),
                      null !== oldValue &&
                        oldValue.expirationTime < renderExpirationTime &&
                        (oldValue.expirationTime = renderExpirationTime),
                      scheduleWorkOnParentPath(
                        getDerivedStateFromProps,
                        renderExpirationTime
                      ),
                      (oldValue = getDerivedStateFromProps.sibling))
                    : (oldValue = getDerivedStateFromProps.child);
              if (null !== oldValue) oldValue.return = getDerivedStateFromProps;
              else
                for (oldValue = getDerivedStateFromProps; null !== oldValue; ) {
                  if (oldValue === workInProgress) {
                    oldValue = null;
                    break;
                  }
                  getDerivedStateFromProps = oldValue.sibling;
                  if (null !== getDerivedStateFromProps) {
                    getDerivedStateFromProps.return = oldValue.return;
                    oldValue = getDerivedStateFromProps;
                    break;
                  }
                  oldValue = oldValue.return;
                }
              getDerivedStateFromProps = oldValue;
            }
        }
        reconcileChildren(
          current$$1,
          workInProgress,
          context.children,
          renderExpirationTime
        );
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (context = workInProgress.type),
        (hasContext = workInProgress.pendingProps),
        (updateExpirationTime = hasContext.children),
        prepareToReadContext(workInProgress, renderExpirationTime),
        (context = readContext(context, hasContext.unstable_observedBits)),
        (updateExpirationTime = updateExpirationTime(context)),
        (workInProgress.effectTag |= 1),
        reconcileChildren(
          current$$1,
          workInProgress,
          updateExpirationTime,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 14:
      return (
        (context = workInProgress.type),
        (hasContext = resolveDefaultProps(
          context,
          workInProgress.pendingProps
        )),
        (hasContext = resolveDefaultProps(context.type, hasContext)),
        updateMemoComponent(
          current$$1,
          workInProgress,
          context,
          hasContext,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    case 15:
      return updateSimpleMemoComponent(
        current$$1,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateExpirationTime,
        renderExpirationTime
      );
    case 17:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        null !== current$$1 &&
          ((current$$1.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (workInProgress.tag = 1),
        isContextProvider(updateExpirationTime)
          ? ((current$$1 = !0), pushContextProvider(workInProgress))
          : (current$$1 = !1),
        prepareToReadContext(workInProgress, renderExpirationTime),
        constructClassInstance(
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        ),
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        ),
        finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          current$$1,
          renderExpirationTime
        )
      );
    case 18:
      return updateDehydratedSuspenseComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 19:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        pushHostContextForEventComponent(workInProgress),
        workInProgress.child
      );
    case 20:
      throw Error("Not yet implemented.");
  }
  throw ReactErrorProd(156);
}
var valueCursor = { current: null },
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved = null;
function pushProvider(providerFiber, nextValue) {
  var context = providerFiber.type._context;
  push(valueCursor, context._currentValue2, providerFiber);
  context._currentValue2 = nextValue;
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor, providerFiber);
  providerFiber.type._context._currentValue2 = currentValue;
}
function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    if (parent.childExpirationTime < renderExpirationTime)
      (parent.childExpirationTime = renderExpirationTime),
        null !== alternate &&
          alternate.childExpirationTime < renderExpirationTime &&
          (alternate.childExpirationTime = renderExpirationTime);
    else if (
      null !== alternate &&
      alternate.childExpirationTime < renderExpirationTime
    )
      alternate.childExpirationTime = renderExpirationTime;
    else break;
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  var currentDependencies = workInProgress.contextDependencies;
  null !== currentDependencies &&
    currentDependencies.expirationTime >= renderExpirationTime &&
    (didReceiveUpdate = !0);
  workInProgress.contextDependencies = null;
}
function readContext(context, observedBits) {
  if (
    lastContextWithAllBitsObserved !== context &&
    !1 !== observedBits &&
    0 !== observedBits
  ) {
    if ("number" !== typeof observedBits || 1073741823 === observedBits)
      (lastContextWithAllBitsObserved = context), (observedBits = 1073741823);
    observedBits = { context: context, observedBits: observedBits, next: null };
    if (null === lastContextDependency) {
      if (null === currentlyRenderingFiber) throw ReactErrorProd(308);
      lastContextDependency = observedBits;
      currentlyRenderingFiber.contextDependencies = {
        first: observedBits,
        expirationTime: 0
      };
    } else lastContextDependency = lastContextDependency.next = observedBits;
  }
  return context._currentValue2;
}
var UpdateState = 0,
  ReplaceState = 1,
  ForceUpdate = 2,
  CaptureUpdate = 3,
  hasForceUpdate = !1;
function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function cloneUpdateQueue(currentQueue) {
  return {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function createUpdate(expirationTime) {
  return {
    expirationTime: expirationTime,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}
function appendUpdateToQueue(queue, update) {
  null === queue.lastUpdate
    ? (queue.firstUpdate = queue.lastUpdate = update)
    : ((queue.lastUpdate.next = update), (queue.lastUpdate = update));
}
function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate;
  if (null === alternate) {
    var queue1 = fiber.updateQueue;
    var queue2 = null;
    null === queue1 &&
      (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
  } else
    (queue1 = fiber.updateQueue),
      (queue2 = alternate.updateQueue),
      null === queue1
        ? null === queue2
          ? ((queue1 = fiber.updateQueue = createUpdateQueue(
              fiber.memoizedState
            )),
            (queue2 = alternate.updateQueue = createUpdateQueue(
              alternate.memoizedState
            )))
          : (queue1 = fiber.updateQueue = cloneUpdateQueue(queue2))
        : null === queue2 &&
          (queue2 = alternate.updateQueue = cloneUpdateQueue(queue1));
  null === queue2 || queue1 === queue2
    ? appendUpdateToQueue(queue1, update)
    : null === queue1.lastUpdate || null === queue2.lastUpdate
      ? (appendUpdateToQueue(queue1, update),
        appendUpdateToQueue(queue2, update))
      : (appendUpdateToQueue(queue1, update), (queue2.lastUpdate = update));
}
function enqueueCapturedUpdate(workInProgress, update) {
  var workInProgressQueue = workInProgress.updateQueue;
  workInProgressQueue =
    null === workInProgressQueue
      ? (workInProgress.updateQueue = createUpdateQueue(
          workInProgress.memoizedState
        ))
      : ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
  null === workInProgressQueue.lastCapturedUpdate
    ? (workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update)
    : ((workInProgressQueue.lastCapturedUpdate.next = update),
      (workInProgressQueue.lastCapturedUpdate = update));
}
function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
  var current = workInProgress.alternate;
  null !== current &&
    queue === current.updateQueue &&
    (queue = workInProgress.updateQueue = cloneUpdateQueue(queue));
  return queue;
}
function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  switch (update.tag) {
    case ReplaceState:
      return (
        (workInProgress = update.payload),
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress
      );
    case CaptureUpdate:
      workInProgress.effectTag = (workInProgress.effectTag & -2049) | 64;
    case UpdateState:
      workInProgress = update.payload;
      nextProps =
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress;
      if (null === nextProps || void 0 === nextProps) break;
      return Object.assign({}, prevState, nextProps);
    case ForceUpdate:
      hasForceUpdate = !0;
  }
  return prevState;
}
function processUpdateQueue(
  workInProgress,
  queue,
  props,
  instance,
  renderExpirationTime
) {
  hasForceUpdate = !1;
  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);
  for (
    var newBaseState = queue.baseState,
      newFirstUpdate = null,
      newExpirationTime = 0,
      update = queue.firstUpdate,
      resultState = newBaseState;
    null !== update;

  ) {
    var updateExpirationTime = update.expirationTime;
    updateExpirationTime < renderExpirationTime
      ? (null === newFirstUpdate &&
          ((newFirstUpdate = update), (newBaseState = resultState)),
        newExpirationTime < updateExpirationTime &&
          (newExpirationTime = updateExpirationTime))
      : ((resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastEffect
            ? (queue.firstEffect = queue.lastEffect = update)
            : ((queue.lastEffect.nextEffect = update),
              (queue.lastEffect = update))));
    update = update.next;
  }
  updateExpirationTime = null;
  for (update = queue.firstCapturedUpdate; null !== update; ) {
    var _updateExpirationTime = update.expirationTime;
    _updateExpirationTime < renderExpirationTime
      ? (null === updateExpirationTime &&
          ((updateExpirationTime = update),
          null === newFirstUpdate && (newBaseState = resultState)),
        newExpirationTime < _updateExpirationTime &&
          (newExpirationTime = _updateExpirationTime))
      : ((resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastCapturedEffect
            ? (queue.firstCapturedEffect = queue.lastCapturedEffect = update)
            : ((queue.lastCapturedEffect.nextEffect = update),
              (queue.lastCapturedEffect = update))));
    update = update.next;
  }
  null === newFirstUpdate && (queue.lastUpdate = null);
  null === updateExpirationTime
    ? (queue.lastCapturedUpdate = null)
    : (workInProgress.effectTag |= 32);
  null === newFirstUpdate &&
    null === updateExpirationTime &&
    (newBaseState = resultState);
  queue.baseState = newBaseState;
  queue.firstUpdate = newFirstUpdate;
  queue.firstCapturedUpdate = updateExpirationTime;
  workInProgress.expirationTime = newExpirationTime;
  workInProgress.memoizedState = resultState;
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  null !== finishedQueue.firstCapturedUpdate &&
    (null !== finishedQueue.lastUpdate &&
      ((finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate),
      (finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate)),
    (finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null));
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
  commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
  finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
}
function commitUpdateEffects(effect, instance) {
  for (; null !== effect; ) {
    var _callback3 = effect.callback;
    if (null !== _callback3) {
      effect.callback = null;
      var context = instance;
      if ("function" !== typeof _callback3)
        throw ReactErrorProd(191, _callback3);
      _callback3.call(context);
    }
    effect = effect.nextEffect;
  }
}
function createCapturedValue(value, source) {
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
var appendAllChildren = void 0,
  updateHostContainer = void 0,
  updateHostComponent$1 = void 0,
  updateHostText$1 = void 0;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) {
      var parentInstance = parent,
        child = node.stateNode;
      if ("string" === typeof child) throw ReactErrorProd(216);
      child.inject(parentInstance);
    } else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
updateHostContainer = function() {};
updateHostComponent$1 = function(current, workInProgress, type, newProps) {
  current.memoizedProps !== newProps &&
    (requiredContext(contextStackCursor$1.current),
    (workInProgress.updateQueue = UPDATE_SIGNAL)) &&
    (workInProgress.effectTag |= 4);
};
updateHostText$1 = function(current, workInProgress, oldText, newText) {
  oldText !== newText && (workInProgress.effectTag |= 4);
};
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw ReactErrorProd(320);
function logCapturedError(capturedError) {
  !1 !== ReactFiberErrorDialogWWW.showErrorDialog(capturedError) &&
    console.error(capturedError.error);
}
var PossiblyWeakSet$1 = "function" === typeof WeakSet ? WeakSet : Set;
function logError(boundary, errorInfo) {
  var source = errorInfo.source,
    stack = errorInfo.stack;
  null === stack &&
    null !== source &&
    (stack = getStackByFiberInDevAndProd(source));
  errorInfo = {
    componentName: null !== source ? getComponentName(source.type) : null,
    componentStack: null !== stack ? stack : "",
    error: errorInfo.value,
    errorBoundary: null,
    errorBoundaryName: null,
    errorBoundaryFound: !1,
    willRetry: !1
  };
  null !== boundary &&
    1 === boundary.tag &&
    ((errorInfo.errorBoundary = boundary.stateNode),
    (errorInfo.errorBoundaryName = getComponentName(boundary.type)),
    (errorInfo.errorBoundaryFound = !0),
    (errorInfo.willRetry = !0));
  try {
    logCapturedError(errorInfo);
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function safelyDetachRef(current$$1) {
  var ref = current$$1.ref;
  if (null !== ref)
    if ("function" === typeof ref)
      try {
        ref(null);
      } catch (refError) {
        captureCommitPhaseError$$1(current$$1, refError);
      }
    else ref.current = null;
}
function commitHookEffectList(unmountTag, mountTag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = (finishedWork = finishedWork.next);
    do {
      if (0 !== (effect.tag & unmountTag)) {
        var destroy = effect.destroy;
        effect.destroy = void 0;
        void 0 !== destroy && destroy();
      }
      0 !== (effect.tag & mountTag) &&
        ((destroy = effect.create), (effect.destroy = destroy()));
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function hideOrUnhideAllChildren(finishedWork, isHidden) {
  for (var node = finishedWork; ; ) {
    if (5 === node.tag) {
      var instance = node.stateNode;
      isHidden
        ? instance.hide()
        : ((instance = node.memoizedProps),
          (null == instance.visible || instance.visible) &&
            node.stateNode.show());
    } else if (6 !== node.tag)
      if (13 === node.tag && null !== node.memoizedState) {
        instance = node.child.sibling;
        instance.return = node;
        node = instance;
        continue;
      } else if (null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
    if (node === finishedWork) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitUnmount(current$$1$jscomp$0) {
  "function" === typeof onCommitFiberUnmount &&
    onCommitFiberUnmount(current$$1$jscomp$0);
  switch (current$$1$jscomp$0.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      var updateQueue = current$$1$jscomp$0.updateQueue;
      if (
        null !== updateQueue &&
        ((updateQueue = updateQueue.lastEffect), null !== updateQueue)
      ) {
        var effect = (updateQueue = updateQueue.next);
        do {
          var destroy = effect.destroy;
          if (void 0 !== destroy) {
            var current$$1 = current$$1$jscomp$0;
            try {
              destroy();
            } catch (error) {
              captureCommitPhaseError$$1(current$$1, error);
            }
          }
          effect = effect.next;
        } while (effect !== updateQueue);
      }
      break;
    case 1:
      safelyDetachRef(current$$1$jscomp$0);
      updateQueue = current$$1$jscomp$0.stateNode;
      if ("function" === typeof updateQueue.componentWillUnmount)
        try {
          (updateQueue.props = current$$1$jscomp$0.memoizedProps),
            (updateQueue.state = current$$1$jscomp$0.memoizedState),
            updateQueue.componentWillUnmount();
        } catch (unmountError) {
          captureCommitPhaseError$$1(current$$1$jscomp$0, unmountError);
        }
      break;
    case 5:
      safelyDetachRef(current$$1$jscomp$0);
      break;
    case 4:
      unmountHostComponents(current$$1$jscomp$0);
      break;
    case 19:
      throw Error("Not yet implemented.");
  }
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent; ) {
      if (isHostParent(parent)) {
        var parentFiber = parent;
        break a;
      }
      parent = parent.return;
    }
    throw ReactErrorProd(160);
  }
  switch (parentFiber.tag) {
    case 5:
      parent = parentFiber.stateNode;
      var isContainer = !1;
      break;
    case 3:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = !0;
      break;
    case 4:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = !0;
      break;
    default:
      throw ReactErrorProd(161);
  }
  parentFiber.effectTag & 16 && (parentFiber.effectTag &= -17);
  a: b: for (parentFiber = finishedWork; ; ) {
    for (; null === parentFiber.sibling; ) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a;
      }
      parentFiber = parentFiber.return;
    }
    parentFiber.sibling.return = parentFiber.return;
    for (
      parentFiber = parentFiber.sibling;
      5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;

    ) {
      if (parentFiber.effectTag & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;
      else
        (parentFiber.child.return = parentFiber),
          (parentFiber = parentFiber.child);
    }
    if (!(parentFiber.effectTag & 2)) {
      parentFiber = parentFiber.stateNode;
      break a;
    }
  }
  for (var node = finishedWork; ; ) {
    if (5 === node.tag || 6 === node.tag) {
      var stateNode = node.stateNode;
      if (parentFiber)
        if (isContainer) {
          var beforeChild = parentFiber;
          if (stateNode === beforeChild) throw ReactErrorProd(218);
          stateNode.injectBefore(beforeChild);
        } else {
          beforeChild = parentFiber;
          if (stateNode === beforeChild) throw ReactErrorProd(218);
          stateNode.injectBefore(beforeChild);
        }
      else
        (beforeChild = parent),
          stateNode.parentNode === beforeChild && stateNode.eject(),
          stateNode.inject(beforeChild);
    } else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function unmountHostComponents(current$$1) {
  for (
    var node = current$$1,
      currentParentIsValid = !1,
      currentParent = void 0,
      currentParentIsContainer = void 0;
    ;

  ) {
    if (!currentParentIsValid) {
      currentParentIsValid = node.return;
      a: for (;;) {
        if (null === currentParentIsValid) throw ReactErrorProd(160);
        switch (currentParentIsValid.tag) {
          case 5:
            currentParent = currentParentIsValid.stateNode;
            currentParentIsContainer = !1;
            break a;
          case 3:
            currentParent = currentParentIsValid.stateNode.containerInfo;
            currentParentIsContainer = !0;
            break a;
          case 4:
            currentParent = currentParentIsValid.stateNode.containerInfo;
            currentParentIsContainer = !0;
            break a;
        }
        currentParentIsValid = currentParentIsValid.return;
      }
      currentParentIsValid = !0;
    }
    if (5 === node.tag || 6 === node.tag) {
      a: for (var root = node, node$jscomp$0 = root; ; )
        if (
          (commitUnmount(node$jscomp$0),
          null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag)
        )
          (node$jscomp$0.child.return = node$jscomp$0),
            (node$jscomp$0 = node$jscomp$0.child);
        else {
          if (node$jscomp$0 === root) break;
          for (; null === node$jscomp$0.sibling; ) {
            if (null === node$jscomp$0.return || node$jscomp$0.return === root)
              break a;
            node$jscomp$0 = node$jscomp$0.return;
          }
          node$jscomp$0.sibling.return = node$jscomp$0.return;
          node$jscomp$0 = node$jscomp$0.sibling;
        }
      (root = node.stateNode), destroyEventListeners(root), root.eject();
    } else if (18 === node.tag) shim$1(currentParent, node.stateNode);
    else if (4 === node.tag) {
      if (null !== node.child) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = !0;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if ((commitUnmount(node), null !== node.child)) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === current$$1) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === current$$1) return;
      node = node.return;
      4 === node.tag && (currentParentIsValid = !1);
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitWork(current$$1, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      commitHookEffectList(4, 8, finishedWork);
      break;
    case 1:
      break;
    case 5:
      var instance = finishedWork.stateNode;
      if (null != instance) {
        var newProps = finishedWork.memoizedProps;
        current$$1 = null !== current$$1 ? current$$1.memoizedProps : newProps;
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        null !== updatePayload &&
          instance._applyProps(instance, newProps, current$$1);
      }
      break;
    case 6:
      if (null === finishedWork.stateNode) throw ReactErrorProd(162);
      break;
    case 20:
      instance = null;
      for (finishedWork = finishedWork.return; null !== finishedWork; ) {
        if (5 === finishedWork.tag) {
          instance = finishedWork.stateNode;
          break;
        } else if (3 === finishedWork.tag) {
          instance = finishedWork.stateNode.containerInfo;
          break;
        }
        finishedWork = finishedWork.return;
      }
      if (null === instance)
        throw ((finishedWork = Error(
          "This should have a parent host component initialized. This error is likely caused by a bug in React. Please file an issue."
        )),
        (finishedWork.name = "Invariant Violation"),
        finishedWork);
      throw Error("Not yet implemented.");
    case 3:
      break;
    case 12:
      break;
    case 13:
      commitSuspenseComponent(finishedWork);
      break;
    case 17:
      break;
    default:
      throw ReactErrorProd(163);
  }
}
function commitSuspenseComponent(finishedWork) {
  var newState = finishedWork.memoizedState,
    newDidTimeout = void 0,
    primaryChildParent = finishedWork;
  null === newState
    ? (newDidTimeout = !1)
    : ((newDidTimeout = !0),
      (primaryChildParent = finishedWork.child),
      0 === newState.timedOutAt &&
        (newState.timedOutAt = requestCurrentTime$$1()));
  null !== primaryChildParent &&
    hideOrUnhideAllChildren(primaryChildParent, newDidTimeout);
  newState = finishedWork.updateQueue;
  if (null !== newState) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache &&
      (retryCache = finishedWork.stateNode = new PossiblyWeakSet$1());
    newState.forEach(function(thenable) {
      var retry = resolveRetryThenable$$1.bind(null, finishedWork, thenable);
      retryCache.has(thenable) ||
        (retryCache.add(thenable), thenable.then(retry, retry));
    });
  }
}
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set,
  PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime);
  expirationTime.tag = CaptureUpdate;
  expirationTime.payload = { element: null };
  var error = errorInfo.value;
  expirationTime.callback = function() {
    onUncaughtError$$1(error);
    logError(fiber, errorInfo);
  };
  return expirationTime;
}
function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime);
  expirationTime.tag = CaptureUpdate;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error$jscomp$0 = errorInfo.value;
    expirationTime.payload = function() {
      return getDerivedStateFromError(error$jscomp$0);
    };
  }
  var inst = fiber.stateNode;
  null !== inst &&
    "function" === typeof inst.componentDidCatch &&
    (expirationTime.callback = function() {
      "function" !== typeof getDerivedStateFromError &&
        (null === legacyErrorBoundariesThatAlreadyFailed
          ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed.add(this));
      var error = errorInfo.value,
        stack = errorInfo.stack;
      logError(fiber, errorInfo);
      this.componentDidCatch(error, {
        componentStack: null !== stack ? stack : ""
      });
    });
  return expirationTime;
}
function attachPingListener(root, renderExpirationTime, thenable) {
  var pingCache = root.pingCache;
  if (null === pingCache) {
    pingCache = root.pingCache = new PossiblyWeakMap();
    var threadIDs = new Set();
    pingCache.set(thenable, threadIDs);
  } else
    (threadIDs = pingCache.get(thenable)),
      void 0 === threadIDs &&
        ((threadIDs = new Set()), pingCache.set(thenable, threadIDs));
  threadIDs.has(renderExpirationTime) ||
    (threadIDs.add(renderExpirationTime),
    (root = pingSuspendedRoot$$1.bind(
      null,
      root,
      thenable,
      renderExpirationTime
    )),
    thenable.then(root, root));
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      isContextProvider(workInProgress.type) && popContext(workInProgress);
      var effectTag = workInProgress.effectTag;
      return effectTag & 2048
        ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
          workInProgress)
        : null;
    case 3:
      popHostContainer(workInProgress);
      popTopLevelContextObject(workInProgress);
      effectTag = workInProgress.effectTag;
      if (0 !== (effectTag & 64)) throw ReactErrorProd(285);
      workInProgress.effectTag = (effectTag & -2049) | 64;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      return (
        (effectTag = workInProgress.effectTag),
        effectTag & 2048
          ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
            workInProgress)
          : null
      );
    case 18:
      return (
        (effectTag = workInProgress.effectTag),
        effectTag & 2048
          ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
            workInProgress)
          : null
      );
    case 4:
      return popHostContainer(workInProgress), null;
    case 10:
      return popProvider(workInProgress), null;
    case 19:
    case 20:
      return popHostContext(workInProgress), null;
    default:
      return null;
  }
}
var scheduleCallback$1 = Scheduler.unstable_scheduleCallback,
  cancelCallback$1 = Scheduler.unstable_cancelCallback,
  shouldYield$2 = Scheduler.unstable_shouldYield,
  now$2 = Scheduler.unstable_now,
  getCurrentPriorityLevel$1 = Scheduler.unstable_getCurrentPriorityLevel,
  NormalPriority$1 = Scheduler.unstable_NormalPriority,
  ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  isWorking = !1,
  nextUnitOfWork = null,
  nextRoot = null,
  nextRenderExpirationTime = 0,
  nextLatestAbsoluteTimeoutMs = -1,
  nextRenderDidError = !1,
  nextEffect = null,
  isCommitting$1 = !1,
  rootWithPendingPassiveEffects = null,
  passiveEffectCallbackHandle = null,
  passiveEffectCallback = null,
  legacyErrorBoundariesThatAlreadyFailed = null;
function resetStack() {
  if (null !== nextUnitOfWork)
    for (
      var interruptedWork = nextUnitOfWork.return;
      null !== interruptedWork;

    ) {
      var interruptedWork$jscomp$0 = interruptedWork;
      switch (interruptedWork$jscomp$0.tag) {
        case 1:
          var childContextTypes =
            interruptedWork$jscomp$0.type.childContextTypes;
          null !== childContextTypes &&
            void 0 !== childContextTypes &&
            popContext(interruptedWork$jscomp$0);
          break;
        case 3:
          popHostContainer(interruptedWork$jscomp$0);
          popTopLevelContextObject(interruptedWork$jscomp$0);
          break;
        case 5:
          popHostContext(interruptedWork$jscomp$0);
          break;
        case 4:
          popHostContainer(interruptedWork$jscomp$0);
          break;
        case 10:
          popProvider(interruptedWork$jscomp$0);
      }
      interruptedWork = interruptedWork.return;
    }
  nextRoot = null;
  nextRenderExpirationTime = 0;
  nextLatestAbsoluteTimeoutMs = -1;
  nextRenderDidError = !1;
  nextUnitOfWork = null;
}
function commitPassiveEffects(root, firstEffect) {
  passiveEffectCallback = passiveEffectCallbackHandle = rootWithPendingPassiveEffects = null;
  var previousIsRendering = isRendering;
  isRendering = !0;
  do {
    if (firstEffect.effectTag & 512) {
      var didError = !1,
        error = void 0;
      try {
        var finishedWork = firstEffect;
        commitHookEffectList(128, 0, finishedWork);
        commitHookEffectList(0, 64, finishedWork);
      } catch (e) {
        (didError = !0), (error = e);
      }
      didError && captureCommitPhaseError$1(firstEffect, error);
    }
    firstEffect = firstEffect.nextEffect;
  } while (null !== firstEffect);
  isRendering = previousIsRendering;
  previousIsRendering = root.expirationTime;
  0 !== previousIsRendering && requestWork(root, previousIsRendering);
  isBatchingUpdates || isRendering || performWork(1073741823);
}
function isAlreadyFailedLegacyErrorBoundary$1(instance) {
  return (
    null !== legacyErrorBoundariesThatAlreadyFailed &&
    legacyErrorBoundariesThatAlreadyFailed.has(instance)
  );
}
function flushPassiveEffects$1() {
  var didFlushEffects = null !== passiveEffectCallback;
  null !== passiveEffectCallbackHandle &&
    cancelCallback$1(passiveEffectCallbackHandle);
  null !== passiveEffectCallback && passiveEffectCallback();
  return didFlushEffects;
}
function completeUnitOfWork(workInProgress) {
  for (;;) {
    var current$$1 = workInProgress.alternate,
      returnFiber = workInProgress.return,
      siblingFiber = workInProgress.sibling;
    if (0 === (workInProgress.effectTag & 1024)) {
      nextUnitOfWork = workInProgress;
      a: {
        var instance = current$$1;
        current$$1 = workInProgress;
        var renderExpirationTime = nextRenderExpirationTime,
          newProps = current$$1.pendingProps;
        switch (current$$1.tag) {
          case 2:
            break;
          case 16:
            break;
          case 15:
          case 0:
            break;
          case 1:
            isContextProvider(current$$1.type) && popContext(current$$1);
            break;
          case 3:
            popHostContainer(current$$1);
            popTopLevelContextObject(current$$1);
            newProps = current$$1.stateNode;
            newProps.pendingContext &&
              ((newProps.context = newProps.pendingContext),
              (newProps.pendingContext = null));
            if (null === instance || null === instance.child)
              current$$1.effectTag &= -3;
            updateHostContainer(current$$1);
            break;
          case 5:
            popHostContext(current$$1);
            var rootContainerInstance = requiredContext(
              rootInstanceStackCursor.current
            );
            renderExpirationTime = current$$1.type;
            if (null !== instance && null != current$$1.stateNode)
              updateHostComponent$1(
                instance,
                current$$1,
                renderExpirationTime,
                newProps,
                rootContainerInstance
              ),
                instance.ref !== current$$1.ref &&
                  (current$$1.effectTag |= 128);
            else if (newProps) {
              requiredContext(contextStackCursor$1.current);
              instance = void 0;
              switch (renderExpirationTime) {
                case TYPES.CLIPPING_RECTANGLE:
                  instance = Mode.ClippingRectangle();
                  instance._applyProps = applyClippingRectangleProps;
                  break;
                case TYPES.GROUP:
                  instance = Mode.Group();
                  instance._applyProps = applyGroupProps;
                  break;
                case TYPES.SHAPE:
                  instance = Mode.Shape();
                  instance._applyProps = applyShapeProps;
                  break;
                case TYPES.TEXT:
                  (instance = Mode.Text(
                    newProps.children,
                    newProps.font,
                    newProps.alignment,
                    newProps.path
                  )),
                    (instance._applyProps = applyTextProps);
              }
              if (!instance) throw ReactErrorProd(217, renderExpirationTime);
              instance._applyProps(instance, newProps);
              appendAllChildren(instance, current$$1, !1, !1);
              current$$1.stateNode = instance;
              null !== current$$1.ref && (current$$1.effectTag |= 128);
            } else if (null === current$$1.stateNode) throw ReactErrorProd(166);
            break;
          case 6:
            if (instance && null != current$$1.stateNode)
              updateHostText$1(
                instance,
                current$$1,
                instance.memoizedProps,
                newProps
              );
            else {
              if ("string" !== typeof newProps && null === current$$1.stateNode)
                throw ReactErrorProd(166);
              requiredContext(rootInstanceStackCursor.current);
              requiredContext(contextStackCursor$1.current);
              current$$1.stateNode = newProps;
            }
            break;
          case 11:
            break;
          case 13:
            newProps = current$$1.memoizedState;
            if (0 !== (current$$1.effectTag & 64)) {
              current$$1.expirationTime = renderExpirationTime;
              nextUnitOfWork = current$$1;
              break a;
            }
            newProps = null !== newProps;
            renderExpirationTime =
              null !== instance && null !== instance.memoizedState;
            null !== instance &&
              !newProps &&
              renderExpirationTime &&
              ((instance = instance.child.sibling),
              null !== instance &&
                ((rootContainerInstance = current$$1.firstEffect),
                null !== rootContainerInstance
                  ? ((current$$1.firstEffect = instance),
                    (instance.nextEffect = rootContainerInstance))
                  : ((current$$1.firstEffect = current$$1.lastEffect = instance),
                    (instance.nextEffect = null)),
                (instance.effectTag = 8)));
            if (newProps || renderExpirationTime) current$$1.effectTag |= 4;
            break;
          case 7:
            break;
          case 8:
            break;
          case 12:
            break;
          case 4:
            popHostContainer(current$$1);
            updateHostContainer(current$$1);
            break;
          case 10:
            popProvider(current$$1);
            break;
          case 9:
            break;
          case 14:
            break;
          case 17:
            isContextProvider(current$$1.type) && popContext(current$$1);
            break;
          case 18:
            if (null === instance) {
              throw ReactErrorProd(318);
              throw ReactErrorProd(316);
            }
            0 === (current$$1.effectTag & 64) &&
              ((instance.alternate = null),
              (current$$1.alternate = null),
              (current$$1.tag = 13),
              (current$$1.memoizedState = null),
              (current$$1.stateNode = null));
            break;
          case 19:
            throw (popHostContext(current$$1),
            (returnFiber = requiredContext(rootInstanceStackCursor.current)),
            (current$$1.stateNode.props = newProps),
            (current$$1.stateNode.rootInstance = returnFiber),
            Error("Not yet implemented."));
          case 20:
            throw (popHostContext(current$$1),
            requiredContext(rootInstanceStackCursor.current),
            Error("Not yet implemented."));
          default:
            throw ReactErrorProd(156);
        }
        nextUnitOfWork = null;
      }
      current$$1 = workInProgress;
      if (
        1 === nextRenderExpirationTime ||
        1 !== current$$1.childExpirationTime
      ) {
        instance = 0;
        for (newProps = current$$1.child; null !== newProps; )
          (renderExpirationTime = newProps.expirationTime),
            (rootContainerInstance = newProps.childExpirationTime),
            renderExpirationTime > instance &&
              (instance = renderExpirationTime),
            rootContainerInstance > instance &&
              (instance = rootContainerInstance),
            (newProps = newProps.sibling);
        current$$1.childExpirationTime = instance;
      }
      if (null !== nextUnitOfWork) return nextUnitOfWork;
      null !== returnFiber &&
        0 === (returnFiber.effectTag & 1024) &&
        (null === returnFiber.firstEffect &&
          (returnFiber.firstEffect = workInProgress.firstEffect),
        null !== workInProgress.lastEffect &&
          (null !== returnFiber.lastEffect &&
            (returnFiber.lastEffect.nextEffect = workInProgress.firstEffect),
          (returnFiber.lastEffect = workInProgress.lastEffect)),
        1 < workInProgress.effectTag &&
          (null !== returnFiber.lastEffect
            ? (returnFiber.lastEffect.nextEffect = workInProgress)
            : (returnFiber.firstEffect = workInProgress),
          (returnFiber.lastEffect = workInProgress)));
    } else {
      workInProgress = unwindWork(workInProgress, nextRenderExpirationTime);
      if (null !== workInProgress)
        return (workInProgress.effectTag &= 1023), workInProgress;
      null !== returnFiber &&
        ((returnFiber.firstEffect = returnFiber.lastEffect = null),
        (returnFiber.effectTag |= 1024));
    }
    if (null !== siblingFiber) return siblingFiber;
    if (null !== returnFiber) workInProgress = returnFiber;
    else break;
  }
  return null;
}
function performUnitOfWork(workInProgress) {
  var next = beginWork(
    workInProgress.alternate,
    workInProgress,
    nextRenderExpirationTime
  );
  workInProgress.memoizedProps = workInProgress.pendingProps;
  null === next && (next = completeUnitOfWork(workInProgress));
  ReactCurrentOwner$1.current = null;
  return next;
}
function renderRoot(root$jscomp$0, isYieldy) {
  if (isWorking) throw ReactErrorProd(243);
  flushPassiveEffects$1();
  isWorking = !0;
  var previousDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  var expirationTime = root$jscomp$0.nextExpirationTimeToWorkOn;
  if (
    expirationTime !== nextRenderExpirationTime ||
    root$jscomp$0 !== nextRoot ||
    null === nextUnitOfWork
  )
    resetStack(),
      (nextRoot = root$jscomp$0),
      (nextRenderExpirationTime = expirationTime),
      (nextUnitOfWork = createWorkInProgress(
        nextRoot.current,
        null,
        nextRenderExpirationTime
      )),
      (root$jscomp$0.pendingCommitExpirationTime = 0);
  var didFatal = !1;
  do {
    try {
      if (isYieldy)
        for (; null !== nextUnitOfWork && !shouldYield$2(); )
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      else
        for (; null !== nextUnitOfWork; )
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    } catch (thrownValue) {
      if (
        ((lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null),
        resetHooks(),
        null === nextUnitOfWork)
      )
        (didFatal = !0), onUncaughtError$1(thrownValue);
      else {
        if (null === nextUnitOfWork) throw ReactErrorProd(271);
        var sourceFiber = nextUnitOfWork,
          returnFiber = sourceFiber.return;
        if (null === returnFiber)
          (didFatal = !0), onUncaughtError$1(thrownValue);
        else {
          a: {
            var root = root$jscomp$0,
              returnFiber$jscomp$0 = returnFiber,
              sourceFiber$jscomp$0 = sourceFiber,
              value = thrownValue;
            returnFiber = nextRenderExpirationTime;
            sourceFiber$jscomp$0.effectTag |= 1024;
            sourceFiber$jscomp$0.firstEffect = sourceFiber$jscomp$0.lastEffect = null;
            if (
              null !== value &&
              "object" === typeof value &&
              "function" === typeof value.then
            ) {
              var thenable = value;
              value = returnFiber$jscomp$0;
              var earliestTimeoutMs = -1,
                startTimeMs = -1;
              do {
                if (13 === value.tag) {
                  var current$$1 = value.alternate;
                  if (
                    null !== current$$1 &&
                    ((current$$1 = current$$1.memoizedState),
                    null !== current$$1)
                  ) {
                    startTimeMs = 10 * (1073741822 - current$$1.timedOutAt);
                    break;
                  }
                  if (-1 === earliestTimeoutMs || 150 < earliestTimeoutMs)
                    earliestTimeoutMs = 150;
                }
                value = value.return;
              } while (null !== value);
              value = returnFiber$jscomp$0;
              do {
                if (
                  13 === value.tag &&
                  (void 0 === value.memoizedProps.fallback
                    ? 0
                    : null === value.memoizedState)
                ) {
                  returnFiber$jscomp$0 = value.updateQueue;
                  null === returnFiber$jscomp$0
                    ? ((returnFiber$jscomp$0 = new Set()),
                      returnFiber$jscomp$0.add(thenable),
                      (value.updateQueue = returnFiber$jscomp$0))
                    : returnFiber$jscomp$0.add(thenable);
                  if (0 === (value.mode & 1)) {
                    value.effectTag |= 64;
                    sourceFiber$jscomp$0.effectTag &= -1957;
                    1 === sourceFiber$jscomp$0.tag &&
                      (null === sourceFiber$jscomp$0.alternate
                        ? (sourceFiber$jscomp$0.tag = 17)
                        : ((returnFiber = createUpdate(1073741823)),
                          (returnFiber.tag = ForceUpdate),
                          enqueueUpdate(sourceFiber$jscomp$0, returnFiber)));
                    sourceFiber$jscomp$0.expirationTime = 1073741823;
                    break a;
                  }
                  attachPingListener(root, returnFiber, thenable);
                  -1 === earliestTimeoutMs
                    ? (thenable = 1073741823)
                    : (-1 === startTimeMs &&
                        (startTimeMs =
                          10 *
                            (1073741822 -
                              findEarliestOutstandingPriorityLevel(
                                root,
                                returnFiber
                              )) -
                          5e3),
                      (thenable = startTimeMs + earliestTimeoutMs));
                  0 <= thenable &&
                    nextLatestAbsoluteTimeoutMs < thenable &&
                    (nextLatestAbsoluteTimeoutMs = thenable);
                  value.effectTag |= 2048;
                  value.expirationTime = returnFiber;
                  break a;
                }
                if (18 === value.tag) {
                  attachPingListener(root, returnFiber, thenable);
                  root = value.memoizedState;
                  if (null === root) {
                    root = value.memoizedState = new PossiblyWeakSet();
                    sourceFiber$jscomp$0 = value.alternate;
                    if (!sourceFiber$jscomp$0) throw ReactErrorProd(319);
                    sourceFiber$jscomp$0.memoizedState = root;
                  }
                  root.has(thenable) ||
                    (root.add(thenable),
                    (root = resolveRetryThenable$$1.bind(
                      null,
                      value,
                      thenable
                    )),
                    thenable.then(root, root));
                  value.effectTag |= 2048;
                  value.expirationTime = returnFiber;
                  break a;
                }
                value = value.return;
              } while (null !== value);
              value = Error(
                (getComponentName(sourceFiber$jscomp$0.type) ||
                  "A React component") +
                  " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                  getStackByFiberInDevAndProd(sourceFiber$jscomp$0)
              );
            }
            nextRenderDidError = !0;
            value = createCapturedValue(value, sourceFiber$jscomp$0);
            thenable = returnFiber$jscomp$0;
            do {
              switch (thenable.tag) {
                case 3:
                  thenable.effectTag |= 2048;
                  thenable.expirationTime = returnFiber;
                  returnFiber = createRootErrorUpdate(
                    thenable,
                    value,
                    returnFiber
                  );
                  enqueueCapturedUpdate(thenable, returnFiber);
                  break a;
                case 1:
                  if (
                    ((root = value),
                    (sourceFiber$jscomp$0 = thenable.type),
                    (earliestTimeoutMs = thenable.stateNode),
                    0 === (thenable.effectTag & 64) &&
                      ("function" ===
                        typeof sourceFiber$jscomp$0.getDerivedStateFromError ||
                        (null !== earliestTimeoutMs &&
                          "function" ===
                            typeof earliestTimeoutMs.componentDidCatch &&
                          !isAlreadyFailedLegacyErrorBoundary$$1(
                            earliestTimeoutMs
                          ))))
                  ) {
                    thenable.effectTag |= 2048;
                    thenable.expirationTime = returnFiber;
                    returnFiber = createClassErrorUpdate(
                      thenable,
                      root,
                      returnFiber
                    );
                    enqueueCapturedUpdate(thenable, returnFiber);
                    break a;
                  }
              }
              thenable = thenable.return;
            } while (null !== thenable);
          }
          nextUnitOfWork = completeUnitOfWork(sourceFiber);
          continue;
        }
      }
    }
    break;
  } while (1);
  isWorking = !1;
  ReactCurrentDispatcher.current = previousDispatcher;
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
  resetHooks();
  if (didFatal) (nextRoot = null), (root$jscomp$0.finishedWork = null);
  else if (null !== nextUnitOfWork) root$jscomp$0.finishedWork = null;
  else {
    previousDispatcher = root$jscomp$0.current.alternate;
    if (null === previousDispatcher) throw ReactErrorProd(281);
    nextRoot = null;
    if (nextRenderDidError) {
      didFatal = root$jscomp$0.latestPendingTime;
      sourceFiber = root$jscomp$0.latestSuspendedTime;
      returnFiber = root$jscomp$0.latestPingedTime;
      if (
        (0 !== didFatal && didFatal < expirationTime) ||
        (0 !== sourceFiber && sourceFiber < expirationTime) ||
        (0 !== returnFiber && returnFiber < expirationTime)
      ) {
        markSuspendedPriorityLevel(root$jscomp$0, expirationTime);
        onSuspend(
          root$jscomp$0,
          previousDispatcher,
          expirationTime,
          root$jscomp$0.expirationTime,
          -1
        );
        return;
      }
      if (!root$jscomp$0.didError && isYieldy) {
        root$jscomp$0.didError = !0;
        expirationTime = root$jscomp$0.nextExpirationTimeToWorkOn = expirationTime;
        isYieldy = root$jscomp$0.expirationTime = 1073741823;
        onSuspend(
          root$jscomp$0,
          previousDispatcher,
          expirationTime,
          isYieldy,
          -1
        );
        return;
      }
    }
    isYieldy && -1 !== nextLatestAbsoluteTimeoutMs
      ? (markSuspendedPriorityLevel(root$jscomp$0, expirationTime),
        (isYieldy =
          10 *
          (1073741822 -
            findEarliestOutstandingPriorityLevel(
              root$jscomp$0,
              expirationTime
            ))),
        isYieldy < nextLatestAbsoluteTimeoutMs &&
          (nextLatestAbsoluteTimeoutMs = isYieldy),
        (isYieldy = 10 * (1073741822 - requestCurrentTime$1())),
        (isYieldy = nextLatestAbsoluteTimeoutMs - isYieldy),
        onSuspend(
          root$jscomp$0,
          previousDispatcher,
          expirationTime,
          root$jscomp$0.expirationTime,
          0 > isYieldy ? 0 : isYieldy
        ))
      : ((root$jscomp$0.pendingCommitExpirationTime = expirationTime),
        (root$jscomp$0.finishedWork = previousDispatcher));
  }
}
function captureCommitPhaseError$1(sourceFiber, value) {
  for (var fiber = sourceFiber.return; null !== fiber; ) {
    switch (fiber.tag) {
      case 1:
        var instance = fiber.stateNode;
        if (
          "function" === typeof fiber.type.getDerivedStateFromError ||
          ("function" === typeof instance.componentDidCatch &&
            !isAlreadyFailedLegacyErrorBoundary$1(instance))
        ) {
          sourceFiber = createCapturedValue(value, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          scheduleWork$1(fiber, 1073741823);
          return;
        }
        break;
      case 3:
        sourceFiber = createCapturedValue(value, sourceFiber);
        sourceFiber = createRootErrorUpdate(fiber, sourceFiber, 1073741823);
        enqueueUpdate(fiber, sourceFiber);
        scheduleWork$1(fiber, 1073741823);
        return;
    }
    fiber = fiber.return;
  }
  3 === sourceFiber.tag &&
    ((fiber = createCapturedValue(value, sourceFiber)),
    (fiber = createRootErrorUpdate(sourceFiber, fiber, 1073741823)),
    enqueueUpdate(sourceFiber, fiber),
    scheduleWork$1(sourceFiber, 1073741823));
}
function computeExpirationForFiber$1(currentTime, fiber) {
  isWorking
    ? (currentTime = isCommitting$1 ? 1073741823 : nextRenderExpirationTime)
    : fiber.mode & 1
      ? ((currentTime = isBatchingInteractiveUpdates
          ? computeExpirationBucket(currentTime, 150, 100)
          : computeExpirationBucket(currentTime, 5e3, 250)),
        null !== nextRoot &&
          currentTime === nextRenderExpirationTime &&
          --currentTime)
      : (currentTime = 1073741823);
  return currentTime;
}
function retryTimedOutBoundary$1(boundaryFiber) {
  var currentTime = requestCurrentTime$1();
  currentTime = computeExpirationForFiber$1(currentTime, boundaryFiber);
  boundaryFiber = scheduleWorkToRoot(boundaryFiber, currentTime);
  null !== boundaryFiber &&
    (markPendingPriorityLevel(boundaryFiber, currentTime),
    (currentTime = boundaryFiber.expirationTime),
    0 !== currentTime && requestWork(boundaryFiber, currentTime));
}
function scheduleWorkToRoot(fiber, expirationTime) {
  fiber.expirationTime < expirationTime &&
    (fiber.expirationTime = expirationTime);
  var alternate = fiber.alternate;
  null !== alternate &&
    alternate.expirationTime < expirationTime &&
    (alternate.expirationTime = expirationTime);
  var node = fiber.return,
    root = null;
  if (null === node && 3 === fiber.tag) root = fiber.stateNode;
  else
    for (; null !== node; ) {
      alternate = node.alternate;
      node.childExpirationTime < expirationTime &&
        (node.childExpirationTime = expirationTime);
      null !== alternate &&
        alternate.childExpirationTime < expirationTime &&
        (alternate.childExpirationTime = expirationTime);
      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  return root;
}
function scheduleWork$1(fiber, expirationTime) {
  fiber = scheduleWorkToRoot(fiber, expirationTime);
  if (
    null !== fiber &&
    (!isWorking &&
      0 !== nextRenderExpirationTime &&
      expirationTime > nextRenderExpirationTime &&
      resetStack(),
    markPendingPriorityLevel(fiber, expirationTime),
    (isWorking && !isCommitting$1 && nextRoot === fiber) ||
      requestWork(fiber, fiber.expirationTime),
    nestedUpdateCount > NESTED_UPDATE_LIMIT)
  )
    throw ((nestedUpdateCount = 0), ReactErrorProd(185));
}
var firstScheduledRoot = null,
  lastScheduledRoot = null,
  callbackExpirationTime = 0,
  callbackID = void 0,
  isRendering = !1,
  nextFlushedRoot = null,
  nextFlushedExpirationTime = 0,
  hasUnhandledError = !1,
  unhandledError = null,
  isBatchingUpdates = !1,
  isUnbatchingUpdates = !1,
  isBatchingInteractiveUpdates = !1,
  completedBatches = null,
  originalStartTimeMs = now$2(),
  currentRendererTime = 1073741822 - ((originalStartTimeMs / 10) | 0),
  currentSchedulerTime = currentRendererTime,
  NESTED_UPDATE_LIMIT = 50,
  nestedUpdateCount = 0,
  lastCommittedRootDuringThisBatch = null;
function recomputeCurrentRendererTime() {
  currentRendererTime =
    1073741822 - (((now$2() - originalStartTimeMs) / 10) | 0);
}
function scheduleCallbackWithExpirationTime(root, expirationTime) {
  if (0 !== callbackExpirationTime) {
    if (expirationTime < callbackExpirationTime) return;
    null !== callbackID && cancelCallback$1(callbackID);
  }
  callbackExpirationTime = expirationTime;
  root = now$2() - originalStartTimeMs;
  expirationTime = 10 * (1073741822 - expirationTime) - root;
  root = getCurrentPriorityLevel$1();
  callbackID = scheduleCallback$1(root, performAsyncWork, {
    timeout: expirationTime
  });
}
function onSuspend(
  root,
  finishedWork,
  suspendedExpirationTime,
  rootExpirationTime,
  msUntilTimeout
) {
  root.expirationTime = rootExpirationTime;
  0 !== msUntilTimeout || (!disableYielding && shouldYield$2())
    ? 0 < msUntilTimeout &&
      (root.timeoutHandle = scheduleTimeout(
        onTimeout.bind(null, root, finishedWork, suspendedExpirationTime),
        msUntilTimeout
      ))
    : ((root.pendingCommitExpirationTime = suspendedExpirationTime),
      (root.finishedWork = finishedWork));
}
function onTimeout(root, finishedWork, suspendedExpirationTime) {
  root.pendingCommitExpirationTime = suspendedExpirationTime;
  root.finishedWork = finishedWork;
  recomputeCurrentRendererTime();
  currentSchedulerTime = currentRendererTime;
  if (isRendering) throw ReactErrorProd(253);
  nextFlushedRoot = root;
  nextFlushedExpirationTime = suspendedExpirationTime;
  performWorkOnRoot(root, suspendedExpirationTime, !1);
  performWork(1073741823);
}
function requestCurrentTime$1() {
  if (isRendering) return currentSchedulerTime;
  findHighestPriorityRoot();
  if (0 === nextFlushedExpirationTime || 1 === nextFlushedExpirationTime)
    recomputeCurrentRendererTime(),
      (currentSchedulerTime = currentRendererTime);
  return currentSchedulerTime;
}
function requestWork(root, expirationTime) {
  null === root.nextScheduledRoot
    ? ((root.expirationTime = expirationTime),
      null === lastScheduledRoot
        ? ((firstScheduledRoot = lastScheduledRoot = root),
          (root.nextScheduledRoot = root))
        : ((lastScheduledRoot = lastScheduledRoot.nextScheduledRoot = root),
          (lastScheduledRoot.nextScheduledRoot = firstScheduledRoot)))
    : expirationTime > root.expirationTime &&
      (root.expirationTime = expirationTime);
  isRendering ||
    (isBatchingUpdates
      ? isUnbatchingUpdates &&
        ((nextFlushedRoot = root),
        (nextFlushedExpirationTime = 1073741823),
        performWorkOnRoot(root, 1073741823, !1))
      : 1073741823 === expirationTime
        ? performWork(1073741823)
        : scheduleCallbackWithExpirationTime(root, expirationTime));
}
function findHighestPriorityRoot() {
  var highestPriorityWork = 0,
    highestPriorityRoot = null;
  if (null !== lastScheduledRoot)
    for (
      var previousScheduledRoot = lastScheduledRoot, root = firstScheduledRoot;
      null !== root;

    ) {
      var remainingExpirationTime = root.expirationTime;
      if (0 === remainingExpirationTime) {
        if (null === previousScheduledRoot || null === lastScheduledRoot)
          throw ReactErrorProd(244);
        if (root === root.nextScheduledRoot) {
          firstScheduledRoot = lastScheduledRoot = root.nextScheduledRoot = null;
          break;
        } else if (root === firstScheduledRoot)
          (firstScheduledRoot = remainingExpirationTime =
            root.nextScheduledRoot),
            (lastScheduledRoot.nextScheduledRoot = remainingExpirationTime),
            (root.nextScheduledRoot = null);
        else if (root === lastScheduledRoot) {
          lastScheduledRoot = previousScheduledRoot;
          lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
          root.nextScheduledRoot = null;
          break;
        } else
          (previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot),
            (root.nextScheduledRoot = null);
        root = previousScheduledRoot.nextScheduledRoot;
      } else {
        remainingExpirationTime > highestPriorityWork &&
          ((highestPriorityWork = remainingExpirationTime),
          (highestPriorityRoot = root));
        if (root === lastScheduledRoot) break;
        if (1073741823 === highestPriorityWork) break;
        previousScheduledRoot = root;
        root = root.nextScheduledRoot;
      }
    }
  nextFlushedRoot = highestPriorityRoot;
  nextFlushedExpirationTime = highestPriorityWork;
}
function performAsyncWork(didTimeout) {
  if (didTimeout && null !== firstScheduledRoot) {
    recomputeCurrentRendererTime();
    didTimeout = firstScheduledRoot;
    do {
      var expirationTime = didTimeout.expirationTime;
      0 !== expirationTime &&
        currentRendererTime <= expirationTime &&
        (didTimeout.nextExpirationTimeToWorkOn = currentRendererTime);
      didTimeout = didTimeout.nextScheduledRoot;
    } while (didTimeout !== firstScheduledRoot);
  }
  findHighestPriorityRoot();
  if (disableYielding)
    for (; null !== nextFlushedRoot && 0 !== nextFlushedExpirationTime; )
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !1),
        findHighestPriorityRoot();
  else
    for (
      recomputeCurrentRendererTime(),
        currentSchedulerTime = currentRendererTime;
      null !== nextFlushedRoot &&
      0 !== nextFlushedExpirationTime &&
      !(shouldYield$2() && currentRendererTime > nextFlushedExpirationTime);

    )
      performWorkOnRoot(
        nextFlushedRoot,
        nextFlushedExpirationTime,
        currentRendererTime > nextFlushedExpirationTime
      ),
        findHighestPriorityRoot(),
        recomputeCurrentRendererTime(),
        (currentSchedulerTime = currentRendererTime);
  callbackExpirationTime = 0;
  callbackID = null;
  0 !== nextFlushedExpirationTime &&
    scheduleCallbackWithExpirationTime(
      nextFlushedRoot,
      nextFlushedExpirationTime
    );
  finishRendering();
}
function performWork(minExpirationTime) {
  for (
    findHighestPriorityRoot();
    null !== nextFlushedRoot &&
    0 !== nextFlushedExpirationTime &&
    minExpirationTime <= nextFlushedExpirationTime;

  )
    performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !1),
      findHighestPriorityRoot();
  0 !== nextFlushedExpirationTime &&
    scheduleCallbackWithExpirationTime(
      nextFlushedRoot,
      nextFlushedExpirationTime
    );
  finishRendering();
}
function finishRendering() {
  nestedUpdateCount = 0;
  lastCommittedRootDuringThisBatch = null;
  if (null !== completedBatches) {
    var batches = completedBatches;
    completedBatches = null;
    for (var i = 0; i < batches.length; i++) {
      var batch = batches[i];
      try {
        batch._onComplete();
      } catch (error) {
        hasUnhandledError ||
          ((hasUnhandledError = !0), (unhandledError = error));
      }
    }
  }
  if (hasUnhandledError)
    throw ((batches = unhandledError),
    (unhandledError = null),
    (hasUnhandledError = !1),
    batches);
}
function performWorkOnRoot(root, expirationTime, isYieldy) {
  if (isRendering) throw ReactErrorProd(245);
  isRendering = !0;
  if (isYieldy) {
    var _finishedWork = root.finishedWork;
    null !== _finishedWork
      ? completeRoot(root, _finishedWork, expirationTime)
      : ((root.finishedWork = null),
        (_finishedWork = root.timeoutHandle),
        -1 !== _finishedWork &&
          ((root.timeoutHandle = -1), cancelTimeout(_finishedWork)),
        renderRoot(root, isYieldy),
        (_finishedWork = root.finishedWork),
        null !== _finishedWork &&
          (shouldYield$2()
            ? (root.finishedWork = _finishedWork)
            : completeRoot(root, _finishedWork, expirationTime)));
  } else
    (_finishedWork = root.finishedWork),
      null !== _finishedWork
        ? completeRoot(root, _finishedWork, expirationTime)
        : ((root.finishedWork = null),
          (_finishedWork = root.timeoutHandle),
          -1 !== _finishedWork &&
            ((root.timeoutHandle = -1), cancelTimeout(_finishedWork)),
          renderRoot(root, isYieldy),
          (_finishedWork = root.finishedWork),
          null !== _finishedWork &&
            completeRoot(root, _finishedWork, expirationTime));
  isRendering = !1;
}
function completeRoot(root, finishedWork$jscomp$0, expirationTime) {
  var firstBatch = root.firstBatch;
  if (
    null !== firstBatch &&
    firstBatch._expirationTime >= expirationTime &&
    (null === completedBatches
      ? (completedBatches = [firstBatch])
      : completedBatches.push(firstBatch),
    firstBatch._defer)
  ) {
    root.finishedWork = finishedWork$jscomp$0;
    root.expirationTime = 0;
    return;
  }
  root.finishedWork = null;
  root === lastCommittedRootDuringThisBatch
    ? nestedUpdateCount++
    : ((lastCommittedRootDuringThisBatch = root), (nestedUpdateCount = 0));
  isCommitting$1 = isWorking = !0;
  if (root.current === finishedWork$jscomp$0) throw ReactErrorProd(177);
  expirationTime = root.pendingCommitExpirationTime;
  if (0 === expirationTime) throw ReactErrorProd(261);
  root.pendingCommitExpirationTime = 0;
  firstBatch = finishedWork$jscomp$0.expirationTime;
  var childExpirationTimeBeforeCommit =
    finishedWork$jscomp$0.childExpirationTime;
  firstBatch =
    childExpirationTimeBeforeCommit > firstBatch
      ? childExpirationTimeBeforeCommit
      : firstBatch;
  root.didError = !1;
  0 === firstBatch
    ? ((root.earliestPendingTime = 0),
      (root.latestPendingTime = 0),
      (root.earliestSuspendedTime = 0),
      (root.latestSuspendedTime = 0),
      (root.latestPingedTime = 0))
    : (firstBatch < root.latestPingedTime && (root.latestPingedTime = 0),
      (childExpirationTimeBeforeCommit = root.latestPendingTime),
      0 !== childExpirationTimeBeforeCommit &&
        (childExpirationTimeBeforeCommit > firstBatch
          ? (root.earliestPendingTime = root.latestPendingTime = 0)
          : root.earliestPendingTime > firstBatch &&
            (root.earliestPendingTime = root.latestPendingTime)),
      (childExpirationTimeBeforeCommit = root.earliestSuspendedTime),
      0 === childExpirationTimeBeforeCommit
        ? markPendingPriorityLevel(root, firstBatch)
        : firstBatch < root.latestSuspendedTime
          ? ((root.earliestSuspendedTime = 0),
            (root.latestSuspendedTime = 0),
            (root.latestPingedTime = 0),
            markPendingPriorityLevel(root, firstBatch))
          : firstBatch > childExpirationTimeBeforeCommit &&
            markPendingPriorityLevel(root, firstBatch));
  findNextExpirationTimeToWorkOn(0, root);
  ReactCurrentOwner$1.current = null;
  1 < finishedWork$jscomp$0.effectTag
    ? null !== finishedWork$jscomp$0.lastEffect
      ? ((finishedWork$jscomp$0.lastEffect.nextEffect = finishedWork$jscomp$0),
        (firstBatch = finishedWork$jscomp$0.firstEffect))
      : (firstBatch = finishedWork$jscomp$0)
    : (firstBatch = finishedWork$jscomp$0.firstEffect);
  for (nextEffect = firstBatch; null !== nextEffect; ) {
    childExpirationTimeBeforeCommit = !1;
    var error = void 0;
    try {
      for (; null !== nextEffect; ) {
        if (nextEffect.effectTag & 256) {
          var current$$1 = nextEffect.alternate,
            finishedWork = nextEffect;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectList(2, 0, finishedWork);
              break;
            case 1:
              if (finishedWork.effectTag & 256 && null !== current$$1) {
                var prevProps = current$$1.memoizedProps,
                  prevState = current$$1.memoizedState,
                  instance = finishedWork.stateNode,
                  snapshot = instance.getSnapshotBeforeUpdate(
                    finishedWork.elementType === finishedWork.type
                      ? prevProps
                      : resolveDefaultProps(finishedWork.type, prevProps),
                    prevState
                  );
                instance.__reactInternalSnapshotBeforeUpdate = snapshot;
              }
              break;
            case 3:
            case 5:
            case 6:
            case 4:
            case 17:
            case 20:
              break;
            default:
              throw ReactErrorProd(163);
          }
        }
        nextEffect = nextEffect.nextEffect;
      }
    } catch (e) {
      (childExpirationTimeBeforeCommit = !0), (error = e);
    }
    if (childExpirationTimeBeforeCommit) {
      if (null === nextEffect) throw ReactErrorProd(178);
      captureCommitPhaseError$1(nextEffect, error);
      null !== nextEffect && (nextEffect = nextEffect.nextEffect);
    }
  }
  for (nextEffect = firstBatch; null !== nextEffect; ) {
    current$$1 = !1;
    prevProps = void 0;
    try {
      for (; null !== nextEffect; ) {
        var effectTag = nextEffect.effectTag;
        if (effectTag & 128) {
          var current$$1$jscomp$0 = nextEffect.alternate;
          if (null !== current$$1$jscomp$0) {
            var currentRef = current$$1$jscomp$0.ref;
            null !== currentRef &&
              ("function" === typeof currentRef
                ? currentRef(null)
                : (currentRef.current = null));
          }
        }
        switch (effectTag & 14) {
          case 2:
            commitPlacement(nextEffect);
            nextEffect.effectTag &= -3;
            break;
          case 6:
            commitPlacement(nextEffect);
            nextEffect.effectTag &= -3;
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 4:
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 8:
            prevState = nextEffect;
            unmountHostComponents(prevState);
            prevState.return = null;
            prevState.child = null;
            prevState.memoizedState = null;
            prevState.updateQueue = null;
            var alternate = prevState.alternate;
            null !== alternate &&
              ((alternate.return = null),
              (alternate.child = null),
              (alternate.memoizedState = null),
              (alternate.updateQueue = null));
        }
        nextEffect = nextEffect.nextEffect;
      }
    } catch (e) {
      (current$$1 = !0), (prevProps = e);
    }
    if (current$$1) {
      if (null === nextEffect) throw ReactErrorProd(178);
      captureCommitPhaseError$1(nextEffect, prevProps);
      null !== nextEffect && (nextEffect = nextEffect.nextEffect);
    }
  }
  root.current = finishedWork$jscomp$0;
  for (nextEffect = firstBatch; null !== nextEffect; ) {
    effectTag = !1;
    current$$1$jscomp$0 = void 0;
    try {
      for (
        currentRef = root, alternate = expirationTime;
        null !== nextEffect;

      ) {
        var effectTag$jscomp$0 = nextEffect.effectTag;
        if (effectTag$jscomp$0 & 36) {
          var current$$1$jscomp$1 = nextEffect.alternate;
          current$$1 = nextEffect;
          prevProps = alternate;
          switch (current$$1.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectList(16, 32, current$$1);
              break;
            case 1:
              var instance$jscomp$0 = current$$1.stateNode;
              if (current$$1.effectTag & 4)
                if (null === current$$1$jscomp$1)
                  instance$jscomp$0.componentDidMount();
                else {
                  var prevProps$jscomp$0 =
                    current$$1.elementType === current$$1.type
                      ? current$$1$jscomp$1.memoizedProps
                      : resolveDefaultProps(
                          current$$1.type,
                          current$$1$jscomp$1.memoizedProps
                        );
                  instance$jscomp$0.componentDidUpdate(
                    prevProps$jscomp$0,
                    current$$1$jscomp$1.memoizedState,
                    instance$jscomp$0.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var updateQueue = current$$1.updateQueue;
              null !== updateQueue &&
                commitUpdateQueue(
                  current$$1,
                  updateQueue,
                  instance$jscomp$0,
                  prevProps
                );
              break;
            case 3:
              var _updateQueue = current$$1.updateQueue;
              if (null !== _updateQueue) {
                prevState = null;
                if (null !== current$$1.child)
                  switch (current$$1.child.tag) {
                    case 5:
                      prevState = current$$1.child.stateNode;
                      break;
                    case 1:
                      prevState = current$$1.child.stateNode;
                  }
                commitUpdateQueue(
                  current$$1,
                  _updateQueue,
                  prevState,
                  prevProps
                );
              }
              break;
            case 5:
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
            case 17:
            case 20:
              break;
            default:
              throw ReactErrorProd(163);
          }
        }
        if (effectTag$jscomp$0 & 128) {
          current$$1 = void 0;
          var ref = nextEffect.ref;
          if (null !== ref) {
            var instance$jscomp$1 = nextEffect.stateNode;
            switch (nextEffect.tag) {
              case 5:
                current$$1 = instance$jscomp$1;
                break;
              default:
                current$$1 = instance$jscomp$1;
            }
            "function" === typeof ref
              ? ref(current$$1)
              : (ref.current = current$$1);
          }
        }
        effectTag$jscomp$0 & 512 &&
          (rootWithPendingPassiveEffects = currentRef);
        nextEffect = nextEffect.nextEffect;
      }
    } catch (e) {
      (effectTag = !0), (current$$1$jscomp$0 = e);
    }
    if (effectTag) {
      if (null === nextEffect) throw ReactErrorProd(178);
      captureCommitPhaseError$1(nextEffect, current$$1$jscomp$0);
      null !== nextEffect && (nextEffect = nextEffect.nextEffect);
    }
  }
  null !== firstBatch &&
    null !== rootWithPendingPassiveEffects &&
    ((effectTag$jscomp$0 = commitPassiveEffects.bind(null, root, firstBatch)),
    (passiveEffectCallbackHandle = scheduleCallback$1(
      NormalPriority$1,
      effectTag$jscomp$0
    )),
    (passiveEffectCallback = effectTag$jscomp$0));
  isWorking = isCommitting$1 = !1;
  "function" === typeof onCommitFiberRoot &&
    onCommitFiberRoot(finishedWork$jscomp$0.stateNode);
  effectTag$jscomp$0 = finishedWork$jscomp$0.expirationTime;
  finishedWork$jscomp$0 = finishedWork$jscomp$0.childExpirationTime;
  finishedWork$jscomp$0 =
    finishedWork$jscomp$0 > effectTag$jscomp$0
      ? finishedWork$jscomp$0
      : effectTag$jscomp$0;
  0 === finishedWork$jscomp$0 &&
    (legacyErrorBoundariesThatAlreadyFailed = null);
  root.expirationTime = finishedWork$jscomp$0;
  root.finishedWork = null;
}
function onUncaughtError$1(error) {
  if (null === nextFlushedRoot) throw ReactErrorProd(246);
  nextFlushedRoot.expirationTime = 0;
  hasUnhandledError || ((hasUnhandledError = !0), (unhandledError = error));
}
var requestCurrentTime$$1 = requestCurrentTime$1,
  computeExpirationForFiber$$1 = computeExpirationForFiber$1,
  captureCommitPhaseError$$1 = captureCommitPhaseError$1,
  onUncaughtError$$1 = onUncaughtError$1;
function pingSuspendedRoot$$1(root, thenable, pingTime) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(thenable);
  if (null !== nextRoot && nextRenderExpirationTime === pingTime)
    nextRoot = null;
  else if (
    ((thenable = root.earliestSuspendedTime),
    (pingCache = root.latestSuspendedTime),
    0 !== thenable && pingTime <= thenable && pingTime >= pingCache)
  ) {
    root.didError = !1;
    thenable = root.latestPingedTime;
    if (0 === thenable || thenable > pingTime) root.latestPingedTime = pingTime;
    findNextExpirationTimeToWorkOn(pingTime, root);
    pingTime = root.expirationTime;
    0 !== pingTime && requestWork(root, pingTime);
  }
}
var retryTimedOutBoundary$$1 = retryTimedOutBoundary$1;
function resolveRetryThenable$$1(boundaryFiber, thenable) {
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      break;
    case 18:
      retryCache = boundaryFiber.memoizedState;
      break;
    default:
      throw ReactErrorProd(314);
  }
  null !== retryCache && retryCache.delete(thenable);
  retryTimedOutBoundary$1(boundaryFiber);
}
var isAlreadyFailedLegacyErrorBoundary$$1 = isAlreadyFailedLegacyErrorBoundary$1,
  scheduleWork$$1 = scheduleWork$1,
  flushPassiveEffects$$1 = flushPassiveEffects$1;
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current,
    currentTime = requestCurrentTime$$1();
  current$$1 = computeExpirationForFiber$$1(currentTime, current$$1);
  currentTime = container.current;
  a: if (parentComponent) {
    parentComponent = parentComponent._reactInternalFiber;
    b: {
      if (
        2 !== isFiberMountedImpl(parentComponent) ||
        1 !== parentComponent.tag
      )
        throw ReactErrorProd(170);
      var parentContext = parentComponent;
      do {
        switch (parentContext.tag) {
          case 3:
            parentContext = parentContext.stateNode.context;
            break b;
          case 1:
            if (isContextProvider(parentContext.type)) {
              parentContext =
                parentContext.stateNode
                  .__reactInternalMemoizedMergedChildContext;
              break b;
            }
        }
        parentContext = parentContext.return;
      } while (null !== parentContext);
      throw ReactErrorProd(171);
    }
    if (1 === parentComponent.tag) {
      var Component = parentComponent.type;
      if (isContextProvider(Component)) {
        parentComponent = processChildContext(
          parentComponent,
          Component,
          parentContext
        );
        break a;
      }
    }
    parentComponent = parentContext;
  } else parentComponent = emptyContextObject;
  null === container.context
    ? (container.context = parentComponent)
    : (container.pendingContext = parentComponent);
  container = callback;
  callback = createUpdate(current$$1);
  callback.payload = { element: element };
  container = void 0 === container ? null : container;
  null !== container && (callback.callback = container);
  flushPassiveEffects$$1();
  enqueueUpdate(currentTime, callback);
  scheduleWork$$1(currentTime, current$$1);
  return current$$1;
}
var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i],
        key;
      for (key in source)
        Object.prototype.hasOwnProperty.call(source, key) &&
          (target[key] = source[key]);
    }
    return target;
  };
function _possibleConstructorReturn(self, call) {
  if (!self)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return !call || ("object" !== typeof call && "function" !== typeof call)
    ? self
    : call;
}
function _inherits(subClass, superClass) {
  if ("function" !== typeof superClass && null !== superClass)
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  });
  superClass &&
    (Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass));
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
Mode.setCurrent(FastNoSideEffects);
var slice = Array.prototype.slice,
  LinearGradient = (function() {
    function LinearGradient(stops, x1, y1, x2, y2) {
      _classCallCheck(this, LinearGradient);
      this._args = slice.call(arguments);
    }
    LinearGradient.prototype.applyFill = function(node) {
      node.fillLinear.apply(node, this._args);
    };
    return LinearGradient;
  })(),
  RadialGradient = (function() {
    function RadialGradient(stops, fx, fy, rx, ry, cx, cy) {
      _classCallCheck(this, RadialGradient);
      this._args = slice.call(arguments);
    }
    RadialGradient.prototype.applyFill = function(node) {
      node.fillRadial.apply(node, this._args);
    };
    return RadialGradient;
  })(),
  Pattern = (function() {
    function Pattern(url, width, height, left, top) {
      _classCallCheck(this, Pattern);
      this._args = slice.call(arguments);
    }
    Pattern.prototype.applyFill = function(node) {
      node.fillImage.apply(node, this._args);
    };
    return Pattern;
  })(),
  Surface = (function(_React$Component) {
    function Surface() {
      _classCallCheck(this, Surface);
      return _possibleConstructorReturn(
        this,
        _React$Component.apply(this, arguments)
      );
    }
    _inherits(Surface, _React$Component);
    Surface.prototype.componentDidMount = function() {
      var _props = this.props;
      this._surface = Mode.Surface(+_props.width, +_props.height, this._tagRef);
      _props = new FiberRootNode(this._surface, void 0);
      var uninitializedFiber = createFiber(3, null, null, 0);
      _props.current = uninitializedFiber;
      this._mountNode = uninitializedFiber.stateNode = _props;
      updateContainer(this.props.children, this._mountNode, this);
    };
    Surface.prototype.componentDidUpdate = function(prevProps) {
      var props = this.props;
      (props.height === prevProps.height && props.width === prevProps.width) ||
        this._surface.resize(+props.width, +props.height);
      updateContainer(this.props.children, this._mountNode, this);
      this._surface.render && this._surface.render();
    };
    Surface.prototype.componentWillUnmount = function() {
      updateContainer(null, this._mountNode, this);
    };
    Surface.prototype.render = function() {
      var _this2 = this,
        props = this.props;
      return React.createElement(Mode.Surface.tagName, {
        ref: function(ref) {
          return (_this2._tagRef = ref);
        },
        accessKey: props.accessKey,
        className: props.className,
        draggable: props.draggable,
        role: props.role,
        style: props.style,
        tabIndex: props.tabIndex,
        title: props.title
      });
    };
    return Surface;
  })(React.Component),
  Text = (function(_React$Component2) {
    function Text(props) {
      _classCallCheck(this, Text);
      var _this3 = _possibleConstructorReturn(
        this,
        _React$Component2.call(this, props)
      );
      ["height", "width", "x", "y"].forEach(function(key) {
        Object.defineProperty(_this3, key, {
          get: function() {
            return this._text ? this._text[key] : void 0;
          }
        });
      });
      return _this3;
    }
    _inherits(Text, _React$Component2);
    Text.prototype.render = function() {
      var _this4 = this;
      return React.createElement(
        TYPES.TEXT,
        _extends({}, this.props, {
          ref: function(t) {
            return (_this4._text = t);
          }
        }),
        childrenAsString(this.props.children)
      );
    };
    return Text;
  })(React.Component);
(function(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  return injectInternals(
    Object.assign({}, devToolsConfig, {
      overrideHookState: null,
      overrideProps: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
      findHostInstanceByFiber: function(fiber) {
        fiber = findCurrentHostFiber(fiber);
        return null === fiber ? null : fiber.stateNode;
      },
      findFiberByHostInstance: function(instance) {
        return findFiberByHostInstance
          ? findFiberByHostInstance(instance)
          : null;
      }
    })
  );
})({
  findFiberByHostInstance: function() {
    return null;
  },
  bundleType: 0,
  version: "16.8.6",
  rendererPackageName: "react-art"
});
module.exports = {
  ClippingRectangle: TYPES.CLIPPING_RECTANGLE,
  Group: TYPES.GROUP,
  Shape: TYPES.SHAPE,
  Path: Mode.Path,
  LinearGradient: LinearGradient,
  Pattern: Pattern,
  RadialGradient: RadialGradient,
  Surface: Surface,
  Text: Text,
  Transform: Transform
};
