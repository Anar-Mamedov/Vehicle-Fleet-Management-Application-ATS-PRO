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
var _TrophyTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/TrophyTwoTone"));
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
var TrophyTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _TrophyTwoTone.default
    }));
};
/**![trophy](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMyMCA0ODBjMCA0OS4xIDE5LjEgOTUuMyA1My45IDEzMC4xIDM0LjcgMzQuOCA4MSA1My45IDEzMC4xIDUzLjloMTZjNDkuMSAwIDk1LjMtMTkuMSAxMzAuMS01My45IDM0LjgtMzQuNyA1My45LTgxIDUzLjktMTMwLjFWMTg0SDMyMHYyOTZ6TTE4NCAzNTJjMCA0MSAyNi45IDc1LjggNjQgODcuNi0zNy4xLTExLjktNjQtNDYuNy02NC04Ny42em0zNjQgMzgyLjVDNjY1IDcyMS44IDc1OC40IDYzMC4yIDc3My44IDUxNCA3NTguMyA2MzAuMiA2NjUgNzIxLjcgNTQ4IDczNC41ek0yNTAuMiA1MTRDMjY1LjYgNjMwLjIgMzU5IDcyMS44IDQ3NiA3MzQuNSAzNTkgNzIxLjcgMjY1LjcgNjMwLjIgMjUwLjIgNTE0eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNODY4IDE2MGgtOTJ2LTQwYzAtNC40LTMuNi04LTgtOEgyNTZjLTQuNCAwLTggMy42LTggOHY0MGgtOTJhNDQgNDQgMCAwMC00NCA0NHYxNDhjMCA4MS43IDYwIDE0OS42IDEzOC4yIDE2MkMyNjUuNyA2MzAuMiAzNTkgNzIxLjcgNDc2IDczNC41djEwNS4ySDI4MGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJWOTA0YzAgNC40IDMuNiA4IDggOGg1MTJjNC40IDAgOC0zLjYgOC04di0zMi4zYzAtMTcuNy0xNC4zLTMyLTMyLTMySDU0OFY3MzQuNUM2NjUgNzIxLjcgNzU4LjMgNjMwLjIgNzczLjggNTE0IDg1MiA1MDEuNiA5MTIgNDMzLjcgOTEyIDM1MlYyMDRhNDQgNDQgMCAwMC00NC00NHpNMjQ4IDQzOS42YTkxLjk5IDkxLjk5IDAgMDEtNjQtODcuNlYyMzJoNjR2MjA3LjZ6TTcwNCA0ODBjMCA0OS4xLTE5LjEgOTUuNC01My45IDEzMC4xLTM0LjggMzQuOC04MSA1My45LTEzMC4xIDUzLjloLTE2Yy00OS4xIDAtOTUuNC0xOS4xLTEzMC4xLTUzLjktMzQuOC0zNC44LTUzLjktODEtNTMuOS0xMzAuMVYxODRoMzg0djI5NnptMTM2LTEyOGMwIDQxLTI2LjkgNzUuOC02NCA4Ny42VjIzMmg2NHYxMjB6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(TrophyTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'TrophyTwoTone';
}
var _default = RefIcon;
