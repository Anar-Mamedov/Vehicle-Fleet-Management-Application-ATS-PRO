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
var _OpenAIFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/OpenAIFilled"));
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
var OpenAIFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _OpenAIFilled.default
    }));
};
/**![open-a-i](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDc1LjYgMTEyYy03NC4wMyAwLTEzOS43MiA0Mi4zOC0xNzIuOTIgMTA0LjU4djIzNy4yOGw5Mi4yNyA1Ni40OCAzLjM4LTIzNS43IDE4OS0xMjcuNDVBMTk0LjMzIDE5NC4zMyAwIDAwNDc1LjYgMTEybTIwMi45IDYyLjI1Yy0xMy4xNyAwLTI2LjA1IDEuNzYtMzguOCA0LjM2TDQ1My4yIDMwNC4zNmwtMS4zNyA5Ni4xNSAxODYuNTgtMTI1LjI1IDIzMS4yMiAxMzcuMjhhMTk1LjUgMTk1LjUgMCAwMDQuODctNDIuMzNjMC0xMDguMDQtODcuOTMtMTk1Ljk2LTE5NS45OS0xOTUuOTZNMjQ3LjM0IDI2NkMxNjcuMzQgMjkwLjcgMTA5IDM2NS4yMiAxMDkgNDUzLjJjMCAyNy45MiA1LjkgNTQuODMgMTYuNzkgNzkuMzZsMjQ1LjQ4IDEzOS43NyA5MC41OC01Ni4xMi0yMTQuNS0xMzEuMzh6bTM5Mi44OCA3NC42N2wtNzIuNyA0OC44NUw3NzEuNSA1MTcuNTggNzk3LjMgNzUzQzg2Ny40MSA3MjMuMTEgOTE2IDY1My45NyA5MTYgNTczLjFjMC0yNy41NS01Ljg2LTU0LjEyLTE2LjU3LTc4LjUzem0tMTIzIDgyLjZsLTY2LjM2IDQ0LjU2LTEuMDUgNzYuMTIgNjQuNyAzOS42NiA2OS41NC00My4wNC0xLjg0LTc2LjQ4em0xMjEuMiA3Ni4xMmw1Ljg3IDI0OC4zNEw0NDMgODY2LjlBMTk1LjY1IDE5NS42NSAwIDAwNTY3Ljg0IDkxMmM3OS4yMiAwIDE0Ny44LTQ2LjUyIDE3OC42Mi0xMTQuOTlMNzE5LjQgNTUwLjIyem0tNTIuODYgMTA1LjNMMzcyLjQzIDczNi42OCAxNjkuNTYgNjIxLjE1YTE5NS4zNSAxOTUuMzUgMCAwMC01LjIyIDQ0LjE2YzAgMTAyLjk0IDc5Ljg0IDE4Ny40MSAxODAuODEgMTk1LjE4TDU4OC4yIDcxNi42eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(OpenAIFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'OpenAIFilled';
}
var _default = RefIcon;
