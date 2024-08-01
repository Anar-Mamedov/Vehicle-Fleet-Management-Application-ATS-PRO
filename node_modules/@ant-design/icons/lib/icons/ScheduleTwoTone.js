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
var _ScheduleTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ScheduleTwoTone"));
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
var ScheduleTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ScheduleTwoTone.default
    }));
};
/**![schedule](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc2OCAzNTJjMCA0LjQtMy42IDgtOCA4aC01NmMtNC40IDAtOC0zLjYtOC04di01Nkg1NDh2NTZjMCA0LjQtMy42IDgtOCA4aC01NmMtNC40IDAtOC0zLjYtOC04di01NkgzMjh2NTZjMCA0LjQtMy42IDgtOCA4aC01NmMtNC40IDAtOC0zLjYtOC04di01NkgxMzZ2NDk2aDc1MlYyOTZINzY4djU2ek00MjQgNjg4YzAgNC40LTMuNiA4LTggOEgyMzJjLTQuNCAwLTgtMy42LTgtOHYtNDhjMC00LjQgMy42LTggOC04aDE4NGM0LjQgMCA4IDMuNiA4IDh2NDh6bTAtMTM2YzAgNC40LTMuNiA4LTggOEgyMzJjLTQuNCAwLTgtMy42LTgtOHYtNDhjMC00LjQgMy42LTggOC04aDE4NGM0LjQgMCA4IDMuNiA4IDh2NDh6bTM3NC40LTkxLjJsLTE2NSAyMjguN2ExNS45IDE1LjkgMCAwMS0yNS44IDBMNDkzLjUgNTMxLjNjLTMuOC01LjMgMC0xMi43IDYuNS0xMi43aDU0LjljNS4xIDAgOS45IDIuNCAxMi45IDYuNmw1Mi44IDczLjEgMTAzLjYtMTQzLjdjMy00LjEgNy44LTYuNiAxMi44LTYuNWg1NC45YzYuNSAwIDEwLjMgNy40IDYuNSAxMi43eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNNzI0LjIgNDU0LjZMNjIwLjYgNTk4LjNsLTUyLjgtNzMuMWMtMy00LjItNy44LTYuNi0xMi45LTYuNkg1MDBjLTYuNSAwLTEwLjMgNy40LTYuNSAxMi43bDExNC4xIDE1OC4yYTE1LjkgMTUuOSAwIDAwMjUuOCAwbDE2NS0yMjguN2MzLjgtNS4zIDAtMTIuNy02LjUtMTIuN0g3MzdjLTUtLjEtOS44IDIuNC0xMi44IDYuNXpNNDE2IDQ5NkgyMzJjLTQuNCAwLTggMy42LTggOHY0OGMwIDQuNCAzLjYgOCA4IDhoMTg0YzQuNCAwIDgtMy42IDgtOHYtNDhjMC00LjQtMy42LTgtOC04eiIgZmlsbD0iIzE2NzdmZiIgLz48cGF0aCBkPSJNOTI4IDIyNEg3Njh2LTU2YzAtNC40LTMuNi04LTgtOGgtNTZjLTQuNCAwLTggMy42LTggOHY1Nkg1NDh2LTU2YzAtNC40LTMuNi04LTgtOGgtNTZjLTQuNCAwLTggMy42LTggOHY1NkgzMjh2LTU2YzAtNC40LTMuNi04LTgtOGgtNTZjLTQuNCAwLTggMy42LTggOHY1Nkg5NmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2NTc2YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDgzMmMxNy43IDAgMzItMTQuMyAzMi0zMlYyNTZjMC0xNy43LTE0LjMtMzItMzItMzJ6bS00MCA1NjhIMTM2VjI5NmgxMjB2NTZjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOHYtNTZoMTQ4djU2YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LTh2LTU2aDE0OHY1NmMwIDQuNCAzLjYgOCA4IDhoNTZjNC40IDAgOC0zLjYgOC04di01NmgxMjB2NDk2eiIgZmlsbD0iIzE2NzdmZiIgLz48cGF0aCBkPSJNNDE2IDYzMkgyMzJjLTQuNCAwLTggMy42LTggOHY0OGMwIDQuNCAzLjYgOCA4IDhoMTg0YzQuNCAwIDgtMy42IDgtOHYtNDhjMC00LjQtMy42LTgtOC04eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ScheduleTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ScheduleTwoTone';
}
var _default = RefIcon;
