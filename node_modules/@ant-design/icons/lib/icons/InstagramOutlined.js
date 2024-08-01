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
var _InstagramOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/InstagramOutlined"));
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
var InstagramOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _InstagramOutlined.default
    }));
};
/**![instagram](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiAzMDYuOWMtMTEzLjUgMC0yMDUuMSA5MS42LTIwNS4xIDIwNS4xUzM5OC41IDcxNy4xIDUxMiA3MTcuMSA3MTcuMSA2MjUuNSA3MTcuMSA1MTIgNjI1LjUgMzA2LjkgNTEyIDMwNi45em0wIDMzOC40Yy03My40IDAtMTMzLjMtNTkuOS0xMzMuMy0xMzMuM1M0MzguNiAzNzguNyA1MTIgMzc4LjcgNjQ1LjMgNDM4LjYgNjQ1LjMgNTEyIDU4NS40IDY0NS4zIDUxMiA2NDUuM3ptMjEzLjUtMzk0LjZjLTI2LjUgMC00Ny45IDIxLjQtNDcuOSA0Ny45czIxLjQgNDcuOSA0Ny45IDQ3LjkgNDcuOS0yMS4zIDQ3LjktNDcuOWE0Ny44NCA0Ny44NCAwIDAwLTQ3LjktNDcuOXpNOTExLjggNTEyYzAtNTUuMi41LTEwOS45LTIuNi0xNjUtMy4xLTY0LTE3LjctMTIwLjgtNjQuNS0xNjcuNi00Ni45LTQ2LjktMTAzLjYtNjEuNC0xNjcuNi02NC41LTU1LjItMy4xLTEwOS45LTIuNi0xNjUtMi42LTU1LjIgMC0xMDkuOS0uNS0xNjUgMi42LTY0IDMuMS0xMjAuOCAxNy43LTE2Ny42IDY0LjVDMTMyLjYgMjI2LjMgMTE4LjEgMjgzIDExNSAzNDdjLTMuMSA1NS4yLTIuNiAxMDkuOS0yLjYgMTY1cy0uNSAxMDkuOSAyLjYgMTY1YzMuMSA2NCAxNy43IDEyMC44IDY0LjUgMTY3LjYgNDYuOSA0Ni45IDEwMy42IDYxLjQgMTY3LjYgNjQuNSA1NS4yIDMuMSAxMDkuOSAyLjYgMTY1IDIuNiA1NS4yIDAgMTA5LjkuNSAxNjUtMi42IDY0LTMuMSAxMjAuOC0xNy43IDE2Ny42LTY0LjUgNDYuOS00Ni45IDYxLjQtMTAzLjYgNjQuNS0xNjcuNiAzLjItNTUuMSAyLjYtMTA5LjggMi42LTE2NXptLTg4IDIzNS44Yy03LjMgMTguMi0xNi4xIDMxLjgtMzAuMiA0NS44LTE0LjEgMTQuMS0yNy42IDIyLjktNDUuOCAzMC4yQzY5NS4yIDg0NC43IDU3MC4zIDg0MCA1MTIgODQwYy01OC4zIDAtMTgzLjMgNC43LTIzNS45LTE2LjEtMTguMi03LjMtMzEuOC0xNi4xLTQ1LjgtMzAuMi0xNC4xLTE0LjEtMjIuOS0yNy42LTMwLjItNDUuOEMxNzkuMyA2OTUuMiAxODQgNTcwLjMgMTg0IDUxMmMwLTU4LjMtNC43LTE4My4zIDE2LjEtMjM1LjkgNy4zLTE4LjIgMTYuMS0zMS44IDMwLjItNDUuOHMyNy42LTIyLjkgNDUuOC0zMC4yQzMyOC43IDE3OS4zIDQ1My43IDE4NCA1MTIgMTg0czE4My4zLTQuNyAyMzUuOSAxNi4xYzE4LjIgNy4zIDMxLjggMTYuMSA0NS44IDMwLjIgMTQuMSAxNC4xIDIyLjkgMjcuNiAzMC4yIDQ1LjhDODQ0LjcgMzI4LjcgODQwIDQ1My43IDg0MCA1MTJjMCA1OC4zIDQuNyAxODMuMi0xNi4yIDIzNS44eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(InstagramOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'InstagramOutlined';
}
var _default = RefIcon;
