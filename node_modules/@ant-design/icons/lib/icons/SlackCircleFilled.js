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
var _SlackCircleFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SlackCircleFilled"));
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
var SlackCircleFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SlackCircleFilled.default
    }));
};
/**![slack-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0ek0zNjEuNSA1ODAuMmMwIDI3LjgtMjIuNSA1MC40LTUwLjMgNTAuNGE1MC4zNSA1MC4zNSAwIDAxLTUwLjMtNTAuNGMwLTI3LjggMjIuNS01MC40IDUwLjMtNTAuNGg1MC4zdjUwLjR6bTEzNCAxMzQuNGMwIDI3LjgtMjIuNSA1MC40LTUwLjMgNTAuNC0yNy44IDAtNTAuMy0yMi42LTUwLjMtNTAuNFY1ODAuMmMwLTI3LjggMjIuNS01MC40IDUwLjMtNTAuNGE1MC4zNSA1MC4zNSAwIDAxNTAuMyA1MC40djEzNC40em0tNTAuMi0yMTguNGgtMTM0Yy0yNy44IDAtNTAuMy0yMi42LTUwLjMtNTAuNCAwLTI3LjggMjIuNS01MC40IDUwLjMtNTAuNGgxMzRjMjcuOCAwIDUwLjMgMjIuNiA1MC4zIDUwLjQtLjEgMjcuOS0yMi42IDUwLjQtNTAuMyA1MC40em0wLTEzNC40Yy0xMy4zIDAtMjYuMS01LjMtMzUuNi0xNC44UzM5NSAzMjQuOCAzOTUgMzExLjRjMC0yNy44IDIyLjUtNTAuNCA1MC4zLTUwLjQgMjcuOCAwIDUwLjMgMjIuNiA1MC4zIDUwLjR2NTAuNGgtNTAuM3ptODMuNy01MC40YzAtMjcuOCAyMi41LTUwLjQgNTAuMy01MC40IDI3LjggMCA1MC4zIDIyLjYgNTAuMyA1MC40djEzNC40YzAgMjcuOC0yMi41IDUwLjQtNTAuMyA1MC40LTI3LjggMC01MC4zLTIyLjYtNTAuMy01MC40VjMxMS40ek01NzkuMyA3NjVjLTI3LjggMC01MC4zLTIyLjYtNTAuMy01MC40di01MC40aDUwLjNjMjcuOCAwIDUwLjMgMjIuNiA1MC4zIDUwLjQgMCAyNy44LTIyLjUgNTAuNC01MC4zIDUwLjR6bTEzNC0xMzQuNGgtMTM0Yy0xMy4zIDAtMjYuMS01LjMtMzUuNi0xNC44UzUyOSA1OTMuNiA1MjkgNTgwLjJjMC0yNy44IDIyLjUtNTAuNCA1MC4zLTUwLjRoMTM0YzI3LjggMCA1MC4zIDIyLjYgNTAuMyA1MC40IDAgMjcuOC0yMi41IDUwLjQtNTAuMyA1MC40em0wLTEzNC40SDY2M3YtNTAuNGMwLTI3LjggMjIuNS01MC40IDUwLjMtNTAuNHM1MC4zIDIyLjYgNTAuMyA1MC40YzAgMjcuOC0yMi41IDUwLjQtNTAuMyA1MC40eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SlackCircleFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SlackCircleFilled';
}
var _default = RefIcon;
