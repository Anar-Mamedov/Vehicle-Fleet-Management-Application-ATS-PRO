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
var _ShareAltOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ShareAltOutlined"));
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
var ShareAltOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ShareAltOutlined.default
    }));
};
/**![share-alt](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc1MiA2NjRjLTI4LjUgMC01NC44IDEwLTc1LjQgMjYuN0w0NjkuNCA1NDAuOGExNjAuNjggMTYwLjY4IDAgMDAwLTU3LjZsMjA3LjItMTQ5LjlDNjk3LjIgMzUwIDcyMy41IDM2MCA3NTIgMzYwYzY2LjIgMCAxMjAtNTMuOCAxMjAtMTIwcy01My44LTEyMC0xMjAtMTIwLTEyMCA1My44LTEyMCAxMjBjMCAxMS42IDEuNiAyMi43IDQuNyAzMy4zTDQzOS45IDQxNS44QzQxMC43IDM3Ny4xIDM2NC4zIDM1MiAzMTIgMzUyYy04OC40IDAtMTYwIDcxLjYtMTYwIDE2MHM3MS42IDE2MCAxNjAgMTYwYzUyLjMgMCA5OC43LTI1LjEgMTI3LjktNjMuOGwxOTYuOCAxNDIuNWMtMy4xIDEwLjYtNC43IDIxLjgtNC43IDMzLjMgMCA2Ni4yIDUzLjggMTIwIDEyMCAxMjBzMTIwLTUzLjggMTIwLTEyMC01My44LTEyMC0xMjAtMTIwem0wLTQ3NmMyOC43IDAgNTIgMjMuMyA1MiA1MnMtMjMuMyA1Mi01MiA1Mi01Mi0yMy4zLTUyLTUyIDIzLjMtNTIgNTItNTJ6TTMxMiA2MDBjLTQ4LjUgMC04OC0zOS41LTg4LTg4czM5LjUtODggODgtODggODggMzkuNSA4OCA4OC0zOS41IDg4LTg4IDg4em00NDAgMjM2Yy0yOC43IDAtNTItMjMuMy01Mi01MnMyMy4zLTUyIDUyLTUyIDUyIDIzLjMgNTIgNTItMjMuMyA1Mi01MiA1MnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ShareAltOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ShareAltOutlined';
}
var _default = RefIcon;
