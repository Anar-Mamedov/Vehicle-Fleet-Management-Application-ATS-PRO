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
var _MediumWorkmarkOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/MediumWorkmarkOutlined"));
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
var MediumWorkmarkOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _MediumWorkmarkOutlined.default
    }));
};
/**![medium-workmark](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxNy4yIDU5MC41NWMwIDMuNTUgMCA0LjM2IDIuNCA2LjU1bDEzLjQzIDEzLjI1di41N2gtNTkuNTd2LTI1LjQ3YTQxLjQ0IDQxLjQ0IDAgMDEtMzkuNSAyNy42NWMtMzAuNjEgMC01Mi44NC0yNC4yNS01Mi44NC02OC44NyAwLTQxLjggMjMuOTktNjkuNjkgNTcuNjUtNjkuNjlhMzUuMTUgMzUuMTUgMCAwMTM0LjYxIDIxLjY3di01Ni4xOWE2Ljk5IDYuOTkgMCAwMC0yLjcxLTYuNzlsLTEyLjgtMTIuNDV2LS41Nmw1OS4zMy03LjA0djE3Ny4zN3ptLTQzLjc0LTguMDl2LTgzLjgzYTIyLjIgMjIuMiAwIDAwLTE3Ljc0LTguNGMtMTQuNDggMC0yOC40NyAxMy4yNS0yOC40NyA1Mi42MiAwIDM2Ljg2IDEyLjA3IDQ5Ljg4IDI3LjEgNDkuODhhMjMuOTEgMjMuOTEgMCAwMDE5LjExLTEwLjI3em04My4yMyAyOC40NlY0OTcuNzRhNy42NSA3LjY1IDAgMDAtMi40LTYuNzlsLTEzLjE5LTEzLjc0di0uNTdoNTkuNTZ2MTE0LjhjMCAzLjU1IDAgNC4zNiAyLjQgNi41NGwxMy4xMiAxMi40NXYuNTdsLTU5LjQ5LS4wOHptLTIuMTYtMTc1LjY3YzAtMTMuNCAxMC43NC0yNC4yNSAyMy45OS0yNC4yNSAxMy4yNSAwIDIzLjk4IDEwLjg2IDIzLjk4IDI0LjI1IDAgMTMuNC0xMC43MyAyNC4yNS0yMy45OCAyNC4yNXMtMjMuOTktMTAuODUtMjMuOTktMjQuMjV6bTIwNi44MyAxNTUuMDZjMCAzLjU1IDAgNC42IDIuNCA2Ljc5bDEzLjQzIDEzLjI1di41N2gtNTkuODhWNTgxLjlhNDMuNCA0My40IDAgMDEtNDEuMDEgMzEuMmMtMjYuNTUgMC00MC43OC0xOS41Ni00MC43OC01Ni41OSAwLTE3Ljg2IDAtMzcuNDMuNTYtNTkuNDFhNi45MSA2LjkxIDAgMDAtMi40LTYuNTVMNjIwLjUgNDc3LjJ2LS41N2g1OS4wOXY3My44MWMwIDI0LjI1IDMuNTEgNDAuNDIgMTguNTQgNDAuNDJhMjMuOTYgMjMuOTYgMCAwMDE5LjM1LTEyLjJ2LTgwLjg1YTcuNjUgNy42NSAwIDAwLTIuNC02Ljc5bC0xMy4yNy0xMy44MnYtLjU3aDU5LjU2VjU5MC4zem0yMDIuNzYgMjAuNmMwLTQuMzYuOC01OS45Ny44LTcyLjc1IDAtMjQuMjUtMy43Ni00MC45OC0yMC42My00MC45OGEyNi43IDI2LjcgMCAwMC0yMS4xOSAxMS42NCA5OS42OCA5OS42OCAwIDAxMi40IDIzLjA0YzAgMTYuODEtLjU2IDM4LjIzLS44IDU5LjY2YTYuOTEgNi45MSAwIDAwMi40IDYuNTVsMTMuNDMgMTIuNDV2LjU2aC02MC4xMmMwLTQuMDQuOC01OS45OC44LTcyLjc2IDAtMjQuNjUtMy43Ni00MC45OC0yMC4zOS00MC45OC04LjIuMy0xNS42OCA0LjgtMTkuODMgMTEuOTZ2ODIuNDZjMCAzLjU2IDAgNC4zNyAyLjQgNi41NWwxMy4xMSAxMi40NXYuNTZoLTU5LjQ4VjQ5OC4xNWE3LjY1IDcuNjUgMCAwMC0yLjQtNi44bC0xMy4xOS0xNC4xNHYtLjU3SDg0MXYyOC43OGM1LjUzLTE5IDIzLjEzLTMxLjc2IDQyLjctMzAuOTYgMTkuODIgMCAzMy4yNiAxMS4xNiAzOC45MyAzMi4zNGE0Ni40MSA0Ni40MSAwIDAxNDQuNzctMzIuMzRjMjYuNTUgMCA0MS41OCAxOS44IDQxLjU4IDU3LjIzIDAgMTcuODctLjU2IDM4LjI0LS44IDU5LjY2YTYuNSA2LjUgMCAwMDIuNzIgNi41NWwxMy4xMSAxMi40NXYuNTdoLTU5Ljg4ek0yMTUuODcgNTkzLjNsMTcuNjYgMTcuMDV2LjU3aC04OS42MnYtLjU3bDE3Ljk5LTE3LjA1YTYuOTEgNi45MSAwIDAwMi40LTYuNTVWNDc3LjY5YzAtNC42IDAtMTAuODMuOC0xNi4xNkwxMDQuNjYgNjEzLjFoLS43MmwtNjIuNi0xMzkuNDVjLTEuMzctMy40Ny0xLjc3LTMuNzItMi42NS02LjA2djkxLjQzYTMyLjA4IDMyLjA4IDAgMDAyLjk2IDE3Ljg3bDI1LjE5IDMzLjQ2di41N0gwdi0uNTdsMjUuMTgtMzMuNTVhMzIuMTYgMzIuMTYgMCAwMDIuOTYtMTcuNzhWNDU3Ljk3QTE5LjcxIDE5LjcxIDAgMDAyNCA0NDQuMTVMNi4xNiA0MjAuNzh2LS41Nmg2My45Nmw1My41NiAxMTguMSA0Ny4xNy0xMTguMWg2Mi42di41NmwtMTcuNTggMTkuOGE2Ljk5IDYuOTkgMCAwMC0yLjcyIDYuOHYxMzkuMzdhNi41IDYuNSAwIDAwMi43MiA2LjU1em03MC4xMS01NC42NXYuNTZjMCAzNC42IDE3LjY3IDQ4LjUgMzguMzggNDguNWE0My41IDQzLjUgMCAwMDQwLjc3LTI0Ljk3aC41NmMtNy4yIDM0LjItMjguMTQgNTAuMzYtNTkuNDggNTAuMzYtMzMuODIgMC02NS43Mi0yMC42MS02NS43Mi02OC4zOSAwLTUwLjIgMzEuOTgtNzAuMjUgNjcuMzItNzAuMjUgMjguNDYgMCA1OC43NiAxMy41OCA1OC43NiA1Ny4yNHY2Ljk1aC04MC41OXptMC02Ljk1aDM5LjQydi03LjA0YzAtMzUuNTctNy4yOC00NS4wMy0xOC4yMy00NS4wMy0xMy4yNyAwLTIxLjM1IDE0LjE1LTIxLjM1IDUyLjA3aC4xNnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(MediumWorkmarkOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'MediumWorkmarkOutlined';
}
var _default = RefIcon;
