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
var _WechatWorkOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/WechatWorkOutlined"));
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
var WechatWorkOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _WechatWorkOutlined.default
    }));
};
/**![wechat-work](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOTA5Ljc4IDcyOS41OWExMzUuODcgMTM1Ljg3IDAgMDAtNDcuMDQgMTkuMDQgMTE0LjI0IDExNC4yNCAwIDAxLTUxLjQgMzEuMDggNzYuMjkgNzYuMjkgMCAwMTI0LjQ1LTQ1LjQyIDE2OS4zIDE2OS4zIDAgMDAyMy40LTU1LjAyIDUwLjQxIDUwLjQxIDAgMTE1MC42IDUwLjMyem0tOTIuMjEtMTIwLjc2YTE2OC44MyAxNjguODMgMCAwMC01NC44MS0yMy42OCA1MC40MSA1MC40MSAwIDAxLTUwLjQtNTAuNDIgNTAuNDEgNTAuNDEgMCAxMTEwMC44IDAgMTM3LjUgMTM3LjUgMCAwMDE4LjgyIDQ3LjIgMTE0LjggMTE0LjggMCAwMTMwLjc2IDUxLjY2IDc2LjA4IDc2LjA4IDAgMDEtNDUuMDItMjQuNzZoLS4xOXptLTgzLjA0LTE3Ny43MWMtMTUuMTktMTI3LjMzLTE0Ni45OC0yMjcuMS0zMDYuNDQtMjI3LjEtMTY5Ljg3IDAtMzA4LjA5IDExMy4xLTMwOC4wOSAyNTIuMkEyMzUuODEgMjM1LjgxIDAgMDAyMzAuMDYgNjQ3LjZhMzExLjI4IDMxMS4yOCAwIDAwMzMuNiAyMS41OUwyNTAgNzIzLjc2YzQuOTMgMi4zMSA5LjcgNC43OCAxNC43NSA2LjlsNjktMzQuNWMxMC4wNyAyLjYxIDIwLjY4IDQuMyAzMS4yIDYuMDggNi43MyAxLjIgMTMuNDUgMi40MyAyMC4zNSAzLjI1YTM1NC44MyAzNTQuODMgMCAwMDEyOC44MS03LjQgMjQ4Ljg4IDI0OC44OCAwIDAwMTAuMTUgNTUuMDYgNDI1LjY0IDQyNS42NCAwIDAxLTk2LjE3IDExLjI0IDQxNy45OCA0MTcuOTggMCAwMS04Ni40LTkuNTJMMjE2LjUyIDgxNy40YTI3LjYyIDI3LjYyIDAgMDEtMjkuOTgtMy4xNCAyOC4wMiAyOC4wMiAwIDAxLTkuNjctMjguNjFsMjIuNC05MC4yNEEyOTIuMjYgMjkyLjI2IDAgMDE2NCA0NTYuMjFDNjQgMjg1Ljk4IDIyNyAxNDggNDI4LjA5IDE0OGMxOTAuOTMgMCAzNDcuMjkgMTI0LjUzIDM2Mi41MiAyODIuODJhMjQ0Ljk3IDI0NC45NyAwIDAwLTI2LjQ3LTIuNjJjLTkuOS4zOC0xOS43OSAxLjMxLTI5LjYgMi44OHptLTExNi4zIDE5OC44MWExMzUuNzYgMTM1Ljc2IDAgMDA0Ny4wNS0xOS4wNCAxMTQuMjQgMTE0LjI0IDAgMDE1MS40NS0zMSA3Ni40NyA3Ni40NyAwIDAxLTI0LjUgNDUuMzQgMTY5LjQ4IDE2OS40OCAwIDAwLTIzLjQgNTUuMDUgNTAuNDEgNTAuNDEgMCAwMS0xMDAuOC4yMyA1MC40MSA1MC40MSAwIDAxNTAuMi01MC41OG05MC44IDEyMS4zMmExNjguNiAxNjguNiAwIDAwNTQuNjYgMjMuOSA1MC40NCA1MC40NCAwIDAxMzUuNjQgODYuMDggNTAuMzggNTAuMzggMCAwMS04Ni4wNC0zNS42NiAxMzYuNzQgMTM2Ljc0IDAgMDAtMTguNjctNDcuMjggMTE0LjcxIDExNC43MSAwIDAxLTMwLjU0LTUxLjggNzYgNzYgMCAwMTQ0Ljk1IDI1LjA2eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(WechatWorkOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'WechatWorkOutlined';
}
var _default = RefIcon;
