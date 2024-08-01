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
var _PieChartFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PieChartFilled"));
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
var PieChartFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PieChartFilled.default
    }));
};
/**![pie-chart](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2My4xIDUxOC41SDUwNS41VjE2MC45YzAtNC40LTMuNi04LTgtOGgtMjZhMzk4LjU3IDM5OC41NyAwIDAwLTI4Mi41IDExNyAzOTcuNDcgMzk3LjQ3IDAgMDAtODUuNiAxMjdDODIuNiA0NDYuMiA3MiA0OTguNSA3MiA1NTIuNVM4Mi42IDY1OC43IDEwMy40IDcwOGMyMC4xIDQ3LjUgNDguOSA5MC4zIDg1LjYgMTI3IDM2LjcgMzYuNyA3OS40IDY1LjUgMTI3IDg1LjZhMzk2LjY0IDM5Ni42NCAwIDAwMTU1LjYgMzEuNSAzOTguNTcgMzk4LjU3IDAgMDAyODIuNS0xMTdjMzYuNy0zNi43IDY1LjUtNzkuNCA4NS42LTEyN2EzOTYuNjQgMzk2LjY0IDAgMDAzMS41LTE1NS42di0yNmMtLjEtNC40LTMuNy04LTguMS04ek05NTEgNDYzbC0yLjYtMjguMmMtOC41LTkyLTQ5LjMtMTc4LjgtMTE1LjEtMjQ0LjNBMzk4LjUgMzk4LjUgMCAwMDU4OC40IDc1LjZMNTYwLjEgNzNjLTQuNy0uNC04LjcgMy4yLTguNyA3Ljl2MzgzLjdjMCA0LjQgMy42IDggOCA4bDM4My42LTFjNC43LS4xIDguNC00IDgtOC42eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PieChartFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PieChartFilled';
}
var _default = RefIcon;
