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
var _FieldBinaryOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FieldBinaryOutlined"));
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
var FieldBinaryOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FieldBinaryOutlined.default
    }));
};
/**![field-binary](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik02MDAgMzk1LjRoOTFWNjQ5aDc5VjI2N2MwLTQuNC0zLjYtOC04LThoLTQ4LjJjLTMuNyAwLTcgMi42LTcuNyA2LjMtMi42IDEyLjEtNi45IDIyLjMtMTIuOSAzMC45YTg2LjE0IDg2LjE0IDAgMDEtMjYuMyAyNC40Yy0xMC4zIDYuMi0yMiAxMC41LTM1IDEyLjktMTAuNCAxLjktMjEgMy0zMiAzLjFhOCA4IDAgMDAtNy45IDh2NDIuOGMwIDQuNCAzLjYgOCA4IDh6TTg3MSA3MDJINTY3Yy00LjQgMC04IDMuNi04IDh2NDhjMCA0LjQgMy42IDggOCA4aDMwNGM0LjQgMCA4LTMuNiA4LTh2LTQ4YzAtNC40LTMuNi04LTgtOHpNNDQzLjkgMzEyLjdjLTE2LjEtMTktMzQuNC0zMi40LTU1LjItNDAuNC0yMS4zLTguMi00NC4xLTEyLjMtNjguNC0xMi4zLTIzLjkgMC00Ni40IDQuMS02Ny43IDEyLjMtMjAuOCA4LTM5IDIxLjQtNTQuOCA0MC4zLTE1LjkgMTkuMS0yOC43IDQ0LjctMzguMyA3Ny05LjYgMzIuNS0xNC41IDczLTE0LjUgMTIxLjUgMCA0OS45IDQuOSA5MS40IDE0LjUgMTI0LjQgOS42IDMyLjggMjIuNCA1OC43IDM4LjMgNzcuNyAxNS44IDE4LjkgMzQgMzIuMyA1NC44IDQwLjMgMjEuMyA4LjIgNDMuOCAxMi4zIDY3LjcgMTIuMyAyNC40IDAgNDcuMi00LjEgNjguNC0xMi4zIDIwLjgtOCAzOS4yLTIxLjQgNTUuMi00MC40IDE2LjEtMTkgMjktNDQuOSAzOC42LTc3LjcgOS42LTMzIDE0LjUtNzQuNSAxNC41LTEyNC40IDAtNDguNC00LjktODguOS0xNC41LTEyMS41LTkuNS0zMi4xLTIyLjQtNTcuNy0zOC42LTc2Ljh6bS0yOS41IDI1MS43Yy0xIDIxLjQtNC4yIDQyLTkuNSA2MS45LTUuNSAyMC43LTE0LjUgMzguNS0yNyA1My40LTEzLjYgMTYuMy0zMy4yIDI0LjMtNTcuNiAyNC4zLTI0IDAtNDMuMi04LjEtNTYuNy0yNC40LTEyLjItMTQuOC0yMS4xLTMyLjYtMjYuNi01My4zLTUuMy0xOS45LTguNS00MC42LTkuNS02MS45LTEtMjAuOC0xLjUtMzguNS0xLjUtNTMuMiAwLTguOC4xLTE5LjQuNC0zMS44LjItMTIuNyAxLjEtMjUuOCAyLjYtMzkuMiAxLjUtMTMuNiA0LTI3LjEgNy42LTQwLjUgMy43LTEzLjggOC44LTI2LjMgMTUuNC0zNy40IDYuOS0xMS42IDE1LjgtMjEuMSAyNi43LTI4LjMgMTEuNC03LjYgMjUuMy0xMS4zIDQxLjUtMTEuMyAxNi4xIDAgMzAuMSAzLjcgNDEuNyAxMS4yYTg3Ljk0IDg3Ljk0IDAgMDEyNy40IDI4LjJjNi45IDExLjIgMTIuMSAyMy44IDE1LjYgMzcuNyAzLjMgMTMuMiA1LjggMjYuNiA3LjUgNDAuMSAxLjggMTMuNSAyLjggMjYuNiAzIDM5LjQuMiAxMi40LjQgMjMgLjQgMzEuOC4xIDE0LjgtLjQgMzIuNS0xLjQgNTMuM3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FieldBinaryOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FieldBinaryOutlined';
}
var _default = RefIcon;
