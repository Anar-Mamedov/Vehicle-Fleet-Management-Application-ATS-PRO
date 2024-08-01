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
var _AliwangwangFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AliwangwangFilled"));
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
var AliwangwangFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AliwangwangFilled.default
    }));
};
/**![aliwangwang](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2OC4yIDM3Ny40Yy0xOC45LTQ1LjEtNDYuMy04NS42LTgxLjItMTIwLjZhMzc3LjI2IDM3Ny4yNiAwIDAwLTEyMC41LTgxLjJBMzc1LjY1IDM3NS42NSAwIDAwNTE5IDE0NS44Yy00MS45IDAtODIuOSA2LjctMTIxLjkgMjBDMzA2IDEyMy4zIDIwMC44IDEyMCAxNzAuNiAxMjBjLTIuMiAwLTcuNCAwLTkuNC4yLTExLjkuNC0yMi44IDYuNS0yOS4yIDE2LjQtNi41IDkuOS03LjcgMjIuNC0zLjQgMzMuNWw2NC4zIDE2MS42YTM3OC41OSAzNzguNTkgMCAwMC01Mi44IDE5My4yYzAgNTEuNCAxMCAxMDEgMjkuOCAxNDcuNiAxOC45IDQ1IDQ2LjIgODUuNiA4MS4yIDEyMC41IDM0LjcgMzQuOCA3NS40IDYyLjEgMTIwLjUgODEuMkM0MTguMyA4OTQgNDY3LjkgOTA0IDUxOSA5MDRjNTEuMyAwIDEwMC45LTEwIDE0Ny43LTI5LjggNDQuOS0xOC45IDg1LjUtNDYuMyAxMjAuNC04MS4yIDM0LjctMzQuOCA2Mi4xLTc1LjQgODEuMi0xMjAuNmEzNzYuNSAzNzYuNSAwIDAwMjkuOC0xNDcuNmMtLjItNTEuMi0xMC4xLTEwMC44LTI5LjktMTQ3LjR6bS0zMjUuMiA3OWMwIDIwLjQtMTYuNiAzNy4xLTM3LjEgMzcuMS0yMC40IDAtMzcuMS0xNi43LTM3LjEtMzcuMXYtNTUuMWMwLTIwLjQgMTYuNi0zNy4xIDM3LjEtMzcuMSAyMC40IDAgMzcuMSAxNi42IDM3LjEgMzcuMXY1NS4xem0xNzUuMiAwYzAgMjAuNC0xNi42IDM3LjEtMzcuMSAzNy4xUzY0NCA0NzYuOCA2NDQgNDU2LjR2LTU1LjFjMC0yMC40IDE2LjctMzcuMSAzNy4xLTM3LjEgMjAuNCAwIDM3LjEgMTYuNiAzNy4xIDM3LjF2NTUuMXoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AliwangwangFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AliwangwangFilled';
}
var _default = RefIcon;
