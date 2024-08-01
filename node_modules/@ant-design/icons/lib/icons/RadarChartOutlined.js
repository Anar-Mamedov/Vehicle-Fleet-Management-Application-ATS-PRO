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
var _RadarChartOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/RadarChartOutlined"));
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
var RadarChartOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _RadarChartOutlined.default
    }));
};
/**![radar-chart](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkyNi44IDM5Ny4xbC0zOTYtMjg4YTMxLjgxIDMxLjgxIDAgMDAtMzcuNiAwbC0zOTYgMjg4YTMxLjk5IDMxLjk5IDAgMDAtMTEuNiAzNS44bDE1MS4zIDQ2NmEzMiAzMiAwIDAwMzAuNCAyMi4xaDQ4OS41YzEzLjkgMCAyNi4xLTguOSAzMC40LTIyLjFsMTUxLjMtNDY2YzQuMi0xMy4yLS41LTI3LjYtMTEuNy0zNS44ek04MzguNiA0MTdsLTk4LjUgMzItMjAwLTE0NC43VjE5OS45TDgzOC42IDQxN3pNNDY2IDU2Ny4ybC04OS4xIDEyMi4zLTU1LjItMTY5LjJMNDY2IDU2Ny4yem0tMTE2LjMtOTYuOEw0ODQgMzczLjN2MTQwLjhsLTEzNC4zLTQzLjd6TTUxMiA1OTkuMmw5My45IDEyOC45SDQxOC4xTDUxMiA1OTkuMnptMjguMS0yMjUuOWwxMzQuMiA5Ny4xTDU0MC4xIDUxNFYzNzMuM3pNNTU4IDU2Ny4ybDE0NC4zLTQ2LjktNTUuMiAxNjkuMkw1NTggNTY3LjJ6bS03NC0zNjcuM3YxMDQuNEwyODMuOSA0NDlsLTk4LjUtMzJMNDg0IDE5OS45ek0xNjkuMyA0NzAuOGw4Ni41IDI4LjEgODAuNCAyNDYuNC01My44IDczLjktMTEzLjEtMzQ4LjR6TTMyNy4xIDg1M2w1MC4zLTY5aDI2OS4zbDUwLjMgNjlIMzI3LjF6bTQxNC41LTMzLjhsLTUzLjgtNzMuOSA4MC40LTI0Ni40IDg2LjUtMjguMS0xMTMuMSAzNDguNHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(RadarChartOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'RadarChartOutlined';
}
var _default = RefIcon;
