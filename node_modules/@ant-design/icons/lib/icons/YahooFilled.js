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
var _YahooFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/YahooFilled"));
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
var YahooFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _YahooFilled.default
    }));
};
/**![yahoo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkzNy4zIDIzMUg4MjQuN2MtMTUuNSAwLTI3LjcgMTIuNi0yNy4xIDI4LjFsMTMuMSAzNjZoODQuNGw2NS40LTM2Ni40YzIuNy0xNS4yLTcuOC0yNy43LTIzLjItMjcuN3ptLTc3LjQgNDUwLjRoLTE0LjFjLTI3LjEgMC00OS4yIDIyLjItNDkuMiA0OS4zdjE0LjFjMCAyNy4xIDIyLjIgNDkuMyA0OS4yIDQ5LjNoMTQuMWMyNy4xIDAgNDkuMi0yMi4yIDQ5LjItNDkuM3YtMTQuMWMwLTI3LjEtMjIuMi00OS4zLTQ5LjItNDkuM3pNNDAyLjYgMjMxQzIxNi4yIDIzMSA2NSAzNTcgNjUgNTEyLjVTMjE2LjIgNzk0IDQwMi42IDc5NHMzMzcuNi0xMjYgMzM3LjYtMjgxLjVTNTg5LjEgMjMxIDQwMi42IDIzMXptMjI1LjIgMjI1LjJoLTY1LjNMNDU4LjkgNTU5Ljh2NjUuM2g4NC40djU2LjNIMzE4LjJ2LTU2LjNoODQuNHYtNjUuM0wyNDIuOSAzOTkuOWgtMzd2LTU2LjNoMTY4LjV2NTYuM2gtMzdsOTMuNCA5My41IDI4LjEtMjguMVY0MDBoMTY4Ljh2NTYuMnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(YahooFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'YahooFilled';
}
var _default = RefIcon;
