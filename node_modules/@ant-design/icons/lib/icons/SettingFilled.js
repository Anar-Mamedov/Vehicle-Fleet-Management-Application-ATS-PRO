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
var _SettingFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SettingFilled"));
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
var SettingFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SettingFilled.default
    }));
};
/**![setting](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMi41IDM5MC42Yy0yOS45IDAtNTcuOSAxMS42LTc5LjEgMzIuOC0yMS4xIDIxLjItMzIuOCA0OS4yLTMyLjggNzkuMSAwIDI5LjkgMTEuNyA1Ny45IDMyLjggNzkuMSAyMS4yIDIxLjEgNDkuMiAzMi44IDc5LjEgMzIuOCAyOS45IDAgNTcuOS0xMS43IDc5LjEtMzIuOCAyMS4xLTIxLjIgMzIuOC00OS4yIDMyLjgtNzkuMSAwLTI5LjktMTEuNy01Ny45LTMyLjgtNzkuMWExMTAuOTYgMTEwLjk2IDAgMDAtNzkuMS0zMi44em00MTIuMyAyMzUuNWwtNjUuNC01NS45YzMuMS0xOSA0LjctMzguNCA0LjctNTcuN3MtMS42LTM4LjgtNC43LTU3LjdsNjUuNC01NS45YTMyLjAzIDMyLjAzIDAgMDA5LjMtMzUuMmwtLjktMi42YTQ0Mi41IDQ0Mi41IDAgMDAtNzkuNi0xMzcuN2wtMS44LTIuMWEzMi4xMiAzMi4xMiAwIDAwLTM1LjEtOS41bC04MS4yIDI4LjljLTMwLTI0LjYtNjMuNC00NC05OS42LTU3LjVsLTE1LjctODQuOWEzMi4wNSAzMi4wNSAwIDAwLTI1LjgtMjUuN2wtMi43LS41Yy01Mi05LjQtMTA2LjgtOS40LTE1OC44IDBsLTIuNy41YTMyLjA1IDMyLjA1IDAgMDAtMjUuOCAyNS43bC0xNS44IDg1LjNhMzUzLjQ0IDM1My40NCAwIDAwLTk4LjkgNTcuM2wtODEuOC0yOS4xYTMyIDMyIDAgMDAtMzUuMSA5LjVsLTEuOCAyLjFhNDQ1LjkzIDQ0NS45MyAwIDAwLTc5LjYgMTM3LjdsLS45IDIuNmMtNC41IDEyLjUtLjggMjYuNSA5LjMgMzUuMmw2Ni4yIDU2LjVjLTMuMSAxOC44LTQuNiAzOC00LjYgNTcgMCAxOS4yIDEuNSAzOC40IDQuNiA1N2wtNjYgNTYuNWEzMi4wMyAzMi4wMyAwIDAwLTkuMyAzNS4ybC45IDIuNmMxOC4xIDUwLjMgNDQuOCA5Ni44IDc5LjYgMTM3LjdsMS44IDIuMWEzMi4xMiAzMi4xMiAwIDAwMzUuMSA5LjVsODEuOC0yOS4xYzI5LjggMjQuNSA2MyA0My45IDk4LjkgNTcuM2wxNS44IDg1LjNhMzIuMDUgMzIuMDUgMCAwMDI1LjggMjUuN2wyLjcuNWE0NDguMjcgNDQ4LjI3IDAgMDAxNTguOCAwbDIuNy0uNWEzMi4wNSAzMi4wNSAwIDAwMjUuOC0yNS43bDE1LjctODQuOWMzNi4yLTEzLjYgNjkuNi0zMi45IDk5LjYtNTcuNWw4MS4yIDI4LjlhMzIgMzIgMCAwMDM1LjEtOS41bDEuOC0yLjFjMzQuOC00MS4xIDYxLjUtODcuNCA3OS42LTEzNy43bC45LTIuNmM0LjMtMTIuNC42LTI2LjMtOS41LTM1em0tNDEyLjMgNTIuMmMtOTcuMSAwLTE3NS44LTc4LjctMTc1LjgtMTc1LjhzNzguNy0xNzUuOCAxNzUuOC0xNzUuOCAxNzUuOCA3OC43IDE3NS44IDE3NS44LTc4LjcgMTc1LjgtMTc1LjggMTc1Ljh6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SettingFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SettingFilled';
}
var _default = RefIcon;
