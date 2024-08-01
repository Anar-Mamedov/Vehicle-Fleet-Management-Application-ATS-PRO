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
var _TaobaoCircleFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TaobaoCircleFilled"));
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
var TaobaoCircleFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TaobaoCircleFilled.default
    }));
};
/**![taobao-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0ek0zMTUuNyAyOTEuNWMyNy4zIDAgNDkuNSAyMi4xIDQ5LjUgNDkuNHMtMjIuMSA0OS40LTQ5LjUgNDkuNGE0OS40IDQ5LjQgMCAxMTAtOTguOHpNMzY2LjkgNTc4Yy0xMy42IDQyLjMtMTAuMiAyNi43LTY0LjQgMTQ0LjVsLTc4LjUtNDlzODcuNy03OS44IDEwNS42LTExNi4yYzE5LjItMzguNC0yMS4xLTU4LjktMjEuMS01OC45bC02MC4yLTM3LjUgMzIuNy01MC4yYzQ1LjQgMzMuNyA0OC43IDM2LjYgNzkuMiA2Ny4yIDIzLjggMjMuOSAyMC43IDU2LjggNi43IDEwMC4xem00MjcuMiA1NWMtMTUuMyAxNDMuOC0yMDIuNCA5MC4zLTIwMi40IDkwLjNsMTAuMi00MS4xIDQzLjMgOS4zYzgwIDUgNzIuMy02NC45IDcyLjMtNjQuOVY0MjNjLjYtNzcuMy03Mi42LTg1LjQtMjA0LjItMzguM2wzMC42IDguM2MtMi41IDktMTIuNSAyMy4yLTI1LjIgMzguNmgxNzZ2MzUuNmgtOTkuMXY0NC41aDk4Ljd2MzUuN2gtOTguN1Y2MjJjMTQuOS00LjggMjguNi0xMS41IDQwLjUtMjAuNWwtOC43LTMyLjUgNDYuNS0xNC40IDM4LjggOTQuOS01Ny4zIDIzLjktMTAuMi0zNy44Yy0yNS42IDE5LjUtNzguOCA0OC0xNzEuOCA0NS40LTk5LjIgMi42LTczLjctMTEyLTczLjctMTEybDIuNS0xLjNINDcyYy0uNSAxNC43LTYuNiAzOC43IDEuNyA1MS44IDYuOCAxMC44IDI0LjIgMTIuNiAzNS4zIDEzLjEgMS4zLjEgMi42LjEgMy45LjF2LTg1LjNoLTEwMXYtMzUuN2gxMDF2LTQ0LjVINDg3Yy0yMi43IDI0LjEtNDMuNSA0NC4xLTQzLjUgNDQuMWwtMzAuNi0yNi43YzIxLjctMjIuOSA0My4zLTU5LjEgNTYuOC04My4yLTEwLjkgNC40LTIyIDkuMi0zMy42IDE0LjItMTEuMiAxNC4zLTI0LjIgMjktMzguNyA0My41LjUuOC01MC0yOC40LTUwLTI4LjQgNTIuMi00NC40IDgxLjQtMTM5LjkgODEuNC0xMzkuOWw3Mi41IDIwLjRzLTUuOSAxNC0xOC40IDM1LjZjMjkwLjMtODIuMyAzMDcuNCA1MC41IDMwNy40IDUwLjVzMTkuMSA5MS44IDMuOCAyMzUuN3oiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TaobaoCircleFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TaobaoCircleFilled';
}
var _default = RefIcon;
