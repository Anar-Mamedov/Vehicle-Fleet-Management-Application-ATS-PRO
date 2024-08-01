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
var _LoginOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/LoginOutlined"));
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
var LoginOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _LoginOutlined.default
    }));
};
/**![login](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik01MjEuNyA4MmMtMTUyLjUtLjQtMjg2LjcgNzguNS0zNjMuNCAxOTcuNy0zLjQgNS4zLjQgMTIuMyA2LjcgMTIuM2g3MC4zYzQuOCAwIDkuMy0yLjEgMTIuMy01LjggNy04LjUgMTQuNS0xNi43IDIyLjQtMjQuNSAzMi42LTMyLjUgNzAuNS01OC4xIDExMi43LTc1LjkgNDMuNi0xOC40IDkwLTI3LjggMTM3LjktMjcuOCA0Ny45IDAgOTQuMyA5LjMgMTM3LjkgMjcuOCA0Mi4yIDE3LjggODAuMSA0My40IDExMi43IDc1LjkgMzIuNiAzMi41IDU4LjEgNzAuNCA3NiAxMTIuNUM4NjUuNyA0MTcuOCA4NzUgNDY0LjEgODc1IDUxMmMwIDQ3LjktOS40IDk0LjItMjcuOCAxMzcuOC0xNy44IDQyLjEtNDMuNCA4MC03NiAxMTIuNXMtNzAuNSA1OC4xLTExMi43IDc1LjlBMzUyLjggMzUyLjggMCAwMTUyMC42IDg2NmMtNDcuOSAwLTk0LjMtOS40LTEzNy45LTI3LjhBMzUzLjg0IDM1My44NCAwIDAxMjcwIDc2Mi4zYy03LjktNy45LTE1LjMtMTYuMS0yMi40LTI0LjUtMy0zLjctNy42LTUuOC0xMi4zLTUuOEgxNjVjLTYuMyAwLTEwLjIgNy02LjcgMTIuM0MyMzQuOSA4NjMuMiAzNjguNSA5NDIgNTIwLjYgOTQyYzIzNi4yIDAgNDI4LTE5MC4xIDQzMC40LTQyNS42Qzk1My40IDI3Ny4xIDc2MS4zIDgyLjYgNTIxLjcgODJ6TTM5NS4wMiA2MjR2LTc2aC0zMTRjLTQuNCAwLTgtMy42LTgtOHYtNTZjMC00LjQgMy42LTggOC04aDMxNHYtNzZjMC02LjcgNy44LTEwLjUgMTMtNi4zbDE0MS45IDExMmE4IDggMCAwMTAgMTIuNmwtMTQxLjkgMTEyYy01LjIgNC4xLTEzIC40LTEzLTYuM3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(LoginOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'LoginOutlined';
}
var _default = RefIcon;
