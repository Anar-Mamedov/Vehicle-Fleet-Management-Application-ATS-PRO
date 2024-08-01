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
var _AntCloudOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AntCloudOutlined"));
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
var AntCloudOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AntCloudOutlined.default
    }));
};
/**![ant-cloud](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM3OC45IDczOGMtMy4xIDAtNi4xLS41LTguOC0xLjVsNC40IDMwLjdoMjYuM2wtMTUuNS0yOS45Yy0yLjEuNS00LjIuNy02LjQuN3ptNDIxLTI5MS4yYy0xMi42IDAtMjQuOCAxLjUtMzYuNSA0LjItMjEuNC0zOC40LTYyLjMtNjQuMy0xMDkuMy02NC4zLTYuOSAwLTEzLjYuNi0yMC4yIDEuNi0zNS40LTc3LjQtMTEzLjQtMTMxLjEtMjAzLjktMTMxLjEtMTEyLjMgMC0yMDUuMyA4Mi42LTIyMS42IDE5MC40QzEyNy4zIDQ1NS41IDY0IDUyMy44IDY0IDYwN2MwIDg4LjQgNzEuNiAxNjAuMSAxNjAgMTYwLjJoNTBsMTMuMi0yNy42Yy0yNi4yLTguMy00My4zLTI5LTM5LjEtNDguOCA0LjYtMjEuNiAzMi44LTMzLjkgNjMuMS0yNy41IDIyLjkgNC45IDQwLjQgMTkuMSA0NS41IDM1LjFhMjYuMSAyNi4xIDAgMDEyMi4xLTEyLjRoLjJjLS44LTMuMi0xLjItNi41LTEuMi05LjkgMC0yMC4xIDE0LjgtMzYuNyAzNC4xLTM5LjZ2LTI1LjRjMC00LjQgMy42LTggOC04czggMy42IDggOHYyNi4zYzQuNiAxLjIgOC44IDMuMiAxMi42IDUuOGwxOS41LTIxLjRjMy0zLjMgOC0zLjUgMTEuMy0uNSAzLjMgMyAzLjUgOCAuNSAxMS4zbC0yMCAyMi0uMi4yYTQwIDQwIDAgMDEtNDYuOSA1OS4yYy0uNCA1LjYtMi42IDEwLjctNiAxNC44bDIwIDM4LjRIODA0di0uMWM4Ni41LTIuMiAxNTYtNzMgMTU2LTE2MC4xIDAtODguNS03MS43LTE2MC4yLTE2MC4xLTE2MC4yek0zMzguMiA3MzcuMmwtNC4zIDMwaDI0LjRsLTUuOS00MS41Yy0zLjUgNC42LTguMyA4LjUtMTQuMiAxMS41ek03OTcuNSAzMDVhNDggNDggMCAxMDk2IDAgNDggNDggMCAxMC05NiAwem0tNjUuNyA2MS4zYTI0IDI0IDAgMTA0OCAwIDI0IDI0IDAgMTAtNDggMHpNMzAzLjQgNzQyLjlsLTExLjYgMjQuM2gyNmwzLjUtMjQuN2MtNS43LjgtMTEuNyAxLTE3LjkuNHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AntCloudOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AntCloudOutlined';
}
var _default = RefIcon;
