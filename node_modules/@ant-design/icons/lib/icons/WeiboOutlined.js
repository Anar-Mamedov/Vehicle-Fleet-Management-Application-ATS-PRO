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
var _WeiboOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/WeiboOutlined"));
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
var WeiboOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _WeiboOutlined.default
    }));
};
/**![weibo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ1Ny4zIDU0M2MtNjguMS0xNy43LTE0NSAxNi4yLTE3NC42IDc2LjItMzAuMSA2MS4yLTEgMTI5LjEgNjcuOCAxNTEuMyA3MS4yIDIzIDE1NS4yLTEyLjIgMTg0LjQtNzguMyAyOC43LTY0LjYtNy4yLTEzMS03Ny42LTE0OS4yem0tNTIgMTU2LjJjLTEzLjggMjIuMS00My41IDMxLjctNjUuOCAyMS42LTIyLTEwLTI4LjUtMzUuNy0xNC42LTU3LjIgMTMuNy0yMS40IDQyLjMtMzEgNjQuNC0yMS43IDIyLjQgOS41IDI5LjYgMzUgMTYgNTcuM3ptNDUuNS01OC41Yy01IDguNi0xNi4xIDEyLjctMjQuNyA5LjEtOC41LTMuNS0xMS4yLTEzLjEtNi40LTIxLjUgNS04LjQgMTUuNi0xMi40IDI0LjEtOS4xIDguNyAzLjIgMTEuOCAxMi45IDcgMjEuNXptMzM0LjUtMTk3LjJjMTUgNC44IDMxLTMuNCAzNS45LTE4LjMgMTEuOC0zNi42IDQuNC03OC40LTIzLjItMTA5YTExMS4zOSAxMTEuMzkgMCAwMC0xMDYtMzQuMyAyOC40NSAyOC40NSAwIDAwLTIxLjkgMzMuOCAyOC4zOSAyOC4zOSAwIDAwMzMuOCAyMS44YzE4LjQtMy45IDM4LjMgMS44IDUxLjkgMTYuN2E1NC4yIDU0LjIgMCAwMTExLjMgNTMuMyAyOC40NSAyOC40NSAwIDAwMTguMiAzNnptOTkuOC0yMDZjLTU2LjctNjIuOS0xNDAuNC04Ni45LTIxNy43LTcwLjVhMzIuOTggMzIuOTggMCAwMC0yNS40IDM5LjMgMzMuMTIgMzMuMTIgMCAwMDM5LjMgMjUuNWM1NS0xMS43IDExNC40IDUuNCAxNTQuOCA1MC4xIDQwLjMgNDQuNyA1MS4yIDEwNS43IDM0IDE1OS4xLTUuNiAxNy40IDMuOSAzNiAyMS4zIDQxLjcgMTcuNCA1LjYgMzYtMy45IDQxLjYtMjEuMnYtLjFjMjQuMS03NS40IDguOS0xNjEuMS00Ny45LTIyMy45ek03MjkgNDk5Yy0xMi4yLTMuNi0yMC41LTYuMS0xNC4xLTIyLjEgMTMuOC0zNC43IDE1LjItNjQuNy4zLTg2LTI4LTQwLjEtMTA0LjgtMzcuOS0xOTIuOC0xLjEgMCAwLTI3LjYgMTIuMS0yMC42LTkuOCAxMy41LTQzLjUgMTEuNS03OS45LTkuNi0xMDEtNDcuNy00Ny44LTE3NC42IDEuOC0yODMuNSAxMTAuNkMxMjcuMyA0NzEuMSA4MCA1NTcuNSA4MCA2MzIuMiA4MCA3NzUuMSAyNjMuMiA4NjIgNDQyLjUgODYyYzIzNSAwIDM5MS4zLTEzNi41IDM5MS4zLTI0NSAwLTY1LjUtNTUuMi0xMDIuNi0xMDQuOC0xMTh6TTQ0MyA4MTAuOGMtMTQzIDE0LjEtMjY2LjUtNTAuNS0yNzUuOC0xNDQuNS05LjMtOTMuOSA5OS4yLTE4MS41IDI0Mi4yLTE5NS42IDE0My0xNC4yIDI2Ni41IDUwLjUgMjc1LjggMTQ0LjRDNjk0LjQgNzA5IDU4NiA3OTYuNiA0NDMgODEwLjh6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(WeiboOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'WeiboOutlined';
}
var _default = RefIcon;
