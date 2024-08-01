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
var _SlidersOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SlidersOutlined"));
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
var SlidersOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SlidersOutlined.default
    }));
};
/**![sliders](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMyMCAyMjRoLTY2di01NmMwLTQuNC0zLjYtOC04LThoLTUyYy00LjQgMC04IDMuNi04IDh2NTZoLTY2Yy00LjQgMC04IDMuNi04IDh2NTYwYzAgNC40IDMuNiA4IDggOGg2NnY1NmMwIDQuNCAzLjYgOCA4IDhoNTJjNC40IDAgOC0zLjYgOC04di01Nmg2NmM0LjQgMCA4LTMuNiA4LThWMjMyYzAtNC40LTMuNi04LTgtOHptLTYwIDUwOGgtODBWMjkyaDgwdjQ0MHptNjQ0LTQzNmgtNjZ2LTk2YzAtNC40LTMuNi04LTgtOGgtNTJjLTQuNCAwLTggMy42LTggOHY5NmgtNjZjLTQuNCAwLTggMy42LTggOHY0MTZjMCA0LjQgMy42IDggOCA4aDY2djk2YzAgNC40IDMuNiA4IDggOGg1MmM0LjQgMCA4LTMuNiA4LTh2LTk2aDY2YzQuNCAwIDgtMy42IDgtOFYzMDRjMC00LjQtMy42LTgtOC04em0tNjAgMzY0aC04MFYzNjRoODB2Mjk2ek02MTIgNDA0aC02NlYyMzJjMC00LjQtMy42LTgtOC04aC01MmMtNC40IDAtOCAzLjYtOCA4djE3MmgtNjZjLTQuNCAwLTggMy42LTggOHYyMDBjMCA0LjQgMy42IDggOCA4aDY2djE3MmMwIDQuNCAzLjYgOCA4IDhoNTJjNC40IDAgOC0zLjYgOC04VjYyMGg2NmM0LjQgMCA4LTMuNiA4LThWNDEyYzAtNC40LTMuNi04LTgtOHptLTYwIDE0NWEzIDMgMCAwMS0zIDNoLTc0YTMgMyAwIDAxLTMtM3YtNzRhMyAzIDAgMDEzLTNoNzRhMyAzIDAgMDEzIDN2NzR6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SlidersOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SlidersOutlined';
}
var _default = RefIcon;
