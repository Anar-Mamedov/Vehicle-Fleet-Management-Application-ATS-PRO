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
var _MoneyCollectTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/MoneyCollectTwoTone"));
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
var MoneyCollectTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _MoneyCollectTwoTone.default
    }));
};
/**![money-collect](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI1NiA3NDQuNGwyNTYgOTMuMSAyNTYtOTMuMVYxODRIMjU2djU2MC40ek0zNTkuNyAzMTNjMS4yLS43IDIuNS0xIDMuOC0xaDU1LjdhOCA4IDAgMDE3LjEgNC40TDUxMSA0ODUuMmgzLjNMNTk5IDMxNi40YzEuMy0yLjcgNC4xLTQuNCA3LjEtNC40aDU0LjVjNC40IDAgOCAzLjYgOC4xIDcuOSAwIDEuMy0uNCAyLjYtMSAzLjhMNTY0IDUxNS4zaDU3LjZjNC40IDAgOCAzLjYgOCA4djI3LjFjMCA0LjQtMy42IDgtOCA4aC03Ni4zdjM5aDc2LjNjNC40IDAgOCAzLjYgOCA4djI3LjFjMCA0LjQtMy42IDgtOCA4aC03Ni4zVjcwNGMwIDQuNC0zLjYgOC04IDhoLTQ5LjljLTQuNCAwLTgtMy42LTgtOHYtNjMuNGgtNzZjLTQuNCAwLTgtMy42LTgtOHYtMjcuMWMwLTQuNCAzLjYtOCA4LThoNzZ2LTM5aC03NmMtNC40IDAtOC0zLjYtOC04di0yNy4xYzAtNC40IDMuNi04IDgtOGg1N0wzNTYuNSAzMjMuOGMtMi4xLTMuOC0uNy04LjcgMy4yLTEwLjh6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik05MTEuNSA3MDAuN2E4IDggMCAwMC0xMC4zLTQuOEw4NDAgNzE4LjJWMTgwYzAtMzcuNi0zMC40LTY4LTY4LTY4SDI1MmMtMzcuNiAwLTY4IDMwLjQtNjggNjh2NTM4LjJsLTYxLjMtMjIuM2MtLjktLjMtMS44LS41LTIuNy0uNS00LjQgMC04IDMuNi04IDhWNzYzYzAgMy4zIDIuMSA2LjMgNS4zIDcuNUw1MDEgOTEwLjFjNy4xIDIuNiAxNC44IDIuNiAyMS45IDBsMzgzLjgtMTM5LjVjMy4yLTEuMiA1LjMtNC4yIDUuMy03LjV2LTU5LjZjMC0xLS4yLTEuOS0uNS0yLjh6TTc2OCA3NDQuNGwtMjU2IDkzLjEtMjU2LTkzLjFWMTg0aDUxMnY1NjAuNHoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTQ2MC40IDUxNS40aC01N2MtNC40IDAtOCAzLjYtOCA4djI3LjFjMCA0LjQgMy42IDggOCA4aDc2djM5aC03NmMtNC40IDAtOCAzLjYtOCA4djI3LjFjMCA0LjQgMy42IDggOCA4aDc2VjcwNGMwIDQuNCAzLjYgOCA4IDhoNDkuOWM0LjQgMCA4LTMuNiA4LTh2LTYzLjVoNzYuM2M0LjQgMCA4LTMuNiA4LTh2LTI3LjFjMC00LjQtMy42LTgtOC04aC03Ni4zdi0zOWg3Ni4zYzQuNCAwIDgtMy42IDgtOHYtMjcuMWMwLTQuNC0zLjYtOC04LThINTY0bDEwMy43LTE5MS42Yy42LTEuMiAxLTIuNSAxLTMuOC0uMS00LjMtMy43LTcuOS04LjEtNy45aC01NC41Yy0zIDAtNS44IDEuNy03LjEgNC40bC04NC43IDE2OC44SDUxMWwtODQuNy0xNjguOGE4IDggMCAwMC03LjEtNC40aC01NS43Yy0xLjMgMC0yLjYuMy0zLjggMS0zLjkgMi4xLTUuMyA3LTMuMiAxMC44bDEwMy45IDE5MS42eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(MoneyCollectTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'MoneyCollectTwoTone';
}
var _default = RefIcon;
