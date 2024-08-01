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
var _TikTokOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TikTokOutlined"));
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
var TikTokOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TikTokOutlined.default
    }));
};
/**![tik-tok](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTMwLjAxIDExMi42N2M0My42Ny0uNjcgODctLjM0IDEzMC4zMy0uNjcgMi42NyA1MSAyMSAxMDMgNTguMzMgMTM5IDM3LjMzIDM3IDkwIDU0IDE0MS4zMyA1OS42NlY0NDVjLTQ4LTEuNjctOTYuMzMtMTEuNjctMTQwLTMyLjM0LTE5LTguNjYtMzYuNjYtMTkuNjYtNTQtMzEtLjMzIDk3LjMzLjM0IDE5NC42Ny0uNjYgMjkxLjY3LTIuNjcgNDYuNjYtMTggOTMtNDUgMTMxLjMzLTQzLjY2IDY0LTExOS4zMiAxMDUuNjYtMTk2Ljk5IDEwNy00Ny42NiAyLjY2LTk1LjMzLTEwLjM0LTEzNi0zNC4zNEMyMjAuMDQgODM3LjY2IDE3Mi43IDc2NSAxNjUuNyA2ODdjLS42Ny0xNi42Ni0xLTMzLjMzLS4zNC00OS42NiA2LTYzLjM0IDM3LjMzLTEyNCA4Ni0xNjUuMzQgNTUuMzMtNDggMTMyLjY2LTcxIDIwNC45OS01Ny4zMy42NyA0OS4zNC0xLjMzIDk4LjY3LTEuMzMgMTQ4LTMzLTEwLjY3LTcxLjY3LTcuNjctMTAwLjY3IDEyLjMzLTIxIDEzLjY3LTM3IDM0LjY3LTQ1LjMzIDU4LjM0LTcgMTctNSAzNS42Ni00LjY2IDUzLjY2IDggNTQuNjcgNjAuNjYgMTAwLjY3IDExNi42NiA5NS42NyAzNy4zMy0uMzQgNzMtMjIgOTIuMzMtNTMuNjcgNi4zMy0xMSAxMy4zMy0yMi4zMyAxMy42Ni0zNS4zMyAzLjM0LTU5LjY3IDItMTE5IDIuMzQtMTc4LjY2LjMzLTEzNC4zNC0uMzQtMjY4LjMzLjY2LTQwMi4zMyIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TikTokOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TikTokOutlined';
}
var _default = RefIcon;
