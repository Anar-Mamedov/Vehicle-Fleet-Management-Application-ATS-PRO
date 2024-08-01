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
var _RedEnvelopeOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/RedEnvelopeOutlined"));
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
var RedEnvelopeOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _RedEnvelopeOutlined.default
    }));
};
/**![red-envelope](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ0MC42IDQ2Mi42YTguMzggOC4zOCAwIDAwLTcuNS00LjZoLTQ4LjhjLTEuMyAwLTIuNi40LTMuOSAxYTguNCA4LjQgMCAwMC0zLjQgMTEuNGw4Ny40IDE2MS4xSDQxOWMtNC42IDAtOC40IDMuOC04LjQgOC40VjY2NWMwIDQuNiAzLjggOC40IDguNCA4LjRoNjNWNzAyaC02M2MtNC42IDAtOC40IDMuOC04LjQgOC40djI1LjFjMCA0LjYgMy44IDguNCA4LjQgOC40aDYzdjQ5LjljMCA0LjYgMy44IDguNCA4LjQgOC40aDQzLjdjNC42IDAgOC40LTMuOCA4LjQtOC40di00OS45aDYzLjNjNC43IDAgOC40LTMuOCA4LjItOC41di0yNWMwLTQuNi0zLjgtOC40LTguNC04LjRoLTYzLjN2LTI4LjZoNjMuM2M0LjYgMCA4LjQtMy44IDguNC04LjR2LTI1LjFjMC00LjYtMy44LTguNC04LjQtOC40aC00NS45bDg3LjItMTYxYTguNDUgOC40NSAwIDAwLTcuNC0xMi40aC00Ny44Yy0zLjEgMC02IDEuOC03LjUgNC42bC03MS45IDE0MS45LTcxLjctMTQyek04MzIgNjRIMTkyYy0xNy43IDAtMzIgMTQuMy0zMiAzMnY4MzJjMCAxNy43IDE0LjMgMzIgMzIgMzJoNjQwYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjk2YzAtMTcuNy0xNC4zLTMyLTMyLTMyem0tNDAgODI0SDIzMlYxOTMuMWwyNjAuMyAyMDQuMWMxMS42IDkuMSAyNy45IDkuMSAzOS41IDBMNzkyIDE5My4xVjg4OHptMC03NTEuM2gtMzEuN0w1MTIgMzMxLjMgMjYzLjcgMTM2LjdIMjMydi0uN2g1NjB2Ljd6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(RedEnvelopeOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'RedEnvelopeOutlined';
}
var _default = RefIcon;
