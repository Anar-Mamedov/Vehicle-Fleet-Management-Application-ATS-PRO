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
var _PieChartTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PieChartTwoTone"));
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
var PieChartTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PieChartTwoTone.default
    }));
};
/**![pie-chart](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMxNi4yIDkyMC41Yy00Ny42LTIwLjEtOTAuNC00OS0xMjcuMS04NS43YTM5OC4xOSAzOTguMTkgMCAwMS04NS43LTEyNy4xQTM5Ny4xMiAzOTcuMTIgMCAwMTcyIDU1Mi4ydi4yYTM5OC41NyAzOTguNTcgMCAwMDExNyAyODIuNWMzNi43IDM2LjcgNzkuNCA2NS41IDEyNyA4NS42QTM5Ni42NCAzOTYuNjQgMCAwMDQ3MS42IDk1MmMyNyAwIDUzLjYtMi43IDc5LjctNy45LTI1LjkgNS4yLTUyLjQgNy44LTc5LjMgNy44LTU0IC4xLTEwNi40LTEwLjUtMTU1LjgtMzEuNHpNNTYwIDQ3MmMtNC40IDAtOC0zLjYtOC04Vjc5LjljMC0xLjMuMy0yLjUuOS0zLjYtLjkgMS4zLTEuNSAyLjktMS41IDQuNnYzODMuN2MwIDQuNCAzLjYgOCA4IDhsMzgzLjYtMWMxLjYgMCAzLjEtLjUgNC40LTEuMy0xIC41LTIuMi43LTMuNC43bC0zODQgMXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTYxOS44IDE0Ny42djI1Ni42bDI1Ni40LS43Yy0xMy02Mi41LTQ0LjMtMTIwLjUtOTAtMTY2LjFhMzMyLjI0IDMzMi4yNCAwIDAwLTE2Ni40LTg5Ljh6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik00MzggMjIxLjdjLTc1LjkgNy42LTE0Ni4yIDQwLjktMjAwLjggOTUuNUMxNzQuNSAzNzkuOSAxNDAgNDYzLjMgMTQwIDU1MnMzNC41IDE3Mi4xIDk3LjIgMjM0LjhjNjIuMyA2Mi4zIDE0NS4xIDk2LjggMjMzLjIgOTcuMiA4OC4yLjQgMTcyLjctMzQuMSAyMzUuMy05Ni4yQzc2MSA3MzMgNzk0LjYgNjYyLjMgODAyLjMgNTg2SDQzOFYyMjEuN3oiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTg2NCA1MThINTA2VjE2MGMwLTQuNC0zLjYtOC04LThoLTI2YTM5OC40NiAzOTguNDYgMCAwMC0yODIuOCAxMTcuMSAzOTguMTkgMzk4LjE5IDAgMDAtODUuNyAxMjcuMUEzOTcuNjEgMzk3LjYxIDAgMDA3MiA1NTJ2LjJjMCA1My45IDEwLjYgMTA2LjIgMzEuNCAxNTUuNSAyMC4xIDQ3LjYgNDkgOTAuNCA4NS43IDEyNy4xIDM2LjcgMzYuNyA3OS41IDY1LjYgMTI3LjEgODUuN0EzOTcuNjEgMzk3LjYxIDAgMDA0NzIgOTUyYzI2LjkgMCA1My40LTIuNiA3OS4zLTcuOCAyNi4xLTUuMyA1MS43LTEzLjEgNzYuNC0yMy42IDQ3LjYtMjAuMSA5MC40LTQ5IDEyNy4xLTg1LjcgMzYuNy0zNi43IDY1LjYtNzkuNSA4NS43LTEyNy4xQTM5Ny42MSAzOTcuNjEgMCAwMDg3MiA1NTJ2LTI2YzAtNC40LTMuNi04LTgtOHpNNzA1LjcgNzg3LjhBMzMxLjU5IDMzMS41OSAwIDAxNDcwLjQgODg0Yy04OC4xLS40LTE3MC45LTM0LjktMjMzLjItOTcuMkMxNzQuNSA3MjQuMSAxNDAgNjQwLjcgMTQwIDU1MnMzNC41LTE3Mi4xIDk3LjItMjM0LjhjNTQuNi01NC42IDEyNC45LTg3LjkgMjAwLjgtOTUuNVY1ODZoMzY0LjNjLTcuNyA3Ni4zLTQxLjMgMTQ3LTk2LjYgMjAxLjh6IiBmaWxsPSIjMTY3N2ZmIiAvPjxwYXRoIGQ9Ik05NTIgNDYyLjRsLTIuNi0yOC4yYy04LjUtOTIuMS00OS40LTE3OS0xMTUuMi0yNDQuNkEzOTkuNCAzOTkuNCAwIDAwNTg5IDc0LjZMNTYwLjcgNzJjLTMuNC0uMy02LjQgMS41LTcuOCA0LjNhOC43IDguNyAwIDAwLS45IDMuNlY0NjRjMCA0LjQgMy42IDggOCA4bDM4NC0xYzEuMiAwIDIuMy0uMyAzLjQtLjdhOC4xIDguMSAwIDAwNC42LTcuOXptLTMzMi4yLTU4LjJWMTQ3LjZhMzMyLjI0IDMzMi4yNCAwIDAxMTY2LjQgODkuOGM0NS43IDQ1LjYgNzcgMTAzLjYgOTAgMTY2LjFsLTI1Ni40Ljd6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PieChartTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PieChartTwoTone';
}
var _default = RefIcon;
