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
var _IssuesCloseOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/IssuesCloseOutlined"));
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
var IssuesCloseOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _IssuesCloseOutlined.default
    }));
};
/**![issues-close](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ2NCA2ODhhNDggNDggMCAxMDk2IDAgNDggNDggMCAxMC05NiAwem03Mi0xMTJjNC40IDAgOC0zLjYgOC04VjI5NmMwLTQuNC0zLjYtOC04LThoLTQ4Yy00LjQgMC04IDMuNi04IDh2MjcyYzAgNC40IDMuNiA4IDggOGg0OHptNDAwLTE4OGgtNTkuM2MtMi42IDAtNSAxLjItNi41IDMuM0w3NjMuNyA1MzguMWwtNDkuOS02OC44YTcuOTIgNy45MiAwIDAwLTYuNS0zLjNINjQ4Yy02LjUgMC0xMC4zIDcuNC02LjUgMTIuN2wxMDkuMiAxNTAuN2ExNi4xIDE2LjEgMCAwMDI2IDBsMTY1LjgtMjI4LjdjMy44LTUuMyAwLTEyLjctNi41LTEyLjd6bS00NCAzMDZoLTY0LjJjLTUuNSAwLTEwLjYgMi45LTEzLjYgNy41YTM1Mi4yIDM1Mi4yIDAgMDEtNDkuOCA2Mi4yQTM1NS45MiAzNTUuOTIgMCAwMTY1MS4xIDg0MGEzNTUgMzU1IDAgMDEtMTM4LjcgMjcuOWMtNDguMSAwLTk0LjgtOS40LTEzOC43LTI3LjlhMzU1LjkyIDM1NS45MiAwIDAxLTExMy4zLTc2LjNBMzUzLjA2IDM1My4wNiAwIDAxMTg0IDY1MC41Yy0xOC42LTQzLjgtMjgtOTAuNS0yOC0xMzguNXM5LjQtOTQuNyAyOC0xMzguNWMxNy45LTQyLjQgNDMuNi04MC41IDc2LjQtMTEzLjIgMzIuOC0zMi43IDcwLjktNTguNCAxMTMuMy03Ni4zYTM1NSAzNTUgMCAwMTEzOC43LTI3LjljNDguMSAwIDk0LjggOS40IDEzOC43IDI3LjkgNDIuNCAxNy45IDgwLjUgNDMuNiAxMTMuMyA3Ni4zIDE5IDE5IDM1LjYgMzkuOCA0OS44IDYyLjIgMi45IDQuNyA4LjEgNy41IDEzLjYgNy41SDg5MmM2IDAgOS44LTYuMyA3LjItMTEuNkM4MjguOCAxNzguNSA2ODQuNyA4MiA1MTcuNyA4MCAyNzguOSA3Ny4yIDgwLjUgMjcyLjUgODAgNTExLjIgNzkuNSA3NTAuMSAyNzMuMyA5NDQgNTEyLjQgOTQ0YzE2OS4yIDAgMzE1LjYtOTcgMzg2LjctMjM4LjRBOCA4IDAgMDA4OTIgNjk0eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(IssuesCloseOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'IssuesCloseOutlined';
}
var _default = RefIcon;
