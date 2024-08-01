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
var _DashboardFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DashboardFilled"));
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
var DashboardFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DashboardFilled.default
    }));
};
/**![dashboard](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkyNC44IDM4NS42YTQ0Ni43IDQ0Ni43IDAgMDAtOTYtMTQyLjQgNDQ2LjcgNDQ2LjcgMCAwMC0xNDIuNC05NkM2MzEuMSAxMjMuOCA1NzIuNSAxMTIgNTEyIDExMnMtMTE5LjEgMTEuOC0xNzQuNCAzNS4yYTQ0Ni43IDQ0Ni43IDAgMDAtMTQyLjQgOTYgNDQ2LjcgNDQ2LjcgMCAwMC05NiAxNDIuNEM3NS44IDQ0MC45IDY0IDQ5OS41IDY0IDU2MGMwIDEzMi43IDU4LjMgMjU3LjcgMTU5LjkgMzQzLjFsMS43IDEuNGM1LjggNC44IDEzLjEgNy41IDIwLjYgNy41aDUzMS43YzcuNSAwIDE0LjgtMi43IDIwLjYtNy41bDEuNy0xLjRDOTAxLjcgODE3LjcgOTYwIDY5Mi43IDk2MCA1NjBjMC02MC41LTExLjktMTE5LjEtMzUuMi0xNzQuNHpNNDgyIDIzMmMwLTQuNCAzLjYtOCA4LThoNDRjNC40IDAgOCAzLjYgOCA4djgwYzAgNC40LTMuNiA4LTggOGgtNDRjLTQuNCAwLTgtMy42LTgtOHYtODB6TTI3MCA1ODJjMCA0LjQtMy42IDgtOCA4aC04MGMtNC40IDAtOC0zLjYtOC04di00NGMwLTQuNCAzLjYtOCA4LThoODBjNC40IDAgOCAzLjYgOCA4djQ0em05MC43LTIwNC41bC0zMS4xIDMxLjFhOC4wMyA4LjAzIDAgMDEtMTEuMyAwTDI2MS43IDM1MmE4LjAzIDguMDMgMCAwMTAtMTEuM2wzMS4xLTMxLjFjMy4xLTMuMSA4LjItMy4xIDExLjMgMGw1Ni42IDU2LjZjMy4xIDMuMSAzLjEgOC4yIDAgMTEuM3ptMjkxLjEgODMuNmwtODQuNSA4NC41YzUgMTguNy4yIDM5LjQtMTQuNSA1NC4xYTU1Ljk1IDU1Ljk1IDAgMDEtNzkuMiAwIDU1Ljk1IDU1Ljk1IDAgMDEwLTc5LjIgNTUuODcgNTUuODcgMCAwMTU0LjEtMTQuNWw4NC41LTg0LjVjMy4xLTMuMSA4LjItMy4xIDExLjMgMGwyOC4zIDI4LjNjMy4xIDMuMSAzLjEgOC4xIDAgMTEuM3ptNDMtNTIuNGwtMzEuMS0zMS4xYTguMDMgOC4wMyAwIDAxMC0xMS4zbDU2LjYtNTYuNmMzLjEtMy4xIDguMi0zLjEgMTEuMyAwbDMxLjEgMzEuMWMzLjEgMy4xIDMuMSA4LjIgMCAxMS4zbC01Ni42IDU2LjZhOC4wMyA4LjAzIDAgMDEtMTEuMyAwek04NDYgNTgyYzAgNC40LTMuNiA4LTggOGgtODBjLTQuNCAwLTgtMy42LTgtOHYtNDRjMC00LjQgMy42LTggOC04aDgwYzQuNCAwIDggMy42IDggOHY0NHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DashboardFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DashboardFilled';
}
var _default = RefIcon;
