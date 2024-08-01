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
var _FileUnknownTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FileUnknownTwoTone"));
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
var FileUnknownTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FileUnknownTwoTone.default
    }));
};
/**![file-unknown](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUzNCAzNTJWMTM2SDIzMnY3NTJoNTYwVjM5NEg1NzZhNDIgNDIgMCAwMS00Mi00MnptLTIyIDQyNGMtMTcuNyAwLTMyLTE0LjMtMzItMzJzMTQuMy0zMiAzMi0zMiAzMiAxNC4zIDMyIDMyLTE0LjMgMzItMzIgMzJ6bTExMC0yMjguNGMuNyA0NC45LTI5LjcgODQuNS03NC4zIDk4LjktNS43IDEuOC05LjcgNy4zLTkuNyAxMy4zVjY3MmMwIDUuNS00LjUgMTAtMTAgMTBoLTMyYy01LjUgMC0xMC00LjUtMTAtMTB2LTMyYy4yLTE5LjggMTUuNC0zNy4zIDM0LjctNDAuMUM1NDkgNTk2LjIgNTcwIDU3NC4zIDU3MCA1NDljMC0yOC4xLTI1LjgtNTEuNS01OC01MS41cy01OCAyMy40LTU4IDUxLjZjMCA1LjItNC40IDkuNC05LjggOS40aC0zMi40Yy01LjQgMC05LjgtNC4xLTkuOC05LjUgMC01Ny40IDUwLjEtMTAzLjcgMTExLjUtMTAzIDU5LjMuOCAxMDcuNyA0Ni4xIDEwOC41IDEwMS42eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNODU0LjYgMjg4LjdMNjM5LjQgNzMuNGMtNi02LTE0LjItOS40LTIyLjctOS40SDE5MmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2ODMyYzAgMTcuNyAxNC4zIDMyIDMyIDMyaDY0MGMxNy43IDAgMzItMTQuMyAzMi0zMlYzMTEuM2MwLTguNS0zLjQtMTYuNi05LjQtMjIuNnpNNjAyIDEzNy44TDc5MC4yIDMyNkg2MDJWMTM3Ljh6TTc5MiA4ODhIMjMyVjEzNmgzMDJ2MjE2YTQyIDQyIDAgMDA0MiA0MmgyMTZ2NDk0eiIgZmlsbD0iIzE2NzdmZiIgLz48cGF0aCBkPSJNNDgwIDc0NGEzMiAzMiAwIDEwNjQgMCAzMiAzMiAwIDEwLTY0IDB6bS03OC0xOTVjMCA1LjQgNC40IDkuNSA5LjggOS41aDMyLjRjNS40IDAgOS44LTQuMiA5LjgtOS40IDAtMjguMiAyNS44LTUxLjYgNTgtNTEuNnM1OCAyMy40IDU4IDUxLjVjMCAyNS4zLTIxIDQ3LjItNDkuMyA1MC45LTE5LjMgMi44LTM0LjUgMjAuMy0zNC43IDQwLjF2MzJjMCA1LjUgNC41IDEwIDEwIDEwaDMyYzUuNSAwIDEwLTQuNSAxMC0xMHYtMTIuMmMwLTYgNC0xMS41IDkuNy0xMy4zIDQ0LjYtMTQuNCA3NS01NCA3NC4zLTk4LjktLjgtNTUuNS00OS4yLTEwMC44LTEwOC41LTEwMS42LTYxLjQtLjctMTExLjUgNDUuNi0xMTEuNSAxMDN6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FileUnknownTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FileUnknownTwoTone';
}
var _default = RefIcon;
