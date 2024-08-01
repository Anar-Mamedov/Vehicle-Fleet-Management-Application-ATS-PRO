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
var _PinterestFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PinterestFilled"));
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
var PinterestFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PinterestFilled.default
    }));
};
/**![pinterest](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTEyIDY0QzI2NC45NyA2NCA2NCAyNjQuOTcgNjQgNTEyYzAgMTkyLjUzIDEyMi4wOCAzNTcuMDQgMjkyLjg4IDQyMC4yOC00LjkyLTQzLjg2LTQuMTQtMTE1LjY4IDMuOTctMTUwLjQ2IDcuNi0zMi42NiA0OS4xMS0yMDguMTYgNDkuMTEtMjA4LjE2cy0xMi41My0yNS4xLTEyLjUzLTYyLjE2YzAtNTguMjQgMzMuNzQtMTAxLjcgNzUuNzctMTAxLjcgMzUuNzQgMCA1Mi45NyAyNi44MyA1Mi45NyA1OC45OCAwIDM1Ljk2LTIyLjg1IDg5LjY2LTM0LjcgMTM5LjQzLTkuODcgNDEuNyAyMC45MSA3NS43IDYyLjAyIDc1LjcgNzQuNDMgMCAxMzEuNjQtNzguNSAxMzEuNjQtMTkxLjc3IDAtMTAwLjI3LTcyLjAzLTE3MC4zOC0xNzQuOS0xNzAuMzgtMTE5LjE1IDAtMTg5LjA4IDg5LjM4LTE4OS4wOCAxODEuNzUgMCAzNS45OCAxMy44NSA3NC41OCAzMS4xNiA5NS41OCAzLjQyIDQuMTYgMy45MiA3Ljc4IDIuOSAxMi0zLjE3IDEzLjIyLTEwLjIyIDQxLjY3LTExLjYzIDQ3LjUtMS44MiA3LjY4LTYuMDcgOS4yOC0xNCA1LjU5LTUyLjMtMjQuMzYtODUtMTAwLjgxLTg1LTE2Mi4yNSAwLTEzMi4xIDk1Ljk2LTI1My40MyAyNzYuNzEtMjUzLjQzIDE0NS4yOSAwIDI1OC4xOCAxMDMuNSAyNTguMTggMjQxLjg4IDAgMTQ0LjM0LTkxLjAyIDI2MC40OS0yMTcuMzEgMjYwLjQ5LTQyLjQ0IDAtODIuMzMtMjIuMDUtOTUuOTctNDguMSAwIDAtMjEgNzkuOTYtMjYuMSA5OS41Ni04LjgyIDMzLjktNDYuNTUgMTA0LjEzLTY1LjQ5IDEzNi4wM0E0NDYuMTYgNDQ2LjE2IDAgMDA1MTIgOTYwYzI0Ny4wNCAwIDQ0OC0yMDAuOTcgNDQ4LTQ0OFM3NTkuMDQgNjQgNTEyIDY0IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PinterestFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PinterestFilled';
}
var _default = RefIcon;
