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
var _UserAddOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/UserAddOutlined"));
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
var UserAddOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _UserAddOutlined.default
    }));
};
/**![user-add](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY3OC4zIDY0Mi40YzI0LjItMTMgNTEuOS0yMC40IDgxLjQtMjAuNGguMWMzIDAgNC40LTMuNiAyLjItNS42YTM3MS42NyAzNzEuNjcgMCAwMC0xMDMuNy02NS44Yy0uNC0uMi0uOC0uMy0xLjItLjVDNzE5LjIgNTA1IDc1OS42IDQzMS43IDc1OS42IDM0OWMwLTEzNy0xMTAuOC0yNDgtMjQ3LjUtMjQ4UzI2NC43IDIxMiAyNjQuNyAzNDljMCA4Mi43IDQwLjQgMTU2IDEwMi42IDIwMS4xLS40LjItLjguMy0xLjIuNS00NC43IDE4LjktODQuOCA0Ni0xMTkuMyA4MC42YTM3My40MiAzNzMuNDIgMCAwMC04MC40IDExOS41QTM3My42IDM3My42IDAgMDAxMzcgODg4LjhhOCA4IDAgMDA4IDguMmg1OS45YzQuMyAwIDcuOS0zLjUgOC03LjggMi03Ny4yIDMyLjktMTQ5LjUgODcuNi0yMDQuM0MzNTcgNjI4LjIgNDMyLjIgNTk3IDUxMi4yIDU5N2M1Ni43IDAgMTExLjEgMTUuNyAxNTggNDUuMWE4LjEgOC4xIDAgMDA4LjEuM3pNNTEyLjIgNTIxYy00NS44IDAtODguOS0xNy45LTEyMS40LTUwLjRBMTcxLjIgMTcxLjIgMCAwMTM0MC41IDM0OWMwLTQ1LjkgMTcuOS04OS4xIDUwLjMtMTIxLjZTNDY2LjMgMTc3IDUxMi4yIDE3N3M4OC45IDE3LjkgMTIxLjQgNTAuNEExNzEuMiAxNzEuMiAwIDAxNjgzLjkgMzQ5YzAgNDUuOS0xNy45IDg5LjEtNTAuMyAxMjEuNkM2MDEuMSA1MDMuMSA1NTggNTIxIDUxMi4yIDUyMXpNODgwIDc1OWgtODR2LTg0YzAtNC40LTMuNi04LTgtOGgtNTZjLTQuNCAwLTggMy42LTggOHY4NGgtODRjLTQuNCAwLTggMy42LTggOHY1NmMwIDQuNCAzLjYgOCA4IDhoODR2ODRjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOHYtODRoODRjNC40IDAgOC0zLjYgOC04di01NmMwLTQuNC0zLjYtOC04LTh6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(UserAddOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'UserAddOutlined';
}
var _default = RefIcon;
