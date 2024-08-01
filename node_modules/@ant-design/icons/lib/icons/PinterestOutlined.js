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
var _PinterestOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PinterestOutlined"));
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
var PinterestOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PinterestOutlined.default
    }));
};
/**![pinterest](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTEyIDY0QzI2NC44IDY0IDY0IDI2NC44IDY0IDUxMnMyMDAuOCA0NDggNDQ4IDQ0OCA0NDgtMjAwLjggNDQ4LTQ0OFM3NTkuMiA2NCA1MTIgNjRtMCAzOC45NmMyMjYuMTQgMCA0MDkuMDQgMTgyLjkgNDA5LjA0IDQwOS4wNCAwIDIyNi4xNC0xODIuOSA0MDkuMDQtNDA5LjA0IDQwOS4wNC00MS4zNyAwLTgxLjI3LTYuMTktMTE4Ljg5LTE3LjU3IDE2Ljc2LTI4LjAyIDM4LjQtNjguMDYgNDYuOTktMTAxLjEyIDUuMS0xOS42IDI2LjEtOTkuNTYgMjYuMS05OS41NiAxMy42NCAyNi4wNCA1My41IDQ4LjA5IDk1Ljk0IDQ4LjA5IDEyNi4zIDAgMjE3LjM0LTExNi4xNSAyMTcuMzQtMjYwLjQ5IDAtMTM4LjM3LTExMi45MS0yNDEuODgtMjU4LjItMjQxLjg4LTE4MC43NSAwLTI3Ni42OSAxMjEuMzItMjc2LjY5IDI1My40IDAgNjEuNDQgMzIuNjggMTM3LjkxIDg1IDE2Mi4yNiA3LjkyIDMuNyAxMi4xNyAyLjEgMTQtNS41OSAxLjQtNS44MyA4LjQ2LTM0LjI1IDExLjYzLTQ3LjQ4IDEuMDItNC4yMi41My03Ljg2LTIuODktMTIuMDItMTcuMzEtMjEtMzEuMi01OS41OC0zMS4yLTk1LjU2IDAtOTIuMzggNjkuOTQtMTgxLjc4IDE4OS4wOC0xODEuNzggMTAyLjg4IDAgMTc0LjkzIDcwLjEzIDE3NC45MyAxNzAuNCAwIDExMy4yOC01Ny4yIDE5MS43OC0xMzEuNjMgMTkxLjc4LTQxLjExIDAtNzEuODktMzQtNjIuMDItNzUuNyAxMS44NC00OS43OCAzNC43LTEwMy40OSAzNC43LTEzOS40NCAwLTMyLjE1LTE3LjI1LTU4Ljk3LTUzLTU4Ljk3LTQyLjAyIDAtNzUuNzggNDMuNDUtNzUuNzggMTAxLjcgMCAzNy4wNiAxMi41NiA2Mi4xNiAxMi41NiA2Mi4xNnMtNDEuNTEgMTc1LjUtNDkuMTIgMjA4LjE3Yy03LjYyIDMyLjY0LTUuNTggNzYuNi0yLjQzIDEwOS4zNEMyMDguNTUgODMwLjUyIDEwMi45NiA2ODMuNzggMTAyLjk2IDUxMmMwLTIyNi4xNCAxODIuOS00MDkuMDQgNDA5LjA0LTQwOS4wNCIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PinterestOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PinterestOutlined';
}
var _default = RefIcon;
