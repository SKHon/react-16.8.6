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
var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_EVENT_TARGET_TYPE = hasSymbol
    ? Symbol.for("react.event_target")
    : 60118,
  REACT_EVENT_TARGET_TOUCH_HIT = hasSymbol
    ? Symbol.for("react.event_target.touch_hit")
    : 60119;
exports.TouchHitTarget = {
  $$typeof: REACT_EVENT_TARGET_TYPE,
  type: REACT_EVENT_TARGET_TOUCH_HIT
};
