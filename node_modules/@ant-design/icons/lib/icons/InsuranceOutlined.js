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
var _InsuranceOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/InsuranceOutlined"));
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
var InsuranceOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _InsuranceOutlined.default
    }));
};
/**![insurance](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ0MS42IDMwNi44TDQwMyAyODguNmE2LjEgNi4xIDAgMDAtOC40IDMuN2MtMTcuNSA1OC41LTQ1LjIgMTEwLjEtODIuMiAxNTMuNmE2LjA1IDYuMDUgMCAwMC0xLjIgNS42bDEzLjIgNDMuNWMxLjMgNC40IDcgNS43IDEwLjIgMi40IDcuNy04LjEgMTUuNC0xNi45IDIzLjEtMjZWNjU2YzAgNC40IDMuNiA4IDggOEg0MDNjNC40IDAgOC0zLjYgOC04VjM5My4xYTQyOS4yIDQyOS4yIDAgMDAzMy42LTc5YzEtMi45LS4zLTYtMy03LjN6bTI2LjggOS4ydjEyNy4yYzAgNC40IDMuNiA4IDggOGg2NS45djE4LjZoLTk0LjljLTQuNCAwLTggMy42LTggOHYzNS42YzAgNC40IDMuNiA4IDggOGg1NS4xYy0xOS4xIDMwLjgtNDIuNCA1NS43LTcxIDc2YTYgNiAwIDAwLTEuNiA4LjFsMjIuOCAzNi41YzEuOSAzLjEgNi4yIDMuOCA4LjkgMS40IDMxLjYtMjYuOCA1OC43LTYyLjkgODAuNi0xMDcuNnYxMjBjMCA0LjQgMy42IDggOCA4aDM2LjJjNC40IDAgOC0zLjYgOC04VjUzNmMyMS4zIDQxLjcgNDcuNSA3Ny41IDc4LjEgMTA2LjkgMi42IDIuNSA2LjggMi4xIDguOS0uN2wyNi4zLTM1LjNjMi0yLjcgMS40LTYuNS0xLjItOC40LTMwLjUtMjIuNi01NC4yLTQ3LjgtNzIuMy03Ni45aDU5YzQuNCAwIDgtMy42IDgtOFY0NzhjMC00LjQtMy42LTgtOC04aC05OC44di0xOC42aDY2LjdjNC40IDAgOC0zLjYgOC04VjMxNmMwLTQuNC0zLjYtOC04LThINDc2LjRjLTQuNCAwLTggMy42LTggOHptNTEuNSA0Mi44aDk3Ljl2NDEuNmgtOTcuOXYtNDEuNnptMzQ3LTE4OC45TDUyNy4xIDU0LjFDNTIzIDUyLjcgNTE3LjUgNTIgNTEyIDUycy0xMSAuNy0xNS4xIDIuMUwxNTcuMSAxNjkuOWMtOC4zIDIuOC0xNS4xIDEyLjQtMTUuMSAyMS4ydjQ4Mi40YzAgOC44IDUuNyAyMC40IDEyLjYgMjUuOUw0OTkuMyA5NjhjMy41IDIuNyA4IDQuMSAxMi42IDQuMXM5LjItMS40IDEyLjYtNC4xbDM0NC43LTI2OC42YzYuOS01LjQgMTIuNi0xNyAxMi42LTI1LjlWMTkxLjFjLjItOC44LTYuNi0xOC4zLTE0LjktMjEuMnpNODEwIDY1NC4zTDUxMiA4ODYuNSAyMTQgNjU0LjNWMjI2LjdsMjk4LTEwMS42IDI5OCAxMDEuNnY0MjcuNnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(InsuranceOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'InsuranceOutlined';
}
var _default = RefIcon;
