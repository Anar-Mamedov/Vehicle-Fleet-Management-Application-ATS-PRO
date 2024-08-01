// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
var _SpotifyOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SpotifyOutlined"));
var _AntdIcon = /*#__PURE__*/ _interop_require_default(require("../components/AntdIcon"));
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var SpotifyOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SpotifyOutlined.default
    }));
};
/**![spotify](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTEyIDY0QzI2NC41MiA2NCA2NCAyNjQuNTIgNjQgNTEyczIwMC41MiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjUyIDQ0OC00NDhTNzU5LjQ4IDY0IDUxMiA2NG0wIDc0LjY2YTM3MS44NiAzNzEuODYgMCAwMTI2NC40MyAxMDguOTFBMzcxLjg2IDM3MS44NiAwIDAxODg1LjMzIDUxMmEzNzEuODYgMzcxLjg2IDAgMDEtMTA4LjkgMjY0LjQzQTM3MS44NiAzNzEuODYgMCAwMTUxMiA4ODUuMzNhMzcxLjg2IDM3MS44NiAwIDAxLTI2NC40My0xMDguOUEzNzEuODYgMzcxLjg2IDAgMDExMzguNjcgNTEyYTM3MS44NiAzNzEuODYgMCAwMTEwOC45LTI2NC40M0EzNzEuODYgMzcxLjg2IDAgMDE1MTIgMTM4LjY3TTQ1Mi40OSAzMTZjLTcyLjYxIDAtMTM1LjkgNi43Mi0xOTYgMjUuNjgtMTUuOSAzLjE4LTI5LjE2IDE1LjE2LTI5LjE2IDM3LjM0IDAgMjIuMTQgMTYuMzUgNDEuNyAzOC41IDM4LjQ1IDkuNDggMCAxNS45LTMuNDcgMjIuMTctMy40NyA1MC41OS0xMi43IDEwNy42My0xOC42NyAxNjQuNDktMTguNjcgMTEwLjU1IDAgMjI0IDI0LjY0IDI5OS44MiA2OC44NSA5LjQ5IDMuMiAxMi43IDYuOTggMjIuMTggNi45OCAyMi4xOCAwIDM3LjYzLTE2LjMyIDQwLjg0LTM4LjUgMC0xOC45Ni05LjQ4LTMxLjA2LTIyLjE3LTM3LjMzQzY5OC4zNiAzNDEuNjUgNTcyLjUyIDMxNiA0NTIuNDkgMzE2TTQ0MiA0NTQuODRjLTY2LjM0IDAtMTEzLjYgOS40OS0xNjEuMDIgMjIuMTgtMTUuNzIgNi4yMy0yNC40OSAxNi4wNS0yNC40OSAzNC45OCAwIDE1Ljc2IDEyLjU0IDMxLjUxIDMxLjUxIDMxLjUxIDYuNDIgMCA5LjE4LS4zIDE4LjY3LTMuNTEgMzQuNzItOS40OCA4Mi40LTE1LjE2IDEzMy4wMi0xNS4xNiAxMDQuMjMgMCAxOTQuOTUgMjUuMzkgMjYxLjMzIDY2LjUgNi4yMyAzLjIgMTIuNyA1LjgyIDIyLjE0IDUuODIgMTguOTYgMCAzMS41LTE2LjA2IDMxLjUtMzQuOTggMC0xMi43LTUuOTctMjUuMjQtMTguNjYtMzEuNTEtODIuMTMtNTAuNTktMTg2LjUyLTc1LjgzLTI5NC03NS44M20xMC40OSAxMzYuNWMtNTMuNjUgMC0xMDQuNTMgNS45Ny0xNTUuMTYgMTguNjYtMTIuNjkgMy4yMS0yMi4xNyAxMi4yNC0yMi4xNyAyOCAwIDEyLjcgOS45MyAyNS42OCAyNS42OCAyNS42OCAzLjIxIDAgMTIuNC0zLjUgMTguNjctMy41YTU4MS43MyA1ODEuNzMgMCAwMTEyOS41LTE1LjJjNzguOSAwIDE1MS4wNiAxOC45NyAyMTEuMTcgNTMuNjkgNi40MiAzLjIgMTMuNTUgNS44MiAxOS44MiA1LjgyIDEyLjcgMCAyNC43OS05LjQ4IDI4LTIyLjE0IDAtMTUuOS02Ljg3LTIxLjc2LTE2LjM1LTI4LTY5LjU1LTQxLjE0LTE1MC44LTYzLjAyLTIzOS4xNi02My4wMiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SpotifyOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SpotifyOutlined';
}
var _default = RefIcon;
