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
var _IdcardTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/IdcardTwoTone"));
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
var IdcardTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _IdcardTwoTone.default
    }));
};
/**![idcard](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkyOCAxNjBIOTZjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjY0MGMwIDE3LjcgMTQuMyAzMiAzMiAzMmg4MzJjMTcuNyAwIDMyLTE0LjMgMzItMzJWMTkyYzAtMTcuNy0xNC4zLTMyLTMyLTMyem0tNDAgNjMySDEzNlYyMzJoNzUydjU2MHoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTEzNiA3OTJoNzUyVjIzMkgxMzZ2NTYwem00NzItMzcyYzAtNC40IDEtOCAyLjMtOGgxMjMuNGMxLjMgMCAyLjMgMy42IDIuMyA4djQ4YzAgNC40LTEgOC0yLjMgOEg2MTAuM2MtMS4zIDAtMi4zLTMuNi0yLjMtOHYtNDh6bTAgMTQ0YzAtNC40IDMuMi04IDcuMS04aDE4NS43YzMuOSAwIDcuMSAzLjYgNy4xIDh2NDhjMCA0LjQtMy4yIDgtNy4xIDhINjE1LjFjLTMuOSAwLTcuMS0zLjYtNy4xLTh2LTQ4ek0yMTYuMiA2NjQuNmMyLjgtNTMuMyAzMS45LTk5LjYgNzQuNi0xMjYuMS0xOC4xLTIwLTI5LjEtNDYuNC0yOS4xLTc1LjUgMC02MS45IDQ5LjktMTEyIDExMS40LTExMnMxMTEuNCA1MC4xIDExMS40IDExMmMwIDI5LjEtMTEgNTUuNi0yOS4xIDc1LjUgNDIuNiAyNi40IDcxLjggNzIuOCA3NC42IDEyNi4xYTggOCAwIDAxLTggOC40aC00My45Yy00LjIgMC03LjYtMy4zLTcuOS03LjUtMy44LTUwLjUtNDYtOTAuNS05Ny4yLTkwLjVzLTkzLjQgNDAtOTcuMiA5MC41Yy0uMyA0LjItMy43IDcuNS03LjkgNy41SDIyNGMtNC42IDAtOC4yLTMuOC03LjgtOC40eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNMzIxLjMgNDYzYTUxLjcgNTIgMCAxMDEwMy40IDAgNTEuNyA1MiAwIDEwLTEwMy40IDB6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik02MTAuMyA0NzZoMTIzLjRjMS4zIDAgMi4zLTMuNiAyLjMtOHYtNDhjMC00LjQtMS04LTIuMy04SDYxMC4zYy0xLjMgMC0yLjMgMy42LTIuMyA4djQ4YzAgNC40IDEgOCAyLjMgOHptNC44IDE0NGgxODUuN2MzLjkgMCA3LjEtMy42IDcuMS04di00OGMwLTQuNC0zLjItOC03LjEtOEg2MTUuMWMtMy45IDAtNy4xIDMuNi03LjEgOHY0OGMwIDQuNCAzLjIgOCA3LjEgOHpNMjI0IDY3M2g0My45YzQuMiAwIDcuNi0zLjMgNy45LTcuNSAzLjgtNTAuNSA0Ni05MC41IDk3LjItOTAuNXM5My40IDQwIDk3LjIgOTAuNWMuMyA0LjIgMy43IDcuNSA3LjkgNy41SDUyMmE4IDggMCAwMDgtOC40Yy0yLjgtNTMuMy0zMi05OS43LTc0LjYtMTI2LjFhMTExLjggMTExLjggMCAwMDI5LjEtNzUuNWMwLTYxLjktNDkuOS0xMTItMTExLjQtMTEycy0xMTEuNCA1MC4xLTExMS40IDExMmMwIDI5LjEgMTEgNTUuNSAyOS4xIDc1LjVhMTU4LjA5IDE1OC4wOSAwIDAwLTc0LjYgMTI2LjFjLS40IDQuNiAzLjIgOC40IDcuOCA4LjR6bTE0OS0yNjJjMjguNSAwIDUxLjcgMjMuMyA1MS43IDUycy0yMy4yIDUyLTUxLjcgNTItNTEuNy0yMy4zLTUxLjctNTIgMjMuMi01MiA1MS43LTUyeiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(IdcardTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'IdcardTwoTone';
}
var _default = RefIcon;
