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
var _SignatureOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SignatureOutlined"));
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
var SignatureOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SignatureOutlined.default
    }));
};
/**![signature](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQ1LjcxIDc1MmMyIDAgNC0uMiA1Ljk4LS41TDMxOS45IDcyMmMxLjk5LS40IDMuODgtMS4zIDUuMjgtMi44bDQyMy45MS00MjMuODdhOS45MyA5LjkzIDAgMDAwLTE0LjA2TDU4Mi44OCAxMTQuOUM1ODEgMTEzIDU3OC41IDExMiA1NzUuODIgMTEycy01LjE4IDEtNy4wOCAyLjlMMTQ0LjgyIDUzOC43NmMtMS41IDEuNS0yLjQgMy4yOS0yLjggNS4yOGwtMjkuNSAxNjguMTdhMzMuNTkgMzMuNTkgMCAwMDkuMzcgMjkuODFjNi41OCA2LjQ4IDE0Ljk1IDkuOTcgMjMuODIgOS45N201MS43NS04NS40M2wxNS42NS04OC45MiAzNjIuNy0zNjIuNjcgNzMuMjggNzMuMjctMzYyLjcgMzYyLjY3em00MDEuMzctOTguNjRjMjcuNjktMTQuODEgNTcuMjktMjAuODUgODUuNTQtMTUuNTIgMzIuMzcgNi4xIDU5LjcyIDI2LjUzIDc4Ljk2IDU5LjQgMjkuOTcgNTEuMjIgMjEuNjQgMTAyLjM0LTE4LjQ4IDE0NC4yNi0xNy41OCAxOC4zNi00MS4wNyAzNS4wMS03MCA1MC4zbC0uMy4xNS44Ni4yNmExNDcuODggMTQ3Ljg4IDAgMDA0MS41NCA2LjJsMS4xNy4wMWM2MS4wNyAwIDEwMC45OC0yMi4xIDEyNS4yOC02Ny44N2EzNiAzNiAwIDAxNjMuNiAzMy43NkM4NjkuNyA4NDkuMSA4MDQuOSA4ODUgNzE4LjEyIDg4NWMtNDcuNjkgMC05MS45NC0xNS4wMy0xMjguMTktNDEuMzZsLTEuMDUtLjc4LTEuMzYuNDdjLTQ2LjE4IDE2LTk4Ljc0IDI5Ljk1LTE1NS4zNyA0MS45NGwtMi4yNC40N2ExOTMxLjEgMTkzMS4xIDAgMDEtMTM5LjE2IDIzLjk2IDM2IDM2IDAgMTEtOS41LTcxLjM4IDE4NjAuMSAxODYwLjEgMCAwMDEzMy44NC0yMy4wNGM0Mi44LTkgODMtMTkuMTMgMTE5LjM1LTMwLjM0bC4yNC0uMDgtLjQ0LS42OWMtMTYuNDYtMjYuNDUtMjUuODYtNTUuNDMtMjYuMTQtODMuMjR2LTEuM2MwLTQ5LjkgMzkuNTUtMTA0LjMyIDkwLjczLTEzMS43TTY3MSA2MjMuMTdjLTEwLjc0LTIuMDMtMjQuMS43LTM4LjIyIDguMjYtMjkuNTUgMTUuOC01Mi43IDQ3LjY0LTUyLjcgNjguMiAwIDE4LjIgOC45IDQwLjE0IDI0LjcxIDU5LjczbC4yNC4zIDEuMjItLjUyYzM5LjE3LTE2LjU4IDY4LjQ5LTM0LjI3IDg1LjkzLTUyLjE4bC42NC0uNjdjMTguNzQtMTkuNTcgMjEuMzktMzUuODQgOC4zNi01OC4xLTkuMDYtMTUuNDctMTkuMDMtMjIuOTItMzAuMTgtMjUuMDIiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SignatureOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SignatureOutlined';
}
var _default = RefIcon;
