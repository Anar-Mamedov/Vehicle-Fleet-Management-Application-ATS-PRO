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
var _SoundTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SoundTwoTone"));
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
var SoundTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SoundTwoTone.default
    }));
};
/**![sound](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI3NS40IDQyNEgxNDZ2MTc2aDEyOS40bDE4IDExLjdMNTg2IDgwM1YyMjFMMjkzLjMgNDEyLjN6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik04OTIuMSA3MzcuOGwtMTEwLjMtNjMuN2ExNS45IDE1LjkgMCAwMC0yMS43IDUuOWwtMTkuOSAzNC41Yy00LjQgNy42LTEuOCAxNy40IDUuOCAyMS44TDg1Ni4zIDgwMGExNS45IDE1LjkgMCAwMDIxLjctNS45bDE5LjktMzQuNWM0LjQtNy42IDEuNy0xNy40LTUuOC0yMS44ek05MzQgNDc2SDgwNmMtOC44IDAtMTYgNy4yLTE2IDE2djQwYzAgOC44IDcuMiAxNiAxNiAxNmgxMjhjOC44IDAgMTYtNy4yIDE2LTE2di00MGMwLTguOC03LjItMTYtMTYtMTZ6TTc2MCAzNDRhMTUuOSAxNS45IDAgMDAyMS43IDUuOUw4OTIgMjg2LjJjNy42LTQuNCAxMC4yLTE0LjIgNS44LTIxLjhMODc4IDIzMGExNS45IDE1LjkgMCAwMC0yMS43LTUuOUw3NDYgMjg3LjhhMTUuOTkgMTUuOTkgMCAwMC01LjggMjEuOEw3NjAgMzQ0ek02MjUuOSAxMTVjLTUuOSAwLTExLjkgMS42LTE3LjQgNS4zTDI1NCAzNTJIOTBjLTguOCAwLTE2IDcuMi0xNiAxNnYyODhjMCA4LjggNy4yIDE2IDE2IDE2aDE2NGwzNTQuNSAyMzEuN2M1LjUgMy42IDExLjYgNS4zIDE3LjQgNS4zIDE2LjcgMCAzMi4xLTEzLjMgMzIuMS0zMi4xVjE0Ny4xYzAtMTguOC0xNS40LTMyLjEtMzIuMS0zMi4xek01ODYgODAzTDI5My40IDYxMS43bC0xOC0xMS43SDE0NlY0MjRoMTI5LjRsMTcuOS0xMS43TDU4NiAyMjF2NTgyeiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SoundTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SoundTwoTone';
}
var _default = RefIcon;
