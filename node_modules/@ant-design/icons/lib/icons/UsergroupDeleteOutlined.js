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
var _UsergroupDeleteOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/UsergroupDeleteOutlined"));
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
var UsergroupDeleteOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _UsergroupDeleteOutlined.default
    }));
};
/**![usergroup-delete](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4OCA3ODRINjY0Yy00LjQgMC04IDMuNi04IDh2NDhjMCA0LjQgMy42IDggOCA4aDIyNGM0LjQgMCA4LTMuNiA4LTh2LTQ4YzAtNC40LTMuNi04LTgtOHpNMzczLjUgNTEwLjRjLS45LTguNy0xLjQtMTcuNS0xLjQtMjYuNCAwLTE1LjkgMS41LTMxLjQgNC4zLTQ2LjUuNy0zLjYtMS4yLTcuMy00LjUtOC44LTEzLjYtNi4xLTI2LjEtMTQuNS0zNi45LTI1LjFhMTI3LjU0IDEyNy41NCAwIDAxLTM4LjctOTUuNGMuOS0zMi4xIDEzLjgtNjIuNiAzNi4zLTg1LjYgMjQuNy0yNS4zIDU3LjktMzkuMSA5My4yLTM4LjcgMzEuOS4zIDYyLjcgMTIuNiA4NiAzNC40IDcuOSA3LjQgMTQuNyAxNS42IDIwLjQgMjQuNCAyIDMuMSA1LjkgNC40IDkuMyAzLjIgMTcuNi02LjEgMzYuMi0xMC40IDU1LjMtMTIuNCA1LjYtLjYgOC44LTYuNiA2LjMtMTEuNi0zMi41LTY0LjMtOTguOS0xMDguNy0xNzUuNy0xMDkuOS0xMTAuOS0xLjctMjAzLjMgODkuMi0yMDMuMyAxOTkuOSAwIDYyLjggMjguOSAxMTguOCA3NC4yIDE1NS41LTMxLjggMTQuNy02MS4xIDM1LTg2LjUgNjAuNC01NC44IDU0LjctODUuOCAxMjYuOS04Ny44IDIwNGE4IDggMCAwMDggOC4yaDU2LjFjNC4zIDAgNy45LTMuNCA4LTcuNyAxLjktNTggMjUuNC0xMTIuMyA2Ni43LTE1My41IDI5LjQtMjkuNCA2NS40LTQ5LjggMTA0LjctNTkuNyAzLjktMSA2LjUtNC43IDYtOC43ek04MjQgNDg0YzAtMTA5LjQtODcuOS0xOTguMy0xOTYuOS0yMDBDNTE2LjMgMjgyLjMgNDI0IDM3My4yIDQyNCA0ODRjMCA2Mi44IDI5IDExOC44IDc0LjIgMTU1LjVhMzAwLjk1IDMwMC45NSAwIDAwLTg2LjQgNjAuNEMzNTcgNzU0LjYgMzI2IDgyNi44IDMyNCA5MDMuOGE4IDggMCAwMDggOC4yaDU2YzQuMyAwIDcuOS0zLjQgOC03LjcgMS45LTU4IDI1LjQtMTEyLjMgNjYuNy0xNTMuNUM1MDUuOCA3MDcuNyA1NjMgNjg0IDYyNCA2ODRjMTEwLjQgMCAyMDAtODkuNSAyMDAtMjAwem0tMTA5LjUgOTAuNUM2OTAuMyA1OTguNyA2NTguMiA2MTIgNjI0IDYxMnMtNjYuMy0xMy4zLTkwLjUtMzcuNWExMjcuMjYgMTI3LjI2IDAgMDEtMzcuNS05MS44Yy4zLTMyLjggMTMuNC02NC41IDM2LjMtODggMjQtMjQuNiA1Ni4xLTM4LjMgOTAuNC0zOC43IDMzLjktLjMgNjYuOCAxMi45IDkxIDM2LjYgMjQuOCAyNC4zIDM4LjQgNTYuOCAzOC40IDkxLjQtLjEgMzQuMi0xMy40IDY2LjMtMzcuNiA5MC41eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(UsergroupDeleteOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'UsergroupDeleteOutlined';
}
var _default = RefIcon;
