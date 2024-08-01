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
var _FilePptTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FilePptTwoTone"));
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
var FilePptTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FilePptTwoTone.default
    }));
};
/**![file-ppt](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ2NC41IDUxNi4ydjEwOC40aDM4LjljNDQuNyAwIDcxLjItMTAuOSA3MS4yLTU0LjMgMC0zNC40LTIwLjEtNTQuMS01My45LTU0LjFoLTU2LjJ6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik01MzQgMzUyVjEzNkgyMzJ2NzUyaDU2MFYzOTRINTc2YTQyIDQyIDAgMDEtNDItNDJ6bTkwIDIxOC40YzAgNTUuMi0zNi44IDk0LjEtOTYuMiA5NC4xaC02My4zVjc2MGMwIDQuNC0zLjYgOC04IDhINDI0Yy00LjQgMC04LTMuNi04LThWNDg0YzAtNC40IDMuNi04IDgtOHYuMWgxMDRjNTkuNyAwIDk2IDM5LjggOTYgOTQuM3oiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTg1NC42IDI4OC42TDYzOS40IDczLjRjLTYtNi0xNC4xLTkuNC0yMi42LTkuNEgxOTJjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjgzMmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NDBjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzExLjNjMC04LjUtMy40LTE2LjctOS40LTIyLjd6TTYwMiAxMzcuOEw3OTAuMiAzMjZINjAyVjEzNy44ek03OTIgODg4SDIzMlYxMzZoMzAydjIxNmE0MiA0MiAwIDAwNDIgNDJoMjE2djQ5NHoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTQyNCA0NzYuMWMtNC40LS4xLTggMy41LTggNy45djI3NmMwIDQuNCAzLjYgOCA4IDhoMzIuNWM0LjQgMCA4LTMuNiA4LTh2LTk1LjVoNjMuM2M1OS40IDAgOTYuMi0zOC45IDk2LjItOTQuMSAwLTU0LjUtMzYuMy05NC4zLTk2LTk0LjNINDI0em0xNTAuNiA5NC4yYzAgNDMuNC0yNi41IDU0LjMtNzEuMiA1NC4zaC0zOC45VjUxNi4yaDU2LjJjMzMuOCAwIDUzLjkgMTkuNyA1My45IDU0LjF6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FilePptTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FilePptTwoTone';
}
var _default = RefIcon;
