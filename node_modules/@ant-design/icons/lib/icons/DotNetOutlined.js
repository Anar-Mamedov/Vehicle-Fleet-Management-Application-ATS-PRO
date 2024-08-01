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
var _DotNetOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DotNetOutlined"));
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
var DotNetOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DotNetOutlined.default
    }));
};
/**![dot-net](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsLW9wYWNpdHk9Ii44OCI+PHBhdGggZD0iTTEwMS4yOCA2NjJjLTEwLjY1IDAtMTkuNTMtMy4zLTI2LjYzLTkuODktNy4xLTYuNi0xMC42NS0xNC43LTEwLjY1LTI0LjMyIDAtOS44OSAzLjY1LTE4IDEwLjk2LTI0LjMxIDcuMy02LjMyIDE2LjQyLTkuNDggMjcuMzUtOS40OCAxMS4wNiAwIDIwLjEgMy4yIDI3LjE0IDkuNTggNy4wMyA2LjM5IDEwLjU1IDE0LjQ2IDEwLjU1IDI0LjIxIDAgMTAuMDMtMy41OCAxOC4yNC0xMC43NiAyNC42My03LjE3IDYuMzktMTYuNDkgOS41OC0yNy45NiA5LjU4TTQ1OCA2NTdoLTY2Ljk3bC0xMjEuNC0xODUuMzVjLTcuMTMtMTAuODQtMTIuMDYtMTktMTQuOC0yNC40OGgtLjgyYzEuMSAxMC40MiAxLjY1IDI2LjMzIDEuNjUgNDcuNzJWNjU3SDE5M1YzNjJoNzEuNDlsMTE2Ljg5IDE3OS42YTQyMy4yMyA0MjMuMjMgMCAwMTE0Ljc5IDI0LjA2aC44MmMtMS4xLTYuODYtMS42NC0yMC4zNy0xLjY0LTQwLjUzVjM2Mkg0NTh6TTcwMiA2NTdINTI1VjM2MmgxNzAuMnY1NC4xSDU5MS40OXY2NS42M0g2ODh2NTMuOWgtOTYuNTJ2NjcuNDdINzAyek05NjAgNDE2LjFoLTgzLjk1VjY1N2gtNjYuNVY0MTYuMUg3MjZWMzYyaDIzNHoiIC8+PC9nPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DotNetOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DotNetOutlined';
}
var _default = RefIcon;
