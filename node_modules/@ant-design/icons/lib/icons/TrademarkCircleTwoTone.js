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
var _TrademarkCircleTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TrademarkCircleTwoTone"));
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
var TrademarkCircleTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TrademarkCircleTwoTone.default
    }));
};
/**![trademark-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDgyMGMtMjA1LjQgMC0zNzItMTY2LjYtMzcyLTM3MnMxNjYuNi0zNzIgMzcyLTM3MiAzNzIgMTY2LjYgMzcyIDM3Mi0xNjYuNiAzNzItMzcyIDM3MnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTUxMiAxNDBjLTIwNS40IDAtMzcyIDE2Ni42LTM3MiAzNzJzMTY2LjYgMzcyIDM3MiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzItMTY2LjYtMzcyLTM3Mi0zNzJ6bTE3MC43IDU4NC4yYy0xLjEuNS0yLjMuOC0zLjUuOGgtNjJjLTMuMSAwLTUuOS0xLjgtNy4yLTQuNmwtNzQuNi0xNTkuMmgtODguN1Y3MTdjMCA0LjQtMy42IDgtOCA4SDM4NGMtNC40IDAtOC0zLjYtOC04VjMwN2MwLTQuNCAzLjYtOCA4LThoMTU1LjZjOTguOCAwIDE0NC4yIDU5LjkgMTQ0LjIgMTMxLjEgMCA3MC4yLTQzLjYgMTA2LjQtNzguNCAxMTkuMmw4MC44IDE2NC4yYzIuMSAzLjkuNCA4LjctMy41IDEwLjd6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik01MjkuOSAzNTdoLTgzLjR2MTQ4SDUyOGM1MyAwIDgyLjgtMjUuNiA4Mi44LTcyLjQgMC01MC4zLTMyLjktNzUuNi04MC45LTc1LjZ6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik02MDUuNCA1NDkuM2MzNC44LTEyLjggNzguNC00OSA3OC40LTExOS4yIDAtNzEuMi00NS40LTEzMS4xLTE0NC4yLTEzMS4xSDM4NGMtNC40IDAtOCAzLjYtOCA4djQxMGMwIDQuNCAzLjYgOCA4IDhoNTQuN2M0LjQgMCA4LTMuNiA4LThWNTYxLjJoODguN0w2MTAgNzIwLjRjMS4zIDIuOCA0LjEgNC42IDcuMiA0LjZoNjJjMS4yIDAgMi40LS4zIDMuNS0uOCAzLjktMiA1LjYtNi44IDMuNS0xMC43bC04MC44LTE2NC4yek01MjggNTA1aC04MS41VjM1N2g4My40YzQ4IDAgODAuOSAyNS4zIDgwLjkgNzUuNiAwIDQ2LjgtMjkuOCA3Mi40LTgyLjggNzIuNHoiIGZpbGw9IiMxNjc3ZmYiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TrademarkCircleTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TrademarkCircleTwoTone';
}
var _default = RefIcon;
