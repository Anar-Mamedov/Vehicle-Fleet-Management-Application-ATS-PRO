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
var _EyeTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/EyeTwoTone"));
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
var EyeTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _EyeTwoTone.default
    }));
};
/**![eye](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgxLjggNTM3LjhhNjAuMyA2MC4zIDAgMDEwLTUxLjVDMTc2LjYgMjg2LjUgMzE5LjggMTg2IDUxMiAxODZjLTE5Mi4yIDAtMzM1LjQgMTAwLjUtNDMwLjIgMzAwLjNhNjAuMyA2MC4zIDAgMDAwIDUxLjVDMTc2LjYgNzM3LjUgMzE5LjkgODM4IDUxMiA4MzhjLTE5Mi4xIDAtMzM1LjQtMTAwLjUtNDMwLjItMzAwLjJ6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik01MTIgMjU4Yy0xNjEuMyAwLTI3OS40IDgxLjgtMzYyLjcgMjU0QzIzMi42IDY4NC4yIDM1MC43IDc2NiA1MTIgNzY2YzE2MS40IDAgMjc5LjUtODEuOCAzNjIuNy0yNTRDNzkxLjQgMzM5LjggNjczLjMgMjU4IDUxMiAyNTh6bS00IDQzMGMtOTcuMiAwLTE3Ni03OC44LTE3Ni0xNzZzNzguOC0xNzYgMTc2LTE3NiAxNzYgNzguOCAxNzYgMTc2LTc4LjggMTc2LTE3NiAxNzZ6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik05NDIuMiA0ODYuMkM4NDcuNCAyODYuNSA3MDQuMSAxODYgNTEyIDE4NmMtMTkyLjIgMC0zMzUuNCAxMDAuNS00MzAuMiAzMDAuM2E2MC4zIDYwLjMgMCAwMDAgNTEuNUMxNzYuNiA3MzcuNSAzMTkuOSA4MzggNTEyIDgzOGMxOTIuMiAwIDMzNS40LTEwMC41IDQzMC4yLTMwMC4zIDcuNy0xNi4yIDcuNy0zNSAwLTUxLjV6TTUxMiA3NjZjLTE2MS4zIDAtMjc5LjQtODEuOC0zNjIuNy0yNTRDMjMyLjYgMzM5LjggMzUwLjcgMjU4IDUxMiAyNThzMjc5LjQgODEuOCAzNjIuNyAyNTRDNzkxLjUgNjg0LjIgNjczLjQgNzY2IDUxMiA3NjZ6IiBmaWxsPSIjMTY3N2ZmIiAvPjxwYXRoIGQ9Ik01MDggMzM2Yy05Ny4yIDAtMTc2IDc4LjgtMTc2IDE3NnM3OC44IDE3NiAxNzYgMTc2IDE3Ni03OC44IDE3Ni0xNzYtNzguOC0xNzYtMTc2LTE3NnptMCAyODhjLTYxLjkgMC0xMTItNTAuMS0xMTItMTEyczUwLjEtMTEyIDExMi0xMTIgMTEyIDUwLjEgMTEyIDExMi01MC4xIDExMi0xMTIgMTEyeiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(EyeTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'EyeTwoTone';
}
var _default = RefIcon;
