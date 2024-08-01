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
var _TikTokFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TikTokFilled"));
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
var TikTokFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TikTokFilled.default
    }));
};
/**![tik-tok](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOTEyIDIyNC45NkM5MTIgMTYyLjU3IDg2MS40MiAxMTIgNzk5LjA0IDExMkgyMjQuOTZDMTYyLjU3IDExMiAxMTIgMTYyLjU3IDExMiAyMjQuOTZ2NTc0LjA4QzExMiA4NjEuNDMgMTYyLjU4IDkxMiAyMjQuOTYgOTEyaDU3NC4wOEM4NjEuNDIgOTEyIDkxMiA4NjEuNDMgOTEyIDc5OS4wNHpNNzc0Ljc2IDQ2MC45MmMtNTEuNjIuNTctOTkuNzEtMTUuMDMtMTQxLjk0LTQzLjkzdjIwMi44N2ExOTIuMyAxOTIuMyAwIDAxLTE0OSAxODcuODVjLTExOS4wNiAyNy4xNy0yMTkuODYtNTguOTUtMjMyLjU3LTE2MS44My0xMy4zLTEwMi44OSA1Mi4zMi0xOTMuMDYgMTUyLjg5LTIxMy4yOSAxOS42NS00LjA0IDQ5LjItNC4wNCA2NC40Ni0uNTd2MTA4LjY2Yy00LjctMS4xNS05LjA5LTIuMzEtMTMuNzEtMi44OS0zOS4zLTYuOTQtNzcuMzcgMTIuNzItOTIuOTggNDguNTUtMTUuNiAzNS44NC01LjE2IDc3LjQ1IDI2LjYzIDEwMS43MyAyNi41OSAyMC44IDU2LjA5IDIzLjcgODYuMTQgOS44MiAzMC4wNi0xMy4yOSA0Ni4yMS0zNy41NiA0OS42OC03MC41LjU4LTQuNjMuNTQtOS44NC41NC0xNS4wNFYyMjIuMjFjMC0xMC45OS4wOS0xMC41IDExLjA3LTEwLjVoODYuMTJjNi4zNiAwIDguNjcuOSA5LjI1IDguNDMgNC42MiA2Ny4wNCA1NS41MyAxMjQuMTQgMTIwLjg0IDEzMi44MSA2Ljk0IDEuMTYgMTQuMzcgMS42MiAyMi41OCAyLjJ6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TikTokFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TikTokFilled';
}
var _default = RefIcon;
