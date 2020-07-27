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

var assign = require("object-assign");
var checkPropTypes = require("prop-types/checkPropTypes");

// TODO: this is special because it gets imported during build.

var ReactVersion = "16.8.6";

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === "function" && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol
  ? Symbol.for("react.strict_mode")
  : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 0xeace;

var REACT_CONCURRENT_MODE_TYPE = hasSymbol
  ? Symbol.for("react.concurrent_mode")
  : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol
  ? Symbol.for("react.forward_ref")
  : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;
var REACT_EVENT_COMPONENT_TYPE = hasSymbol
  ? Symbol.for("react.event_component")
  : 0xead5;
var REACT_EVENT_TARGET_TYPE = hasSymbol
  ? Symbol.for("react.event_target")
  : 0xead6;

// React event targets
var REACT_EVENT_TARGET_TOUCH_HIT = hasSymbol
  ? Symbol.for("react.event_target.touch_hit")
  : 0xead7;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = "@@iterator";

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== "object") {
    return null;
  }
  var maybeIterator =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === "function") {
    return maybeIterator;
  }
  return null;
}

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

var lowPriorityWarning = require("lowPriorityWarning");

var warningWithoutStack = require("warning");

var didWarnStateUpdateForUnmountedComponent = {};

// 以下的几个 API 都是用于报警告的，看不看都无所谓

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName =
      (_constructor && (_constructor.displayName || _constructor.name)) ||
      "ReactClass";
    var warningKey = componentName + "." + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warningWithoutStack(
      false,
      "Can't call %s on a component that is not yet mounted. " +
        "This is a no-op, but it might indicate a bug in your application. " +
        "Instead, assign to `this.state` directly or define a `state = {};` " +
        "class property with the desired state in the %s component.",
      callerName,
      componentName
    );
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function(publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function(publicInstance, callback, callerName) {
    warnNoop(publicInstance, "forceUpdate");
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function(
    publicInstance,
    completeState,
    callback,
    callerName
  ) {
    warnNoop(publicInstance, "replaceState");
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function(
    publicInstance,
    partialState,
    callback,
    callerName
  ) {
    warnNoop(publicInstance, "setState");
  }
};

// 该文件包含两个基本组件，分别为 Component 及 PureComponent
// 没看这个文件之前以为 Component 会很复杂，内部需要处理一大堆逻辑
// 其实简单的一匹

var emptyObject = {};
{
  Object.freeze(emptyObject);
}

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  // ref 有好几个方式创建，字符串的不讲了，一般都是通过传入一个函数来给一个变量赋值 ref 的
  // ref={el => this.el = el} 这种方式最推荐
  // 当然还有种方式是通过 React.createRef 创建一个 ref 变量，然后这样使用
  // this.el = React.createRef()
  // ref={this.el}
  // 关于 React.createRef 就阅读 ReactCreateRef.js 文件了
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  // 如果你在组件中打印 this 的话，可能看到过 updater 这个属性
  // 有兴趣可以去看看 ReactNoopUpdateQueue 中的内容，虽然没几个 API，并且也基本没啥用，都是用来报警告的
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
// 我们在组件中调用 setState 其实就是调用到这里了
// 用法不说了，如果不清楚的把上面的注释和相应的文档看一下就行
// 一开始以为 setState 一大堆逻辑，结果就是调用了 updater 里的方法
// 所以 updater 还是个蛮重要的东西
Component.prototype.setState = function(partialState, callback) {
  (function() {
    if (
      !(
        typeof partialState === "object" ||
        typeof partialState === "function" ||
        partialState == null
      )
    ) {
      {
        throw ReactError(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      }
    }
  })();
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
// 这个 API 用的很好，不清楚作用的看文档吧
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: [
      "isMounted",
      "Instead, make sure to clean up subscriptions and pending requests in " +
        "componentWillUnmount to prevent memory leaks."
    ],
    replaceState: [
      "replaceState",
      "Refactor your code to use setState instead (see " +
        "https://github.com/facebook/react/issues/3236)."
    ]
  };
  var defineDeprecationWarning = function(methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function() {
        lowPriorityWarning(
          false,
          "%s(...) is deprecated in plain JavaScript React classes. %s",
          info[0],
          info[1]
        );
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

// 以下做的都是继承功能，让 PureComponent 继承自 Component
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
Object.assign(pureComponentPrototype, Component.prototype);
// 通过这个变量区别下普通的 Component
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
// 这个代码是不是贼简单，就是让你外部能够通过 current 去拿到 ref
// 但是可能很多人没见过 Object.seal 这个 API
// 直接给不清楚的各位复制了文档：封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

var ReactCurrentDispatcher = require("ReactCurrentDispatcher");

var ReactCurrentOwner = require("ReactCurrentOwner");

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

var describeComponentFrame = function(name, source, ownerName) {
  var sourceInfo = "";
  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, "");
    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);
        if (match) {
          var pathBeforeSlash = match[1];
          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, "");
            fileName = folderName + "/" + fileName;
          }
        }
      }
    }
    sourceInfo = " (at " + fileName + ":" + source.lineNumber + ")";
  } else if (ownerName) {
    sourceInfo = " (created by " + ownerName + ")";
  }
  return "\n    in " + (name || "Unknown") + sourceInfo;
};

var Resolved = 1;

function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || "";
  return (
    outerType.displayName ||
    (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName)
  );
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }
  {
    if (typeof type.tag === "number") {
      warningWithoutStack(
        false,
        "Received an unexpected object in getComponentName(). " +
          "This is likely a bug in React. Please file an issue."
      );
    }
  }
  if (typeof type === "function") {
    return type.displayName || type.name || null;
  }
  if (typeof type === "string") {
    return type;
  }
  switch (type) {
    case REACT_CONCURRENT_MODE_TYPE:
      return "ConcurrentMode";
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
  }
  if (typeof type === "object") {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return "Context.Consumer";
      case REACT_PROVIDER_TYPE:
        return "Context.Provider";
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, "ForwardRef");
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE: {
        var thenable = type;
        var resolvedThenable = refineResolvedLazyComponent(thenable);
        if (resolvedThenable) {
          return getComponentName(resolvedThenable);
        }
        break;
      }
      case REACT_EVENT_COMPONENT_TYPE: {
        var eventComponent = type;
        var displayName = eventComponent.displayName;
        if (displayName !== undefined) {
          return displayName;
        }
        break;
      }
      case REACT_EVENT_TARGET_TYPE: {
        var eventTarget = type;
        if (eventTarget.type === REACT_EVENT_TARGET_TOUCH_HIT) {
          return "TouchHitTarget";
        }
        var _displayName = eventTarget.displayName;
        if (_displayName !== undefined) {
          return _displayName;
        }
      }
    }
  }
  return null;
}

var ReactDebugCurrentFrame = {};

var currentlyValidatingElement = null;

function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function() {
    var stack = "";

    // Add an extra top frame while an element is being validated
    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(
        name,
        currentlyValidatingElement._source,
        owner && getComponentName(owner.type)
      );
    }

    // Delegate to the injected renderer-specific implementation
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      stack += impl() || "";
    }

    return stack;
  };
}

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentOwner: ReactCurrentOwner,
  // used by act()
  ReactShouldWarnActingUpdates: { current: false },
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: assign
};

{
  Object.assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack;

{
  warning = function(condition, format) {
    if (condition) {
      return;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (
      var _len = arguments.length,
        args = Array(_len > 2 ? _len - 2 : 0),
        _key = 2;
      _key < _len;
      _key++
    ) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack.apply(
      undefined,
      [false, format + "%s"].concat(args, [stack])
    );
  };
}

var warning$1 = warning;

// 这个文件直接从 ReactElement 开始看起
// 上面的这些代码没啥阅读意义

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, "ref")) {
      var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, "key")) {
      var getter = Object.getOwnPropertyDescriptor(config, "key").get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function() {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warningWithoutStack(
        false,
        "%s: `key` is not a prop. Trying to access it will result " +
          "in `undefined` being returned. If you need to access the same " +
          "value within the child component, you should pass it as a different " +
          "prop. (https://fb.me/react-special-props)",
        displayName
      );
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, "key", {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function() {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warningWithoutStack(
        false,
        "%s: `ref` is not a prop. Trying to access it will result " +
          "in `undefined` being returned. If you need to access the same " +
          "value within the child component, you should pass it as a different " +
          "prop. (https://fb.me/react-special-props)",
        displayName
      );
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, "ref", {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
// 这就是个工厂函数，帮助我们创建 React Element 的
// 内部代码很简单，无非多了一个 $$typeof 帮助我们标识
// 这是一个 React Element
var ReactElement = function(type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, "validated", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, "_self", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, "_source", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * 根据 type 返回一个新的 ReactElement
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  // 判断是否传入配置，比如 <div className='11'></div> 中的 className 会被解析到配置中
  if (config != null) {
    // 验证 ref 和 key，只在开发环境下
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = "" + config.key;
    }
    // 赋值操作
    // self 呢就是为了以后正确获取 this
    // source 基本来说没啥用，内部有一些 filename, line number 这种
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    // 遍历配置，把内建的几个属性剔除后丢到 props 中
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  // 处理 children 的几个操作，很简单
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  // 判断是否有给组件设置 defaultProps，有的话判断是否有给 props 赋值，只有当值为
  // undefined 时，才会设置默认值
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName =
        typeof type === "function"
          ? type.displayName || type.name || "Unknown"
          : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */

function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(
    oldElement.type,
    newKey,
    oldElement.ref,
    oldElement._self,
    oldElement._source,
    oldElement._owner,
    oldElement.props
  );

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  (function() {
    if (!!(element === null || element === undefined)) {
      {
        throw ReactError(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            element +
            "."
        );
      }
    }
  })();

  var propName = void 0;

  // Original props are copied
  var props = Object.assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = "" + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */
function isValidElement(object) {
  return (
    typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}

var SEPARATOR = ".";
var SUBSEPARATOR = ":";

// 这个代码算是 React 这个文件夹下有点东西的东西
// React.Children 这个 API 我只在写组件的时候用过
// 一般会用在组合组件设计模式上
// 如果你不清楚啥是组合组件的话，可以看下 Ant-design，内部大量使用了这种设计模式
// https://react-cn.github.io/react/docs/multiple-components.html 这里也有文档可以阅读
// 比如说 Radio.Group、Radio.Button

// 这个文件我们只关注 mapChildren 这个函数，因为这个函数内部的实现基本就贯穿了整个文件了
// 当然你想全看了当然也是可以滴，但是我一般来说不会选择全看，毕竟我只想了解代码的核心意图
// 如果你真的想全看完代码的话，推荐看完 mapChildren 的流程以后再去阅读
// 另外如果你不了解这个 API 干嘛用的，可以阅读文档 https://reactjs.org/docs/react-api.html#reactchildren
// 接下来我们就直接定位到 mapChildren 函数，开始阅读吧

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    "=": "=0",
    ":": "=2"
  };
  var escapedString = ("" + key).replace(escapeRegex, function(match) {
    return escaperLookup[match];
  });

  return "$" + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(
  mapResult,
  keyPrefix,
  mapFunction,
  mapContext
) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext
) {
  // 这个函数核心作用就是通过把传入的 children 数组通过遍历摊平成单个节点
  // 然后去执行 mapSingleChildIntoContext

  // 开始判断 children 的类型
  var type = typeof children;

  if (type === "undefined" || type === "boolean") {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case "string":
      case "number":
        invokeCallback = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }
  // 如果 children 是可以渲染的节点的话，就直接调用 callback
  // callback 是 mapSingleChildIntoContext
  // 我们先去阅读下 mapSingleChildIntoContext 函数的源码
  if (invokeCallback) {
    callback(
      traverseContext,
      children,
      // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows.
      nameSoFar === "" ? SEPARATOR + getComponentKey(children, 0) : nameSoFar
    );
    return 1;
  }

  // nextName 和 nextNamePrefix 都是在处理 key 的命名
  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  // 节点是数组的话，就开始遍历数组，并且把数组中的每个元素再递归执行 traverseAllChildrenImpl
  // 这一步操作也用来摊平数组的
  // React.Children.map(this.props.children, c => [[c, c]])
  // c => [[c, c]] 会被摊平为 [c, c, c, c]
  // 这里如果看不明白的话过会在 mapSingleChildIntoContext 中肯定能看明白
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(
        child,
        nextName,
        callback,
        traverseContext
      );
    }
  } else {
    // 不是数组的话，就看看 children 是否可以支持迭代
    // 就是通过 obj[Symbol.iterator] 的方式去取
    var iteratorFn = getIteratorFn(children);
    // 只有取出来对象是个函数类型才是正确的
    if (typeof iteratorFn === "function") {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps
            ? warning$1(
                false,
                "Using Maps as children is unsupported and will likely yield " +
                  "unexpected results. Convert it to a sequence/iterable of keyed " +
                  "ReactElements instead."
              )
            : void 0;
          didWarnAboutMaps = true;
        }
      }
      // 然后就是执行迭代器，重复上面 if 中的逻辑了
      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          callback,
          traverseContext
        );
      }
    } else if (type === "object") {
      var addendum = "";
      {
        addendum =
          " If you meant to render a collection of children, use an array " +
          "instead." +
          ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = "" + children;
      (function() {
        {
          {
            throw ReactError(
              "Objects are not valid as a React child (found: " +
                (childrenString === "[object Object]"
                  ? "object with keys {" +
                    Object.keys(children).join(", ") +
                    "}"
                  : childrenString) +
                ")." +
                addendum
            );
          }
        }
      })();
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, "", callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (
    typeof component === "object" &&
    component !== null &&
    component.key != null
  ) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
    context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(
    null,
    null,
    forEachFunc,
    forEachContext
  );
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * 这个函数只有当传入的 child 是单个节点是才会调用
 * @param bookKeeping 就是我们从对象池子里取出来的东西
 * @param child 传入的节点
 * @param childKey 节点的 key
 */
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
    keyPrefix = bookKeeping.keyPrefix,
    func = bookKeeping.func,
    context = bookKeeping.context;
  // func 就是我们在 React.Children.map(this.props.children, c => c)
  // 中传入的第二个函数参数

  var mappedChild = func.call(context, child, bookKeeping.count++);
  // 判断函数返回值是否为数组
  // 因为可能会出现这种情况
  // React.Children.map(this.props.children, c => [c, c])
  // 对于 c => [c, c] 这种情况来说，每个子元素都会被返回出去两次
  // 也就是说假如有 2 个子元素 c1 c2，那么通过调用 React.Children.map(this.props.children, c => [c, c]) 后
  // 返回的应该是 4 个子元素，c1 c1 c2 c2
  if (Array.isArray(mappedChild)) {
    // 是数组的话就回到最先调用的函数中
    // 然后回到之前 traverseAllChildrenImpl 摊平数组的问题
    // 假如 c => [[c, c]]，当执行这个函数时，返回值应该是 [c, c]
    // 然后 [c, c] 会被当成 children 传入
    // traverseAllChildrenImpl 内部逻辑判断是数组又会重新递归执行
    // 所以说即使你的函数是 c => [[[[c, c]]]]
    // 最后也会被递归摊平到 [c, c, c, c]
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function(c) {
      return c;
    });
  } else if (mappedChild != null) {
    // 不是数组且返回值不为空，判断返回值是否为有效的 Element
    // 是的话就把这个元素 clone 一遍并且替换掉 key
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(
        mappedChild,
        // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        keyPrefix +
          (mappedChild.key && (!child || child.key !== mappedChild.key)
            ? escapeUserProvidedKey(mappedChild.key) + "/"
            : "") +
          childKey
      );
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  // 这里是处理 key，不关心也没事
  var escapedPrefix = "";
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + "/";
  }
  // getPooledTraverseContext 和 releaseTraverseContext 是配套的函数
  // 用处其实很简单，就是维护一个大小为 10 的对象重用池
  // 每次从这个池子里取一个对象去赋值，用完了就将对象上的属性置空然后丢回池子
  // 维护这个池子的用意就是提高性能，毕竟频繁创建销毁一个有很多属性的对象消耗性能
  var traverseContext = getPooledTraverseContext(
    array,
    escapedPrefix,
    func,
    context
  );
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  // 遍历出来的元素会丢到 result 中最后返回出去
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children) {
  return traverseAllChildren(
    children,
    function() {
      return null;
    },
    null
  );
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
    return child;
  });
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  (function() {
    if (!isValidElement(children)) {
      {
        throw ReactError(
          "React.Children.only expected to receive a single React element child."
        );
      }
    }
  })();
  return children;
}

// createContext 可以让我们实现状态管理
// 还能够解决传递 Props drilling 的问题
// 假如一个子组件需要父组件的一个属性，但是中间间隔了好几层，这就会出现开发和维护的一个成本。这时候就可以通过这个 API 来解决
function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(
        calculateChangedBits === null ||
        typeof calculateChangedBits === "function"
      )
        ? warningWithoutStack(
            false,
            "createContext: Expected the optional second argument to be a " +
              "function. Instead received: %s",
            calculateChangedBits
          )
        : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    // 以下两个属性是为了适配多平台
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  // 以下的代码很简单，就是在 context 上挂载 Provider 和 Consumer，让外部去使用

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };

  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    };
    // $FlowFixMe: Flow complains about not setting a value, which is intentional here
    Object.defineProperties(Consumer, {
      Provider: {
        get: function() {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            warning$1(
              false,
              "Rendering <Context.Consumer.Provider> is not supported and will be removed in " +
                "a future major release. Did you mean to render <Context.Provider> instead?"
            );
          }
          return context.Provider;
        },
        set: function(_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function() {
          return context._currentValue;
        },
        set: function(_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function() {
          return context._currentValue2;
        },
        set: function(_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function() {
          return context._threadCount;
        },
        set: function(_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function() {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            warning$1(
              false,
              "Rendering <Context.Consumer.Consumer> is not supported and will be removed in " +
                "a future major release. Did you mean to render <Context.Consumer> instead?"
            );
          }
          return context.Consumer;
        }
      }
    });
    // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

// 返回一个异步加载的组件，Thenable 就代表一个 Promise 对象
function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps = void 0;
    var propTypes = void 0;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function() {
          return defaultProps;
        },
        set: function(newDefaultProps) {
          warning$1(
            false,
            "React.lazy(...): It is not supported to assign `defaultProps` to " +
              "a lazy component import. Either specify them where the component " +
              "is defined, or create a wrapping component around it."
          );
          defaultProps = newDefaultProps;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, "defaultProps", {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function() {
          return propTypes;
        },
        set: function(newPropTypes) {
          warning$1(
            false,
            "React.lazy(...): It is not supported to assign `propTypes` to " +
              "a lazy component import. Either specify them where the component " +
              "is defined, or create a wrapping component around it."
          );
          propTypes = newPropTypes;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, "propTypes", {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

// 这个 API 我也没有用过，具体文档看这里 https://reactjs.org/docs/forwarding-refs.html
// 总结来说就是能把 ref 传递到函数组件上
// 其实没有这个 API 之前，你也可以通过 props 的方式传递 ref
// 这个实现没啥好说的，就是让 render 函数多了 ref 这个参数
function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      warningWithoutStack(
        false,
        "forwardRef requires a render function but received a `memo` " +
          "component. Instead of forwardRef(memo(...)), use " +
          "memo(forwardRef(...))."
      );
    } else if (typeof render !== "function") {
      warningWithoutStack(
        false,
        "forwardRef requires a render function but was given %s.",
        render === null ? "null" : typeof render
      );
    } else {
      !// Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
      (render.length === 0 || render.length === 2)
        ? warningWithoutStack(
            false,
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            render.length === 1
              ? "Did you forget to use the ref parameter?"
              : "Any additional parameter will be undefined."
          )
        : void 0;
    }

    if (render != null) {
      !(render.defaultProps == null && render.propTypes == null)
        ? warningWithoutStack(
            false,
            "forwardRef render functions do not support propTypes or defaultProps. " +
              "Did you accidentally pass a React component?"
          )
        : void 0;
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return (
    typeof type === "string" ||
    typeof type === "function" ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_CONCURRENT_MODE_TYPE ||
    type === REACT_PROFILER_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    (typeof type === "object" &&
      type !== null &&
      (type.$$typeof === REACT_LAZY_TYPE ||
        type.$$typeof === REACT_MEMO_TYPE ||
        type.$$typeof === REACT_PROVIDER_TYPE ||
        type.$$typeof === REACT_CONTEXT_TYPE ||
        type.$$typeof === REACT_FORWARD_REF_TYPE ||
        type.$$typeof === REACT_EVENT_COMPONENT_TYPE ||
        type.$$typeof === REACT_EVENT_TARGET_TYPE))
  );
}

// 这玩意就是让函数组件支持 PureComponent
// 第二个参数可以传入一个函数，用法和 shouldComponentUpdate 一致
// 其他内容就没啥好说的了
function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      warningWithoutStack(
        false,
        "memo: The first argument must be a component. Instead " +
          "received: %s",
        type === null ? "null" : typeof type
      );
    }
  }
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

// 这个文件下的代码基本没啥好说的，都是通过调用 dispatcher 下的属性
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  (function() {
    if (!(dispatcher !== null)) {
      {
        throw ReactError(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem."
        );
      }
    }
  })();
  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();
  {
    !(unstable_observedBits === undefined)
      ? warning$1(
          false,
          "useContext() second argument is reserved for future " +
            "use in React. Passing it is not supported. " +
            "You passed: %s.%s",
          unstable_observedBits,
          typeof unstable_observedBits === "number" &&
          Array.isArray(arguments[2])
            ? "\n\nDid you call array.map(useContext)? " +
              "Calling Hooks inside a loop is not supported. " +
              "Learn more at https://fb.me/rules-of-hooks"
            : ""
        )
      : void 0;

    // TODO: add a more generic warning for invalid values.
    if (Context._context !== undefined) {
      var realContext = Context._context;
      // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.
      if (realContext.Consumer === Context) {
        warning$1(
          false,
          "Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be " +
            "removed in a future major release. Did you mean to call useContext(Context) instead?"
        );
      } else if (realContext.Provider === Context) {
        warning$1(
          false,
          "Calling useContext(Context.Provider) is not supported. " +
            "Did you mean to call useContext(Context) instead?"
        );
      }
    }
  }
  return dispatcher.useContext(Context, unstable_observedBits);
}

function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

function useEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}

function useLayoutEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}

function useCallback(callback, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}

function useMemo(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}

function useImperativeHandle(ref, create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}

function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var propTypesMisspellWarningShown = void 0;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);
    if (name) {
      return "\n\nCheck the render method of `" + name + "`.";
    }
  }
  return "";
}

function getSourceInfoErrorAddendum(elementProps) {
  if (
    elementProps !== null &&
    elementProps !== undefined &&
    elementProps.__source !== undefined
  ) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, "");
    var lineNumber = source.lineNumber;
    return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
  }
  return "";
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName =
      typeof parentType === "string"
        ? parentType
        : parentType.displayName || parentType.name;
    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = "";
  if (
    element &&
    element._owner &&
    element._owner !== ReactCurrentOwner.current
  ) {
    // Give the component that originally created this child.
    childOwner =
      " It was passed a child from " +
      getComponentName(element._owner.type) +
      ".";
  }

  setCurrentlyValidatingElement(element);
  {
    warning$1(
      false,
      'Each child in a list should have a unique "key" prop.' +
        "%s%s See https://fb.me/react-warning-keys for more information.",
      currentComponentErrorInfo,
      childOwner
    );
  }
  setCurrentlyValidatingElement(null);
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== "object") {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === "function") {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var type = element.type;
  if (type === null || type === undefined || typeof type === "string") {
    return;
  }
  var name = getComponentName(type);
  var propTypes = void 0;
  if (typeof type === "function") {
    propTypes = type.propTypes;
  } else if (
    typeof type === "object" &&
    (type.$$typeof === REACT_FORWARD_REF_TYPE ||
      // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      type.$$typeof === REACT_MEMO_TYPE)
  ) {
    propTypes = type.propTypes;
  } else {
    return;
  }
  if (propTypes) {
    setCurrentlyValidatingElement(element);
    checkPropTypes(
      propTypes,
      element.props,
      "prop",
      name,
      ReactDebugCurrentFrame.getStackAddendum
    );
    setCurrentlyValidatingElement(null);
  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warningWithoutStack(
      false,
      "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
      name || "Unknown"
    );
  }
  if (typeof type.getDefaultProps === "function") {
    !type.getDefaultProps.isReactClassApproved
      ? warningWithoutStack(
          false,
          "getDefaultProps is only used on classic React.createClass " +
            "definitions. Use a static property named `defaultProps` instead."
        )
      : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  setCurrentlyValidatingElement(fragment);

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== "children" && key !== "key") {
      warning$1(
        false,
        "Invalid prop `%s` supplied to `React.Fragment`. " +
          "React.Fragment can only have `key` and `children` props.",
        key
      );
      break;
    }
  }

  if (fragment.ref !== null) {
    warning$1(false, "Invalid attribute `ref` supplied to `React.Fragment`.");
  }

  setCurrentlyValidatingElement(null);
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = "";
    if (
      type === undefined ||
      (typeof type === "object" &&
        type !== null &&
        Object.keys(type).length === 0)
    ) {
      info +=
        " You likely forgot to export your component from the file " +
        "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = "null";
    } else if (Array.isArray(type)) {
      typeString = "array";
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
      info =
        " Did you accidentally export a JSX literal instead of a component?";
    } else {
      typeString = typeof type;
    }

    warning$1(
      false,
      "React.createElement: type is invalid -- expected a string (for " +
        "built-in components) or a class/function (for composite " +
        "components) but got: %s.%s",
      typeString,
      info
    );
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, "type", {
      enumerable: false,
      get: function() {
        lowPriorityWarning(
          false,
          "Factory.type is deprecated. Access the class directly " +
            "before passing it to createFactory."
        );
        Object.defineProperty(this, "type", {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

function noop() {}

var error = noop;
var warn = noop;
{
  var ReactDebugCurrentFrame$2 = ReactSharedInternals.ReactDebugCurrentFrame;

  error = function() {
    var stack = ReactDebugCurrentFrame$2.getStackAddendum();
    if (stack !== "") {
      var length = arguments.length;
      var args = new Array(length + 1);
      for (var i = 0; i < length; i++) {
        args[i] = arguments[i];
      }
      args[length] = stack;
      console.error.apply(console, args);
    } else {
      console.error.apply(console, arguments);
    }
  };

  warn = function() {
    var stack = ReactDebugCurrentFrame$2.getStackAddendum();
    if (stack !== "") {
      var length = arguments.length;
      var args = new Array(length + 1);
      for (var i = 0; i < length; i++) {
        args[i] = arguments[i];
      }
      args[length] = stack;
      console.warn.apply(console, args);
    } else {
      console.warn.apply(console, arguments);
    }
  };
}

// Re-export dynamic flags from the www version.
var _require = require("ReactFeatureFlags");

var debugRenderPhaseSideEffects = _require.debugRenderPhaseSideEffects;
var debugRenderPhaseSideEffectsForStrictMode =
  _require.debugRenderPhaseSideEffectsForStrictMode;
var replayFailedUnitOfWorkWithInvokeGuardedCallback =
  _require.replayFailedUnitOfWorkWithInvokeGuardedCallback;
var warnAboutDeprecatedLifecycles = _require.warnAboutDeprecatedLifecycles;
var disableYielding = _require.disableYielding;
var disableInputAttributeSyncing = _require.disableInputAttributeSyncing;
var warnAboutShorthandPropertyCollision =
  _require.warnAboutShorthandPropertyCollision;
var warnAboutDeprecatedSetNativeProps =
  _require.warnAboutDeprecatedSetNativeProps;

var enableStableConcurrentModeAPIs = false;

// I've chosen to make this a static flag instead of a dynamic flag controlled
// by a GK so that it doesn't increase bundle size. It should still be easy
// to rollback by reverting the commit that turns this on.

var React = {
  // Children 的几个方法
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef, // 这个创建一个对象{current: null}， 用ref属性，来表记一个组件。
  Component: Component, // 我们用来继承的基类
  PureComponent: PureComponent,
  // React.PureComponent与React.Component类似。
  // 它们之间的区别在于，React.Component并未实现shouldComponentUpdate（），
  // 但React.PureComponent却通过浅层的prop和状态比较来实现它。

  createContext: createContext,
  forwardRef: forwardRef, // 用来高阶组件传递ref
  lazy: lazy,
  memo: memo,

  error: error,
  warn: warn,

  useCallback: useCallback,
  useContext: useContext,
  useEffect: useEffect,
  useImperativeHandle: useImperativeHandle,
  useDebugValue: useDebugValue,
  useLayoutEffect: useLayoutEffect,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,

  Fragment: REACT_FRAGMENT_TYPE,
  Profiler: REACT_PROFILER_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

if (enableStableConcurrentModeAPIs) {
  React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.unstable_ConcurrentMode = undefined;
}

var React$2 = (Object.freeze || Object)({
  default: React
});

var React$3 = (React$2 && React) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3.default || React$3;

module.exports = react;

  })();
}
