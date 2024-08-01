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
var _DiscordFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DiscordFilled"));
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
var DiscordFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DiscordFilled.default
    }));
};
/**![discord](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODExLjE1IDg3YzUxLjE2IDAgOTIuNDEgNDEuMzYgOTQuODUgOTAuMDNWOTYwbC05Ny40LTgyLjY4LTUzLjQ4LTQ4LjY3LTU4LjM1LTUwLjg1IDI0LjM3IDgwLjJIMjEwLjQxYy01MSAwLTkyLjQxLTM4Ljc0LTkyLjQxLTkwLjA2VjE3Ny4yMWMwLTQ4LjY3IDQxLjQ4LTkwLjEgOTIuNi05MC4xaDYwMC4zek01ODguMTYgMjk0LjFoLTEuMDlsLTcuMzQgNy4yOGM3NS4zOCAyMS44IDExMS44NSA1NS44NiAxMTEuODUgNTUuODYtNDguNTgtMjQuMjgtOTIuMzYtMzYuNDItMTM2LjE0LTQxLjMyLTMxLjY0LTQuOTEtNjMuMjgtMi4zMy05MCAwaC03LjI4Yy0xNy4wOSAwLTUzLjQ1IDcuMjctMTAyLjE4IDI2LjctMTYuOTggNy4zOS0yNi43MiAxMi4yMi0yNi43MiAxMi4yMnMzNi40My0zNi40MiAxMTYuNzItNTUuODZsLTQuOS00LjlzLTYwLjgtMi4zMy0xMjYuNDQgNDYuMTVjMCAwLTY1LjY0IDExNC4yNi02NS42NCAyNTUuMTMgMCAwIDM2LjM2IDYzLjI0IDEzNi4xMSA2NS42NCAwIDAgMTQuNTUtMTkuMzcgMjkuMjctMzYuNDItNTYtMTctNzcuODItNTEuMDItNzcuODItNTEuMDJzNC44OCAyLjQgMTIuMTkgNy4yN2gyLjE4YzEuMDkgMCAxLjYuNTQgMi4xOCAxLjA5di4yMWMuNTguNTkgMS4wOSAxLjEgMi4xOCAxLjEgMTIgNC45NCAyNCA5LjggMzMuODIgMTQuNTNhMjk3LjU4IDI5Ny41OCAwIDAwNjUuNDUgMTkuNDhjMzMuODIgNC45IDcyLjU5IDcuMjcgMTE2LjczIDAgMjEuODItNC45IDQzLjY0LTkuNyA2NS40Ni0xOS40NCAxNC4xOC03LjI3IDMxLjYzLTE0LjU0IDUwLjgtMjYuNzkgMCAwLTIxLjgyIDM0LjAyLTgwLjE5IDUxLjAzIDEyIDE2Ljk0IDI4LjkxIDM2LjM0IDI4LjkxIDM2LjM0IDk5Ljc5LTIuMTggMTM4LjU1LTY1LjQyIDE0MC43My02Mi43MyAwLTE0MC42NS02Ni0yNTUuMTMtNjYtMjU1LjEzLTU5LjQ1LTQ0LjEyLTExNS4wOS00NS44LTEyNC45MS00NS44bDIuMDQtLjcyek01OTUgNDU0YzI1LjQ2IDAgNDYgMjEuNzYgNDYgNDguNDEgMCAyNi44My0yMC42NSA0OC41OS00NiA0OC41OXMtNDYtMjEuNzYtNDYtNDguMzdjLjA3LTI2Ljg0IDIwLjc1LTQ4LjUyIDQ2LTQ4LjUyem0tMTY1Ljg1IDBjMjUuMzUgMCA0NS44NSAyMS43NiA0NS44NSA0OC40MSAwIDI2LjgzLTIwLjY1IDQ4LjU5LTQ2IDQ4LjU5cy00Ni0yMS43Ni00Ni00OC4zN2MwLTI2Ljg0IDIwLjY1LTQ4LjUyIDQ2LTQ4LjUyeiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DiscordFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DiscordFilled';
}
var _default = RefIcon;
