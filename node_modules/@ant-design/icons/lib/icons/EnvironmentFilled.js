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
var _EnvironmentFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/EnvironmentFilled"));
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
var EnvironmentFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _EnvironmentFilled.default
    }));
};
/**![environment](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiAzMjdjLTI5LjkgMC01OCAxMS42LTc5LjIgMzIuOEExMTEuNiAxMTEuNiAwIDAwNDAwIDQzOWMwIDI5LjkgMTEuNyA1OCAzMi44IDc5LjJBMTExLjYgMTExLjYgMCAwMDUxMiA1NTFjMjkuOSAwIDU4LTExLjcgNzkuMi0zMi44QzYxMi40IDQ5NyA2MjQgNDY4LjkgNjI0IDQzOWMwLTI5LjktMTEuNi01OC0zMi44LTc5LjJTNTQxLjkgMzI3IDUxMiAzMjd6bTM0Mi42LTM3LjlhMzYyLjQ5IDM2Mi40OSAwIDAwLTc5LjktMTE1LjcgMzcwLjgzIDM3MC44MyAwIDAwLTExOC4yLTc3LjhDNjEwLjcgNzYuNiA1NjIuMSA2NyA1MTIgNjdjLTUwLjEgMC05OC43IDkuNi0xNDQuNSAyOC41LTQ0LjMgMTguMy04NCA0NC41LTExOC4yIDc3LjhBMzYzLjYgMzYzLjYgMCAwMDE2OS40IDI4OWMtMTkuNSA0NS0yOS40IDkyLjgtMjkuNCAxNDIgMCA3MC42IDE2LjkgMTQwLjkgNTAuMSAyMDguNyAyNi43IDU0LjUgNjQgMTA3LjYgMTExIDE1OC4xIDgwLjMgODYuMiAxNjQuNSAxMzguOSAxODguNCAxNTNhNDMuOSA0My45IDAgMDAyMi40IDYuMWM3LjggMCAxNS41LTIgMjIuNC02LjEgMjMuOS0xNC4xIDEwOC4xLTY2LjggMTg4LjQtMTUzIDQ3LTUwLjQgODQuMy0xMDMuNiAxMTEtMTU4LjFDODY3LjEgNTcyIDg4NCA1MDEuOCA4ODQgNDMxLjFjMC00OS4yLTkuOS05Ny0yOS40LTE0MnpNNTEyIDYxNWMtOTcuMiAwLTE3Ni03OC44LTE3Ni0xNzZzNzguOC0xNzYgMTc2LTE3NiAxNzYgNzguOCAxNzYgMTc2LTc4LjggMTc2LTE3NiAxNzZ6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(EnvironmentFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'EnvironmentFilled';
}
var _default = RefIcon;
