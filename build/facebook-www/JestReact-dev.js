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

Object.defineProperty(exports, "__esModule", { value: true });

// Do not require this module directly! Use a normal error constructor with
// template literal strings. The messages will be converted to ReactError during
// build, and in production they will be minified.

// Do not require this module directly! Use a normal error constructor with
// template literal strings. The messages will be converted to ReactError during
// build, and in production they will be minified.

function ReactError(message) {
  var error = new Error(message);
  error.name = "Invariant Violation";
  return error;
}

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === "function" && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;

var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;

// React event targets

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

function captureAssertion(fn) {
  // Trick to use a Jest matcher inside another Jest matcher. `fn` contains an
  // assertion; if it throws, we capture the error and return it, so the stack
  // trace presented to the user points to the original assertion in the
  // test file.
  try {
    fn();
  } catch (error) {
    return {
      pass: false,
      message: function() {
        return error.message;
      }
    };
  }
  return { pass: true };
}

function assertYieldsWereCleared(root) {
  var Scheduler = root._Scheduler;
  var actualYields = Scheduler.unstable_clearYields();
  (function() {
    if (!(actualYields.length === 0)) {
      {
        throw ReactError(
          "Log of yielded values is not empty. Call expect(ReactTestRenderer).unstable_toHaveYielded(...) first."
        );
      }
    }
  })();
}

function unstable_toMatchRenderedOutput(root, expectedJSX) {
  assertYieldsWereCleared(root);
  var actualJSON = root.toJSON();

  var actualJSX = void 0;
  if (actualJSON === null || typeof actualJSON === "string") {
    actualJSX = actualJSON;
  } else if (Array.isArray(actualJSON)) {
    if (actualJSON.length === 0) {
      actualJSX = null;
    } else if (actualJSON.length === 1) {
      actualJSX = jsonChildToJSXChild(actualJSON[0]);
    } else {
      var actualJSXChildren = jsonChildrenToJSXChildren(actualJSON);
      if (actualJSXChildren === null || typeof actualJSXChildren === "string") {
        actualJSX = actualJSXChildren;
      } else {
        actualJSX = {
          $$typeof: REACT_ELEMENT_TYPE,
          type: REACT_FRAGMENT_TYPE,
          key: null,
          ref: null,
          props: {
            children: actualJSXChildren
          },
          _owner: null,
          _store: {}
        };
      }
    }
  } else {
    actualJSX = jsonChildToJSXChild(actualJSON);
  }

  return captureAssertion(function() {
    expect(actualJSX).toEqual(expectedJSX);
  });
}

function jsonChildToJSXChild(jsonChild) {
  if (jsonChild === null || typeof jsonChild === "string") {
    return jsonChild;
  } else {
    var jsxChildren = jsonChildrenToJSXChildren(jsonChild.children);
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: jsonChild.type,
      key: null,
      ref: null,
      props:
        jsxChildren === null
          ? jsonChild.props
          : Object.assign({}, jsonChild.props, { children: jsxChildren }),
      _owner: null,
      _store: {}
    };
  }
}

function jsonChildrenToJSXChildren(jsonChildren) {
  if (jsonChildren !== null) {
    if (jsonChildren.length === 1) {
      return jsonChildToJSXChild(jsonChildren[0]);
    } else if (jsonChildren.length > 1) {
      var jsxChildren = [];
      var allJSXChildrenAreStrings = true;
      var jsxChildrenString = "";
      for (var i = 0; i < jsonChildren.length; i++) {
        var jsxChild = jsonChildToJSXChild(jsonChildren[i]);
        jsxChildren.push(jsxChild);
        if (allJSXChildrenAreStrings) {
          if (typeof jsxChild === "string") {
            jsxChildrenString += jsxChild;
          } else if (jsxChild !== null) {
            allJSXChildrenAreStrings = false;
          }
        }
      }
      return allJSXChildrenAreStrings ? jsxChildrenString : jsxChildren;
    }
  }
  return null;
}

exports.unstable_toMatchRenderedOutput = unstable_toMatchRenderedOutput;

  })();
}
