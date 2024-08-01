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
var _GithubFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/GithubFilled"));
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
var GithubFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _GithubFilled.default
    }));
};
/**![github](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMS42IDc2LjNDMjY0LjMgNzYuMiA2NCAyNzYuNCA2NCA1MjMuNSA2NCA3MTguOSAxODkuMyA4ODUgMzYzLjggOTQ2YzIzLjUgNS45IDE5LjktMTAuOCAxOS45LTIyLjJ2LTc3LjVjLTEzNS43IDE1LjktMTQxLjItNzMuOS0xNTAuMy04OC45QzIxNSA3MjYgMTcxLjUgNzE4IDE4NC41IDcwM2MzMC45LTE1LjkgNjIuNCA0IDk4LjkgNTcuOSAyNi40IDM5LjEgNzcuOSAzMi41IDEwNCAyNiA1LjctMjMuNSAxNy45LTQ0LjUgMzQuNy02MC44LTE0MC42LTI1LjItMTk5LjItMTExLTE5OS4yLTIxMyAwLTQ5LjUgMTYuMy05NSA0OC4zLTEzMS43LTIwLjQtNjAuNSAxLjktMTEyLjMgNC45LTEyMCA1OC4xLTUuMiAxMTguNSA0MS42IDEyMy4yIDQ1LjMgMzMtOC45IDcwLjctMTMuNiAxMTIuOS0xMy42IDQyLjQgMCA4MC4yIDQuOSAxMTMuNSAxMy45IDExLjMtOC42IDY3LjMtNDguOCAxMjEuMy00My45IDIuOSA3LjcgMjQuNyA1OC4zIDUuNSAxMTggMzIuNCAzNi44IDQ4LjkgODIuNyA0OC45IDEzMi4zIDAgMTAyLjItNTkgMTg4LjEtMjAwIDIxMi45YTEyNy41IDEyNy41IDAgMDEzOC4xIDkxdjExMi41Yy44IDkgMCAxNy45IDE1IDE3LjkgMTc3LjEtNTkuNyAzMDQuNi0yMjcgMzA0LjYtNDI0LjEgMC0yNDcuMi0yMDAuNC00NDcuMy00NDcuNS00NDcuM3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(GithubFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'GithubFilled';
}
var _default = RefIcon;
