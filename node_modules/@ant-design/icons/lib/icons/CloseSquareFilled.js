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
var _CloseSquareFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CloseSquareFilled"));
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
var CloseSquareFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CloseSquareFilled.default
    }));
};
/**![close-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODgwIDExMmMxNy43IDAgMzIgMTQuMyAzMiAzMnY3MzZjMCAxNy43LTE0LjMgMzItMzIgMzJIMTQ0Yy0xNy43IDAtMzItMTQuMy0zMi0zMlYxNDRjMC0xNy43IDE0LjMtMzIgMzItMzJ6TTYzOS45OCAzMzguODJoLS4wNGwtLjA4LjA2TDUxMiA0NjYuNzUgMzg0LjE0IDMzOC44OGMtLjA0LS4wNS0uMDYtLjA2LS4wOC0uMDZhLjEyLjEyIDAgMDAtLjA3IDBjLS4wMyAwLS4wNS4wMS0uMDkuMDVsLTQ1LjAyIDQ1LjAyYS4yLjIgMCAwMC0uMDUuMDkuMTIuMTIgMCAwMDAgLjA3di4wMmEuMjcuMjcgMCAwMC4wNi4wNkw0NjYuNzUgNTEyIDMzOC44OCA2MzkuODZjLS4wNS4wNC0uMDYuMDYtLjA2LjA4YS4xMi4xMiAwIDAwMCAuMDdjMCAuMDMuMDEuMDUuMDUuMDlsNDUuMDIgNDUuMDJhLjIuMiAwIDAwLjA5LjA1LjEyLjEyIDAgMDAuMDcgMGMuMDIgMCAuMDQtLjAxLjA4LS4wNUw1MTIgNTU3LjI1bDEyNy44NiAxMjcuODdjLjA0LjA0LjA2LjA1LjA4LjA1YS4xMi4xMiAwIDAwLjA3IDBjLjAzIDAgLjA1LS4wMS4wOS0uMDVsNDUuMDItNDUuMDJhLjIuMiAwIDAwLjA1LS4wOS4xMi4xMiAwIDAwMC0uMDd2LS4wMmEuMjcuMjcgMCAwMC0uMDUtLjA2TDU1Ny4yNSA1MTJsMTI3Ljg3LTEyNy44NmMuMDQtLjA0LjA1LS4wNi4wNS0uMDhhLjEyLjEyIDAgMDAwLS4wN2MwLS4wMy0uMDEtLjA1LS4wNS0uMDlsLTQ1LjAyLTQ1LjAyYS4yLjIgMCAwMC0uMDktLjA1LjEyLjEyIDAgMDAtLjA3IDB6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CloseSquareFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CloseSquareFilled';
}
var _default = RefIcon;
