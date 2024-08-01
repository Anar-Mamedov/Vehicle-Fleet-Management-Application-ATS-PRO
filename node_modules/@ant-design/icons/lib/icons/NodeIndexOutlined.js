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
var _NodeIndexOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/NodeIndexOutlined"));
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
var NodeIndexOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _NodeIndexOutlined.default
    }));
};
/**![node-index](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik04NDMuNSA3MzcuNGMtMTIuNC03NS4yLTc5LjItMTI5LjEtMTU1LjMtMTI1LjRTNTUwLjkgNjc2IDU0NiA3NTJjLTE1My41LTQuOC0yMDgtNDAuNy0xOTkuMS0xMTMuNyAzLjMtMjcuMyAxOS44LTQxLjkgNTAuMS00OSAxOC40LTQuMyAzOC44LTQuOSA1Ny4zLTMuMiAxLjcuMiAzLjUuMyA1LjIuNSAxMS4zIDIuNyAyMi44IDUgMzQuMyA2LjggMzQuMSA1LjYgNjguOCA4LjQgMTAxLjggNi42IDkyLjgtNSAxNTYtNDUuOSAxNTkuMi0xMzIuNyAzLjEtODQuMS01NC43LTE0My43LTE0Ny45LTE4My42LTI5LjktMTIuOC02MS42LTIyLjctOTMuMy0zMC4yLTE0LjMtMy40LTI2LjMtNS43LTM1LjItNy4yLTcuOS03NS45LTcxLjUtMTMzLjgtMTQ3LjgtMTM0LjQtNzYuMy0uNi0xNDAuOSA1Ni4xLTE1MC4xIDEzMS45czQwIDE0Ni4zIDExNC4yIDE2My45Yzc0LjIgMTcuNiAxNDkuOS0yMy4zIDE3NS43LTk1LjEgOS40IDEuNyAxOC43IDMuNiAyOCA1LjggMjguMiA2LjYgNTYuNCAxNS40IDgyLjQgMjYuNiA3MC43IDMwLjIgMTA5LjMgNzAuMSAxMDcuNSAxMTkuOS0xLjYgNDQuNi0zMy42IDY1LjItOTYuMiA2OC42LTI3LjUgMS41LTU3LjYtLjktODcuMy01LjgtOC4zLTEuNC0xNS45LTIuOC0yMi42LTQuMy0zLjktLjgtNi42LTEuNS03LjgtMS44bC0zLjEtLjZjLTIuMi0uMy01LjktLjgtMTAuNy0xLjMtMjUtMi4zLTUyLjEtMS41LTc4LjUgNC42LTU1LjIgMTIuOS05My45IDQ3LjItMTAxLjEgMTA1LjgtMTUuNyAxMjYuMiA3OC42IDE4NC43IDI3NiAxODguOSAyOS4xIDcwLjQgMTA2LjQgMTA3LjkgMTc5LjYgODcgNzMuMy0yMC45IDExOS4zLTkzLjQgMTA2LjktMTY4LjZ6TTMyOS4xIDM0NS4yYTgzLjMgODMuMyAwIDExLjAxLTE2Ni42MSA4My4zIDgzLjMgMCAwMS0uMDEgMTY2LjYxek02OTUuNiA4NDVhODMuMyA4My4zIDAgMTEuMDEtMTY2LjYxQTgzLjMgODMuMyAwIDAxNjk1LjYgODQ1eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(NodeIndexOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'NodeIndexOutlined';
}
var _default = RefIcon;
