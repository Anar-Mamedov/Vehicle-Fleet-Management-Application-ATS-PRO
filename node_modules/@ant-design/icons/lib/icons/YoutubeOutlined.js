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
var _YoutubeOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/YoutubeOutlined"));
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
var YoutubeOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _YoutubeOutlined.default
    }));
};
/**![youtube](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTk2MCA1MDkuMmMwLTIuMiAwLTQuNy0uMS03LjYtLjEtOC4xLS4zLTE3LjItLjUtMjYuOS0uOC0yNy45LTIuMi01NS43LTQuNC04MS45LTMtMzYuMS03LjQtNjYuMi0xMy40LTg4LjhhMTM5LjUyIDEzOS41MiAwIDAwLTk4LjMtOTguNWMtMjguMy03LjYtODMuNy0xMi4zLTE2MS43LTE1LjItMzcuMS0xLjQtNzYuOC0yLjMtMTE2LjUtMi44LTEzLjktLjItMjYuOC0uMy0zOC40LS40aC0yOS40Yy0xMS42LjEtMjQuNS4yLTM4LjQuNC0zOS43LjUtNzkuNCAxLjQtMTE2LjUgMi44LTc4IDMtMTMzLjUgNy43LTE2MS43IDE1LjJBMTM5LjM1IDEzOS4zNSAwIDAwODIuNCAzMDRDNzYuMyAzMjYuNiA3MiAzNTYuNyA2OSAzOTIuOGMtMi4yIDI2LjItMy42IDU0LTQuNCA4MS45LS4zIDkuNy0uNCAxOC44LS41IDI2LjkgMCAyLjktLjEgNS40LS4xIDcuNnY1LjZjMCAyLjIgMCA0LjcuMSA3LjYuMSA4LjEuMyAxNy4yLjUgMjYuOS44IDI3LjkgMi4yIDU1LjcgNC40IDgxLjkgMyAzNi4xIDcuNCA2Ni4yIDEzLjQgODguOCAxMi44IDQ3LjkgNTAuNCA4NS43IDk4LjMgOTguNSAyOC4yIDcuNiA4My43IDEyLjMgMTYxLjcgMTUuMiAzNy4xIDEuNCA3Ni44IDIuMyAxMTYuNSAyLjggMTMuOS4yIDI2LjguMyAzOC40LjRoMjkuNGMxMS42LS4xIDI0LjUtLjIgMzguNC0uNCAzOS43LS41IDc5LjQtMS40IDExNi41LTIuOCA3OC0zIDEzMy41LTcuNyAxNjEuNy0xNS4yIDQ3LjktMTIuOCA4NS41LTUwLjUgOTguMy05OC41IDYuMS0yMi42IDEwLjQtNTIuNyAxMy40LTg4LjggMi4yLTI2LjIgMy42LTU0IDQuNC04MS45LjMtOS43LjQtMTguOC41LTI2LjkgMC0yLjkuMS01LjQuMS03LjZ2LTUuNnptLTcyIDUuMmMwIDIuMSAwIDQuNC0uMSA3LjEtLjEgNy44LS4zIDE2LjQtLjUgMjUuNy0uNyAyNi42LTIuMSA1My4yLTQuMiA3Ny45LTIuNyAzMi4yLTYuNSA1OC42LTExLjIgNzYuMy02LjIgMjMuMS0yNC40IDQxLjQtNDcuNCA0Ny41LTIxIDUuNi03My45IDEwLjEtMTQ1LjggMTIuOC0zNi40IDEuNC03NS42IDIuMy0xMTQuNyAyLjgtMTMuNy4yLTI2LjQuMy0zNy44LjNoLTI4LjZsLTM3LjgtLjNjLTM5LjEtLjUtNzguMi0xLjQtMTE0LjctMi44LTcxLjktMi44LTEyNC45LTcuMi0xNDUuOC0xMi44LTIzLTYuMi00MS4yLTI0LjQtNDcuNC00Ny41LTQuNy0xNy43LTguNS00NC4xLTExLjItNzYuMy0yLjEtMjQuNy0zLjQtNTEuMy00LjItNzcuOS0uMy05LjMtLjQtMTgtLjUtMjUuNyAwLTIuNy0uMS01LjEtLjEtNy4xdi00LjhjMC0yLjEgMC00LjQuMS03LjEuMS03LjguMy0xNi40LjUtMjUuNy43LTI2LjYgMi4xLTUzLjIgNC4yLTc3LjkgMi43LTMyLjIgNi41LTU4LjYgMTEuMi03Ni4zIDYuMi0yMy4xIDI0LjQtNDEuNCA0Ny40LTQ3LjUgMjEtNS42IDczLjktMTAuMSAxNDUuOC0xMi44IDM2LjQtMS40IDc1LjYtMi4zIDExNC43LTIuOCAxMy43LS4yIDI2LjQtLjMgMzcuOC0uM2gyOC42bDM3LjguM2MzOS4xLjUgNzguMiAxLjQgMTE0LjcgMi44IDcxLjkgMi44IDEyNC45IDcuMiAxNDUuOCAxMi44IDIzIDYuMiA0MS4yIDI0LjQgNDcuNCA0Ny41IDQuNyAxNy43IDguNSA0NC4xIDExLjIgNzYuMyAyLjEgMjQuNyAzLjQgNTEuMyA0LjIgNzcuOS4zIDkuMy40IDE4IC41IDI1LjcgMCAyLjcuMSA1LjEuMSA3LjF2NC44ek00MjMgNjQ2bDIzMi0xMzUtMjMyLTEzM3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(YoutubeOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'YoutubeOutlined';
}
var _default = RefIcon;
