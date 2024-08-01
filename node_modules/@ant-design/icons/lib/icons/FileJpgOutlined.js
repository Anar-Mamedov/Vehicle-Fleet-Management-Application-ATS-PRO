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
var _FileJpgOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FileJpgOutlined"));
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
var FileJpgOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FileJpgOutlined.default
    }));
};
/**![file-jpg](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg3NC42IDMwMS44TDU5Ni44IDIxLjNjLTQuNS00LjUtOS40LTguMy0xNC43LTExLjUtMS40LS44LTIuOC0xLjYtNC4zLTIuMy0uOS0uNS0xLjktLjktMi44LTEuMy05LTQtMTguOS02LjItMjktNi4ySDIwMWMtMzkuOCAwLTczIDMyLjItNzMgNzJ2ODgwYzAgMzkuOCAzMy4yIDcyIDczIDcyaDYyM2MzOS44IDAgNzEtMzIuMiA3MS03MlYzNTIuNWMwLTE5LTctMzcuMi0yMC40LTUwLjd6TTU4MyAxMTAuNEw3ODMuOCAzMTJINTgzVjExMC40ek04MjMgOTUySDIwMFY3MmgzMTF2MjQwYzAgMzkuOCAzMy4yIDcyIDczIDcyaDIzOXY1Njh6TTM1MCA2OTYuNWMwIDI0LjItNy41IDMxLjQtMjEuOSAzMS40LTkgMC0xOC40LTUuOC0yNC44LTE4LjVMMjcyLjkgNzMyYzEzLjQgMjIuOSAzMi4zIDM0LjIgNjEuMyAzNC4yIDQxLjYgMCA2MC44LTI5LjkgNjAuOC02Ni4yVjU3N2gtNDV2MTE5LjV6TTUwMS4zIDU3N0g0Mzd2MTg2aDQ0di02MmgyMS42YzM5LjEgMCA3My4xLTE5LjYgNzMuMS02My42IDAtNDUuOC0zMy41LTYwLjQtNzQuNC02MC40em0tLjggODlINDgxdi01M2gxOC4yYzIxLjUgMCAzMy40IDYuMiAzMy40IDI0LjkgMCAxOC4xLTEwLjUgMjguMS0zMi4xIDI4LjF6bTE4Mi41LTl2MzZoMzB2MzAuMWMtNCAyLjktMTEgNC43LTE3LjcgNC43LTM0LjMgMC01MC43LTIxLjQtNTAuNy01OC4yIDAtMzYuMSAxOS43LTU3LjQgNDcuMS01Ny40IDE1LjMgMCAyNSA2LjIgMzQgMTQuNGwyMy43LTI4LjNjLTEyLjctMTIuOC0zMi4xLTI0LjItNTkuMi0yNC4yLTQ5LjYgMC05MS4xIDM1LjMtOTEuMSA5NyAwIDYyLjcgNDAgOTUuMSA5MS41IDk1LjEgMjUuOSAwIDQ5LjItMTAuMiA2MS41LTIyLjZWNjU3SDY4M3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FileJpgOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FileJpgOutlined';
}
var _default = RefIcon;
