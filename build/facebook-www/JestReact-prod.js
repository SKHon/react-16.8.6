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
var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
function captureAssertion(fn) {
  try {
    fn();
  } catch (error) {
    return {
      pass: !1,
      message: function() {
        return error.message;
      }
    };
  }
  return { pass: !0 };
}
function jsonChildToJSXChild(jsonChild) {
  if (null === jsonChild || "string" === typeof jsonChild) return jsonChild;
  var jsxChildren = jsonChildrenToJSXChildren(jsonChild.children);
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: jsonChild.type,
    key: null,
    ref: null,
    props:
      null === jsxChildren
        ? jsonChild.props
        : Object.assign({}, jsonChild.props, { children: jsxChildren }),
    _owner: null,
    _store: void 0
  };
}
function jsonChildrenToJSXChildren(jsonChildren) {
  if (null !== jsonChildren) {
    if (1 === jsonChildren.length) return jsonChildToJSXChild(jsonChildren[0]);
    if (1 < jsonChildren.length) {
      for (
        var jsxChildren = [],
          allJSXChildrenAreStrings = !0,
          jsxChildrenString = "",
          i = 0;
        i < jsonChildren.length;
        i++
      ) {
        var jsxChild = jsonChildToJSXChild(jsonChildren[i]);
        jsxChildren.push(jsxChild);
        allJSXChildrenAreStrings &&
          ("string" === typeof jsxChild
            ? (jsxChildrenString += jsxChild)
            : null !== jsxChild && (allJSXChildrenAreStrings = !1));
      }
      return allJSXChildrenAreStrings ? jsxChildrenString : jsxChildren;
    }
  }
  return null;
}
exports.unstable_toMatchRenderedOutput = function(root, expectedJSX) {
  if (0 !== root._Scheduler.unstable_clearYields().length)
    throw ReactErrorProd(296);
  root = root.toJSON();
  var actualJSX = void 0;
  null === root || "string" === typeof root
    ? (actualJSX = root)
    : Array.isArray(root)
      ? 0 === root.length
        ? (actualJSX = null)
        : 1 === root.length
          ? (actualJSX = jsonChildToJSXChild(root[0]))
          : ((root = jsonChildrenToJSXChildren(root)),
            (actualJSX =
              null === root || "string" === typeof root
                ? root
                : {
                    $$typeof: REACT_ELEMENT_TYPE,
                    type: REACT_FRAGMENT_TYPE,
                    key: null,
                    ref: null,
                    props: { children: root },
                    _owner: null,
                    _store: void 0
                  }))
      : (actualJSX = jsonChildToJSXChild(root));
  return captureAssertion(function() {
    expect(actualJSX).toEqual(expectedJSX);
  });
};
