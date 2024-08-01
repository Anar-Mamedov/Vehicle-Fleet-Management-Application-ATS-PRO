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
var _FileDoneOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FileDoneOutlined"));
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
var FileDoneOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FileDoneOutlined.default
    }));
};
/**![file-done](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY4OCAzMTJ2LTQ4YzAtNC40LTMuNi04LTgtOEgyOTZjLTQuNCAwLTggMy42LTggOHY0OGMwIDQuNCAzLjYgOCA4IDhoMzg0YzQuNCAwIDgtMy42IDgtOHptLTM5MiA4OGMtNC40IDAtOCAzLjYtOCA4djQ4YzAgNC40IDMuNiA4IDggOGgxODRjNC40IDAgOC0zLjYgOC04di00OGMwLTQuNC0zLjYtOC04LThIMjk2em0zNzYgMTE2Yy0xMTkuMyAwLTIxNiA5Ni43LTIxNiAyMTZzOTYuNyAyMTYgMjE2IDIxNiAyMTYtOTYuNyAyMTYtMjE2LTk2LjctMjE2LTIxNi0yMTZ6bTEwNy41IDMyMy41Qzc1MC44IDg2OC4yIDcxMi42IDg4NCA2NzIgODg0cy03OC44LTE1LjgtMTA3LjUtNDQuNUM1MzUuOCA4MTAuOCA1MjAgNzcyLjYgNTIwIDczMnMxNS44LTc4LjggNDQuNS0xMDcuNUM1OTMuMiA1OTUuOCA2MzEuNCA1ODAgNjcyIDU4MHM3OC44IDE1LjggMTA3LjUgNDQuNUM4MDguMiA2NTMuMiA4MjQgNjkxLjQgODI0IDczMnMtMTUuOCA3OC44LTQ0LjUgMTA3LjV6TTc2MSA2NTZoLTQ0LjNjLTIuNiAwLTUgMS4yLTYuNSAzLjNsLTYzLjUgODcuOC0yMy4xLTMxLjlhNy45MiA3LjkyIDAgMDAtNi41LTMuM0g1NzNjLTYuNSAwLTEwLjMgNy40LTYuNSAxMi43bDczLjggMTAyLjFjMy4yIDQuNCA5LjcgNC40IDEyLjkgMGwxMTQuMi0xNThjMy45LTUuMy4xLTEyLjctNi40LTEyLjd6TTQ0MCA4NTJIMjA4VjE0OGg1NjB2MzQ0YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LThWMTA4YzAtMTcuNy0xNC4zLTMyLTMyLTMySDE2OGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2Nzg0YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDI3MmM0LjQgMCA4LTMuNiA4LTh2LTU2YzAtNC40LTMuNi04LTgtOHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FileDoneOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FileDoneOutlined';
}
var _default = RefIcon;
