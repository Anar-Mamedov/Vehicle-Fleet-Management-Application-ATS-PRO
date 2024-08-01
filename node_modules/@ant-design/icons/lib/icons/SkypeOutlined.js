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
var _SkypeOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SkypeOutlined"));
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
var SkypeOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SkypeOutlined.default
    }));
};
/**![skype](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4My43IDU3OC42YzQuMS0yMi41IDYuMy00NS41IDYuMy02OC41IDAtNTEtMTAtMTAwLjUtMjkuNy0xNDctMTktNDUtNDYuMy04NS40LTgxLTEyMC4xYTM3NS43OSAzNzUuNzkgMCAwMC0xMjAuMS04MC45Yy00Ni42LTE5LjctOTYtMjkuNy0xNDctMjkuNy0yNCAwLTQ4LjEgMi4zLTcxLjUgNi44QTIyNS4xIDIyNS4xIDAgMDAzMzUuNiAxMTNjLTU5LjcgMC0xMTUuOSAyMy4zLTE1OC4xIDY1LjVBMjIyLjI1IDIyMi4yNSAwIDAwMTEyIDMzNi42YzAgMzggOS44IDc1LjQgMjguMSAxMDguNC0zLjcgMjEuNC01LjcgNDMuMy01LjcgNjUuMSAwIDUxIDEwIDEwMC41IDI5LjcgMTQ3IDE5IDQ1IDQ2LjIgODUuNCA4MC45IDEyMC4xIDM0LjcgMzQuNyA3NS4xIDYxLjkgMTIwLjEgODAuOSA0Ni42IDE5LjcgOTYgMjkuNyAxNDcgMjkuNyAyMi4yIDAgNDQuNC0yIDY2LjItNS45IDMzLjUgMTguOSA3MS4zIDI5IDExMCAyOSA1OS43IDAgMTE1LjktMjMuMiAxNTguMS02NS41IDQyLjMtNDIuMiA2NS41LTk4LjQgNjUuNS0xNTguMS4xLTM4LTkuNy03NS41LTI4LjItMTA4Ljd6bS04OC4xIDIxNkM3NjYuOSA4MjMuNCA3MjkgODM5IDY4OC40IDgzOWMtMjYuMSAwLTUxLjgtNi44LTc0LjYtMTkuN2wtMjIuNS0xMi43LTI1LjUgNC41Yy0xNy44IDMuMi0zNS44IDQuOC01My42IDQuOC00MS40IDAtODEuMy04LjEtMTE5LjEtMjQuMS0zNi4zLTE1LjMtNjktMzcuMy05Ny4yLTY1LjVhMzA0LjI5IDMwNC4yOSAwIDAxLTY1LjUtOTcuMWMtMTYtMzcuNy0yNC03Ny42LTI0LTExOSAwLTE3LjQgMS42LTM1LjIgNC42LTUyLjhsNC40LTI1LjFMMjAzIDQxMGExNTEuMDIgMTUxLjAyIDAgMDEtMTkuMS03My40YzAtNDAuNiAxNS43LTc4LjUgNDQuNC0xMDcuMkMyNTcuMSAyMDAuNyAyOTUgMTg1IDMzNS42IDE4NWExNTMgMTUzIDAgMDE3MS40IDE3LjlsMjIuNCAxMS44IDI0LjgtNC44YzE4LjktMy42IDM4LjQtNS41IDU4LTUuNSA0MS40IDAgODEuMyA4LjEgMTE5IDI0IDM2LjUgMTUuNCA2OS4xIDM3LjQgOTcuMiA2NS41IDI4LjIgMjguMSA1MC4yIDYwLjggNjUuNiA5Ny4yIDE2IDM3LjcgMjQgNzcuNiAyNCAxMTkgMCAxOC40LTEuNyAzNy01LjEgNTUuNWwtNC43IDI1LjUgMTIuNiAyMi42YzEyLjYgMjIuNSAxOS4yIDQ4IDE5LjIgNzMuNyAwIDQwLjctMTUuNyA3OC41LTQ0LjQgMTA3LjJ6TTU4My40IDQ2Ni4yTDQ5NSA0NDYuNmMtMzMuNi03LjctNzIuMy0xNy44LTcyLjMtNDkuNXMyNy4xLTUzLjkgNzYuMS01My45Yzk4LjcgMCA4OS43IDY3LjggMTM4LjcgNjcuOCAyNS44IDAgNDguNC0xNS4yIDQ4LjQtNDEuMiAwLTYwLjgtOTcuNC0xMDYuNS0xODAtMTA2LjUtODkuNyAwLTE4NS4yIDM4LjEtMTg1LjIgMTM5LjUgMCA0OC44IDE3LjQgMTAwLjggMTEzLjYgMTI0LjlsMTE5LjQgMjkuOGMzNi4xIDguOSA0NS4yIDI5LjIgNDUuMiA0Ny42IDAgMzAuNS0zMC4zIDYwLjMtODUuMiA2MC4zLTEwNy4yIDAtOTIuMy04Mi41LTE0OS43LTgyLjUtMjUuOCAwLTQ0LjUgMTcuOC00NC41IDQzLjEgMCA0OS40IDYwIDExNS40IDE5NC4yIDExNS40IDEyNy43IDAgMTkxLTYxLjUgMTkxLTE0NCAwLTUzLjEtMjQuNS0xMDkuNi0xMjEuMy0xMzEuMnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SkypeOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SkypeOutlined';
}
var _default = RefIcon;
