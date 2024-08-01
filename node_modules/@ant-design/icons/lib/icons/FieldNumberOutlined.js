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
var _FieldNumberOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FieldNumberOutlined"));
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
var FieldNumberOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FieldNumberOutlined.default
    }));
};
/**![field-number](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik01MDggMjgwaC02My4zYy0zLjMgMC02IDIuNy02IDZ2MzQwLjJINDMzTDE5Ny40IDI4Mi42Yy0xLjEtMS42LTMtMi42LTQuOS0yLjZIMTI2Yy0zLjMgMC02IDIuNy02IDZ2NDY0YzAgMy4zIDIuNyA2IDYgNmg2Mi43YzMuMyAwIDYtMi43IDYtNlY0MDUuMWg1LjdsMjM4LjIgMzQ4LjNjMS4xIDEuNiAzIDIuNiA1IDIuNkg1MDhjMy4zIDAgNi0yLjcgNi02VjI4NmMwLTMuMy0yLjctNi02LTZ6bTM3OCA0MTNINTgyYy00LjQgMC04IDMuNi04IDh2NDhjMCA0LjQgMy42IDggOCA4aDMwNGM0LjQgMCA4LTMuNiA4LTh2LTQ4YzAtNC40LTMuNi04LTgtOHptLTE1Mi4yLTYzYzUyLjkgMCA5NS4yLTE3LjIgMTI2LjItNTEuNyAyOS40LTMyLjkgNDQtNzUuOCA0NC0xMjguOCAwLTUzLjEtMTQuNi05Ni41LTQ0LTEyOS4zLTMwLjktMzQuOC03My4yLTUyLjItMTI2LjItNTIuMi01My43IDAtOTUuOSAxNy41LTEyNi4zIDUyLjgtMjkuMiAzMy4xLTQzLjQgNzUuOS00My40IDEyOC43IDAgNTIuNCAxNC4zIDk1LjIgNDMuNSAxMjguMyAzMC42IDM0LjcgNzMgNTIuMiAxMjYuMiA1Mi4yem0tNzEuNS0yNjMuN2MxNi45LTIwLjYgNDAuMy0zMC45IDcxLjQtMzAuOSAzMS41IDAgNTQuOCA5LjYgNzEgMjkuMSAxNi40IDIwLjMgMjQuOSA0OC42IDI0LjkgODQuOSAwIDM2LjMtOC40IDY0LjEtMjQuOCA4My45LTE2LjUgMTkuNC00MCAyOS4yLTcxLjEgMjkuMi0zMS4yIDAtNTUtMTAuMy03MS40LTMwLjQtMTYuMy0yMC4xLTI0LjUtNDcuMy0yNC41LTgyLjYuMS0zNS44IDguMi02MyAyNC41LTgzLjJ6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FieldNumberOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FieldNumberOutlined';
}
var _default = RefIcon;
