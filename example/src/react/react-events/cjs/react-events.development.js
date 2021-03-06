/** @license React vundefined
 * react-events.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;















var REACT_EVENT_TARGET_TYPE = hasSymbol ? Symbol.for('react.event_target') : 0xead6;

// React event targets
var REACT_EVENT_TARGET_TOUCH_HIT = hasSymbol ? Symbol.for('react.event_target.touch_hit') : 0xead7;

var TouchHitTarget = {
  $$typeof: REACT_EVENT_TARGET_TYPE,
  type: REACT_EVENT_TARGET_TOUCH_HIT
};

exports.TouchHitTarget = TouchHitTarget;
  })();
}
