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
var _WifiOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/WifiOutlined"));
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
var WifiOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _WifiOutlined.default
    }));
};
/**![wifi](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcyMyA2MjAuNUM2NjYuOCA1NzEuNiA1OTMuNCA1NDIgNTEzIDU0MnMtMTUzLjggMjkuNi0yMTAuMSA3OC42YTguMSA4LjEgMCAwMC0uOCAxMS4ybDM2IDQyLjljMi45IDMuNCA4IDMuOCAxMS40LjlDMzkzLjEgNjM3LjIgNDUwLjMgNjE0IDUxMyA2MTRzMTE5LjkgMjMuMiAxNjMuNSA2MS41YzMuNCAyLjkgOC41IDIuNSAxMS40LS45bDM2LTQyLjljMi44LTMuMyAyLjQtOC4zLS45LTExLjJ6bTExNy40LTE0MC4xQzc1MS43IDQwNi41IDYzNy42IDM2MiA1MTMgMzYycy0yMzguNyA0NC41LTMyNy41IDExOC40YTguMDUgOC4wNSAwIDAwLTEgMTEuM2wzNiA0Mi45YzIuOCAzLjQgNy45IDMuOCAxMS4yIDFDMzA4IDQ3Mi4yIDQwNi4xIDQzNCA1MTMgNDM0czIwNSAzOC4yIDI4MS4yIDEwMS42YzMuNCAyLjggOC40IDIuNCAxMS4yLTFsMzYtNDIuOWMyLjgtMy40IDIuNC04LjUtMS0xMS4zem0xMTYuNy0xMzlDODM1LjcgMjQxLjggNjgwLjMgMTgyIDUxMSAxODJjLTE2OC4yIDAtMzIyLjYgNTktNDQzLjcgMTU3LjRhOCA4IDAgMDAtMS4xIDExLjRsMzYgNDIuOWMyLjggMy4zIDcuOCAzLjggMTEuMSAxLjFDMjIyIDMwNi43IDM2MC4zIDI1NCA1MTEgMjU0YzE1MS44IDAgMjkxIDUzLjUgNDAwIDE0Mi43IDMuNCAyLjggOC40IDIuMyAxMS4yLTEuMWwzNi00Mi45YzIuOS0zLjQgMi40LTguNS0xLjEtMTEuM3pNNDQ4IDc3OGE2NCA2NCAwIDEwMTI4IDAgNjQgNjQgMCAxMC0xMjggMHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(WifiOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'WifiOutlined';
}
var _default = RefIcon;
