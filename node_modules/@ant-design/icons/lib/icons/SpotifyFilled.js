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
var _SpotifyFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SpotifyFilled"));
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
var SpotifyFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SpotifyFilled.default
    }));
};
/**![spotify](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNzIxLjQyIDY5NS4xN2MwLTEyLjQ1LTUuODQtMjIuMzYtMTcuNS0yOS43NS03NS4wNi00NC43My0xNjEuOTgtNjcuMDktMjYwLjc1LTY3LjA5LTUxLjczIDAtMTA3LjUzIDYuNjEtMTY3LjQyIDE5Ljg0LTE2LjMzIDMuNS0yNC41IDEzLjYtMjQuNSAzMC4zMyAwIDcuNzggMi42MyAxNC40OSA3Ljg4IDIwLjEzIDUuMjUgNS42MyAxMi4xNSA4LjQ1IDIwLjcgOC40NSAxLjk1IDAgOS4xNC0xLjU1IDIxLjU5LTQuNjYgNTEuMzMtMTAuNSA5OC41OC0xNS43NSAxNDEuNzUtMTUuNzUgODcuODkgMCAxNjUuMDggMjAuMDIgMjMxLjU4IDYwLjA4IDcuMzkgNC4yOCAxMy44IDYuNDIgMTkuMjUgNi40MiA3LjM5IDAgMTMuOC0yLjYzIDE5LjI1LTcuODggNS40NC01LjI1IDguMTctMTEuOTYgOC4xNy0yMC4xMm01Ni0xMjUuNDJjMC0xNS41Ni02LjgtMjcuNDItMjAuNDItMzUuNTgtOTIuMTctNTQuODQtMTk4LjcyLTgyLjI1LTMxOS42Ny04Mi4yNS01OS41IDAtMTE4LjQxIDguMTYtMTc2Ljc1IDI0LjUtMTguNjYgNS4wNS0yOCAxNy41LTI4IDM3LjMzIDAgOS43MiAzLjQgMTcuOTkgMTAuMjEgMjQuOCA2LjggNi44IDE1LjA3IDEwLjIgMjQuOCAxMC4yIDIuNzIgMCA5LjkxLTEuNTYgMjEuNTgtNC42N2E1NTguMjcgNTU4LjI3IDAgMDExNDYuNDEtMTkuMjVjMTA4LjUgMCAyMDMuNCAyNC4xMSAyODQuNjcgNzIuMzQgOS4zMyA1LjA1IDE2LjcyIDcuNTggMjIuMTcgNy41OCA5LjcyIDAgMTcuOTgtMy40IDI0Ljc5LTEwLjIgNi44LTYuODEgMTAuMi0xNS4wOCAxMC4yLTI0LjhtNjMtMTQ0LjY3YzAtMTguMjctNy43Ny0zMS44OS0yMy4zMy00MC44My00OS0yOC4zOS0xMDUuOTctNDkuODgtMTcwLjkxLTY0LjQ2LTY0Ljk1LTE0LjU4LTEzMS42NC0yMS44Ny0yMDAuMDktMjEuODctNzkuMzMgMC0xNTAuMSA5LjE0LTIxMi4zMyAyNy40MWE0Ni4zIDQ2LjMgMCAwMC0yMi40NiAxNC44OGMtNi4wMyA3LjItOS4wNCAxNi42Mi05LjA0IDI4LjI5IDAgMTIuMDYgMy45OSAyMi4xNyAxMS45NiAzMC4zMyA3Ljk3IDguMTcgMTcuOTggMTIuMjUgMzAuMDQgMTIuMjUgNC4yOCAwIDEyLjA2LTEuNTUgMjMuMzMtNC42NiA1MS43My0xNC40IDExMS40Mi0yMS41OSAxNzkuMDktMjEuNTkgNjEuODMgMCAxMjIuMDEgNi42MSAxODAuNTQgMTkuODQgNTguNTMgMTMuMjIgMTA3LjgyIDMxLjcgMTQ3Ljg3IDU1LjQxIDguMTcgNC42NyAxNS45NSA3IDIzLjM0IDcgMTEuMjcgMCAyMS4xLTMuOTggMjkuNDYtMTEuOTYgOC4zNi03Ljk3IDEyLjU0LTE3Ljk4IDEyLjU0LTMwLjA0TTk2MCA1MTJjMCA4MS4yOC0yMC4wMyAxNTYuMjQtNjAuMDggMjI0Ljg4LTQwLjA2IDY4LjYzLTk0LjQgMTIyLjk4LTE2My4wNCAxNjMuMDRDNjY4LjI0IDkzOS45NyA1OTMuMjcgOTYwIDUxMiA5NjBzLTE1Ni4yNC0yMC4wMy0yMjQuODgtNjAuMDhjLTY4LjYzLTQwLjA2LTEyMi45OC05NC40LTE2My4wNC0xNjMuMDRDODQuMDMgNjY4LjI0IDY0IDU5My4yNyA2NCA1MTJzMjAuMDMtMTU2LjI0IDYwLjA4LTIyNC44OGM0MC4wNi02OC42MyA5NC40LTEyMi45OCAxNjMuMDUtMTYzLjA0QzM1NS43NSA4NC4wMyA0MzAuNzMgNjQgNTEyIDY0YzgxLjI4IDAgMTU2LjI0IDIwLjAzIDIyNC44OCA2MC4wOCA2OC42MyA0MC4wNiAxMjIuOTggOTQuNCAxNjMuMDQgMTYzLjA1QzkzOS45NyAzNTUuNzUgOTYwIDQzMC43MyA5NjAgNTEyIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SpotifyFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SpotifyFilled';
}
var _default = RefIcon;
