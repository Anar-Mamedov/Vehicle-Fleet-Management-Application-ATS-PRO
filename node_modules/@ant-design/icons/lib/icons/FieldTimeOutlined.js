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
var _FieldTimeOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FieldTimeOutlined"));
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
var FieldTimeOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FieldTimeOutlined.default
    }));
};
/**![field-time](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik05NDUgNDEySDY4OWMtNC40IDAtOCAzLjYtOCA4djQ4YzAgNC40IDMuNiA4IDggOGgyNTZjNC40IDAgOC0zLjYgOC04di00OGMwLTQuNC0zLjYtOC04LTh6TTgxMSA1NDhINjg5Yy00LjQgMC04IDMuNi04IDh2NDhjMCA0LjQgMy42IDggOCA4aDEyMmM0LjQgMCA4LTMuNiA4LTh2LTQ4YzAtNC40LTMuNi04LTgtOHpNNDc3LjMgMzIyLjVINDM0Yy02LjIgMC0xMS4yIDUtMTEuMiAxMS4ydjI0OGMwIDMuNiAxLjcgNi45IDQuNiA5bDE0OC45IDEwOC42YzUgMy42IDEyIDIuNiAxNS42LTIuNGwyNS43LTM1LjF2LS4xYzMuNi01IDIuNS0xMi0yLjUtMTUuNmwtMTI2LjctOTEuNlYzMzMuN2MuMS02LjItNS0xMS4yLTExLjEtMTEuMnoiIC8+PHBhdGggZD0iTTgwNC44IDY3My45SDc0N2MtNS42IDAtMTAuOSAyLjktMTMuOSA3LjdhMzIxIDMyMSAwIDAxLTQ0LjUgNTUuNyAzMTcuMTcgMzE3LjE3IDAgMDEtMTAxLjMgNjguM2MtMzkuMyAxNi42LTgxIDI1LTEyNCAyNS00My4xIDAtODQuOC04LjQtMTI0LTI1LTM3LjktMTYtNzItMzktMTAxLjMtNjguM3MtNTIuMy02My40LTY4LjMtMTAxLjNjLTE2LjYtMzkuMi0yNS04MC45LTI1LTEyNCAwLTQzLjEgOC40LTg0LjcgMjUtMTI0IDE2LTM3LjkgMzktNzIgNjguMy0xMDEuMyAyOS4zLTI5LjMgNjMuNC01Mi4zIDEwMS4zLTY4LjMgMzkuMi0xNi42IDgxLTI1IDEyNC0yNSA0My4xIDAgODQuOCA4LjQgMTI0IDI1IDM3LjkgMTYgNzIgMzkgMTAxLjMgNjguM2EzMjEgMzIxIDAgMDE0NC41IDU1LjdjMyA0LjggOC4zIDcuNyAxMy45IDcuN2g1Ny44YzYuOSAwIDExLjMtNy4yIDguMi0xMy4zLTY1LjItMTI5LjctMTk3LjQtMjE0LTM0NS0yMTUuNy0yMTYuMS0yLjctMzk1LjYgMTc0LjItMzk2IDM5MC4xQzcxLjYgNzI3LjUgMjQ2LjkgOTAzIDQ2My4yIDkwM2MxNDkuNSAwIDI4My45LTg0LjYgMzQ5LjgtMjE1LjhhOS4xOCA5LjE4IDAgMDAtOC4yLTEzLjN6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FieldTimeOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FieldTimeOutlined';
}
var _default = RefIcon;
