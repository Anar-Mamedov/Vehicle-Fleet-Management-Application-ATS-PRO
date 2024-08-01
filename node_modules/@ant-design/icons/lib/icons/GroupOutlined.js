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
var _GroupOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/GroupOutlined"));
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
var GroupOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _GroupOutlined.default
    }));
};
/**![group](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik05MTIgODIwLjFWMjAzLjljMjgtOS45IDQ4LTM2LjYgNDgtNjcuOSAwLTM5LjgtMzIuMi03Mi03Mi03Mi0zMS4zIDAtNTggMjAtNjcuOSA0OEgyMDMuOUMxOTQgODQgMTY3LjMgNjQgMTM2IDY0Yy0zOS44IDAtNzIgMzIuMi03MiA3MiAwIDMxLjMgMjAgNTggNDggNjcuOXY2MTYuMkM4NCA4MzAgNjQgODU2LjcgNjQgODg4YzAgMzkuOCAzMi4yIDcyIDcyIDcyIDMxLjMgMCA1OC0yMCA2Ny45LTQ4aDYxNi4yYzkuOSAyOCAzNi42IDQ4IDY3LjkgNDggMzkuOCAwIDcyLTMyLjIgNzItNzIgMC0zMS4zLTIwLTU4LTQ4LTY3Ljl6TTg4OCAxMTJjMTMuMyAwIDI0IDEwLjcgMjQgMjRzLTEwLjcgMjQtMjQgMjQtMjQtMTAuNy0yNC0yNCAxMC43LTI0IDI0LTI0ek0xMzYgOTEyYy0xMy4zIDAtMjQtMTAuNy0yNC0yNHMxMC43LTI0IDI0LTI0IDI0IDEwLjcgMjQgMjQtMTAuNyAyNC0yNCAyNHptMC03NTJjLTEzLjMgMC0yNC0xMC43LTI0LTI0czEwLjctMjQgMjQtMjQgMjQgMTAuNyAyNCAyNC0xMC43IDI0LTI0IDI0em03MDQgNjgwSDE4NFYxODRoNjU2djY1NnptNDggNzJjLTEzLjMgMC0yNC0xMC43LTI0LTI0czEwLjctMjQgMjQtMjQgMjQgMTAuNyAyNCAyNC0xMC43IDI0LTI0IDI0eiIgLz48cGF0aCBkPSJNMjg4IDQ3NGg0NDhjOC44IDAgMTYtNy4yIDE2LTE2VjI4MmMwLTguOC03LjItMTYtMTYtMTZIMjg4Yy04LjggMC0xNiA3LjItMTYgMTZ2MTc2YzAgOC44IDcuMiAxNiAxNiAxNnptNTYtMTM2aDMzNnY2NEgzNDR2LTY0em0tNTYgNDIwaDQ0OGM4LjggMCAxNi03LjIgMTYtMTZWNTY2YzAtOC44LTcuMi0xNi0xNi0xNkgyODhjLTguOCAwLTE2IDcuMi0xNiAxNnYxNzZjMCA4LjggNy4yIDE2IDE2IDE2em01Ni0xMzZoMzM2djY0SDM0NHYtNjR6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(GroupOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'GroupOutlined';
}
var _default = RefIcon;
