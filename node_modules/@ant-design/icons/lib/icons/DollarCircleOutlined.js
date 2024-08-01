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
var _DollarCircleOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DollarCircleOutlined"));
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
var DollarCircleOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DollarCircleOutlined.default
    }));
};
/**![dollar-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDgyMGMtMjA1LjQgMC0zNzItMTY2LjYtMzcyLTM3MnMxNjYuNi0zNzIgMzcyLTM3MiAzNzIgMTY2LjYgMzcyIDM3Mi0xNjYuNiAzNzItMzcyIDM3MnptNDcuNy0zOTUuMmwtMjUuNC01LjlWMzQ4LjZjMzggNS4yIDYxLjUgMjkgNjUuNSA1OC4yLjUgNCAzLjkgNi45IDcuOSA2LjloNDQuOWM0LjcgMCA4LjQtNC4xIDgtOC44LTYuMS02Mi4zLTU3LjQtMTAyLjMtMTI1LjktMTA5LjJWMjYzYzAtNC40LTMuNi04LTgtOGgtMjguMWMtNC40IDAtOCAzLjYtOCA4djMzYy03MC44IDYuOS0xMjYuMiA0Ni0xMjYuMiAxMTkgMCA2Ny42IDQ5LjggMTAwLjIgMTAyLjEgMTEyLjdsMjQuNyA2LjN2MTQyLjdjLTQ0LjItNS45LTY5LTI5LjUtNzQuMS02MS4zLS42LTMuOC00LTYuNi03LjktNi42SDM2M2MtNC43IDAtOC40IDQtOCA4LjcgNC41IDU1IDQ2LjIgMTA1LjYgMTM1LjIgMTEyLjFWNzYxYzAgNC40IDMuNiA4IDggOGgyOC40YzQuNCAwIDgtMy42IDgtOC4xbC0uMi0zMS43Yzc4LjMtNi45IDEzNC4zLTQ4LjggMTM0LjMtMTI0LS4xLTY5LjQtNDQuMi0xMDAuNC0xMDktMTE2LjR6bS02OC42LTE2LjJjLTUuNi0xLjYtMTAuMy0zLjEtMTUtNS0zMy44LTEyLjItNDkuNS0zMS45LTQ5LjUtNTcuMyAwLTM2LjMgMjcuNS01NyA2NC41LTYxLjd2MTI0ek01MzQuMyA2NzdWNTQzLjNjMy4xLjkgNS45IDEuNiA4LjggMi4yIDQ3LjMgMTQuNCA2My4yIDM0LjQgNjMuMiA2NS4xIDAgMzkuMS0yOS40IDYyLjYtNzIgNjYuNHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DollarCircleOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DollarCircleOutlined';
}
var _default = RefIcon;
