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
var _EnvironmentOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/EnvironmentOutlined"));
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
var EnvironmentOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _EnvironmentOutlined.default
    }));
};
/**![environment](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg1NC42IDI4OS4xYTM2Mi40OSAzNjIuNDkgMCAwMC03OS45LTExNS43IDM3MC44MyAzNzAuODMgMCAwMC0xMTguMi03Ny44QzYxMC43IDc2LjYgNTYyLjEgNjcgNTEyIDY3Yy01MC4xIDAtOTguNyA5LjYtMTQ0LjUgMjguNS00NC4zIDE4LjMtODQgNDQuNS0xMTguMiA3Ny44QTM2My42IDM2My42IDAgMDAxNjkuNCAyODljLTE5LjUgNDUtMjkuNCA5Mi44LTI5LjQgMTQyIDAgNzAuNiAxNi45IDE0MC45IDUwLjEgMjA4LjcgMjYuNyA1NC41IDY0IDEwNy42IDExMSAxNTguMSA4MC4zIDg2LjIgMTY0LjUgMTM4LjkgMTg4LjQgMTUzYTQzLjkgNDMuOSAwIDAwMjIuNCA2LjFjNy44IDAgMTUuNS0yIDIyLjQtNi4xIDIzLjktMTQuMSAxMDguMS02Ni44IDE4OC40LTE1MyA0Ny01MC40IDg0LjMtMTAzLjYgMTExLTE1OC4xQzg2Ny4xIDU3MiA4ODQgNTAxLjggODg0IDQzMS4xYzAtNDkuMi05LjktOTctMjkuNC0xNDJ6TTUxMiA4ODAuMmMtNjUuOS00MS45LTMwMC0yMDcuOC0zMDAtNDQ5LjEgMC03Ny45IDMxLjEtMTUxLjEgODcuNi0yMDYuM0MzNTYuMyAxNjkuNSA0MzEuNyAxMzkgNTEyIDEzOXMxNTUuNyAzMC41IDIxMi40IDg1LjlDNzgwLjkgMjgwIDgxMiAzNTMuMiA4MTIgNDMxLjFjMCAyNDEuMy0yMzQuMSA0MDcuMi0zMDAgNDQ5LjF6bTAtNjE3LjJjLTk3LjIgMC0xNzYgNzguOC0xNzYgMTc2czc4LjggMTc2IDE3NiAxNzYgMTc2LTc4LjggMTc2LTE3Ni03OC44LTE3Ni0xNzYtMTc2em03OS4yIDI1NS4yQTExMS42IDExMS42IDAgMDE1MTIgNTUxYy0yOS45IDAtNTgtMTEuNy03OS4yLTMyLjhBMTExLjYgMTExLjYgMCAwMTQwMCA0MzljMC0yOS45IDExLjctNTggMzIuOC03OS4yQzQ1NCAzMzguNiA0ODIuMSAzMjcgNTEyIDMyN2MyOS45IDAgNTggMTEuNiA3OS4yIDMyLjhDNjEyLjQgMzgxIDYyNCA0MDkuMSA2MjQgNDM5YzAgMjkuOS0xMS42IDU4LTMyLjggNzkuMnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(EnvironmentOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'EnvironmentOutlined';
}
var _default = RefIcon;
