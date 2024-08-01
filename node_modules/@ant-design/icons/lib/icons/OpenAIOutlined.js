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
var _OpenAIOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/OpenAIOutlined"));
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
var OpenAIOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _OpenAIOutlined.default
    }));
};
/**![open-a-i](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDgyLjg4IDEyOGMtODQuMzUgMC0xNTYuNTggNTIuOC0xODUuNjggMTI2Ljk4LTYwLjg5IDguMTMtMTE1LjMgNDMuNjMtMTQ2LjYgOTcuODQtNDIuMTYgNzMtMzIuNTUgMTYxLjg4IDE3LjE0IDIyNC4xNi0yMy4zOCA1Ni43NS0xOS44NSAxMjEuNiAxMS40MiAxNzUuNzggNDIuMTggNzMuMDIgMTI0LjEgMTA5LjE1IDIwMi45NCA5Ny4yM0M0MTkuNTggODk4LjYzIDQ3Ny41MSA5MjggNTQwLjEyIDkyOGM4NC4zNSAwIDE1Ni41OC01Mi44IDE4NS42OC0xMjYuOTggNjAuODktOC4xMyAxMTUuMy00My42MiAxNDYuNi05Ny44NCA0Mi4xNi03MyAzMi41NS0xNjEuODgtMTcuMTQtMjI0LjE2IDIzLjM4LTU2Ljc1IDE5Ljg1LTEyMS42LTExLjQyLTE3NS43OC00Mi4xOC03My4wMi0xMjQuMS0xMDkuMTUtMjAyLjk0LTk3LjIzQzYwMy40MiAxNTcuMzggNTQ1LjQ5IDEyOCA0ODIuODggMTI4bTAgNjEuNTRjMzUuNiAwIDY4Ljk3IDEzLjk5IDk0LjIyIDM3Ljc0LTEuOTMgMS4wMy0zLjkyIDEuODQtNS44MyAyLjk0bC0xMzYuNjggNzguOTFhNDYuMTEgNDYuMTEgMCAwMC0yMy4wOSAzOS43OGwtLjg0IDE4My42LTY1LjcyLTM4LjM0VjMyNy40YzAtNzYgNjEuOS0xMzcuODYgMTM3Ljk0LTEzNy44Nm0xOTcuNyA3NS45YzQ0LjE5IDMuMTQgODYuMTYgMjcuNDQgMTA5LjkyIDY4LjU3IDE3LjggMzAuOCAyMi4zOCA2Ni43IDE0LjQzIDEwMC40Mi0xLjg4LTEuMTctMy42LTIuNDktNS41My0zLjZsLTEzNi43My03OC45MWE0Ni4yMyA0Ni4yMyAwIDAwLTQ2LS4wNmwtMTU5LjQ3IDkxLjEuMzYtNzYuMDIgMTQ0LjUtODMuNDFhMTM3LjE5IDEzNy4xOSAwIDAxNzguNTMtMTguMDltLTM5Ni45MiA1NS40Yy0uMDcgMi4yLS4zIDQuMzUtLjMgNi41NnYxNTcuNzVhNDYuMTkgNDYuMTkgMCAwMDIyLjkxIDM5LjlsMTU4LjY4IDkyLjUtNjYuMDIgMzcuNjctMTQ0LjU1LTgzLjM1Yy02NS44Ni0zOC04OC40Ny0xMjIuNTMtNTAuNDUtMTg4LjM0IDE3Ljc4LTMwLjc4IDQ2LjU1LTUyLjY5IDc5LjczLTYyLjY4bTM0MC40IDc5LjkzbDE0NC41NCA4My4zNWM2NS44NiAzOCA4OC40NyAxMjIuNTMgNTAuNDUgMTg4LjM0LTE3Ljc4IDMwLjc4LTQ2LjU1IDUyLjY5LTc5LjczIDYyLjY4LjA3LTIuMTkuMy00LjM0LjMtNi41NVY1NzAuODVhNDYuMTkgNDYuMTkgMCAwMC0yMi45LTM5LjlsLTE1OC42OS05Mi41ek01MTEuOCA0NjQuODRsNTQuNTQgMzEuNzktLjMgNjMuMjItNTQuODQgMzEuMzEtNTQuNTQtMzEuODUuMy02My4xNnptMTAwLjU0IDU4LjY1bDY1LjcyIDM4LjM1VjcyOC42YzAgNzYtNjEuOSAxMzcuODYtMTM3Ljk0IDEzNy44Ni0zNS42IDAtNjguOTctMTMuOTktOTQuMjItMzcuNzQgMS45My0xLjAzIDMuOTItMS44NCA1LjgzLTIuOTRsMTM2LjY4LTc4LjlhNDYuMTEgNDYuMTEgMCAwMDIzLjA5LTM5Ljh6bS00Ni41NCA4OS41NWwtLjM2IDc2LjAyLTE0NC41IDgzLjQxYy02NS44NSAzOC0xNTAuNDIgMTUuMzQtMTg4LjQ0LTUwLjQ4LTE3LjgtMzAuOC0yMi4zOC02Ni43LTE0LjQzLTEwMC40MiAxLjg4IDEuMTcgMy42IDIuNSA1LjUzIDMuNmwxMzYuNzQgNzguOTFhNDYuMjMgNDYuMjMgMCAwMDQ2IC4wNnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(OpenAIOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'OpenAIOutlined';
}
var _default = RefIcon;
