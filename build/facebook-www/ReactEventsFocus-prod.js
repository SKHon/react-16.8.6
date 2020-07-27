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
function createFocusEvent(type, target, listener) {
  return { listener: listener, target: target, type: type };
}
function dispatchFocusInEvents(event, context, props) {
  var target = event.target;
  context.isTargetWithinEventComponent(event.nativeEvent.relatedTarget) ||
    (props.onFocus &&
      ((event = createFocusEvent("focus", target, props.onFocus)),
      context.dispatchEvent(event, { discrete: !0 })),
    props.onFocusChange &&
      ((target = createFocusEvent("focuschange", target, function() {
        props.onFocusChange(!0);
      })),
      context.dispatchEvent(target, { discrete: !0 })));
}
function dispatchFocusOutEvents(event, context, props) {
  var target = event.target;
  context.isTargetWithinEventComponent(event.nativeEvent.relatedTarget) ||
    (props.onBlur &&
      ((event = createFocusEvent("blur", target, props.onBlur)),
      context.dispatchEvent(event, { discrete: !0 })),
    props.onFocusChange &&
      ((target = createFocusEvent("focuschange", target, function() {
        props.onFocusChange(!1);
      })),
      context.dispatchEvent(target, { discrete: !0 })));
}
var Focus = {
    $$typeof:
      "function" === typeof Symbol && Symbol.for
        ? Symbol.for("react.event_component")
        : 60117,
    displayName: "Focus",
    props: null,
    responder: {
      targetEventTypes: [
        { name: "focus", passive: !0, capture: !0 },
        { name: "blur", passive: !0, capture: !0 }
      ],
      createInitialState: function() {
        return { isFocused: !1 };
      },
      onEvent: function(event, context, props, state) {
        switch (event.type) {
          case "focus":
            state.isFocused ||
              context.hasOwnership() ||
              (dispatchFocusInEvents(event, context, props),
              (state.isFocused = !0));
            break;
          case "blur":
            state.isFocused &&
              (dispatchFocusOutEvents(event, context, props),
              (state.isFocused = !1));
        }
      }
    }
  },
  Focus$1 = { default: Focus },
  Focus$2 = (Focus$1 && Focus) || Focus$1;
module.exports = Focus$2.default || Focus$2;
