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
var _TaobaoSquareFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TaobaoSquareFilled"));
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
var TaobaoSquareFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TaobaoSquareFilled.default
    }));
};
/**![taobao-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnpNMzE1LjcgMjkxLjVjMjcuMyAwIDQ5LjUgMjIuMSA0OS41IDQ5LjRzLTIyLjEgNDkuNC00OS41IDQ5LjRhNDkuNCA0OS40IDAgMTEwLTk4Ljh6TTM2Ni45IDU3OGMtMTMuNiA0Mi4zLTEwLjIgMjYuNy02NC40IDE0NC41bC03OC41LTQ5czg3LjctNzkuOCAxMDUuNi0xMTYuMmMxOS4yLTM4LjQtMjEuMS01OC45LTIxLjEtNTguOWwtNjAuMi0zNy41IDMyLjctNTAuMmM0NS40IDMzLjcgNDguNyAzNi42IDc5LjIgNjcuMiAyMy44IDIzLjkgMjAuNyA1Ni44IDYuNyAxMDAuMXptNDI3LjIgNTVjLTE1LjMgMTQzLjgtMjAyLjQgOTAuMy0yMDIuNCA5MC4zbDEwLjItNDEuMSA0My4zIDkuM2M4MCA1IDcyLjMtNjQuOSA3Mi4zLTY0LjlWNDIzYy42LTc3LjMtNzIuNi04NS40LTIwNC4yLTM4LjNsMzAuNiA4LjNjLTIuNSA5LTEyLjUgMjMuMi0yNS4yIDM4LjZoMTc2djM1LjZoLTk5LjF2NDQuNWg5OC43djM1LjdoLTk4LjdWNjIyYzE0LjktNC44IDI4LjYtMTEuNSA0MC41LTIwLjVsLTguNy0zMi41IDQ2LjUtMTQuNCAzOC44IDk0LjktNTcuMyAyMy45LTEwLjItMzcuOGMtMjUuNiAxOS41LTc4LjggNDgtMTcxLjggNDUuNC05OS4yIDIuNi03My43LTExMi03My43LTExMmwyLjUtMS4zSDQ3MmMtLjUgMTQuNy02LjYgMzguNyAxLjcgNTEuOCA2LjggMTAuOCAyNC4yIDEyLjYgMzUuMyAxMy4xIDEuMy4xIDIuNi4xIDMuOS4xdi04NS4zaC0xMDF2LTM1LjdoMTAxdi00NC41SDQ4N2MtMjIuNyAyNC4xLTQzLjUgNDQuMS00My41IDQ0LjFsLTMwLjYtMjYuN2MyMS43LTIyLjkgNDMuMy01OS4xIDU2LjgtODMuMi0xMC45IDQuNC0yMiA5LjItMzMuNiAxNC4yLTExLjIgMTQuMy0yNC4yIDI5LTM4LjcgNDMuNS41LjgtNTAtMjguNC01MC0yOC40IDUyLjItNDQuNCA4MS40LTEzOS45IDgxLjQtMTM5LjlsNzIuNSAyMC40cy01LjkgMTQtMTguNCAzNS42YzI5MC4zLTgyLjMgMzA3LjQgNTAuNSAzMDcuNCA1MC41czE5LjEgOTEuOCAzLjggMjM1Ljd6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TaobaoSquareFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TaobaoSquareFilled';
}
var _default = RefIcon;
