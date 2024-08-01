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
var _AmazonOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AmazonOutlined"));
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
var AmazonOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AmazonOutlined.default
    }));
};
/**![amazon](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgyNSA3NjguOWMtMy4zLS45LTcuMy0uNC0xMS45IDEuMy02MS42IDI4LjItMTIxLjUgNDguMy0xNzkuNyA2MC4yQzUwNy43IDg1NiAzODUuMiA4NDIuNiAyNjYgNzkwLjNjLTMzLjEtMTQuNi03OS4xLTM5LjItMTM4LTc0YTkuMzYgOS4zNiAwIDAwLTUuMy0yYy0yLS4xLTMuNy4xLTUuMy45LTEuNi44LTIuOCAxLjgtMy43IDMuMS0uOSAxLjMtMS4xIDMuMS0uNCA1LjQuNiAyLjIgMi4xIDQuNyA0LjYgNy40IDEwLjQgMTIuMiAyMy4zIDI1LjIgMzguNiAzOXMzNS42IDI5LjQgNjAuOSA0Ni44YzI1LjMgMTcuNCA1MS44IDMyLjkgNzkuMyA0Ni40IDI3LjYgMTMuNSA1OS42IDI0LjkgOTYuMSAzNC4xczczIDEzLjggMTA5LjQgMTMuOGMzNi4yIDAgNzEuNC0zLjcgMTA1LjUtMTAuOSAzNC4yLTcuMyA2My0xNS45IDg2LjUtMjUuOSAyMy40LTkuOSA0NS0yMSA2NC44LTMzIDE5LjgtMTIgMzQuNC0yMi4yIDQzLjktMzAuMyA5LjUtOC4yIDE2LjMtMTQuNiAyMC4yLTE5LjQgNC42LTUuNyA2LjktMTAuNiA2LjktMTQuOS4xLTQuNS0xLjctNy4xLTUtNy45ek01MjcuNCAzNDguMWMtMTUuMiAxLjMtMzMuNSA0LjEtNTUgOC4zLTIxLjUgNC4xLTQxLjQgOS4zLTU5LjggMTUuNHMtMzcuMiAxNC42LTU2LjMgMjUuNGMtMTkuMiAxMC44LTM1LjUgMjMuMi00OSAzN3MtMjQuNSAzMS4xLTMzLjEgNTJjLTguNiAyMC44LTEyLjkgNDMuNy0xMi45IDY4LjcgMCAyNy4xIDQuNyA1MS4yIDE0LjMgNzIuNSA5LjUgMjEuMyAyMi4yIDM4IDM4LjIgNTAuNCAxNS45IDEyLjQgMzQgMjIuMSA1NCAyOS4yIDIwIDcuMSA0MS4yIDEwLjMgNjMuMiA5LjQgMjItLjkgNDMuNS00LjMgNjQuNC0xMC4zIDIwLjgtNS45IDQwLjQtMTUuNCA1OC42LTI4LjMgMTguMi0xMi45IDMzLjEtMjguMiA0NC44LTQ1LjcgNC4zIDYuNiA4LjEgMTEuNSAxMS41IDE0LjdsOC43IDguOWM1LjggNS45IDE0LjcgMTQuNiAyNi43IDI2LjEgMTEuOSAxMS41IDI0LjEgMjIuNyAzNi4zIDMzLjdsMTA0LjQtOTkuOS02LTQuOWMtNC4zLTMuMy05LjQtOC0xNS4yLTE0LjMtNS44LTYuMi0xMS42LTEzLjEtMTcuMi0yMC41LTUuNy03LjQtMTAuNi0xNi4xLTE0LjctMjUuOS00LjEtOS44LTYuMi0xOS4zLTYuMi0yOC41VjI1OC43YzAtMTAuMS0xLjktMjEtNS43LTMyLjgtMy45LTExLjctMTAuNy0yNC41LTIwLjctMzguMy0xMC0xMy44LTIyLjQtMjYuMi0zNy4yLTM3LTE0LjktMTAuOC0zNC43LTIwLTU5LjYtMjcuNC0yNC44LTcuNC01Mi42LTExLjEtODMuMi0xMS4xLTMxLjMgMC02MC40IDMuNy04Ny42IDEwLjktMjcuMSA3LjMtNTAuMyAxNy02OS43IDI5LjItMTkuMyAxMi4yLTM1LjkgMjYuMy00OS43IDQyLjQtMTMuOCAxNi4xLTI0LjEgMzIuOS0zMC44IDUwLjQtNi43IDE3LjUtMTAuMSAzNS4yLTEwLjEgNTMuMUw0MDggMzEwYzUuNS0xNi40IDEyLjktMzAuNiAyMi00Mi44IDkuMi0xMi4yIDE3LjktMjEgMjUuOC0yNi41IDgtNS41IDE2LjYtOS45IDI1LjctMTMuMiA5LjItMy4zIDE1LjQtNSAxOC42LTUuNCAzLjItLjMgNS43LS40IDcuNi0uNCAyNi43IDAgNDUuMiA3LjkgNTUuNiAyMy42IDYuNSA5LjUgOS43IDIzLjkgOS43IDQzLjN2NTYuNmMtMTUuMi42LTMwLjQgMS42LTQ1LjYgMi45ek01NzMuMSA1MDBjMCAxNi42LTIuMiAzMS43LTYuNSA0NS05LjIgMjkuMS0yNi43IDQ3LjQtNTIuNCA1NC44LTIyLjQgNi42LTQzLjcgMy4zLTYzLjktOS44LTIxLjUtMTQtMzIuMi0zMy44LTMyLjItNTkuMyAwLTE5LjkgNS0zNi45IDE1LTUxLjEgMTAtMTQuMSAyMy4zLTI0LjcgNDAtMzEuN3MzMy0xMiA0OS0xNC45YzE1LjktMyAzMy00LjggNTEtNS40VjUwMHptMzM1LjIgMjE4LjljLTQuMy01LjQtMTUuOS04LjktMzQuOS0xMC43LTE5LTEuOC0zNS41LTEuNy00OS43LjQtMTUuMyAxLjgtMzEuMSA2LjItNDcuMyAxMy40LTE2LjMgNy4xLTIzLjQgMTMuMS0yMS42IDE3LjhsLjcgMS4zLjkuNyAxLjQuMmg0LjZjLjggMCAxLjgtLjEgMy4yLS4yIDEuNC0uMSAyLjctLjMgMy45LS40IDEuMi0uMSAyLjktLjMgNS4xLS40IDIuMS0uMSA0LjEtLjQgNi0uNy4zIDAgMy43LS4zIDEwLjMtLjkgNi42LS42IDExLjQtMSAxNC4zLTEuMyAyLjktLjMgNy44LS42IDE0LjUtLjkgNi43LS4zIDEyLjEtLjMgMTYuMSAwIDQgLjMgOC41LjcgMTMuNiAxLjEgNS4xLjQgOS4yIDEuMyAxMi40IDIuNyAzLjIgMS4zIDUuNiAzIDcuMSA1LjEgNS4yIDYuNiA0LjIgMjEuMi0zIDQzLjlzLTE0IDQwLjgtMjAuNCA1NC4yYy0yLjggNS43LTIuOCA5LjIgMCAxMC43czYuNy4xIDExLjktNGMxNS42LTEyLjIgMjguNi0zMC42IDM5LjEtNTUuMyA2LjEtMTQuNiAxMC41LTI5LjggMTMuMS00NS43IDIuNC0xNS45IDItMjYuMi0xLjMtMzF6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AmazonOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AmazonOutlined';
}
var _default = RefIcon;
