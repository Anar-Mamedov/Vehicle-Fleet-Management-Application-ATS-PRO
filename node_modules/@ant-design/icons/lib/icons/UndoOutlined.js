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
var _UndoOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/UndoOutlined"));
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
var UndoOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _UndoOutlined.default
    }));
};
/**![undo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMS40IDEyNEMyOTAuNSAxMjQuMyAxMTIgMzAzIDExMiA1MjMuOWMwIDEyOCA2MC4yIDI0MiAxNTMuOCAzMTUuMmwtMzcuNSA0OGMtNC4xIDUuMy0uMyAxMyA2LjMgMTIuOWwxNjctLjhjNS4yIDAgOS00LjkgNy43LTkuOUwzNjkuOCA3MjdhOCA4IDAgMDAtMTQuMS0zTDMxNSA3NzYuMWMtMTAuMi04LTIwLTE2LjctMjkuMy0yNmEzMTguNjQgMzE4LjY0IDAgMDEtNjguNi0xMDEuN0MyMDAuNCA2MDkgMTkyIDU2Ny4xIDE5MiA1MjMuOXM4LjQtODUuMSAyNS4xLTEyNC41YzE2LjEtMzguMSAzOS4yLTcyLjMgNjguNi0xMDEuNyAyOS40LTI5LjQgNjMuNi01Mi41IDEwMS43LTY4LjZDNDI2LjkgMjEyLjQgNDY4LjggMjA0IDUxMiAyMDRzODUuMSA4LjQgMTI0LjUgMjUuMWMzOC4xIDE2LjEgNzIuMyAzOS4yIDEwMS43IDY4LjYgMjkuNCAyOS40IDUyLjUgNjMuNiA2OC42IDEwMS43IDE2LjcgMzkuNCAyNS4xIDgxLjMgMjUuMSAxMjQuNXMtOC40IDg1LjEtMjUuMSAxMjQuNWEzMTguNjQgMzE4LjY0IDAgMDEtNjguNiAxMDEuN2MtNy41IDcuNS0xNS4zIDE0LjUtMjMuNCAyMS4yYTcuOTMgNy45MyAwIDAwLTEuMiAxMS4xbDM5LjQgNTAuNWMyLjggMy41IDcuOSA0LjEgMTEuNCAxLjNDODU0LjUgNzYwLjggOTEyIDY0OS4xIDkxMiA1MjMuOWMwLTIyMS4xLTE3OS40LTQwMC4yLTQwMC42LTM5OS45eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(UndoOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'UndoOutlined';
}
var _default = RefIcon;
