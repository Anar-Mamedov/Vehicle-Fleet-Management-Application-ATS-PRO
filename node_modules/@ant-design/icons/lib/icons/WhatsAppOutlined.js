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
var _WhatsAppOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/WhatsAppOutlined"));
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
var WhatsAppOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _WhatsAppOutlined.default
    }));
};
/**![whats-app](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik03MTMuNSA1OTkuOWMtMTAuOS01LjYtNjUuMi0zMi4yLTc1LjMtMzUuOC0xMC4xLTMuOC0xNy41LTUuNi0yNC44IDUuNi03LjQgMTEuMS0yOC40IDM1LjgtMzUgNDMuMy02LjQgNy40LTEyLjkgOC4zLTIzLjggMi44LTY0LjgtMzIuNC0xMDcuMy01Ny44LTE1MC0xMzEuMS0xMS4zLTE5LjUgMTEuMy0xOC4xIDMyLjQtNjAuMiAzLjYtNy40IDEuOC0xMy43LTEtMTkuMy0yLjgtNS42LTI0LjgtNTkuOC0zNC04MS45LTguOS0yMS41LTE4LjEtMTguNS0yNC44LTE4LjktNi40LS40LTEzLjctLjQtMjEuMS0uNC03LjQgMC0xOS4zIDIuOC0yOS40IDEzLjctMTAuMSAxMS4xLTM4LjYgMzcuOC0zOC42IDkyczM5LjUgMTA2LjcgNDQuOSAxMTQuMWM1LjYgNy40IDc3LjcgMTE4LjYgMTg4LjQgMTY2LjUgNzAgMzAuMiA5Ny40IDMyLjggMTMyLjQgMjcuNiAyMS4zLTMuMiA2NS4yLTI2LjYgNzQuMy01Mi41IDkuMS0yNS44IDkuMS00Ny45IDYuNC01Mi41LTIuNy00LjktMTAuMS03LjctMjEtMTN6IiAvPjxwYXRoIGQ9Ik05MjUuMiAzMzguNGMtMjIuNi01My43LTU1LTEwMS45LTk2LjMtMTQzLjNhNDQ0LjM1IDQ0NC4zNSAwIDAwLTE0My4zLTk2LjNDNjMwLjYgNzUuNyA1NzIuMiA2NCA1MTIgNjRoLTJjLTYwLjYuMy0xMTkuMyAxMi4zLTE3NC41IDM1LjlhNDQ1LjM1IDQ0NS4zNSAwIDAwLTE0MiA5Ni41Yy00MC45IDQxLjMtNzMgODkuMy05NS4yIDE0Mi44LTIzIDU1LjQtMzQuNiAxMTQuMy0zNC4zIDE3NC45QTQ0OS40IDQ0OS40IDAgMDAxMTIgNzE0djE1MmE0NiA0NiAwIDAwNDYgNDZoMTUyLjFBNDQ5LjQgNDQ5LjQgMCAwMDUxMCA5NjBoMi4xYzU5LjkgMCAxMTgtMTEuNiAxNzIuNy0zNC4zYTQ0NC40OCA0NDQuNDggMCAwMDE0Mi44LTk1LjJjNDEuMy00MC45IDczLjgtODguNyA5Ni41LTE0MiAyMy42LTU1LjIgMzUuNi0xMTMuOSAzNS45LTE3NC41LjMtNjAuOS0xMS41LTEyMC0zNC44LTE3NS42em0tMTUxLjEgNDM4QzcwNCA4NDUuOCA2MTEgODg0IDUxMiA4ODRoLTEuN2MtNjAuMy0uMy0xMjAuMi0xNS4zLTE3My4xLTQzLjVsLTguNC00LjVIMTg4VjY5NS4ybC00LjUtOC40QzE1NS4zIDYzMy45IDE0MC4zIDU3NCAxNDAgNTEzLjdjLS40LTk5LjcgMzcuNy0xOTMuMyAxMDcuNi0yNjMuOCA2OS44LTcwLjUgMTYzLjEtMTA5LjUgMjYyLjgtMTA5LjloMS43YzUwIDAgOTguNSA5LjcgMTQ0LjIgMjguOSA0NC42IDE4LjcgODQuNiA0NS42IDExOSA4MCAzNC4zIDM0LjMgNjEuMyA3NC40IDgwIDExOSAxOS40IDQ2LjIgMjkuMSA5NS4yIDI4LjkgMTQ1LjgtLjYgOTkuNi0zOS43IDE5Mi45LTExMC4xIDI2Mi43eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(WhatsAppOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'WhatsAppOutlined';
}
var _default = RefIcon;
