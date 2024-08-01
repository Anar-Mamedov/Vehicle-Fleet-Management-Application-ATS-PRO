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
var _AlipayOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AlipayOutlined"));
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
var AlipayOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AlipayOutlined.default
    }));
};
/**![alipay](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTU3LjIgMTI5YTYuNjggNi42OCAwIDAxNi43MiA2LjY1VjI1MC4yaDI0My44YTYuNzQgNi43NCAwIDAxNi42NSA2Ljg0Yy4wMiAyMy45Mi02LjA1IDU0LjY5LTE5Ljg1IDU0LjY5SDU2My45NHY4MS4xaDE2Ni4xOGM3LjY5IDAgMTMuOCA2LjUxIDEzLjI1IDE0LjE4bC0uMTEgMS41MWMtLjcgOTAuMi0zMC42MyAxODAuNjQtNzkuNTIgMjU5LjY1bDguNzEgMy44MmM3Ny4zIDMzLjQ4IDE2Mi4xNSA2MC44NSAyNjcuMTUgNjQuMTRhMjEuMDggMjEuMDggMCAwMTIwLjM4IDIyLjA3bC0uMiAzLjk1Yy0zLjM0IDU5LjU3LTIwIDEzMi44NS03OS44NSAxMzIuODUtOC44IDAtMTcuMjktLjU1LTI1LjQ4LTEuNjEtNzguMDQtOS4yNS0xNTYuMjgtNTcuMDUtMjM2LjMyLTExMC4yN2wtMTcuMzMtMTEuNTctMTMuMTUtOC44M2E0ODAuODMgNDgwLjgzIDAgMDEtNjkuOTkgNTcuMjUgMTkyLjggMTkyLjggMCAwMS0xOS41NyAxMS4wOGMtNjUuNTEgMzkuMTgtMTQyLjIxIDYyLjYtMjI3LjQyIDYyLjYyLTExOC4yIDAtMjA0LjkyLTc3Ljk3LTIwNi42NC0xNzUuOWwtLjAzLTIuOTUuMDMtMS43YzEuNjYtOTguMTIgODQuNzctMTc1LjE4IDIwMy0xNzYuNzJsMy42NC0uMDNjMTAyLjkyIDAgMTg2LjY2IDMzLjU0IDI3MC40OCA3My4xNGwuNDQuMzggMS43LTMuNDdjMjEuMjctNDQuMTQgMzYuNDQtOTQuOTUgNDIuNzQtMTUyLjA2aC0zMjQuOGE2LjY0IDYuNjQgMCAwMS02LjYzLTYuNjJjLS4wNC0yMS44NiA2LTU0LjkxIDE5Ljg1LTU0LjkxaDE2Mi4xdi04MS4xSDE5MS45MmE2LjcxIDYuNzEgMCAwMS02LjY0LTYuODVjLS4wMS0yMi42MSA2LjA2LTU0LjY4IDE5Ljg2LTU0LjY4aDIzMS40di02NC44NWwuMDItMS45OWMuOS0zMC45MyAyMy43Mi01NC4zNiAxMjAuNjQtNTQuMzZNMjU2LjkgNjE5Yy03NC43NyAwLTEzNi41MyAzOS45My0xMzcuODggOTUuNmwtLjAyIDEuMjYuMDggMy4yNGE5Mi41NSA5Mi41NSAwIDAwMS41OCAxMy42NGMyMC4yNiA5Ni41IDIyMC4xNiAxMjkuNzEgMzY0LjM0LTM2LjU5bC04LjAzLTQuNzJDNDA1Ljk1IDY1MC4xMSAzMzIuOTQgNjE5IDI1Ni45IDYxOSIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AlipayOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AlipayOutlined';
}
var _default = RefIcon;
