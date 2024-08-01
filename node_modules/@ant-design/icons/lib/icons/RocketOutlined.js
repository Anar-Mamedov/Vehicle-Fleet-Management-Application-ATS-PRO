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
var _RocketOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/RocketOutlined"));
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
var RocketOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _RocketOutlined.default
    }));
};
/**![rocket](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2NCA3MzZjMC0xMTEuNi02NS40LTIwOC0xNjAtMjUyLjlWMzE3LjNjMC0xNS4xLTUuMy0yOS43LTE1LjEtNDEuMkw1MzYuNSA5NS40QzUzMC4xIDg3LjggNTIxIDg0IDUxMiA4NHMtMTguMSAzLjgtMjQuNSAxMS40TDMzNS4xIDI3Ni4xYTYzLjk3IDYzLjk3IDAgMDAtMTUuMSA0MS4ydjE2NS44QzIyNS40IDUyOCAxNjAgNjI0LjQgMTYwIDczNmgxNTYuNWMtMi4zIDcuMi0zLjUgMTUtMy41IDIzLjggMCAyMi4xIDcuNiA0My43IDIxLjQgNjAuOGE5Ny4yIDk3LjIgMCAwMDQzLjEgMzAuNmMyMy4xIDU0IDc1LjYgODguOCAxMzQuNSA4OC44IDI5LjEgMCA1Ny4zLTguNiA4MS40LTI0LjggMjMuNi0xNS44IDQxLjktMzcuOSA1My02NGE5NyA5NyAwIDAwNDMuMS0zMC41IDk3LjUyIDk3LjUyIDAgMDAyMS40LTYwLjhjMC04LjQtMS4xLTE2LjQtMy4xLTIzLjhIODY0ek03NjIuMyA2MjEuNGM5LjQgMTQuNiAxNyAzMC4zIDIyLjUgNDYuNkg3MDBWNTU4LjdhMjExLjYgMjExLjYgMCAwMTYyLjMgNjIuN3pNMzg4IDQ4My4xVjMxOC44bDEyNC0xNDcgMTI0IDE0N1Y2NjhIMzg4VjQ4My4xek0yMzkuMiA2NjhjNS41LTE2LjMgMTMuMS0zMiAyMi41LTQ2LjYgMTYuMy0yNS4yIDM3LjUtNDYuNSA2Mi4zLTYyLjdWNjY4aC04NC44em0zODguOSAxMTYuMmMtNS4yIDMtMTEuMiA0LjItMTcuMSAzLjRsLTE5LjUtMi40LTIuOCAxOS40Yy01LjQgMzcuOS0zOC40IDY2LjUtNzYuNyA2Ni41LTM4LjMgMC03MS4zLTI4LjYtNzYuNy02Ni41bC0yLjgtMTkuNS0xOS41IDIuNWEyNy43IDI3LjcgMCAwMS0xNy4xLTMuNWMtOC43LTUtMTQuMS0xNC4zLTE0LjEtMjQuNCAwLTEwLjYgNS45LTE5LjQgMTQuNi0yMy44aDIzMS4zYzguOCA0LjUgMTQuNiAxMy4zIDE0LjYgMjMuOC0uMSAxMC4yLTUuNSAxOS42LTE0LjIgMjQuNXpNNDY0IDQwMGE0OCA0OCAwIDEwOTYgMCA0OCA0OCAwIDEwLTk2IDB6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(RocketOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'RocketOutlined';
}
var _default = RefIcon;
