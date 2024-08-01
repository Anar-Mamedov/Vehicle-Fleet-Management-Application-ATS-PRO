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
var _CodepenSquareFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CodepenSquareFilled"));
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
var CodepenSquareFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CodepenSquareFilled.default
    }));
};
/**![codepen-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcyMy4xIDQyOEw1MzUuOSAzMDMuNHYxMTEuM2wxMDMuNiA2OS4xek01MTIgNDU2LjFsLTg0LjUgNTYuNCA4NC41IDU2LjQgODQuNS01Ni40em0yMy45IDE1NC4ydjExMS4zTDcyMy4xIDU5N2wtODMuNi01NS44em0tMTUxLjQtNjkuMUwzMDAuOSA1OTdsMTg3LjIgMTI0LjZWNjEwLjNsLTEwMy42LTY5LjF6TTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTkwIDQ4NWMwIDEuMS0uMSAyLjEtLjIgMy4xIDAgLjQtLjEuNy0uMiAxYTE0LjE2IDE0LjE2IDAgMDEtLjggMy4yYy0uMi42LS40IDEuMi0uNiAxLjctLjIuNC0uNC44LS41IDEuMi0uMy41LS41IDEuMS0uOCAxLjYtLjIuNC0uNC43LS43IDEuMS0uMy41LS43IDEtMSAxLjUtLjMuNC0uNS43LS44IDEtLjQuNC0uOC45LTEuMiAxLjMtLjMuMy0uNi42LTEgLjktLjQuNC0uOS44LTEuNCAxLjEtLjQuMy0uNy42LTEuMS44LS4xLjEtLjMuMi0uNC4zTDUyNS4yIDc4NmMtNCAyLjctOC42IDQtMTMuMiA0LTQuNyAwLTkuMy0xLjQtMTMuMy00TDI0NC42IDYxNi45Yy0uMS0uMS0uMy0uMi0uNC0uM2wtMS4xLS44Yy0uNS0uNC0uOS0uNy0xLjMtMS4xLS4zLS4zLS42LS42LTEtLjktLjQtLjQtLjgtLjgtMS4yLTEuM2E3IDcgMCAwMS0uOC0xYy0uNC0uNS0uNy0xLTEtMS41LS4yLS40LS41LS43LS43LTEuMS0uMy0uNS0uNi0xLjEtLjgtMS42LS4yLS40LS40LS44LS41LTEuMi0uMi0uNi0uNC0xLjItLjYtMS43LS4xLS40LS4zLS44LS40LTEuMi0uMi0uNy0uMy0xLjMtLjQtMi0uMS0uMy0uMS0uNy0uMi0xLS4xLTEtLjItMi4xLS4yLTMuMVY0MjcuOWMwLTEgLjEtMi4xLjItMy4xLjEtLjMuMS0uNy4yLTFhMTQuMTYgMTQuMTYgMCAwMS44LTMuMmMuMi0uNi40LTEuMi42LTEuNy4yLS40LjQtLjguNS0xLjIuMi0uNS41LTEuMS44LTEuNi4yLS40LjQtLjcuNy0xLjEuNi0uOSAxLjItMS43IDEuOC0yLjUuNC0uNC44LS45IDEuMi0xLjMuMy0uMy42LS42IDEtLjkuNC0uNC45LS44IDEuMy0xLjEuNC0uMy43LS42IDEuMS0uOC4xLS4xLjMtLjIuNC0uM0w0OTguNyAyMzljOC01LjMgMTguNS01LjMgMjYuNSAwbDI1NC4xIDE2OS4xYy4xLjEuMy4yLjQuM2wxLjEuOCAxLjQgMS4xYy4zLjMuNi42IDEgLjkuNC40LjguOCAxLjIgMS4zLjcuOCAxLjMgMS42IDEuOCAyLjUuMi40LjUuNy43IDEuMS4zLjUuNiAxIC44IDEuNi4yLjQuNC44LjUgMS4yLjIuNi40IDEuMi42IDEuNy4xLjQuMy44LjQgMS4yLjIuNy4zIDEuMy40IDIgLjEuMy4xLjcuMiAxIC4xIDEgLjIgMi4xLjIgMy4xVjU5N3ptLTQ3LjgtNDQuNnYtNzkuOGwtNTkuOCAzOS45em0tNDYwLjQtNzkuOHY3OS44bDU5LjgtMzkuOXptMjA2LjMtNTcuOVYzMDMuNEwzMDAuOSA0MjhsODMuNiA1NS44eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CodepenSquareFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CodepenSquareFilled';
}
var _default = RefIcon;
