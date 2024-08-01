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
var _SignatureFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SignatureFilled"));
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
var SignatureFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SignatureFilled.default
    }));
};
/**![signature](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQ1LjcxIDc1MmMyIDAgNC0uMiA1Ljk4LS41TDMxOS45IDcyMmMxLjk5LS40IDMuODgtMS4zIDUuMjgtMi44bDQyMy45MS00MjMuODdhOS45MyA5LjkzIDAgMDAwLTE0LjA2TDU4Mi44OCAxMTQuOUM1ODEgMTEzIDU3OC41IDExMiA1NzUuODIgMTEycy01LjE4IDEtNy4wOCAyLjlMMTQ0LjgyIDUzOC43NmMtMS41IDEuNS0yLjQgMy4yOS0yLjggNS4yOGwtMjkuNSAxNjguMTdhMzMuNTkgMzMuNTkgMCAwMDkuMzcgMjkuODFjNi41OCA2LjQ4IDE0Ljk1IDkuOTcgMjMuODIgOS45N200NTMuMTItMTg0LjA3YzI3LjY5LTE0LjgxIDU3LjI5LTIwLjg1IDg1LjU0LTE1LjUyIDMyLjM3IDYuMSA1OS43MiAyNi41MyA3OC45NiA1OS40IDI5Ljk3IDUxLjIyIDIxLjY0IDEwMi4zNC0xOC40OCAxNDQuMjYtMTcuNTggMTguMzYtNDEuMDcgMzUuMDEtNzAgNTAuM2wtLjMuMTUuODYuMjZhMTQ3Ljg4IDE0Ny44OCAwIDAwNDEuNTQgNi4ybDEuMTcuMDFjNjEuMDcgMCAxMDAuOTgtMjIuMSAxMjUuMjgtNjcuODdhMzYgMzYgMCAwMTYzLjYgMzMuNzZDODY5LjcgODQ5LjEgODA0LjkgODg1IDcxOC4xMiA4ODVjLTQ3LjY5IDAtOTEuOTQtMTUuMDMtMTI4LjE5LTQxLjM2bC0xLjA1LS43OC0xLjM2LjQ3Yy00Ni4xOCAxNi05OC43NCAyOS45NS0xNTUuMzcgNDEuOTRsLTIuMjQuNDdhMTkzMS4xIDE5MzEuMSAwIDAxLTEzOS4xNiAyMy45NiAzNiAzNiAwIDExLTkuNS03MS4zOCAxODYwLjEgMTg2MC4xIDAgMDAxMzMuODQtMjMuMDRjNDIuOC05IDgzLTE5LjEzIDExOS4zNS0zMC4zNGwuMjQtLjA4LS40NC0uNjljLTE2LjQ2LTI2LjQ1LTI1Ljg2LTU1LjQzLTI2LjE0LTgzLjI0di0xLjNjMC00OS45IDM5LjU1LTEwNC4zMiA5MC43My0xMzEuN002NzEgNjIzLjE3Yy0xMC43NC0yLjAzLTI0LjEuNy0zOC4yMiA4LjI2LTI5LjU1IDE1LjgtNTIuNyA0Ny42NC01Mi43IDY4LjIgMCAxOC4yIDguOSA0MC4xNCAyNC43MSA1OS43M2wuMjQuMyAxLjIyLS41MmMzOS4xNy0xNi41OCA2OC40OS0zNC4yNyA4NS45My01Mi4xOGwuNjQtLjY3YzE4Ljc0LTE5LjU3IDIxLjM5LTM1Ljg0IDguMzYtNTguMS05LjA2LTE1LjQ3LTE5LjAzLTIyLjkyLTMwLjE4LTI1LjAyIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SignatureFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SignatureFilled';
}
var _default = RefIcon;
