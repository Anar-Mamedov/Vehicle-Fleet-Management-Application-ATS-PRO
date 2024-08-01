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
var _FireOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FireOutlined"));
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
var FireOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FireOutlined.default
    }));
};
/**![fire](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgzNC4xIDQ2OS4yQTM0Ny40OSAzNDcuNDkgMCAwMDc1MS4yIDM1NGwtMjkuMS0yNi43YTguMDkgOC4wOSAwIDAwLTEzIDMuM2wtMTMgMzcuM2MtOC4xIDIzLjQtMjMgNDcuMy00NC4xIDcwLjgtMS40IDEuNS0zIDEuOS00LjEgMi0xLjEuMS0yLjgtLjEtNC4zLTEuNS0xLjQtMS4yLTIuMS0zLTItNC44IDMuNy02MC4yLTE0LjMtMTI4LjEtNTMuNy0yMDJDNTU1LjMgMTcxIDUxMCAxMjMuMSA0NTMuNCA4OS43bC00MS4zLTI0LjNjLTUuNC0zLjItMTIuMyAxLTEyIDcuM2wyLjIgNDhjMS41IDMyLjgtMi4zIDYxLjgtMTEuMyA4NS45LTExIDI5LjUtMjYuOCA1Ni45LTQ3IDgxLjVhMjk1LjY0IDI5NS42NCAwIDAxLTQ3LjUgNDYuMSAzNTIuNiAzNTIuNiAwIDAwLTEwMC4zIDEyMS41QTM0Ny43NSAzNDcuNzUgMCAwMDE2MCA2MTBjMCA0Ny4yIDkuMyA5Mi45IDI3LjcgMTM2YTM0OS40IDM0OS40IDAgMDA3NS41IDExMC45YzMyLjQgMzIgNzAgNTcuMiAxMTEuOSA3NC43QzQxOC41IDk0OS44IDQ2NC41IDk1OSA1MTIgOTU5czkzLjUtOS4yIDEzNi45LTI3LjNBMzQ4LjYgMzQ4LjYgMCAwMDc2MC44IDg1N2MzMi40LTMyIDU3LjgtNjkuNCA3NS41LTExMC45YTM0NC4yIDM0NC4yIDAgMDAyNy43LTEzNmMwLTQ4LjgtMTAtOTYuMi0yOS45LTE0MC45ek03MTMgODA4LjVjLTUzLjcgNTMuMi0xMjUgODIuNC0yMDEgODIuNHMtMTQ3LjMtMjkuMi0yMDEtODIuNGMtNTMuNS01My4xLTgzLTEyMy41LTgzLTE5OC40IDAtNDMuNSA5LjgtODUuMiAyOS4xLTEyNCAxOC44LTM3LjkgNDYuOC03MS44IDgwLjgtOTcuOWEzNDkuNiAzNDkuNiAwIDAwNTguNi01Ni44YzI1LTMwLjUgNDQuNi02NC41IDU4LjItMTAxYTI0MCAyNDAgMCAwMDEyLjEtNDYuNWMyNC4xIDIyLjIgNDQuMyA0OSA2MS4yIDgwLjQgMzMuNCA2Mi42IDQ4LjggMTE4LjMgNDUuOCAxNjUuN2E3NC4wMSA3NC4wMSAwIDAwMjQuNCA1OS44IDczLjM2IDczLjM2IDAgMDA1My40IDE4LjhjMTkuNy0xIDM3LjgtOS43IDUxLTI0LjQgMTMuMy0xNC45IDI0LjgtMzAuMSAzNC40LTQ1LjYgMTQgMTcuOSAyNS43IDM3LjQgMzUgNTguNCAxNS45IDM1LjggMjQgNzMuOSAyNCAxMTMuMSAwIDc0LjktMjkuNSAxNDUuNC04MyAxOTguNHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FireOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FireOutlined';
}
var _default = RefIcon;
