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
var _FilePdfOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FilePdfOutlined"));
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
var FilePdfOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FilePdfOutlined.default
    }));
};
/**![file-pdf](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUzMS4zIDU3NC40bC4zLTEuNGM1LjgtMjMuOSAxMy4xLTUzLjcgNy40LTgwLjctMy44LTIxLjMtMTkuNS0yOS42LTMyLjktMzAuMi0xNS44LS43LTI5LjkgOC4zLTMzLjQgMjEuNC02LjYgMjQtLjcgNTYuOCAxMC4xIDk4LjYtMTMuNiAzMi40LTM1LjMgNzkuNS01MS4yIDEwNy41LTI5LjYgMTUuMy02OS4zIDM4LjktNzUuMiA2OC43LTEuMiA1LjUuMiAxMi41IDMuNSAxOC44IDMuNyA3IDkuNiAxMi40IDE2LjUgMTUgMyAxLjEgNi42IDIgMTAuOCAyIDE3LjYgMCA0Ni4xLTE0LjIgODQuMS03OS40IDUuOC0xLjkgMTEuOC0zLjkgMTcuNi01LjkgMjcuMi05LjIgNTUuNC0xOC44IDgwLjktMjMuMSAyOC4yIDE1LjEgNjAuMyAyNC44IDgyLjEgMjQuOCAyMS42IDAgMzAuMS0xMi44IDMzLjMtMjAuNSA1LjYtMTMuNSAyLjktMzAuNS02LjItMzkuNi0xMy4yLTEzLTQ1LjMtMTYuNC05NS4zLTEwLjItMjQuNi0xNS00MC43LTM1LjQtNTIuNC02NS44ek00MjEuNiA3MjYuM2MtMTMuOSAyMC4yLTI0LjQgMzAuMy0zMC4xIDM0LjcgNi43LTEyLjMgMTkuOC0yNS4zIDMwLjEtMzQuN3ptODcuNi0yMzUuNWM1LjIgOC45IDQuNSAzNS44LjUgNDkuNC00LjktMTkuOS01LjYtNDguMS0yLjctNTEuNC44LjEgMS41LjcgMi4yIDJ6bS0xLjYgMTIwLjVjMTAuNyAxOC41IDI0LjIgMzQuNCAzOS4xIDQ2LjItMjEuNiA0LjktNDEuMyAxMy01OC45IDIwLjItNC4yIDEuNy04LjMgMy40LTEyLjMgNSAxMy4zLTI0LjEgMjQuNC01MS40IDMyLjEtNzEuNHptMTU1LjYgNjUuNWMuMS4yLjIuNS0uNC45aC0uMmwtLjIuM2MtLjguNS05IDUuMy00NC4zLTguNiA0MC42LTEuOSA0NSA3LjMgNDUuMSA3LjR6bTE5MS40LTM4OC4yTDYzOS40IDczLjRjLTYtNi0xNC4xLTkuNC0yMi42LTkuNEgxOTJjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjgzMmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NDBjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzExLjNjMC04LjUtMy40LTE2LjctOS40LTIyLjd6TTc5MC4yIDMyNkg2MDJWMTM3LjhMNzkwLjIgMzI2em0xLjggNTYySDIzMlYxMzZoMzAydjIxNmE0MiA0MiAwIDAwNDIgNDJoMjE2djQ5NHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FilePdfOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FilePdfOutlined';
}
var _default = RefIcon;
