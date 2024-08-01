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
var _CodepenOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CodepenOutlined"));
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
var CodepenOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CodepenOutlined.default
    }));
};
/**![codepen](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkxMS43IDM4NS4zbC0uMy0xLjVjLS4yLTEtLjMtMS45LS42LTIuOS0uMi0uNi0uNC0xLjEtLjUtMS43LS4zLS44LS41LTEuNy0uOS0yLjUtLjItLjYtLjUtMS4xLS44LTEuNy0uNC0uOC0uOC0xLjUtMS4yLTIuMy0uMy0uNS0uNi0xLjEtMS0xLjYtLjgtMS4yLTEuNy0yLjQtMi42LTMuNi0uNS0uNi0xLjEtMS4zLTEuNy0xLjktLjQtLjUtLjktLjktMS40LTEuMy0uNi0uNi0xLjMtMS4xLTEuOS0xLjYtLjUtLjQtMS0uOC0xLjYtMS4yLS4yLS4xLS40LS4zLS42LS40TDUzMS4xIDExNy44YTM0LjMgMzQuMyAwIDAwLTM4LjEgMEwxMjcuMyAzNjEuM2MtLjIuMS0uNC4zLS42LjQtLjUuNC0xIC44LTEuNiAxLjItLjcuNS0xLjMgMS4xLTEuOSAxLjYtLjUuNC0uOS45LTEuNCAxLjMtLjYuNi0xLjIgMS4yLTEuNyAxLjktMSAxLjEtMS44IDIuMy0yLjYgMy42LS4zLjUtLjcgMS0xIDEuNi0uNC43LS44IDEuNS0xLjIgMi4zLS4zLjUtLjUgMS4xLS44IDEuNy0uMy44LS42IDEuNy0uOSAyLjUtLjIuNi0uNCAxLjEtLjUgMS43LS4yLjktLjQgMS45LS42IDIuOWwtLjMgMS41Yy0uMiAxLjUtLjMgMy0uMyA0LjV2MjQzLjVjMCAxLjUuMSAzIC4zIDQuNWwuMyAxLjUuNiAyLjljLjIuNi4zIDEuMS41IDEuNy4zLjkuNiAxLjcuOSAyLjUuMi42LjUgMS4xLjggMS43LjQuOC43IDEuNSAxLjIgMi4zLjMuNS42IDEuMSAxIDEuNi41LjcuOSAxLjQgMS41IDIuMWwxLjIgMS41Yy41LjYgMS4xIDEuMyAxLjcgMS45LjQuNS45LjkgMS40IDEuMy42LjYgMS4zIDEuMSAxLjkgMS42LjUuNCAxIC44IDEuNiAxLjIuMi4xLjQuMy42LjRMNDkzIDkwNS43YzUuNiAzLjggMTIuMyA1LjggMTkuMSA1LjggNi42IDAgMTMuMy0xLjkgMTkuMS01LjhsMzY1LjYtMjQzLjVjLjItLjEuNC0uMy42LS40LjUtLjQgMS0uOCAxLjYtMS4yLjctLjUgMS4zLTEuMSAxLjktMS42LjUtLjQuOS0uOSAxLjQtMS4zLjYtLjYgMS4yLTEuMiAxLjctMS45bDEuMi0xLjUgMS41LTIuMWMuMy0uNS43LTEgMS0xLjYuNC0uOC44LTEuNSAxLjItMi4zLjMtLjUuNS0xLjEuOC0xLjcuMy0uOC42LTEuNy45LTIuNS4yLS41LjQtMS4xLjUtMS43LjMtLjkuNC0xLjkuNi0yLjlsLjMtMS41Yy4yLTEuNS4zLTMgLjMtNC41VjM4OS44Yy0uMy0xLjUtLjQtMy0uNi00LjV6TTU0Ni40IDIxMC41bDI2OS40IDE3OS40LTEyMC4zIDgwLjQtMTQ5LTk5LjZWMjEwLjV6bS02OC44IDB2MTYwLjJsLTE0OSA5OS42LTEyMC4zLTgwLjQgMjY5LjMtMTc5LjR6TTE4MC43IDQ1NC4xbDg2IDU3LjUtODYgNTcuNXYtMTE1em0yOTYuOSAzNTguNUwyMDguMyA2MzMuMmwxMjAuMy04MC40IDE0OSA5OS42djE2MC4yek01MTIgNTkyLjhsLTEyMS42LTgxLjJMNTEyIDQzMC4zbDEyMS42IDgxLjJMNTEyIDU5Mi44em0zNC40IDIxOS44VjY1Mi40bDE0OS05OS42IDEyMC4zIDgwLjQtMjY5LjMgMTc5LjR6TTg0My4zIDU2OWwtODYtNTcuNSA4Ni01Ny41djExNXoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CodepenOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CodepenOutlined';
}
var _default = RefIcon;
