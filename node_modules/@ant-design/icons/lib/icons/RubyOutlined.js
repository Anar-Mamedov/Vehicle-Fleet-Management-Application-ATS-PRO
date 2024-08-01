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
var _RubyOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/RubyOutlined"));
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
var RubyOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _RubyOutlined.default
    }));
};
/**![ruby](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTA5LjgxIDExMi4wMmMtLjczLjA1LTEuNDYuMTItMi4yLjIxaC00LjMybC0zLjQgMS43YTM2LjMzIDM2LjMzIDAgMDAtOC44OCA0LjRsLTE0NS45NiA3My4wMi0xNTMuNyAxNTMuNy03Mi42NSAxNDUuMjRhMzYuMzMgMzYuMzMgMCAwMC00LjkgOS44NmwtMS41NiAzLjEydjMuOThhMzYuMzMgMzYuMzMgMCAwMDAgOC4zdjI5OC4yM2w2Ljg4IDkuNWExOTguNyAxOTguNyAwIDAwMjAuNTggMjQuNDJjMzcuODYgMzcuODUgODcuNjYgNTcuMTYgMTQyLjYyIDYyLjAxYTM2LjM0IDM2LjM0IDAgMDAxMS41NyAxLjc3aDU3NS43NWMzLjE0LjU0IDYuMzQuNjYgOS41MS4zNmEzNi4zNCAzNi4zNCAwIDAwMi41Ni0uMzVoMjkuOHYtMjkuOTVhMzYuMzMgMzYuMzMgMCAwMDAtMTEuOTJWMjkzLjg4YTM2LjMzIDM2LjMzIDAgMDAtMS43OC0xMS41N2MtNC44NC01NC45NS0yNC4xNi0xMDQuNzUtNjIuMDEtMTQyLjYyaC0uMDd2LS4wN2EyMDMuOTIgMjAzLjkyIDAgMDAtMjQuMjctMjAuNDNsLTkuNTgtNi45Nkg1MTUuMTRhMzYuMzQgMzYuMzQgMCAwMC01LjMyLS4yMU02NDMgMTg0Ljg5aDE0NS45NmMyLjQ3IDIuMDggNS4yNSA0LjA2IDcuNDUgNi4yNSAyNi41OSAyNi42MyA0MC45NyA2NC43NCA0Mi4zIDExMS4xOHpNNTEwLjMxIDE5MGw2NS43MSAzOS4zOC0yNS40NyAxNTYuMS02NC4zNiA2NC4zNi0xMDAuNyAxMDAuNjlMMjI5LjQgNTc2bC0zOS4zOC02NS43IDYxLjEtMTIyLjI2IDEzNi45NC0xMzYuOTV6bTEzMi43NiA3OS42MWwxMjMuMTkgNzMuOTQtMTM4LjA5IDE3LjI0ek04MjEuOSA0MDkuODJjLTIxLjIxIDY4LjI1LTYyLjY2IDE0Mi41OC0xMjIuNCAyMTEuODhsLTY1Ljg1LTE4OC40em0tMjUyLjU0IDU5LjZsNTMuNjQgMTUzLjU2LTE1My41NS01My42NSA2OC4xMi02OC4xMnptMjY5LjUgODEuMDR2MjM3TDczOC40NCA2ODcuMDRjNDAuMS00My43NCA3My43My04OS44MyAxMDAuNC0xMzYuNTltLTQ3OC4wNCA3Ny43bC0xNy4yNCAxMzguMDgtNzMuOTQtMTIzLjE4em03Mi41MiA1LjQ2bDE4OC4zMiA2NS44NWMtNjkuMjggNTkuNzEtMTQzLjU3IDEwMS4yLTIxMS44IDEyMi40ek0xODQuOSA2NDNsMTE3LjQzIDE5NS43Yy00Ni41LTEuMzMtODQuNjMtMTUuNzQtMTExLjI2LTQyLjM3LTIuMTYtMi4xNi00LjExLTQuOTMtNi4xNy03LjM4em01MDIuMTcgOTUuNDNsMTAwLjQgMTAwLjRoLTIzN2M0Ni43Ny0yNi42NyA5Mi44Ni02MC4zIDEzNi42LTEwMC40IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(RubyOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'RubyOutlined';
}
var _default = RefIcon;
