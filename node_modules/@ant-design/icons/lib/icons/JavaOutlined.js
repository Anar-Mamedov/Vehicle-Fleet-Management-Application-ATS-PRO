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
var _JavaOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/JavaOutlined"));
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
var JavaOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _JavaOutlined.default
    }));
};
/**![java](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzk0LjY4IDc1Ni45OXMtMzQuMzMgMTkuOTUgMjQuMzQgMjYuNmM3MS4xIDguMDUgMTA3LjM1IDcgMTg1LjY0LTcuODcgMCAwIDIwLjY2IDEyLjk0IDQ5LjM4IDI0LjE0LTE3NS40NyA3NS4wOC0zOTcuMTgtNC4zNy0yNTkuMzYtNDIuODdtLTIxLjM3LTk4LjE3cy0zOC4zNSAyOC4zNSAyMC4zMiAzNC40N2M3NS44MyA3Ljg4IDEzNS45IDguNCAyMzkuNTctMTEuNTUgMCAwIDE0LjM2IDE0LjUzIDM2Ljk1IDIyLjQtMjEyLjQzIDYyLjEzLTQ0OC44NCA1LjA4LTI5Ni44NC00NS4zMm0xODAuNzMtMTY2LjQzYzQzLjI2IDQ5LjctMTEuMzggOTQuNS0xMS4zOCA5NC41czEwOS44LTU2LjcgNTkuMzctMTI3LjU3Yy00Ny4xMS02Ni4xNS04My4xOS05OS4wNSAxMTIuMjUtMjEyLjI3LjE4IDAtMzA2LjgyIDc2LjY1LTE2MC4yNCAyNDUuMzVtMjMyLjIyIDMzNy4wNHMyNS40IDIwLjgyLTI3Ljg1IDM3LjFjLTEwMS40IDMwLjYyLTQyMS43IDM5LjktNTEwLjY2IDEuMjItMzIuMDUtMTMuODIgMjguMDItMzMuMjUgNDYuOTMtMzcuMjcgMTkuNjItNC4yIDMxLTMuNSAzMS0zLjUtMzUuNTUtMjUuMDMtMjI5Ljk0IDQ5LjE3LTk4Ljc3IDcwLjM1IDM1Ny42IDU4LjEgNjUyLjE2LTI2LjA4IDU1OS4zNS02Ny45bS0zNzUuMTItMjcyLjNzLTE2My4wNCAzOC42OC01Ny43OSA1Mi42OGM0NC40OCA1Ljk1IDEzMy4xIDQuNTUgMjE1LjU4LTIuMjggNjcuNDItNS42IDEzNS4yLTE3Ljg1IDEzNS4yLTE3Ljg1cy0yMy44MiAxMC4xNS00MC45OCAyMS44OGMtMTY1LjUgNDMuNTctNDg1LjEgMjMuMjctMzkzLjE2LTIxLjE4IDc3LjkzLTM3LjQ1IDE0MS4xNS0zMy4yNSAxNDEuMTUtMzMuMjVNNzAzLjYgNzIwLjQyYzE2OC4zLTg3LjMzIDkwLjM3LTE3MS4zMyAzNi4wOC0xNTkuOTUtMTMuMzEgMi44LTE5LjI3IDUuMjUtMTkuMjcgNS4yNXM0LjktNy43IDE0LjM2LTExLjAzQzg0Mi4xMiA1MTYuOSA5MjQuNzggNjY2IDcwMC4xIDcyNC45N2MwLS4xOCAyLjYzLTIuNDUgMy41LTQuNTVNNjAyLjAzIDY0czkzLjE2IDkzLjEtODguNDQgMjM2LjI1Yy0xNDUuNTMgMTE0LjgtMzMuMjcgMTgwLjQyIDAgMjU1LjE0LTg0Ljk0LTc2LjY1LTE0Ny4yOC0xNDQuMDItMTA1LjQyLTIwNi44NEM0NjkuNjMgMjU2LjY3IDYzOS42OCAyMTEuODcgNjAyLjAzIDY0TTQyNy43OCA5NTcuMTlDNTg5LjI0IDk2Ny41IDgzNy4yMiA5NTEuNCA4NDMgODc1LjFjMCAwLTExLjIgMjguODgtMTMzLjQ0IDUxLjk4LTEzNy44MyAyNS45LTMwNy44NyAyMi45Mi00MDguNTcgNi4zIDAtLjE4IDIwLjY2IDE2Ljk3IDEyNi43OSAyMy44IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(JavaOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'JavaOutlined';
}
var _default = RefIcon;
