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
var _FundViewOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FundViewOutlined"));
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
var FundViewOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FundViewOutlined.default
    }));
};
/**![fund-view](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik05NTYgNjg2LjVsLS4xLS4xLS4xLS4xQzkxMS43IDU5MyA4NDMuNCA1NDUgNzUyLjUgNTQ1cy0xNTkuMiA0OC4xLTIwMy40IDE0MS4zdi4xYTQyLjkyIDQyLjkyIDAgMDAwIDM2LjRDNTkzLjMgODE2IDY2MS42IDg2NCA3NTIuNSA4NjRzMTU5LjItNDguMSAyMDMuNC0xNDEuM2M1LjQtMTEuNSA1LjQtMjQuOC4xLTM2LjJ6TTc1Mi41IDgwMGMtNjIuMSAwLTEwNy40LTMwLTE0MS4xLTk1LjVDNjQ1IDYzOSA2OTAuNCA2MDkgNzUyLjUgNjA5YzYyLjEgMCAxMDcuNCAzMCAxNDEuMSA5NS41Qzg2MCA3NzAgODE0LjYgODAwIDc1Mi41IDgwMHoiIC8+PHBhdGggZD0iTTY5NyA3MDVhNTYgNTYgMCAxMDExMiAwIDU2IDU2IDAgMTAtMTEyIDB6TTEzNiAyMzJoNzA0djI1M2g3MlYxOTJjMC0xNy43LTE0LjMtMzItMzItMzJIOTZjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjUyMGMwIDE3LjcgMTQuMyAzMiAzMiAzMmgzNTJ2LTcySDEzNlYyMzJ6IiAvPjxwYXRoIGQ9Ik03MjQuOSAzMzguMWwtMzYuOC0zNi44YTguMDMgOC4wMyAwIDAwLTExLjMgMEw0OTMgNDg1LjNsLTg2LjEtODYuMmE4LjAzIDguMDMgMCAwMC0xMS4zIDBMMjUxLjMgNTQzLjRhOC4wMyA4LjAzIDAgMDAwIDExLjNsMzYuOCAzNi44YzMuMSAzLjEgOC4yIDMuMSAxMS4zIDBsMTAxLjgtMTAxLjggODYuMSA4Ni4yYzMuMSAzLjEgOC4yIDMuMSAxMS4zIDBsMjI2LjMtMjI2LjVjMy4yLTMuMSAzLjItOC4yIDAtMTEuM3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FundViewOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FundViewOutlined';
}
var _default = RefIcon;
