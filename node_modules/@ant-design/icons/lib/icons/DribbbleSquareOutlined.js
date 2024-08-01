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
var _DribbbleSquareOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DribbbleSquareOutlined"));
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
var DribbbleSquareOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DribbbleSquareOutlined.default
    }));
};
/**![dribbble-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ5OC42IDQzMmMtNDAuOC03Mi41LTg0LjctMTMzLjQtOTEuMi0xNDIuMy02OC44IDMyLjUtMTIwLjMgOTUuOS0xMzYuMiAxNzIuMiAxMSAuMiAxMTIuNC43IDIyNy40LTI5Ljl6bTY2LjUgMjEuOGM1LjcgMTEuNyAxMS4yIDIzLjYgMTYuMyAzNS42IDEuOCA0LjIgMy42IDguNCA1LjMgMTIuNyA4MS44LTEwLjMgMTYzLjIgNi4yIDE3MS4zIDcuOS0uNS01OC4xLTIxLjMtMTExLjQtNTUuNS0xNTMuMy01LjMgNy4xLTQ2LjUgNjAtMTM3LjQgOTcuMXpNODgwIDExMkgxNDRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjczNmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg3MzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMTQ0YzAtMTcuNy0xNC4zLTMyLTMyLTMyek01MTIgODAwYy0xNTguOCAwLTI4OC0xMjkuMi0yODgtMjg4czEyOS4yLTI4OCAyODgtMjg4IDI4OCAxMjkuMiAyODggMjg4LTEyOS4yIDI4OC0yODggMjg4em04OS43LTI1OS4xYzMyLjIgODguNCA0NS4zIDE2MC40IDQ3LjggMTc1LjQgNTUuMi0zNy4zIDk0LjUtOTYuNCAxMDUuNC0xNjQuOS04LjQtMi42LTc2LjEtMjIuOC0xNTMuMi0xMC41em0tNzIuNS0yNi40YzMuMi0xIDYuNC0yIDkuNy0yLjktNi4yLTE0LTEyLjktMjgtMTkuOS00MS43LTEyMi44IDM2LjgtMjQyLjEgMzUuMi0yNTIuOCAzNS0uMSAyLjUtLjEgNS0uMSA3LjUgMCA2My4yIDIzLjkgMTIwLjkgNjMuMiAxNjQuNSA1LjUtOS42IDczLTEyMS40IDE5OS45LTE2Mi40em0xNDUuOS0xODYuMmEyNDUuMiAyNDUuMiAwIDAwLTIyMC44LTU1LjFjNi44IDkuMSA1MS41IDY5LjkgOTEuOCAxNDQgODcuNS0zMi44IDEyNC41LTgyLjYgMTI5LTg4Ljl6TTU1NCA1NTIuOGMtMTM4LjcgNDguMy0xODguNiAxNDQuNi0xOTMgMTUzLjYgNDEuNyAzMi41IDk0LjEgNTEuOSAxNTEgNTEuOSAzNC4xIDAgNjYuNi02LjkgOTYuMS0xOS41LTMuNy0yMS42LTE3LjktOTYuOC01Mi41LTE4Ni42bC0xLjYuNnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DribbbleSquareOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DribbbleSquareOutlined';
}
var _default = RefIcon;
