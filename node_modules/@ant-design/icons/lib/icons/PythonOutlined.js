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
var _PythonOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PythonOutlined"));
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
var PythonOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PythonOutlined.default
    }));
};
/**![python](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTU1IDc5MC41YTI4LjUgMjguNSAwIDEwNTcgMCAyOC41IDI4LjUgMCAwMC01NyAwbS0xNDMtNTU3YTI4LjUgMjguNSAwIDEwNTcgMCAyOC41IDI4LjUgMCAwMC01NyAwIiAvPjxwYXRoIGQ9Ik04MjEuNTIgMjk3LjcxSDcyNi4zdi05NS4yM2MwLTQ5LjktNDAuNTgtOTAuNDgtOTAuNDgtOTAuNDhIMzg4LjE5Yy00OS45IDAtOTAuNDggNDAuNTctOTAuNDggOTAuNDh2OTUuMjNoLTk1LjIzYy00OS45IDAtOTAuNDggNDAuNTgtOTAuNDggOTAuNDh2MjQ3LjYyYzAgNDkuOSA0MC41NyA5MC40OCA5MC40OCA5MC40OGg5NS4yM3Y5NS4yM2MwIDQ5LjkgNDAuNTggOTAuNDggOTAuNDggOTAuNDhoMjQ3LjYyYzQ5LjkgMCA5MC40OC00MC41NyA5MC40OC05MC40OFY3MjYuM2g5NS4yM2M0OS45IDAgOTAuNDgtNDAuNTggOTAuNDgtOTAuNDhWMzg4LjE5YzAtNDkuOS00MC41Ny05MC40OC05MC40OC05MC40OE0yMDIuNDggNjY5LjE0YTMzLjM3IDMzLjM3IDAgMDEtMzMuMzQtMzMuMzNWMzg4LjE5YTMzLjM3IDMzLjM3IDAgMDEzMy4zNC0zMy4zM2gyNzguNTdhMjguNTMgMjguNTMgMCAwMDI4LjU3LTI4LjU3IDI4LjUzIDI4LjUzIDAgMDAtMjguNTctMjguNThoLTEyNi4ydi05NS4yM2EzMy4zNyAzMy4zNyAwIDAxMzMuMzQtMzMuMzRoMjQ3LjYyYTMzLjM3IDMzLjM3IDAgMDEzMy4zMyAzMy4zNHYyNTYuNDdhMjQuNDcgMjQuNDcgMCAwMS0yNC40NyAyNC40OEgzNzkuMzNjLTQ1LjA0IDAtODEuNjIgMzYuNjYtODEuNjIgODEuNjJ2MTA0LjF6bTY1Mi4zOC0zMy4zM2EzMy4zNyAzMy4zNyAwIDAxLTMzLjM0IDMzLjMzSDU0Mi45NWEyOC41MyAyOC41MyAwIDAwLTI4LjU3IDI4LjU3IDI4LjUzIDI4LjUzIDAgMDAyOC41NyAyOC41OGgxMjYuMnY5NS4yM2EzMy4zNyAzMy4zNyAwIDAxLTMzLjM0IDMzLjM0SDM4OC4xOWEzMy4zNyAzMy4zNyAwIDAxLTMzLjMzLTMzLjM0VjU2NS4wNWEyNC40NyAyNC40NyAwIDAxMjQuNDctMjQuNDhoMjY1LjM0YzQ1LjA0IDAgODEuNjItMzYuNjcgODEuNjItODEuNjJ2LTEwNC4xaDk1LjIzYTMzLjM3IDMzLjM3IDAgMDEzMy4zNCAzMy4zNHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PythonOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PythonOutlined';
}
var _default = RefIcon;
