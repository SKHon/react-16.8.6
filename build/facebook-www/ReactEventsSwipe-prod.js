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
  targetEventTypes = ["pointerdown", "pointercancel"],
  rootEventTypes = ["pointerup", { name: "pointermove", passive: !1 }];
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  (targetEventTypes.push("touchstart", "touchend", "mousedown", "touchcancel"),
  rootEventTypes.push("mouseup", "mousemove", {
    name: "touchmove",
    passive: !1
  }));
function dispatchSwipeEvent(
  context,
  name,
  listener,
  state,
  discrete,
  eventData
) {
  name = Object.assign(
    { listener: listener, target: state.swipeTarget, type: name },
    eventData
  );
  context.dispatchEvent(name, { discrete: discrete });
}
var Swipe = {
    $$typeof: REACT_EVENT_COMPONENT_TYPE,
    displayName: "Swipe",
    props: null,
    responder: {
      targetEventTypes: targetEventTypes,
      createInitialState: function() {
        return {
          direction: 0,
          isSwiping: !1,
          lastDirection: 0,
          startX: 0,
          startY: 0,
          touchId: null,
          swipeTarget: null,
          x: 0,
          y: 0
        };
      },
      onEvent: function(event, context, props, state) {
        var target = event.target,
          type = event.type,
          nativeEvent = event.nativeEvent;
        switch (type) {
          case "touchstart":
          case "mousedown":
          case "pointerdown":
            state.isSwiping ||
              context.hasOwnership() ||
              ((event = nativeEvent),
              "touchstart" === type &&
                ((event = nativeEvent.targetTouches[0]),
                (state.touchId = event.identifier)),
              (nativeEvent = event.screenX),
              (type = event.screenY),
              (event = !0),
              props.onShouldClaimOwnership &&
                props.onShouldClaimOwnership() &&
                (event = context.requestOwnership()),
              event
                ? ((state.isSwiping = !0),
                  (state.startX = nativeEvent),
                  (state.startY = type),
                  (state.x = nativeEvent),
                  (state.y = type),
                  (state.swipeTarget = target),
                  context.addRootEventTypes(
                    target.ownerDocument,
                    rootEventTypes
                  ))
                : (state.touchId = null));
            break;
          case "touchmove":
          case "mousemove":
          case "pointermove":
            if (event.passive) break;
            if (state.isSwiping) {
              target = null;
              if ("touchmove" === type)
                for (
                  type = nativeEvent.targetTouches, event = 0;
                  event < type.length;
                  event++
                ) {
                  if (state.touchId === type[event].identifier) {
                    target = type[event];
                    break;
                  }
                }
              else target = nativeEvent;
              null === target
                ? ((state.isSwiping = !1),
                  (state.swipeTarget = null),
                  (state.touchId = null),
                  context.removeRootEventTypes(rootEventTypes))
                : ((type = target.screenX),
                  (target = target.screenY),
                  type < state.x && props.onSwipeLeft
                    ? (state.direction = 3)
                    : type > state.x &&
                      props.onSwipeRight &&
                      (state.direction = 1),
                  (state.x = type),
                  (state.y = target),
                  props.onSwipeMove &&
                    (dispatchSwipeEvent(
                      context,
                      "swipemove",
                      props.onSwipeMove,
                      state,
                      !1,
                      {
                        diffX: type - state.startX,
                        diffY: target - state.startY
                      }
                    ),
                    nativeEvent.preventDefault()));
            }
            break;
          case "pointercancel":
          case "touchcancel":
          case "touchend":
          case "mouseup":
          case "pointerup":
            !state.isSwiping ||
              (state.x === state.startX && state.y === state.startY) ||
              (props.onShouldClaimOwnership && context.releaseOwnership(),
              (nativeEvent = state.direction),
              nativeEvent !== state.lastDirection &&
                (props.onSwipeLeft && 3 === nativeEvent
                  ? dispatchSwipeEvent(
                      context,
                      "swipeleft",
                      props.onSwipeLeft,
                      state,
                      !0
                    )
                  : props.onSwipeRight &&
                    1 === nativeEvent &&
                    dispatchSwipeEvent(
                      context,
                      "swiperight",
                      props.onSwipeRight,
                      state,
                      !0
                    )),
              props.onSwipeEnd &&
                dispatchSwipeEvent(
                  context,
                  "swipeend",
                  props.onSwipeEnd,
                  state,
                  !0
                ),
              (state.lastDirection = nativeEvent),
              (state.isSwiping = !1),
              (state.swipeTarget = null),
              (state.touchId = null),
              context.removeRootEventTypes(rootEventTypes));
        }
      }
    }
  },
  Swipe$1 = { default: Swipe },
  Swipe$2 = (Swipe$1 && Swipe) || Swipe$1;
module.exports = Swipe$2.default || Swipe$2;
