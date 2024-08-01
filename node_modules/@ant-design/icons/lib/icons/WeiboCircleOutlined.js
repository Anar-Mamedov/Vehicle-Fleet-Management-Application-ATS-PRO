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
var _WeiboCircleOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/WeiboCircleOutlined"));
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
var WeiboCircleOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _WeiboCircleOutlined.default
    }));
};
/**![weibo-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0tNDQuNCA2NzJDMzUzLjEgNzM2IDIzNiA2ODAuNCAyMzYgNTg4LjljMC00Ny44IDMwLjItMTAzLjEgODIuMy0xNTUuMyA2OS41LTY5LjYgMTUwLjYtMTAxLjQgMTgxLjEtNzAuOCAxMy41IDEzLjUgMTQuOCAzNi44IDYuMSA2NC42LTQuNSAxNCAxMy4xIDYuMyAxMy4xIDYuMyA1Ni4yLTIzLjYgMTA1LjItMjUgMTIzLjEuNyA5LjYgMTMuNyA4LjYgMzIuOC0uMiA1NS4xLTQuMSAxMC4yIDEuMyAxMS44IDkgMTQuMSAzMS43IDkuOCA2Ni45IDMzLjYgNjYuOSA3NS41LjIgNjkuNS05OS43IDE1Ni45LTI0OS44IDE1Ni45em0yMDcuMy0yOTAuOGEzNC45IDM0LjkgMCAwMC03LjItMzQuMSAzNC42OCAzNC42OCAwIDAwLTMzLjEtMTAuNyAxOC4yNCAxOC4yNCAwIDAxLTcuNi0zNS43YzI0LjEtNS4xIDUwLjEgMi4zIDY3LjcgMjEuOSAxNy43IDE5LjYgMjIuNCA0Ni4zIDE0LjkgNjkuOGExOC4xMyAxOC4xMyAwIDAxLTIyLjkgMTEuNyAxOC4xOCAxOC4xOCAwIDAxLTExLjgtMjIuOXptMTA2IDM0LjNzMCAuMSAwIDBhMjEuMSAyMS4xIDAgMDEtMjYuNiAxMy43IDIxLjE5IDIxLjE5IDAgMDEtMTMuNi0yNi43YzExLTM0LjIgNC03My4yLTIxLjctMTAxLjhhMTA0LjA0IDEwNC4wNCAwIDAwLTk4LjktMzIuMSAyMS4xNCAyMS4xNCAwIDAxLTI1LjEtMTYuMyAyMS4wNyAyMS4wNyAwIDAxMTYuMi0yNS4xYzQ5LjQtMTAuNSAxMDIuOCA0LjggMTM5LjEgNDUuMSAzNi4zIDQwLjIgNDYuMSA5NS4xIDMwLjYgMTQzLjJ6bS0zMzQuNSA2LjFjLTkxLjQgOS0xNjAuNyA2NS4xLTE1NC43IDEyNS4yIDUuOSA2MC4xIDg0LjggMTAxLjUgMTc2LjIgOTIuNSA5MS40LTkuMSAxNjAuNy02NS4xIDE1NC43LTEyNS4zLTUuOS02MC4xLTg0LjgtMTAxLjUtMTc2LjItOTIuNHptODAuMiAxNDEuN2MtMTguNyA0Mi4zLTcyLjMgNjQuOC0xMTcuOCA1MC4xLTQzLjktMTQuMi02Mi41LTU3LjctNDMuMy05Ni44IDE4LjktMzguNCA2OC02MC4xIDExMS41LTQ4LjggNDUgMTEuNyA2OCA1NC4yIDQ5LjYgOTUuNXptLTkzLTMyLjJjLTE0LjItNS45LTMyLjQuMi00MS4yIDEzLjktOC44IDEzLjgtNC43IDMwLjIgOS4zIDM2LjYgMTQuMyA2LjUgMzMuMi4zIDQyLTEzLjggOC44LTE0LjMgNC4yLTMwLjYtMTAuMS0zNi43em0zNC45LTE0LjVjLTUuNC0yLjItMTIuMi41LTE1LjQgNS44LTMuMSA1LjQtMS40IDExLjUgNC4xIDEzLjggNS41IDIuMyAxMi42LS4zIDE1LjgtNS44IDMtNS42IDEtMTEuOC00LjUtMTMuOHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(WeiboCircleOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'WeiboCircleOutlined';
}
var _default = RefIcon;
