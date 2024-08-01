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
var _CloudServerOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CloudServerOutlined"));
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
var CloudServerOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CloudServerOutlined.default
    }));
};
/**![cloud-server](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcwNCA0NDZIMzIwYy00LjQgMC04IDMuNi04IDh2NDAyYzAgNC40IDMuNiA4IDggOGgzODRjNC40IDAgOC0zLjYgOC04VjQ1NGMwLTQuNC0zLjYtOC04LTh6bS0zMjggNjRoMjcydjExN0gzNzZWNTEwem0yNzIgMjkwSDM3NlY2ODNoMjcydjExN3oiIC8+PHBhdGggZD0iTTQyNCA3NDhhMzIgMzIgMCAxMDY0IDAgMzIgMzIgMCAxMC02NCAwem0wLTE3OGEzMiAzMiAwIDEwNjQgMCAzMiAzMiAwIDEwLTY0IDB6IiAvPjxwYXRoIGQ9Ik04MTEuNCAzNjguOUM3NjUuNiAyNDggNjQ4LjkgMTYyIDUxMi4yIDE2MlMyNTguOCAyNDcuOSAyMTMgMzY4LjhDMTI2LjkgMzkxLjUgNjMuNSA0NzAuMiA2NCA1NjMuNiA2NC42IDY2OCAxNDUuNiA3NTIuOSAyNDcuNiA3NjJjNC43LjQgOC43LTMuMyA4LjctOHYtNjAuNGMwLTQtMy03LjQtNy03LjktMjctMy40LTUyLjUtMTUuMi03Mi4xLTM0LjUtMjQtMjMuNS0zNy4yLTU1LjEtMzcuMi04OC42IDAtMjggOS4xLTU0LjQgMjYuMi03Ni40IDE2LjctMjEuNCA0MC4yLTM2LjkgNjYuMS00My43bDM3LjktMTAgMTMuOS0zNi43YzguNi0yMi44IDIwLjYtNDQuMiAzNS43LTYzLjUgMTQuOS0xOS4yIDMyLjYtMzYgNTIuNC01MCA0MS4xLTI4LjkgODkuNS00NC4yIDE0MC00NC4yczk4LjkgMTUuMyAxNDAgNDQuM2MxOS45IDE0IDM3LjUgMzAuOCA1Mi40IDUwIDE1LjEgMTkuMyAyNy4xIDQwLjcgMzUuNyA2My41bDEzLjggMzYuNiAzNy44IDEwYzU0LjIgMTQuNCA5Mi4xIDYzLjcgOTIuMSAxMjAgMCAzMy42LTEzLjIgNjUuMS0zNy4yIDg4LjYtMTkuNSAxOS4yLTQ0LjkgMzEuMS03MS45IDM0LjUtNCAuNS02LjkgMy45LTYuOSA3LjlWNzU0YzAgNC43IDQuMSA4LjQgOC44IDggMTAxLjctOS4yIDE4Mi41LTk0IDE4My4yLTE5OC4yLjYtOTMuNC02Mi43LTE3Mi4xLTE0OC42LTE5NC45eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CloudServerOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CloudServerOutlined';
}
var _default = RefIcon;
