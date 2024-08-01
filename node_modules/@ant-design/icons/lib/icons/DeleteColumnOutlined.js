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
var _DeleteColumnOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DeleteColumnOutlined"));
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
var DeleteColumnOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DeleteColumnOutlined.default
    }));
};
/**![delete-column](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlIC8+PC9kZWZzPjxwYXRoIGQ9Ik02NTEuMSA2NDEuOWE3Ljg0IDcuODQgMCAwMC01LjEtMS45aC01NC43Yy0yLjQgMC00LjYgMS4xLTYuMSAyLjlMNTEyIDczMC43bC03My4xLTg3LjhhOC4xIDguMSAwIDAwLTYuMS0yLjlIMzc4Yy0xLjkgMC0zLjcuNy01LjEgMS45YTcuOTcgNy45NyAwIDAwLTEgMTEuM0w0NzQuMiA3NzYgMzcxLjggODk4LjlhOC4wNiA4LjA2IDAgMDA2LjEgMTMuMmg1NC43YzIuNCAwIDQuNi0xLjEgNi4xLTIuOWw3My4xLTg3LjggNzMuMSA4Ny44YTguMSA4LjEgMCAwMDYuMSAyLjloNTVjMS45IDAgMy43LS43IDUuMS0xLjkgMy40LTIuOCAzLjktNy45IDEtMTEuM0w1NDkuOCA3NzZsMTAyLjQtMTIyLjljMi44LTMuNCAyLjMtOC40LTEuMS0xMS4yek00NzIgNTQ0aDgwYzQuNCAwIDgtMy42IDgtOFYxMjBjMC00LjQtMy42LTgtOC04aC04MGMtNC40IDAtOCAzLjYtOCA4djQxNmMwIDQuNCAzLjYgOCA4IDh6TTM1MCAzODZIMTg0VjEzNmMwLTMuMy0yLjctNi02LTZoLTYwYy0zLjMgMC02IDIuNy02IDZ2MjkyYzAgMTYuNiAxMy40IDMwIDMwIDMwaDIwOGMzLjMgMCA2LTIuNyA2LTZ2LTYwYzAtMy4zLTIuNy02LTYtNnptNTU2LTI1NmgtNjBjLTMuMyAwLTYgMi43LTYgNnYyNTBINjc0Yy0zLjMgMC02IDIuNy02IDZ2NjBjMCAzLjMgMi43IDYgNiA2aDIwOGMxNi42IDAgMzAtMTMuNCAzMC0zMFYxMzZjMC0zLjMtMi43LTYtNi02eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DeleteColumnOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DeleteColumnOutlined';
}
var _default = RefIcon;
