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
var _GitlabOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/GitlabOutlined"));
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
var GitlabOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _GitlabOutlined.default
    }));
};
/**![gitlab](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkxMy45IDU1Mi4yTDgwNSAxODEuNHYtLjFjLTcuNi0yMi45LTI1LjctMzYuNS00OC4zLTM2LjUtMjMuNCAwLTQyLjUgMTMuNS00OS43IDM1LjJsLTcxLjQgMjEzSDM4OC44bC03MS40LTIxM2MtNy4yLTIxLjctMjYuMy0zNS4yLTQ5LjctMzUuMi0yMy4xIDAtNDIuNSAxNC44LTQ4LjQgMzYuNkwxMTAuNSA1NTIuMmMtNC40IDE0LjcgMS4yIDMxLjQgMTMuNSA0MC43bDM2OC41IDI3Ni40YzIuNiAzLjYgNi4yIDYuMyAxMC40IDcuOGw4LjYgNi40IDguNS02LjRjNC45LTEuNyA5LTQuNyAxMS45LTguOWwzNjguNC0yNzUuNGMxMi40LTkuMiAxOC0yNS45IDEzLjYtNDAuNnpNNzUxLjcgMTkzLjRjMS0xLjggMi45LTEuOSAzLjUtMS45IDEuMSAwIDIuNS4zIDMuNCAzTDgxOCAzOTQuM0g2ODQuNWw2Ny4yLTIwMC45em0tNDg3LjQgMWMuOS0yLjYgMi4zLTIuOSAzLjQtMi45IDIuNyAwIDIuOS4xIDMuNCAxLjdsNjcuMyAyMDEuMkgyMDYuNWw1Ny44LTIwMHpNMTU4LjggNTU4LjdsMjguMi05Ny4zIDIwMi40IDI3MC4yLTIzMC42LTE3Mi45em03My45LTExNi40aDEyMi4xbDkwLjggMjg0LjMtMjEyLjktMjg0LjN6TTUxMi45IDc3Nkw0MDUuNyA0NDIuM0g2MjBMNTEyLjkgNzc2em0xNTcuOS0zMzMuN2gxMTkuNUw1ODAgNzIzLjFsOTAuOC0yODAuOHptLTQwLjcgMjkzLjlsMjA3LjMtMjc2LjcgMjkuNSA5OS4yLTIzNi44IDE3Ny41eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(GitlabOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'GitlabOutlined';
}
var _default = RefIcon;
