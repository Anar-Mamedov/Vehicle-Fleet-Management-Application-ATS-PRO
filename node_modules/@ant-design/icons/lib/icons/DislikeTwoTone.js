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
var _DislikeTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DislikeTwoTone"));
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
var DislikeTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DislikeTwoTone.default
    }));
};
/**![dislike](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI3MyAxMDAuMXY0MjhoLjNsLS4zLTQyOHpNODIwLjQgNTI1bC0yMS45LTE5IDE0LTI1LjVhNTYuMiA1Ni4yIDAgMDA2LjktMjcuM2MwLTE2LjUtNy4xLTMyLjItMTkuNi00M2wtMjEuOS0xOSAxMy45LTI1LjRhNTYuMiA1Ni4yIDAgMDA2LjktMjcuM2MwLTE2LjUtNy4xLTMyLjItMTkuNi00M2wtMjEuOS0xOSAxMy45LTI1LjRhNTYuMiA1Ni4yIDAgMDA2LjktMjcuM2MwLTIyLjQtMTMuMi00Mi42LTMzLjYtNTEuOEgzNDV2MzQ1LjJjMTguNiA2Ny4yIDQ2LjQgMTY4IDgzLjUgMzAyLjVhNDQuMjggNDQuMjggMCAwMDQyLjIgMzIuM2M3LjUuMSAxNS0yLjIgMjEuMS02LjcgOS45LTcuNCAxNS4yLTE4LjYgMTQuNi0zMC41bC05LjYtMTk4LjRoMzE0LjRDODI5IDYwNS41IDg0MCA1ODcuMSA4NDAgNTY4YzAtMTYuNS03LjEtMzIuMi0xOS42LTQzeiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNMTEyIDEzMnYzNjRjMCAxNy43IDE0LjMgMzIgMzIgMzJoNjVWMTAwaC02NWMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ6bTc3My45IDM1OC4zYzMuNi0xMiA1LjQtMjQuNCA1LjQtMzcgMC0yOC4zLTkuMy01NS41LTI2LjEtNzcuNyAzLjYtMTIgNS40LTI0LjQgNS40LTM3IDAtMjguMy05LjMtNTUuNS0yNi4xLTc3LjcgMy42LTEyIDUuNC0yNC40IDUuNC0zNyAwLTUxLjYtMzAuNy05OC4xLTc4LjMtMTE4LjRhNjYuMSA2Ni4xIDAgMDAtMjYuNS01LjRIMjczbC4zIDQyOCA4NS44IDMxMC44QzM3Mi45IDg4OSA0MTguOSA5MjQgNDcwLjkgOTI0YzI5LjcgMCA1Ny40LTExLjggNzcuOS0zMy40IDIwLjUtMjEuNSAzMS00OS43IDI5LjUtNzkuNGwtNi0xMjIuOWgyMzkuOWMxMi4xIDAgMjMuOS0zLjIgMzQuMy05LjMgNDAuNC0yMy41IDY1LjUtNjYuMSA2NS41LTExMSAwLTI4LjMtOS4zLTU1LjUtMjYuMS03Ny43em0tNzQuNyAxMjYuMUg0OTYuOGw5LjYgMTk4LjRjLjYgMTEuOS00LjcgMjMuMS0xNC42IDMwLjUtNi4xIDQuNS0xMy42IDYuOC0yMS4xIDYuN2E0NC4yOCA0NC4yOCAwIDAxLTQyLjItMzIuM2MtMzcuMS0xMzQuNC02NC45LTIzNS4yLTgzLjUtMzAyLjVWMTcyaDM5OS40YTU2Ljg1IDU2Ljg1IDAgMDEzMy42IDUxLjhjMCA5LjctMi4zIDE4LjktNi45IDI3LjNsLTEzLjkgMjUuNCAyMS45IDE5YTU2Ljc2IDU2Ljc2IDAgMDExOS42IDQzYzAgOS43LTIuMyAxOC45LTYuOSAyNy4zbC0xMy45IDI1LjQgMjEuOSAxOWE1Ni43NiA1Ni43NiAwIDAxMTkuNiA0M2MwIDkuNy0yLjMgMTguOS02LjkgMjcuM2wtMTQgMjUuNSAyMS45IDE5YTU2Ljc2IDU2Ljc2IDAgMDExOS42IDQzYzAgMTkuMS0xMSAzNy41LTI4LjggNDguNHoiIGZpbGw9IiMxNjc3ZmYiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DislikeTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DislikeTwoTone';
}
var _default = RefIcon;
