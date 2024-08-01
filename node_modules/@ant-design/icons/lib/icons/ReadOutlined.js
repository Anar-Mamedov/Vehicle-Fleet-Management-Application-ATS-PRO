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
var _ReadOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ReadOutlined"));
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
var ReadOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ReadOutlined.default
    }));
};
/**![read](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkyOCAxNjFINjk5LjJjLTQ5LjEgMC05Ny4xIDE0LjEtMTM4LjQgNDAuN0w1MTIgMjMzbC00OC44LTMxLjNBMjU1LjIgMjU1LjIgMCAwMDMyNC44IDE2MUg5NmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2NTY4YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDIyOC44YzQ5LjEgMCA5Ny4xIDE0LjEgMTM4LjQgNDAuN2w0NC40IDI4LjZjMS4zLjggMi44IDEuMyA0LjMgMS4zczMtLjQgNC4zLTEuM2w0NC40LTI4LjZDNjAyIDgwNy4xIDY1MC4xIDc5MyA2OTkuMiA3OTNIOTI4YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE5M2MwLTE3LjctMTQuMy0zMi0zMi0zMnpNMzI0LjggNzIxSDEzNlYyMzNoMTg4LjhjMzUuNCAwIDY5LjggMTAuMSA5OS41IDI5LjJsNDguOCAzMS4zIDYuOSA0LjV2NDYyYy00Ny42LTI1LjYtMTAwLjgtMzktMTU1LjItMzl6bTU2My4yIDBINjk5LjJjLTU0LjQgMC0xMDcuNiAxMy40LTE1NS4yIDM5VjI5OGw2LjktNC41IDQ4LjgtMzEuM2MyOS43LTE5LjEgNjQuMS0yOS4yIDk5LjUtMjkuMkg4ODh2NDg4ek0zOTYuOSAzNjFIMjExLjFjLTMuOSAwLTcuMSAzLjQtNy4xIDcuNXY0NWMwIDQuMSAzLjIgNy41IDcuMSA3LjVoMTg1LjdjMy45IDAgNy4xLTMuNCA3LjEtNy41di00NWMuMS00LjEtMy4xLTcuNS03LTcuNXptMjIzLjEgNy41djQ1YzAgNC4xIDMuMiA3LjUgNy4xIDcuNWgxODUuN2MzLjkgMCA3LjEtMy40IDcuMS03LjV2LTQ1YzAtNC4xLTMuMi03LjUtNy4xLTcuNUg2MjcuMWMtMy45IDAtNy4xIDMuNC03LjEgNy41ek0zOTYuOSA1MDFIMjExLjFjLTMuOSAwLTcuMSAzLjQtNy4xIDcuNXY0NWMwIDQuMSAzLjIgNy41IDcuMSA3LjVoMTg1LjdjMy45IDAgNy4xLTMuNCA3LjEtNy41di00NWMuMS00LjEtMy4xLTcuNS03LTcuNXptNDE2IDBINjI3LjFjLTMuOSAwLTcuMSAzLjQtNy4xIDcuNXY0NWMwIDQuMSAzLjIgNy41IDcuMSA3LjVoMTg1LjdjMy45IDAgNy4xLTMuNCA3LjEtNy41di00NWMuMS00LjEtMy4xLTcuNS03LTcuNXoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ReadOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ReadOutlined';
}
var _default = RefIcon;
