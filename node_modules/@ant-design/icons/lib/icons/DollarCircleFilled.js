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
var _DollarCircleFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DollarCircleFilled"));
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
var DollarCircleFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DollarCircleFilled.default
    }));
};
/**![dollar-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0yMi4zIDY2NS4ybC4yIDMxLjdjMCA0LjQtMy42IDguMS04IDguMWgtMjguNGMtNC40IDAtOC0zLjYtOC04di0zMS40QzQwMS4zIDcyMyAzNTkuNSA2NzIuNCAzNTUgNjE3LjRjLS40LTQuNyAzLjMtOC43IDgtOC43aDQ2LjJjMy45IDAgNy4zIDIuOCA3LjkgNi42IDUuMSAzMS43IDI5LjggNTUuNCA3NC4xIDYxLjNWNTMzLjlsLTI0LjctNi4zYy01Mi4zLTEyLjUtMTAyLjEtNDUuMS0xMDIuMS0xMTIuNyAwLTcyLjkgNTUuNC0xMTIuMSAxMjYuMi0xMTl2LTMzYzAtNC40IDMuNi04IDgtOGgyOC4xYzQuNCAwIDggMy42IDggOHYzMi43YzY4LjUgNi45IDExOS45IDQ2LjkgMTI1LjkgMTA5LjIuNSA0LjctMy4yIDguOC04IDguOGgtNDQuOWMtNCAwLTcuNC0zLTcuOS02LjktNC0yOS4yLTI3LjQtNTMtNjUuNS01OC4ydjEzNC4zbDI1LjQgNS45YzY0LjggMTYgMTA4LjkgNDcgMTA4LjkgMTE2LjQgMCA3NS4zLTU2IDExNy4zLTEzNC4zIDEyNC4xek00MjYuNiA0MTAuM2MwIDI1LjQgMTUuNyA0NS4xIDQ5LjUgNTcuMyA0LjcgMS45IDkuNCAzLjQgMTUgNXYtMTI0Yy0zNi45IDQuNy02NC41IDI1LjQtNjQuNSA2MS43em0xMTYuNSAxMzUuMmMtMi44LS42LTUuNi0xLjMtOC44LTIuMlY2NzdjNDIuNi0zLjggNzItMjcuMiA3Mi02Ni40IDAtMzAuNy0xNS45LTUwLjctNjMuMi02NS4xeiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DollarCircleFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DollarCircleFilled';
}
var _default = RefIcon;
