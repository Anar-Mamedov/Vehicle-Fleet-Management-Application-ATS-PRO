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
var _CloudUploadOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CloudUploadOutlined"));
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
var CloudUploadOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CloudUploadOutlined.default
    }));
};
/**![cloud-upload](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxOC4zIDQ1OWE4IDggMCAwMC0xMi42IDBsLTExMiAxNDEuN2E3Ljk4IDcuOTggMCAwMDYuMyAxMi45aDczLjlWODU2YzAgNC40IDMuNiA4IDggOGg2MGM0LjQgMCA4LTMuNiA4LThWNjEzLjdINjI0YzYuNyAwIDEwLjQtNy43IDYuMy0xMi45TDUxOC4zIDQ1OXoiIC8+PHBhdGggZD0iTTgxMS40IDM2Ni43Qzc2NS42IDI0NS45IDY0OC45IDE2MCA1MTIuMiAxNjBTMjU4LjggMjQ1LjggMjEzIDM2Ni42QzEyNy4zIDM4OS4xIDY0IDQ2Ny4yIDY0IDU2MGMwIDExMC41IDg5LjUgMjAwIDE5OS45IDIwMEgzMDRjNC40IDAgOC0zLjYgOC04di02MGMwLTQuNC0zLjYtOC04LThoLTQwLjFjLTMzLjcgMC02NS40LTEzLjQtODktMzcuNy0yMy41LTI0LjItMzYtNTYuOC0zNC45LTkwLjYuOS0yNi40IDkuOS01MS4yIDI2LjItNzIuMSAxNi43LTIxLjMgNDAuMS0zNi44IDY2LjEtNDMuN2wzNy45LTkuOSAxMy45LTM2LjZjOC42LTIyLjggMjAuNi00NC4xIDM1LjctNjMuNGEyNDUuNiAyNDUuNiAwIDAxNTIuNC00OS45YzQxLjEtMjguOSA4OS41LTQ0LjIgMTQwLTQ0LjJzOTguOSAxNS4zIDE0MCA0NC4yYzE5LjkgMTQgMzcuNSAzMC44IDUyLjQgNDkuOSAxNS4xIDE5LjMgMjcuMSA0MC43IDM1LjcgNjMuNGwxMy44IDM2LjUgMzcuOCAxMEM4NDYuMSA0NTQuNSA4ODQgNTAzLjggODg0IDU2MGMwIDMzLjEtMTIuOSA2NC4zLTM2LjMgODcuN2ExMjMuMDcgMTIzLjA3IDAgMDEtODcuNiAzNi4zSDcyMGMtNC40IDAtOCAzLjYtOCA4djYwYzAgNC40IDMuNiA4IDggOGg0MC4xQzg3MC41IDc2MCA5NjAgNjcwLjUgOTYwIDU2MGMwLTkyLjctNjMuMS0xNzAuNy0xNDguNi0xOTMuM3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CloudUploadOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CloudUploadOutlined';
}
var _default = RefIcon;
