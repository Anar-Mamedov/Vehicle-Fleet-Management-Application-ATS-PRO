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
var _SunFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SunFilled"));
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
var SunFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SunFilled.default
    }));
};
/**![sun](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQ4IDgxOHYxMjZhMTYgMTYgMCAwMS0xNiAxNmgtNDBhMTYgMTYgMCAwMS0xNi0xNlY4MThjMTUuODUgMS42NCAyNy44NCAyLjQ2IDM2IDIuNDYgOC4xNSAwIDIwLjE2LS44MiAzNi0yLjQ2bTIwNS4yNS0xMTUuNjZsODkuMSA4OS4xYTE2IDE2IDAgMDEwIDIyLjYybC0yOC4yOSAyOC4yOWExNiAxNiAwIDAxLTIyLjYyIDBsLTg5LjEtODkuMWMxMi4zNy0xMC4wNCAyMS40My0xNy45NSAyNy4yLTIzLjcxIDUuNzYtNS43NyAxMy42Ny0xNC44NCAyMy43MS0yNy4ybS00ODIuNSAwYzEwLjA0IDEyLjM2IDE3Ljk1IDIxLjQzIDIzLjcxIDI3LjIgNS43NyA1Ljc2IDE0Ljg0IDEzLjY3IDI3LjIgMjMuNzFsLTg5LjEgODkuMWExNiAxNiAwIDAxLTIyLjYyIDBsLTI4LjI5LTI4LjI5YTE2IDE2IDAgMDEwLTIyLjYzek01MTIgMjc4YzEyOS4yNCAwIDIzNCAxMDQuNzcgMjM0IDIzNFM2NDEuMjQgNzQ2IDUxMiA3NDYgMjc4IDY0MS4yNCAyNzggNTEyczEwNC43Ny0yMzQgMjM0LTIzNE0yMDYgNDc2Yy0xLjY0IDE1Ljg1LTIuNDYgMjcuODQtMi40NiAzNiAwIDguMTUuODIgMjAuMTYgMi40NiAzNkg4MGExNiAxNiAwIDAxLTE2LTE2di00MGExNiAxNiAwIDAxMTYtMTZ6bTczOCAwYTE2IDE2IDAgMDExNiAxNnY0MGExNiAxNiAwIDAxLTE2IDE2SDgxOGMxLjY0LTE1Ljg1IDIuNDYtMjcuODQgMi40Ni0zNiAwLTguMTUtLjgyLTIwLjE2LTIuNDYtMzZ6TTgxNC4wNiAxODAuNjVsMjguMjkgMjguMjlhMTYgMTYgMCAwMTAgMjIuNjNsLTg5LjEgODkuMDljLTEwLjA0LTEyLjM3LTE3Ljk1LTIxLjQzLTIzLjcxLTI3LjItNS43Ny01Ljc2LTE0Ljg0LTEzLjY3LTI3LjItMjMuNzFsODkuMS04OS4xYTE2IDE2IDAgMDEyMi42MiAwbS01ODEuNSAwbDg5LjEgODkuMWMtMTIuMzcgMTAuMDQtMjEuNDMgMTcuOTUtMjcuMiAyMy43MS01Ljc2IDUuNzctMTMuNjcgMTQuODQtMjMuNzEgMjcuMmwtODkuMS04OS4xYTE2IDE2IDAgMDEwLTIyLjYybDI4LjI5LTI4LjI5YTE2IDE2IDAgMDEyMi42MiAwTTUzMiA2NGExNiAxNiAwIDAxMTYgMTZ2MTI2Yy0xNS44NS0xLjY0LTI3Ljg0LTIuNDYtMzYtMi40Ni04LjE1IDAtMjAuMTYuODItMzYgMi40NlY4MGExNiAxNiAwIDAxMTYtMTZ6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SunFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SunFilled';
}
var _default = RefIcon;
