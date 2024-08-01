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
var _ReconciliationFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ReconciliationFilled"));
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
var ReconciliationFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ReconciliationFilled.default
    }));
};
/**![reconciliation](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY3NiA2MjNjLTE4LjggMC0zNCAxNS4yLTM0IDM0czE1LjIgMzQgMzQgMzQgMzQtMTUuMiAzNC0zNC0xNS4yLTM0LTM0LTM0em0yMDQtNDU1SDY2OGMwLTMwLjktMjUuMS01Ni01Ni01NmgtODBjLTMwLjkgMC01NiAyNS4xLTU2IDU2SDI2NGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2MjAwaC04OGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2NDQ4YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDMzNmMxNy43IDAgMzItMTQuMyAzMi0zMnYtMTZoMzY4YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjIwMGMwLTE3LjctMTQuMy0zMi0zMi0zMnpNNDQ4IDg0OEgxNzZWNjE2aDI3MnYyMzJ6bTAtMjk2SDE3NnYtODhoMjcydjg4em0yMC0yNzJ2LTQ4aDcydi01Nmg2NHY1Nmg3MnY0OEg0Njh6bTE4MCAxNjh2NTZjMCA0LjQtMy42IDgtOCA4aC00OGMtNC40IDAtOC0zLjYtOC04di01NmMwLTQuNCAzLjYtOCA4LThoNDhjNC40IDAgOCAzLjYgOCA4em0yOCAzMDFjLTUwLjggMC05Mi00MS4yLTkyLTkyczQxLjItOTIgOTItOTIgOTIgNDEuMiA5MiA5Mi00MS4yIDkyLTkyIDkyem05Mi0yNDVjMCA0LjQtMy42IDgtOCA4aC00OGMtNC40IDAtOC0zLjYtOC04di05NmMwLTQuNCAzLjYtOCA4LThoNDhjNC40IDAgOCAzLjYgOCA4djk2em0tOTIgNjFjLTUwLjggMC05MiA0MS4yLTkyIDkyczQxLjIgOTIgOTIgOTIgOTItNDEuMiA5Mi05Mi00MS4yLTkyLTkyLTkyem0wIDEyNmMtMTguOCAwLTM0LTE1LjItMzQtMzRzMTUuMi0zNCAzNC0zNCAzNCAxNS4yIDM0IDM0LTE1LjIgMzQtMzQgMzR6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ReconciliationFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ReconciliationFilled';
}
var _default = RefIcon;
