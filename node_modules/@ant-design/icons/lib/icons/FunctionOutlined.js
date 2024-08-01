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
var _FunctionOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FunctionOutlined"));
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
var FunctionOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FunctionOutlined.default
    }));
};
/**![function](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik04NDEgMzcwYzMtMy4zIDIuNy04LjMtLjYtMTEuM2E4LjI0IDguMjQgMCAwMC01LjMtMi4xaC03Mi42Yy0yLjQgMC00LjYgMS02LjEgMi44TDYzMy41IDUwNC42YTcuOTYgNy45NiAwIDAxLTEzLjQtMS45bC02My41LTE0MS4zYTcuOSA3LjkgMCAwMC03LjMtNC43SDM4MC43bC45LTQuNyA4LTQyLjNjMTAuNS01NS40IDM4LTgxLjQgODUuOC04MS40IDE4LjYgMCAzNS41IDEuNyA0OC44IDQuN2wxNC4xLTY2LjhjLTIyLjYtNC43LTM1LjItNi4xLTU0LjktNi4xLTEwMy4zIDAtMTU2LjQgNDQuMy0xNzUuOSAxNDcuM2wtOS40IDQ5LjRoLTk3LjZjLTMuOCAwLTcuMSAyLjctNy44IDYuNEwxODEuOSA0MTVhOC4wNyA4LjA3IDAgMDA3LjggOS43SDI4NGwtODkgNDI5LjlhOC4wNyA4LjA3IDAgMDA3LjggOS43SDI2OWMzLjggMCA3LjEtMi43IDcuOC02LjRsODkuNy00MzMuMWgxMzUuOGw2OC4yIDEzOS4xYzEuNCAyLjkgMSA2LjQtMS4yIDguOGwtMTgwLjYgMjAzYy0yLjkgMy4zLTIuNiA4LjQuNyAxMS4zIDEuNSAxLjMgMy40IDIgNS4zIDJoNzIuN2MyLjQgMCA0LjYtMSA2LjEtMi44bDEyMy43LTE0Ni43YzIuOC0zLjQgNy45LTMuOCAxMS4zLTEgLjkuOCAxLjYgMS43IDIuMSAyLjhMNjc2LjQgNzg0YzEuMyAyLjggNC4xIDQuNyA3LjMgNC43aDY0LjZhOC4wMiA4LjAyIDAgMDA3LjItMTEuNWwtOTUuMi0xOTguOWMtMS40LTIuOS0uOS02LjQgMS4zLTguOEw4NDEgMzcweiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FunctionOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FunctionOutlined';
}
var _default = RefIcon;
