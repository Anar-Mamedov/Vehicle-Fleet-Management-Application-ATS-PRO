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
var _PhoneTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PhoneTwoTone"));
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
var PhoneTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PhoneTwoTone.default
    }));
};
/**![phone](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcyMS43IDE4NC45TDYxMC45IDI5NS44bDEyMC44IDEyMC43LTggMjEuNkE0ODEuMjkgNDgxLjI5IDAgMDE0MzggNzIzLjlsLTIxLjYgOC0uOS0uOS0xMTkuOC0xMjAtMTEwLjggMTEwLjkgMTA0LjUgMTA0LjVjMTAuOCAxMC43IDI2IDE1LjcgNDAuOCAxMy4yIDExNy45LTE5LjUgMjM1LjQtODIuOSAzMzAuOS0xNzguNHMxNTguOS0yMTMuMSAxNzguNC0zMzFjMi41LTE0LjgtMi41LTMwLTEzLjMtNDAuOEw3MjEuNyAxODQuOXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTg3Ny4xIDIzOC43TDc3MC42IDEzMi4zYy0xMy0xMy0zMC40LTIwLjMtNDguOC0yMC4zcy0zNS44IDcuMi00OC44IDIwLjNMNTU4LjMgMjQ2LjhjLTEzIDEzLTIwLjMgMzAuNS0yMC4zIDQ4LjkgMCAxOC41IDcuMiAzNS44IDIwLjMgNDguOWw4OS42IDg5LjdhNDA1LjQ2IDQwNS40NiAwIDAxLTg2LjQgMTI3LjNjLTM2LjcgMzYuOS03OS42IDY2LTEyNy4yIDg2LjZsLTg5LjYtODkuN2MtMTMtMTMtMzAuNC0yMC4zLTQ4LjgtMjAuM2E2OC4yIDY4LjIgMCAwMC00OC44IDIwLjNMMTMyLjMgNjczYy0xMyAxMy0yMC4zIDMwLjUtMjAuMyA0OC45IDAgMTguNSA3LjIgMzUuOCAyMC4zIDQ4LjlsMTA2LjQgMTA2LjRjMjIuMiAyMi4yIDUyLjggMzQuOSA4NC4yIDM0LjkgNi41IDAgMTIuOC0uNSAxOS4yLTEuNiAxMzIuNC0yMS44IDI2My44LTkyLjMgMzY5LjktMTk4LjNDODE4IDYwNiA4ODguNCA0NzQuNiA5MTAuNCAzNDIuMWM2LjMtMzcuNi02LjMtNzYuMy0zMy4zLTEwMy40em0tMzcuNiA5MS41Yy0xOS41IDExNy45LTgyLjkgMjM1LjUtMTc4LjQgMzMxcy0yMTMgMTU4LjktMzMwLjkgMTc4LjRjLTE0LjggMi41LTMwLTIuNS00MC44LTEzLjJMMTg0LjkgNzIxLjkgMjk1LjcgNjExbDExOS44IDEyMCAuOS45IDIxLjYtOGE0ODEuMjkgNDgxLjI5IDAgMDAyODUuNy0yODUuOGw4LTIxLjYtMTIwLjgtMTIwLjcgMTEwLjgtMTEwLjkgMTA0LjUgMTA0LjVjMTAuOCAxMC44IDE1LjggMjYgMTMuMyA0MC44eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PhoneTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PhoneTwoTone';
}
var _default = RefIcon;
