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
var _TranslationOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TranslationOutlined"));
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
var TranslationOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TranslationOutlined.default
    }));
};
/**![translation](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik0xNDAgMTg4aDU4NHYxNjRoNzZWMTQ0YzAtMTcuNy0xNC4zLTMyLTMyLTMySDk2Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNTQ0di03NkgxNDBWMTg4eiIgLz48cGF0aCBkPSJNNDE0LjMgMjU2aC02MC42Yy0zLjQgMC02LjQgMi4yLTcuNiA1LjRMMjE5IDYyOS40Yy0uMy44LS40IDEuNy0uNCAyLjYgMCA0LjQgMy42IDggOCA4aDU1LjFjMy40IDAgNi40LTIuMiA3LjYtNS40TDMyMiA1NDBoMTk2LjJMNDIyIDI2MS40YTguNDIgOC40MiAwIDAwLTcuNy01LjR6bTEyLjQgMjI4aC04NS41TDM4NCAzNjAuMiA0MjYuNyA0ODR6TTkzNiA1MjhIODAwdi05M2MwLTQuNC0zLjYtOC04LThoLTU2Yy00LjQgMC04IDMuNi04IDh2OTNINTkyYy0xMy4zIDAtMjQgMTAuNy0yNCAyNHYxNzZjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMTM2djE1MmMwIDQuNCAzLjYgOCA4IDhoNTZjNC40IDAgOC0zLjYgOC04Vjc1MmgxMzZjMTMuMyAwIDI0LTEwLjcgMjQtMjRWNTUyYzAtMTMuMy0xMC43LTI0LTI0LTI0ek03MjggNjgwaC04OHYtODBoODh2ODB6bTE2MCAwaC04OHYtODBoODh2ODB6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TranslationOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TranslationOutlined';
}
var _default = RefIcon;
