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
var _CloudSyncOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CloudSyncOutlined"));
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
var CloudSyncOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CloudSyncOutlined.default
    }));
};
/**![cloud-sync](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgxMS40IDM2OC45Qzc2NS42IDI0OCA2NDguOSAxNjIgNTEyLjIgMTYyUzI1OC44IDI0Ny45IDIxMyAzNjguOEMxMjYuOSAzOTEuNSA2My41IDQ3MC4yIDY0IDU2My42IDY0LjYgNjY4IDE0NS42IDc1Mi45IDI0Ny42IDc2MmM0LjcuNCA4LjctMy4zIDguNy04di02MC40YzAtNC0zLTcuNC03LTcuOS0yNy0zLjQtNTIuNS0xNS4yLTcyLjEtMzQuNS0yNC0yMy41LTM3LjItNTUuMS0zNy4yLTg4LjYgMC0yOCA5LjEtNTQuNCAyNi4yLTc2LjQgMTYuNy0yMS40IDQwLjItMzYuOSA2Ni4xLTQzLjdsMzcuOS0xMCAxMy45LTM2LjdjOC42LTIyLjggMjAuNi00NC4yIDM1LjctNjMuNSAxNC45LTE5LjIgMzIuNi0zNiA1Mi40LTUwIDQxLjEtMjguOSA4OS41LTQ0LjIgMTQwLTQ0LjJzOTguOSAxNS4zIDE0MCA0NC4zYzE5LjkgMTQgMzcuNSAzMC44IDUyLjQgNTAgMTUuMSAxOS4zIDI3LjEgNDAuNyAzNS43IDYzLjVsMTMuOCAzNi42IDM3LjggMTBjNTQuMiAxNC40IDkyLjEgNjMuNyA5Mi4xIDEyMCAwIDMzLjYtMTMuMiA2NS4xLTM3LjIgODguNi0xOS41IDE5LjItNDQuOSAzMS4xLTcxLjkgMzQuNS00IC41LTYuOSAzLjktNi45IDcuOVY3NTRjMCA0LjcgNC4xIDguNCA4LjggOCAxMDEuNy05LjIgMTgyLjUtOTQgMTgzLjItMTk4LjIuNi05My40LTYyLjctMTcyLjEtMTQ4LjYtMTk0Ljl6IiAvPjxwYXRoIGQ9Ik0zNzYuOSA2NTYuNGMxLjgtMzMuNSAxNS43LTY0LjcgMzkuNS04OC42IDI1LjQtMjUuNSA2MC0zOS44IDk2LTM5LjggMzYuMiAwIDcwLjMgMTQuMSA5NiAzOS44IDEuNCAxLjQgMi43IDIuOCA0LjEgNC4zbC0yNSAxOS42YTggOCAwIDAwMyAxNC4xbDk4LjIgMjRjNSAxLjIgOS45LTIuNiA5LjktNy43bC41LTEwMS4zYzAtNi43LTcuNi0xMC41LTEyLjktNi4zTDY2MyA1MzIuN2MtMzYuNi00Mi05MC40LTY4LjYtMTUwLjUtNjguNi0xMDcuNCAwLTE5NSA4NS4xLTE5OS40IDE5MS43LS4yIDQuNSAzLjQgOC4zIDggOC4zSDM2OWM0LjItLjEgNy43LTMuNCA3LjktNy43ek03MDMgNjY0aC00Ny45Yy00LjIgMC03LjcgMy4zLTggNy42LTEuOCAzMy41LTE1LjcgNjQuNy0zOS41IDg4LjYtMjUuNCAyNS41LTYwIDM5LjgtOTYgMzkuOC0zNi4yIDAtNzAuMy0xNC4xLTk2LTM5LjgtMS40LTEuNC0yLjctMi44LTQuMS00LjNsMjUtMTkuNmE4IDggMCAwMC0zLTE0LjFsLTk4LjItMjRjLTUtMS4yLTkuOSAyLjYtOS45IDcuN2wtLjQgMTAxLjRjMCA2LjcgNy42IDEwLjUgMTIuOSA2LjNsMjMuMi0xOC4yYzM2LjYgNDIgOTAuNCA2OC42IDE1MC41IDY4LjYgMTA3LjQgMCAxOTUtODUuMSAxOTkuNC0xOTEuNy4yLTQuNS0zLjQtOC4zLTgtOC4zeiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CloudSyncOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CloudSyncOutlined';
}
var _default = RefIcon;
