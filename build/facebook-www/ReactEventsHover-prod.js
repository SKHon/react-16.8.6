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
    "pointerover",
    "pointermove",
    "pointerout",
    "pointercancel"
  ];
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  targetEventTypes.push("touchstart", "mouseover", "mouseout");
function createHoverEvent(type, target, listener) {
  return { listener: listener, target: target, type: type };
}
function dispatchHoverChangeEvent(event, context, props, state) {
  event = createHoverEvent("hoverchange", event.target, function() {
    props.onHoverChange(state.isActiveHovered);
  });
  context.dispatchEvent(event, { discrete: !0 });
}
function dispatchHoverStartEvents(event, context, props, state) {
  var target = event.target;
  if (!context.isTargetWithinEventComponent(event.nativeEvent.relatedTarget)) {
    state.isHovered = !0;
    null !== state.hoverEndTimeout &&
      (clearTimeout(state.hoverEndTimeout), (state.hoverEndTimeout = null));
    var activate = function() {
      state.isActiveHovered = !0;
      if (props.onHoverStart) {
        var syntheticEvent = createHoverEvent(
          "hoverstart",
          target,
          props.onHoverStart
        );
        context.dispatchEvent(syntheticEvent, { discrete: !0 });
      }
      props.onHoverChange &&
        dispatchHoverChangeEvent(event, context, props, state);
    };
    if (!state.isActiveHovered) {
      var _delayHoverStart = calculateDelayMS(props.delayHoverStart, 0, 0);
      0 < _delayHoverStart
        ? (state.hoverStartTimeout = context.setTimeout(function() {
            state.hoverStartTimeout = null;
            activate();
          }, _delayHoverStart))
        : activate();
    }
  }
}
function dispatchHoverEndEvents(event, context, props, state) {
  var target = event.target;
  if (!context.isTargetWithinEventComponent(event.nativeEvent.relatedTarget)) {
    state.isHovered = !1;
    null !== state.hoverStartTimeout &&
      (clearTimeout(state.hoverStartTimeout), (state.hoverStartTimeout = null));
    var deactivate = function() {
      state.isActiveHovered = !1;
      if (props.onHoverEnd) {
        var syntheticEvent = createHoverEvent(
          "hoverend",
          target,
          props.onHoverEnd
        );
        context.dispatchEvent(syntheticEvent, { discrete: !0 });
      }
      props.onHoverChange &&
        dispatchHoverChangeEvent(event, context, props, state);
    };
    if (state.isActiveHovered) {
      var _delayHoverEnd = calculateDelayMS(props.delayHoverEnd, 0, 0);
      0 < _delayHoverEnd
        ? (state.hoverEndTimeout = context.setTimeout(function() {
            deactivate();
          }, _delayHoverEnd))
        : deactivate();
    }
  }
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
var Hover = {
    $$typeof: REACT_EVENT_COMPONENT_TYPE,
    displayName: "Hover",
    props: null,
    responder: {
      targetEventTypes: targetEventTypes,
      createInitialState: function() {
        return {
          isActiveHovered: !1,
          isHovered: !1,
          isInHitSlop: !1,
          isTouched: !1,
          hoverStartTimeout: null,
          hoverEndTimeout: null
        };
      },
      onEvent: function(event, context, props, state) {
        var target = event.target,
          nativeEvent = event.nativeEvent;
        switch (event.type) {
          case "touchstart":
            state.isTouched || (state.isTouched = !0);
            break;
          case "pointerover":
          case "mouseover":
            state.isHovered ||
              state.isTouched ||
              context.hasOwnership() ||
              ("touch" === nativeEvent.pointerType
                ? (state.isTouched = !0)
                : context.isPositionWithinTouchHitTarget(
                    target.ownerDocument,
                    nativeEvent.x,
                    nativeEvent.y
                  )
                  ? (state.isInHitSlop = !0)
                  : dispatchHoverStartEvents(event, context, props, state));
            break;
          case "pointerout":
          case "mouseout":
            state.isHovered &&
              !state.isTouched &&
              dispatchHoverEndEvents(event, context, props, state);
            state.isInHitSlop = !1;
            state.isTouched = !1;
            break;
          case "pointermove":
            state.isHovered &&
              !state.isTouched &&
              (state.isInHitSlop
                ? context.isPositionWithinTouchHitTarget(
                    target.ownerDocument,
                    nativeEvent.x,
                    nativeEvent.y
                  ) ||
                  (dispatchHoverStartEvents(event, context, props, state),
                  (state.isInHitSlop = !1))
                : state.isHovered &&
                  context.isPositionWithinTouchHitTarget(
                    target.ownerDocument,
                    nativeEvent.x,
                    nativeEvent.y
                  ) &&
                  (dispatchHoverEndEvents(event, context, props, state),
                  (state.isInHitSlop = !0)));
            break;
          case "pointercancel":
            state.isHovered &&
              !state.isTouched &&
              (dispatchHoverEndEvents(event, context, props, state),
              (state.isTouched = !1));
        }
      }
    }
  },
  Hover$1 = { default: Hover },
  Hover$2 = (Hover$1 && Hover) || Hover$1;
module.exports = Hover$2.default || Hover$2;
