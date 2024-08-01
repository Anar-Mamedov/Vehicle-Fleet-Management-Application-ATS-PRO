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
var _SmileOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SmileOutlined"));
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
var SmileOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SmileOutlined.default
    }));
};
/**![smile](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI4OCA0MjFhNDggNDggMCAxMDk2IDAgNDggNDggMCAxMC05NiAwem0zNTIgMGE0OCA0OCAwIDEwOTYgMCA0OCA0OCAwIDEwLTk2IDB6TTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0yNjMgNzExYy0zNC4yIDM0LjItNzQgNjEtMTE4LjMgNzkuOEM2MTEgODc0LjIgNTYyLjMgODg0IDUxMiA4ODRjLTUwLjMgMC05OS05LjgtMTQ0LjgtMjkuMkEzNzAuNCAzNzAuNCAwIDAxMjQ4LjkgNzc1Yy0zNC4yLTM0LjItNjEtNzQtNzkuOC0xMTguM0MxNDkuOCA2MTEgMTQwIDU2Mi4zIDE0MCA1MTJzOS44LTk5IDI5LjItMTQ0LjhBMzcwLjQgMzcwLjQgMCAwMTI0OSAyNDguOWMzNC4yLTM0LjIgNzQtNjEgMTE4LjMtNzkuOEM0MTMgMTQ5LjggNDYxLjcgMTQwIDUxMiAxNDBjNTAuMyAwIDk5IDkuOCAxNDQuOCAyOS4yQTM3MC40IDM3MC40IDAgMDE3NzUuMSAyNDljMzQuMiAzNC4yIDYxIDc0IDc5LjggMTE4LjNDODc0LjIgNDEzIDg4NCA0NjEuNyA4ODQgNTEycy05LjggOTktMjkuMiAxNDQuOEEzNjguODkgMzY4Ljg5IDAgMDE3NzUgNzc1ek02NjQgNTMzaC00OC4xYy00LjIgMC03LjggMy4yLTguMSA3LjRDNjA0IDU4OS45IDU2Mi41IDYyOSA1MTIgNjI5cy05Mi4xLTM5LjEtOTUuOC04OC42Yy0uMy00LjItMy45LTcuNC04LjEtNy40SDM2MGE4IDggMCAwMC04IDguNGM0LjQgODQuMyA3NC41IDE1MS42IDE2MCAxNTEuNnMxNTUuNi02Ny4zIDE2MC0xNTEuNmE4IDggMCAwMC04LTguNHoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SmileOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SmileOutlined';
}
var _default = RefIcon;
