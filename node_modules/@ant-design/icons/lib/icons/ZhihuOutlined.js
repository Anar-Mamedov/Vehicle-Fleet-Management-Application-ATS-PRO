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
var _ZhihuOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ZhihuOutlined"));
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
var ZhihuOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ZhihuOutlined.default
    }));
};
/**![zhihu](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU2NC43IDIzMC4xVjgwM2g2MGwyNS4yIDcxLjRMNzU2LjMgODAzaDEzMS41VjIzMC4xSDU2NC43em0yNDcuNyA0OTdoLTU5LjlsLTc1LjEgNTAuNC0xNy44LTUwLjRoLTE4VjMwOC4zaDE3MC43djQxOC44ek01MjYuMSA0ODYuOUgzOTMuM2MyLjEtNDQuOSA0LjMtMTA0LjMgNi42LTE3Mi45aDEzMC45bC0uMS04LjFjMC0uNi0uMi0xNC43LTIuMy0yOS4xLTIuMS0xNS02LjYtMzQuOS0yMS0zNC45SDI4Ny44YzQuNC0yMC42IDE1LjctNjkuNyAyOS40LTkzLjhsNi40LTExLjItMTIuOS0uN2MtLjggMC0xOS42LS45LTQxLjQgMTAuNi0zNS43IDE5LTUxLjcgNTYuNC01OC43IDg0LjQtMTguNCA3My4xLTQ0LjYgMTIzLjktNTUuNyAxNDUuNi0zLjMgNi40LTUuMyAxMC4yLTYuMiAxMi44LTEuOCA0LjktLjggOS44IDIuOCAxMyAxMC41IDkuNSAzOC4yLTIuOSAzOC41LTMgLjYtLjMgMS4zLS42IDIuMi0xIDEzLjktNi4zIDU1LjEtMjUgNjkuOC04NC41aDU2LjdjLjcgMzIuMiAzLjEgMTM4LjQgMi45IDE3Mi45aC0xNDFsLTIuMSAxLjVjLTIzLjEgMTYuOS0zMC41IDYzLjItMzAuOCA2NS4ybC0xLjQgOS4yaDE2N2MtMTIuMyA3OC4zLTI2LjUgMTEzLjQtMzQgMTI3LjQtMy43IDctNy4zIDE0LTEwLjcgMjAuOC0yMS4zIDQyLjItNDMuNCA4NS44LTEyNi4zIDE1My42LTMuNiAyLjgtNyA4LTQuOCAxMy43IDIuNCA2LjMgOS4zIDkuMSAyNC42IDkuMSA1LjQgMCAxMS44LS4zIDE5LjQtMSA0OS45LTQuNCAxMDAuOC0xOCAxMzUuMS04Ny42IDE3LTM1LjEgMzEuNy03MS43IDQzLjktMTA4LjlMNDk3IDg1MGw1LTEyYy44LTEuOSAxOS00Ni4zIDUuMS05NS45bC0uNS0xLjgtMTA4LjEtMTIzLTIyIDE2LjZjNi40LTI2LjEgMTAuNi00OS45IDEyLjUtNzEuMWgxNTguN3YtOGMwLTQwLjEtMTguNS02My45LTE5LjItNjQuOWwtMi40LTN6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ZhihuOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ZhihuOutlined';
}
var _default = RefIcon;
