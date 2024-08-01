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
var _CiTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CiTwoTone"));
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
var CiTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CiTwoTone.default
    }));
};
/**![ci](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDgyMGMtMjA1LjQgMC0zNzItMTY2LjYtMzcyLTM3MnMxNjYuNi0zNzIgMzcyLTM3MiAzNzIgMTY2LjYgMzcyIDM3Mi0xNjYuNiAzNzItMzcyIDM3MnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTUxMiAxNDBjLTIwNS40IDAtMzcyIDE2Ni42LTM3MiAzNzJzMTY2LjYgMzcyIDM3MiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzItMTY2LjYtMzcyLTM3Mi0zNzJ6bS02My41IDUyMi44YzQ5LjMgMCA4Mi44LTI5LjQgODctNzIuNC40LTQuMSAzLjgtNy4zIDgtNy4zaDUyLjdjMi40IDAgNC40IDIgNC40IDQuNCAwIDc3LjQtNjQuMyAxMzIuNS0xNTIuMyAxMzIuNUMzNDUuNCA3MjAgMjg2IDY1MS40IDI4NiA1MzcuNHYtNDlDMjg2IDM3My41IDM0NS40IDMwNCA0NDguMyAzMDRjODguMyAwIDE1Mi4zIDU2LjkgMTUyLjMgMTM4LjEgMCAyLjQtMiA0LjQtNC40IDQuNGgtNTIuNmMtNC4yIDAtNy42LTMuMi04LTcuNC0zLjktNDYuMS0zNy41LTc3LjYtODctNzcuNi02MS4xIDAtOTUuNiA0NS40LTk1LjcgMTI2Ljh2NDkuM2MwIDgwLjMgMzQuNSAxMjUuMiA5NS42IDEyNS4yek03MzggNzA0LjFjMCA0LjQtMy42IDgtOCA4aC01MC40Yy00LjQgMC04LTMuNi04LThWMzE5LjljMC00LjQgMy42LTggOC04SDczMGM0LjQgMCA4IDMuNiA4IDh2Mzg0LjJ6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik03MzAgMzExLjloLTUwLjRjLTQuNCAwLTggMy42LTggOHYzODQuMmMwIDQuNCAzLjYgOCA4IDhINzMwYzQuNCAwIDgtMy42IDgtOFYzMTkuOWMwLTQuNC0zLjYtOC04LTh6bS0yODEuNCA0OS42YzQ5LjUgMCA4My4xIDMxLjUgODcgNzcuNi40IDQuMiAzLjggNy40IDggNy40aDUyLjZjMi40IDAgNC40LTIgNC40LTQuNCAwLTgxLjItNjQtMTM4LjEtMTUyLjMtMTM4LjFDMzQ1LjQgMzA0IDI4NiAzNzMuNSAyODYgNDg4LjR2NDljMCAxMTQgNTkuNCAxODIuNiAxNjIuMyAxODIuNiA4OCAwIDE1Mi4zLTU1LjEgMTUyLjMtMTMyLjUgMC0yLjQtMi00LjQtNC40LTQuNGgtNTIuN2MtNC4yIDAtNy42IDMuMi04IDcuMy00LjIgNDMtMzcuNyA3Mi40LTg3IDcyLjQtNjEuMSAwLTk1LjYtNDQuOS05NS42LTEyNS4ydi00OS4zYy4xLTgxLjQgMzQuNi0xMjYuOCA5NS43LTEyNi44eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CiTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CiTwoTone';
}
var _default = RefIcon;
