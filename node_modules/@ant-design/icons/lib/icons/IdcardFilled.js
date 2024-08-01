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
var _IdcardFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/IdcardFilled"));
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
var IdcardFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _IdcardFilled.default
    }));
};
/**![idcard](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM3MyA0MTFjLTI4LjUgMC01MS43IDIzLjMtNTEuNyA1MnMyMy4yIDUyIDUxLjcgNTIgNTEuNy0yMy4zIDUxLjctNTItMjMuMi01Mi01MS43LTUyem01NTUtMjUxSDk2Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY2NDBjMCAxNy43IDE0LjMgMzIgMzIgMzJoODMyYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE5MmMwLTE3LjctMTQuMy0zMi0zMi0zMnpNNjA4IDQyMGMwLTQuNCAxLTggMi4zLThoMTIzLjRjMS4zIDAgMi4zIDMuNiAyLjMgOHY0OGMwIDQuNC0xIDgtMi4zIDhINjEwLjNjLTEuMyAwLTIuMy0zLjYtMi4zLTh2LTQ4em0tODYgMjUzaC00My45Yy00LjIgMC03LjYtMy4zLTcuOS03LjUtMy44LTUwLjUtNDYtOTAuNS05Ny4yLTkwLjVzLTkzLjQgNDAtOTcuMiA5MC41Yy0uMyA0LjItMy43IDcuNS03LjkgNy41SDIyNGE4IDggMCAwMS04LTguNGMyLjgtNTMuMyAzMi05OS43IDc0LjYtMTI2LjFhMTExLjggMTExLjggMCAwMS0yOS4xLTc1LjVjMC02MS45IDQ5LjktMTEyIDExMS40LTExMnMxMTEuNCA1MC4xIDExMS40IDExMmMwIDI5LjEtMTEgNTUuNS0yOS4xIDc1LjUgNDIuNyAyNi41IDcxLjggNzIuOCA3NC42IDEyNi4xLjQgNC42LTMuMiA4LjQtNy44IDguNHptMjc4LjktNTNINjE1LjFjLTMuOSAwLTcuMS0zLjYtNy4xLTh2LTQ4YzAtNC40IDMuMi04IDcuMS04aDE4NS43YzMuOSAwIDcuMSAzLjYgNy4xIDh2NDhoLjFjMCA0LjQtMy4yIDgtNy4xIDh6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(IdcardFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'IdcardFilled';
}
var _default = RefIcon;
