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
var _CloseCircleOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CloseCircleOutlined"));
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
var CloseCircleOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CloseCircleOutlined.default
    }));
};
/**![close-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTEyIDY0YzI0Ny40IDAgNDQ4IDIwMC42IDQ0OCA0NDhTNzU5LjQgOTYwIDUxMiA5NjAgNjQgNzU5LjQgNjQgNTEyIDI2NC42IDY0IDUxMiA2NHptMCA3NmMtMjA1LjQgMC0zNzIgMTY2LjYtMzcyIDM3MnMxNjYuNiAzNzIgMzcyIDM3MiAzNzItMTY2LjYgMzcyLTM3Mi0xNjYuNi0zNzItMzcyLTM3MnptMTI4LjAxIDE5OC44M2MuMDMgMCAuMDUuMDEuMDkuMDZsNDUuMDIgNDUuMDFhLjIuMiAwIDAxLjA1LjA5LjEyLjEyIDAgMDEwIC4wN2MwIC4wMi0uMDEuMDQtLjA1LjA4TDU1Ny4yNSA1MTJsMTI3Ljg3IDEyNy44NmEuMjcuMjcgMCAwMS4wNS4wNnYuMDJhLjEyLjEyIDAgMDEwIC4wN2MwIC4wMy0uMDEuMDUtLjA1LjA5bC00NS4wMiA0NS4wMmEuMi4yIDAgMDEtLjA5LjA1LjEyLjEyIDAgMDEtLjA3IDBjLS4wMiAwLS4wNC0uMDEtLjA4LS4wNUw1MTIgNTU3LjI1IDM4NC4xNCA2ODUuMTJjLS4wNC4wNC0uMDYuMDUtLjA4LjA1YS4xMi4xMiAwIDAxLS4wNyAwYy0uMDMgMC0uMDUtLjAxLS4wOS0uMDVsLTQ1LjAyLTQ1LjAyYS4yLjIgMCAwMS0uMDUtLjA5LjEyLjEyIDAgMDEwLS4wN2MwLS4wMi4wMS0uMDQuMDYtLjA4TDQ2Ni43NSA1MTIgMzM4Ljg4IDM4NC4xNGEuMjcuMjcgMCAwMS0uMDUtLjA2bC0uMDEtLjAyYS4xMi4xMiAwIDAxMC0uMDdjMC0uMDMuMDEtLjA1LjA1LS4wOWw0NS4wMi00NS4wMmEuMi4yIDAgMDEuMDktLjA1LjEyLjEyIDAgMDEuMDcgMGMuMDIgMCAuMDQuMDEuMDguMDZMNTEyIDQ2Ni43NWwxMjcuODYtMTI3Ljg2Yy4wNC0uMDUuMDYtLjA2LjA4LS4wNmEuMTIuMTIgMCAwMS4wNyAweiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CloseCircleOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CloseCircleOutlined';
}
var _default = RefIcon;
