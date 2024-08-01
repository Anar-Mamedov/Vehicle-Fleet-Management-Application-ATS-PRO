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
var _EuroCircleTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/EuroCircleTwoTone"));
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
var EuroCircleTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _EuroCircleTwoTone.default
    }));
};
/**![euro-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDgyMGMtMjA1LjQgMC0zNzItMTY2LjYtMzcyLTM3MnMxNjYuNi0zNzIgMzcyLTM3MiAzNzIgMTY2LjYgMzcyIDM3Mi0xNjYuNiAzNzItMzcyIDM3MnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTUxMiAxNDBjLTIwNS40IDAtMzcyIDE2Ni42LTM3MiAzNzJzMTY2LjYgMzcyIDM3MiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzItMTY2LjYtMzcyLTM3Mi0zNzJ6bTExNy4xIDU4MS4xYzAgMy44LTIuNyA3LTYuNCA3LjgtMTUuOSAzLjQtMzQuNCA1LjEtNTUuMyA1LjEtMTA5LjggMC0xODMtNTguOC0yMDAuMi0xNThIMzM3Yy00LjQgMC04LTMuNi04LTh2LTI3LjJjMC00LjQgMy42LTggOC04aDI2LjF2LTM2LjljMC00LjQgMC04LjcuMy0xMi44SDMzN2MtNC40IDAtOC0zLjYtOC04di0yNy4yYzAtNC40IDMuNi04IDgtOGgzMS44QzM4OC41IDM0NS43IDQ2MC43IDI5MCA1NjcuNCAyOTBjMjAuOSAwIDM5LjQgMS45IDU1LjMgNS40IDMuNy44IDYuMyA0IDYuMyA3LjhWMzQ2YTggOCAwIDAxLTkuNiA3LjhjLTE0LjYtMi45LTMxLjgtNC40LTUxLjctNC40LTY1LjMgMC0xMTAuNCAzMy41LTEyNy42IDkwLjRoMTI4LjNjNC40IDAgOCAzLjYgOCA4VjQ3NWMwIDQuNC0zLjYgOC04IDhINDMyLjVjLS4zIDQuNC0uMyA5LjEtLjMgMTMuOHYzNmgxMzYuNGM0LjQgMCA4IDMuNiA4IDhWNTY4YzAgNC40LTMuNiA4LTggOEg0MzhjMTUuMyA2MiA2MS4zIDk4LjYgMTI5LjggOTguNiAxOS45IDAgMzcuMS0xLjMgNTEuOC00LjEgNC45LTEgOS41IDIuOCA5LjUgNy44djQyLjh6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik02MTkuNiA2NzAuNWMtMTQuNyAyLjgtMzEuOSA0LjEtNTEuOCA0LjEtNjguNSAwLTExNC41LTM2LjYtMTI5LjgtOTguNmgxMzAuNmM0LjQgMCA4LTMuNiA4LTh2LTI3LjJjMC00LjQtMy42LTgtOC04SDQzMi4ydi0zNmMwLTQuNyAwLTkuNC4zLTEzLjhoMTM1LjljNC40IDAgOC0zLjYgOC04di0yNy4yYzAtNC40LTMuNi04LTgtOEg0NDAuMWMxNy4yLTU2LjkgNjIuMy05MC40IDEyNy42LTkwLjQgMTkuOSAwIDM3LjEgMS41IDUxLjcgNC40YTggOCAwIDAwOS42LTcuOHYtNDIuOGMwLTMuOC0yLjYtNy02LjMtNy44LTE1LjktMy41LTM0LjQtNS40LTU1LjMtNS40LTEwNi43IDAtMTc4LjkgNTUuNy0xOTguNiAxNDkuOUgzMzdjLTQuNCAwLTggMy42LTggOHYyNy4yYzAgNC40IDMuNiA4IDggOGgyNi40Yy0uMyA0LjEtLjMgOC40LS4zIDEyLjh2MzYuOUgzMzdjLTQuNCAwLTggMy42LTggOFY1NjhjMCA0LjQgMy42IDggOCA4aDMwLjJjMTcuMiA5OS4yIDkwLjQgMTU4IDIwMC4yIDE1OCAyMC45IDAgMzkuNC0xLjcgNTUuMy01LjEgMy43LS44IDYuNC00IDYuNC03Ljh2LTQyLjhjMC01LTQuNi04LjgtOS41LTcuOHoiIGZpbGw9IiMxNjc3ZmYiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(EuroCircleTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'EuroCircleTwoTone';
}
var _default = RefIcon;
