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
var _WechatOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/WechatOutlined"));
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
var WechatOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _WechatOutlined.default
    }));
};
/**![wechat](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY5MC4xIDM3Ny40YzUuOSAwIDExLjguMiAxNy42LjUtMjQuNC0xMjguNy0xNTguMy0yMjcuMS0zMTkuOS0yMjcuMUMyMDkgMTUwLjggNjQgMjcxLjQgNjQgNDIwLjJjMCA4MS4xIDQzLjYgMTU0LjIgMTExLjkgMjAzLjZhMjEuNSAyMS41IDAgMDE5LjEgMTcuNmMwIDIuNC0uNSA0LjYtMS4xIDYuOS01LjUgMjAuMy0xNC4yIDUyLjgtMTQuNiA1NC4zLS43IDIuNi0xLjcgNS4yLTEuNyA3LjkgMCA1LjkgNC44IDEwLjggMTAuOCAxMC44IDIuMyAwIDQuMi0uOSA2LjItMmw3MC45LTQwLjljNS4zLTMuMSAxMS01IDE3LjItNSAzLjIgMCA2LjQuNSA5LjUgMS40IDMzLjEgOS41IDY4LjggMTQuOCAxMDUuNyAxNC44IDYgMCAxMS45LS4xIDE3LjgtLjQtNy4xLTIxLTEwLjktNDMuMS0xMC45LTY2IDAtMTM1LjggMTMyLjItMjQ1LjggMjk1LjMtMjQ1Ljh6bS0xOTQuMy04Ni41YzIzLjggMCA0My4yIDE5LjMgNDMuMiA0My4xcy0xOS4zIDQzLjEtNDMuMiA0My4xYy0yMy44IDAtNDMuMi0xOS4zLTQzLjItNDMuMXMxOS40LTQzLjEgNDMuMi00My4xem0tMjE1LjkgODYuMmMtMjMuOCAwLTQzLjItMTkuMy00My4yLTQzLjFzMTkuMy00My4xIDQzLjItNDMuMSA0My4yIDE5LjMgNDMuMiA0My4xLTE5LjQgNDMuMS00My4yIDQzLjF6bTU4Ni44IDQxNS42YzU2LjktNDEuMiA5My4yLTEwMiA5My4yLTE2OS43IDAtMTI0LTEyMC44LTIyNC41LTI2OS45LTIyNC41LTE0OSAwLTI2OS45IDEwMC41LTI2OS45IDIyNC41UzU0MC45IDg0Ny41IDY5MCA4NDcuNWMzMC44IDAgNjAuNi00LjQgODguMS0xMi4zIDIuNi0uOCA1LjItMS4yIDcuOS0xLjIgNS4yIDAgOS45IDEuNiAxNC4zIDQuMWw1OS4xIDM0YzEuNyAxIDMuMyAxLjcgNS4yIDEuN2E5IDkgMCAwMDYuNC0yLjYgOSA5IDAgMDAyLjYtNi40YzAtMi4yLS45LTQuNC0xLjQtNi42LS4zLTEuMi03LjYtMjguMy0xMi4yLTQ1LjMtLjUtMS45LS45LTMuOC0uOS01LjcuMS01LjkgMy4xLTExLjIgNy42LTE0LjV6TTYwMC4yIDU4Ny4yYy0xOS45IDAtMzYtMTYuMS0zNi0zNS45IDAtMTkuOCAxNi4xLTM1LjkgMzYtMzUuOXMzNiAxNi4xIDM2IDM1LjljMCAxOS44LTE2LjIgMzUuOS0zNiAzNS45em0xNzkuOSAwYy0xOS45IDAtMzYtMTYuMS0zNi0zNS45IDAtMTkuOCAxNi4xLTM1LjkgMzYtMzUuOXMzNiAxNi4xIDM2IDM1LjlhMzYuMDggMzYuMDggMCAwMS0zNiAzNS45eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(WechatOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'WechatOutlined';
}
var _default = RefIcon;
