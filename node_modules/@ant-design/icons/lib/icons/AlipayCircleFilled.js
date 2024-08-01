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
var _AlipayCircleFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AlipayCircleFilled"));
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
var AlipayCircleFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AlipayCircleFilled.default
    }));
};
/**![alipay-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTEyIDY0YzI0Ny40MiAwIDQ0OCAyMDAuNTggNDQ4IDQ0OFM3NTkuNDIgOTYwIDUxMiA5NjAgNjQgNzU5LjQyIDY0IDUxMiAyNjQuNTggNjQgNTEyIDY0bTMyLjUgMTY4Yy02OS42NyAwLTg2LjA2IDE2Ljg0LTg2LjcyIDM5LjA4bC0uMDIgMS40M3Y0Ni42MkgyOTEuNDVjLTkuOTIgMC0xNC4yOCAyMy4wNS0xNC4yNyAzOS4zIDAgMi43IDIuMDggNC45MyA0Ljc3IDQuOTNoMTc1LjgxdjU4LjNoLTExNi41Yy05Ljk2IDAtMTQuMyAyMy43Ni0xNC4yNyAzOS40N2E0Ljc3IDQuNzcgMCAwMDQuNzcgNC43NmgyMzMuNDVjLTQuNTMgNDEuMDYtMTUuNDMgNzcuNTktMzAuNzIgMTA5LjMybC0xLjIyIDIuNS0uMzItLjI4Yy02MC4yNC0yOC40Ny0xMjAuNDMtNTIuNTctMTk0LjQtNTIuNTdsLTIuNjIuMDFjLTg0Ljk4IDEuMTEtMTQ0LjcxIDU2LjUtMTQ1LjkxIDEyNy4wNGwtLjAyIDEuMjIuMDIgMi4xM2MxLjI0IDcwLjQgNjMuNTYgMTI2LjQ1IDE0OC41MiAxMjYuNDUgNjEuMjUgMCAxMTYuMzgtMTYuODUgMTYzLjQ2LTQ1LjAyYTEzOC41OCAxMzguNTggMCAwMDE0LjA3LTcuOTYgMzQ1LjYgMzQ1LjYgMCAwMDUwLjMtNDEuMTZsOS40NSA2LjM1IDEyLjQ2IDguMzJjNTcuNTMgMzguMjYgMTEzLjc2IDcyLjYyIDE2OS44NiA3OS4yN2ExNDIuNjIgMTQyLjYyIDAgMDAxOC4zMSAxLjE2YzQzLjAyIDAgNTUtNTIuNjggNTcuMzktOTUuNTFsLjE0LTIuODRjLjQtOC40Ni02LjItMTUuNi0xNC42NS0xNS44Ni03NS40Ni0yLjM3LTEzNi40NS0yMi4wNS0xOTItNDYuMTFsLTYuMjctMi43NWMzNS4xNS01Ni44IDU2LjY2LTEyMS44MSA1Ny4xNS0xODYuNjZsLjA5LTEuMDhjLjQtNS41MS00LTEwLjItOS41Mi0xMC4ySDU0OS4zM3YtNTguM2gxNjUuNzNjOS45MiAwIDE0LjI4LTIyLjEyIDE0LjI3LTM5LjMxYTQuODUgNC44NSAwIDAwLTQuNzgtNC45Mkg1NDkuMzJ2LTgyLjM1YTQuOCA0LjggMCAwMC00LjgzLTQuNzhNMzI4IDU4My44NWM1NC42MyAwIDEwNy4wOCAyMi40MSAxNTguMSA1Mi4xOWw1Ljc2IDMuNGMtMTAzLjU3IDExOS44NC0yNDcuMTcgOTUuOS0yNjEuNzIgMjYuMzdhNjYuODkgNjYuODkgMCAwMS0xLjE0LTkuODNsLS4wNi0yLjM0LjAyLS45Yy45Ny00MC4xMiA0NS4zMy02OC45IDk5LjA0LTY4LjkiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AlipayCircleFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AlipayCircleFilled';
}
var _default = RefIcon;
