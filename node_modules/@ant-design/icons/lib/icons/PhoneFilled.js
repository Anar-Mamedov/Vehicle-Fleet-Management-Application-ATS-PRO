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
var _PhoneFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PhoneFilled"));
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
var PhoneFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PhoneFilled.default
    }));
};
/**![phone](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4NS42IDIzMC4yTDc3OS4xIDEyMy44YTgwLjgzIDgwLjgzIDAgMDAtNTcuMy0yMy44Yy0yMS43IDAtNDIuMSA4LjUtNTcuNCAyMy44TDU0OS44IDIzOC40YTgwLjgzIDgwLjgzIDAgMDAtMjMuOCA1Ny4zYzAgMjEuNyA4LjUgNDIuMSAyMy44IDU3LjRsODMuOCA4My44QTM5My44MiAzOTMuODIgMCAwMTU1My4xIDU1MyAzOTUuMzQgMzk1LjM0IDAgMDE0MzcgNjMzLjhMMzUzLjIgNTUwYTgwLjgzIDgwLjgzIDAgMDAtNTcuMy0yMy44Yy0yMS43IDAtNDIuMSA4LjUtNTcuNCAyMy44TDEyMy44IDY2NC41YTgwLjg5IDgwLjg5IDAgMDAtMjMuOCA1Ny40YzAgMjEuNyA4LjUgNDIuMSAyMy44IDU3LjRsMTA2LjMgMTA2LjNjMjQuNCAyNC41IDU4LjEgMzguNCA5Mi43IDM4LjQgNy4zIDAgMTQuMy0uNiAyMS4yLTEuOCAxMzQuOC0yMi4yIDI2OC41LTkzLjkgMzc2LjQtMjAxLjdDODI4LjIgNjEyLjggODk5LjggNDc5LjIgOTIyLjMgMzQ0YzYuOC00MS4zLTYuOS04My44LTM2LjctMTEzLjh6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PhoneFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PhoneFilled';
}
var _default = RefIcon;
