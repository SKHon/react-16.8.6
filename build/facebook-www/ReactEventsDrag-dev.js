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

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === "function" && Symbol.for;

var REACT_EVENT_COMPONENT_TYPE = hasSymbol
  ? Symbol.for("react.event_component")
  : 0xead5;

// React event targets

var targetEventTypes = ["pointerdown", "pointercancel"];
var rootEventTypes = ["pointerup", { name: "pointermove", passive: false }];

// In the case we don't have PointerEvents (Safari), we listen to touch events
// too
if (typeof window !== "undefined" && window.PointerEvent === undefined) {
  targetEventTypes.push("touchstart", "touchend", "mousedown", "touchcancel");
  rootEventTypes.push("mouseup", "mousemove", {
    name: "touchmove",
    passive: false
  });
}

function createDragEvent(type, target, listener, eventData) {
  return Object.assign(
    {
      listener: listener,
      target: target,
      type: type
    },
    eventData
  );
}

function dispatchDragEvent(
  context,
  name,
  listener,
  state,
  discrete,
  eventData
) {
  var target = state.dragTarget;
  var syntheticEvent = createDragEvent(name, target, listener, eventData);
  context.dispatchEvent(syntheticEvent, { discrete: discrete });
}

var DragResponder = {
  targetEventTypes: targetEventTypes,
  createInitialState: function() {
    return {
      dragTarget: null,
      isPointerDown: false,
      isDragging: false,
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
      case "pointerdown": {
        if (!state.isDragging) {
          if (props.onShouldClaimOwnership) {
            context.releaseOwnership();
          }
          var obj =
            type === "touchstart" ? nativeEvent.changedTouches[0] : nativeEvent;
          var _x = (state.startX = obj.screenX);
          var _y = (state.startY = obj.screenY);
          state.x = _x;
          state.y = _y;
          state.dragTarget = target;
          state.isPointerDown = true;

          if (props.onDragStart) {
            dispatchDragEvent(
              context,
              "dragstart",
              props.onDragStart,
              state,
              true
            );
          }

          context.addRootEventTypes(target.ownerDocument, rootEventTypes);
        }
        break;
      }
      case "touchmove":
      case "mousemove":
      case "pointermove": {
        if (event.passive) {
          return;
        }
        if (state.isPointerDown) {
          var _obj =
            type === "touchmove" ? nativeEvent.changedTouches[0] : nativeEvent;
          var _x2 = _obj.screenX;
          var _y2 = _obj.screenY;
          state.x = _x2;
          state.y = _y2;
          if (
            !state.isDragging &&
            _x2 !== state.startX &&
            _y2 !== state.startY
          ) {
            var shouldEnableDragging = true;

            if (
              props.onShouldClaimOwnership &&
              props.onShouldClaimOwnership()
            ) {
              shouldEnableDragging = context.requestOwnership();
            }
            if (shouldEnableDragging) {
              state.isDragging = true;
              if (props.onDragChange) {
                var dragChangeEventListener = function() {
                  props.onDragChange(true);
                };
                dispatchDragEvent(
                  context,
                  "dragchange",
                  dragChangeEventListener,
                  state,
                  true
                );
              }
            } else {
              state.dragTarget = null;
              state.isPointerDown = false;
              context.removeRootEventTypes(rootEventTypes);
            }
          } else {
            if (props.onDragMove) {
              var eventData = {
                diffX: _x2 - state.startX,
                diffY: _y2 - state.startY
              };
              dispatchDragEvent(
                context,
                "dragmove",
                props.onDragMove,
                state,
                false,
                eventData
              );
            }
            nativeEvent.preventDefault();
          }
        }
        break;
      }
      case "pointercancel":
      case "touchcancel":
      case "touchend":
      case "mouseup":
      case "pointerup": {
        if (state.isDragging) {
          if (props.onShouldClaimOwnership) {
            context.releaseOwnership();
          }
          if (props.onDragEnd) {
            dispatchDragEvent(context, "dragend", props.onDragEnd, state, true);
          }
          if (props.onDragChange) {
            var _dragChangeEventListener = function() {
              props.onDragChange(false);
            };
            dispatchDragEvent(
              context,
              "dragchange",
              _dragChangeEventListener,
              state,
              true
            );
          }
          state.isDragging = false;
        }
        if (state.isPointerDown) {
          state.dragTarget = null;
          state.isPointerDown = false;
          context.removeRootEventTypes(rootEventTypes);
        }
        break;
      }
    }
  }
};

var Drag = {
  $$typeof: REACT_EVENT_COMPONENT_TYPE,
  displayName: "Drag",
  props: null,
  responder: DragResponder
};

var Drag$1 = (Object.freeze || Object)({
  default: Drag
});

var Drag$2 = (Drag$1 && Drag) || Drag$1;

var drag = Drag$2.default || Drag$2;

module.exports = drag;

  })();
}
