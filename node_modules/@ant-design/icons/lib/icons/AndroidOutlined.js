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
var _AndroidOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AndroidOutlined"));
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
var AndroidOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AndroidOutlined.default
    }));
};
/**![android](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ0OC4zIDIyNS4yYy0xOC42IDAtMzIgMTMuNC0zMiAzMS45czEzLjUgMzEuOSAzMiAzMS45YzE4LjYgMCAzMi0xMy40IDMyLTMxLjkuMS0xOC40LTEzLjQtMzEuOS0zMi0zMS45em0zOTMuOSA5Ni40Yy0xMy44LTEzLjgtMzIuNy0yMS41LTUzLjItMjEuNS0zLjkgMC03LjQuNC0xMC43IDF2LTFoLTMuNmMtNS41LTMwLjYtMTguNi02MC41LTM4LjEtODcuNC0xOC43LTI1LjctNDMtNDcuOS03MC44LTY0LjlsMjUuMS0zNS44di0zLjNjMC0uOC40LTIuMy43LTMuOC42LTIuNCAxLjQtNS41IDEuNC04LjkgMC0xOC41LTEzLjUtMzEuOS0zMi0zMS45LTkuOCAwLTE5LjUgNS43LTI1LjkgMTUuNGwtMjkuMyA0Mi4xYy0zMC05LjgtNjIuNC0xNS05My44LTE1LTMxLjMgMC02My43IDUuMi05My44IDE1TDM4OSA3OS40Yy02LjYtOS42LTE2LjEtMTUuNC0yNi0xNS40LTE4LjYgMC0zMiAxMy40LTMyIDMxLjkgMCA2LjIgMi41IDEyLjggNi43IDE3LjRsMjIuNiAzMi4zYy0yOC43IDE3LTUzLjUgMzkuNC03Mi4yIDY1LjEtMTkuNCAyNi45LTMyIDU2LjgtMzYuNyA4Ny40aC01LjV2MWMtMy4yLS42LTYuNy0xLTEwLjctMS0yMC4zIDAtMzkuMiA3LjUtNTMuMSAyMS4zLTEzLjggMTMuOC0yMS41IDMyLjYtMjEuNSA1M3YyMzVjMCAyMC4zIDcuNSAzOS4xIDIxLjQgNTIuOSAxMy44IDEzLjggMzIuOCAyMS41IDUzLjIgMjEuNSAzLjkgMCA3LjQtLjQgMTAuNy0xdjkzLjVjMCAyOS4yIDIzLjkgNTMuMSA1My4yIDUzLjFIMzMxdjU4LjNjMCAyMC4zIDcuNSAzOS4xIDIxLjQgNTIuOSAxMy44IDEzLjggMzIuOCAyMS41IDUzLjIgMjEuNSAyMC4zIDAgMzkuMi03LjUgNTMuMS0yMS4zIDEzLjgtMTMuOCAyMS41LTMyLjYgMjEuNS01M3YtNTguMkg1NDR2NTguMWMwIDIwLjMgNy41IDM5LjEgMjEuNCA1Mi45IDEzLjggMTMuOCAzMi44IDIxLjUgNTMuMiAyMS41IDIwLjQgMCAzOS4yLTcuNSA1My4xLTIxLjYgMTMuOC0xMy44IDIxLjUtMzIuNiAyMS41LTUzdi01OC4yaDMxLjljMjkuMyAwIDUzLjItMjMuOCA1My4yLTUzLjF2LTkxLjRjMy4yLjYgNi43IDEgMTAuNyAxIDIwLjMgMCAzOS4yLTcuNSA1My4xLTIxLjMgMTMuOC0xMy44IDIxLjUtMzIuNiAyMS41LTUzdi0yMzVjLS4xLTIwLjMtNy42LTM5LTIxLjQtNTIuOXpNMjQ2IDYwOS42YzAgNi44LTMuOSAxMC42LTEwLjcgMTAuNi02LjggMC0xMC43LTMuOC0xMC43LTEwLjZWMzc0LjVjMC02LjggMy45LTEwLjYgMTAuNy0xMC42IDYuOCAwIDEwLjcgMy44IDEwLjcgMTAuNnYyMzUuMXptMTMxLjEtMzk2LjhjMzcuNS0yNy4zIDg1LjMtNDIuMyAxMzUtNDIuM3M5Ny41IDE1LjEgMTM1IDQyLjVjMzIuNCAyMy43IDU0LjIgNTQuMiA2Mi43IDg3LjVIMzE0LjRjOC41LTMzLjQgMzAuNS02NCA2Mi43LTg3Ljd6bTM5LjMgNjc0LjdjLS42IDUuNi00LjQgOC43LTEwLjUgOC43LTYuOCAwLTEwLjctMy44LTEwLjctMTAuNnYtNTguMmgyMS4ydjYwLjF6bTIwMi4zIDguN2MtNi44IDAtMTAuNy0zLjgtMTAuNy0xMC42di01OC4yaDIxLjJ2NjAuMWMtLjYgNS42LTQuMyA4LjctMTAuNSA4Ljd6bTk1LjgtMTMyLjZIMzA5LjlWMzY0aDQwNC42djM5OS42em04NS4yLTE1NGMwIDYuOC0zLjkgMTAuNi0xMC43IDEwLjYtNi44IDAtMTAuNy0zLjgtMTAuNy0xMC42VjM3NC41YzAtNi44IDMuOS0xMC42IDEwLjctMTAuNiA2LjggMCAxMC43IDMuOCAxMC43IDEwLjZ2MjM1LjF6TTU3Ni4xIDIyNS4yYy0xOC42IDAtMzIgMTMuNC0zMiAzMS45czEzLjUgMzEuOSAzMiAzMS45YzE4LjYgMCAzMi4xLTEzLjQgMzIuMS0zMi0uMS0xOC42LTEzLjQtMzEuOC0zMi4xLTMxLjh6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AndroidOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AndroidOutlined';
}
var _default = RefIcon;
