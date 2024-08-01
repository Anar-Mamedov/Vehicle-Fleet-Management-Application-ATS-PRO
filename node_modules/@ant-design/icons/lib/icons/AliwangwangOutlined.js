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
var _AliwangwangOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AliwangwangOutlined"));
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
var AliwangwangOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AliwangwangOutlined.default
    }));
};
/**![aliwangwang](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2OC4yIDM3Ny40Yy0xOC45LTQ1LjEtNDYuMy04NS42LTgxLjItMTIwLjZhMzc3LjI2IDM3Ny4yNiAwIDAwLTEyMC41LTgxLjJBMzc1LjY1IDM3NS42NSAwIDAwNTE5IDE0NS44Yy00MS45IDAtODIuOSA2LjctMTIxLjkgMjBDMzA2IDEyMy4zIDIwMC44IDEyMCAxNzAuNiAxMjBjLTIuMiAwLTcuNCAwLTkuNC4yLTExLjkuNC0yMi44IDYuNS0yOS4yIDE2LjQtNi41IDkuOS03LjcgMjIuNC0zLjQgMzMuNWw2NC4zIDE2MS42YTM3OC41OSAzNzguNTkgMCAwMC01Mi44IDE5My4yYzAgNTEuNCAxMCAxMDEgMjkuOCAxNDcuNiAxOC45IDQ1IDQ2LjIgODUuNiA4MS4yIDEyMC41IDM0LjcgMzQuOCA3NS40IDYyLjEgMTIwLjUgODEuMkM0MTguMyA4OTQgNDY3LjkgOTA0IDUxOSA5MDRjNTEuMyAwIDEwMC45LTEwLjEgMTQ3LjctMjkuOCA0NC45LTE4LjkgODUuNS00Ni4zIDEyMC40LTgxLjIgMzQuNy0zNC44IDYyLjEtNzUuNCA4MS4yLTEyMC42YTM3Ni41IDM3Ni41IDAgMDAyOS44LTE0Ny42Yy0uMi01MS4yLTEwLjEtMTAwLjgtMjkuOS0xNDcuNHptLTY2LjQgMjY2LjVhMzA3LjA4IDMwNy4wOCAwIDAxLTY1LjkgOThjLTI4LjQgMjguNS02MS4zIDUwLjctOTcuNyA2NS45aC0uMWMtMzggMTYtNzguMyAyNC4yLTExOS45IDI0LjJhMzA2LjUxIDMwNi41MSAwIDAxLTIxNy41LTkwLjJjLTI4LjQtMjguNS01MC42LTYxLjQtNjUuOC05Ny44di0uMWMtMTYtMzcuOC0yNC4xLTc4LjItMjQuMS0xMTkuOSAwLTU1LjQgMTQuOC0xMDkuNyA0Mi44LTE1N2wxMy4yLTIyLjEtOS41LTIzLjlMMjA2IDE5MmMxNC45LjYgMzUuOSAyLjEgNTkuNyA1LjYgNDMuOCA2LjUgODIuNSAxNy41IDExNC45IDMyLjZsMTkgOC45IDE5LjktNi44YzMxLjUtMTAuOCA2NC44LTE2LjIgOTguOS0xNi4yYTMwNi41MSAzMDYuNTEgMCAwMTIxNy41IDkwLjJjMjguNCAyOC41IDUwLjYgNjEuNCA2NS44IDk3LjhsLjEuMS4xLjFjMTYgMzcuNiAyNC4xIDc4IDI0LjIgMTE5LjgtLjEgNDEuNy04LjMgODItMjQuMyAxMTkuOHpNNjgxLjEgMzY0LjJjLTIwLjQgMC0zNy4xIDE2LjctMzcuMSAzNy4xdjU1LjFjMCAyMC40IDE2LjYgMzcuMSAzNy4xIDM3LjFzMzcuMS0xNi43IDM3LjEtMzcuMXYtNTUuMWMwLTIwLjUtMTYuNy0zNy4xLTM3LjEtMzcuMXptLTE3NS4yIDBjLTIwLjUgMC0zNy4xIDE2LjctMzcuMSAzNy4xdjU1LjFjMCAyMC40IDE2LjcgMzcuMSAzNy4xIDM3LjEgMjAuNSAwIDM3LjEtMTYuNyAzNy4xLTM3LjF2LTU1LjFjMC0yMC41LTE2LjctMzcuMS0zNy4xLTM3LjF6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AliwangwangOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AliwangwangOutlined';
}
var _default = RefIcon;
