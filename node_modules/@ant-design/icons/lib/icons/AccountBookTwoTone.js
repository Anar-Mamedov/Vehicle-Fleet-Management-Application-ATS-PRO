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
var _AccountBookTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AccountBookTwoTone"));
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
var AccountBookTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AccountBookTwoTone.default
    }));
};
/**![account-book](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcxMiAzMDRjMCA0LjQtMy42IDgtOCA4aC01NmMtNC40IDAtOC0zLjYtOC04di00OEgzODR2NDhjMCA0LjQtMy42IDgtOCA4aC01NmMtNC40IDAtOC0zLjYtOC04di00OEgxODR2NTg0aDY1NlYyNTZINzEydjQ4em0tNjUuNiAxMjEuOGwtODkuMyAxNjQuMWg0OS4xYzQuNCAwIDggMy42IDggOHYyMS4zYzAgNC40LTMuNiA4LTggOGgtNjUuNHYzMy43aDY1LjRjNC40IDAgOCAzLjYgOCA4djIxLjNjMCA0LjQtMy42IDgtOCA4aC02NS40Vjc1MmMwIDQuNC0zLjYgOC04IDhoLTQxLjNjLTQuNCAwLTgtMy42LTgtOHYtNTMuOGgtNjUuMWMtNC40IDAtOC0zLjYtOC04di0yMS4zYzAtNC40IDMuNi04IDgtOGg2NS4xdi0zMy43aC02NS4xYy00LjQgMC04LTMuNi04LTh2LTIxLjNjMC00LjQgMy42LTggOC04SDQ2N2wtODkuMy0xNjRjLTIuMS0zLjktLjctOC44IDMuMi0xMC45IDEuMS0uNyAyLjUtMSAzLjgtMWg0NmE4IDggMCAwMTcuMSA0LjRsNzMuNCAxNDUuNGgyLjhsNzMuNC0xNDUuNGMxLjMtMi43IDQuMS00LjQgNy4xLTQuNGg0NWM0LjUgMCA4IDMuNiA3LjkgOCAwIDEuMy0uNCAyLjYtMSAzLjh6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik02MzkuNSA0MTRoLTQ1Yy0zIDAtNS44IDEuNy03LjEgNC40TDUxNCA1NjMuOGgtMi44bC03My40LTE0NS40YTggOCAwIDAwLTcuMS00LjRoLTQ2Yy0xLjMgMC0yLjcuMy0zLjggMS0zLjkgMi4xLTUuMyA3LTMuMiAxMC45bDg5LjMgMTY0aC00OC42Yy00LjQgMC04IDMuNi04IDh2MjEuM2MwIDQuNCAzLjYgOCA4IDhoNjUuMXYzMy43aC02NS4xYy00LjQgMC04IDMuNi04IDh2MjEuM2MwIDQuNCAzLjYgOCA4IDhoNjUuMVY3NTJjMCA0LjQgMy42IDggOCA4aDQxLjNjNC40IDAgOC0zLjYgOC04di01My44aDY1LjRjNC40IDAgOC0zLjYgOC04di0yMS4zYzAtNC40LTMuNi04LTgtOGgtNjUuNHYtMzMuN2g2NS40YzQuNCAwIDgtMy42IDgtOHYtMjEuM2MwLTQuNC0zLjYtOC04LThoLTQ5LjFsODkuMy0xNjQuMWMuNi0xLjIgMS0yLjUgMS0zLjguMS00LjQtMy40LTgtNy45LTh6IiBmaWxsPSIjMTY3N2ZmIiAvPjxwYXRoIGQ9Ik04ODAgMTg0SDcxMnYtNjRjMC00LjQtMy42LTgtOC04aC01NmMtNC40IDAtOCAzLjYtOCA4djY0SDM4NHYtNjRjMC00LjQtMy42LTgtOC04aC01NmMtNC40IDAtOCAzLjYtOCA4djY0SDE0NGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2NjY0YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDczNmMxNy43IDAgMzItMTQuMyAzMi0zMlYyMTZjMC0xNy43LTE0LjMtMzItMzItMzJ6bS00MCA2NTZIMTg0VjI1NmgxMjh2NDhjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOHYtNDhoMjU2djQ4YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LTh2LTQ4aDEyOHY1ODR6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AccountBookTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AccountBookTwoTone';
}
var _default = RefIcon;
