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
var _AppleOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AppleOutlined"));
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
var AppleOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AppleOutlined.default
    }));
};
/**![apple](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc0Ny40IDUzNS43Yy0uNC02OC4yIDMwLjUtMTE5LjYgOTIuOS0xNTcuNS0zNC45LTUwLTg3LjctNzcuNS0xNTcuMy04Mi44LTY1LjktNS4yLTEzOCAzOC40LTE2NC40IDM4LjQtMjcuOSAwLTkxLjctMzYuNi0xNDEuOS0zNi42QzI3My4xIDI5OC44IDE2MyAzNzkuOCAxNjMgNTQ0LjZjMCA0OC43IDguOSA5OSAyNi43IDE1MC44IDIzLjggNjguMiAxMDkuNiAyMzUuMyAxOTkuMSAyMzIuNiA0Ni44LTEuMSA3OS45LTMzLjIgMTQwLjgtMzMuMiA1OS4xIDAgODkuNyAzMy4yIDE0MS45IDMzLjIgOTAuMy0xLjMgMTY3LjktMTUzLjIgMTkwLjUtMjIxLjYtMTIxLjEtNTcuMS0xMTQuNi0xNjcuMi0xMTQuNi0xNzAuN3ptLTEwLjYgMjY3Yy0xNC4zIDE5LjktMjguNyAzNS42LTQxLjkgNDUuNy0xMC41IDgtMTguNiAxMS40LTI0IDExLjYtOS0uMS0xNy43LTIuMy0zNC43LTguOC0xLjItLjUtMi41LTEtNC4yLTEuNmwtNC40LTEuN2MtMTcuNC02LjctMjcuOC0xMC4zLTQxLjEtMTMuOC0xOC42LTQuOC0zNy4xLTcuNC01Ni45LTcuNC0yMC4yIDAtMzkuMiAyLjUtNTguMSA3LjItMTMuOSAzLjUtMjUuNiA3LjQtNDIuNyAxMy44LS43LjMtOC4xIDMuMS0xMC4yIDMuOS0zLjUgMS4zLTYuMiAyLjMtOC43IDMuMi0xMC40IDMuNi0xNyA1LjEtMjIuOSA1LjItLjcgMC0xLjMtLjEtMS44LS4yLTEuMS0uMi0yLjUtLjYtNC4xLTEuMy00LjUtMS44LTkuOS01LjEtMTYtOS44LTE0LTEwLjktMjkuNC0yOC00NS4xLTQ5LjktMjcuNS0zOC42LTUzLjUtODkuOC02Ni0xMjUuNy0xNS40LTQ0LjgtMjMtODcuNy0yMy0xMjguNiAwLTYwLjIgMTcuOC0xMDYgNDguNC0xMzcuMSAyNi4zLTI2LjYgNjEuNy00MS41IDk3LjgtNDIuMyA1LjkuMSAxNC41IDEuNSAyNS40IDQuNSA4LjYgMi4zIDE4IDUuNCAzMC43IDkuOSAzLjggMS40IDE2LjkgNi4xIDE4LjUgNi43IDcuNyAyLjggMTMuNSA0LjggMTkuMiA2LjYgMTguMiA1LjggMzIuMyA5IDQ3LjYgOSAxNS41IDAgMjguOC0zLjMgNDcuNy05LjggNy4xLTIuNCAzMi45LTEyIDM3LjUtMTMuNiAyNS42LTkuMSA0NC41LTE0IDYwLjgtMTUuMiA0LjgtLjQgOS4xLS40IDEzLjItLjEgMjIuNyAxLjggNDIuMSA2LjMgNTguNiAxMy44LTM3LjYgNDMuNC01NyA5Ni41LTU2LjkgMTU4LjQtLjMgMTQuNy45IDMxLjcgNS4xIDUxLjggNi40IDMwLjUgMTguNiA2MC43IDM3LjkgODkgMTQuNyAyMS41IDMyLjkgNDAuOSA1NC43IDU3LjgtMTEuNSAyMy43LTI1LjYgNDguMi00MC40IDY4Ljh6bS05NC41LTU3MmM1MC43LTYwLjIgNDYuMS0xMTUgNDQuNi0xMzQuNy00NC44IDIuNi05Ni42IDMwLjUtMTI2LjEgNjQuOC0zMi41IDM2LjgtNTEuNiA4Mi4zLTQ3LjUgMTMzLjYgNDguNCAzLjcgOTIuNi0yMS4yIDEyOS02My43eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AppleOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AppleOutlined';
}
var _default = RefIcon;
