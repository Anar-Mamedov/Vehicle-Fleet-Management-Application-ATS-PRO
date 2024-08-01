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
var _AlipaySquareFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AlipaySquareFilled"));
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
var AlipaySquareFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AlipaySquareFilled.default
    }));
};
/**![alipay-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODk0LjYgMTE2LjU0YTMwLjkgMzAuOSAwIDAxMTIuODYgMTIuODVjMi45NiA1LjU0IDQuNTQgMTEuMDQgNC41NCAyNi4yVjg2OC40YzAgMTUuMTYtMS41OCAyMC42Ni00LjU0IDI2LjJhMzAuOSAzMC45IDAgMDEtMTIuODUgMTIuODVjLTUuNTQgMi45Ni0xMS4wNCA0LjU0LTI2LjIgNC41NEgxNTUuNmMtMTUuMTYgMC0yMC42Ni0xLjU4LTI2LjItNC41NGEzMC45IDMwLjkgMCAwMS0xMi44NS0xMi44NWMtMi45Mi01LjQ3LTQuNS0xMC45LTQuNTQtMjUuNTlWMTU1LjZjMC0xNS4xNiAxLjU4LTIwLjY2IDQuNTQtMjYuMmEzMC45IDMwLjkgMCAwMTEyLjg1LTEyLjg1YzUuNDctMi45MiAxMC45LTQuNSAyNS41OS00LjU0SDg2OC40YzE1LjE2IDAgMjAuNjYgMS41OCAyNi4yIDQuNTRNNTQxIDI2MmMtNjIuMiAwLTc2LjgzIDE1LjA0LTc3LjQyIDM0LjlsLS4wMiAxLjI3djQxLjYySDMxNS4wOGMtOC44NiAwLTEyLjc1IDIwLjU5LTEyLjc0IDM1LjFhNC4zIDQuMyAwIDAwNC4yNiA0LjRoMTU2Ljk3djUyLjA1SDM1OS41NmMtOC45IDAtMTIuNzcgMjEuMjItMTIuNzUgMzUuMjVhNC4yNiA0LjI2IDAgMDA0LjI2IDQuMjVoMjA4LjQ0Yy00LjA0IDM2LjY2LTEzLjc4IDY5LjI3LTI3LjQzIDk3LjZsLTEuMDkgMi4yMy0uMjgtLjI1Yy01My44LTI1LjQyLTEwNy41My00Ni45NC0xNzMuNTgtNDYuOTRsLTIuMzMuMDFjLTc1Ljg4IDEtMTI5LjIxIDUwLjQ1LTEzMC4yOCAxMTMuNDNsLS4wMiAxLjEuMDIgMS44OWMxLjEgNjIuODUgNTYuNzUgMTEyLjkgMTMyLjYgMTEyLjkgNTQuNyAwIDEwMy45MS0xNS4wNCAxNDUuOTUtNDAuMmExMjMuNzMgMTIzLjczIDAgMDAxMi41Ni03LjEgMzA4LjYgMzA4LjYgMCAwMDQ0LjkyLTM2Ljc1bDguNDQgNS42NyAxMS4xMiA3LjQzYzUxLjM2IDM0LjE1IDEwMS41NyA2NC44MyAxNTEuNjYgNzAuNzdhMTI3LjM0IDEyNy4zNCAwIDAwMTYuMzUgMS4wNGMzOC40IDAgNDkuMS00Ny4wNCA1MS4yNC04NS4yOGwuMTMtMi41M2ExMy41MyAxMy41MyAwIDAwLTEzLjA4LTE0LjE3Yy02Ny4zOS0yLjEtMTIxLjg0LTE5LjY4LTE3MS40NC00MS4xN2wtNS42LTIuNDRjMzEuMzktNTAuNzIgNTAuNi0xMDguNzcgNTEuMDQtMTY2LjY3bC4wNy0uOTZhOC41MSA4LjUxIDAgMDAtOC41LTkuMUg1NDUuMzN2LTUyLjA2SDY5My4zYzguODYgMCAxMi43NS0xOS43NSAxMi43NS0zNS4xLS4wMS0yLjQtMS44Ny00LjQtNC4yNy00LjRINTQ1LjMydi03My41MmE0LjI5IDQuMjkgMCAwMC00LjMxLTQuMjdtLTE5My4zIDMxNC4xNWM0OC43NyAwIDk1LjYgMjAuMDEgMTQxLjE1IDQ2LjZsNS4xNSAzLjA0Yy05Mi40OCAxMDctMjIwLjY5IDg1LjYyLTIzMy42OCAyMy41NGE1OS43MiA1OS43MiAwIDAxLTEuMDItOC43OGwtLjA1LTIuMDguMDEtLjgxYy44Ny0zNS44MiA0MC40OC02MS41MSA4OC40NC02MS41MSIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AlipaySquareFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AlipaySquareFilled';
}
var _default = RefIcon;
