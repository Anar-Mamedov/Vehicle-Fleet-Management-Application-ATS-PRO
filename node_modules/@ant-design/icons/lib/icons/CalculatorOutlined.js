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
var _CalculatorOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CalculatorOutlined"));
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
var CalculatorOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CalculatorOutlined.default
    }));
};
/**![calculator](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI1MS4yIDM4N0gzMjB2NjguOGMwIDEuOCAxLjggMy4yIDQgMy4yaDQ4YzIuMiAwIDQtMS40IDQtMy4zVjM4N2g2OC44YzEuOCAwIDMuMi0xLjggMy4yLTR2LTQ4YzAtMi4yLTEuNC00LTMuMy00SDM3NnYtNjguOGMwLTEuOC0xLjgtMy4yLTQtMy4yaC00OGMtMi4yIDAtNCAxLjQtNCAzLjJWMzMxaC02OC44Yy0xLjggMC0zLjIgMS44LTMuMiA0djQ4YzAgMi4yIDEuNCA0IDMuMiA0em0zMjggMGgxOTMuNmMxLjggMCAzLjItMS44IDMuMi00di00OGMwLTIuMi0xLjQtNC0zLjMtNEg1NzkuMmMtMS44IDAtMy4yIDEuOC0zLjIgNHY0OGMwIDIuMiAxLjQgNCAzLjIgNHptMCAyNjVoMTkzLjZjMS44IDAgMy4yLTEuOCAzLjItNHYtNDhjMC0yLjItMS40LTQtMy4zLTRINTc5LjJjLTEuOCAwLTMuMiAxLjgtMy4yIDR2NDhjMCAyLjIgMS40IDQgMy4yIDR6bTAgMTA0aDE5My42YzEuOCAwIDMuMi0xLjggMy4yLTR2LTQ4YzAtMi4yLTEuNC00LTMuMy00SDU3OS4yYy0xLjggMC0zLjIgMS44LTMuMiA0djQ4YzAgMi4yIDEuNCA0IDMuMiA0em0tMTk1LjctODFsNjEuMi03NC45YzQuMy01LjIuNy0xMy4xLTUuOS0xMy4xSDM4OGMtMi4zIDAtNC41IDEtNS45IDIuOWwtMzQgNDEuNi0zNC00MS42YTcuODUgNy44NSAwIDAwLTUuOS0yLjloLTUwLjljLTYuNiAwLTEwLjIgNy45LTUuOSAxMy4xbDYxLjIgNzQuOS02Mi43IDc2LjhjLTQuNCA1LjItLjggMTMuMSA1LjggMTMuMWg1MC44YzIuMyAwIDQuNS0xIDUuOS0yLjlsMzUuNS00My41IDM1LjUgNDMuNWMxLjUgMS44IDMuNyAyLjkgNS45IDIuOWg1MC44YzYuNiAwIDEwLjItNy45IDUuOS0xMy4xTDM4My41IDY3NXpNODgwIDExMkgxNDRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjczNmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg3MzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMTQ0YzAtMTcuNy0xNC4zLTMyLTMyLTMyem0tMzYgNzMySDE4MFYxODBoNjY0djY2NHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CalculatorOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CalculatorOutlined';
}
var _default = RefIcon;
