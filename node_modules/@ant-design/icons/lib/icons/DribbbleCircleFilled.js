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
var _DribbbleCircleFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DribbbleCircleFilled"));
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
var DribbbleCircleFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DribbbleCircleFilled.default
    }));
};
/**![dribbble-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY3NS4xIDMyOC4zYTI0NS4yIDI0NS4yIDAgMDAtMjIwLjgtNTUuMWM2LjggOS4xIDUxLjUgNjkuOSA5MS44IDE0NCA4Ny41LTMyLjggMTI0LjUtODIuNiAxMjktODguOXpNNTU0IDU1Mi44Yy0xMzguNyA0OC4zLTE4OC42IDE0NC42LTE5MyAxNTMuNiA0MS43IDMyLjUgOTQuMSA1MS45IDE1MSA1MS45IDM0LjEgMCA2Ni42LTYuOSA5Ni4xLTE5LjUtMy43LTIxLjYtMTcuOS05Ni44LTUyLjUtMTg2LjZsLTEuNi42em00Ny43LTExLjljMzIuMiA4OC40IDQ1LjMgMTYwLjQgNDcuOCAxNzUuNCA1NS4yLTM3LjMgOTQuNS05Ni40IDEwNS40LTE2NC45LTguNC0yLjYtNzYuMS0yMi44LTE1My4yLTEwLjV6TTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDczNmMtMTU4LjggMC0yODgtMTI5LjItMjg4LTI4OHMxMjkuMi0yODggMjg4LTI4OCAyODggMTI5LjIgMjg4IDI4OC0xMjkuMiAyODgtMjg4IDI4OHptNTMuMS0zNDYuMmM1LjcgMTEuNyAxMS4yIDIzLjYgMTYuMyAzNS42IDEuOCA0LjIgMy42IDguNCA1LjMgMTIuNyA4MS44LTEwLjMgMTYzLjIgNi4yIDE3MS4zIDcuOS0uNS01OC4xLTIxLjMtMTExLjQtNTUuNS0xNTMuMy01LjMgNy4xLTQ2LjUgNjAtMTM3LjQgOTcuMXpNNDk4LjYgNDMyYy00MC44LTcyLjUtODQuNy0xMzMuNC05MS4yLTE0Mi4zLTY4LjggMzIuNS0xMjAuMyA5NS45LTEzNi4yIDE3Mi4yIDExIC4yIDExMi40LjcgMjI3LjQtMjkuOXptMzAuNiA4Mi41YzMuMi0xIDYuNC0yIDkuNy0yLjktNi4yLTE0LTEyLjktMjgtMTkuOS00MS43LTEyMi44IDM2LjgtMjQyLjEgMzUuMi0yNTIuOCAzNS0uMSAyLjUtLjEgNS0uMSA3LjUgMCA2My4yIDIzLjkgMTIwLjkgNjMuMiAxNjQuNSA1LjUtOS42IDczLTEyMS40IDE5OS45LTE2Mi40eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DribbbleCircleFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DribbbleCircleFilled';
}
var _default = RefIcon;
