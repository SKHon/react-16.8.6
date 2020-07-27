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
var REACT_EVENT_COMPONENT_TYPE =
    "function" === typeof Symbol && Symbol.for
      ? Symbol.for("react.event_component")
      : 60117,
  targetEventTypes = [
    { name: "click", passive: !1 },
    { name: "keydown", passive: !1 },
    "pointerdown",
    "pointercancel",
    "contextmenu"
  ],
  rootEventTypes = [
    { name: "keyup", passive: !1 },
    { name: "pointerup", passive: !1 },
    "scroll"
  ];
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  (targetEventTypes.push("touchstart", "touchend", "mousedown", "touchcancel"),
  rootEventTypes.push({ name: "mouseup", passive: !1 }));
function dispatchEvent(context, state, name, listener) {
  context.dispatchEvent(
    { listener: listener, target: state.pressTarget, type: name },
    { discrete: !0 }
  );
}
function dispatchPressChangeEvent(context, props, state) {
  dispatchEvent(context, state, "presschange", function() {
    props.onPressChange(state.isActivePressed);
  });
}
function dispatchLongPressChangeEvent(context, props, state) {
  dispatchEvent(context, state, "longpresschange", function() {
    props.onLongPressChange(state.isLongPressed);
  });
}
function activate(context, props, state) {
  var wasActivePressed = state.isActivePressed;
  state.isActivePressed = !0;
  props.onPressStart &&
    dispatchEvent(context, state, "pressstart", props.onPressStart);
  !wasActivePressed &&
    props.onPressChange &&
    dispatchPressChangeEvent(context, props, state);
}
function deactivate(context, props, state) {
  var wasLongPressed = state.isLongPressed;
  state.isActivePressed = !1;
  state.isLongPressed = !1;
  props.onPressEnd &&
    dispatchEvent(context, state, "pressend", props.onPressEnd);
  props.onPressChange && dispatchPressChangeEvent(context, props, state);
  wasLongPressed &&
    props.onLongPressChange &&
    dispatchLongPressChangeEvent(context, props, state);
}
function dispatchPressStartEvents(context, props, state) {
  function dispatch() {
    state.isActivePressStart = !0;
    activate(context, props, state);
    if (
      (props.onLongPress || props.onLongPressChange) &&
      !state.isLongPressed
    ) {
      var _delayLongPress = calculateDelayMS(props.delayLongPress, 10, 500);
      state.longPressTimeout = context.setTimeout(function() {
        state.isLongPressed = !0;
        state.longPressTimeout = null;
        props.onLongPress &&
          dispatchEvent(context, state, "longpress", function(e) {
            props.onLongPress(e);
          });
        props.onLongPressChange &&
          dispatchLongPressChangeEvent(context, props, state);
      }, _delayLongPress);
    }
  }
  state.isPressed = !0;
  null !== state.pressEndTimeout &&
    (clearTimeout(state.pressEndTimeout), (state.pressEndTimeout = null));
  if (!state.isActivePressStart) {
    var _delayPressStart = calculateDelayMS(props.delayPressStart, 0, 0);
    0 < _delayPressStart
      ? (state.pressStartTimeout = context.setTimeout(function() {
          state.pressStartTimeout = null;
          dispatch();
        }, _delayPressStart))
      : dispatch();
  }
}
function dispatchPressEndEvents(context, props, state) {
  var wasActivePressStart = state.isActivePressStart;
  state.isActivePressStart = !1;
  state.isPressed = !1;
  null !== state.longPressTimeout &&
    (clearTimeout(state.longPressTimeout), (state.longPressTimeout = null));
  wasActivePressStart ||
    null === state.pressStartTimeout ||
    (clearTimeout(state.pressStartTimeout),
    (state.pressStartTimeout = null),
    activate(context, props, state));
  state.isActivePressed &&
    ((wasActivePressStart = calculateDelayMS(props.delayPressEnd, 0, 0)),
    0 < wasActivePressStart
      ? (state.pressEndTimeout = context.setTimeout(function() {
          state.pressEndTimeout = null;
          deactivate(context, props, state);
        }, wasActivePressStart))
      : deactivate(context, props, state));
}
function isValidKeyPress(key) {
  return " " === key || "Enter" === key;
}
function calculateDelayMS(delay) {
  var fallback =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
    maybeNumber = null == delay ? null : delay;
  return Math.max(
    1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
    null != maybeNumber ? maybeNumber : fallback
  );
}
var Press = {
    $$typeof: REACT_EVENT_COMPONENT_TYPE,
    displayName: "Press",
    props: null,
    responder: {
      targetEventTypes: targetEventTypes,
      createInitialState: function() {
        return {
          defaultPrevented: !1,
          isActivePressed: !1,
          isActivePressStart: !1,
          isAnchorTouched: !1,
          isLongPressed: !1,
          isPressed: !1,
          longPressTimeout: null,
          pressEndTimeout: null,
          pressStartTimeout: null,
          pressTarget: null,
          shouldSkipMouseAfterTouch: !1
        };
      },
      onEvent: function(event, context, props, state) {
        var target = event.target,
          type = event.type,
          nativeEvent = event.nativeEvent;
        switch (type) {
          case "pointerdown":
          case "mousedown":
            if (
              !state.isPressed &&
              !context.hasOwnership() &&
              !state.shouldSkipMouseAfterTouch
            ) {
              if ("mouse" === nativeEvent.pointerType || "mousedown" === type)
                if (
                  1 === nativeEvent.button ||
                  2 === nativeEvent.button ||
                  context.isPositionWithinTouchHitTarget(
                    target.ownerDocument,
                    nativeEvent.x,
                    nativeEvent.y
                  )
                )
                  break;
              state.pressTarget = target;
              dispatchPressStartEvents(context, props, state);
              context.addRootEventTypes(target.ownerDocument, rootEventTypes);
            }
            break;
          case "pointerup":
          case "mouseup":
            if (state.isPressed) {
              if (state.shouldSkipMouseAfterTouch) {
                state.shouldSkipMouseAfterTouch = !1;
                break;
              }
              event = state.isLongPressed;
              dispatchPressEndEvents(context, props, state);
              null !== state.pressTarget &&
                props.onPress &&
                context.isTargetWithinElement(target, state.pressTarget) &&
                ((event &&
                  props.onLongPressShouldCancelPress &&
                  props.onLongPressShouldCancelPress()) ||
                  dispatchEvent(context, state, "press", function(e) {
                    props.onPress(e);
                  }));
              context.removeRootEventTypes(rootEventTypes);
            }
            state.isAnchorTouched = !1;
            break;
          case "touchstart":
            state.isPressed ||
              context.hasOwnership() ||
              ("A" === target.nodeName
                ? (state.isAnchorTouched = !0)
                : ((state.pressTarget = target),
                  dispatchPressStartEvents(context, props, state),
                  context.addRootEventTypes(
                    target.ownerDocument,
                    rootEventTypes
                  )));
            break;
          case "touchend":
            if (state.isAnchorTouched) {
              state.isAnchorTouched = !1;
              break;
            }
            state.isPressed &&
              ((event = state.isLongPressed),
              dispatchPressEndEvents(context, props, state),
              "touchcancel" !== type &&
                props.onPress &&
                ((type = nativeEvent.changedTouches[0]),
                (target = target.ownerDocument.elementFromPoint(
                  type.screenX,
                  type.screenY
                )),
                null !== target &&
                  context.isTargetWithinEventComponent(target) &&
                  ((event &&
                    props.onLongPressShouldCancelPress &&
                    props.onLongPressShouldCancelPress()) ||
                    dispatchEvent(context, state, "press", props.onPress))),
              (state.shouldSkipMouseAfterTouch = !0),
              context.removeRootEventTypes(rootEventTypes));
            break;
          case "keydown":
            state.isPressed ||
              state.isLongPressed ||
              context.hasOwnership() ||
              !isValidKeyPress(nativeEvent.key) ||
              (" " === nativeEvent.key && nativeEvent.preventDefault(),
              (state.pressTarget = target),
              dispatchPressStartEvents(context, props, state),
              context.addRootEventTypes(target.ownerDocument, rootEventTypes));
            break;
          case "keyup":
            state.isPressed &&
              isValidKeyPress(nativeEvent.key) &&
              ((target = state.isLongPressed),
              dispatchPressEndEvents(context, props, state),
              null !== state.pressTarget &&
                props.onPress &&
                ((target &&
                  props.onLongPressShouldCancelPress &&
                  props.onLongPressShouldCancelPress()) ||
                  dispatchEvent(context, state, "press", props.onPress)),
              context.removeRootEventTypes(rootEventTypes));
            break;
          case "contextmenu":
          case "pointercancel":
          case "scroll":
          case "touchcancel":
            state.isPressed &&
              ((state.shouldSkipMouseAfterTouch = !1),
              dispatchPressEndEvents(context, props, state),
              context.removeRootEventTypes(rootEventTypes));
            break;
          case "click":
            state.defaultPrevented &&
              (nativeEvent.preventDefault(), (state.defaultPrevented = !1));
        }
      },
      onUnmount: function(context, props, state) {
        state.isPressed &&
          (dispatchPressEndEvents(context, props, state),
          context.removeRootEventTypes(rootEventTypes));
      },
      onOwnershipChange: function(context, props, state) {
        state.isPressed &&
          (dispatchPressEndEvents(context, props, state),
          context.removeRootEventTypes(rootEventTypes));
      }
    }
  },
  Press$1 = { default: Press },
  Press$2 = (Press$1 && Press) || Press$1;
module.exports = Press$2.default || Press$2;
