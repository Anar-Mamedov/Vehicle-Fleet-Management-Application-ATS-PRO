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
var _WechatWorkFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/WechatWorkFilled"));
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
var WechatWorkFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _WechatWorkFilled.default
    }));
};
/**![wechat-work](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODA1LjMzIDExMkgyMTguNjdDMTU5Ljc2IDExMiAxMTIgMTU5Ljc2IDExMiAyMTguNjd2NTg2LjY2QzExMiA4NjQuMjQgMTU5Ljc2IDkxMiAyMTguNjcgOTEyaDU4Ni42NkM4NjQuMjQgOTEyIDkxMiA4NjQuMjQgOTEyIDgwNS4zM1YyMTguNjdDOTEyIDE1OS43NiA4NjQuMjQgMTEyIDgwNS4zMyAxMTJtLTk4LjE3IDQxNy44NmExMDIuMTMgMTAyLjEzIDAgMDAyOC4xIDUyLjQ2bDIuMTMgMi4wNmMuNDEuMjcuOC41NyAxLjE2LjlsLjU1LjY0LjIuMDJhNy45NiA3Ljk2IDAgMDEtLjk4IDEwLjgyIDcuOTYgNy45NiAwIDAxLTEwLjg1LS4xOGMtMS4xLTEuMDUtMi4xNC0yLjE0LTMuMjQtMy4yNGExMDIuNDkgMTAyLjQ5IDAgMDAtNTMuODItMjguMzZsLTItLjI3Yy0uNjYtLjEyLTEuMzQtLjM5LTEuOTgtLjM5YTMzLjI3IDMzLjI3IDAgMTE0MC4zNy0zNy42NmMuMTcgMS4wOS4zNiAyLjE2LjM2IDMuMm0tMjEzLjEgMTUzLjgyYTI3Ni43OCAyNzYuNzggMCAwMS02MS43LjE3IDI2Ny4zIDI2Ny4zIDAgMDEtNDQuNjctOC42bC02OC40NCAzNC40Yy0uMzMuMjQtLjc3LjQzLTEuMTUuNzFoLS4yN2ExOC4yOSAxOC4yOSAwIDAxLTI3LjUyLTE1LjljLjAzLS41OS4xLTEuMTcuMi0xLjc0LjEzLTEuOTcuNi0zLjkgMS4zNy01LjcybDIuNzUtMTEuMTUgOS41Ni0zOS41NmEyNzcuNTcgMjc3LjU3IDAgMDEtNDkuMjUtNTQuNjdBMTg1Ljk5IDE4NS45OSAwIDAxMjIzLjEgNDc4LjFhMTgyLjQyIDE4Mi40MiAwIDAxMTkuMDgtODEuMDQgMjAzLjk4IDIwMy45OCAwIDAxMzcuMTktNTIuMzJjMzguOTEtMzkuOTQgOTMuMjYtNjUuNTIgMTUzLjEtNzIuMDNhMjc4LjI1IDI3OC4yNSAwIDAxMzAuMTctMS42NGMxMC41LjAzIDIwLjk5LjY1IDMxLjQyIDEuODYgNTkuNTggNi43OSAxMTMuNjUgMzIuNDggMTUyLjI2IDcyLjM2YTIwMi45NiAyMDIuOTYgMCAwMTM3IDUyLjQ4IDE4Mi4zIDE4Mi4zIDAgMDExOC4xNyA5NC42N2MtLjUyLS41Ny0xLjAyLTEuMi0xLjU3LTEuNzZhMzMuMjYgMzMuMjYgMCAwMC00MC44NC00LjhjLjIyLTIuMjYuMjItNC41NC4yMi02Ljc5YTE0My42NCAxNDMuNjQgMCAwMC0xNC43Ni02My4zOCAxNjQuMDcgMTY0LjA3IDAgMDAtMjkuNjgtNDIuMTVjLTMxLjc4LTMyLjc2LTc2LjQ3LTUzLjk1LTEyNS44OS01OS41NWEyMzQuMzcgMjM0LjM3IDAgMDAtNTEuNjctLjE0Yy00OS42MSA1LjQxLTk0LjYgMjYuNDUtMTI2LjU3IDU5LjI2YTE2My42MyAxNjMuNjMgMCAwMC0yOS44MiA0MS45NSAxNDMuNDQgMTQzLjQ0IDAgMDAtMTUuMTIgNjMuOTMgMTQ3LjE2IDE0Ny4xNiAwIDAwMjUuMjkgODEuNTEgMTcwLjUgMTcwLjUgMCAwMDI0LjkzIDI5LjQgMTcyLjMxIDE3Mi4zMSAwIDAwMTcuNTYgMTQuNzUgMTcuNiAxNy42IDAgMDE2LjM1IDE5LjYybC02LjQ5IDI0LjY3LTEuODYgNy4xNC0xLjYyIDYuNDVhMi44NSAyLjg1IDAgMDAyLjc3IDIuODggMy45OSAzLjk5IDAgMDAxLjkzLS42OGw0My44Ni0yNS45MyAxLjQ0LS43OGEyMy4yIDIzLjIgMCAwMTE4LjI0LTEuODQgMjI3LjM4IDIyNy4zOCAwIDAwMzMuODcgNy4xMmw1LjIyLjY5YTIyNy4yNiAyMjcuMjYgMCAwMDUxLjY3LS4xNCAyMjYuNTggMjI2LjU4IDAgMDA0Mi43NS05LjA3IDMzLjIgMzMuMiAwIDAwMjIuNzIgMzQuNzYgMjY5LjI3IDI2OS4yNyAwIDAxLTYwLjM3IDE0LjEybTg5LjA3LTI0Ljg3YTMzLjMzIDMzLjMzIDAgMDEtMzMuNzYtMTguNzUgMzMuMzIgMzMuMzIgMCAwMTYuNjQtMzguMDMgMzMuMTYgMzMuMTYgMCAwMTE4LjI2LTkuMzFjMS4wNy0uMTQgMi4xOS0uMzYgMy4yNC0uMzZhMTAyLjM3IDEwMi4zNyAwIDAwNTIuNDctMjguMDVsMi4yLTIuMzNhMTAuMjEgMTAuMjEgMCAwMTEuNTctMS42OHYtLjAzYTcuOTcgNy45NyAwIDExMTAuNjQgMTEuODFsLTMuMjQgMy4yNGExMDIuNDQgMTAyLjQ0IDAgMDAtMjguNTYgNTMuNzRjLS4wOS42My0uMjggMS4zNS0uMjggMmwtLjM5IDIuMDFhMzMuMyAzMy4zIDAgMDEtMjguNzkgMjUuNzRtOTQuNDQgOTMuODdhMzMuMyAzMy4zIDAgMDEtMzYuMTgtMjQuMjUgMjggMjggMCAwMS0xLjEtNi43MyAxMDIuNCAxMDIuNCAwIDAwLTI4LjE1LTUyLjM5bC0yLjMtMi4yNWE3LjIgNy4yIDAgMDEtMS4xMS0uOWwtLjU0LS42aC0uMDN2LjA1YTcuOTYgNy45NiAwIDAxLjk2LTEwLjgyIDcuOTYgNy45NiAwIDAxMTAuODUuMThsMy4yMiAzLjI0YTEwMi4yOSAxMDIuMjkgMCAwMDUzLjggMjguMzVsMiAuMjhhMzMuMjcgMzMuMjcgMCAxMS0xLjQyIDY1Ljg0bTExMy42Ny0xMDMuMzRhMzIuODQgMzIuODQgMCAwMS0xOC4yOCA5LjMxIDI2LjM2IDI2LjM2IDAgMDEtMy4yNC4zNiAxMDIuMzIgMTAyLjMyIDAgMDAtNTIuNDQgMjguMSA0OS41NyA0OS41NyAwIDAwLTMuMTQgMy40MWwtLjY4LjU2aC4wMmwuMDkuMDVhNy45NCA3Ljk0IDAgMTEtMTAuNi0xMS44MWwzLjIzLTMuMjRhMTAyLjA1IDEwMi4wNSAwIDAwMjguMzctNTMuNyAzMy4yNiAzMy4yNiAwIDExNjIuNC0xMi4xIDMzLjIxIDMzLjIxIDAgMDEtNS43MyAzOS4wNiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(WechatWorkFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'WechatWorkFilled';
}
var _default = RefIcon;
