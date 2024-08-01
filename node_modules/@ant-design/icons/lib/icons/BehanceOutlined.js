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
var _BehanceOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/BehanceOutlined"));
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
var BehanceOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _BehanceOutlined.default
    }));
};
/**![behance](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYzNCAyOTQuM2gxOTkuNXY0OC40SDYzNHpNNDM0LjEgNDg1LjhjNDQuMS0yMS4xIDY3LjItNTMuMiA2Ny4yLTEwMi44IDAtOTguMS03My0xMjEuOS0xNTcuMy0xMjEuOUgxMTJ2NDkyLjRoMjM4LjVjODkuNCAwIDE3My4zLTQzIDE3My4zLTE0MyAwLTYxLjgtMjkuMi0xMDcuNS04OS43LTEyNC43ek0yMjAuMiAzNDUuMWgxMDEuNWMzOS4xIDAgNzQuMiAxMC45IDc0LjIgNTYuMyAwIDQxLjgtMjcuMyA1OC42LTY2IDU4LjZIMjIwLjJWMzQ1LjF6bTExNS41IDMyNC44SDIyMC4xVjUzNC4zSDMzOGM0Ny42IDAgNzcuNyAxOS45IDc3LjcgNzAuMyAwIDQ5LjYtMzUuOSA2NS4zLTgwIDY1LjN6bTU3NS44LTg5LjVjMC0xMDUuNS02MS43LTE5My40LTE3My4zLTE5My40LTEwOC41IDAtMTgyLjMgODEuNy0xODIuMyAxODguOCAwIDExMSA2OS45IDE4Ny4yIDE4Mi4zIDE4Ny4yIDg1LjEgMCAxNDAuMi0zOC4zIDE2Ni43LTEyMGgtODYuM2MtOS40IDMwLjUtNDcuNiA0Ni41LTc3LjMgNDYuNS01Ny40IDAtODcuNC0zMy42LTg3LjQtOTAuN2gyNTYuOWMuMy01LjkuNy0xMi4xLjctMTguNHpNNjUzLjkgNTM3YzMuMS00Ni45IDM0LjQtNzYuMiA4MS4yLTc2LjIgNDkuMiAwIDczLjggMjguOSA3OC4xIDc2LjJINjUzLjl6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(BehanceOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'BehanceOutlined';
}
var _default = RefIcon;
