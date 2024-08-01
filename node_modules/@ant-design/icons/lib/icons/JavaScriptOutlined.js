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
var _JavaScriptOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/JavaScriptOutlined"));
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
var JavaScriptOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _JavaScriptOutlined.default
    }));
};
/**![java-script](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDE2IDE3NkgyNTUuNTR2NDI1LjYyYzAgMTA1LjMtMzYuMTYgMTM0LjcxLTk5LjEgMTM0LjcxLTI5LjUgMC01Ni4wNS01LjA1LTc2LjcyLTEyLjE0TDYzIDg0OC43OUM5Mi40OCA4NTguOTEgMTM3LjczIDg2NSAxNzMuMTMgODY1IDMxNy42MyA4NjUgNDE2IDc5Ny4xNiA0MTYgNjAyLjY2em0zNDkuNDktMTZDNjEwLjI2IDE2MCA1MTIgMjQ4LjEzIDUxMiAzNjQuNmMwIDEwMC4zMiA3NS42NyAxNjMuMTMgMTg1LjcgMjAzLjY0IDc5LjU3IDI4LjM2IDExMS4wMyA1My43IDExMS4wMyA5NS4yMiAwIDQ1LjU3LTM2LjM2IDc0Ljk2LTEwNS4xMyA3NC45Ni02My44NyAwLTEyMS44NS0yMS4zMS0xNjEuMTUtNDIuNTh2LS4wNEw1MTIgODIyLjQzQzU0OS4zNiA4NDMuNzMgNjE5LjEyIDg2NSA2OTQuNzQgODY1IDg3Ni41MiA4NjUgOTYxIDc2Ny43NSA5NjEgNjUzLjNjMC05Ny4yNS01NC4wNC0xNjAuMDQtMTcwLjk0LTIwNC42My04Ni40Ny0zNC40NC0xMjIuODEtNTMuNjctMTIyLjgxLTk3LjIzIDAtMzQuNDUgMzEuNDUtNjUuODQgOTYuMy02NS44NCA2My44MyAwIDEwNy43MyAyMS40NSAxMzMuMyAzNC42NGwzOC4zNC0xMjguMTlDODk1LjEgMTc0LjQ2IDg0MS4xMSAxNjAgNzY1LjUgMTYwIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(JavaScriptOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'JavaScriptOutlined';
}
var _default = RefIcon;
