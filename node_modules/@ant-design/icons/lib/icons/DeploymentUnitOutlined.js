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
var _DeploymentUnitOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DeploymentUnitOutlined"));
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
var DeploymentUnitOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DeploymentUnitOutlined.default
    }));
};
/**![deployment-unit](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4OC4zIDY5My4yYy00Mi41LTI0LjYtOTQuMy0xOC0xMjkuMiAxMi44bC01My0zMC43VjUyMy42YzAtMTUuNy04LjQtMzAuMy0yMi0zOC4xbC0xMzYtNzguM3YtNjcuMWM0NC4yLTE1IDc2LTU2LjggNzYtMTA2LjEgMC02MS45LTUwLjEtMTEyLTExMi0xMTJzLTExMiA1MC4xLTExMiAxMTJjMCA0OS4zIDMxLjggOTEuMSA3NiAxMDYuMXY2Ny4xbC0xMzYgNzguM2MtMTMuNiA3LjgtMjIgMjIuNC0yMiAzOC4xdjE1MS42bC01MyAzMC43Yy0zNC45LTMwLjgtODYuOC0zNy40LTEyOS4yLTEyLjgtNTMuNSAzMS03MS43IDk5LjQtNDEgMTUyLjkgMzAuOCA1My41IDk4LjkgNzEuOSAxNTIuMiA0MSA0Mi41LTI0LjYgNjIuNy03MyA1My42LTExOC44bDQ4LjctMjguMyAxNDAuNiA4MWM2LjggMy45IDE0LjQgNS45IDIyIDUuOXMxNS4yLTIgMjItNS45TDY3NC41IDc0MGw0OC43IDI4LjNjLTkuMSA0NS43IDExLjIgOTQuMiA1My42IDExOC44IDUzLjMgMzAuOSAxMjEuNSAxMi42IDE1Mi4yLTQxIDMwLjgtNTMuNiAxMi42LTEyMi00MC43LTE1Mi45em0tNjczIDEzOC40YTQ3LjYgNDcuNiAwIDAxLTY1LjItMTcuNmMtMTMuMi0yMi45LTUuNC01Mi4zIDE3LjUtNjUuNWE0Ny42IDQ3LjYgMCAwMTY1LjIgMTcuNmMxMy4yIDIyLjkgNS40IDUyLjMtMTcuNSA2NS41ek01MjIgNDYzLjh6TTQ2NCAyMzRhNDguMDEgNDguMDEgMCAwMTk2IDAgNDguMDEgNDguMDEgMCAwMS05NiAwem0xNzAgNDQ2LjJsLTEyMiA3MC4zLTEyMi03MC4zVjUzOS44bDEyMi03MC4zIDEyMiA3MC4zdjE0MC40em0yMzkuOSAxMzMuOWMtMTMuMiAyMi45LTQyLjQgMzAuOC02NS4yIDE3LjYtMjIuOC0xMy4yLTMwLjctNDIuNi0xNy41LTY1LjVzNDIuNC0zMC44IDY1LjItMTcuNmMyMi45IDEzLjIgMzAuNyA0Mi41IDE3LjUgNjUuNXoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DeploymentUnitOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DeploymentUnitOutlined';
}
var _default = RefIcon;
