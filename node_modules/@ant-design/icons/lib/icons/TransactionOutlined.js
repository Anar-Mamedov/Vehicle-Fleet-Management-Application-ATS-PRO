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
var _TransactionOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TransactionOutlined"));
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
var TransactionOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TransactionOutlined.default
    }));
};
/**![transaction](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY2OC42IDMyMGMwLTQuNC0zLjYtOC04LThoLTU0LjVjLTMgMC01LjggMS43LTcuMSA0LjRsLTg0LjcgMTY4LjhINTExbC04NC43LTE2OC44YTggOCAwIDAwLTcuMS00LjRoLTU1LjdjLTEuMyAwLTIuNi4zLTMuOCAxLTMuOSAyLjEtNS4zIDctMy4yIDEwLjhsMTAzLjkgMTkxLjZoLTU3Yy00LjQgMC04IDMuNi04IDh2MjcuMWMwIDQuNCAzLjYgOCA4IDhoNzZ2MzloLTc2Yy00LjQgMC04IDMuNi04IDh2MjcuMWMwIDQuNCAzLjYgOCA4IDhoNzZWNzA0YzAgNC40IDMuNiA4IDggOGg0OS45YzQuNCAwIDgtMy42IDgtOHYtNjMuNWg3Ni4zYzQuNCAwIDgtMy42IDgtOHYtMjcuMWMwLTQuNC0zLjYtOC04LThoLTc2LjN2LTM5aDc2LjNjNC40IDAgOC0zLjYgOC04di0yNy4xYzAtNC40LTMuNi04LTgtOEg1NjRsMTAzLjctMTkxLjZjLjUtMS4xLjktMi40LjktMy43ek0xNTcuOSA1MDQuMmEzNTIuNyAzNTIuNyAwIDAxMTAzLjUtMjQyLjRjMzIuNS0zMi41IDcwLjMtNTguMSAxMTIuNC03NS45IDQzLjYtMTguNCA4OS45LTI3LjggMTM3LjYtMjcuOCA0Ny44IDAgOTQuMSA5LjMgMTM3LjYgMjcuOCA0Mi4xIDE3LjggNzkuOSA0My40IDExMi40IDc1LjkgMTAgMTAgMTkuMyAyMC41IDI3LjkgMzEuNGwtNTAgMzkuMWE4IDggMCAwMDMgMTQuMWwxNTYuOCAzOC4zYzUgMS4yIDkuOS0yLjYgOS45LTcuN2wuOC0xNjEuNWMwLTYuNy03LjctMTAuNS0xMi45LTYuM2wtNDcuOCAzNy40Qzc3MC43IDE0Ni4zIDY0OC42IDgyIDUxMS41IDgyIDI3NyA4MiA4Ni4zIDI3MC4xIDgyIDUwMy44YTggOCAwIDAwOCA4LjJoNjBjNC4zIDAgNy44LTMuNSA3LjktNy44ek05MzQgNTEyaC02MGMtNC4zIDAtNy45IDMuNS04IDcuOGEzNTIuNyAzNTIuNyAwIDAxLTEwMy41IDI0Mi40IDM1Mi41NyAzNTIuNTcgMCAwMS0xMTIuNCA3NS45Yy00My42IDE4LjQtODkuOSAyNy44LTEzNy42IDI3LjhzLTk0LjEtOS4zLTEzNy42LTI3LjhhMzUyLjU3IDM1Mi41NyAwIDAxLTExMi40LTc1LjljLTEwLTEwLTE5LjMtMjAuNS0yNy45LTMxLjRsNDkuOS0zOS4xYTggOCAwIDAwLTMtMTQuMWwtMTU2LjgtMzguM2MtNS0xLjItOS45IDIuNi05LjkgNy43bC0uOCAxNjEuN2MwIDYuNyA3LjcgMTAuNSAxMi45IDYuM2w0Ny44LTM3LjRDMjUzLjMgODc3LjcgMzc1LjQgOTQyIDUxMi41IDk0MiA3NDcgOTQyIDkzNy43IDc1My45IDk0MiA1MjAuMmE4IDggMCAwMC04LTguMnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TransactionOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TransactionOutlined';
}
var _default = RefIcon;
