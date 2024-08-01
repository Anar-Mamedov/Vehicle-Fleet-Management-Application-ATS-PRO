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
var _MessageOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/MessageOutlined"));
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
var MessageOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _MessageOutlined.default
    }));
};
/**![message](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ2NCA1MTJhNDggNDggMCAxMDk2IDAgNDggNDggMCAxMC05NiAwem0yMDAgMGE0OCA0OCAwIDEwOTYgMCA0OCA0OCAwIDEwLTk2IDB6bS00MDAgMGE0OCA0OCAwIDEwOTYgMCA0OCA0OCAwIDEwLTk2IDB6bTY2MS4yLTE3My42Yy0yMi42LTUzLjctNTUtMTAxLjktOTYuMy0xNDMuM2E0NDQuMzUgNDQ0LjM1IDAgMDAtMTQzLjMtOTYuM0M2MzAuNiA3NS43IDU3Mi4yIDY0IDUxMiA2NGgtMmMtNjAuNi4zLTExOS4zIDEyLjMtMTc0LjUgMzUuOWE0NDUuMzUgNDQ1LjM1IDAgMDAtMTQyIDk2LjVjLTQwLjkgNDEuMy03MyA4OS4zLTk1LjIgMTQyLjgtMjMgNTUuNC0zNC42IDExNC4zLTM0LjMgMTc0LjlBNDQ5LjQgNDQ5LjQgMCAwMDExMiA3MTR2MTUyYTQ2IDQ2IDAgMDA0NiA0NmgxNTIuMUE0NDkuNCA0NDkuNCAwIDAwNTEwIDk2MGgyLjFjNTkuOSAwIDExOC0xMS42IDE3Mi43LTM0LjNhNDQ0LjQ4IDQ0NC40OCAwIDAwMTQyLjgtOTUuMmM0MS4zLTQwLjkgNzMuOC04OC43IDk2LjUtMTQyIDIzLjYtNTUuMiAzNS42LTExMy45IDM1LjktMTc0LjUuMy02MC45LTExLjUtMTIwLTM0LjgtMTc1LjZ6bS0xNTEuMSA0MzhDNzA0IDg0NS44IDYxMSA4ODQgNTEyIDg4NGgtMS43Yy02MC4zLS4zLTEyMC4yLTE1LjMtMTczLjEtNDMuNWwtOC40LTQuNUgxODhWNjk1LjJsLTQuNS04LjRDMTU1LjMgNjMzLjkgMTQwLjMgNTc0IDE0MCA1MTMuN2MtLjQtOTkuNyAzNy43LTE5My4zIDEwNy42LTI2My44IDY5LjgtNzAuNSAxNjMuMS0xMDkuNSAyNjIuOC0xMDkuOWgxLjdjNTAgMCA5OC41IDkuNyAxNDQuMiAyOC45IDQ0LjYgMTguNyA4NC42IDQ1LjYgMTE5IDgwIDM0LjMgMzQuMyA2MS4zIDc0LjQgODAgMTE5IDE5LjQgNDYuMiAyOS4xIDk1LjIgMjguOSAxNDUuOC0uNiA5OS42LTM5LjcgMTkyLjktMTEwLjEgMjYyLjd6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(MessageOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'MessageOutlined';
}
var _default = RefIcon;
