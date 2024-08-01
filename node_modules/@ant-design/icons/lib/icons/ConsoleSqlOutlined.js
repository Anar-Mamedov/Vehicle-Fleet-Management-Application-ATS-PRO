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
var _ConsoleSqlOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ConsoleSqlOutlined"));
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
var ConsoleSqlOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ConsoleSqlOutlined.default
    }));
};
/**![console-sql](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik0zMDEuMyA0OTYuN2MtMjMuOCAwLTQwLjItMTAuNS00MS42LTI2LjlIMjA1Yy45IDQzLjQgMzYuOSA3MC4zIDkzLjkgNzAuMyA1OS4xIDAgOTUtMjguNCA5NS03NS41IDAtMzUuOC0yMC01NS45LTY0LjUtNjQuNWwtMjkuMS01LjZjLTIzLjgtNC43LTMzLjgtMTEuOS0zMy44LTI0LjIgMC0xNSAxMy4zLTI0LjUgMzMuNC0yNC41IDIwLjEgMCAzNS4zIDExLjEgMzYuNiAyN2g1M2MtLjktNDEuNy0zNy41LTcwLjMtOTAuMy03MC4zLTU0LjQgMC04OS43IDI4LjktODkuNyA3MyAwIDM1LjUgMjEuMiA1OCA2Mi41IDY1LjhsMjkuNyA1LjljMjUuOCA1LjIgMzUuNiAxMS45IDM1LjYgMjQuNC4xIDE0LjctMTQuNSAyNS4xLTM2IDI1LjF6IiAvPjxwYXRoIGQ9Ik05MjggMTQwSDk2Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY0OTZjMCAxNy43IDE0LjMgMzIgMzIgMzJoMzgwdjExMkgzMDRjLTguOCAwLTE2IDcuMi0xNiAxNnY0OGMwIDQuNCAzLjYgOCA4IDhoNDMyYzQuNCAwIDgtMy42IDgtOHYtNDhjMC04LjgtNy4yLTE2LTE2LTE2SDU0OFY3MDBoMzgwYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE3MmMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTQwIDQ4OEgxMzZWMjEyaDc1MnY0MTZ6IiAvPjxwYXRoIGQ9Ik04MjguNSA0ODYuN2gtOTUuOFYzMDguNWgtNTcuNFY1MzRoMTUzLjJ6bS0yOTguNiA1My40YzE0LjEgMCAyNy4yLTIgMzkuMS01LjhsMTMuMyAyMC4zaDUzLjNMNjA3LjkgNTExYzIxLjEtMjAgMzMtNTEuMSAzMy04OS44IDAtNzMuMy00My4zLTExOC44LTExMC45LTExOC44cy0xMTEuMiA0NS4zLTExMS4yIDExOC44Yy0uMSA3My43IDQzIDExOC45IDExMS4xIDExOC45em0wLTE5MGMzMS42IDAgNTIuNyAyNy43IDUyLjcgNzEuMSAwIDE2LjctMy42IDMwLjYtMTAgNDAuNWwtNS4yLTYuOWgtNDguOEw1NDIgNDkxYy0zLjkuOS04IDEuNC0xMi4yIDEuNC0zMS43IDAtNTIuOC0yNy41LTUyLjgtNzEuMi4xLTQzLjYgMjEuMi03MS4xIDUyLjktNzEuMXoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ConsoleSqlOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ConsoleSqlOutlined';
}
var _default = RefIcon;
