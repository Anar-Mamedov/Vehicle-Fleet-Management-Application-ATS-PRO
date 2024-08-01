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
var _BilibiliFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/BilibiliFilled"));
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
var BilibiliFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _BilibiliFilled.default
    }));
};
/**![bilibili](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzEwLjEzIDU5Ni40NWMtOC00LjQ2LTE2LjUtOC40My0yNS0xMS45YTI3My41NSAyNzMuNTUgMCAwMC0yNi45OS03LjQ0Yy0yLjUtLjk5LTIuNSAxLTIuNSAxLjQ5IDAgNy45My41IDE4Ljg0IDEuNSAyNy43NyAxIDcuNDQgMiAxNS4zNyA0IDIyLjggMCAuNSAwIDEgLjUgMS41IDEgLjk5IDIgMS40OCAzIC40OSA4LTQuNDYgMTYtOC40MyAyMy0xMy4zOSA3LjUtNS40NSAxNS41LTExLjkgMjItMTguMzUgMS41LTEuNDggMC0yLjQ3LjUtMi45N20zMjMuOTUtMTEuOWEyNzMuNTUgMjczLjU1IDAgMDAtMjctNy40NGMtMi41LS45OS0yLjUgMS0yLjUgMS40OSAwIDcuOTMuNSAxOC44NCAxLjUgMjcuNzcgMSA3LjQzIDIgMTUuMzcgNCAyMi44IDAgLjUgMCAxIC41IDEuNSAxIC45OSAyIDEuNDggMyAuNDkgOC00LjQ2IDE2LTguNDMgMjMtMTMuMzkgNy41LTUuNDUgMTUuNS0xMS45IDIyLTE4LjM1IDItMS40OC41LTIuNDcuNS0yLjk3LTcuNS00LjQ2LTE2LjUtOC40My0yNS0xMS45IiAvPjxwYXRoIGQ9Ik03NDEuNSAxMTJIMjgzYy05NC41IDAtMTcxIDc2LjUtMTcxIDE3MS41djQ1OGMuNSA5NCA3NyAxNzAuNSAxNzEgMTcwLjVoNDU4Yzk0LjUgMCAxNzEtNzYuNSAxNzEtMTcwLjV2LTQ1OGMuNS05NS03Ni0xNzEuNS0xNzAuNS0xNzEuNW05NSAzNDMuNUg4NTJ2NDhoLTE1LjV6TTc0MSA0NTRsMiA0My0xMy41IDEuNS01LTQ0LjV6bS0yMy41IDBsNCA0NS41TDcwNyA1MDFsLTYuNS00Ny41aDE3ek00ODcgNDU1LjVoMTV2NDhoLTE1em0tOTYtMS41bDIgNDMtMTMuNSAxLjUtNS00NC41em0tMjMuNSAwbDQgNDUuNS0xNC41IDItNi00Ny41ek0zNjQgNjAzYy0yMC41IDY1LjUtMTQ4IDU5LjUtMTU5LjUgNTcuNS05LTE2MS41LTIzLTE5Ni41LTM0LjUtMjc1LjVsNTQuNS0yMi41YzEgNzEuNSA5IDE4NSA5IDE4NXMxMDguNS0xNS41IDEzMiA0N2MuNSAzIDAgNi0xLjUgOC41bTIwLjUgMzUuNWwtMjMuNS0xMjRoMzUuNWwxMyAxMjN6bTQ0LjUtOGwtMjctMjM1IDMzLjUtMS41IDIxIDIzNkg0Mjl6bTM0LTE3NWgxNy41djQ4SDQ2N3ptNDEgMTkwaC0yNi41bC05LjUtMTI2aDM2em0yMTAtNDNDNjkzLjUgNjY4IDU2NiA2NjIgNTU0LjUgNjYwYy05LTE2MS0yMy0xOTYtMzQuNS0yNzVsNTQuNS0yMi41YzEgNzEuNSA5IDE4NSA5IDE4NVM2OTIgNTMyIDcxNS41IDU5NGMuNSAzIDAgNi0xLjUgOC41bTE5LjUgMzZsLTIzLTEyNEg3NDZsMTMgMTIzem00NS41LThsLTI3LjUtMjM1TDc4NSAzOTRsMjEgMjM2aC0yN3ptMzMuNS0xNzVIODMwdjQ4aC0xM3ptNDEgMTkwSDgyN2wtOS41LTEyNmgzNnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(BilibiliFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'BilibiliFilled';
}
var _default = RefIcon;
