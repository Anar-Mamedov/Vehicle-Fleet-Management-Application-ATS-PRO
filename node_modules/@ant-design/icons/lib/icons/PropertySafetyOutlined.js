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
var _PropertySafetyOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PropertySafetyOutlined"));
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
var PropertySafetyOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PropertySafetyOutlined.default
    }));
};
/**![property-safety](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2Ni45IDE2OS45TDUyNy4xIDU0LjFDNTIzIDUyLjcgNTE3LjUgNTIgNTEyIDUycy0xMSAuNy0xNS4xIDIuMUwxNTcuMSAxNjkuOWMtOC4zIDIuOC0xNS4xIDEyLjQtMTUuMSAyMS4ydjQ4Mi40YzAgOC44IDUuNyAyMC40IDEyLjYgMjUuOUw0OTkuMyA5NjhjMy41IDIuNyA4IDQuMSAxMi42IDQuMXM5LjItMS40IDEyLjYtNC4xbDM0NC43LTI2OC42YzYuOS01LjQgMTIuNi0xNyAxMi42LTI1LjlWMTkxLjFjLjItOC44LTYuNi0xOC4zLTE0LjktMjEuMnpNODEwIDY1NC4zTDUxMiA4ODYuNSAyMTQgNjU0LjNWMjI2LjdsMjk4LTEwMS42IDI5OCAxMDEuNnY0MjcuNnpNNDMwLjUgMzE4aC00NmMtMS43IDAtMy4zLjQtNC44IDEuMmExMC4xIDEwLjEgMCAwMC00IDEzLjZsODggMTYxLjFoLTQ1LjJjLTUuNSAwLTEwIDQuNS0xMCAxMHYyMS4zYzAgNS41IDQuNSAxMCAxMCAxMGg2My4xdjI5LjdoLTYzLjFjLTUuNSAwLTEwIDQuNS0xMCAxMHYyMS4zYzAgNS41IDQuNSAxMCAxMCAxMGg2My4xVjY1OGMwIDUuNSA0LjUgMTAgMTAgMTBoNDEuM2M1LjUgMCAxMC00LjUgMTAtMTB2LTUxLjhoNjMuNGM1LjUgMCAxMC00LjUgMTAtMTB2LTIxLjNjMC01LjUtNC41LTEwLTEwLTEwaC02My40di0yOS43aDYzLjRjNS41IDAgMTAtNC41IDEwLTEwdi0yMS4zYzAtNS41LTQuNS0xMC0xMC0xMGgtNDUuN2w4Ny43LTE2MS4xYTEwLjA1IDEwLjA1IDAgMDAtOC44LTE0LjhoLTQ1Yy0zLjggMC03LjIgMi4xLTguOSA1LjVsLTczLjIgMTQ0LjMtNzIuOS0xNDQuM2MtMS43LTMuNC01LjItNS41LTktNS41eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PropertySafetyOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PropertySafetyOutlined';
}
var _default = RefIcon;
