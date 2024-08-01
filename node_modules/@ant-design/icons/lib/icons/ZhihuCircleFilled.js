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
var _ZhihuCircleFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ZhihuCircleFilled"));
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
var ZhihuCircleFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ZhihuCircleFilled.default
    }));
};
/**![zhihu-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0tOTAuNyA0NzcuOGwtLjEgMS41Yy0xLjUgMjAuNC02LjMgNDMuOS0xMi45IDY3LjZsMjQtMTguMSA3MSA4MC43YzkuMiAzMy0zLjMgNjMuMS0zLjMgNjMuMWwtOTUuNy0xMTEuOXYtLjFjLTguOSAyOS0yMC4xIDU3LjMtMzMuMyA4NC43LTIyLjYgNDUuNy01NS4yIDU0LjctODkuNSA1Ny43LTM0LjQgMy0yMy4zLTUuMy0yMy4zLTUuMyA2OC01NS41IDc4LTg3LjggOTYuOC0xMjMuMSAxMS45LTIyLjMgMjAuNC02NC4zIDI1LjMtOTYuOEgyNjQuMXM0LjgtMzEuMiAxOS4yLTQxLjdoMTAxLjZjLjYtMTUuMy0xLjMtMTAyLjgtMi0xMzEuNGgtNDkuNGMtOS4yIDQ1LTQxIDU2LjctNDguMSA2MC4xLTcgMy40LTIzLjYgNy4xLTIxLjEgMCAyLjYtNy4xIDI3LTQ2LjIgNDMuMi0xMTAuNyAxNi4zLTY0LjYgNjMuOS02MiA2My45LTYyLTEyLjggMjIuNS0yMi40IDczLjYtMjIuNCA3My42aDE1OS43YzEwLjEgMCAxMC42IDM5IDEwLjYgMzloLTkwLjhjLS43IDIyLjctMi44IDgzLjgtNSAxMzEuNEg1MTlzMTIuMiAxNS40IDEyLjIgNDEuN0g0MjEuM3ptMzQ2LjUgMTY3aC04Ny42bC02OS41IDQ2LjYtMTYuNC00Ni42aC00MC4xVjMyMS41aDIxMy42djM4Ny4zek00MDguMiA2MTFzMC0uMSAwIDB6bTIxNiA5NC4zbDU2LjgtMzguMWg0NS42LS4xVjM2NC43SDU5Ni43djMwMi41aDE0LjF6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ZhihuCircleFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ZhihuCircleFilled';
}
var _default = RefIcon;
