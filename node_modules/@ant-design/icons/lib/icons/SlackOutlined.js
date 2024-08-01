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
var _SlackOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SlackOutlined"));
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
var SlackOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SlackOutlined.default
    }));
};
/**![slack](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwOS40IDEyOGMtNDIuNCAwLTc2LjcgMzQuNC03Ni43IDc2LjggMCAyMC4zIDguMSAzOS45IDIyLjQgNTQuM2E3Ni43NCA3Ni43NCAwIDAwNTQuMyAyMi41aDc2Ljd2LTc2LjhjMC00Mi4zLTM0LjMtNzYuNy03Ni43LTc2Ljh6bTAgMjA0LjhIMjA0LjdjLTQyLjQgMC03Ni43IDM0LjQtNzYuNyA3Ni44czM0LjQgNzYuOCA3Ni43IDc2LjhoMjA0LjZjNDIuNCAwIDc2LjctMzQuNCA3Ni43LTc2LjguMS00Mi40LTM0LjMtNzYuOC03Ni42LTc2Ljh6TTYxNCA0ODYuNGM0Mi40IDAgNzYuOC0zNC40IDc2LjctNzYuOFYyMDQuOGMwLTQyLjQtMzQuMy03Ni44LTc2LjctNzYuOC00Mi40IDAtNzYuNyAzNC40LTc2LjcgNzYuOHYyMDQuOGMwIDQyLjUgMzQuMyA3Ni44IDc2LjcgNzYuOHptMjgxLjQtNzYuOGMwLTQyLjQtMzQuNC03Ni44LTc2LjctNzYuOFM3NDIgMzY3LjIgNzQyIDQwOS42djc2LjhoNzYuN2M0Mi4zIDAgNzYuNy0zNC40IDc2LjctNzYuOHptLTc2LjggMTI4SDYxNGMtNDIuNCAwLTc2LjcgMzQuNC03Ni43IDc2LjggMCAyMC4zIDguMSAzOS45IDIyLjQgNTQuM2E3Ni43NCA3Ni43NCAwIDAwNTQuMyAyMi41aDIwNC42YzQyLjQgMCA3Ni43LTM0LjQgNzYuNy03Ni44LjEtNDIuNC0zNC4zLTc2LjctNzYuNy03Ni44ek02MTQgNzQyLjRoLTc2Ljd2NzYuOGMwIDQyLjQgMzQuNCA3Ni44IDc2LjcgNzYuOCA0Mi40IDAgNzYuOC0zNC40IDc2LjctNzYuOC4xLTQyLjQtMzQuMy03Ni43LTc2LjctNzYuOHpNNDA5LjQgNTM3LjZjLTQyLjQgMC03Ni43IDM0LjQtNzYuNyA3Ni44djIwNC44YzAgNDIuNCAzNC40IDc2LjggNzYuNyA3Ni44IDQyLjQgMCA3Ni44LTM0LjQgNzYuNy03Ni44VjYxNC40YzAtMjAuMy04LjEtMzkuOS0yMi40LTU0LjNhNzYuOTIgNzYuOTIgMCAwMC01NC4zLTIyLjV6TTEyOCA2MTQuNGMwIDIwLjMgOC4xIDM5LjkgMjIuNCA1NC4zYTc2Ljc0IDc2Ljc0IDAgMDA1NC4zIDIyLjVjNDIuNCAwIDc2LjgtMzQuNCA3Ni43LTc2Ljh2LTc2LjhoLTc2LjdjLTQyLjMgMC03Ni43IDM0LjQtNzYuNyA3Ni44eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SlackOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SlackOutlined';
}
var _default = RefIcon;
