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
var _AimOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AimOutlined"));
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
var AimOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AimOutlined.default
    }));
};
/**![aim](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik05NTIgNDc0SDgyOS44QzgxMi41IDMyNy42IDY5Ni40IDIxMS41IDU1MCAxOTQuMlY3MmMwLTQuNC0zLjYtOC04LThoLTYwYy00LjQgMC04IDMuNi04IDh2MTIyLjJDMzI3LjYgMjExLjUgMjExLjUgMzI3LjYgMTk0LjIgNDc0SDcyYy00LjQgMC04IDMuNi04IDh2NjBjMCA0LjQgMy42IDggOCA4aDEyMi4yQzIxMS41IDY5Ni40IDMyNy42IDgxMi41IDQ3NCA4MjkuOFY5NTJjMCA0LjQgMy42IDggOCA4aDYwYzQuNCAwIDgtMy42IDgtOFY4MjkuOEM2OTYuNCA4MTIuNSA4MTIuNSA2OTYuNCA4MjkuOCA1NTBIOTUyYzQuNCAwIDgtMy42IDgtOHYtNjBjMC00LjQtMy42LTgtOC04ek01MTIgNzU2Yy0xMzQuOCAwLTI0NC0xMDkuMi0yNDQtMjQ0czEwOS4yLTI0NCAyNDQtMjQ0IDI0NCAxMDkuMiAyNDQgMjQ0LTEwOS4yIDI0NC0yNDQgMjQ0eiIgLz48cGF0aCBkPSJNNTEyIDM5MmMtMzIuMSAwLTYyLjEgMTIuNC04NC44IDM1LjItMjIuNyAyMi43LTM1LjIgNTIuNy0zNS4yIDg0LjhzMTIuNSA2Mi4xIDM1LjIgODQuOEM0NDkuOSA2MTkuNCA0ODAgNjMyIDUxMiA2MzJzNjIuMS0xMi41IDg0LjgtMzUuMkM2MTkuNCA1NzQuMSA2MzIgNTQ0IDYzMiA1MTJzLTEyLjUtNjIuMS0zNS4yLTg0LjhBMTE4LjU3IDExOC41NyAwIDAwNTEyIDM5MnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AimOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AimOutlined';
}
var _default = RefIcon;
