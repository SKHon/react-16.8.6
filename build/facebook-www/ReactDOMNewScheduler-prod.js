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

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
"use strict";
var React = require("react"),
  Scheduler = require("scheduler");
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
function ReactError(message) {
  message = Error(message);
  message.name = "Invariant Violation";
  return message;
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
var _require = require("ReactFeatureFlags"),
  disableYielding = _require.disableYielding,
  disableInputAttributeSyncing = _require.disableInputAttributeSyncing,
  enableUserTimingAPI = !1,
  refCount = 0,
  timeout = null;
function updateFlagOutsideOfReactCallStack() {
  timeout ||
    (timeout = setTimeout(function() {
      timeout = null;
      enableUserTimingAPI = 0 < refCount;
    }));
}
if (!React) throw ReactErrorProd(227);
var eventPluginOrder = null,
  namesToPlugins = {};
function recomputePluginOrdering() {
  if (eventPluginOrder)
    for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName],
        pluginIndex = eventPluginOrder.indexOf(pluginName);
      if (!(-1 < pluginIndex)) throw ReactErrorProd(96, pluginName);
      if (!plugins[pluginIndex]) {
        if (!pluginModule.extractEvents) throw ReactErrorProd(97, pluginName);
        plugins[pluginIndex] = pluginModule;
        pluginIndex = pluginModule.eventTypes;
        for (var eventName in pluginIndex) {
          var JSCompiler_inline_result = void 0;
          var dispatchConfig = pluginIndex[eventName],
            pluginModule$jscomp$0 = pluginModule,
            eventName$jscomp$0 = eventName;
          if (eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0))
            throw ReactErrorProd(99, eventName$jscomp$0);
          eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
          var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
          if (phasedRegistrationNames) {
            for (JSCompiler_inline_result in phasedRegistrationNames)
              phasedRegistrationNames.hasOwnProperty(
                JSCompiler_inline_result
              ) &&
                publishRegistrationName(
                  phasedRegistrationNames[JSCompiler_inline_result],
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                );
            JSCompiler_inline_result = !0;
          } else
            dispatchConfig.registrationName
              ? (publishRegistrationName(
                  dispatchConfig.registrationName,
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                ),
                (JSCompiler_inline_result = !0))
              : (JSCompiler_inline_result = !1);
          if (!JSCompiler_inline_result)
            throw ReactErrorProd(98, eventName, pluginName);
        }
      }
    }
}
function publishRegistrationName(registrationName, pluginModule, eventName) {
  if (registrationNameModules[registrationName])
    throw ReactErrorProd(100, registrationName);
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] =
    pluginModule.eventTypes[eventName].dependencies;
}
var plugins = [],
  eventNameDispatchConfigs = {},
  registrationNameModules = {},
  registrationNameDependencies = {},
  ReactFbErrorUtils = require("ReactFbErrorUtils");
if ("function" !== typeof ReactFbErrorUtils.invokeGuardedCallback)
  throw ReactErrorProd(255);
function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
  ReactFbErrorUtils.invokeGuardedCallback.apply(this, arguments);
}
var hasError = !1,
  caughtError = null,
  hasRethrowError = !1,
  rethrowError = null,
  reporter = {
    onError: function(error) {
      hasError = !0;
      caughtError = error;
    }
  };
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = !1;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
function invokeGuardedCallbackAndCatchFirstError(
  name,
  func,
  context,
  a,
  b,
  c,
  d,
  e,
  f
) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    if (hasError) {
      var error = caughtError;
      hasError = !1;
      caughtError = null;
    } else throw ReactErrorProd(198);
    hasRethrowError || ((hasRethrowError = !0), (rethrowError = error));
  }
}
var getFiberCurrentPropsFromNode = null,
  getInstanceFromNode = null,
  getNodeFromInstance = null;
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
function accumulateInto(current, next) {
  if (null == next) throw ReactErrorProd(30);
  if (null == current) return next;
  if (Array.isArray(current)) {
    if (Array.isArray(next)) return current.push.apply(current, next), current;
    current.push(next);
    return current;
  }
  return Array.isArray(next) ? [current].concat(next) : [current, next];
}
function forEachAccumulated(arr, cb, scope) {
  Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
}
var eventQueue = null;
function executeDispatchesAndReleaseTopLevel(e) {
  if (e) {
    var dispatchListeners = e._dispatchListeners,
      dispatchInstances = e._dispatchInstances;
    if (Array.isArray(dispatchListeners))
      for (
        var i = 0;
        i < dispatchListeners.length && !e.isPropagationStopped();
        i++
      )
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
    else
      dispatchListeners &&
        executeDispatch(e, dispatchListeners, dispatchInstances);
    e._dispatchListeners = null;
    e._dispatchInstances = null;
    e.isPersistent() || e.constructor.release(e);
  }
}
function runEventsInBatch(events) {
  null !== events && (eventQueue = accumulateInto(eventQueue, events));
  events = eventQueue;
  eventQueue = null;
  if (events) {
    forEachAccumulated(events, executeDispatchesAndReleaseTopLevel);
    if (eventQueue) throw ReactErrorProd(95);
    if (hasRethrowError)
      throw ((events = rethrowError),
      (hasRethrowError = !1),
      (rethrowError = null),
      events);
  }
}
var injection = {
  injectEventPluginOrder: function(injectedEventPluginOrder) {
    if (eventPluginOrder) throw ReactErrorProd(101);
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = !1,
      pluginName;
    for (pluginName in injectedNamesToPlugins)
      if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        var pluginModule = injectedNamesToPlugins[pluginName];
        if (
          !namesToPlugins.hasOwnProperty(pluginName) ||
          namesToPlugins[pluginName] !== pluginModule
        ) {
          if (namesToPlugins[pluginName]) throw ReactErrorProd(102, pluginName);
          namesToPlugins[pluginName] = pluginModule;
          isOrderingDirty = !0;
        }
      }
    isOrderingDirty && recomputePluginOrdering();
  }
};
function getListener(inst, registrationName) {
  var listener = inst.stateNode;
  if (!listener) return null;
  var props = getFiberCurrentPropsFromNode(listener);
  if (!props) return null;
  listener = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
      (props = !props.disabled) ||
        ((inst = inst.type),
        (props = !(
          "button" === inst ||
          "input" === inst ||
          "select" === inst ||
          "textarea" === inst
        )));
      inst = !props;
      break a;
    default:
      inst = !1;
  }
  if (inst) return null;
  if (listener && "function" !== typeof listener)
    throw ReactErrorProd(231, registrationName, typeof listener);
  return listener;
}
var randomKey = Math.random()
    .toString(36)
    .slice(2),
  internalInstanceKey = "__reactInternalInstance$" + randomKey,
  internalEventHandlersKey = "__reactEventHandlers$" + randomKey;
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) return node[internalInstanceKey];
  for (; !node[internalInstanceKey]; )
    if (node.parentNode) node = node.parentNode;
    else return null;
  node = node[internalInstanceKey];
  return 5 === node.tag || 6 === node.tag ? node : null;
}
function getInstanceFromNode$1(node) {
  node = node[internalInstanceKey];
  return !node || (5 !== node.tag && 6 !== node.tag) ? null : node;
}
function getNodeFromInstance$1(inst) {
  if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
  throw ReactErrorProd(33);
}
function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}
function getParent(inst) {
  do inst = inst.return;
  while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateDirectionalDispatches(inst, phase, event) {
  if (
    (phase = getListener(
      inst,
      event.dispatchConfig.phasedRegistrationNames[phase]
    ))
  )
    (event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      phase
    )),
      (event._dispatchInstances = accumulateInto(
        event._dispatchInstances,
        inst
      ));
}
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    for (var inst = event._targetInst, path = []; inst; )
      path.push(inst), (inst = getParent(inst));
    for (inst = path.length; 0 < inst--; )
      accumulateDirectionalDispatches(path[inst], "captured", event);
    for (inst = 0; inst < path.length; inst++)
      accumulateDirectionalDispatches(path[inst], "bubbled", event);
  }
}
function accumulateDispatches(inst, ignoredDirection, event) {
  inst &&
    event &&
    event.dispatchConfig.registrationName &&
    (ignoredDirection = getListener(
      inst,
      event.dispatchConfig.registrationName
    )) &&
    ((event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      ignoredDirection
    )),
    (event._dispatchInstances = accumulateInto(
      event._dispatchInstances,
      inst
    )));
}
function accumulateDirectDispatchesSingle(event) {
  event &&
    event.dispatchConfig.registrationName &&
    accumulateDispatches(event._targetInst, null, event);
}
function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}
var canUseDOM = !(
  "undefined" === typeof window ||
  !window.document ||
  !window.document.createElement
);
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  },
  prefixedEventNames = {},
  style = {};
canUseDOM &&
  ((style = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete vendorPrefixes.animationend.animation,
    delete vendorPrefixes.animationiteration.animation,
    delete vendorPrefixes.animationstart.animation),
  "TransitionEvent" in window ||
    delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName],
    styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
      return (prefixedEventNames[eventName] = prefixMap[styleProp]);
  return eventName;
}
var TOP_ANIMATION_END = getVendorPrefixedEventName("animationend"),
  TOP_ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  TOP_ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TOP_TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ),
  root = null,
  startText = null,
  fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start,
    startValue = startText,
    startLength = startValue.length,
    end,
    endValue = "value" in root ? root.value : root.textContent,
    endLength = endValue.length;
  for (
    start = 0;
    start < startLength && startValue[start] === endValue[start];
    start++
  );
  var minEnd = startLength - start;
  for (
    end = 1;
    end <= minEnd &&
    startValue[startLength - end] === endValue[endLength - end];
    end++
  );
  return (fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0));
}
function functionThatReturnsTrue() {
  return !0;
}
function functionThatReturnsFalse() {
  return !1;
}
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  dispatchConfig = this.constructor.Interface;
  for (var propName in dispatchConfig)
    dispatchConfig.hasOwnProperty(propName) &&
      ((targetInst = dispatchConfig[propName])
        ? (this[propName] = targetInst(nativeEvent))
        : "target" === propName
          ? (this.target = nativeEventTarget)
          : (this[propName] = nativeEvent[propName]));
  this.isDefaultPrevented = (null != nativeEvent.defaultPrevented
  ? nativeEvent.defaultPrevented
  : !1 === nativeEvent.returnValue)
    ? functionThatReturnsTrue
    : functionThatReturnsFalse;
  this.isPropagationStopped = functionThatReturnsFalse;
  return this;
}
Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() {
    this.defaultPrevented = !0;
    var event = this.nativeEvent;
    event &&
      (event.preventDefault
        ? event.preventDefault()
        : "unknown" !== typeof event.returnValue && (event.returnValue = !1),
      (this.isDefaultPrevented = functionThatReturnsTrue));
  },
  stopPropagation: function() {
    var event = this.nativeEvent;
    event &&
      (event.stopPropagation
        ? event.stopPropagation()
        : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0),
      (this.isPropagationStopped = functionThatReturnsTrue));
  },
  persist: function() {
    this.isPersistent = functionThatReturnsTrue;
  },
  isPersistent: functionThatReturnsFalse,
  destructor: function() {
    var Interface = this.constructor.Interface,
      propName;
    for (propName in Interface) this[propName] = null;
    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
SyntheticEvent.Interface = {
  type: null,
  target: null,
  currentTarget: function() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};
SyntheticEvent.extend = function(Interface) {
  function E() {}
  function Class() {
    return Super.apply(this, arguments);
  }
  var Super = this;
  E.prototype = Super.prototype;
  var prototype = new E();
  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;
  Class.Interface = Object.assign({}, Super.Interface, Interface);
  Class.extend = Super.extend;
  addEventPoolingTo(Class);
  return Class;
};
addEventPoolingTo(SyntheticEvent);
function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  if (this.eventPool.length) {
    var instance = this.eventPool.pop();
    this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  if (!(event instanceof this)) throw ReactErrorProd(279);
  event.destructor();
  10 > this.eventPool.length && this.eventPool.push(event);
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}
var SyntheticCompositionEvent = SyntheticEvent.extend({ data: null }),
  SyntheticInputEvent = SyntheticEvent.extend({ data: null }),
  END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM &&
  "documentMode" in document &&
  (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData =
    canUseDOM &&
    (!canUseCompositionEvent ||
      (documentMode && 8 < documentMode && 11 >= documentMode)),
  SPACEBAR_CHAR = String.fromCharCode(32),
  eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: "onBeforeInput",
        captured: "onBeforeInputCapture"
      },
      dependencies: ["compositionend", "keypress", "textInput", "paste"]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: "onCompositionEnd",
        captured: "onCompositionEndCapture"
      },
      dependencies: "blur compositionend keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: "onCompositionStart",
        captured: "onCompositionStartCapture"
      },
      dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: "onCompositionUpdate",
        captured: "onCompositionUpdateCapture"
      },
      dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
        " "
      )
    }
  },
  hasSpaceKeypress = !1;
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "blur":
      return !0;
    default:
      return !1;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent
    ? nativeEvent.data
    : null;
}
var isComposing = !1;
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = !0;
      return SPACEBAR_CHAR;
    case "textInput":
      return (
        (topLevelType = nativeEvent.data),
        topLevelType === SPACEBAR_CHAR && hasSpaceKeypress ? null : topLevelType
      );
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  if (isComposing)
    return "compositionend" === topLevelType ||
      (!canUseCompositionEvent &&
        isFallbackCompositionEnd(topLevelType, nativeEvent))
      ? ((topLevelType = getData()),
        (fallbackText = startText = root = null),
        (isComposing = !1),
        topLevelType)
      : null;
  switch (topLevelType) {
    case "paste":
      return null;
    case "keypress":
      if (
        !(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) ||
        (nativeEvent.ctrlKey && nativeEvent.altKey)
      ) {
        if (nativeEvent.char && 1 < nativeEvent.char.length)
          return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale
        ? null
        : nativeEvent.data;
    default:
      return null;
  }
}
var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var eventType = void 0;
      var composition = void 0;
      if (canUseCompositionEvent)
        b: {
          switch (topLevelType) {
            case "compositionstart":
              eventType = eventTypes.compositionStart;
              break b;
            case "compositionend":
              eventType = eventTypes.compositionEnd;
              break b;
            case "compositionupdate":
              eventType = eventTypes.compositionUpdate;
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing
          ? isFallbackCompositionEnd(topLevelType, nativeEvent) &&
            (eventType = eventTypes.compositionEnd)
          : "keydown" === topLevelType &&
            229 === nativeEvent.keyCode &&
            (eventType = eventTypes.compositionStart);
      eventType
        ? (useFallbackCompositionData &&
            "ko" !== nativeEvent.locale &&
            (isComposing || eventType !== eventTypes.compositionStart
              ? eventType === eventTypes.compositionEnd &&
                isComposing &&
                (composition = getData())
              : ((root = nativeEventTarget),
                (startText = "value" in root ? root.value : root.textContent),
                (isComposing = !0))),
          (eventType = SyntheticCompositionEvent.getPooled(
            eventType,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          composition
            ? (eventType.data = composition)
            : ((composition = getDataFromCustomEvent(nativeEvent)),
              null !== composition && (eventType.data = composition)),
          accumulateTwoPhaseDispatches(eventType),
          (composition = eventType))
        : (composition = null);
      (topLevelType = canUseTextInputEvent
        ? getNativeBeforeInputChars(topLevelType, nativeEvent)
        : getFallbackBeforeInputChars(topLevelType, nativeEvent))
        ? ((targetInst = SyntheticInputEvent.getPooled(
            eventTypes.beforeInput,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          (targetInst.data = topLevelType),
          accumulateTwoPhaseDispatches(targetInst))
        : (targetInst = null);
      return null === composition
        ? targetInst
        : null === targetInst
          ? composition
          : [composition, targetInst];
    }
  },
  restoreImpl = null,
  restoreTarget = null,
  restoreQueue = null;
function restoreStateOfTarget(target) {
  if ((target = getInstanceFromNode(target))) {
    if ("function" !== typeof restoreImpl) throw ReactErrorProd(280);
    var props = getFiberCurrentPropsFromNode(target.stateNode);
    restoreImpl(target.stateNode, target.type, props);
  }
}
function enqueueStateRestore(target) {
  restoreTarget
    ? restoreQueue
      ? restoreQueue.push(target)
      : (restoreQueue = [target])
    : (restoreTarget = target);
}
function restoreStateIfNeeded() {
  if (restoreTarget) {
    var target = restoreTarget,
      queuedTargets = restoreQueue;
    restoreQueue = restoreTarget = null;
    restoreStateOfTarget(target);
    if (queuedTargets)
      for (target = 0; target < queuedTargets.length; target++)
        restoreStateOfTarget(queuedTargets[target]);
  }
}
function _batchedUpdatesImpl(fn, bookkeeping) {
  return fn(bookkeeping);
}
function _interactiveUpdatesImpl(fn, a, b, c) {
  return fn(a, b, c);
}
function _flushInteractiveUpdatesImpl() {}
var isBatching = !1;
function batchedUpdates(fn, bookkeeping) {
  if (isBatching) return fn(bookkeeping);
  isBatching = !0;
  try {
    return _batchedUpdatesImpl(fn, bookkeeping);
  } finally {
    if (((isBatching = !1), null !== restoreTarget || null !== restoreQueue))
      _flushInteractiveUpdatesImpl(), restoreStateIfNeeded();
  }
}
function interactiveUpdates(fn, a, b, c) {
  return _interactiveUpdatesImpl(fn, a, b, c);
}
var supportedInputTypes = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName
    ? !!supportedInputTypes[elem.type]
    : "textarea" === nodeName
      ? !0
      : !1;
}
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement &&
    (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return !1;
  eventNameSuffix = "on" + eventNameSuffix;
  var isSupported = eventNameSuffix in document;
  isSupported ||
    ((isSupported = document.createElement("div")),
    isSupported.setAttribute(eventNameSuffix, "return;"),
    (isSupported = "function" === typeof isSupported[eventNameSuffix]));
  return isSupported;
}
function isCheckable(elem) {
  var type = elem.type;
  return (
    (elem = elem.nodeName) &&
    "input" === elem.toLowerCase() &&
    ("checkbox" === type || "radio" === type)
  );
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value",
    descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    ),
    currentValue = "" + node[valueField];
  if (
    !node.hasOwnProperty(valueField) &&
    "undefined" !== typeof descriptor &&
    "function" === typeof descriptor.get &&
    "function" === typeof descriptor.set
  ) {
    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: !0,
      get: function() {
        return get.call(this);
      },
      set: function(value) {
        currentValue = "" + value;
        set.call(this, value);
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = "" + value;
      },
      stopTracking: function() {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node));
}
function updateValueIfChanged(node) {
  if (!node) return !1;
  var tracker = node._valueTracker;
  if (!tracker) return !0;
  var lastValue = tracker.getValue();
  var value = "";
  node &&
    (value = isCheckable(node)
      ? node.checked
        ? "true"
        : "false"
      : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), !0) : !1;
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
var VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return (validatedAttributeNameCache[attributeName] = !0);
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
function shouldRemoveAttributeWithWarning(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (null !== propertyInfo && 0 === propertyInfo.type) return !1;
  switch (typeof value) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (isCustomComponentTag) return !1;
      if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
      name = name.toLowerCase().slice(0, 5);
      return "data-" !== name && "aria-" !== name;
    default:
      return !1;
  }
}
function shouldRemoveAttribute(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (
    null === value ||
    "undefined" === typeof value ||
    shouldRemoveAttributeWithWarning(
      name,
      value,
      propertyInfo,
      isCustomComponentTag
    )
  )
    return !0;
  if (isCustomComponentTag) return !1;
  if (null !== propertyInfo)
    switch (propertyInfo.type) {
      case 3:
        return !value;
      case 4:
        return !1 === value;
      case 5:
        return isNaN(value);
      case 6:
        return isNaN(value) || 1 > value;
    }
  return !1;
}
function PropertyInfoRecord(
  name,
  type,
  mustUseProperty,
  attributeName,
  attributeNamespace,
  sanitizeURL
) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
}
var properties = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    2,
    !1,
    name.toLowerCase(),
    null,
    !1
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(
      name,
      3,
      !1,
      name.toLowerCase(),
      null,
      !1
    );
  });
["checked", "multiple", "muted", "selected"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1);
});
["capture", "download"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1);
});
["cols", "rows", "size", "span"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1);
});
["rowSpan", "start"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    5,
    !1,
    name.toLowerCase(),
    null,
    !1
  );
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      null,
      !1
    );
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      "http://www.w3.org/1999/xlink",
      !1
    );
  });
["xml:base", "xml:lang", "xml:space"].forEach(function(attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(
    name,
    1,
    !1,
    attributeName,
    "http://www.w3.org/XML/1998/namespace",
    !1
  );
});
["tabIndex", "crossOrigin"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !1
  );
});
properties.xlinkHref = new PropertyInfoRecord(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0
);
["src", "href", "action", "formAction"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !0
  );
});
var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var propertyInfo = properties.hasOwnProperty(name) ? properties[name] : null;
  var JSCompiler_inline_result =
    null !== propertyInfo
      ? 0 === propertyInfo.type
      : isCustomComponentTag
        ? !1
        : !(2 < name.length) ||
          ("o" !== name[0] && "O" !== name[0]) ||
          ("n" !== name[1] && "N" !== name[1])
          ? !1
          : !0;
  if (!JSCompiler_inline_result)
    if (
      (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) &&
        (value = null),
      isCustomComponentTag || null === propertyInfo)
    )
      isAttributeNameSafe(name) &&
        (null === value
          ? node.removeAttribute(name)
          : node.setAttribute(name, "" + value));
    else if (propertyInfo.mustUseProperty)
      node[propertyInfo.propertyName] =
        null === value ? (3 === propertyInfo.type ? !1 : "") : value;
    else if (
      ((name = propertyInfo.attributeName),
      (isCustomComponentTag = propertyInfo.attributeNamespace),
      null === value)
    )
      node.removeAttribute(name);
    else {
      JSCompiler_inline_result = propertyInfo.type;
      if (
        3 === JSCompiler_inline_result ||
        (4 === JSCompiler_inline_result && !0 === value)
      )
        value = "";
      else if (
        ((value = "" + value),
        propertyInfo.sanitizeURL && isJavaScriptProtocol.test(value))
      )
        throw ReactError(
          "React has blocked a javascript: URL as a security precaution."
        );
      isCustomComponentTag
        ? node.setAttributeNS(isCustomComponentTag, name, value)
        : node.setAttribute(name, value);
    }
}
function getToStringValue(value) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return value;
    default:
      return "";
  }
}
function getHostProps(element, props) {
  var checked = props.checked;
  return Object.assign({}, props, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != checked ? checked : element._wrapperState.initialChecked
  });
}
function initWrapperState(element, props) {
  var defaultValue = null == props.defaultValue ? "" : props.defaultValue,
    JSCompiler_temp_const =
      null != props.checked ? props.checked : props.defaultChecked;
  defaultValue = getToStringValue(
    null != props.value ? props.value : defaultValue
  );
  element._wrapperState = {
    initialChecked: JSCompiler_temp_const,
    initialValue: defaultValue,
    controlled:
      "checkbox" === props.type || "radio" === props.type
        ? null != props.checked
        : null != props.value
  };
}
function updateChecked(element, props) {
  props = props.checked;
  null != props && setValueForProperty(element, "checked", props, !1);
}
function updateWrapper(element, props) {
  updateChecked(element, props);
  var value = getToStringValue(props.value),
    type = props.type;
  if (null != value)
    if ("number" === type) {
      if ((0 === value && "" === element.value) || element.value != value)
        element.value = "" + value;
    } else element.value !== "" + value && (element.value = "" + value);
  else if ("submit" === type || "reset" === type) {
    element.removeAttribute("value");
    return;
  }
  disableInputAttributeSyncing
    ? props.hasOwnProperty("defaultValue") &&
      setDefaultValue(element, props.type, getToStringValue(props.defaultValue))
    : props.hasOwnProperty("value")
      ? setDefaultValue(element, props.type, value)
      : props.hasOwnProperty("defaultValue") &&
        setDefaultValue(
          element,
          props.type,
          getToStringValue(props.defaultValue)
        );
  disableInputAttributeSyncing
    ? null == props.defaultChecked
      ? element.removeAttribute("checked")
      : (element.defaultChecked = !!props.defaultChecked)
    : null == props.checked &&
      null != props.defaultChecked &&
      (element.defaultChecked = !!props.defaultChecked);
}
function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (
      (type = "submit" === type || "reset" === type) &&
      (void 0 === props.value || null === props.value)
    )
      return;
    var _initialValue = "" + element._wrapperState.initialValue;
    if (!isHydrating)
      if (disableInputAttributeSyncing) {
        var value = getToStringValue(props.value);
        null == value ||
          (!type && value === element.value) ||
          (element.value = "" + value);
      } else _initialValue !== element.value && (element.value = _initialValue);
    disableInputAttributeSyncing
      ? ((type = getToStringValue(props.defaultValue)),
        null != type && (element.defaultValue = "" + type))
      : (element.defaultValue = _initialValue);
  }
  type = element.name;
  "" !== type && (element.name = "");
  disableInputAttributeSyncing
    ? (isHydrating || updateChecked(element, props),
      props.hasOwnProperty("defaultChecked") &&
        ((element.defaultChecked = !element.defaultChecked),
        (element.defaultChecked = !!props.defaultChecked)))
    : ((element.defaultChecked = !element.defaultChecked),
      (element.defaultChecked = !!element._wrapperState.initialChecked));
  "" !== type && (element.name = type);
}
function setDefaultValue(node, type, value) {
  if ("number" !== type || node.ownerDocument.activeElement !== node)
    null == value
      ? (node.defaultValue = "" + node._wrapperState.initialValue)
      : node.defaultValue !== "" + value && (node.defaultValue = "" + value);
}
var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(
      " "
    )
  }
};
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  inst = SyntheticEvent.getPooled(
    eventTypes$1.change,
    inst,
    nativeEvent,
    target
  );
  inst.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(inst);
  return inst;
}
var activeElement = null,
  activeElementInst = null;
function runEventInBatch(event) {
  runEventsInBatch(event);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if ("change" === topLevelType) return targetInst;
}
var isInputEventSupported = !1;
canUseDOM &&
  (isInputEventSupported =
    isEventSupported("input") &&
    (!document.documentMode || 9 < document.documentMode));
function stopWatchingForValueChange() {
  activeElement &&
    (activeElement.detachEvent("onpropertychange", handlePropertyChange),
    (activeElementInst = activeElement = null));
}
function handlePropertyChange(nativeEvent) {
  "value" === nativeEvent.propertyName &&
    getInstIfValueChanged(activeElementInst) &&
    ((nativeEvent = createAndAccumulateChangeEvent(
      activeElementInst,
      nativeEvent,
      getEventTarget(nativeEvent)
    )),
    batchedUpdates(runEventInBatch, nativeEvent));
}
function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  "focus" === topLevelType
    ? (stopWatchingForValueChange(),
      (activeElement = target),
      (activeElementInst = targetInst),
      activeElement.attachEvent("onpropertychange", handlePropertyChange))
    : "blur" === topLevelType && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(topLevelType) {
  if (
    "selectionchange" === topLevelType ||
    "keyup" === topLevelType ||
    "keydown" === topLevelType
  )
    return getInstIfValueChanged(activeElementInst);
}
function getTargetInstForClickEvent(topLevelType, targetInst) {
  if ("click" === topLevelType) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if ("input" === topLevelType || "change" === topLevelType)
    return getInstIfValueChanged(targetInst);
}
var ChangeEventPlugin = {
    eventTypes: eventTypes$1,
    _isInputEventSupported: isInputEventSupported,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window,
        getTargetInstFunc = void 0,
        handleEventFunc = void 0,
        nodeName = targetNode.nodeName && targetNode.nodeName.toLowerCase();
      "select" === nodeName ||
      ("input" === nodeName && "file" === targetNode.type)
        ? (getTargetInstFunc = getTargetInstForChangeEvent)
        : isTextInputElement(targetNode)
          ? isInputEventSupported
            ? (getTargetInstFunc = getTargetInstForInputOrChangeEvent)
            : ((getTargetInstFunc = getTargetInstForInputEventPolyfill),
              (handleEventFunc = handleEventsForInputEventPolyfill))
          : (nodeName = targetNode.nodeName) &&
            "input" === nodeName.toLowerCase() &&
            ("checkbox" === targetNode.type || "radio" === targetNode.type) &&
            (getTargetInstFunc = getTargetInstForClickEvent);
      if (
        getTargetInstFunc &&
        (getTargetInstFunc = getTargetInstFunc(topLevelType, targetInst))
      )
        return createAndAccumulateChangeEvent(
          getTargetInstFunc,
          nativeEvent,
          nativeEventTarget
        );
      handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst);
      "blur" === topLevelType &&
        (topLevelType = targetNode._wrapperState) &&
        topLevelType.controlled &&
        "number" === targetNode.type &&
        (disableInputAttributeSyncing ||
          setDefaultValue(targetNode, "number", targetNode.value));
    }
  },
  SyntheticUIEvent = SyntheticEvent.extend({ view: null, detail: null }),
  modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState
    ? nativeEvent.getModifierState(keyArg)
    : (keyArg = modifierKeyToProp[keyArg])
      ? !!nativeEvent[keyArg]
      : !1;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var previousScreenX = 0,
  previousScreenY = 0,
  isMovementXSet = !1,
  isMovementYSet = !1,
  SyntheticMouseEvent = SyntheticUIEvent.extend({
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: null,
    buttons: null,
    relatedTarget: function(event) {
      return (
        event.relatedTarget ||
        (event.fromElement === event.srcElement
          ? event.toElement
          : event.fromElement)
      );
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      var screenX = previousScreenX;
      previousScreenX = event.screenX;
      return isMovementXSet
        ? "mousemove" === event.type
          ? event.screenX - screenX
          : 0
        : ((isMovementXSet = !0), 0);
    },
    movementY: function(event) {
      if ("movementY" in event) return event.movementY;
      var screenY = previousScreenY;
      previousScreenY = event.screenY;
      return isMovementYSet
        ? "mousemove" === event.type
          ? event.screenY - screenY
          : 0
        : ((isMovementYSet = !0), 0);
    }
  }),
  SyntheticPointerEvent = SyntheticMouseEvent.extend({
    pointerId: null,
    width: null,
    height: null,
    pressure: null,
    tangentialPressure: null,
    tiltX: null,
    tiltY: null,
    twist: null,
    pointerType: null,
    isPrimary: null
  }),
  eventTypes$2 = {
    mouseEnter: {
      registrationName: "onMouseEnter",
      dependencies: ["mouseout", "mouseover"]
    },
    mouseLeave: {
      registrationName: "onMouseLeave",
      dependencies: ["mouseout", "mouseover"]
    },
    pointerEnter: {
      registrationName: "onPointerEnter",
      dependencies: ["pointerout", "pointerover"]
    },
    pointerLeave: {
      registrationName: "onPointerLeave",
      dependencies: ["pointerout", "pointerover"]
    }
  },
  EnterLeaveEventPlugin = {
    eventTypes: eventTypes$2,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var isOverEvent =
          "mouseover" === topLevelType || "pointerover" === topLevelType,
        isOutEvent =
          "mouseout" === topLevelType || "pointerout" === topLevelType;
      if (
        (isOverEvent &&
          (nativeEvent.relatedTarget || nativeEvent.fromElement)) ||
        (!isOutEvent && !isOverEvent)
      )
        return null;
      isOverEvent =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget
          : (isOverEvent = nativeEventTarget.ownerDocument)
            ? isOverEvent.defaultView || isOverEvent.parentWindow
            : window;
      isOutEvent
        ? ((isOutEvent = targetInst),
          (targetInst = (targetInst =
            nativeEvent.relatedTarget || nativeEvent.toElement)
            ? getClosestInstanceFromNode(targetInst)
            : null))
        : (isOutEvent = null);
      if (isOutEvent === targetInst) return null;
      var eventInterface = void 0,
        leaveEventType = void 0,
        enterEventType = void 0,
        eventTypePrefix = void 0;
      if ("mouseout" === topLevelType || "mouseover" === topLevelType)
        (eventInterface = SyntheticMouseEvent),
          (leaveEventType = eventTypes$2.mouseLeave),
          (enterEventType = eventTypes$2.mouseEnter),
          (eventTypePrefix = "mouse");
      else if ("pointerout" === topLevelType || "pointerover" === topLevelType)
        (eventInterface = SyntheticPointerEvent),
          (leaveEventType = eventTypes$2.pointerLeave),
          (enterEventType = eventTypes$2.pointerEnter),
          (eventTypePrefix = "pointer");
      var fromNode =
        null == isOutEvent ? isOverEvent : getNodeFromInstance$1(isOutEvent);
      isOverEvent =
        null == targetInst ? isOverEvent : getNodeFromInstance$1(targetInst);
      topLevelType = eventInterface.getPooled(
        leaveEventType,
        isOutEvent,
        nativeEvent,
        nativeEventTarget
      );
      topLevelType.type = eventTypePrefix + "leave";
      topLevelType.target = fromNode;
      topLevelType.relatedTarget = isOverEvent;
      nativeEvent = eventInterface.getPooled(
        enterEventType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      nativeEvent.type = eventTypePrefix + "enter";
      nativeEvent.target = isOverEvent;
      nativeEvent.relatedTarget = fromNode;
      nativeEventTarget = targetInst;
      if (isOutEvent && nativeEventTarget)
        a: {
          targetInst = isOutEvent;
          isOverEvent = nativeEventTarget;
          eventTypePrefix = 0;
          for (
            eventInterface = targetInst;
            eventInterface;
            eventInterface = getParent(eventInterface)
          )
            eventTypePrefix++;
          eventInterface = 0;
          for (
            enterEventType = isOverEvent;
            enterEventType;
            enterEventType = getParent(enterEventType)
          )
            eventInterface++;
          for (; 0 < eventTypePrefix - eventInterface; )
            (targetInst = getParent(targetInst)), eventTypePrefix--;
          for (; 0 < eventInterface - eventTypePrefix; )
            (isOverEvent = getParent(isOverEvent)), eventInterface--;
          for (; eventTypePrefix--; ) {
            if (
              targetInst === isOverEvent ||
              targetInst === isOverEvent.alternate
            )
              break a;
            targetInst = getParent(targetInst);
            isOverEvent = getParent(isOverEvent);
          }
          targetInst = null;
        }
      else targetInst = null;
      isOverEvent = targetInst;
      for (targetInst = []; isOutEvent && isOutEvent !== isOverEvent; ) {
        eventTypePrefix = isOutEvent.alternate;
        if (null !== eventTypePrefix && eventTypePrefix === isOverEvent) break;
        targetInst.push(isOutEvent);
        isOutEvent = getParent(isOutEvent);
      }
      for (
        isOutEvent = [];
        nativeEventTarget && nativeEventTarget !== isOverEvent;

      ) {
        eventTypePrefix = nativeEventTarget.alternate;
        if (null !== eventTypePrefix && eventTypePrefix === isOverEvent) break;
        isOutEvent.push(nativeEventTarget);
        nativeEventTarget = getParent(nativeEventTarget);
      }
      for (
        nativeEventTarget = 0;
        nativeEventTarget < targetInst.length;
        nativeEventTarget++
      )
        accumulateDispatches(
          targetInst[nativeEventTarget],
          "bubbled",
          topLevelType
        );
      for (nativeEventTarget = isOutEvent.length; 0 < nativeEventTarget--; )
        accumulateDispatches(
          isOutEvent[nativeEventTarget],
          "captured",
          nativeEvent
        );
      return [topLevelType, nativeEvent];
    }
  };
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
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
      !hasOwnProperty$1.call(objB, keysA[keysB]) ||
      !is(objA[keysA[keysB]], objB[keysA[keysB]])
    )
      return !1;
  return !0;
}
var listenToResponderEventTypesImpl = void 0,
  currentOwner = null,
  currentFiber = void 0,
  currentEventQueue = void 0,
  eventResponderContext = {
    dispatchEvent: function(possibleEventObject, _ref) {
      var capture = _ref.capture,
        discrete = _ref.discrete;
      _ref = _ref.stopPropagation;
      var eventQueue = currentEventQueue,
        target = possibleEventObject.target,
        type = possibleEventObject.type;
      if (
        null == possibleEventObject.listener ||
        null == target ||
        null == type
      )
        throw Error(
          'context.dispatchEvent: "listener", "target" and "type" fields on event object are required.'
        );
      capture
        ? ((capture = eventQueue.capture),
          null === capture && (capture = eventQueue.capture = []))
        : ((capture = eventQueue.bubble),
          null === capture && (capture = eventQueue.bubble = []));
      discrete && (eventQueue.discrete = !0);
      capture.push(possibleEventObject);
      _ref && eventsWithStopPropagation.add(possibleEventObject);
    },
    isPositionWithinTouchHitTarget: function(doc, x, y) {
      if ("function" !== typeof doc.elementFromPoint) return !1;
      doc = doc.elementFromPoint(x, y);
      if (null === doc) return !1;
      var childFiber = getClosestInstanceFromNode(doc);
      if (null === childFiber) return !1;
      childFiber = childFiber.return;
      if (null !== childFiber && 20 === childFiber.tag) {
        doc = doc.parentNode.getBoundingClientRect();
        childFiber = doc.top;
        var right = doc.right,
          bottom = doc.bottom;
        return x > doc.left && y > childFiber && x < right && y < bottom
          ? !1
          : !0;
      }
      return !1;
    },
    isTargetWithinEventComponent: function(target) {
      var eventFiber = currentFiber;
      if (null != target)
        for (target = getClosestInstanceFromNode(target); null !== target; ) {
          if (target === eventFiber || target === eventFiber.alternate)
            return !0;
          target = target.return;
        }
      return !1;
    },
    isTargetWithinElement: function(childTarget, parentTarget) {
      childTarget = getClosestInstanceFromNode(childTarget);
      for (
        parentTarget = getClosestInstanceFromNode(parentTarget);
        null !== childTarget;

      ) {
        if (childTarget === parentTarget) return !0;
        childTarget = childTarget.return;
      }
      return !1;
    },
    addRootEventTypes: function(doc, rootEventTypes) {
      listenToResponderEventTypesImpl(rootEventTypes, doc);
      doc = currentFiber;
      for (var i = 0; i < rootEventTypes.length; i++) {
        var rootEventType = rootEventTypes[i];
        rootEventType =
          "string" === typeof rootEventType
            ? rootEventType
            : rootEventType.name;
        var rootEventComponents = rootEventTypesToEventComponents.get(
          rootEventType
        );
        void 0 === rootEventComponents &&
          ((rootEventComponents = new Set()),
          rootEventTypesToEventComponents.set(
            rootEventType,
            rootEventComponents
          ));
        rootEventComponents.add(doc);
      }
    },
    removeRootEventTypes: function(rootEventTypes) {
      for (
        var eventComponent = currentFiber, i = 0;
        i < rootEventTypes.length;
        i++
      ) {
        var rootEventType = rootEventTypes[i];
        rootEventType = rootEventTypesToEventComponents.get(
          "string" === typeof rootEventType ? rootEventType : rootEventType.name
        );
        void 0 !== rootEventType && rootEventType.delete(eventComponent);
      }
    },
    hasOwnership: function() {
      return currentOwner === currentFiber;
    },
    requestOwnership: function() {
      if (null !== currentOwner) return !1;
      currentOwner = currentFiber;
      return !0;
    },
    releaseOwnership: function() {
      if (currentOwner !== currentFiber) return !1;
      currentOwner = null;
      return !1;
    },
    setTimeout: function(func, delay) {
      var contextFiber = currentFiber;
      return setTimeout(function() {
        var previousEventQueue = currentEventQueue,
          previousFiber = currentFiber;
        currentEventQueue = createEventQueue();
        currentFiber = contextFiber;
        try {
          func(), batchedUpdates(processEventQueue, currentEventQueue);
        } finally {
          (currentFiber = previousFiber),
            (currentEventQueue = previousEventQueue);
        }
      }, delay);
    }
  },
  rootEventTypesToEventComponents = new Map(),
  eventsWithStopPropagation = new ("function" === typeof WeakSet
    ? WeakSet
    : Set)(),
  targetEventTypeCached = new Map();
function createEventQueue() {
  return { bubble: null, capture: null, discrete: !1 };
}
function processEvents(bubble, capture) {
  var i;
  if (null !== capture)
    for (i = capture.length; 0 < i--; ) {
      var event = capture[i],
        event$jscomp$0 = capture[i];
      invokeGuardedCallbackAndCatchFirstError(
        event$jscomp$0.type,
        event$jscomp$0.listener,
        void 0,
        event$jscomp$0
      );
      if (eventsWithStopPropagation.has(event)) return;
    }
  if (null !== bubble)
    for (
      i = 0, capture = bubble.length;
      i < capture &&
      ((event = bubble[i]),
      invokeGuardedCallbackAndCatchFirstError(
        event.type,
        event.listener,
        void 0,
        event
      ),
      !eventsWithStopPropagation.has(event));
      ++i
    );
}
function processEventQueue() {
  var _currentEventQueue = currentEventQueue,
    bubble = _currentEventQueue.bubble,
    capture = _currentEventQueue.capture;
  _currentEventQueue.discrete
    ? interactiveUpdates(function() {
        processEvents(bubble, capture);
      })
    : processEvents(bubble, capture);
}
function handleTopLevelType(
  topLevelType,
  fiber,
  responderEvent,
  isRootLevelEvent
) {
  var responder = fiber.type.responder;
  if (!isRootLevelEvent) {
    isRootLevelEvent = responder.targetEventTypes;
    var cachedSet = targetEventTypeCached.get(isRootLevelEvent);
    if (void 0 === cachedSet) {
      cachedSet = new Set();
      for (var i = 0; i < isRootLevelEvent.length; i++) {
        var eventType = isRootLevelEvent[i];
        cachedSet.add(
          "string" === typeof eventType ? eventType : eventType.name
        );
      }
      targetEventTypeCached.set(isRootLevelEvent, cachedSet);
    }
    if (!cachedSet.has(topLevelType)) return;
  }
  isRootLevelEvent = fiber.stateNode;
  topLevelType = isRootLevelEvent.props;
  isRootLevelEvent = isRootLevelEvent.state;
  null === isRootLevelEvent &&
    void 0 !== responder.createInitialState &&
    (isRootLevelEvent = fiber.stateNode.state = responder.createInitialState(
      topLevelType
    ));
  cachedSet = currentFiber;
  currentFiber = fiber;
  try {
    responder.onEvent(
      responderEvent,
      eventResponderContext,
      topLevelType,
      isRootLevelEvent
    );
  } finally {
    currentFiber = cachedSet;
  }
}
var EventListenerWWW = require("EventListener"),
  SyntheticAnimationEvent = SyntheticEvent.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticClipboardEvent = SyntheticEvent.extend({
    clipboardData: function(event) {
      return "clipboardData" in event
        ? event.clipboardData
        : window.clipboardData;
    }
  }),
  SyntheticFocusEvent = SyntheticUIEvent.extend({ relatedTarget: null });
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent
    ? ((nativeEvent = nativeEvent.charCode),
      0 === nativeEvent && 13 === keyCode && (nativeEvent = 13))
    : (nativeEvent = keyCode);
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
var normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  SyntheticKeyboardEvent = SyntheticUIEvent.extend({
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type
        ? ((nativeEvent = getEventCharCode(nativeEvent)),
          13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent))
        : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type
          ? translateToKey[nativeEvent.keyCode] || "Unidentified"
          : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type
        ? event.keyCode
        : 0;
    },
    which: function(event) {
      return "keypress" === event.type
        ? getEventCharCode(event)
        : "keydown" === event.type || "keyup" === event.type
          ? event.keyCode
          : 0;
    }
  }),
  SyntheticDragEvent = SyntheticMouseEvent.extend({ dataTransfer: null }),
  SyntheticTouchEvent = SyntheticUIEvent.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  }),
  SyntheticTransitionEvent = SyntheticEvent.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticWheelEvent = SyntheticMouseEvent.extend({
    deltaX: function(event) {
      return "deltaX" in event
        ? event.deltaX
        : "wheelDeltaX" in event
          ? -event.wheelDeltaX
          : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event
        ? event.deltaY
        : "wheelDeltaY" in event
          ? -event.wheelDeltaY
          : "wheelDelta" in event
            ? -event.wheelDelta
            : 0;
    },
    deltaZ: null,
    deltaMode: null
  }),
  nonInteractiveEventTypeNames = [
    ["abort", "abort"],
    [TOP_ANIMATION_END, "animationEnd"],
    [TOP_ANIMATION_ITERATION, "animationIteration"],
    [TOP_ANIMATION_START, "animationStart"],
    ["canplay", "canPlay"],
    ["canplaythrough", "canPlayThrough"],
    ["drag", "drag"],
    ["dragenter", "dragEnter"],
    ["dragexit", "dragExit"],
    ["dragleave", "dragLeave"],
    ["dragover", "dragOver"],
    ["durationchange", "durationChange"],
    ["emptied", "emptied"],
    ["encrypted", "encrypted"],
    ["ended", "ended"],
    ["error", "error"],
    ["gotpointercapture", "gotPointerCapture"],
    ["load", "load"],
    ["loadeddata", "loadedData"],
    ["loadedmetadata", "loadedMetadata"],
    ["loadstart", "loadStart"],
    ["lostpointercapture", "lostPointerCapture"],
    ["mousemove", "mouseMove"],
    ["mouseout", "mouseOut"],
    ["mouseover", "mouseOver"],
    ["playing", "playing"],
    ["pointermove", "pointerMove"],
    ["pointerout", "pointerOut"],
    ["pointerover", "pointerOver"],
    ["progress", "progress"],
    ["scroll", "scroll"],
    ["seeking", "seeking"],
    ["stalled", "stalled"],
    ["suspend", "suspend"],
    ["timeupdate", "timeUpdate"],
    ["toggle", "toggle"],
    ["touchmove", "touchMove"],
    [TOP_TRANSITION_END, "transitionEnd"],
    ["waiting", "waiting"],
    ["wheel", "wheel"]
  ],
  eventTypes$4 = {},
  topLevelEventsToDispatchConfig = {};
function addEventTypeNameToConfig(_ref, isInteractive) {
  var topEvent = _ref[0];
  _ref = _ref[1];
  var onEvent = "on" + (_ref[0].toUpperCase() + _ref.slice(1));
  isInteractive = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + "Capture"
    },
    dependencies: [topEvent],
    isInteractive: isInteractive
  };
  eventTypes$4[_ref] = isInteractive;
  topLevelEventsToDispatchConfig[topEvent] = isInteractive;
}
[
  ["blur", "blur"],
  ["cancel", "cancel"],
  ["click", "click"],
  ["close", "close"],
  ["contextmenu", "contextMenu"],
  ["copy", "copy"],
  ["cut", "cut"],
  ["auxclick", "auxClick"],
  ["dblclick", "doubleClick"],
  ["dragend", "dragEnd"],
  ["dragstart", "dragStart"],
  ["drop", "drop"],
  ["focus", "focus"],
  ["input", "input"],
  ["invalid", "invalid"],
  ["keydown", "keyDown"],
  ["keypress", "keyPress"],
  ["keyup", "keyUp"],
  ["mousedown", "mouseDown"],
  ["mouseup", "mouseUp"],
  ["paste", "paste"],
  ["pause", "pause"],
  ["play", "play"],
  ["pointercancel", "pointerCancel"],
  ["pointerdown", "pointerDown"],
  ["pointerup", "pointerUp"],
  ["ratechange", "rateChange"],
  ["reset", "reset"],
  ["seeked", "seeked"],
  ["submit", "submit"],
  ["touchcancel", "touchCancel"],
  ["touchend", "touchEnd"],
  ["touchstart", "touchStart"],
  ["volumechange", "volumeChange"]
].forEach(function(eventTuple) {
  addEventTypeNameToConfig(eventTuple, !0);
});
nonInteractiveEventTypeNames.forEach(function(eventTuple) {
  addEventTypeNameToConfig(eventTuple, !1);
});
var SimpleEventPlugin = {
    eventTypes: eventTypes$4,
    isInteractiveTopLevelEventType: function(topLevelType) {
      topLevelType = topLevelEventsToDispatchConfig[topLevelType];
      return void 0 !== topLevelType && !0 === topLevelType.isInteractive;
    },
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
      if (!dispatchConfig) return null;
      switch (topLevelType) {
        case "keypress":
          if (0 === getEventCharCode(nativeEvent)) return null;
        case "keydown":
        case "keyup":
          topLevelType = SyntheticKeyboardEvent;
          break;
        case "blur":
        case "focus":
          topLevelType = SyntheticFocusEvent;
          break;
        case "click":
          if (2 === nativeEvent.button) return null;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          topLevelType = SyntheticMouseEvent;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          topLevelType = SyntheticDragEvent;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          topLevelType = SyntheticTouchEvent;
          break;
        case TOP_ANIMATION_END:
        case TOP_ANIMATION_ITERATION:
        case TOP_ANIMATION_START:
          topLevelType = SyntheticAnimationEvent;
          break;
        case TOP_TRANSITION_END:
          topLevelType = SyntheticTransitionEvent;
          break;
        case "scroll":
          topLevelType = SyntheticUIEvent;
          break;
        case "wheel":
          topLevelType = SyntheticWheelEvent;
          break;
        case "copy":
        case "cut":
        case "paste":
          topLevelType = SyntheticClipboardEvent;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          topLevelType = SyntheticPointerEvent;
          break;
        default:
          topLevelType = SyntheticEvent;
      }
      targetInst = topLevelType.getPooled(
        dispatchConfig,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      accumulateTwoPhaseDispatches(targetInst);
      return targetInst;
    }
  },
  passiveBrowserEventsSupported = !1;
if (canUseDOM)
  try {
    var options = {};
    Object.defineProperty(options, "passive", {
      get: function() {
        passiveBrowserEventsSupported = !0;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (e) {
    passiveBrowserEventsSupported = !1;
  }
var isInteractiveTopLevelEventType =
    SimpleEventPlugin.isInteractiveTopLevelEventType,
  callbackBookkeepingPool = [];
function handleTopLevel(bookKeeping) {
  var targetInst = bookKeeping.targetInst,
    ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root;
    for (root = ancestor; root.return; ) root = root.return;
    root = 3 !== root.tag ? null : root.stateNode.containerInfo;
    if (!root) break;
    bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);
  for (ancestor = 0; ancestor < bookKeeping.ancestors.length; ancestor++) {
    targetInst = bookKeeping.ancestors[ancestor];
    var _eventSystemFlags = bookKeeping.eventSystemFlags,
      eventTarget = getEventTarget(bookKeeping.nativeEvent);
    root = bookKeeping.topLevelType;
    var _nativeEvent = bookKeeping.nativeEvent;
    if (1 === _eventSystemFlags) {
      _eventSystemFlags = targetInst;
      targetInst = null;
      for (var i = 0; i < plugins.length; i++) {
        var possiblePlugin = plugins[i];
        possiblePlugin &&
          (possiblePlugin = possiblePlugin.extractEvents(
            root,
            _eventSystemFlags,
            _nativeEvent,
            eventTarget
          )) &&
          (targetInst = accumulateInto(targetInst, possiblePlugin));
      }
      runEventsInBatch(targetInst);
    } else {
      currentEventQueue = createEventQueue();
      eventTarget = {
        nativeEvent: _nativeEvent,
        target: eventTarget,
        type: root,
        passive: 0 !== (_eventSystemFlags & 4),
        passiveSupported: 0 === (_eventSystemFlags & 16)
      };
      for (_eventSystemFlags = targetInst; null !== _eventSystemFlags; )
        19 === _eventSystemFlags.tag &&
          handleTopLevelType(root, _eventSystemFlags, eventTarget, !1),
          (_eventSystemFlags = _eventSystemFlags.return);
      _eventSystemFlags = rootEventTypesToEventComponents.get(root);
      if (void 0 !== _eventSystemFlags)
        for (
          _eventSystemFlags = Array.from(_eventSystemFlags), _nativeEvent = 0;
          _nativeEvent < _eventSystemFlags.length;
          _nativeEvent++
        )
          handleTopLevelType(
            root,
            _eventSystemFlags[_nativeEvent],
            eventTarget,
            !0
          );
      processEventQueue();
    }
  }
}
var _enabled = !0;
function trapBubbledEvent(topLevelType, element) {
  trapEventForPluginEventSystem(element, topLevelType, !1);
}
function trapEventForPluginEventSystem(element, topLevelType, capture) {
  var listener = (isInteractiveTopLevelEventType(topLevelType)
    ? dispatchInteractiveEvent
    : dispatchEvent
  ).bind(null, topLevelType, 1);
  capture
    ? EventListenerWWW.capture(element, topLevelType, listener)
    : EventListenerWWW.listen(element, topLevelType, listener);
}
function dispatchInteractiveEvent(topLevelType, eventSystemFlags, nativeEvent) {
  _interactiveUpdatesImpl(
    dispatchEvent,
    topLevelType,
    eventSystemFlags,
    nativeEvent
  );
}
function dispatchEvent(topLevelType, eventSystemFlags, nativeEvent) {
  if (_enabled) {
    var nativeEventTarget = getEventTarget(nativeEvent);
    nativeEventTarget = getClosestInstanceFromNode(nativeEventTarget);
    null === nativeEventTarget ||
      "number" !== typeof nativeEventTarget.tag ||
      2 === isFiberMountedImpl(nativeEventTarget) ||
      (nativeEventTarget = null);
    if (callbackBookkeepingPool.length) {
      var instance = callbackBookkeepingPool.pop();
      instance.topLevelType = topLevelType;
      instance.nativeEvent = nativeEvent;
      instance.targetInst = nativeEventTarget;
      instance.eventSystemFlags = eventSystemFlags;
      topLevelType = instance;
    } else
      topLevelType = {
        topLevelType: topLevelType,
        nativeEvent: nativeEvent,
        targetInst: nativeEventTarget,
        ancestors: [],
        eventSystemFlags: eventSystemFlags
      };
    try {
      batchedUpdates(handleTopLevel, topLevelType);
    } finally {
      (topLevelType.topLevelType = null),
        (topLevelType.nativeEvent = null),
        (topLevelType.targetInst = null),
        (topLevelType.ancestors.length = 0),
        (topLevelType.eventSystemFlags = 0),
        10 > callbackBookkeepingPool.length &&
          callbackBookkeepingPool.push(topLevelType);
    }
  }
}
var elementListeningSets = new ("function" === typeof WeakMap
  ? WeakMap
  : Map)();
function getListeningSetForElement(element) {
  var listeningSet = elementListeningSets.get(element);
  void 0 === listeningSet &&
    ((listeningSet = new Set()),
    elementListeningSets.set(element, listeningSet));
  return listeningSet;
}
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
function getLeafNode(node) {
  for (; node && node.firstChild; ) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  root = 0;
  for (var nodeEnd; node; ) {
    if (3 === node.nodeType) {
      nodeEnd = root + node.textContent.length;
      if (root <= offset && nodeEnd >= offset)
        return { node: node, offset: offset - root };
      root = nodeEnd;
    }
    a: {
      for (; node; ) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode
    ? outerNode === innerNode
      ? !0
      : outerNode && 3 === outerNode.nodeType
        ? !1
        : innerNode && 3 === innerNode.nodeType
          ? containsNode(outerNode, innerNode.parentNode)
          : "contains" in outerNode
            ? outerNode.contains(innerNode)
            : outerNode.compareDocumentPosition
              ? !!(outerNode.compareDocumentPosition(innerNode) & 16)
              : !1
    : !1;
}
function getActiveElementDeep() {
  for (
    var win = window, element = getActiveElement();
    element instanceof win.HTMLIFrameElement;

  ) {
    try {
      var JSCompiler_inline_result =
        "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = !1;
    }
    if (JSCompiler_inline_result) win = element.contentWindow;
    else break;
    element = getActiveElement(win.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return (
    nodeName &&
    (("input" === nodeName &&
      ("text" === elem.type ||
        "search" === elem.type ||
        "tel" === elem.type ||
        "url" === elem.type ||
        "password" === elem.type)) ||
      "textarea" === nodeName ||
      "true" === elem.contentEditable)
  );
}
var skipSelectionChangeEvent =
    canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  eventTypes$3 = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    }
  },
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = !1;
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  var doc =
    nativeEventTarget.window === nativeEventTarget
      ? nativeEventTarget.document
      : 9 === nativeEventTarget.nodeType
        ? nativeEventTarget
        : nativeEventTarget.ownerDocument;
  if (
    mouseDown ||
    null == activeElement$1 ||
    activeElement$1 !== getActiveElement(doc)
  )
    return null;
  doc = activeElement$1;
  "selectionStart" in doc && hasSelectionCapabilities(doc)
    ? (doc = { start: doc.selectionStart, end: doc.selectionEnd })
    : ((doc = (
        (doc.ownerDocument && doc.ownerDocument.defaultView) ||
        window
      ).getSelection()),
      (doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }));
  return lastSelection && shallowEqual(lastSelection, doc)
    ? null
    : ((lastSelection = doc),
      (nativeEvent = SyntheticEvent.getPooled(
        eventTypes$3.select,
        activeElementInst$1,
        nativeEvent,
        nativeEventTarget
      )),
      (nativeEvent.type = "select"),
      (nativeEvent.target = activeElement$1),
      accumulateTwoPhaseDispatches(nativeEvent),
      nativeEvent);
}
var SelectEventPlugin = {
  eventTypes: eventTypes$3,
  extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    var doc =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget.document
          : 9 === nativeEventTarget.nodeType
            ? nativeEventTarget
            : nativeEventTarget.ownerDocument,
      JSCompiler_temp;
    if (!(JSCompiler_temp = !doc)) {
      a: {
        doc = getListeningSetForElement(doc);
        JSCompiler_temp = registrationNameDependencies.onSelect;
        for (var i = 0; i < JSCompiler_temp.length; i++)
          if (!doc.has(JSCompiler_temp[i])) {
            doc = !1;
            break a;
          }
        doc = !0;
      }
      JSCompiler_temp = !doc;
    }
    if (JSCompiler_temp) return null;
    doc = targetInst ? getNodeFromInstance$1(targetInst) : window;
    switch (topLevelType) {
      case "focus":
        if (isTextInputElement(doc) || "true" === doc.contentEditable)
          (activeElement$1 = doc),
            (activeElementInst$1 = targetInst),
            (lastSelection = null);
        break;
      case "blur":
        lastSelection = activeElementInst$1 = activeElement$1 = null;
        break;
      case "mousedown":
        mouseDown = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        return (
          (mouseDown = !1), constructSelectEvent(nativeEvent, nativeEventTarget)
        );
      case "selectionchange":
        if (skipSelectionChangeEvent) break;
      case "keydown":
      case "keyup":
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }
    return null;
  }
};
injection.injectEventPluginOrder(
  "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
    " "
  )
);
getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNode$1;
getInstanceFromNode = getInstanceFromNode$1;
getNodeFromInstance = getNodeFromInstance$1;
injection.injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});
function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
function getHostProps$1(element, props) {
  element = Object.assign({ children: void 0 }, props);
  if ((props = flattenChildren(props.children))) element.children = props;
  return element;
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++)
      multiple["$" + propValue[i]] = !0;
    for (propValue = 0; propValue < node.length; propValue++)
      (i = multiple.hasOwnProperty("$" + node[propValue].value)),
        node[propValue].selected !== i && (node[propValue].selected = i),
        i && setDefaultSelected && (node[propValue].defaultSelected = !0);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = !0;
        setDefaultSelected && (node[i].defaultSelected = !0);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = !0);
  }
}
function getHostProps$3(element, props) {
  if (null != props.dangerouslySetInnerHTML) throw ReactErrorProd(91);
  return Object.assign({}, props, {
    value: void 0,
    defaultValue: void 0,
    children: "" + element._wrapperState.initialValue
  });
}
function initWrapperState$2(element, props) {
  var initialValue = props.value;
  if (null == initialValue) {
    initialValue = props.defaultValue;
    props = props.children;
    if (null != props) {
      if (null != initialValue) throw ReactErrorProd(92);
      if (Array.isArray(props)) {
        if (!(1 >= props.length)) throw ReactErrorProd(93);
        props = props[0];
      }
      initialValue = props;
    }
    null == initialValue && (initialValue = "");
  }
  element._wrapperState = { initialValue: getToStringValue(initialValue) };
}
function updateWrapper$1(element, props) {
  var value = getToStringValue(props.value),
    defaultValue = getToStringValue(props.defaultValue);
  null != value &&
    ((value = "" + value),
    value !== element.value && (element.value = value),
    null == props.defaultValue &&
      element.defaultValue !== value &&
      (element.defaultValue = value));
  null != defaultValue && (element.defaultValue = "" + defaultValue);
}
function postMountWrapper$3(element) {
  var textContent = element.textContent;
  textContent === element._wrapperState.initialValue &&
    (element.value = textContent);
}
var Namespaces = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};
function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function getChildNamespace(parentNamespace, type) {
  return null == parentNamespace ||
    "http://www.w3.org/1999/xhtml" === parentNamespace
    ? getIntrinsicNamespace(type)
    : "http://www.w3.org/2000/svg" === parentNamespace &&
      "foreignObject" === type
      ? "http://www.w3.org/1999/xhtml"
      : parentNamespace;
}
var reusableSVGContainer = void 0,
  setInnerHTML = (function(func) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
      ? function(arg0, arg1, arg2, arg3) {
          MSApp.execUnsafeLocalFunction(function() {
            return func(arg0, arg1, arg2, arg3);
          });
        }
      : func;
  })(function(node, html) {
    if (node.namespaceURI !== Namespaces.svg || "innerHTML" in node)
      node.innerHTML = html;
    else {
      reusableSVGContainer =
        reusableSVGContainer || document.createElement("div");
      reusableSVGContainer.innerHTML = "<svg>" + html + "</svg>";
      for (html = reusableSVGContainer.firstChild; node.firstChild; )
        node.removeChild(node.firstChild);
      for (; html.firstChild; ) node.appendChild(html.firstChild);
    }
  });
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (
      firstChild &&
      firstChild === node.lastChild &&
      3 === firstChild.nodeType
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
var isUnitlessNumber = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop];
  });
});
function dangerousStyleValue(name, value, isCustomProperty) {
  return null == value || "boolean" === typeof value || "" === value
    ? ""
    : isCustomProperty ||
      "number" !== typeof value ||
      0 === value ||
      (isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
      ? ("" + value).trim()
      : value + "px";
}
function setValueForStyles(node, styles) {
  node = node.style;
  for (var styleName in styles)
    if (styles.hasOwnProperty(styleName)) {
      var isCustomProperty = 0 === styleName.indexOf("--"),
        styleValue = dangerousStyleValue(
          styleName,
          styles[styleName],
          isCustomProperty
        );
      "float" === styleName && (styleName = "cssFloat");
      isCustomProperty
        ? node.setProperty(styleName, styleValue)
        : (node[styleName] = styleValue);
    }
}
var voidElementTags = Object.assign(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  }
);
function assertValidProps(tag, props) {
  if (props) {
    if (
      voidElementTags[tag] &&
      (null != props.children || null != props.dangerouslySetInnerHTML)
    )
      throw ReactErrorProd(137, tag, "");
    if (null != props.dangerouslySetInnerHTML) {
      if (null != props.children) throw ReactErrorProd(60);
      if (
        !(
          "object" === typeof props.dangerouslySetInnerHTML &&
          "__html" in props.dangerouslySetInnerHTML
        )
      )
        throw ReactErrorProd(61);
    }
    if (null != props.style && "object" !== typeof props.style)
      throw ReactErrorProd(62, "");
  }
}
function isCustomComponent(tagName, props) {
  if (-1 === tagName.indexOf("-")) return "string" === typeof props.is;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
function ensureListeningTo(rootContainerElement, registrationName) {
  rootContainerElement =
    9 === rootContainerElement.nodeType || 11 === rootContainerElement.nodeType
      ? rootContainerElement
      : rootContainerElement.ownerDocument;
  var listeningSet = getListeningSetForElement(rootContainerElement);
  registrationName = registrationNameDependencies[registrationName];
  for (var i = 0; i < registrationName.length; i++) {
    var dependency = registrationName[i];
    if (!listeningSet.has(dependency)) {
      switch (dependency) {
        case "scroll":
          trapEventForPluginEventSystem(rootContainerElement, "scroll", !0);
          break;
        case "focus":
        case "blur":
          trapEventForPluginEventSystem(rootContainerElement, "focus", !0);
          trapEventForPluginEventSystem(rootContainerElement, "blur", !0);
          listeningSet.add("blur");
          listeningSet.add("focus");
          break;
        case "cancel":
        case "close":
          isEventSupported(dependency) &&
            trapEventForPluginEventSystem(rootContainerElement, dependency, !0);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === mediaEventTypes.indexOf(dependency) &&
            trapBubbledEvent(dependency, rootContainerElement);
      }
      listeningSet.add(dependency);
    }
  }
}
function noop() {}
function listenToEventResponderEventTypes(eventTypes, element$jscomp$0) {
  for (
    var listeningSet = getListeningSetForElement(element$jscomp$0),
      i = 0,
      length = eventTypes.length;
    i < length;
    ++i
  ) {
    var targetEventType = eventTypes[i],
      capture = !1,
      passive = !0;
    if ("string" === typeof targetEventType) var topLevelType = targetEventType;
    else
      (topLevelType = targetEventType.name),
        void 0 !== targetEventType.passive &&
          (passive = targetEventType.passive),
        void 0 !== targetEventType.capture &&
          (capture = targetEventType.capture);
    targetEventType =
      "" +
      topLevelType +
      (passive ? "_passive" : "_active") +
      (capture ? "_capture" : "");
    if (!listeningSet.has(targetEventType)) {
      var element = element$jscomp$0,
        rawEventName = topLevelType,
        eventFlags = 2;
      passive
        ? passiveBrowserEventsSupported
          ? (eventFlags |= 4)
          : ((eventFlags |= 8), (eventFlags |= 16), (passive = !1))
        : (eventFlags |= 8);
      topLevelType = dispatchEvent.bind(null, topLevelType, eventFlags);
      EventListenerWWW.listen(element, rawEventName, topLevelType, 0, {
        capture: capture,
        passive: passive
      });
      listeningSet.add(targetEventType);
    }
  }
}
listenToResponderEventTypesImpl = listenToEventResponderEventTypes;
var eventsEnabled = null,
  selectionInformation = null;
function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
  }
  return !1;
}
function shouldSetTextContent(type, props) {
  return (
    "textarea" === type ||
    "option" === type ||
    "noscript" === type ||
    "string" === typeof props.children ||
    "number" === typeof props.children ||
    ("object" === typeof props.dangerouslySetInnerHTML &&
      null !== props.dangerouslySetInnerHTML &&
      null != props.dangerouslySetInnerHTML.__html)
  );
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
  cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance;
  suspenseInstance = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType)
      if (((node = nextNode.data), "/$" === node))
        if (0 === suspenseInstance) {
          parentInstance.removeChild(nextNode);
          break;
        } else suspenseInstance--;
      else
        ("$" !== node && "$?" !== node && "$!" !== node) || suspenseInstance++;
    node = nextNode;
  } while (node);
}
function getNextHydratableSibling(instance) {
  for (
    instance = instance.nextSibling;
    instance &&
    1 !== instance.nodeType &&
    3 !== instance.nodeType &&
    (8 !== instance.nodeType ||
      ("$" !== instance.data &&
        "$?" !== instance.data &&
        "$!" !== instance.data));

  )
    instance = instance.nextSibling;
  return instance;
}
function getFirstHydratableChild(parentInstance) {
  for (
    parentInstance = parentInstance.firstChild;
    parentInstance &&
    1 !== parentInstance.nodeType &&
    3 !== parentInstance.nodeType &&
    (8 !== parentInstance.nodeType ||
      ("$" !== parentInstance.data &&
        "$!" !== parentInstance.data &&
        "$?" !== parentInstance.data));

  )
    parentInstance = parentInstance.nextSibling;
  return parentInstance;
}
var supportsUserTiming =
    "undefined" !== typeof performance &&
    "function" === typeof performance.mark &&
    "function" === typeof performance.clearMarks &&
    "function" === typeof performance.measure &&
    "function" === typeof performance.clearMeasures,
  currentFiber$1 = null,
  currentPhase = null,
  currentPhaseFiber = null,
  isCommitting = !1,
  hasScheduledUpdateInCurrentCommit = !1,
  hasScheduledUpdateInCurrentPhase = !1,
  commitCountInCurrentWorkLoop = 0,
  effectCountInCurrentCommit = 0,
  isWaitingForCallback = !1,
  labelsInCurrentCommit = new Set();
function beginMark(markName) {
  performance.mark("\u269b " + markName);
}
function endMark(label, markName, warning) {
  markName = "\u269b " + markName;
  label =
    (warning ? "\u26d4 " : "\u269b ") +
    label +
    (warning ? " Warning: " + warning : "");
  try {
    performance.measure(label, markName);
  } catch (err) {}
  performance.clearMarks(markName);
  performance.clearMeasures(label);
}
function getFiberLabel(componentName, isMounted, phase) {
  return null === phase
    ? componentName + " [" + (isMounted ? "update" : "mount") + "]"
    : componentName + "." + phase;
}
function beginFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  if (isCommitting && labelsInCurrentCommit.has(fiber)) return !1;
  labelsInCurrentCommit.add(fiber);
  beginMark(fiber + " (#" + debugID + ")");
  return !0;
}
function clearFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber =
    getFiberLabel(componentName, null !== fiber.alternate, phase) +
    " (#" +
    debugID +
    ")";
  performance.clearMarks("\u269b " + fiber);
}
function endFiberMark(fiber, phase, warning) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  endMark(fiber, fiber + " (#" + debugID + ")", warning);
}
function shouldIgnoreFiber(fiber) {
  switch (fiber.tag) {
    case 3:
    case 5:
    case 6:
    case 4:
    case 7:
    case 10:
    case 9:
    case 8:
      return !0;
    default:
      return !1;
  }
}
function resumeTimersRecursively(fiber) {
  null !== fiber.return && resumeTimersRecursively(fiber.return);
  fiber._debugIsCurrentlyTiming && beginFiberMark(fiber, null);
}
function startRequestCallbackTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !isWaitingForCallback &&
    ((isWaitingForCallback = !0), beginMark("(Waiting for async callback...)"));
}
function startWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber$1 = fiber),
    beginFiberMark(fiber, null) && (fiber._debugIsCurrentlyTiming = !0));
}
function cancelWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((fiber._debugIsCurrentlyTiming = !1), clearFiberMark(fiber, null));
}
function stopWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber$1 = fiber.return),
    fiber._debugIsCurrentlyTiming &&
      ((fiber._debugIsCurrentlyTiming = !1), endFiberMark(fiber, null, null)));
}
function startPhaseTimer(fiber, phase) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      clearFiberMark(currentPhaseFiber, currentPhase),
    (currentPhase = currentPhaseFiber = null),
    (hasScheduledUpdateInCurrentPhase = !1),
    beginFiberMark(fiber, phase) &&
      ((currentPhaseFiber = fiber), (currentPhase = phase)));
}
function stopPhaseTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      endFiberMark(
        currentPhaseFiber,
        currentPhase,
        hasScheduledUpdateInCurrentPhase ? "Scheduled a cascading update" : null
      ),
    (currentPhaseFiber = currentPhase = null));
}
function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
  if (enableUserTimingAPI && supportsUserTiming) {
    var warning = null;
    null !== interruptedBy
      ? (warning =
          3 === interruptedBy.tag
            ? "A top-level update interrupted the previous render"
            : "An update to " +
              (getComponentName(interruptedBy.type) || "Unknown") +
              " interrupted the previous render")
      : 1 < commitCountInCurrentWorkLoop &&
        (warning = "There were cascading updates");
    commitCountInCurrentWorkLoop = 0;
    interruptedBy = didCompleteRoot
      ? "(React Tree Reconciliation: Completed Root)"
      : "(React Tree Reconciliation: Yielded)";
    for (didCompleteRoot = currentFiber$1; didCompleteRoot; )
      didCompleteRoot._debugIsCurrentlyTiming &&
        endFiberMark(didCompleteRoot, null, null),
        (didCompleteRoot = didCompleteRoot.return);
    endMark(interruptedBy, "(React Tree Reconciliation)", warning);
  }
}
function startCommitSnapshotEffectsTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Committing Snapshot Effects)"));
}
function stopCommitSnapshotEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Snapshot Effects: " + count + " Total)",
      "(Committing Snapshot Effects)",
      null
    );
  }
}
function startCommitHostEffectsTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0), beginMark("(Committing Host Effects)"));
}
function stopCommitHostEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Host Effects: " + count + " Total)",
      "(Committing Host Effects)",
      null
    );
  }
}
function startCommitLifeCyclesTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Calling Lifecycle Methods)"));
}
function stopCommitLifeCyclesTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Calling Lifecycle Methods: " + count + " Total)",
      "(Calling Lifecycle Methods)",
      null
    );
  }
}
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
  var instance = fiber.stateNode,
    childContextTypes = type.childContextTypes;
  if ("function" !== typeof instance.getChildContext) return parentContext;
  startPhaseTimer(fiber, "getChildContext");
  fiber = instance.getChildContext();
  stopPhaseTimer();
  for (var contextKey in fiber)
    if (!(contextKey in childContextTypes))
      throw ReactErrorProd(
        108,
        getComponentName(type) || "Unknown",
        contextKey
      );
  return Object.assign({}, parentContext, fiber);
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
var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
  Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
  Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
  Scheduler_shouldYield = Scheduler.unstable_shouldYield,
  Scheduler_now = Scheduler.unstable_now,
  Scheduler_getCurrentPriorityLevel =
    Scheduler.unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
  Scheduler_LowPriority = Scheduler.unstable_LowPriority,
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority,
  fakeCallbackNode = {},
  shouldYield$1 = disableYielding
    ? function() {
        return !1;
      }
    : Scheduler_shouldYield,
  immediateQueue = null,
  immediateQueueCallbackNode = null,
  isFlushingImmediate = !1;
function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return 99;
    case Scheduler_UserBlockingPriority:
      return 98;
    case Scheduler_NormalPriority:
      return 97;
    case Scheduler_LowPriority:
      return 96;
    case Scheduler_IdlePriority:
      return 95;
    default:
      throw ReactError("Unknown priority level.");
  }
}
function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case 99:
      return Scheduler_ImmediatePriority;
    case 98:
      return Scheduler_UserBlockingPriority;
    case 97:
      return Scheduler_NormalPriority;
    case 96:
      return Scheduler_LowPriority;
    case 95:
      return Scheduler_IdlePriority;
    default:
      throw ReactError("Unknown priority level.");
  }
}
function runWithPriority(reactPriorityLevel, fn) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_runWithPriority(reactPriorityLevel, fn);
}
function scheduleCallback(reactPriorityLevel, callback, options) {
  if (99 === reactPriorityLevel)
    return (
      null === immediateQueue
        ? ((immediateQueue = [callback]),
          (immediateQueueCallbackNode = Scheduler_scheduleCallback(
            Scheduler_ImmediatePriority,
            flushImmediateQueueImpl
          )))
        : immediateQueue.push(callback),
      fakeCallbackNode
    );
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_scheduleCallback(reactPriorityLevel, callback, options);
}
function flushImmediateQueue() {
  null !== immediateQueueCallbackNode &&
    Scheduler_cancelCallback(immediateQueueCallbackNode);
  flushImmediateQueueImpl();
}
function flushImmediateQueueImpl() {
  if (!isFlushingImmediate && null !== immediateQueue) {
    isFlushingImmediate = !0;
    var i = 0;
    try {
      for (; i < immediateQueue.length; i++) {
        var callback = immediateQueue[i];
        do callback = callback(!0);
        while (null !== callback);
      }
      immediateQueue = null;
    } catch (error) {
      throw (null !== immediateQueue &&
        (immediateQueue = immediateQueue.slice(i + 1)),
      Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushImmediateQueue
      ),
      error);
    } finally {
      isFlushingImmediate = !1;
    }
  }
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
function inferPriorityFromExpirationTime(currentTime, expirationTime) {
  if (1073741823 === expirationTime) return 99;
  if (1 === expirationTime) return 95;
  currentTime =
    1073741822 -
    ((expirationTime / 10) | 0) -
    (1073741822 - ((currentTime / 10) | 0));
  return 0 >= currentTime
    ? 99
    : 150 >= currentTime
      ? 98
      : 5e3 >= currentTime
        ? 97
        : 95;
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
  this.callbackNode = this.firstBatch = null;
  this.pingTime = this.lastPendingTime = this.firstPendingTime = this.callbackExpirationTime = 0;
}
var lowPriorityWarning = require("lowPriorityWarning");
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
  var instance = workInProgress.stateNode;
  return "function" === typeof instance.shouldComponentUpdate
    ? (startPhaseTimer(workInProgress, "shouldComponentUpdate"),
      (workInProgress = instance.shouldComponentUpdate(
        newProps,
        newState,
        nextContext
      )),
      stopPhaseTimer(),
      workInProgress)
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
  var oldState = instance.state;
  startPhaseTimer(workInProgress, "componentWillReceiveProps");
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  stopPhaseTimer();
  instance.state !== oldState &&
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
    (startPhaseTimer(workInProgress, "componentWillMount"),
    (ctor = instance.state),
    "function" === typeof instance.componentWillMount &&
      instance.componentWillMount(),
    "function" === typeof instance.UNSAFE_componentWillMount &&
      instance.UNSAFE_componentWillMount(),
    stopPhaseTimer(),
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
  NO_CONTEXT = {},
  contextStackCursor$1 = { current: NO_CONTEXT },
  contextFiberStackCursor = { current: NO_CONTEXT },
  rootInstanceStackCursor = { current: NO_CONTEXT };
function requiredContext(c) {
  if (c === NO_CONTEXT) throw ReactErrorProd(174);
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance, fiber);
  push(contextFiberStackCursor, fiber, fiber);
  push(contextStackCursor$1, NO_CONTEXT, fiber);
  var type = nextRootInstance.nodeType;
  switch (type) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement)
        ? nextRootInstance.namespaceURI
        : getChildNamespace(null, "");
      break;
    default:
      (type = 8 === type ? nextRootInstance.parentNode : nextRootInstance),
        (nextRootInstance = type.namespaceURI || null),
        (type = type.tagName),
        (nextRootInstance = getChildNamespace(nextRootInstance, type));
  }
  pop(contextStackCursor$1, fiber);
  push(contextStackCursor$1, nextRootInstance, fiber);
}
function popHostContainer(fiber) {
  pop(contextStackCursor$1, fiber);
  pop(contextFiberStackCursor, fiber);
  pop(rootInstanceStackCursor, fiber);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildNamespace(context, fiber.type);
  context !== nextContext &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, nextContext, fiber));
}
function pushHostContextForEventComponent(fiber) {
  var context = requiredContext(contextStackCursor$1.current);
  context !== context &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, context, fiber));
}
function pushHostContextForEventTarget(fiber) {
  var context = requiredContext(contextStackCursor$1.current);
  context !== context &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, context, fiber));
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
function deleteHydratableInstance(returnFiber, instance) {
  var fiber = createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.effectTag = 8;
  null !== returnFiber.lastEffect
    ? ((returnFiber.lastEffect.nextEffect = fiber),
      (returnFiber.lastEffect = fiber))
    : (returnFiber.firstEffect = returnFiber.lastEffect = fiber);
}
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      var type = fiber.type;
      nextInstance =
        1 !== nextInstance.nodeType ||
        type.toLowerCase() !== nextInstance.nodeName.toLowerCase()
          ? null
          : nextInstance;
      return null !== nextInstance
        ? ((fiber.stateNode = nextInstance), !0)
        : !1;
    case 6:
      return (
        (nextInstance =
          "" === fiber.pendingProps || 3 !== nextInstance.nodeType
            ? null
            : nextInstance),
        null !== nextInstance ? ((fiber.stateNode = nextInstance), !0) : !1
      );
    case 13:
      return (
        (nextInstance = 8 !== nextInstance.nodeType ? null : nextInstance),
        null !== nextInstance
          ? ((fiber.tag = 18), (fiber.stateNode = nextInstance), !0)
          : !1
      );
    default:
      return !1;
  }
}
function tryToClaimNextHydratableInstance(fiber) {
  if (isHydrating) {
    var nextInstance = nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        nextInstance = getNextHydratableSibling(firstAttemptedInstance);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          fiber.effectTag |= 2;
          isHydrating = !1;
          hydrationParentFiber = fiber;
          return;
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getFirstHydratableChild(nextInstance);
    } else
      (fiber.effectTag |= 2),
        (isHydrating = !1),
        (hydrationParentFiber = fiber);
  }
}
function popToNextHostParent(fiber) {
  for (
    fiber = fiber.return;
    null !== fiber && 5 !== fiber.tag && 3 !== fiber.tag && 18 !== fiber.tag;

  )
    fiber = fiber.return;
  hydrationParentFiber = fiber;
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return !1;
  if (!isHydrating) return popToNextHostParent(fiber), (isHydrating = !0), !1;
  var type = fiber.type;
  if (
    5 !== fiber.tag ||
    ("head" !== type &&
      "body" !== type &&
      !shouldSetTextContent(type, fiber.memoizedProps))
  )
    for (type = nextHydratableInstance; type; )
      deleteHydratableInstance(fiber, type),
        (type = getNextHydratableSibling(type));
  popToNextHostParent(fiber);
  nextHydratableInstance = hydrationParentFiber
    ? getNextHydratableSibling(fiber.stateNode)
    : null;
  return !0;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = !1;
}
var ReactCurrentOwner$3 = ReactSharedInternals.ReactCurrentOwner,
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
              (startPhaseTimer(workInProgress, "componentWillMount"),
              "function" === typeof instance.componentWillMount &&
                instance.componentWillMount(),
              "function" === typeof instance.UNSAFE_componentWillMount &&
                instance.UNSAFE_componentWillMount(),
              stopPhaseTimer()),
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
                (startPhaseTimer(workInProgress, "componentWillUpdate"),
                "function" === typeof instance.componentWillUpdate &&
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
                  ),
                stopPhaseTimer()),
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
  ReactCurrentOwner$3.current = workInProgress;
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
      "$!" === suspenseInstance.data
        ? ((suspenseInstance = requestCurrentTime$$1()),
          (workInProgress.expirationTime = computeExpirationBucket(
            suspenseInstance,
            5e3,
            250
          )))
        : (workInProgress.expirationTime = 1),
      null
    );
  if (0 !== (workInProgress.effectTag & 64))
    return (workInProgress.child = null);
  if ("$!" === suspenseInstance.data)
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
  if ("$?" === suspenseInstance.data)
    return (
      (workInProgress.effectTag |= 64),
      (workInProgress.child = null),
      (workInProgress = retryTimedOutBoundary$$1.bind(null, current$$1)),
      (suspenseInstance._reactRetry = workInProgress),
      null
    );
  nextHydratableInstance = getNextHydratableSibling(workInProgress.stateNode);
  popToNextHostParent(workInProgress);
  isHydrating = !0;
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
  cancelWorkTimer(workInProgress);
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
var valueCursor = { current: null },
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved = null;
function resetContextDependences() {
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
}
function pushProvider(providerFiber, nextValue) {
  var context = providerFiber.type._context;
  push(valueCursor, context._currentValue, providerFiber);
  context._currentValue = nextValue;
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor, providerFiber);
  providerFiber.type._context._currentValue = currentValue;
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
  return context._currentValue;
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
function markUpdate(workInProgress) {
  workInProgress.effectTag |= 4;
}
var appendAllChildren = void 0,
  updateHostContainer = void 0,
  updateHostComponent$1 = void 0,
  updateHostText$1 = void 0;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) parent.appendChild(node.stateNode);
    else if (4 !== node.tag && null !== node.child) {
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
updateHostComponent$1 = function(
  current,
  workInProgress,
  type,
  newProps,
  rootContainerInstance
) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    var instance = workInProgress.stateNode;
    requiredContext(contextStackCursor$1.current);
    current = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(instance, oldProps);
        newProps = getHostProps(instance, newProps);
        current = [];
        break;
      case "option":
        oldProps = getHostProps$1(instance, oldProps);
        newProps = getHostProps$1(instance, newProps);
        current = [];
        break;
      case "select":
        oldProps = Object.assign({}, oldProps, { value: void 0 });
        newProps = Object.assign({}, newProps, { value: void 0 });
        current = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(instance, oldProps);
        newProps = getHostProps$3(instance, newProps);
        current = [];
        break;
      default:
        "function" !== typeof oldProps.onClick &&
          "function" === typeof newProps.onClick &&
          (instance.onclick = noop);
    }
    assertValidProps(type, newProps);
    instance = type = void 0;
    var styleUpdates = null;
    for (type in oldProps)
      if (
        !newProps.hasOwnProperty(type) &&
        oldProps.hasOwnProperty(type) &&
        null != oldProps[type]
      )
        if ("style" === type) {
          var lastStyle = oldProps[type];
          for (instance in lastStyle)
            lastStyle.hasOwnProperty(instance) &&
              (styleUpdates || (styleUpdates = {}),
              (styleUpdates[instance] = ""));
        } else
          "dangerouslySetInnerHTML" !== type &&
            "children" !== type &&
            "suppressContentEditableWarning" !== type &&
            "suppressHydrationWarning" !== type &&
            "autoFocus" !== type &&
            (registrationNameModules.hasOwnProperty(type)
              ? current || (current = [])
              : (current = current || []).push(type, null));
    for (type in newProps) {
      var nextProp = newProps[type];
      lastStyle = null != oldProps ? oldProps[type] : void 0;
      if (
        newProps.hasOwnProperty(type) &&
        nextProp !== lastStyle &&
        (null != nextProp || null != lastStyle)
      )
        if ("style" === type)
          if (lastStyle) {
            for (instance in lastStyle)
              !lastStyle.hasOwnProperty(instance) ||
                (nextProp && nextProp.hasOwnProperty(instance)) ||
                (styleUpdates || (styleUpdates = {}),
                (styleUpdates[instance] = ""));
            for (instance in nextProp)
              nextProp.hasOwnProperty(instance) &&
                lastStyle[instance] !== nextProp[instance] &&
                (styleUpdates || (styleUpdates = {}),
                (styleUpdates[instance] = nextProp[instance]));
          } else
            styleUpdates ||
              (current || (current = []), current.push(type, styleUpdates)),
              (styleUpdates = nextProp);
        else
          "dangerouslySetInnerHTML" === type
            ? ((nextProp = nextProp ? nextProp.__html : void 0),
              (lastStyle = lastStyle ? lastStyle.__html : void 0),
              null != nextProp &&
                lastStyle !== nextProp &&
                (current = current || []).push(type, "" + nextProp))
            : "children" === type
              ? lastStyle === nextProp ||
                ("string" !== typeof nextProp &&
                  "number" !== typeof nextProp) ||
                (current = current || []).push(type, "" + nextProp)
              : "suppressContentEditableWarning" !== type &&
                "suppressHydrationWarning" !== type &&
                (registrationNameModules.hasOwnProperty(type)
                  ? (null != nextProp &&
                      ensureListeningTo(rootContainerInstance, type),
                    current || lastStyle === nextProp || (current = []))
                  : (current = current || []).push(type, nextProp));
    }
    styleUpdates && (current = current || []).push("style", styleUpdates);
    rootContainerInstance = current;
    (workInProgress.updateQueue = rootContainerInstance) &&
      markUpdate(workInProgress);
  }
};
updateHostText$1 = function(current, workInProgress, oldText, newText) {
  oldText !== newText && markUpdate(workInProgress);
};
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw ReactErrorProd(320);
function logCapturedError(capturedError) {
  !1 !== ReactFiberErrorDialogWWW.showErrorDialog(capturedError) &&
    console.error(capturedError.error);
}
var PossiblyWeakSet$2 = "function" === typeof WeakSet ? WeakSet : Set;
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
      if (isHidden) instance.style.display = "none";
      else {
        instance = node.stateNode;
        var styleProp = node.memoizedProps.style;
        styleProp =
          void 0 !== styleProp &&
          null !== styleProp &&
          styleProp.hasOwnProperty("display")
            ? styleProp.display
            : null;
        instance.style.display = dangerousStyleValue("display", styleProp);
      }
    } else if (6 === node.tag)
      node.stateNode.nodeValue = isHidden ? "" : node.memoizedProps;
    else if (13 === node.tag && null !== node.memoizedState) {
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
          startPhaseTimer(current$$1$jscomp$0, "componentWillUnmount"),
            (updateQueue.props = current$$1$jscomp$0.memoizedProps),
            (updateQueue.state = current$$1$jscomp$0.memoizedState),
            updateQueue.componentWillUnmount(),
            stopPhaseTimer();
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
      updateQueue = current$$1$jscomp$0.type.responder.onUnmount;
      if (void 0 !== updateQueue) {
        destroy = current$$1$jscomp$0.stateNode;
        effect = destroy.props;
        destroy = destroy.state;
        current$$1 = currentEventQueue;
        var previousFiber = currentFiber;
        currentEventQueue = createEventQueue();
        currentFiber = current$$1$jscomp$0;
        try {
          updateQueue(eventResponderContext, effect, destroy);
        } finally {
          (currentEventQueue = current$$1), (currentFiber = previousFiber);
        }
      }
      currentOwner === current$$1$jscomp$0 && (currentOwner = null);
      current$$1$jscomp$0.stateNode = null;
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
  parentFiber.effectTag & 16 &&
    (setTextContent(parent, ""), (parentFiber.effectTag &= -17));
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
          var container = parent,
            child = stateNode;
          stateNode = parentFiber;
          8 === container.nodeType
            ? container.parentNode.insertBefore(child, stateNode)
            : container.insertBefore(child, stateNode);
        } else parent.insertBefore(stateNode, parentFiber);
      else
        isContainer
          ? ((child = parent),
            8 === child.nodeType
              ? ((container = child.parentNode),
                container.insertBefore(stateNode, child))
              : ((container = child), container.appendChild(stateNode)),
            (child = child._reactRootContainer),
            (null !== child && void 0 !== child) ||
              null !== container.onclick ||
              (container.onclick = noop))
          : parent.appendChild(stateNode);
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
      currentParentIsContainer
        ? ((root = currentParent),
          (node$jscomp$0 = node.stateNode),
          8 === root.nodeType
            ? root.parentNode.removeChild(node$jscomp$0)
            : root.removeChild(node$jscomp$0))
        : currentParent.removeChild(node.stateNode);
    } else if (18 === node.tag)
      currentParentIsContainer
        ? ((root = currentParent),
          (node$jscomp$0 = node.stateNode),
          8 === root.nodeType
            ? clearSuspenseBoundary(root.parentNode, node$jscomp$0)
            : 1 === root.nodeType && clearSuspenseBoundary(root, node$jscomp$0))
        : clearSuspenseBoundary(currentParent, node.stateNode);
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
        var newProps = finishedWork.memoizedProps,
          oldProps = null !== current$$1 ? current$$1.memoizedProps : newProps;
        current$$1 = finishedWork.type;
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          instance[internalEventHandlersKey] = newProps;
          "input" === current$$1 &&
            "radio" === newProps.type &&
            null != newProps.name &&
            updateChecked(instance, newProps);
          isCustomComponent(current$$1, oldProps);
          finishedWork = isCustomComponent(current$$1, newProps);
          for (oldProps = 0; oldProps < updatePayload.length; oldProps += 2) {
            var propKey = updatePayload[oldProps],
              propValue = updatePayload[oldProps + 1];
            "style" === propKey
              ? setValueForStyles(instance, propValue)
              : "dangerouslySetInnerHTML" === propKey
                ? setInnerHTML(instance, propValue)
                : "children" === propKey
                  ? setTextContent(instance, propValue)
                  : setValueForProperty(
                      instance,
                      propKey,
                      propValue,
                      finishedWork
                    );
          }
          switch (current$$1) {
            case "input":
              updateWrapper(instance, newProps);
              break;
            case "textarea":
              updateWrapper$1(instance, newProps);
              break;
            case "select":
              (current$$1 = instance._wrapperState.wasMultiple),
                (instance._wrapperState.wasMultiple = !!newProps.multiple),
                (updatePayload = newProps.value),
                null != updatePayload
                  ? updateOptions(
                      instance,
                      !!newProps.multiple,
                      updatePayload,
                      !1
                    )
                  : current$$1 !== !!newProps.multiple &&
                    (null != newProps.defaultValue
                      ? updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.defaultValue,
                          !0
                        )
                      : updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.multiple ? [] : "",
                          !1
                        ));
          }
        }
      }
      break;
    case 6:
      if (null === finishedWork.stateNode) throw ReactErrorProd(162);
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      break;
    case 20:
      instance = null;
      for (newProps = finishedWork.return; null !== newProps; ) {
        if (5 === newProps.tag) {
          instance = newProps.stateNode;
          break;
        } else if (3 === newProps.tag) {
          instance = newProps.stateNode.containerInfo;
          break;
        }
        newProps = newProps.return;
      }
      if (null === instance)
        throw ReactError(
          "This should have a parent host component initialized. This error is likely caused by a bug in React. Please file an issue."
        );
      break;
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
      (retryCache = finishedWork.stateNode = new PossiblyWeakSet$2());
    newState.forEach(function(thenable) {
      var retry = resolveRetryThenable$$1.bind(null, finishedWork, thenable);
      retryCache.has(thenable) ||
        (retryCache.add(thenable), thenable.then(retry, retry));
    });
  }
}
var PossiblyWeakSet$1 = "function" === typeof WeakSet ? WeakSet : Set,
  PossiblyWeakMap$1 = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime);
  expirationTime.tag = CaptureUpdate;
  expirationTime.payload = { element: null };
  var error = errorInfo.value;
  expirationTime.callback = function() {
    hasUncaughtError || ((hasUncaughtError = !0), (firstUncaughtError = error));
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
        (null === legacyErrorBoundariesThatAlreadyFailed$1
          ? (legacyErrorBoundariesThatAlreadyFailed$1 = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed$1.add(this));
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
    pingCache = root.pingCache = new PossiblyWeakMap$1();
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
var now$2 = Scheduler.unstable_now;
now$2();
var ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$4 = ReactSharedInternals.ReactCurrentOwner,
  workPhase = 0,
  workInProgressRoot = null,
  workInProgress = null,
  renderExpirationTime$1 = 0,
  workInProgressRootExitStatus = 0,
  workInProgressRootAbsoluteTimeoutMs = -1,
  nextEffect$1 = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed$1 = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects$1 = null,
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount$1 = 0,
  rootWithNestedUpdates = null,
  interruptedBy$1 = null,
  currentEventTime = 0;
function requestCurrentTime$2() {
  return 4 === workPhase || 5 === workPhase
    ? 1073741822 - ((Scheduler_now() / 10) | 0)
    : 0 !== currentEventTime
      ? currentEventTime
      : (currentEventTime = 1073741822 - ((Scheduler_now() / 10) | 0));
}
function computeExpirationForFiber$2(currentTime, fiber) {
  if (0 === (fiber.mode & 1)) return 1073741823;
  if (4 === workPhase) return renderExpirationTime$1;
  switch (getCurrentPriorityLevel()) {
    case 99:
      currentTime = 1073741823;
      break;
    case 98:
      currentTime = computeExpirationBucket(currentTime, 150, 100);
      break;
    case 97:
    case 96:
      currentTime = computeExpirationBucket(currentTime, 5e3, 250);
      break;
    case 95:
      currentTime = 1;
      break;
    default:
      throw ReactError("Expected a valid priority level");
  }
  null !== workInProgressRoot &&
    currentTime === renderExpirationTime$1 &&
    --currentTime;
  return currentTime;
}
var lastUniqueAsyncExpiration$1 = 0;
function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
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
  null !== root &&
    (expirationTime > root.firstPendingTime &&
      (root.firstPendingTime = expirationTime),
    (fiber = root.lastPendingTime),
    0 === fiber || expirationTime < fiber) &&
    (root.lastPendingTime = expirationTime);
  return root;
}
function scheduleCallbackForRoot(root, priorityLevel, expirationTime) {
  if (root.callbackExpirationTime < expirationTime) {
    var existingCallbackNode = root.callbackNode;
    null !== existingCallbackNode &&
      existingCallbackNode !== fakeCallbackNode &&
      Scheduler_cancelCallback(existingCallbackNode);
    root.callbackExpirationTime = expirationTime;
    existingCallbackNode =
      1073741823 === expirationTime
        ? null
        : { timeout: 10 * (1073741822 - expirationTime) };
    root.callbackNode = scheduleCallback(
      priorityLevel,
      runRootCallback.bind(
        null,
        root,
        renderRoot$1.bind(null, root, expirationTime)
      ),
      existingCallbackNode
    );
    enableUserTimingAPI &&
      1073741823 !== expirationTime &&
      4 !== workPhase &&
      5 !== workPhase &&
      startRequestCallbackTimer();
  }
  priorityLevel = root.timeoutHandle;
  -1 !== priorityLevel &&
    ((root.timeoutHandle = -1), cancelTimeout(priorityLevel));
}
function runRootCallback(root, callback, isSync) {
  var prevCallbackNode = root.callbackNode,
    continuation = null;
  try {
    return (
      (continuation = callback(isSync)),
      null !== continuation
        ? runRootCallback.bind(null, root, continuation)
        : null
    );
  } finally {
    null === continuation &&
      prevCallbackNode === root.callbackNode &&
      ((root.callbackNode = null), (root.callbackExpirationTime = 0));
  }
}
function resolveLocksOnRoot(root, expirationTime) {
  var firstBatch = root.firstBatch;
  return null !== firstBatch &&
    firstBatch._defer &&
    firstBatch._expirationTime >= expirationTime
    ? ((root.finishedWork = root.current.alternate),
      (root.pendingCommitExpirationTime = expirationTime),
      scheduleCallback(97, function() {
        firstBatch._onComplete();
        return null;
      }),
      !0)
    : !1;
}
function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function(expirationTime, root) {
      scheduleCallback(99, renderRoot$1.bind(null, root, expirationTime));
    });
    flushImmediateQueue();
  }
}
function prepareFreshStack(root, expirationTime) {
  root.pendingCommitExpirationTime = 0;
  if (null !== workInProgress)
    for (
      var interruptedWork = workInProgress.return;
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
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null, expirationTime);
  renderExpirationTime$1 = expirationTime;
  workInProgressRootExitStatus = 0;
  workInProgressRootAbsoluteTimeoutMs = -1;
}
function renderRoot$1(root$jscomp$0, expirationTime$jscomp$0, isSync) {
  if (4 === workPhase || 5 === workPhase)
    throw ReactError("Should not already be working.");
  if (enableUserTimingAPI && 1073741823 !== expirationTime$jscomp$0) {
    var expirationTime = 10 * (1073741822 - expirationTime$jscomp$0);
    enableUserTimingAPI &&
      supportsUserTiming &&
      ((isWaitingForCallback = !1),
      endMark(
        "(Waiting for async callback... will force flush in " +
          expirationTime +
          " ms)",
        "(Waiting for async callback...)",
        isSync ? "React was blocked by main thread" : null
      ));
  }
  if (root$jscomp$0.firstPendingTime < expirationTime$jscomp$0) return null;
  if (root$jscomp$0.pendingCommitExpirationTime === expirationTime$jscomp$0)
    return (
      (root$jscomp$0.pendingCommitExpirationTime = 0),
      commitRoot$1.bind(null, root$jscomp$0, expirationTime$jscomp$0)
    );
  flushPassiveEffects$2();
  (root$jscomp$0 === workInProgressRoot &&
    expirationTime$jscomp$0 === renderExpirationTime$1) ||
    prepareFreshStack(root$jscomp$0, expirationTime$jscomp$0);
  if (null !== workInProgress) {
    expirationTime = workPhase;
    workPhase = 4;
    var prevDispatcher = ReactCurrentDispatcher$2.current;
    null === prevDispatcher && (prevDispatcher = ContextOnlyDispatcher);
    ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;
    enableUserTimingAPI &&
      ((currentFiber$1 = workInProgress),
      supportsUserTiming &&
        ((commitCountInCurrentWorkLoop = 0),
        beginMark("(React Tree Reconciliation)"),
        null !== currentFiber$1 && resumeTimersRecursively(currentFiber$1)));
    if (isSync) {
      if (1073741823 !== expirationTime$jscomp$0) {
        var currentTime = requestCurrentTime$2();
        if (currentTime < expirationTime$jscomp$0)
          return (
            (workPhase = expirationTime),
            resetContextDependences(),
            (ReactCurrentDispatcher$2.current = prevDispatcher),
            renderRoot$1.bind(null, root$jscomp$0, currentTime)
          );
      }
    } else currentEventTime = 0;
    do
      try {
        if (isSync)
          for (; null !== workInProgress; )
            workInProgress = performUnitOfWork$1(workInProgress);
        else
          for (; null !== workInProgress && !shouldYield$1(); )
            workInProgress = performUnitOfWork$1(workInProgress);
        break;
      } catch (thrownValue) {
        resetContextDependences();
        resetHooks();
        currentTime = workInProgress;
        if (null === currentTime || null === currentTime.return)
          throw (prepareFreshStack(root$jscomp$0, expirationTime$jscomp$0),
          (workPhase = expirationTime),
          thrownValue);
        a: {
          var root = root$jscomp$0,
            returnFiber = currentTime.return,
            sourceFiber = currentTime,
            value = thrownValue,
            renderExpirationTime = renderExpirationTime$1;
          sourceFiber.effectTag |= 1024;
          sourceFiber.firstEffect = sourceFiber.lastEffect = null;
          if (
            null !== value &&
            "object" === typeof value &&
            "function" === typeof value.then
          ) {
            var thenable = value;
            value = returnFiber;
            var earliestTimeoutMs = -1,
              startTimeMs = -1;
            do {
              if (13 === value.tag) {
                var current$$1 = value.alternate;
                if (
                  null !== current$$1 &&
                  ((current$$1 = current$$1.memoizedState), null !== current$$1)
                ) {
                  startTimeMs = 10 * (1073741822 - current$$1.timedOutAt);
                  break;
                }
                if (-1 === earliestTimeoutMs || 150 < earliestTimeoutMs)
                  earliestTimeoutMs = 150;
              }
              value = value.return;
            } while (null !== value);
            value = returnFiber;
            do {
              if (
                13 === value.tag &&
                (void 0 === value.memoizedProps.fallback
                  ? 0
                  : null === value.memoizedState)
              ) {
                returnFiber = value.updateQueue;
                null === returnFiber
                  ? ((returnFiber = new Set()),
                    returnFiber.add(thenable),
                    (value.updateQueue = returnFiber))
                  : returnFiber.add(thenable);
                if (0 === (value.mode & 1)) {
                  value.effectTag |= 64;
                  sourceFiber.effectTag &= -1957;
                  1 === sourceFiber.tag &&
                    (null === sourceFiber.alternate
                      ? (sourceFiber.tag = 17)
                      : ((renderExpirationTime = createUpdate(1073741823)),
                        (renderExpirationTime.tag = ForceUpdate),
                        enqueueUpdate(sourceFiber, renderExpirationTime)));
                  sourceFiber.expirationTime = 1073741823;
                  break a;
                }
                attachPingListener(root, renderExpirationTime, thenable);
                -1 === earliestTimeoutMs
                  ? (thenable = 1073741823)
                  : (-1 === startTimeMs &&
                      (startTimeMs =
                        10 * (1073741822 - root.firstPendingTime) - 5e3),
                    (thenable = startTimeMs + earliestTimeoutMs));
                0 <= thenable &&
                  workInProgressRootAbsoluteTimeoutMs < thenable &&
                  ((workInProgressRootAbsoluteTimeoutMs = thenable),
                  0 === workInProgressRootExitStatus &&
                    (workInProgressRootExitStatus = 2));
                value.effectTag |= 2048;
                value.expirationTime = renderExpirationTime;
                break a;
              }
              if (18 === value.tag) {
                attachPingListener(root, renderExpirationTime, thenable);
                sourceFiber = value.memoizedState;
                if (null === sourceFiber) {
                  sourceFiber = value.memoizedState = new PossiblyWeakSet$1();
                  root = value.alternate;
                  if (!root) throw ReactErrorProd(319);
                  root.memoizedState = sourceFiber;
                }
                sourceFiber.has(thenable) ||
                  (sourceFiber.add(thenable),
                  (sourceFiber = resolveRetryThenable$$1.bind(
                    null,
                    value,
                    thenable
                  )),
                  thenable.then(sourceFiber, sourceFiber));
                value.effectTag |= 2048;
                value.expirationTime = renderExpirationTime;
                break a;
              }
              value = value.return;
            } while (null !== value);
            value = Error(
              (getComponentName(sourceFiber.type) || "A React component") +
                " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                getStackByFiberInDevAndProd(sourceFiber)
            );
          }
          if (
            0 === workInProgressRootExitStatus ||
            2 === workInProgressRootExitStatus
          )
            workInProgressRootExitStatus = 1;
          value = createCapturedValue(value, sourceFiber);
          thenable = returnFiber;
          do {
            switch (thenable.tag) {
              case 3:
                thenable.effectTag |= 2048;
                thenable.expirationTime = renderExpirationTime;
                renderExpirationTime = createRootErrorUpdate(
                  thenable,
                  value,
                  renderExpirationTime
                );
                enqueueCapturedUpdate(thenable, renderExpirationTime);
                break a;
              case 1:
                if (
                  ((sourceFiber = value),
                  (root = thenable.type),
                  (earliestTimeoutMs = thenable.stateNode),
                  0 === (thenable.effectTag & 64) &&
                    ("function" === typeof root.getDerivedStateFromError ||
                      (null !== earliestTimeoutMs &&
                        "function" ===
                          typeof earliestTimeoutMs.componentDidCatch &&
                        !isAlreadyFailedLegacyErrorBoundary$$1(
                          earliestTimeoutMs
                        ))))
                ) {
                  thenable.effectTag |= 2048;
                  thenable.expirationTime = renderExpirationTime;
                  renderExpirationTime = createClassErrorUpdate(
                    thenable,
                    sourceFiber,
                    renderExpirationTime
                  );
                  enqueueCapturedUpdate(thenable, renderExpirationTime);
                  break a;
                }
            }
            thenable = thenable.return;
          } while (null !== thenable);
        }
        workInProgress = completeUnitOfWork$1(currentTime);
      }
    while (1);
    workPhase = expirationTime;
    resetContextDependences();
    ReactCurrentDispatcher$2.current = prevDispatcher;
    if (null !== workInProgress)
      return (
        stopWorkLoopTimer(interruptedBy$1, !1),
        (interruptedBy$1 = null),
        1073741823 !== expirationTime$jscomp$0 && startRequestCallbackTimer(),
        renderRoot$1.bind(null, root$jscomp$0, expirationTime$jscomp$0)
      );
  }
  stopWorkLoopTimer(interruptedBy$1, !0);
  interruptedBy$1 = null;
  if (resolveLocksOnRoot(root$jscomp$0, expirationTime$jscomp$0)) return null;
  workInProgressRoot = null;
  switch (workInProgressRootExitStatus) {
    case 0:
      throw ReactError("Should have a work-in-progress.");
    case 1:
      return (
        (expirationTime = root$jscomp$0.lastPendingTime),
        root$jscomp$0.lastPendingTime < expirationTime$jscomp$0
          ? renderRoot$1.bind(null, root$jscomp$0, expirationTime)
          : isSync
            ? commitRoot$1.bind(null, root$jscomp$0, expirationTime$jscomp$0)
            : (prepareFreshStack(root$jscomp$0, expirationTime$jscomp$0),
              scheduleCallback(
                99,
                renderRoot$1.bind(null, root$jscomp$0, expirationTime$jscomp$0)
              ),
              null)
      );
    case 2:
      return (
        (expirationTime = root$jscomp$0.lastPendingTime),
        root$jscomp$0.lastPendingTime < expirationTime$jscomp$0
          ? renderRoot$1.bind(null, root$jscomp$0, expirationTime)
          : !isSync &&
            ((isSync = workInProgressRootAbsoluteTimeoutMs),
            disableYielding
              ? (isSync = 0)
              : ((expirationTime =
                  10 * (1073741822 - root$jscomp$0.firstPendingTime)),
                expirationTime < isSync && (isSync = expirationTime),
                (isSync -= Scheduler_now()),
                (isSync = 0 > isSync ? 0 : isSync)),
            0 < isSync)
            ? ((root$jscomp$0.timeoutHandle = scheduleTimeout(
                commitRoot$1.bind(null, root$jscomp$0, expirationTime$jscomp$0),
                isSync
              )),
              null)
            : commitRoot$1.bind(null, root$jscomp$0, expirationTime$jscomp$0)
      );
    case 3:
      return commitRoot$1.bind(null, root$jscomp$0, expirationTime$jscomp$0);
    default:
      throw ReactError("Unknown root exit status.");
  }
}
function performUnitOfWork$1(unitOfWork) {
  var current$$1 = unitOfWork.alternate;
  startWorkTimer(unitOfWork);
  current$$1 = beginWork$1(current$$1, unitOfWork, renderExpirationTime$1);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === current$$1 && (current$$1 = completeUnitOfWork$1(unitOfWork));
  ReactCurrentOwner$4.current = null;
  return current$$1;
}
function completeUnitOfWork$1(unitOfWork) {
  workInProgress = unitOfWork;
  do {
    var current$$1 = workInProgress.alternate;
    unitOfWork = workInProgress.return;
    if (0 === (workInProgress.effectTag & 1024)) {
      a: {
        var domElement = current$$1;
        current$$1 = workInProgress;
        var renderExpirationTime = renderExpirationTime$1;
        var textNode = current$$1.pendingProps;
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
            textNode = current$$1.stateNode;
            textNode.pendingContext &&
              ((textNode.context = textNode.pendingContext),
              (textNode.pendingContext = null));
            if (null === domElement || null === domElement.child)
              popHydrationState(current$$1), (current$$1.effectTag &= -3);
            updateHostContainer(current$$1);
            break;
          case 5:
            popHostContext(current$$1);
            var rootContainerInstance = requiredContext(
              rootInstanceStackCursor.current
            );
            renderExpirationTime = current$$1.type;
            if (null !== domElement && null != current$$1.stateNode)
              updateHostComponent$1(
                domElement,
                current$$1,
                renderExpirationTime,
                textNode,
                rootContainerInstance
              ),
                domElement.ref !== current$$1.ref &&
                  (current$$1.effectTag |= 128);
            else if (textNode) {
              var props = requiredContext(contextStackCursor$1.current);
              if (popHydrationState(current$$1)) {
                textNode = void 0;
                renderExpirationTime = current$$1.stateNode;
                domElement = current$$1.type;
                props = current$$1.memoizedProps;
                renderExpirationTime[internalInstanceKey] = current$$1;
                renderExpirationTime[internalEventHandlersKey] = props;
                switch (domElement) {
                  case "iframe":
                  case "object":
                    trapBubbledEvent("load", renderExpirationTime);
                    break;
                  case "video":
                  case "audio":
                    for (var i = 0; i < mediaEventTypes.length; i++)
                      trapBubbledEvent(
                        mediaEventTypes[i],
                        renderExpirationTime
                      );
                    break;
                  case "source":
                    trapBubbledEvent("error", renderExpirationTime);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    trapBubbledEvent("error", renderExpirationTime);
                    trapBubbledEvent("load", renderExpirationTime);
                    break;
                  case "form":
                    trapBubbledEvent("reset", renderExpirationTime);
                    trapBubbledEvent("submit", renderExpirationTime);
                    break;
                  case "details":
                    trapBubbledEvent("toggle", renderExpirationTime);
                    break;
                  case "input":
                    initWrapperState(renderExpirationTime, props);
                    trapBubbledEvent("invalid", renderExpirationTime);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  case "select":
                    renderExpirationTime._wrapperState = {
                      wasMultiple: !!props.multiple
                    };
                    trapBubbledEvent("invalid", renderExpirationTime);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  case "textarea":
                    initWrapperState$2(renderExpirationTime, props),
                      trapBubbledEvent("invalid", renderExpirationTime),
                      ensureListeningTo(rootContainerInstance, "onChange");
                }
                assertValidProps(domElement, props);
                i = null;
                for (textNode in props)
                  if (props.hasOwnProperty(textNode)) {
                    var nextProp = props[textNode];
                    "children" === textNode
                      ? "string" === typeof nextProp
                        ? renderExpirationTime.textContent !== nextProp &&
                          (i = ["children", nextProp])
                        : "number" === typeof nextProp &&
                          renderExpirationTime.textContent !== "" + nextProp &&
                          (i = ["children", "" + nextProp])
                      : registrationNameModules.hasOwnProperty(textNode) &&
                        null != nextProp &&
                        ensureListeningTo(rootContainerInstance, textNode);
                  }
                switch (domElement) {
                  case "input":
                    track(renderExpirationTime);
                    postMountWrapper(renderExpirationTime, props, !0);
                    break;
                  case "textarea":
                    track(renderExpirationTime);
                    postMountWrapper$3(renderExpirationTime, props);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof props.onClick &&
                      (renderExpirationTime.onclick = noop);
                }
                textNode = i;
                current$$1.updateQueue = textNode;
                (textNode = null !== textNode ? !0 : !1) &&
                  markUpdate(current$$1);
              } else {
                domElement =
                  9 === rootContainerInstance.nodeType
                    ? rootContainerInstance
                    : rootContainerInstance.ownerDocument;
                props === Namespaces.html &&
                  (props = getIntrinsicNamespace(renderExpirationTime));
                props === Namespaces.html
                  ? "script" === renderExpirationTime
                    ? ((domElement = domElement.createElement("div")),
                      (domElement.innerHTML = "<script>\x3c/script>"),
                      (domElement = domElement.removeChild(
                        domElement.firstChild
                      )))
                    : "string" === typeof textNode.is
                      ? (domElement = domElement.createElement(
                          renderExpirationTime,
                          { is: textNode.is }
                        ))
                      : ((domElement = domElement.createElement(
                          renderExpirationTime
                        )),
                        "select" === renderExpirationTime &&
                          ((props = domElement),
                          textNode.multiple
                            ? (props.multiple = !0)
                            : textNode.size && (props.size = textNode.size)))
                  : (domElement = domElement.createElementNS(
                      props,
                      renderExpirationTime
                    ));
                domElement[internalInstanceKey] = current$$1;
                domElement[internalEventHandlersKey] = textNode;
                appendAllChildren(domElement, current$$1, !1, !1);
                var isCustomComponentTag = isCustomComponent(
                  renderExpirationTime,
                  textNode
                );
                switch (renderExpirationTime) {
                  case "iframe":
                  case "object":
                    trapBubbledEvent("load", domElement);
                    props = textNode;
                    break;
                  case "video":
                  case "audio":
                    for (props = 0; props < mediaEventTypes.length; props++)
                      trapBubbledEvent(mediaEventTypes[props], domElement);
                    props = textNode;
                    break;
                  case "source":
                    trapBubbledEvent("error", domElement);
                    props = textNode;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    trapBubbledEvent("error", domElement);
                    trapBubbledEvent("load", domElement);
                    props = textNode;
                    break;
                  case "form":
                    trapBubbledEvent("reset", domElement);
                    trapBubbledEvent("submit", domElement);
                    props = textNode;
                    break;
                  case "details":
                    trapBubbledEvent("toggle", domElement);
                    props = textNode;
                    break;
                  case "input":
                    initWrapperState(domElement, textNode);
                    props = getHostProps(domElement, textNode);
                    trapBubbledEvent("invalid", domElement);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  case "option":
                    props = getHostProps$1(domElement, textNode);
                    break;
                  case "select":
                    domElement._wrapperState = {
                      wasMultiple: !!textNode.multiple
                    };
                    props = Object.assign({}, textNode, { value: void 0 });
                    trapBubbledEvent("invalid", domElement);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  case "textarea":
                    initWrapperState$2(domElement, textNode);
                    props = getHostProps$3(domElement, textNode);
                    trapBubbledEvent("invalid", domElement);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  default:
                    props = textNode;
                }
                assertValidProps(renderExpirationTime, props);
                i = void 0;
                nextProp = renderExpirationTime;
                var domElement$jscomp$0 = domElement,
                  nextProps = props;
                for (i in nextProps)
                  if (nextProps.hasOwnProperty(i)) {
                    var nextProp$jscomp$0 = nextProps[i];
                    "style" === i
                      ? setValueForStyles(
                          domElement$jscomp$0,
                          nextProp$jscomp$0
                        )
                      : "dangerouslySetInnerHTML" === i
                        ? ((nextProp$jscomp$0 = nextProp$jscomp$0
                            ? nextProp$jscomp$0.__html
                            : void 0),
                          null != nextProp$jscomp$0 &&
                            setInnerHTML(
                              domElement$jscomp$0,
                              nextProp$jscomp$0
                            ))
                        : "children" === i
                          ? "string" === typeof nextProp$jscomp$0
                            ? ("textarea" !== nextProp ||
                                "" !== nextProp$jscomp$0) &&
                              setTextContent(
                                domElement$jscomp$0,
                                nextProp$jscomp$0
                              )
                            : "number" === typeof nextProp$jscomp$0 &&
                              setTextContent(
                                domElement$jscomp$0,
                                "" + nextProp$jscomp$0
                              )
                          : "suppressContentEditableWarning" !== i &&
                            "suppressHydrationWarning" !== i &&
                            "autoFocus" !== i &&
                            (registrationNameModules.hasOwnProperty(i)
                              ? null != nextProp$jscomp$0 &&
                                ensureListeningTo(rootContainerInstance, i)
                              : null != nextProp$jscomp$0 &&
                                setValueForProperty(
                                  domElement$jscomp$0,
                                  i,
                                  nextProp$jscomp$0,
                                  isCustomComponentTag
                                ));
                  }
                switch (renderExpirationTime) {
                  case "input":
                    track(domElement);
                    postMountWrapper(domElement, textNode, !1);
                    break;
                  case "textarea":
                    track(domElement);
                    postMountWrapper$3(domElement, textNode);
                    break;
                  case "option":
                    null != textNode.value &&
                      domElement.setAttribute(
                        "value",
                        "" + getToStringValue(textNode.value)
                      );
                    break;
                  case "select":
                    rootContainerInstance = domElement;
                    props = textNode;
                    rootContainerInstance.multiple = !!props.multiple;
                    i = props.value;
                    null != i
                      ? updateOptions(
                          rootContainerInstance,
                          !!props.multiple,
                          i,
                          !1
                        )
                      : null != props.defaultValue &&
                        updateOptions(
                          rootContainerInstance,
                          !!props.multiple,
                          props.defaultValue,
                          !0
                        );
                    break;
                  default:
                    "function" === typeof props.onClick &&
                      (domElement.onclick = noop);
                }
                (textNode = shouldAutoFocusHostComponent(
                  renderExpirationTime,
                  textNode
                )) && markUpdate(current$$1);
                current$$1.stateNode = domElement;
              }
              null !== current$$1.ref && (current$$1.effectTag |= 128);
            } else if (null === current$$1.stateNode) throw ReactErrorProd(166);
            break;
          case 6:
            if (domElement && null != current$$1.stateNode)
              updateHostText$1(
                domElement,
                current$$1,
                domElement.memoizedProps,
                textNode
              );
            else {
              if ("string" !== typeof textNode && null === current$$1.stateNode)
                throw ReactErrorProd(166);
              renderExpirationTime = requiredContext(
                rootInstanceStackCursor.current
              );
              requiredContext(contextStackCursor$1.current);
              popHydrationState(current$$1)
                ? ((textNode = current$$1.stateNode),
                  (renderExpirationTime = current$$1.memoizedProps),
                  (textNode[internalInstanceKey] = current$$1),
                  textNode.nodeValue !== renderExpirationTime &&
                    markUpdate(current$$1))
                : ((textNode = (9 === renderExpirationTime.nodeType
                    ? renderExpirationTime
                    : renderExpirationTime.ownerDocument
                  ).createTextNode(textNode)),
                  (textNode[internalInstanceKey] = current$$1),
                  (current$$1.stateNode = textNode));
            }
            break;
          case 11:
            break;
          case 13:
            textNode = current$$1.memoizedState;
            if (0 !== (current$$1.effectTag & 64)) {
              current$$1.expirationTime = renderExpirationTime;
              break a;
            }
            textNode = null !== textNode;
            renderExpirationTime =
              null !== domElement && null !== domElement.memoizedState;
            null === domElement
              ? popHydrationState(current$$1)
              : !textNode &&
                renderExpirationTime &&
                ((rootContainerInstance = domElement.child.sibling),
                null !== rootContainerInstance &&
                  ((domElement = current$$1.firstEffect),
                  null !== domElement
                    ? ((current$$1.firstEffect = rootContainerInstance),
                      (rootContainerInstance.nextEffect = domElement))
                    : ((current$$1.firstEffect = current$$1.lastEffect = rootContainerInstance),
                      (rootContainerInstance.nextEffect = null)),
                  (rootContainerInstance.effectTag = 8)));
            if (textNode || renderExpirationTime) current$$1.effectTag |= 4;
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
            if (null === domElement) {
              if (!popHydrationState(current$$1)) throw ReactErrorProd(318);
              current$$1 = current$$1.stateNode;
              if (!current$$1) throw ReactErrorProd(317);
              b: {
                current$$1 = current$$1.nextSibling;
                for (textNode = 0; current$$1; ) {
                  if (8 === current$$1.nodeType)
                    if (
                      ((renderExpirationTime = current$$1.data),
                      "/$" === renderExpirationTime)
                    ) {
                      if (0 === textNode) {
                        nextHydratableInstance = getNextHydratableSibling(
                          current$$1
                        );
                        break b;
                      }
                      textNode--;
                    } else "$" === renderExpirationTime && textNode++;
                  current$$1 = current$$1.nextSibling;
                }
                nextHydratableInstance = null;
              }
            } else
              0 === (current$$1.effectTag & 64) &&
                ((domElement.alternate = null),
                (current$$1.alternate = null),
                (current$$1.tag = 13),
                (current$$1.memoizedState = null),
                (current$$1.stateNode = null));
            break;
          case 19:
            popHostContext(current$$1);
            renderExpirationTime = requiredContext(
              rootInstanceStackCursor.current
            );
            rootContainerInstance = current$$1.type.responder;
            current$$1.stateNode.props = textNode;
            current$$1.stateNode.rootInstance = renderExpirationTime;
            listenToEventResponderEventTypes(
              rootContainerInstance.targetEventTypes,
              renderExpirationTime.ownerDocument
            );
            break;
          case 20:
            popHostContext(current$$1);
            requiredContext(rootInstanceStackCursor.current);
            break;
          default:
            throw ReactErrorProd(156);
        }
        current$$1 = null;
      }
      stopWorkTimer(workInProgress);
      textNode = workInProgress;
      if (1 === renderExpirationTime$1 || 1 !== textNode.childExpirationTime) {
        renderExpirationTime = 0;
        for (
          rootContainerInstance = textNode.child;
          null !== rootContainerInstance;

        )
          (domElement = rootContainerInstance.expirationTime),
            (props = rootContainerInstance.childExpirationTime),
            domElement > renderExpirationTime &&
              (renderExpirationTime = domElement),
            props > renderExpirationTime && (renderExpirationTime = props),
            (rootContainerInstance = rootContainerInstance.sibling);
        textNode.childExpirationTime = renderExpirationTime;
      }
      if (null !== current$$1) return current$$1;
      null !== unitOfWork &&
        0 === (unitOfWork.effectTag & 1024) &&
        (null === unitOfWork.firstEffect &&
          (unitOfWork.firstEffect = workInProgress.firstEffect),
        null !== workInProgress.lastEffect &&
          (null !== unitOfWork.lastEffect &&
            (unitOfWork.lastEffect.nextEffect = workInProgress.firstEffect),
          (unitOfWork.lastEffect = workInProgress.lastEffect)),
        1 < workInProgress.effectTag &&
          (null !== unitOfWork.lastEffect
            ? (unitOfWork.lastEffect.nextEffect = workInProgress)
            : (unitOfWork.firstEffect = workInProgress),
          (unitOfWork.lastEffect = workInProgress)));
    } else {
      current$$1 = unwindWork(workInProgress, renderExpirationTime$1);
      if (null !== current$$1)
        return (
          (unitOfWork = workInProgress),
          enableUserTimingAPI &&
            supportsUserTiming &&
            !shouldIgnoreFiber(unitOfWork) &&
            ((currentFiber$1 = unitOfWork.return),
            unitOfWork._debugIsCurrentlyTiming &&
              ((unitOfWork._debugIsCurrentlyTiming = !1),
              endFiberMark(
                unitOfWork,
                null,
                13 === unitOfWork.tag || 18 === unitOfWork.tag
                  ? "Rendering was suspended"
                  : "An error was thrown inside this error boundary"
              ))),
          (current$$1.effectTag &= 1023),
          current$$1
        );
      stopWorkTimer(workInProgress);
      null !== unitOfWork &&
        ((unitOfWork.firstEffect = unitOfWork.lastEffect = null),
        (unitOfWork.effectTag |= 1024));
    }
    current$$1 = workInProgress.sibling;
    if (null !== current$$1) return current$$1;
    workInProgress = unitOfWork;
  } while (null !== workInProgress);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3);
  return null;
}
function commitRoot$1(root, expirationTime) {
  runWithPriority(99, commitRootImpl.bind(null, root, expirationTime));
  null !== rootWithPendingPassiveEffects$1 &&
    ((root = getCurrentPriorityLevel()),
    scheduleCallback(root, function() {
      flushPassiveEffects$2();
      return null;
    }));
  return null;
}
function commitRootImpl(root, expirationTime) {
  flushPassiveEffects$2();
  if (4 === workPhase || 5 === workPhase)
    throw ReactError("Should not already be working.");
  var finishedWork = root.current.alternate;
  if (null === finishedWork)
    throw ReactError("Should have a work-in-progress root.");
  root.callbackNode = null;
  root.callbackExpirationTime = 0;
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((isCommitting = !0),
    (hasScheduledUpdateInCurrentCommit = !1),
    labelsInCurrentCommit.clear(),
    beginMark("(Committing Changes)"));
  var updateExpirationTimeBeforeCommit = finishedWork.expirationTime,
    childExpirationTimeBeforeCommit = finishedWork.childExpirationTime;
  updateExpirationTimeBeforeCommit =
    childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit
      ? childExpirationTimeBeforeCommit
      : updateExpirationTimeBeforeCommit;
  root.firstPendingTime = updateExpirationTimeBeforeCommit;
  updateExpirationTimeBeforeCommit < root.lastPendingTime &&
    (root.lastPendingTime = updateExpirationTimeBeforeCommit);
  root === workInProgressRoot &&
    ((workInProgress = workInProgressRoot = null),
    (renderExpirationTime$1 = 0));
  1 < finishedWork.effectTag
    ? null !== finishedWork.lastEffect
      ? ((finishedWork.lastEffect.nextEffect = finishedWork),
        (childExpirationTimeBeforeCommit = finishedWork.firstEffect))
      : (childExpirationTimeBeforeCommit = finishedWork)
    : (childExpirationTimeBeforeCommit = finishedWork.firstEffect);
  if (null !== childExpirationTimeBeforeCommit) {
    updateExpirationTimeBeforeCommit = workPhase;
    workPhase = 5;
    ReactCurrentOwner$4.current = null;
    startCommitSnapshotEffectsTimer();
    eventsEnabled = _enabled;
    var focusedElem = getActiveElementDeep();
    if (hasSelectionCapabilities(focusedElem)) {
      if ("selectionStart" in focusedElem)
        var JSCompiler_temp = {
          start: focusedElem.selectionStart,
          end: focusedElem.selectionEnd
        };
      else
        a: {
          JSCompiler_temp =
            ((JSCompiler_temp = focusedElem.ownerDocument) &&
              JSCompiler_temp.defaultView) ||
            window;
          var selection =
            JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset,
              focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0,
              start = -1,
              end = -1,
              indexWithinAnchor = 0,
              indexWithinFocus = 0,
              node = focusedElem,
              parentNode = null;
            b: for (;;) {
              for (var next; ; ) {
                node !== JSCompiler_temp ||
                  (0 !== anchorOffset && 3 !== node.nodeType) ||
                  (start = length + anchorOffset);
                node !== focusNode ||
                  (0 !== selection && 3 !== node.nodeType) ||
                  (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (;;) {
                if (node === focusedElem) break b;
                parentNode === JSCompiler_temp &&
                  ++indexWithinAnchor === anchorOffset &&
                  (start = length);
                parentNode === focusNode &&
                  ++indexWithinFocus === selection &&
                  (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp =
              -1 === start || -1 === end ? null : { start: start, end: end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
    } else JSCompiler_temp = null;
    selectionInformation = {
      focusedElem: focusedElem,
      selectionRange: JSCompiler_temp
    };
    _enabled = !1;
    nextEffect$1 = childExpirationTimeBeforeCommit;
    do
      try {
        for (; null !== nextEffect$1; ) {
          if (0 !== (nextEffect$1.effectTag & 256)) {
            enableUserTimingAPI && effectCountInCurrentCommit++;
            var current$$1 = nextEffect$1.alternate;
            focusedElem = nextEffect$1;
            switch (focusedElem.tag) {
              case 0:
              case 11:
              case 15:
                commitHookEffectList(2, 0, focusedElem);
                break;
              case 1:
                if (focusedElem.effectTag & 256 && null !== current$$1) {
                  var prevProps = current$$1.memoizedProps,
                    prevState = current$$1.memoizedState;
                  startPhaseTimer(focusedElem, "getSnapshotBeforeUpdate");
                  var instance = focusedElem.stateNode,
                    snapshot = instance.getSnapshotBeforeUpdate(
                      focusedElem.elementType === focusedElem.type
                        ? prevProps
                        : resolveDefaultProps(focusedElem.type, prevProps),
                      prevState
                    );
                  instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                  stopPhaseTimer();
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
          nextEffect$1 = nextEffect$1.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect$1)
          throw ReactError("Should be working on an effect.");
        captureCommitPhaseError$2(nextEffect$1, error);
        nextEffect$1 = nextEffect$1.nextEffect;
      }
    while (null !== nextEffect$1);
    stopCommitSnapshotEffectsTimer();
    startCommitHostEffectsTimer();
    nextEffect$1 = childExpirationTimeBeforeCommit;
    do
      try {
        for (; null !== nextEffect$1; ) {
          var effectTag = nextEffect$1.effectTag;
          effectTag & 16 && setTextContent(nextEffect$1.stateNode, "");
          if (effectTag & 128) {
            var current$$1$jscomp$0 = nextEffect$1.alternate;
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
              commitPlacement(nextEffect$1);
              nextEffect$1.effectTag &= -3;
              break;
            case 6:
              commitPlacement(nextEffect$1);
              nextEffect$1.effectTag &= -3;
              commitWork(nextEffect$1.alternate, nextEffect$1);
              break;
            case 4:
              commitWork(nextEffect$1.alternate, nextEffect$1);
              break;
            case 8:
              current$$1 = nextEffect$1;
              unmountHostComponents(current$$1);
              current$$1.return = null;
              current$$1.child = null;
              current$$1.memoizedState = null;
              current$$1.updateQueue = null;
              var alternate = current$$1.alternate;
              null !== alternate &&
                ((alternate.return = null),
                (alternate.child = null),
                (alternate.memoizedState = null),
                (alternate.updateQueue = null));
          }
          enableUserTimingAPI && effectCountInCurrentCommit++;
          nextEffect$1 = nextEffect$1.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect$1)
          throw ReactError("Should be working on an effect.");
        captureCommitPhaseError$2(nextEffect$1, error);
        nextEffect$1 = nextEffect$1.nextEffect;
      }
    while (null !== nextEffect$1);
    stopCommitHostEffectsTimer();
    currentRef = selectionInformation;
    current$$1$jscomp$0 = getActiveElementDeep();
    effectTag = currentRef.focusedElem;
    current$$1 = currentRef.selectionRange;
    if (
      current$$1$jscomp$0 !== effectTag &&
      effectTag &&
      effectTag.ownerDocument &&
      containsNode(effectTag.ownerDocument.documentElement, effectTag)
    ) {
      null !== current$$1 &&
        hasSelectionCapabilities(effectTag) &&
        ((current$$1$jscomp$0 = current$$1.start),
        (currentRef = current$$1.end),
        void 0 === currentRef && (currentRef = current$$1$jscomp$0),
        "selectionStart" in effectTag
          ? ((effectTag.selectionStart = current$$1$jscomp$0),
            (effectTag.selectionEnd = Math.min(
              currentRef,
              effectTag.value.length
            )))
          : ((currentRef =
              ((current$$1$jscomp$0 = effectTag.ownerDocument || document) &&
                current$$1$jscomp$0.defaultView) ||
              window),
            currentRef.getSelection &&
              ((currentRef = currentRef.getSelection()),
              (prevProps = effectTag.textContent.length),
              (alternate = Math.min(current$$1.start, prevProps)),
              (current$$1 =
                void 0 === current$$1.end
                  ? alternate
                  : Math.min(current$$1.end, prevProps)),
              !currentRef.extend &&
                alternate > current$$1 &&
                ((prevProps = current$$1),
                (current$$1 = alternate),
                (alternate = prevProps)),
              (prevProps = getNodeForCharacterOffset(effectTag, alternate)),
              (prevState = getNodeForCharacterOffset(effectTag, current$$1)),
              prevProps &&
                prevState &&
                (1 !== currentRef.rangeCount ||
                  currentRef.anchorNode !== prevProps.node ||
                  currentRef.anchorOffset !== prevProps.offset ||
                  currentRef.focusNode !== prevState.node ||
                  currentRef.focusOffset !== prevState.offset) &&
                ((current$$1$jscomp$0 = current$$1$jscomp$0.createRange()),
                current$$1$jscomp$0.setStart(prevProps.node, prevProps.offset),
                currentRef.removeAllRanges(),
                alternate > current$$1
                  ? (currentRef.addRange(current$$1$jscomp$0),
                    currentRef.extend(prevState.node, prevState.offset))
                  : (current$$1$jscomp$0.setEnd(
                      prevState.node,
                      prevState.offset
                    ),
                    currentRef.addRange(current$$1$jscomp$0))))));
      current$$1$jscomp$0 = [];
      for (currentRef = effectTag; (currentRef = currentRef.parentNode); )
        1 === currentRef.nodeType &&
          current$$1$jscomp$0.push({
            element: currentRef,
            left: currentRef.scrollLeft,
            top: currentRef.scrollTop
          });
      "function" === typeof effectTag.focus && effectTag.focus();
      for (effectTag = 0; effectTag < current$$1$jscomp$0.length; effectTag++)
        (currentRef = current$$1$jscomp$0[effectTag]),
          (currentRef.element.scrollLeft = currentRef.left),
          (currentRef.element.scrollTop = currentRef.top);
    }
    selectionInformation = null;
    _enabled = !!eventsEnabled;
    eventsEnabled = null;
    root.current = finishedWork;
    startCommitLifeCyclesTimer();
    nextEffect$1 = childExpirationTimeBeforeCommit;
    do
      try {
        for (
          childExpirationTimeBeforeCommit = expirationTime;
          null !== nextEffect$1;

        ) {
          var effectTag$jscomp$0 = nextEffect$1.effectTag;
          if (effectTag$jscomp$0 & 36) {
            enableUserTimingAPI && effectCountInCurrentCommit++;
            var current$$1$jscomp$1 = nextEffect$1.alternate;
            effectTag = nextEffect$1;
            current$$1$jscomp$0 = childExpirationTimeBeforeCommit;
            switch (effectTag.tag) {
              case 0:
              case 11:
              case 15:
                commitHookEffectList(16, 32, effectTag);
                break;
              case 1:
                var instance$jscomp$0 = effectTag.stateNode;
                if (effectTag.effectTag & 4) {
                  if (null === current$$1$jscomp$1)
                    startPhaseTimer(effectTag, "componentDidMount"),
                      instance$jscomp$0.componentDidMount();
                  else {
                    var prevProps$jscomp$0 =
                        effectTag.elementType === effectTag.type
                          ? current$$1$jscomp$1.memoizedProps
                          : resolveDefaultProps(
                              effectTag.type,
                              current$$1$jscomp$1.memoizedProps
                            ),
                      prevState$jscomp$0 = current$$1$jscomp$1.memoizedState;
                    startPhaseTimer(effectTag, "componentDidUpdate");
                    instance$jscomp$0.componentDidUpdate(
                      prevProps$jscomp$0,
                      prevState$jscomp$0,
                      instance$jscomp$0.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                  stopPhaseTimer();
                }
                var updateQueue = effectTag.updateQueue;
                null !== updateQueue &&
                  commitUpdateQueue(
                    effectTag,
                    updateQueue,
                    instance$jscomp$0,
                    current$$1$jscomp$0
                  );
                break;
              case 3:
                var _updateQueue = effectTag.updateQueue;
                if (null !== _updateQueue) {
                  currentRef = null;
                  if (null !== effectTag.child)
                    switch (effectTag.child.tag) {
                      case 5:
                        currentRef = effectTag.child.stateNode;
                        break;
                      case 1:
                        currentRef = effectTag.child.stateNode;
                    }
                  commitUpdateQueue(
                    effectTag,
                    _updateQueue,
                    currentRef,
                    current$$1$jscomp$0
                  );
                }
                break;
              case 5:
                var _instance2 = effectTag.stateNode;
                null === current$$1$jscomp$1 &&
                  effectTag.effectTag & 4 &&
                  shouldAutoFocusHostComponent(
                    effectTag.type,
                    effectTag.memoizedProps
                  ) &&
                  _instance2.focus();
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
            enableUserTimingAPI && effectCountInCurrentCommit++;
            effectTag = void 0;
            var ref = nextEffect$1.ref;
            if (null !== ref) {
              var instance$jscomp$1 = nextEffect$1.stateNode;
              switch (nextEffect$1.tag) {
                case 5:
                  effectTag = instance$jscomp$1;
                  break;
                default:
                  effectTag = instance$jscomp$1;
              }
              "function" === typeof ref
                ? ref(effectTag)
                : (ref.current = effectTag);
            }
          }
          effectTag$jscomp$0 & 512 && (rootDoesHavePassiveEffects = !0);
          nextEffect$1 = nextEffect$1.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect$1)
          throw ReactError("Should be working on an effect.");
        captureCommitPhaseError$2(nextEffect$1, error);
        nextEffect$1 = nextEffect$1.nextEffect;
      }
    while (null !== nextEffect$1);
    stopCommitLifeCyclesTimer();
    nextEffect$1 = null;
    workPhase = updateExpirationTimeBeforeCommit;
  } else
    (root.current = finishedWork),
      startCommitSnapshotEffectsTimer(),
      stopCommitSnapshotEffectsTimer(),
      startCommitHostEffectsTimer(),
      stopCommitHostEffectsTimer(),
      startCommitLifeCyclesTimer(),
      stopCommitLifeCyclesTimer();
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((expirationTime = null),
    hasScheduledUpdateInCurrentCommit
      ? (expirationTime = "Lifecycle hook scheduled a cascading update")
      : 0 < commitCountInCurrentWorkLoop &&
        (expirationTime = "Caused by a cascading update in earlier commit"),
    (hasScheduledUpdateInCurrentCommit = !1),
    commitCountInCurrentWorkLoop++,
    (isCommitting = !1),
    labelsInCurrentCommit.clear(),
    endMark("(Committing Changes)", "(Committing Changes)", expirationTime));
  rootDoesHavePassiveEffects &&
    ((rootDoesHavePassiveEffects = !1),
    (rootWithPendingPassiveEffects$1 = root));
  expirationTime = root.firstPendingTime;
  0 !== expirationTime
    ? ((effectTag$jscomp$0 = requestCurrentTime$2()),
      (effectTag$jscomp$0 = inferPriorityFromExpirationTime(
        effectTag$jscomp$0,
        expirationTime
      )),
      scheduleCallbackForRoot(root, effectTag$jscomp$0, expirationTime))
    : (legacyErrorBoundariesThatAlreadyFailed$1 = null);
  "function" === typeof onCommitFiberRoot &&
    onCommitFiberRoot(finishedWork.stateNode);
  1073741823 === expirationTime
    ? root === rootWithNestedUpdates
      ? nestedUpdateCount$1++
      : ((nestedUpdateCount$1 = 0), (rootWithNestedUpdates = root))
    : (nestedUpdateCount$1 = 0);
  if (hasUncaughtError)
    throw ((hasUncaughtError = !1),
    (root = firstUncaughtError),
    (firstUncaughtError = null),
    root);
  if (2 === workPhase) return null;
  flushImmediateQueue();
  return null;
}
function flushPassiveEffects$2() {
  if (null === rootWithPendingPassiveEffects$1) return !1;
  var root = rootWithPendingPassiveEffects$1;
  rootWithPendingPassiveEffects$1 = null;
  if (4 === workPhase || 5 === workPhase)
    throw ReactError("Cannot flush passive effects while already rendering.");
  var prevWorkPhase = workPhase;
  workPhase = 5;
  for (root = root.current.firstEffect; null !== root; ) {
    try {
      var finishedWork = root;
      commitHookEffectList(128, 0, finishedWork);
      commitHookEffectList(0, 64, finishedWork);
    } catch (error) {
      if (null === root) throw ReactError("Should be working on an effect.");
      captureCommitPhaseError$2(root, error);
    }
    root = root.nextEffect;
  }
  workPhase = prevWorkPhase;
  flushImmediateQueue();
  return !0;
}
function isAlreadyFailedLegacyErrorBoundary$2(instance) {
  return (
    null !== legacyErrorBoundariesThatAlreadyFailed$1 &&
    legacyErrorBoundariesThatAlreadyFailed$1.has(instance)
  );
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
  enqueueUpdate(rootFiber, sourceFiber);
  rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
  null !== rootFiber && scheduleCallbackForRoot(rootFiber, 99, 1073741823);
}
function captureCommitPhaseError$2(sourceFiber, error) {
  if (3 === sourceFiber.tag)
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (var fiber = sourceFiber.return; null !== fiber; ) {
      if (3 === fiber.tag) {
        captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
        break;
      } else if (1 === fiber.tag) {
        var instance = fiber.stateNode;
        if (
          "function" === typeof fiber.type.getDerivedStateFromError ||
          ("function" === typeof instance.componentDidCatch &&
            !isAlreadyFailedLegacyErrorBoundary$2(instance))
        ) {
          sourceFiber = createCapturedValue(error, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          fiber = markUpdateTimeFromFiberToRoot(fiber, 1073741823);
          null !== fiber && scheduleCallbackForRoot(fiber, 99, 1073741823);
          break;
        }
      }
      fiber = fiber.return;
    }
}
function retryTimedOutBoundary$2(boundaryFiber) {
  var currentTime = requestCurrentTime$2(),
    retryTime = computeExpirationForFiber$2(currentTime, boundaryFiber);
  currentTime = inferPriorityFromExpirationTime(currentTime, retryTime);
  boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
  null !== boundaryFiber &&
    scheduleCallbackForRoot(boundaryFiber, currentTime, retryTime);
}
var beginWork$1 = void 0;
beginWork$1 = function(current$$1, workInProgress, renderExpirationTime) {
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
            resetHydrationState();
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
            pushHostContextForEventTarget(workInProgress);
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
      cancelWorkTimer(workInProgress);
      context = readLazyComponentType(context);
      workInProgress.type = context;
      hasContext = workInProgress.tag = resolveLazyComponentTag(context);
      startWorkTimer(workInProgress);
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
      if (updateExpirationTime === context)
        resetHydrationState(),
          (workInProgress = bailoutOnAlreadyFinishedWork(
            current$$1,
            workInProgress,
            renderExpirationTime
          ));
      else {
        context = workInProgress.stateNode;
        if (
          (context =
            (null === current$$1 || null === current$$1.child) &&
            context.hydrate)
        )
          (nextHydratableInstance = getFirstHydratableChild(
            workInProgress.stateNode.containerInfo
          )),
            (hydrationParentFiber = workInProgress),
            (context = isHydrating = !0);
        context
          ? ((workInProgress.effectTag |= 2),
            (workInProgress.child = mountChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            )))
          : (reconcileChildren(
              current$$1,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
            resetHydrationState());
        workInProgress = workInProgress.child;
      }
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
        1 !== renderExpirationTime && workInProgress.mode & 1 && context.hidden
          ? ((workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
            (workInProgress = null))
          : (reconcileChildren(
              current$$1,
              workInProgress,
              getDerivedStateFromProps,
              renderExpirationTime
            ),
            (workInProgress = workInProgress.child)),
        workInProgress
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
      getDerivedStateFromProps = workInProgress.pendingProps;
      workInProgress.type.type === REACT_EVENT_TARGET_TOUCH_HIT
        ? ((updateExpirationTime = getDerivedStateFromProps.bottom),
          (context = getDerivedStateFromProps.left),
          (hasContext = getDerivedStateFromProps.right),
          (getDerivedStateFromProps = getDerivedStateFromProps.top),
          (updateExpirationTime =
            updateExpirationTime ||
            context ||
            hasContext ||
            getDerivedStateFromProps
              ? {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      zIndex: -1,
                      bottom: updateExpirationTime
                        ? "-" + updateExpirationTime + "px"
                        : "0px",
                      left: context ? "-" + context + "px" : "0px",
                      right: hasContext ? "-" + hasContext + "px" : "0px",
                      top: getDerivedStateFromProps
                        ? "-" + getDerivedStateFromProps + "px"
                        : "0px"
                    }
                  }
                }
              : null))
        : (updateExpirationTime = null);
      if (null !== updateExpirationTime) {
        if (
          ((renderExpirationTime = workInProgress.child = createFiberFromTypeAndProps(
            updateExpirationTime.type,
            null,
            updateExpirationTime.props,
            null,
            workInProgress.mode,
            renderExpirationTime
          )),
          (renderExpirationTime.return = workInProgress),
          null === current$$1 || null === current$$1.child)
        )
          renderExpirationTime.effectTag = 2;
      } else
        reconcileChildren(
          current$$1,
          workInProgress,
          null,
          renderExpirationTime
        );
      pushHostContextForEventTarget(workInProgress);
      return workInProgress.child;
  }
  throw ReactErrorProd(156);
};
var requestCurrentTime$$1 = requestCurrentTime$2,
  computeExpirationForFiber$$1 = computeExpirationForFiber$2,
  captureCommitPhaseError$$1 = captureCommitPhaseError$2;
function pingSuspendedRoot$$1(root, thenable, suspendedTime) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(thenable);
  workInProgressRoot === root && renderExpirationTime$1 === suspendedTime
    ? prepareFreshStack(root, renderExpirationTime$1)
    : root.lastPendingTime < suspendedTime ||
      ((thenable = root.pingTime),
      (0 !== thenable && thenable < suspendedTime) ||
        ((root.pingTime = suspendedTime),
        (thenable = requestCurrentTime$2()),
        (thenable = inferPriorityFromExpirationTime(thenable, suspendedTime)),
        scheduleCallbackForRoot(root, thenable, suspendedTime)));
}
var retryTimedOutBoundary$$1 = retryTimedOutBoundary$2;
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
  retryTimedOutBoundary$2(boundaryFiber);
}
var isAlreadyFailedLegacyErrorBoundary$$1 = isAlreadyFailedLegacyErrorBoundary$2;
function scheduleWork$$1(fiber, expirationTime) {
  if (50 < nestedUpdateCount$1)
    throw ((nestedUpdateCount$1 = 0),
    (rootWithNestedUpdates = null),
    ReactErrorProd(185));
  var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (null !== root)
    if (
      ((root.pingTime = 0),
      enableUserTimingAPI &&
        null !== workInProgressRoot &&
        expirationTime > renderExpirationTime$1 &&
        (interruptedBy$1 = fiber),
      enableUserTimingAPI &&
        (isCommitting && (hasScheduledUpdateInCurrentCommit = !0),
        null !== currentPhase &&
          "componentWillMount" !== currentPhase &&
          "componentWillReceiveProps" !== currentPhase &&
          (hasScheduledUpdateInCurrentPhase = !0)),
      1073741823 === expirationTime)
    )
      if (2 === workPhase)
        for (
          expirationTime = renderRoot$1(root, 1073741823, !0);
          null !== expirationTime;

        )
          expirationTime = expirationTime(!0);
      else
        scheduleCallbackForRoot(root, 99, 1073741823),
          0 === workPhase && flushImmediateQueue();
    else {
      fiber = getCurrentPriorityLevel();
      if (98 === fiber)
        if (null === rootsWithPendingDiscreteUpdates)
          rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]);
        else {
          var lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);
          (void 0 === lastDiscreteTime || lastDiscreteTime > expirationTime) &&
            rootsWithPendingDiscreteUpdates.set(root, expirationTime);
        }
      scheduleCallbackForRoot(root, fiber, expirationTime);
    }
}
function batchedUpdates$1(fn, a) {
  if (0 !== workPhase) return fn(a);
  workPhase = 1;
  try {
    return fn(a);
  } finally {
    (workPhase = 0), flushImmediateQueue();
  }
}
function unbatchedUpdates$$1(fn, a) {
  if (1 !== workPhase && 3 !== workPhase) return fn(a);
  var prevWorkPhase = workPhase;
  workPhase = 2;
  try {
    return fn(a);
  } finally {
    workPhase = prevWorkPhase;
  }
}
function interactiveUpdates$1(fn, a, b, c) {
  0 === workPhase && flushPendingDiscreteUpdates();
  return runWithPriority(98, fn.bind(null, a, b, c));
}
var flushPassiveEffects$$1 = flushPassiveEffects$2;
function updateContainerAtExpirationTime(
  element,
  container,
  parentComponent,
  expirationTime,
  callback
) {
  var current$$1 = container.current;
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
  callback = createUpdate(expirationTime);
  callback.payload = { element: element };
  container = void 0 === container ? null : container;
  null !== container && (callback.callback = container);
  flushPassiveEffects$$1();
  enqueueUpdate(current$$1, callback);
  scheduleWork$$1(current$$1, expirationTime);
  return expirationTime;
}
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current,
    currentTime = requestCurrentTime$$1();
  current$$1 = computeExpirationForFiber$$1(currentTime, current$$1);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    current$$1,
    callback
  );
}
function getPublicRootInstance(container) {
  container = container.current;
  if (!container.child) return null;
  switch (container.child.tag) {
    case 5:
      return container.child.stateNode;
    default:
      return container.child.stateNode;
  }
}
function createPortal$1(children, containerInfo, implementation) {
  var key =
    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
var didWarnAboutUnstableCreatePortal = !1;
restoreImpl = function(domElement, tag, props) {
  switch (tag) {
    case "input":
      updateWrapper(domElement, props);
      tag = props.name;
      if ("radio" === props.type && null != tag) {
        for (props = domElement; props.parentNode; ) props = props.parentNode;
        props = props.querySelectorAll(
          "input[name=" + JSON.stringify("" + tag) + '][type="radio"]'
        );
        for (tag = 0; tag < props.length; tag++) {
          var otherNode = props[tag];
          if (otherNode !== domElement && otherNode.form === domElement.form) {
            var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
            if (!otherProps) throw ReactErrorProd(90);
            updateValueIfChanged(otherNode);
            updateWrapper(otherNode, otherProps);
          }
        }
      }
      break;
    case "textarea":
      updateWrapper$1(domElement, props);
      break;
    case "select":
      (tag = props.value),
        null != tag && updateOptions(domElement, !!props.multiple, tag, !1);
  }
};
function ReactBatch(root) {
  var currentTime = requestCurrentTime$2();
  currentTime = computeExpirationBucket(currentTime, 5e3, 250);
  currentTime <= lastUniqueAsyncExpiration$1 && --currentTime;
  this._expirationTime = lastUniqueAsyncExpiration$1 = currentTime;
  this._root = root;
  this._callbacks = this._next = null;
  this._hasChildren = this._didComplete = !1;
  this._children = null;
  this._defer = !0;
}
ReactBatch.prototype.render = function(children) {
  if (!this._defer) throw ReactErrorProd(250);
  this._hasChildren = !0;
  this._children = children;
  var internalRoot = this._root._internalRoot,
    expirationTime = this._expirationTime,
    work = new ReactWork();
  updateContainerAtExpirationTime(
    children,
    internalRoot,
    null,
    expirationTime,
    work._onCommit
  );
  return work;
};
ReactBatch.prototype.then = function(onComplete) {
  if (this._didComplete) onComplete();
  else {
    var callbacks = this._callbacks;
    null === callbacks && (callbacks = this._callbacks = []);
    callbacks.push(onComplete);
  }
};
ReactBatch.prototype.commit = function() {
  var internalRoot = this._root._internalRoot,
    firstBatch = internalRoot.firstBatch;
  if (!this._defer || null === firstBatch) throw ReactErrorProd(251);
  if (this._hasChildren) {
    var expirationTime = this._expirationTime;
    if (firstBatch !== this) {
      this._hasChildren &&
        ((expirationTime = this._expirationTime = firstBatch._expirationTime),
        this.render(this._children));
      for (var previous = null, batch = firstBatch; batch !== this; )
        (previous = batch), (batch = batch._next);
      if (null === previous) throw ReactErrorProd(251);
      previous._next = batch._next;
      this._next = firstBatch;
      internalRoot.firstBatch = this;
    }
    this._defer = !1;
    firstBatch = expirationTime;
    if (4 === workPhase || 5 === workPhase) throw ReactErrorProd(253);
    scheduleCallback(99, renderRoot$1.bind(null, internalRoot, firstBatch));
    flushImmediateQueue();
    firstBatch = this._next;
    this._next = null;
    firstBatch = internalRoot.firstBatch = firstBatch;
    null !== firstBatch &&
      firstBatch._hasChildren &&
      firstBatch.render(firstBatch._children);
  } else (this._next = null), (this._defer = !1);
};
ReactBatch.prototype._onComplete = function() {
  if (!this._didComplete) {
    this._didComplete = !0;
    var callbacks = this._callbacks;
    if (null !== callbacks)
      for (var i = 0; i < callbacks.length; i++) (0, callbacks[i])();
  }
};
function ReactWork() {
  this._callbacks = null;
  this._didCommit = !1;
  this._onCommit = this._onCommit.bind(this);
}
ReactWork.prototype.then = function(onCommit) {
  if (this._didCommit) onCommit();
  else {
    var callbacks = this._callbacks;
    null === callbacks && (callbacks = this._callbacks = []);
    callbacks.push(onCommit);
  }
};
ReactWork.prototype._onCommit = function() {
  if (!this._didCommit) {
    this._didCommit = !0;
    var callbacks = this._callbacks;
    if (null !== callbacks)
      for (var i = 0; i < callbacks.length; i++) {
        var _callback2 = callbacks[i];
        if ("function" !== typeof _callback2)
          throw ReactErrorProd(191, _callback2);
        _callback2();
      }
  }
};
function ReactRoot(container, isConcurrent, hydrate) {
  container = new FiberRootNode(container, hydrate);
  isConcurrent = createFiber(3, null, null, isConcurrent ? 3 : 0);
  container.current = isConcurrent;
  this._internalRoot = isConcurrent.stateNode = container;
}
ReactRoot.prototype.render = function(children, callback) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(children, root, null, work._onCommit);
  return work;
};
ReactRoot.prototype.unmount = function(callback) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(null, root, null, work._onCommit);
  return work;
};
ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function(
  parentComponent,
  children,
  callback
) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(children, root, parentComponent, work._onCommit);
  return work;
};
ReactRoot.prototype.createBatch = function() {
  var batch = new ReactBatch(this),
    expirationTime = batch._expirationTime,
    internalRoot = this._internalRoot,
    firstBatch = internalRoot.firstBatch;
  if (null === firstBatch)
    (internalRoot.firstBatch = batch), (batch._next = null);
  else {
    for (
      internalRoot = null;
      null !== firstBatch && firstBatch._expirationTime >= expirationTime;

    )
      (internalRoot = firstBatch), (firstBatch = firstBatch._next);
    batch._next = firstBatch;
    null !== internalRoot && (internalRoot._next = batch);
  }
  return batch;
};
function isValidContainer(node) {
  return !(
    !node ||
    (1 !== node.nodeType &&
      9 !== node.nodeType &&
      11 !== node.nodeType &&
      (8 !== node.nodeType ||
        " react-mount-point-unstable " !== node.nodeValue))
  );
}
_batchedUpdatesImpl = batchedUpdates$1;
_interactiveUpdatesImpl = interactiveUpdates$1;
_flushInteractiveUpdatesImpl = function() {
  4 !== workPhase && 5 !== workPhase && flushPendingDiscreteUpdates();
};
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  forceHydrate ||
    ((forceHydrate = container
      ? 9 === container.nodeType
        ? container.documentElement
        : container.firstChild
      : null),
    (forceHydrate = !(
      !forceHydrate ||
      1 !== forceHydrate.nodeType ||
      !forceHydrate.hasAttribute("data-reactroot")
    )));
  if (!forceHydrate)
    for (var rootSibling; (rootSibling = container.lastChild); )
      container.removeChild(rootSibling);
  return new ReactRoot(container, !1, forceHydrate);
}
function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  var root = container._reactRootContainer;
  if (root) {
    if ("function" === typeof callback) {
      var _originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(root._internalRoot);
        _originalCallback.call(instance);
      };
    }
    null != parentComponent
      ? root.legacy_renderSubtreeIntoContainer(
          parentComponent,
          children,
          callback
        )
      : root.render(children, callback);
  } else {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
    if ("function" === typeof callback) {
      var originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    unbatchedUpdates$$1(function() {
      null != parentComponent
        ? root.legacy_renderSubtreeIntoContainer(
            parentComponent,
            children,
            callback
          )
        : root.render(children, callback);
    });
  }
  return getPublicRootInstance(root._internalRoot);
}
function createPortal$$1(children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw ReactErrorProd(200);
  return createPortal$1(children, container, null, key);
}
var ReactDOM$1 = {
  createPortal: createPortal$$1,
  findDOMNode: function(componentOrElement) {
    if (null == componentOrElement) componentOrElement = null;
    else if (1 !== componentOrElement.nodeType) {
      var fiber = componentOrElement._reactInternalFiber;
      if (void 0 === fiber) {
        if ("function" === typeof componentOrElement.render)
          throw ReactErrorProd(188);
        throw ReactErrorProd(268, Object.keys(componentOrElement));
      }
      componentOrElement = findCurrentHostFiber(fiber);
      componentOrElement =
        null === componentOrElement ? null : componentOrElement.stateNode;
    }
    return componentOrElement;
  },
  hydrate: function(element, container, callback) {
    if (!isValidContainer(container)) throw ReactErrorProd(200);
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !0,
      callback
    );
  },
  render: function(element, container, callback) {
    if (!isValidContainer(container)) throw ReactErrorProd(200);
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !1,
      callback
    );
  },
  unstable_renderSubtreeIntoContainer: function(
    parentComponent,
    element,
    containerNode,
    callback
  ) {
    if (!isValidContainer(containerNode)) throw ReactErrorProd(200);
    if (
      null == parentComponent ||
      void 0 === parentComponent._reactInternalFiber
    )
      throw ReactErrorProd(38);
    return legacyRenderSubtreeIntoContainer(
      parentComponent,
      element,
      containerNode,
      !1,
      callback
    );
  },
  unmountComponentAtNode: function(container) {
    if (!isValidContainer(container)) throw ReactErrorProd(40);
    return container._reactRootContainer
      ? (unbatchedUpdates$$1(function() {
          legacyRenderSubtreeIntoContainer(
            null,
            null,
            container,
            !1,
            function() {
              container._reactRootContainer = null;
            }
          );
        }),
        !0)
      : !1;
  },
  unstable_createPortal: function() {
    didWarnAboutUnstableCreatePortal ||
      ((didWarnAboutUnstableCreatePortal = !0),
      lowPriorityWarning(
        !1,
        'The ReactDOM.unstable_createPortal() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactDOM.createPortal() instead. It has the exact same API, but without the "unstable_" prefix.'
      ));
    return createPortal$$1.apply(void 0, arguments);
  },
  unstable_batchedUpdates: batchedUpdates$1,
  unstable_interactiveUpdates: interactiveUpdates$1,
  flushSync: function(fn, a) {
    if (4 === workPhase || 5 === workPhase) throw ReactErrorProd(187);
    var prevWorkPhase = workPhase;
    workPhase = 3;
    try {
      return runWithPriority(99, fn.bind(null, a));
    } finally {
      (workPhase = prevWorkPhase), flushImmediateQueue();
    }
  },
  unstable_createRoot: createRoot,
  unstable_flushControlled: function(fn) {
    var prevWorkPhase = workPhase;
    workPhase = 1;
    try {
      runWithPriority(99, fn);
    } finally {
      (workPhase = prevWorkPhase), 0 === workPhase && flushImmediateQueue();
    }
  },
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [
      getInstanceFromNode$1,
      getNodeFromInstance$1,
      getFiberCurrentPropsFromNode$1,
      injection.injectEventPluginsByName,
      eventNameDispatchConfigs,
      accumulateTwoPhaseDispatches,
      function(events) {
        forEachAccumulated(events, accumulateDirectDispatchesSingle);
      },
      enqueueStateRestore,
      restoreStateIfNeeded,
      dispatchEvent,
      runEventsInBatch,
      flushPassiveEffects$$1
    ]
  }
};
function createRoot(container, options) {
  if (!isValidContainer(container))
    throw ReactErrorProd(299, "unstable_createRoot");
  return new ReactRoot(
    container,
    !0,
    null != options && !0 === options.hydrate
  );
}
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
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: "16.8.6",
  rendererPackageName: "react-dom"
});
Object.assign(ReactDOM$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
  ReactBrowserEventEmitter: {
    isEnabled: function() {
      return _enabled;
    }
  },
  ReactFiberTreeReflection: {
    findCurrentFiberUsingSlowPath: findCurrentFiberUsingSlowPath
  },
  ReactDOMComponentTree: {
    getClosestInstanceFromNode: getClosestInstanceFromNode
  },
  ReactInstanceMap: {
    get: function(key) {
      return key._reactInternalFiber;
    }
  },
  addUserTimingListener: function() {
    refCount++;
    updateFlagOutsideOfReactCallStack();
    return function() {
      refCount--;
      updateFlagOutsideOfReactCallStack();
    };
  }
});
var ReactDOMFB = { default: ReactDOM$1 },
  ReactDOMFB$1 = (ReactDOMFB && ReactDOM$1) || ReactDOMFB;
module.exports = ReactDOMFB$1.default || ReactDOMFB$1;
