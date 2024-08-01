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
var _TrophyOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TrophyOutlined"));
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
var TrophyOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TrophyOutlined.default
    }));
};
/**![trophy](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg2OCAxNjBoLTkydi00MGMwLTQuNC0zLjYtOC04LThIMjU2Yy00LjQgMC04IDMuNi04IDh2NDBoLTkyYTQ0IDQ0IDAgMDAtNDQgNDR2MTQ4YzAgODEuNyA2MCAxNDkuNiAxMzguMiAxNjJDMjY1LjcgNjMwLjIgMzU5IDcyMS43IDQ3NiA3MzQuNXYxMDUuMkgyODBjLTE3LjcgMC0zMiAxNC4zLTMyIDMyVjkwNGMwIDQuNCAzLjYgOCA4IDhoNTEyYzQuNCAwIDgtMy42IDgtOHYtMzIuM2MwLTE3LjctMTQuMy0zMi0zMi0zMkg1NDhWNzM0LjVDNjY1IDcyMS43IDc1OC4zIDYzMC4yIDc3My44IDUxNCA4NTIgNTAxLjYgOTEyIDQzMy43IDkxMiAzNTJWMjA0YTQ0IDQ0IDAgMDAtNDQtNDR6TTE4NCAzNTJWMjMyaDY0djIwNy42YTkxLjk5IDkxLjk5IDAgMDEtNjQtODcuNnptNTIwIDEyOGMwIDQ5LjEtMTkuMSA5NS40LTUzLjkgMTMwLjEtMzQuOCAzNC44LTgxIDUzLjktMTMwLjEgNTMuOWgtMTZjLTQ5LjEgMC05NS40LTE5LjEtMTMwLjEtNTMuOS0zNC44LTM0LjgtNTMuOS04MS01My45LTEzMC4xVjE4NGgzODR2Mjk2em0xMzYtMTI4YzAgNDEtMjYuOSA3NS44LTY0IDg3LjZWMjMyaDY0djEyMHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TrophyOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TrophyOutlined';
}
var _default = RefIcon;
