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
var _DollarTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DollarTwoTone"));
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
var DollarTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DollarTwoTone.default
    }));
};
/**![dollar](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDgyMGMtMjA1LjQgMC0zNzItMTY2LjYtMzcyLTM3MnMxNjYuNi0zNzIgMzcyLTM3MiAzNzIgMTY2LjYgMzcyIDM3Mi0xNjYuNiAzNzItMzcyIDM3MnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTQyNi42IDQxMC4zYzAgMjUuNCAxNS43IDQ1LjEgNDkuNSA1Ny4zIDQuNyAxLjkgOS40IDMuNCAxNSA1di0xMjRjLTM3IDQuNy02NC41IDI1LjQtNjQuNSA2MS43em0xMTYuNSAxMzUuMmMtMi45LS42LTUuNy0xLjMtOC44LTIuMlY2NzdjNDIuNi0zLjggNzItMjcuMyA3Mi02Ni40IDAtMzAuNy0xNS45LTUwLjctNjMuMi02NS4xeiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNNTEyIDE0MGMtMjA1LjQgMC0zNzIgMTY2LjYtMzcyIDM3MnMxNjYuNiAzNzIgMzcyIDM3MiAzNzItMTY2LjYgMzcyLTM3Mi0xNjYuNi0zNzItMzcyLTM3MnptMjIuNCA1ODkuMmwuMiAzMS43YzAgNC41LTMuNiA4LjEtOCA4LjFoLTI4LjRjLTQuNCAwLTgtMy42LTgtOHYtMzEuNGMtODktNi41LTEzMC43LTU3LjEtMTM1LjItMTEyLjEtLjQtNC43IDMuMy04LjcgOC04LjdoNDYuMmMzLjkgMCA3LjMgMi44IDcuOSA2LjYgNS4xIDMxLjggMjkuOSA1NS40IDc0LjEgNjEuM1Y1MzRsLTI0LjctNi4zYy01Mi4zLTEyLjUtMTAyLjEtNDUuMS0xMDIuMS0xMTIuNyAwLTczIDU1LjQtMTEyLjEgMTI2LjItMTE5di0zM2MwLTQuNCAzLjYtOCA4LThoMjguMWM0LjQgMCA4IDMuNiA4IDh2MzIuN2M2OC41IDYuOSAxMTkuOCA0Ni45IDEyNS45IDEwOS4yYTguMSA4LjEgMCAwMS04IDguOGgtNDQuOWMtNCAwLTcuNC0yLjktNy45LTYuOS00LTI5LjItMjcuNS01My02NS41LTU4LjJ2MTM0LjNsMjUuNCA1LjljNjQuOCAxNiAxMDguOSA0NyAxMDkgMTE2LjQgMCA3NS4yLTU2IDExNy4xLTEzNC4zIDEyNHoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTU1OS43IDQ4OC44bC0yNS40LTUuOVYzNDguNmMzOCA1LjIgNjEuNSAyOSA2NS41IDU4LjIuNSA0IDMuOSA2LjkgNy45IDYuOWg0NC45YzQuNyAwIDguNC00LjEgOC04LjgtNi4xLTYyLjMtNTcuNC0xMDIuMy0xMjUuOS0xMDkuMlYyNjNjMC00LjQtMy42LTgtOC04aC0yOC4xYy00LjQgMC04IDMuNi04IDh2MzNjLTcwLjggNi45LTEyNi4yIDQ2LTEyNi4yIDExOSAwIDY3LjYgNDkuOCAxMDAuMiAxMDIuMSAxMTIuN2wyNC43IDYuM3YxNDIuN2MtNDQuMi01LjktNjktMjkuNS03NC4xLTYxLjMtLjYtMy44LTQtNi42LTcuOS02LjZIMzYzYy00LjcgMC04LjQgNC04IDguNyA0LjUgNTUgNDYuMiAxMDUuNiAxMzUuMiAxMTIuMVY3NjFjMCA0LjQgMy42IDggOCA4aDI4LjRjNC40IDAgOC0zLjYgOC04LjFsLS4yLTMxLjdjNzguMy02LjkgMTM0LjMtNDguOCAxMzQuMy0xMjQtLjEtNjkuNC00NC4yLTEwMC40LTEwOS0xMTYuNHptLTY4LjYtMTYuMmMtNS42LTEuNi0xMC4zLTMuMS0xNS01LTMzLjgtMTIuMi00OS41LTMxLjktNDkuNS01Ny4zIDAtMzYuMyAyNy41LTU3IDY0LjUtNjEuN3YxMjR6TTUzNC4zIDY3N1Y1NDMuM2MzLjEuOSA1LjkgMS42IDguOCAyLjIgNDcuMyAxNC40IDYzLjIgMzQuNCA2My4yIDY1LjEgMCAzOS4xLTI5LjQgNjIuNi03MiA2Ni40eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DollarTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DollarTwoTone';
}
var _default = RefIcon;
