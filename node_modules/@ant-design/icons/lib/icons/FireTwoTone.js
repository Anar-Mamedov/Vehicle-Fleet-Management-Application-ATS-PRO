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
var _FireTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FireTwoTone"));
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
var FireTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FireTwoTone.default
    }));
};
/**![fire](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTczNyA0MzguNmMtOS42IDE1LjUtMjEuMSAzMC43LTM0LjQgNDUuNmE3My4xIDczLjEgMCAwMS01MSAyNC40IDczLjM2IDczLjM2IDAgMDEtNTMuNC0xOC44IDc0LjAxIDc0LjAxIDAgMDEtMjQuNC01OS44YzMtNDcuNC0xMi40LTEwMy4xLTQ1LjgtMTY1LjctMTYuOS0zMS40LTM3LjEtNTguMi02MS4yLTgwLjRhMjQwIDI0MCAwIDAxLTEyLjEgNDYuNSAzNTQuMjYgMzU0LjI2IDAgMDEtNTguMiAxMDEgMzQ5LjYgMzQ5LjYgMCAwMS01OC42IDU2LjhjLTM0IDI2LjEtNjIgNjAtODAuOCA5Ny45YTI3NS45NiAyNzUuOTYgMCAwMC0yOS4xIDEyNGMwIDc0LjkgMjkuNSAxNDUuMyA4MyAxOTguNCA1My43IDUzLjIgMTI1IDgyLjQgMjAxIDgyLjRzMTQ3LjMtMjkuMiAyMDEtODIuNGM1My41LTUzIDgzLTEyMy41IDgzLTE5OC40IDAtMzkuMi04LjEtNzcuMy0yNC0xMTMuMS05LjMtMjEtMjEtNDAuNS0zNS01OC40eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNODM0LjEgNDY5LjJBMzQ3LjQ5IDM0Ny40OSAwIDAwNzUxLjIgMzU0bC0yOS4xLTI2LjdhOC4wOSA4LjA5IDAgMDAtMTMgMy4zbC0xMyAzNy4zYy04LjEgMjMuNC0yMyA0Ny4zLTQ0LjEgNzAuOC0xLjQgMS41LTMgMS45LTQuMSAyLTEuMS4xLTIuOC0uMS00LjMtMS41LTEuNC0xLjItMi4xLTMtMi00LjggMy43LTYwLjItMTQuMy0xMjguMS01My43LTIwMkM1NTUuMyAxNzEgNTEwIDEyMy4xIDQ1My40IDg5LjdsLTQxLjMtMjQuM2MtNS40LTMuMi0xMi4zIDEtMTIgNy4zbDIuMiA0OGMxLjUgMzIuOC0yLjMgNjEuOC0xMS4zIDg1LjktMTEgMjkuNS0yNi44IDU2LjktNDcgODEuNWEyOTUuNjQgMjk1LjY0IDAgMDEtNDcuNSA0Ni4xIDM1Mi42IDM1Mi42IDAgMDAtMTAwLjMgMTIxLjVBMzQ3Ljc1IDM0Ny43NSAwIDAwMTYwIDYxMGMwIDQ3LjIgOS4zIDkyLjkgMjcuNyAxMzZhMzQ5LjQgMzQ5LjQgMCAwMDc1LjUgMTEwLjljMzIuNCAzMiA3MCA1Ny4yIDExMS45IDc0LjdDNDE4LjUgOTQ5LjggNDY0LjUgOTU5IDUxMiA5NTlzOTMuNS05LjIgMTM2LjktMjcuM0EzNDguNiAzNDguNiAwIDAwNzYwLjggODU3YzMyLjQtMzIgNTcuOC02OS40IDc1LjUtMTEwLjlhMzQ0LjIgMzQ0LjIgMCAwMDI3LjctMTM2YzAtNDguOC0xMC05Ni4yLTI5LjktMTQwLjl6TTcxMyA4MDguNWMtNTMuNyA1My4yLTEyNSA4Mi40LTIwMSA4Mi40cy0xNDcuMy0yOS4yLTIwMS04Mi40Yy01My41LTUzLjEtODMtMTIzLjUtODMtMTk4LjQgMC00My41IDkuOC04NS4yIDI5LjEtMTI0IDE4LjgtMzcuOSA0Ni44LTcxLjggODAuOC05Ny45YTM0OS42IDM0OS42IDAgMDA1OC42LTU2LjhjMjUtMzAuNSA0NC42LTY0LjUgNTguMi0xMDFhMjQwIDI0MCAwIDAwMTIuMS00Ni41YzI0LjEgMjIuMiA0NC4zIDQ5IDYxLjIgODAuNCAzMy40IDYyLjYgNDguOCAxMTguMyA0NS44IDE2NS43YTc0LjAxIDc0LjAxIDAgMDAyNC40IDU5LjggNzMuMzYgNzMuMzYgMCAwMDUzLjQgMTguOGMxOS43LTEgMzcuOC05LjcgNTEtMjQuNCAxMy4zLTE0LjkgMjQuOC0zMC4xIDM0LjQtNDUuNiAxNCAxNy45IDI1LjcgMzcuNCAzNSA1OC40IDE1LjkgMzUuOCAyNCA3My45IDI0IDExMy4xIDAgNzQuOS0yOS41IDE0NS40LTgzIDE5OC40eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FireTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FireTwoTone';
}
var _default = RefIcon;
