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
var _SkypeFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SkypeFilled"));
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
var SkypeFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SkypeFilled.default
    }));
};
/**![skype](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4My43IDU3OC42YzQuMS0yMi41IDYuMy00NS41IDYuMy02OC41IDAtNTEtMTAtMTAwLjUtMjkuNy0xNDctMTktNDUtNDYuMy04NS40LTgxLTEyMC4xYTM3NS43OSAzNzUuNzkgMCAwMC0xMjAuMS04MC45Yy00Ni42LTE5LjctOTYtMjkuNy0xNDctMjkuNy0yNCAwLTQ4LjEgMi4zLTcxLjUgNi44QTIyNS4xIDIyNS4xIDAgMDAzMzUuNiAxMTNjLTU5LjcgMC0xMTUuOSAyMy4zLTE1OC4xIDY1LjVBMjIyLjI1IDIyMi4yNSAwIDAwMTEyIDMzNi42YzAgMzggOS44IDc1LjQgMjguMSAxMDguNC0zLjcgMjEuNC01LjcgNDMuMy01LjcgNjUuMSAwIDUxIDEwIDEwMC41IDI5LjcgMTQ3IDE5IDQ1IDQ2LjIgODUuNCA4MC45IDEyMC4xIDM0LjcgMzQuNyA3NS4xIDYxLjkgMTIwLjEgODAuOSA0Ni42IDE5LjcgOTYgMjkuNyAxNDcgMjkuNyAyMi4yIDAgNDQuNC0yIDY2LjItNS45IDMzLjUgMTguOSA3MS4zIDI5IDExMCAyOSA1OS43IDAgMTE1LjktMjMuMiAxNTguMS02NS41IDQyLjMtNDIuMiA2NS41LTk4LjQgNjUuNS0xNTguMS4xLTM4LTkuNy03NS41LTI4LjItMTA4Ljd6bS0zNzAgMTYyLjljLTEzNC4yIDAtMTk0LjItNjYtMTk0LjItMTE1LjQgMC0yNS40IDE4LjctNDMuMSA0NC41LTQzLjEgNTcuNCAwIDQyLjYgODIuNSAxNDkuNyA4Mi41IDU0LjkgMCA4NS4yLTI5LjggODUuMi02MC4zIDAtMTguMy05LTM4LjctNDUuMi00Ny42bC0xMTkuNC0yOS44Yy05Ni4xLTI0LjEtMTEzLjYtNzYuMS0xMTMuNi0xMjQuOSAwLTEwMS40IDk1LjUtMTM5LjUgMTg1LjItMTM5LjUgODIuNiAwIDE4MCA0NS43IDE4MCAxMDYuNSAwIDI2LjEtMjIuNiA0MS4yLTQ4LjQgNDEuMi00OSAwLTQwLTY3LjgtMTM4LjctNjcuOC00OSAwLTc2LjEgMjIuMi03Ni4xIDUzLjlzMzguNyA0MS44IDcyLjMgNDkuNWw4OC40IDE5LjZjOTYuOCAyMS42IDEyMS4zIDc4LjEgMTIxLjMgMTMxLjMgMCA4Mi4zLTYzLjMgMTQzLjktMTkxIDE0My45eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SkypeFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SkypeFilled';
}
var _default = RefIcon;
