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
var _YuqueOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/YuqueOutlined"));
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
var YuqueOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _YuqueOutlined.default
    }));
};
/**![yuque](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg1NC42IDM3MC42Yy05LjktMzkuNCA5LjktMTAyLjIgNzMuNC0xMjQuNGwtNjcuOS0zLjZzLTI1LjctOTAtMTQzLjYtOThjLTExNy44LTguMS0xOTQuOS0zLTE5NS0zIC4xIDAgODcuNCA1NS42IDUyLjQgMTU0LjctMjUuNiA1Mi41LTY1LjggOTUuNi0xMDguOCAxNDQuNy0xLjMgMS4zLTIuNSAyLjYtMy41IDMuN0MzMTkuNCA2MDUgOTYgODYwIDk2IDg2MGMyNDUuOSA2NC40IDQxMC43LTYuMyA1MDguMi05MS4xIDIwLjUtLjIgMzUuOS0uMyA0Ni4zLS4zIDEzNS44IDAgMjUwLjYtMTE3LjYgMjQ1LjktMjQ4LjQtMy4yLTg5LjktMzEuOS0xMTAuMi00MS44LTE0OS42em0tMjA0LjEgMzM0Yy0xMC42IDAtMjYuMi4xLTQ2LjguM2wtMjMuNi4yLTE3LjggMTUuNWMtNDcuMSA0MS0xMDQuNCA3MS41LTE3MS40IDg3LjYtNTIuNSAxMi42LTExMCAxNi4yLTE3Mi43IDkuNiAxOC0yMC41IDM2LjUtNDEuNiA1NS40LTYzLjEgOTItMTA0LjYgMTczLjgtMTk3LjUgMjM2LjktMjY4LjVsMS40LTEuNCAxLjMtMS41YzQuMS00LjYgMjAuNi0yMy4zIDI0LjctMjguMSA5LjctMTEuMSAxNy4zLTE5LjkgMjQuNS0yOC42IDMwLjctMzYuNyA1Mi4yLTY3LjggNjktMTAyLjJsMS42LTMuMyAxLjItMy40YzEzLjctMzguOCAxNS40LTc2LjkgNi4yLTExMi44IDIyLjUuNyA0Ni41IDEuOSA3MS43IDMuNiAzMy4zIDIuMyA1NS41IDEyLjkgNzEuMSAyOS4yIDUuOCA2IDEwLjIgMTIuNSAxMy40IDE4LjcgMSAyIDEuNyAzLjYgMi4zIDVsNSAxNy43Yy0xNS43IDM0LjUtMTkuOSA3My4zLTExLjQgMTA3LjIgMyAxMS44IDYuOSAyMi40IDEyLjMgMzQuNCAyLjEgNC43IDkuNSAyMC4xIDExIDIzLjMgMTAuMyAyMi43IDE1LjQgNDMgMTYuNyA3OC43IDMuMyA5NC42LTgyLjcgMTgxLjktMTgyIDE4MS45eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(YuqueOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'YuqueOutlined';
}
var _default = RefIcon;
