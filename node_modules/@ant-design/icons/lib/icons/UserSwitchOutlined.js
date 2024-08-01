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
var _UserSwitchOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/UserSwitchOutlined"));
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
var UserSwitchOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _UserSwitchOutlined.default
    }));
};
/**![user-switch](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik03NTkgMzM1YzAtMTM3LTExMS0yNDgtMjQ4LTI0OFMyNjMgMTk4IDI2MyAzMzVjMCA4Mi44IDQwLjYgMTU2LjIgMTAzIDIwMS4yLS40LjItLjcuMy0uOS40LTQ0LjcgMTguOS04NC44IDQ2LTExOS4zIDgwLjZhMzczLjQyIDM3My40MiAwIDAwLTgwLjQgMTE5LjVBMzczLjYgMzczLjYgMCAwMDEzNiA4NzQuOGE4IDggMCAwMDggOC4yaDU5LjljNC4zIDAgNy45LTMuNSA4LTcuOCAyLTc3LjIgMzIuOS0xNDkuNSA4Ny42LTIwNC4zQzM1NiA2MTQuMiA0MzEgNTgzIDUxMSA1ODNjMTM3IDAgMjQ4LTExMSAyNDgtMjQ4ek01MTEgNTA3Yy05NSAwLTE3Mi03Ny0xNzItMTcyczc3LTE3MiAxNzItMTcyIDE3MiA3NyAxNzIgMTcyLTc3IDE3Mi0xNzIgMTcyem0xMDUgMjIxaDI2NGM0LjQgMCA4LTMuNiA4LTh2LTU2YzAtNC40LTMuNi04LTgtOEg3MDMuNWw0Ny4yLTYwLjFhOC4xIDguMSAwIDAwMS43LTQuOWMwLTQuNC0zLjYtOC04LThoLTcyLjZjLTQuOSAwLTkuNSAyLjMtMTIuNiA2LjFsLTY4LjUgODcuMWMtNC40IDUuNi02LjggMTIuNi02LjggMTkuOC4xIDE3LjcgMTQuNCAzMiAzMi4xIDMyem0yNDAgNjRINTkyYy00LjQgMC04IDMuNi04IDh2NTZjMCA0LjQgMy42IDggOCA4aDE3Ni41bC00Ny4yIDYwLjFhOC4xIDguMSAwIDAwLTEuNyA0LjljMCA0LjQgMy42IDggOCA4aDcyLjZjNC45IDAgOS41LTIuMyAxMi42LTYuMWw2OC41LTg3LjFjNC40LTUuNiA2LjgtMTIuNiA2LjgtMTkuOC0uMS0xNy43LTE0LjQtMzItMzIuMS0zMnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(UserSwitchOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'UserSwitchOutlined';
}
var _default = RefIcon;
