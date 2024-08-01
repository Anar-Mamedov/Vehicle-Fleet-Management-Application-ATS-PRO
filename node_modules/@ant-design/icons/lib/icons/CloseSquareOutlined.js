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
var _CloseSquareOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CloseSquareOutlined"));
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
var CloseSquareOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CloseSquareOutlined.default
    }));
};
/**![close-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODgwIDExMmMxNy43IDAgMzIgMTQuMyAzMiAzMnY3MzZjMCAxNy43LTE0LjMgMzItMzIgMzJIMTQ0Yy0xNy43IDAtMzItMTQuMy0zMi0zMlYxNDRjMC0xNy43IDE0LjMtMzIgMzItMzJ6bS00MCA3MkgxODR2NjU2aDY1NlYxODR6TTY0MC4wMSAzMzguODNjLjAzIDAgLjA1LjAxLjA5LjA2bDQ1LjAyIDQ1LjAxYS4yLjIgMCAwMS4wNS4wOS4xMi4xMiAwIDAxMCAuMDdjMCAuMDItLjAxLjA0LS4wNS4wOEw1NTcuMjUgNTEybDEyNy44NyAxMjcuODZhLjI3LjI3IDAgMDEuMDUuMDZ2LjAyYS4xMi4xMiAwIDAxMCAuMDdjMCAuMDMtLjAxLjA1LS4wNS4wOWwtNDUuMDIgNDUuMDJhLjIuMiAwIDAxLS4wOS4wNS4xMi4xMiAwIDAxLS4wNyAwYy0uMDIgMC0uMDQtLjAxLS4wOC0uMDVMNTEyIDU1Ny4yNSAzODQuMTQgNjg1LjEyYy0uMDQuMDQtLjA2LjA1LS4wOC4wNWEuMTIuMTIgMCAwMS0uMDcgMGMtLjAzIDAtLjA1LS4wMS0uMDktLjA1bC00NS4wMi00NS4wMmEuMi4yIDAgMDEtLjA1LS4wOS4xMi4xMiAwIDAxMC0uMDdjMC0uMDIuMDEtLjA0LjA2LS4wOEw0NjYuNzUgNTEyIDMzOC44OCAzODQuMTRhLjI3LjI3IDAgMDEtLjA1LS4wNmwtLjAxLS4wMmEuMTIuMTIgMCAwMTAtLjA3YzAtLjAzLjAxLS4wNS4wNS0uMDlsNDUuMDItNDUuMDJhLjIuMiAwIDAxLjA5LS4wNS4xMi4xMiAwIDAxLjA3IDBjLjAyIDAgLjA0LjAxLjA4LjA2TDUxMiA0NjYuNzVsMTI3Ljg2LTEyNy44NmMuMDQtLjA1LjA2LS4wNi4wOC0uMDZhLjEyLjEyIDAgMDEuMDcgMHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CloseSquareOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CloseSquareOutlined';
}
var _default = RefIcon;
