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
var _HistoryOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/HistoryOutlined"));
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
var HistoryOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _HistoryOutlined.default
    }));
};
/**![history](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUzNi4xIDI3M0g0ODhjLTQuNCAwLTggMy42LTggOHYyNzUuM2MwIDIuNiAxLjIgNSAzLjMgNi41bDE2NS4zIDEyMC43YzMuNiAyLjYgOC42IDEuOSAxMS4yLTEuN2wyOC42LTM5YzIuNy0zLjcgMS45LTguNy0xLjctMTEuMkw1NDQuMSA1MjguNVYyODFjMC00LjQtMy42LTgtOC04em0yMTkuOCA3NS4ybDE1Ni44IDM4LjNjNSAxLjIgOS45LTIuNiA5LjktNy43bC44LTE2MS41YzAtNi43LTcuNy0xMC41LTEyLjktNi4zTDc1Mi45IDMzNC4xYTggOCAwIDAwMyAxNC4xem0xNjcuNyAzMDEuMWwtNTYuNy0xOS41YTggOCAwIDAwLTEwLjEgNC44Yy0xLjkgNS4xLTMuOSAxMC4xLTYgMTUuMS0xNy44IDQyLjEtNDMuMyA4MC03NS45IDExMi41YTM1MyAzNTMgMCAwMS0xMTIuNSA3NS45IDM1Mi4xOCAzNTIuMTggMCAwMS0xMzcuNyAyNy44Yy00Ny44IDAtOTQuMS05LjMtMTM3LjctMjcuOGEzNTMgMzUzIDAgMDEtMTEyLjUtNzUuOWMtMzIuNS0zMi41LTU4LTcwLjQtNzUuOS0xMTIuNUEzNTMuNDQgMzUzLjQ0IDAgMDExNzEgNTEyYzAtNDcuOCA5LjMtOTQuMiAyNy44LTEzNy44IDE3LjgtNDIuMSA0My4zLTgwIDc1LjktMTEyLjVhMzUzIDM1MyAwIDAxMTEyLjUtNzUuOUM0MzAuNiAxNjcuMyA0NzcgMTU4IDUyNC44IDE1OHM5NC4xIDkuMyAxMzcuNyAyNy44QTM1MyAzNTMgMCAwMTc3NSAyNjEuN2MxMC4yIDEwLjMgMTkuOCAyMSAyOC42IDMyLjNsNTkuOC00Ni44Qzc4NC43IDE0Ni42IDY2Mi4yIDgxLjkgNTI0LjYgODIgMjg1IDgyLjEgOTIuNiAyNzYuNyA5NSA1MTYuNCA5Ny40IDc1MS45IDI4OC45IDk0MiA1MjQuOCA5NDJjMTg1LjUgMCAzNDMuNS0xMTcuNiA0MDMuNy0yODIuMyAxLjUtNC4yLS43LTguOS00LjktMTAuNHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(HistoryOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'HistoryOutlined';
}
var _default = RefIcon;
