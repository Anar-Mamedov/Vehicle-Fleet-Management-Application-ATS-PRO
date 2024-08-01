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
var _DiffTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DiffTwoTone"));
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
var DiffTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DiffTwoTone.default
    }));
};
/**![diff](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIzMiAyNjR2NjI0aDQzMlY0MTMuOEw1MTQuMiAyNjRIMjMyem0zMzYgNDg5YzAgMy44LTMuNCA3LTcuNSA3aC0yMjVjLTQuMSAwLTcuNS0zLjItNy41LTd2LTQyYzAtMy44IDMuNC03IDcuNS03aDIyNWM0LjEgMCA3LjUgMy4yIDcuNSA3djQyem0wLTI2MnY0MmMwIDMuOC0zLjQgNy03LjUgN0g0NzZ2ODQuOWMwIDMuOS0zLjEgNy4xLTcgNy4xaC00MmMtMy44IDAtNy0zLjItNy03LjFWNTQwaC04NC41Yy00LjEgMC03LjUtMy4yLTcuNS03di00MmMwLTMuOSAzLjQtNyA3LjUtN0g0MjB2LTg0LjljMC0zLjkgMy4yLTcuMSA3LTcuMWg0MmMzLjkgMCA3IDMuMiA3IDcuMVY0ODRoODQuNWM0LjEgMCA3LjUgMy4xIDcuNSA3eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNODU0LjIgMzA2LjZMNjExLjMgNzIuOWMtNi01LjctMTMuOS04LjktMjIuMi04LjlIMjk2Yy00LjQgMC04IDMuNi04IDh2NTZjMCA0LjQgMy42IDggOCA4aDI3N2wyMTkgMjEwLjZWODI0YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LThWMzI5LjZjMC04LjctMy41LTE3LTkuOC0yM3oiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTU1My40IDIwMS40Yy02LTYtMTQuMS05LjQtMjIuNi05LjRIMTkyYy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MDRjMCAxNy43IDE0LjMgMzIgMzIgMzJoNTEyYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjM5Ny4zYzAtOC41LTMuNC0xNi42LTkuNC0yMi42TDU1My40IDIwMS40ek02NjQgODg4SDIzMlYyNjRoMjgyLjJMNjY0IDQxMy44Vjg4OHoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTQ3NiAzOTkuMWMwLTMuOS0zLjEtNy4xLTctNy4xaC00MmMtMy44IDAtNyAzLjItNyA3LjFWNDg0aC04NC41Yy00LjEgMC03LjUgMy4xLTcuNSA3djQyYzAgMy44IDMuNCA3IDcuNSA3SDQyMHY4NC45YzAgMy45IDMuMiA3LjEgNyA3LjFoNDJjMy45IDAgNy0zLjIgNy03LjFWNTQwaDg0LjVjNC4xIDAgNy41LTMuMiA3LjUtN3YtNDJjMC0zLjktMy40LTctNy41LTdINDc2di04NC45ek01NjAuNSA3MDRoLTIyNWMtNC4xIDAtNy41IDMuMi03LjUgN3Y0MmMwIDMuOCAzLjQgNyA3LjUgN2gyMjVjNC4xIDAgNy41LTMuMiA3LjUtN3YtNDJjMC0zLjgtMy40LTctNy41LTd6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DiffTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DiffTwoTone';
}
var _default = RefIcon;
