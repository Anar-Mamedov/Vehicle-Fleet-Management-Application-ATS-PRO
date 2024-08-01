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
var _BaiduOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/BaiduOutlined"));
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
var BaiduOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _BaiduOutlined.default
    }));
};
/**![baidu](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjUwLjAyIDU0Ny4wNGM5Mi4zNy0xOS44IDc5Ljc3LTEzMC4wNyA3Ni45NS0xNTQuMTgtNC41Ni0zNy4yLTQ4LjI2LTEwMi4xNi0xMDcuNjMtOTcuMDItNzQuNyA2LjctODUuNjUgMTE0LjU4LTg1LjY1IDExNC41OC0xMC4wNCA0OS44OCAyNC4yIDE1Ni40MyAxMTYuMzMgMTM2LjYybTg0LjcgMjE0LjE0YzEwLjI4IDM4LjcgNDMuOTUgNDAuNDMgNDMuOTUgNDAuNDNINDI3VjY4My41NWgtNTEuNzRjLTIzLjIyIDYuOTYtMzQuNSAyNS4xLTM2Ljk4IDMyLjgtMi43NCA3LjgtOC43MSAyNy42LTMuNTcgNDQuODNtMTY5LjA3LTUzMS4xYzAtNzIuNDItNDEuMTMtMTMxLjA4LTkyLjItMTMxLjA4LTUwLjkyIDAtOTIuMjEgNTguNjYtOTIuMjEgMTMxLjA3IDAgNzIuNSA0MS4zIDEzMS4xNiA5Mi4yIDEzMS4xNiA1MS4wOCAwIDkyLjIxLTU4LjY2IDkyLjIxLTEzMS4xNm0yNDguMSA5LjFjOC44Ni01NC45Mi0zNS4wOC0xMTguODgtODMuMzQtMTI5LjgyLTQ4LjM0LTExLjEtMTA4LjcgNjYuMjgtMTE0LjE4IDExNi43NC02LjU1IDYxLjcyIDguNzkgMTIzLjI4IDc2Ljg2IDEzMi4wNiA2OC4xNiA4Ljg3IDExMi4wMy02My44NyAxMjAuNjUtMTE4Ljk3bTQ2LjM1IDQzMy4wMnMtMTA1LjQ3LTgxLjUzLTE2Ny0xNjkuNmMtODMuNC0xMjkuOTEtMjAxLjk4LTc3LjA1LTI0MS42Mi0xMS4wMi0zOS40NyA2Ni4wMy0xMDEgMTA3Ljg3LTEwOS43IDExOC45LTguODcgMTAuOTMtMTI3LjM2IDc0LjgtMTAxLjA3IDE5MS41NSAyNi4yOCAxMTYuNjUgMTE4LjczIDExNC41IDExOC43MyAxMTQuNXM2OC4wOCA2LjcgMTQ3LjEtMTAuOTRDNTIzLjcgODg4LjAzIDU5MS43IDkxMCA1OTEuNyA5MTBzMTg0LjU3IDYxLjcyIDIzNS4wNy01Ny4xOGM1MC40MS0xMTguOTctMjguNTMtMTgwLjYxLTI4LjUzLTE4MC42MU0zNjIuNDIgODQ5LjE3Yy01MS44My0xMC4zNi03Mi40Ny00NS42NS03NS4xMy01MS43LTIuNTctNi4xMy0xNy4yNC0zNC41NS05LjQ1LTgyLjg1IDIyLjM5LTcyLjQxIDg2LjIzLTc3LjYzIDg2LjIzLTc3LjYzaDYzLjg1di03OC40Nmw1NC40LjgyLjA4IDI4OS44MnptMjA1LjM4LS44M2MtNTMuNTYtMTMuNzUtNTYuMDUtNTEuNzgtNTYuMDUtNTEuNzhWNjQzLjk1bDU2LjA1LS45MnYxMzcuMTJjMy40IDE0LjU5IDIxLjY1IDE3LjMyIDIxLjY1IDE3LjMyaDU2Ljg4VjY0My45NWg1OS42MnYyMDQuMzl6bTMyMy44NC0zOTcuNzJjMC0yNi4zNS0yMS44OS0xMDUuNzItMTAzLjE1LTEwNS43Mi04MS40MyAwLTkyLjI5IDc0LjktOTIuMjkgMTI3Ljg0IDAgNTAuNTQgNC4zMSAxMjEuMTMgMTA1LjQgMTE4LjggMTAxLjE1LTIuMTUgOTAuMDQtMTE0LjQxIDkwLjA0LTE0MC45MiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(BaiduOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'BaiduOutlined';
}
var _default = RefIcon;
