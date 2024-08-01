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
var _ShoppingCartOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ShoppingCartOutlined"));
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
var ShoppingCartOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ShoppingCartOutlined.default
    }));
};
/**![shopping-cart](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkyMi45IDcwMS45SDMyNy40bDI5LjktNjAuOSA0OTYuOC0uOWMxNi44IDAgMzEuMi0xMiAzNC4yLTI4LjZsNjguOC0zODUuMWMxLjgtMTAuMS0uOS0yMC41LTcuNS0yOC40YTM0Ljk5IDM0Ljk5IDAgMDAtMjYuNi0xMi41bC02MzItMi4xLTUuNC0yNS40Yy0zLjQtMTYuMi0xOC0yOC0zNC42LTI4SDk2LjVhMzUuMyAzNS4zIDAgMTAwIDcwLjZoMTI1LjlMMjQ2IDMxMi44bDU4LjEgMjgxLjMtNzQuOCAxMjIuMWEzNC45NiAzNC45NiAwIDAwLTMgMzYuOGM2IDExLjkgMTguMSAxOS40IDMxLjUgMTkuNGg2Mi44YTEwMi40MyAxMDIuNDMgMCAwMC0yMC42IDYxLjdjMCA1Ni42IDQ2IDEwMi42IDEwMi42IDEwMi42czEwMi42LTQ2IDEwMi42LTEwMi42YzAtMjIuMy03LjQtNDQtMjAuNi02MS43aDE2MS4xYTEwMi40MyAxMDIuNDMgMCAwMC0yMC42IDYxLjdjMCA1Ni42IDQ2IDEwMi42IDEwMi42IDEwMi42czEwMi42LTQ2IDEwMi42LTEwMi42YzAtMjIuMy03LjQtNDQtMjAuNi02MS43SDkyM2MxOS40IDAgMzUuMy0xNS44IDM1LjMtMzUuM2EzNS40MiAzNS40MiAwIDAwLTM1LjQtMzUuMnpNMzA1LjcgMjUzbDU3NS44IDEuOS01Ni40IDMxNS44LTQ1Mi4zLjhMMzA1LjcgMjUzem05Ni45IDYxMi43Yy0xNy40IDAtMzEuNi0xNC4yLTMxLjYtMzEuNiAwLTE3LjQgMTQuMi0zMS42IDMxLjYtMzEuNnMzMS42IDE0LjIgMzEuNiAzMS42YTMxLjYgMzEuNiAwIDAxLTMxLjYgMzEuNnptMzI1LjEgMGMtMTcuNCAwLTMxLjYtMTQuMi0zMS42LTMxLjYgMC0xNy40IDE0LjItMzEuNiAzMS42LTMxLjZzMzEuNiAxNC4yIDMxLjYgMzEuNmEzMS42IDMxLjYgMCAwMS0zMS42IDMxLjZ6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ShoppingCartOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ShoppingCartOutlined';
}
var _default = RefIcon;
