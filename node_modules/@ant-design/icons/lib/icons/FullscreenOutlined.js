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
var _FullscreenOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FullscreenOutlined"));
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
var FullscreenOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FullscreenOutlined.default
    }));
};
/**![fullscreen](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI5MCAyMzYuNGw0My45LTQzLjlhOC4wMSA4LjAxIDAgMDAtNC43LTEzLjZMMTY5IDE2MGMtNS4xLS42LTkuNSAzLjctOC45IDguOUwxNzkgMzI5LjFjLjggNi42IDguOSA5LjQgMTMuNiA0LjdsNDMuNy00My43TDM3MCA0MjMuN2MzLjEgMy4xIDguMiAzLjEgMTEuMyAwbDQyLjQtNDIuM2MzLjEtMy4xIDMuMS04LjIgMC0xMS4zTDI5MCAyMzYuNHptMzUyLjcgMTg3LjNjMy4xIDMuMSA4LjIgMy4xIDExLjMgMGwxMzMuNy0xMzMuNiA0My43IDQzLjdhOC4wMSA4LjAxIDAgMDAxMy42LTQuN0w4NjMuOSAxNjljLjYtNS4xLTMuNy05LjUtOC45LTguOUw2OTQuOCAxNzljLTYuNi44LTkuNCA4LjktNC43IDEzLjZsNDMuOSA0My45TDYwMC4zIDM3MGE4LjAzIDguMDMgMCAwMDAgMTEuM2w0Mi40IDQyLjR6TTg0NSA2OTQuOWMtLjgtNi42LTguOS05LjQtMTMuNi00LjdsLTQzLjcgNDMuN0w2NTQgNjAwLjNhOC4wMyA4LjAzIDAgMDAtMTEuMyAwbC00Mi40IDQyLjNhOC4wMyA4LjAzIDAgMDAwIDExLjNMNzM0IDc4Ny42bC00My45IDQzLjlhOC4wMSA4LjAxIDAgMDA0LjcgMTMuNkw4NTUgODY0YzUuMS42IDkuNS0zLjcgOC45LTguOUw4NDUgNjk0Ljl6bS00NjMuNy05NC42YTguMDMgOC4wMyAwIDAwLTExLjMgMEwyMzYuMyA3MzMuOWwtNDMuNy00My43YTguMDEgOC4wMSAwIDAwLTEzLjYgNC43TDE2MC4xIDg1NWMtLjYgNS4xIDMuNyA5LjUgOC45IDguOUwzMjkuMiA4NDVjNi42LS44IDkuNC04LjkgNC43LTEzLjZMMjkwIDc4Ny42IDQyMy43IDY1NGMzLjEtMy4xIDMuMS04LjIgMC0xMS4zbC00Mi40LTQyLjR6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FullscreenOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FullscreenOutlined';
}
var _default = RefIcon;
