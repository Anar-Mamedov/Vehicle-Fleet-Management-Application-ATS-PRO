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
var _AlibabaOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AlibabaOutlined"));
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
var AlibabaOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AlibabaOutlined.default
    }));
};
/**![alibaba](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwMi45IDY2OS44Yy0zNy4yIDIuNi0zMy42LTE3LjMtMTEuNS00Ni4yIDUwLjQtNjcuMiAxNDMuNy0xNTguNSAxNDcuOS0yMjUuMiA1LjgtODYuNi04MS4zLTExMy40LTE3MS0xMTMuNC02Mi40IDEuNi0xMjcgMTguOS0xNzEgMzQuNi0xNTEuNiA1My41LTI0Ni42IDEzNy41LTMwNi45IDIzMi02Mi40IDkzLjQtNDMgMTgzLjIgOTEuOCAxODUuOCAxMDEuOC00LjIgMTcwLjUtMzIuNSAyMzkuNy02OC4yLjUgMC0xOTIuNSA1NS4xLTI2My45IDE0LjctNy45LTQuMi0xNS43LTEwLTE3LjgtMjYuMiAwLTMzLjEgNTQuNi02Ny43IDg2LjYtNzguN3YtNTYuN2M2NC41IDIyLjYgMTQwLjYgMTYuMyAyMDUuNy0zMiAyLjEgNS44IDQuMiAxMy4xIDMuNyAyMWgxMWMyLjYtMjIuNi0xMi42LTQ0LjYtMzcuOC00Ni4yIDcuMyA1LjggMTIuNiAxMC41IDE1LjIgMTQuN2wtMSAxLS41LjVjLTgzLjkgNTguOC0xNjUuMyAzMS41LTE3My4xIDI5LjlsNDYuNy00NS43LTEzLjEtMzMuMWM5Mi45LTMyLjUgMTY5LjUtNTYuMiAyOTYuOS03OC43bC0yOC41LTIzIDE0LjctOC45Yzc1LjUgMjEgMTI2LjQgMzYuNyAxMjMuOCA3Ni42LTEgNi44LTMuNyAxNC43LTcuOSAyMy4xQzY2MC4xIDQ2Ni4xIDU5NCA1MzggNTY3LjIgNTY5Yy0xNy4zIDIwLjUtMzQuNiAzOS40LTQ2LjcgNTguMy0xMy42IDE5LjQtMjAuNSAzNy4zLTIxIDUzLjUgMi42IDEzMS44IDM5MS40LTYxLjkgNDY4LTExMi45LTExMS43IDQ3LjgtMjMyLjkgOTMuNS0zNjQuNiAxMDEuOXptODUtMzAyLjljMi44IDUuMiA0LjEgMTEuNiA0LjEgMTkuMS0uMS02LjgtMS40LTEzLjMtNC4xLTE5LjF6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AlibabaOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AlibabaOutlined';
}
var _default = RefIcon;
