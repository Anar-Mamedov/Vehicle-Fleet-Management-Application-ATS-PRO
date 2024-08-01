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
var _CalculatorFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CalculatorFilled"));
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
var CalculatorFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CalculatorFilled.default
    }));
};
/**![calculator](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnpNNDQwLjIgNzY1aC01MC44Yy0yLjIgMC00LjUtMS4xLTUuOS0yLjlMMzQ4IDcxOC42bC0zNS41IDQzLjVhNy4zOCA3LjM4IDAgMDEtNS45IDIuOWgtNTAuOGMtNi42IDAtMTAuMi03LjktNS44LTEzLjFsNjIuNy03Ni44LTYxLjItNzQuOWMtNC4zLTUuMi0uNy0xMy4xIDUuOS0xMy4xaDUwLjljMi4yIDAgNC41IDEuMSA1LjkgMi45bDM0IDQxLjYgMzQtNDEuNmMxLjUtMS45IDMuNi0yLjkgNS45LTIuOWg1MC44YzYuNiAwIDEwLjIgNy45IDUuOSAxMy4xTDM4My41IDY3NWw2Mi43IDc2LjhjNC4yIDUuMy42IDEzLjItNiAxMy4yem03LjgtMzgyYzAgMi4yLTEuNCA0LTMuMiA0SDM3NnY2OC43YzAgMS45LTEuOCAzLjMtNCAzLjNoLTQ4Yy0yLjIgMC00LTEuNC00LTMuMlYzODdoLTY4LjhjLTEuOCAwLTMuMi0xLjgtMy4yLTR2LTQ4YzAtMi4yIDEuNC00IDMuMi00SDMyMHYtNjguOGMwLTEuOCAxLjgtMy4yIDQtMy4yaDQ4YzIuMiAwIDQgMS40IDQgMy4yVjMzMWg2OC43YzEuOSAwIDMuMyAxLjggMy4zIDR2NDh6bTMyOCAzNjljMCAyLjItMS40IDQtMy4yIDRINTc5LjJjLTEuOCAwLTMuMi0xLjgtMy4yLTR2LTQ4YzAtMi4yIDEuNC00IDMuMi00aDE5My41YzEuOSAwIDMuMyAxLjggMy4zIDR2NDh6bTAtMTA0YzAgMi4yLTEuNCA0LTMuMiA0SDU3OS4yYy0xLjggMC0zLjItMS44LTMuMi00di00OGMwLTIuMiAxLjQtNCAzLjItNGgxOTMuNWMxLjkgMCAzLjMgMS44IDMuMyA0djQ4em0wLTI2NWMwIDIuMi0xLjQgNC0zLjIgNEg1NzkuMmMtMS44IDAtMy4yLTEuOC0zLjItNHYtNDhjMC0yLjIgMS40LTQgMy4yLTRoMTkzLjVjMS45IDAgMy4zIDEuOCAzLjMgNHY0OHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CalculatorFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CalculatorFilled';
}
var _default = RefIcon;
