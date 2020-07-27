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
function dispatchDragEvent(
  context,
  name,
  listener,
  state,
  discrete,
  eventData
) {
  name = Object.assign(
    { listener: listener, target: state.dragTarget, type: name },
    eventData
  );
  context.dispatchEvent(name, { discrete: discrete });
}
var Drag = {
    $$typeof: REACT_EVENT_COMPONENT_TYPE,
    displayName: "Drag",
    props: null,
    responder: {
      targetEventTypes: targetEventTypes,
      createInitialState: function() {
        return {
          dragTarget: null,
          isPointerDown: !1,
          isDragging: !1,
          startX: 0,
          startY: 0,
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
            state.isDragging ||
              (props.onShouldClaimOwnership && context.releaseOwnership(),
              (event =
                "touchstart" === type
                  ? nativeEvent.changedTouches[0]
                  : nativeEvent),
              (nativeEvent = state.startX = event.screenX),
              (event = state.startY = event.screenY),
              (state.x = nativeEvent),
              (state.y = event),
              (state.dragTarget = target),
              (state.isPointerDown = !0),
              props.onDragStart &&
                dispatchDragEvent(
                  context,
                  "dragstart",
                  props.onDragStart,
                  state,
                  !0
                ),
              context.addRootEventTypes(target.ownerDocument, rootEventTypes));
            break;
          case "touchmove":
          case "mousemove":
          case "pointermove":
            if (event.passive) break;
            state.isPointerDown &&
              ((event =
                "touchmove" === type
                  ? nativeEvent.changedTouches[0]
                  : nativeEvent),
              (target = event.screenX),
              (event = event.screenY),
              (state.x = target),
              (state.y = event),
              state.isDragging ||
              target === state.startX ||
              event === state.startY
                ? (props.onDragMove &&
                    dispatchDragEvent(
                      context,
                      "dragmove",
                      props.onDragMove,
                      state,
                      !1,
                      {
                        diffX: target - state.startX,
                        diffY: event - state.startY
                      }
                    ),
                  nativeEvent.preventDefault())
                : ((target = !0),
                  props.onShouldClaimOwnership &&
                    props.onShouldClaimOwnership() &&
                    (target = context.requestOwnership()),
                  target
                    ? ((state.isDragging = !0),
                      props.onDragChange &&
                        dispatchDragEvent(
                          context,
                          "dragchange",
                          function() {
                            props.onDragChange(!0);
                          },
                          state,
                          !0
                        ))
                    : ((state.dragTarget = null),
                      (state.isPointerDown = !1),
                      context.removeRootEventTypes(rootEventTypes))));
            break;
          case "pointercancel":
          case "touchcancel":
          case "touchend":
          case "mouseup":
          case "pointerup":
            state.isDragging &&
              (props.onShouldClaimOwnership && context.releaseOwnership(),
              props.onDragEnd &&
                dispatchDragEvent(
                  context,
                  "dragend",
                  props.onDragEnd,
                  state,
                  !0
                ),
              props.onDragChange &&
                dispatchDragEvent(
                  context,
                  "dragchange",
                  function() {
                    props.onDragChange(!1);
                  },
                  state,
                  !0
                ),
              (state.isDragging = !1)),
              state.isPointerDown &&
                ((state.dragTarget = null),
                (state.isPointerDown = !1),
                context.removeRootEventTypes(rootEventTypes));
        }
      }
    }
  },
  Drag$1 = { default: Drag },
  Drag$2 = (Drag$1 && Drag) || Drag$1;
module.exports = Drag$2.default || Drag$2;
