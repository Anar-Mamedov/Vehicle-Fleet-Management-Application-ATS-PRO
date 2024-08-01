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
var _GoogleOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/GoogleOutlined"));
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
var GoogleOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _GoogleOutlined.default
    }));
};
/**![google](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MSA0NDIuNEg1MTkuN3YxNDguNWgyMDYuNGMtOC45IDQ4LTM1LjkgODguNi03Ni42IDExNS44LTM0LjQgMjMtNzguMyAzNi42LTEyOS45IDM2LjYtOTkuOSAwLTE4NC40LTY3LjUtMjE0LjYtMTU4LjItNy42LTIzLTEyLTQ3LjYtMTItNzIuOXM0LjQtNDkuOSAxMi03Mi45YzMwLjMtOTAuNiAxMTQuOC0xNTguMSAyMTQuNy0xNTguMSA1Ni4zIDAgMTA2LjggMTkuNCAxNDYuNiA1Ny40bDExMC0xMTAuMWMtNjYuNS02Mi0xNTMuMi0xMDAtMjU2LjYtMTAwLTE0OS45IDAtMjc5LjYgODYtMzQyLjcgMjExLjQtMjYgNTEuOC00MC44IDExMC40LTQwLjggMTcyLjRTMTUxIDYzMi44IDE3NyA2ODQuNkMyNDAuMSA4MTAgMzY5LjggODk2IDUxOS43IDg5NmMxMDMuNiAwIDE5MC40LTM0LjQgMjUzLjgtOTMgNzIuNS02Ni44IDExNC40LTE2NS4yIDExNC40LTI4Mi4xIDAtMjcuMi0yLjQtNTMuMy02LjktNzguNXoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(GoogleOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'GoogleOutlined';
}
var _default = RefIcon;
