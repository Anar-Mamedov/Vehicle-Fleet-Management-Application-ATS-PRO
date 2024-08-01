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
var _MacCommandOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/MacCommandOutlined"));
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
var MacCommandOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _MacCommandOutlined.default
    }));
};
/**![mac-command](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik04ODAgMTEySDE0NGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2NzM2YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDczNmMxNy43IDAgMzItMTQuMyAzMi0zMlYxNDRjMC0xNy43LTE0LjMtMzItMzItMzJ6bS00MCA3MjhIMTg0VjE4NGg2NTZ2NjU2eiIgLz48cGF0aCBkPSJNMzcwLjggNTU0LjRjLTU0LjYgMC05OC44IDQ0LjItOTguOCA5OC44czQ0LjIgOTguOCA5OC44IDk4LjggOTguOC00NC4yIDk4LjgtOTguOHYtNDIuNGg4NC43djQyLjRjMCA1NC42IDQ0LjIgOTguOCA5OC44IDk4LjhzOTguOC00NC4yIDk4LjgtOTguOC00NC4yLTk4LjgtOTguOC05OC44aC00Mi40di04NC43aDQyLjRjNTQuNiAwIDk4LjgtNDQuMiA5OC44LTk4LjggMC01NC42LTQ0LjItOTguOC05OC44LTk4LjhzLTk4LjggNDQuMi05OC44IDk4Ljh2NDIuNGgtODQuN3YtNDIuNGMwLTU0LjYtNDQuMi05OC44LTk4LjgtOTguOFMyNzIgMzE2LjIgMjcyIDM3MC44czQ0LjIgOTguOCA5OC44IDk4LjhoNDIuNHY4NC43aC00Mi40em00Mi40IDk4LjhjMCAyMy40LTE5IDQyLjQtNDIuNCA0Mi40cy00Mi40LTE5LTQyLjQtNDIuNCAxOS00Mi40IDQyLjQtNDIuNGg0Mi40djQyLjR6bTE5Ny42LTI4Mi40YzAtMjMuNCAxOS00Mi40IDQyLjQtNDIuNHM0Mi40IDE5IDQyLjQgNDIuNC0xOSA0Mi40LTQyLjQgNDIuNGgtNDIuNHYtNDIuNHptMCAyNDBoNDIuNGMyMy40IDAgNDIuNCAxOSA0Mi40IDQyLjRzLTE5IDQyLjQtNDIuNCA0Mi40LTQyLjQtMTktNDIuNC00Mi40di00Mi40ek00NjkuNiA0NjkuNmg4NC43djg0LjdoLTg0Ljd2LTg0Ljd6bS05OC44LTU2LjRjLTIzLjQgMC00Mi40LTE5LTQyLjQtNDIuNHMxOS00Mi40IDQyLjQtNDIuNCA0Mi40IDE5IDQyLjQgNDIuNHY0Mi40aC00Mi40eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(MacCommandOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'MacCommandOutlined';
}
var _default = RefIcon;
