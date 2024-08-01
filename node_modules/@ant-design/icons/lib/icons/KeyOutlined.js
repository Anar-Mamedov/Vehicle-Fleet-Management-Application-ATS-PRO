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
var _KeyOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/KeyOutlined"));
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
var KeyOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _KeyOutlined.default
    }));
};
/**![key](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwOCAxMTJjLTE2Ny45IDAtMzA0IDEzNi4xLTMwNCAzMDQgMCA3MC4zIDIzLjkgMTM1IDYzLjkgMTg2LjVsLTQxLjEgNDEuMS02Mi4zLTYyLjNhOC4xNSA4LjE1IDAgMDAtMTEuNCAwbC0zOS44IDM5LjhhOC4xNSA4LjE1IDAgMDAwIDExLjRsNjIuMyA2Mi4zLTQ0LjkgNDQuOS02Mi4zLTYyLjNhOC4xNSA4LjE1IDAgMDAtMTEuNCAwbC0zOS44IDM5LjhhOC4xNSA4LjE1IDAgMDAwIDExLjRsNjIuMyA2Mi4zLTY1LjMgNjUuM2E4LjAzIDguMDMgMCAwMDAgMTEuM2w0Mi4zIDQyLjNjMy4xIDMuMSA4LjIgMy4xIDExLjMgMGwyNTMuNi0yNTMuNkEzMDQuMDYgMzA0LjA2IDAgMDA2MDggNzIwYzE2Ny45IDAgMzA0LTEzNi4xIDMwNC0zMDRTNzc1LjkgMTEyIDYwOCAxMTJ6bTE2MS4yIDQ2NS4yQzcyNi4yIDYyMC4zIDY2OC45IDY0NCA2MDggNjQ0Yy02MC45IDAtMTE4LjItMjMuNy0xNjEuMi02Ni44LTQzLjEtNDMtNjYuOC0xMDAuMy02Ni44LTE2MS4yIDAtNjAuOSAyMy43LTExOC4yIDY2LjgtMTYxLjIgNDMtNDMuMSAxMDAuMy02Ni44IDE2MS4yLTY2LjggNjAuOSAwIDExOC4yIDIzLjcgMTYxLjIgNjYuOCA0My4xIDQzIDY2LjggMTAwLjMgNjYuOCAxNjEuMiAwIDYwLjktMjMuNyAxMTguMi02Ni44IDE2MS4yeiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(KeyOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'KeyOutlined';
}
var _default = RefIcon;
