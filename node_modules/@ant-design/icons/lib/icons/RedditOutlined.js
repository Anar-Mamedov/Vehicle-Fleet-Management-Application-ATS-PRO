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
var _RedditOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/RedditOutlined"));
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
var RedditOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _RedditOutlined.default
    }));
};
/**![reddit](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI4OCA1NjhhNTYgNTYgMCAxMDExMiAwIDU2IDU2IDAgMTAtMTEyIDB6bTMzOC43IDExOS43Yy0yMy4xIDE4LjItNjguOSAzNy44LTExNC43IDM3LjhzLTkxLjYtMTkuNi0xMTQuNy0zNy44Yy0xNC40LTExLjMtMzUuMy04LjktNDYuNyA1LjVzLTguOSAzNS4zIDUuNSA0Ni43QzM5Ni4zIDc3MS42IDQ1Ny41IDc5MiA1MTIgNzkyczExNS43LTIwLjQgMTU1LjktNTIuMWEzMy4yNSAzMy4yNSAwIDEwLTQxLjItNTIuMnpNOTYwIDQ1NmMwLTYxLjktNTAuMS0xMTItMTEyLTExMi00Mi4xIDAtNzguNyAyMy4yLTk3LjkgNTcuNi01Ny42LTMxLjUtMTI3LjctNTEuOC0yMDQuMS01Ni41TDYxMi45IDE5NWwxMjcuOSAzNi45YzExLjUgMzIuNiA0Mi42IDU2LjEgNzkuMiA1Ni4xIDQ2LjQgMCA4NC0zNy42IDg0LTg0cy0zNy42LTg0LTg0LTg0Yy0zMiAwLTU5LjggMTcuOS03NCA0NC4yTDYwMy41IDEyM2EzMy4yIDMzLjIgMCAwMC0zOS42IDE4LjRsLTkwLjggMjAzLjljLTc0LjUgNS4yLTE0Mi45IDI1LjQtMTk5LjIgNTYuMkExMTEuOTQgMTExLjk0IDAgMDAxNzYgMzQ0Yy02MS45IDAtMTEyIDUwLjEtMTEyIDExMiAwIDQ1LjggMjcuNSA4NS4xIDY2LjggMTAyLjUtNy4xIDIxLTEwLjggNDMtMTAuOCA2NS41IDAgMTU0LjYgMTc1LjUgMjgwIDM5MiAyODBzMzkyLTEyNS40IDM5Mi0yODBjMC0yMi42LTMuOC00NC41LTEwLjgtNjUuNUM5MzIuNSA1NDEuMSA5NjAgNTAxLjggOTYwIDQ1NnpNODIwIDE3Mi41YTMxLjUgMzEuNSAwIDExMCA2MyAzMS41IDMxLjUgMCAwMTAtNjN6TTEyMCA0NTZjMC0zMC45IDI1LjEtNTYgNTYtNTZhNTYgNTYgMCAwMTUwLjYgMzIuMWMtMjkuMyAyMi4yLTUzLjUgNDcuOC03MS41IDc1LjlhNTYuMjMgNTYuMjMgMCAwMS0zNS4xLTUyem0zOTIgMzgxLjVjLTE3OS44IDAtMzI1LjUtOTUuNi0zMjUuNS0yMTMuNVMzMzIuMiA0MTAuNSA1MTIgNDEwLjUgODM3LjUgNTA2LjEgODM3LjUgNjI0IDY5MS44IDgzNy41IDUxMiA4MzcuNXpNODY4LjggNTA4Yy0xNy45LTI4LjEtNDIuMi01My43LTcxLjUtNzUuOSA5LTE4LjkgMjguMy0zMi4xIDUwLjYtMzIuMSAzMC45IDAgNTYgMjUuMSA1NiA1NiAuMSAyMy41LTE0LjUgNDMuNy0zNS4xIDUyek02MjQgNTY4YTU2IDU2IDAgMTAxMTIgMCA1NiA1NiAwIDEwLTExMiAweiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(RedditOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'RedditOutlined';
}
var _default = RefIcon;
