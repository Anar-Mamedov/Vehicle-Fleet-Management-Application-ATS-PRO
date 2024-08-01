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
var _InsuranceFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/InsuranceFilled"));
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
var InsuranceFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _InsuranceFilled.default
    }));
};
/**![insurance](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxOS45IDM1OC44aDk3Ljl2NDEuNmgtOTcuOXptMzQ3LTE4OC45TDUyNy4xIDU0LjFDNTIzIDUyLjcgNTE3LjUgNTIgNTEyIDUycy0xMSAuNy0xNS4xIDIuMUwxNTcuMSAxNjkuOWMtOC4zIDIuOC0xNS4xIDEyLjQtMTUuMSAyMS4ydjQ4Mi40YzAgOC44IDUuNyAyMC40IDEyLjYgMjUuOUw0OTkuMyA5NjhjMy41IDIuNyA4IDQuMSAxMi42IDQuMXM5LjItMS40IDEyLjYtNC4xbDM0NC43LTI2OC42YzYuOS01LjQgMTIuNi0xNyAxMi42LTI1LjlWMTkxLjFjLjItOC44LTYuNi0xOC4zLTE0LjktMjEuMnpNNDExLjMgNjU2aC0uMmMwIDQuNC0zLjYgOC04IDhoLTM3LjNjLTQuNCAwLTgtMy42LTgtOFY0NzEuNGMtNy43IDkuMi0xNS40IDE3LjktMjMuMSAyNmE2LjA0IDYuMDQgMCAwMS0xMC4yLTIuNGwtMTMuMi00My41Yy0uNi0yLS4yLTQuMSAxLjItNS42IDM3LTQzLjQgNjQuNy05NS4xIDgyLjItMTUzLjYgMS4xLTMuNSA1LTUuMyA4LjQtMy43bDM4LjYgMTguM2MyLjcgMS4zIDQuMSA0LjQgMy4yIDcuMmE0MjkuMiA0MjkuMiAwIDAxLTMzLjYgNzlWNjU2em0yOTYuNS00OS4ybC0yNi4zIDM1LjNhNS45MiA1LjkyIDAgMDEtOC45LjdjLTMwLjYtMjkuMy01Ni44LTY1LjItNzguMS0xMDYuOVY2NTZjMCA0LjQtMy42IDgtOCA4aC0zNi4yYy00LjQgMC04LTMuNi04LThWNTM2Yy0yMiA0NC43LTQ5IDgwLjgtODAuNiAxMDcuNmE1LjkgNS45IDAgMDEtOC45LTEuNEw0MzAgNjA1LjdhNiA2IDAgMDExLjYtOC4xYzI4LjYtMjAuMyA1MS45LTQ1LjIgNzEtNzZoLTU1LjFjLTQuNCAwLTgtMy42LTgtOFY0NzhjMC00LjQgMy42LTggOC04aDk0Ljl2LTE4LjZoLTY1LjljLTQuNCAwLTgtMy42LTgtOFYzMTZjMC00LjQgMy42LTggOC04aDE4NC43YzQuNCAwIDggMy42IDggOHYxMjcuMmMwIDQuNC0zLjYgOC04IDhoLTY2Ljd2MTguNmg5OC44YzQuNCAwIDggMy42IDggOHYzNS42YzAgNC40LTMuNiA4LTggOGgtNTljMTguMSAyOS4xIDQxLjggNTQuMyA3Mi4zIDc2LjkgMi42IDIuMSAzLjIgNS45IDEuMiA4LjV6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(InsuranceFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'InsuranceFilled';
}
var _default = RefIcon;
