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
var _FilePdfFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FilePdfFilled"));
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
var FilePdfFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FilePdfFilled.default
    }));
};
/**![file-pdf](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg1NC42IDI4OC43YzYgNiA5LjQgMTQuMSA5LjQgMjIuNlY5MjhjMCAxNy43LTE0LjMgMzItMzIgMzJIMTkyYy0xNy43IDAtMzItMTQuMy0zMi0zMlY5NmMwLTE3LjcgMTQuMy0zMiAzMi0zMmg0MjQuN2M4LjUgMCAxNi43IDMuNCAyMi43IDkuNGwyMTUuMiAyMTUuM3pNNzkwLjIgMzI2TDYwMiAxMzcuOFYzMjZoMTg4LjJ6TTYzMy4yMiA2MzcuMjZjLTE1LjE4LS41LTMxLjMyLjY3LTQ5LjY1IDIuOTYtMjQuMy0xNC45OS00MC42Ni0zNS41OC01Mi4yOC02NS44M2wxLjA3LTQuMzggMS4yNC01LjE4YzQuMy0xOC4xMyA2LjYxLTMxLjM2IDcuMy00NC43LjUyLTEwLjA3LS4wNC0xOS4zNi0xLjgzLTI3Ljk3LTMuMy0xOC41OS0xNi40NS0yOS40Ni0zMy4wMi0zMC4xMy0xNS40NS0uNjMtMjkuNjUgOC0zMy4yOCAyMS4zNy01LjkxIDIxLjYyLTIuNDUgNTAuMDcgMTAuMDggOTguNTktMTUuOTYgMzguMDUtMzcuMDUgODIuNjYtNTEuMiAxMDcuNTQtMTguODkgOS43NC0zMy42IDE4LjYtNDUuOTYgMjguNDItMTYuMyAxMi45Ny0yNi40OCAyNi4zLTI5LjI4IDQwLjMtMS4zNiA2LjQ5LjY5IDE0Ljk3IDUuMzYgMjEuOTIgNS4zIDcuODggMTMuMjggMTMgMjIuODUgMTMuNzQgMjQuMTUgMS44NyA1My44My0yMy4wMyA4Ni42LTc5LjI2IDMuMjktMS4xIDYuNzctMi4yNiAxMS4wMi0zLjdsMTEuOS00LjAyYzcuNTMtMi41NCAxMi45OS00LjM2IDE4LjM5LTYuMTEgMjMuNC03LjYyIDQxLjEtMTIuNDMgNTcuMi0xNS4xNyAyNy45OCAxNC45OCA2MC4zMiAyNC44IDgyLjEgMjQuOCAxNy45OCAwIDMwLjEzLTkuMzIgMzQuNTItMjMuOTkgMy44NS0xMi44OC44LTI3LjgyLTcuNDgtMzYuMDgtOC41Ni04LjQxLTI0LjMtMTIuNDMtNDUuNjUtMTMuMTJ6TTM4NS4yMyA3NjUuNjh2LS4zNmwuMTMtLjM0YTU0Ljg2IDU0Ljg2IDAgMDE1LjYtMTAuNzZjNC4yOC02LjU4IDEwLjE3LTEzLjUgMTcuNDctMjAuODcgMy45Mi0zLjk1IDgtNy44IDEyLjc5LTEyLjEyIDEuMDctLjk2IDcuOTEtNy4wNSA5LjE5LTguMjVsMTEuMTctMTAuNC04LjEyIDEyLjkzYy0xMi4zMiAxOS42NC0yMy40NiAzMy43OC0zMyA0My0zLjUxIDMuNC02LjYgNS45LTkuMSA3LjUxYTE2LjQzIDE2LjQzIDAgMDEtMi42MSAxLjQyYy0uNDEuMTctLjc3LjI3LTEuMTMuM2EyLjIgMi4yIDAgMDEtMS4xMi0uMTUgMi4wNyAyLjA3IDAgMDEtMS4yNy0xLjkxek01MTEuMTcgNTQ3LjRsLTIuMjYgNC0xLjQtNC4zOGMtMy4xLTkuODMtNS4zOC0yNC42NC02LjAxLTM4LS43Mi0xNS4yLjQ5LTI0LjMyIDUuMjktMjQuMzIgNi43NCAwIDkuODMgMTAuOCAxMC4wNyAyNy4wNS4yMiAxNC4yOC0yLjAzIDI5LjE0LTUuNyAzNS42NXptLTUuODEgNTguNDZsMS41My00LjA1IDIuMDkgMy44YzExLjY5IDIxLjI0IDI2Ljg2IDM4Ljk2IDQzLjU0IDUxLjMxbDMuNiAyLjY2LTQuMzkuOWMtMTYuMzMgMy4zOC0zMS41NCA4LjQ2LTUyLjM0IDE2Ljg1IDIuMTctLjg4LTIxLjYyIDguODYtMjcuNjQgMTEuMTdsLTUuMjUgMi4wMSAyLjgtNC44OGMxMi4zNS0yMS41IDIzLjc2LTQ3LjMyIDM2LjA1LTc5Ljc3em0xNTcuNjIgNzYuMjZjLTcuODYgMy4xLTI0Ljc4LjMzLTU0LjU3LTEyLjM5bC03LjU2LTMuMjIgOC4yLS42YzIzLjMtMS43MyAzOS44LS40NSA0OS40MiAzLjA3IDQuMSAxLjUgNi44MyAzLjM5IDguMDQgNS41NWE0LjY0IDQuNjQgMCAwMS0xLjM2IDYuMzEgNi43IDYuNyAwIDAxLTIuMTcgMS4yOHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FilePdfFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FilePdfFilled';
}
var _default = RefIcon;
