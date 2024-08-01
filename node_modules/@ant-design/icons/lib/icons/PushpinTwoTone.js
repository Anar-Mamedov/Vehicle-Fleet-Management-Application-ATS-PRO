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
var _PushpinTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PushpinTwoTone"));
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
var PushpinTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PushpinTwoTone.default
    }));
};
/**![pushpin](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ3NC44IDM1Ny43bC0yNC41IDI0LjUtMzQuNC0zLjhjLTkuNi0xLjEtMTkuMy0xLjYtMjguOS0xLjYtMjkgMC01Ny41IDQuNy04NC43IDE0LjEtMTQgNC44LTI3LjQgMTAuOC00MC4zIDE3LjlsMzUzLjEgMzUzLjNhMjU5LjkyIDI1OS45MiAwIDAwMzAuNC0xNTMuOWwtMy44LTM0LjQgMjQuNS0yNC41TDgwMCA0MTUuNSA2MDguNSAyMjQgNDc0LjggMzU3Ljd6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik04NzguMyAzOTIuMUw2MzEuOSAxNDUuN2MtNi41LTYuNS0xNS05LjctMjMuNS05LjdzLTE3IDMuMi0yMy41IDkuN0w0MjMuOCAzMDYuOWMtMTIuMi0xLjQtMjQuNS0yLTM2LjgtMi03My4yIDAtMTQ2LjQgMjQuMS0yMDYuNSA3Mi4zYTMzLjIzIDMzLjIzIDAgMDAtMi43IDQ5LjRsMTgxLjcgMTgxLjctMjE1LjQgMjE1LjJhMTUuOCAxNS44IDAgMDAtNC42IDkuOGwtMy40IDM3LjJjLS45IDkuNCA2LjYgMTcuNCAxNS45IDE3LjQuNSAwIDEgMCAxLjUtLjFsMzcuMi0zLjRjMy43LS4zIDcuMi0yIDkuOC00LjZsMjE1LjQtMjE1LjQgMTgxLjcgMTgxLjdjNi41IDYuNSAxNSA5LjcgMjMuNSA5LjcgOS43IDAgMTkuMy00LjIgMjUuOS0xMi40IDU2LjMtNzAuMyA3OS43LTE1OC4zIDcwLjItMjQzLjRsMTYxLjEtMTYxLjFjMTIuOS0xMi44IDEyLjktMzMuOCAwLTQ2Ljh6TTY2Ni4yIDU0OS4zbC0yNC41IDI0LjUgMy44IDM0LjRhMjU5LjkyIDI1OS45MiAwIDAxLTMwLjQgMTUzLjlMMjYyIDQwOC44YzEyLjktNy4xIDI2LjMtMTMuMSA0MC4zLTE3LjkgMjcuMi05LjQgNTUuNy0xNC4xIDg0LjctMTQuMSA5LjYgMCAxOS4zLjUgMjguOSAxLjZsMzQuNCAzLjggMjQuNS0yNC41TDYwOC41IDIyNCA4MDAgNDE1LjUgNjY2LjIgNTQ5LjN6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PushpinTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PushpinTwoTone';
}
var _default = RefIcon;
