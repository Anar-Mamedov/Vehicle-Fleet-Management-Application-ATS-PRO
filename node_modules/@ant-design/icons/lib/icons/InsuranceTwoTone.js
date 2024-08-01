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
var _InsuranceTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/InsuranceTwoTone"));
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
var InsuranceTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _InsuranceTwoTone.default
    }));
};
/**![insurance](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2Ni45IDE2OS45TDUyNy4xIDU0LjFDNTIzIDUyLjcgNTE3LjUgNTIgNTEyIDUycy0xMSAuNy0xNS4xIDIuMUwxNTcuMSAxNjkuOWMtOC4zIDIuOC0xNS4xIDEyLjQtMTUuMSAyMS4ydjQ4Mi40YzAgOC44IDUuNyAyMC40IDEyLjYgMjUuOUw0OTkuMyA5NjhjMy41IDIuNyA4IDQuMSAxMi42IDQuMXM5LjItMS40IDEyLjYtNC4xbDM0NC43LTI2OC42YzYuOS01LjQgMTIuNi0xNyAxMi42LTI1LjlWMTkxLjFjLjItOC44LTYuNi0xOC4zLTE0LjktMjEuMnpNODEwIDY1NC4zTDUxMiA4ODYuNSAyMTQgNjU0LjNWMjI2LjdsMjk4LTEwMS42IDI5OCAxMDEuNnY0MjcuNnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTUyMS45IDM1OC44aDk3Ljl2NDEuNmgtOTcuOXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTIxNCAyMjYuN3Y0MjcuNmwyOTggMjMyLjIgMjk4LTIzMi4yVjIyNi43TDUxMiAxMjUuMSAyMTQgMjI2Ljd6TTQxMy4zIDY1NmgtLjJjMCA0LjQtMy42IDgtOCA4aC0zNy4zYy00LjQgMC04LTMuNi04LThWNDcxLjRjLTcuNyA5LjItMTUuNCAxNy45LTIzLjEgMjZhNi4wNCA2LjA0IDAgMDEtMTAuMi0yLjRsLTEzLjItNDMuNWMtLjYtMi0uMi00LjEgMS4yLTUuNiAzNy00My40IDY0LjctOTUuMSA4Mi4yLTE1My42IDEuMS0zLjUgNS01LjMgOC40LTMuN2wzOC42IDE4LjNjMi43IDEuMyA0LjEgNC40IDMuMiA3LjJhNDI5LjIgNDI5LjIgMCAwMS0zMy42IDc5VjY1NnptMjU3LjktMzQwdjEyNy4yYzAgNC40LTMuNiA4LTggOGgtNjYuN3YxOC42aDk4LjhjNC40IDAgOCAzLjYgOCA4djM1LjZjMCA0LjQtMy42IDgtOCA4aC01OWMxOC4xIDI5LjEgNDEuOCA1NC4zIDcyLjMgNzYuOSAyLjYgMi4xIDMuMiA1LjkgMS4yIDguNWwtMjYuMyAzNS4zYTUuOTIgNS45MiAwIDAxLTguOS43Yy0zMC42LTI5LjMtNTYuOC02NS4yLTc4LjEtMTA2LjlWNjU2YzAgNC40LTMuNiA4LTggOGgtMzYuMmMtNC40IDAtOC0zLjYtOC04VjUzNmMtMjIgNDQuNy00OSA4MC44LTgwLjYgMTA3LjZhNi4zOCA2LjM4IDAgMDEtNC44IDEuNGMtMS43LS4zLTMuMi0xLjMtNC4xLTIuOEw0MzIgNjA1LjdhNiA2IDAgMDExLjYtOC4xYzI4LjYtMjAuMyA1MS45LTQ1LjIgNzEtNzZoLTU1LjFjLTQuNCAwLTgtMy42LTgtOFY0NzhjMC00LjQgMy42LTggOC04aDk0Ljl2LTE4LjZoLTY1LjljLTQuNCAwLTgtMy42LTgtOFYzMTZjMC00LjQgMy42LTggOC04aDE4NC43YzQuNCAwIDggMy42IDggOHoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTQ0My43IDMwNi45bC0zOC42LTE4LjNjLTMuNC0xLjYtNy4zLjItOC40IDMuNy0xNy41IDU4LjUtNDUuMiAxMTAuMi04Mi4yIDE1My42YTUuNyA1LjcgMCAwMC0xLjIgNS42bDEzLjIgNDMuNWMxLjQgNC41IDcgNS44IDEwLjIgMi40IDcuNy04LjEgMTUuNC0xNi44IDIzLjEtMjZWNjU2YzAgNC40IDMuNiA4IDggOGgzNy4zYzQuNCAwIDgtMy42IDgtOGguMlYzOTMuMWE0MjkuMiA0MjkuMiAwIDAwMzMuNi03OWMuOS0yLjgtLjUtNS45LTMuMi03LjJ6bTI2LjggOS4xdjEyNy40YzAgNC40IDMuNiA4IDggOGg2NS45VjQ3MGgtOTQuOWMtNC40IDAtOCAzLjYtOCA4djM1LjZjMCA0LjQgMy42IDggOCA4aDU1LjFjLTE5LjEgMzAuOC00Mi40IDU1LjctNzEgNzZhNiA2IDAgMDAtMS42IDguMWwyMi44IDM2LjVjLjkgMS41IDIuNCAyLjUgNC4xIDIuOCAxLjcuMyAzLjUtLjIgNC44LTEuNCAzMS42LTI2LjggNTguNi02Mi45IDgwLjYtMTA3LjZ2MTIwYzAgNC40IDMuNiA4IDggOGgzNi4yYzQuNCAwIDgtMy42IDgtOFY1MzUuOWMyMS4zIDQxLjcgNDcuNSA3Ny42IDc4LjEgMTA2LjkgMi42IDIuNSA2LjcgMi4yIDguOS0uN2wyNi4zLTM1LjNjMi0yLjYgMS40LTYuNC0xLjItOC41LTMwLjUtMjIuNi01NC4yLTQ3LjgtNzIuMy03Ni45aDU5YzQuNCAwIDgtMy42IDgtOHYtMzUuNmMwLTQuNC0zLjYtOC04LThoLTk4Ljh2LTE4LjZoNjYuN2M0LjQgMCA4LTMuNiA4LThWMzE2YzAtNC40LTMuNi04LTgtOEg0NzguNWMtNC40IDAtOCAzLjYtOCA4em01MS40IDQyLjhoOTcuOXY0MS42aC05Ny45di00MS42eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(InsuranceTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'InsuranceTwoTone';
}
var _default = RefIcon;
