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
var _HighlightTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/HighlightTwoTone"));
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
var HighlightTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _HighlightTwoTone.default
    }));
};
/**![highlight](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIyOS42IDc5Ni4zaDE2MC4ybDU0LjMtNTQuMS04MC4xLTc4Ljl6bTIyMC43LTM5Ny4xbDI2Mi44IDI1OC45IDE0Ny4zLTE0NS0yNjIuOC0yNTl6bS03Ny4xIDE2Ni4xbDE3MS40IDE2OC45IDY4LjYtNjcuNi0xNzEuNC0xNjguOXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTk1Ny42IDUwNy41TDYwMy4yIDE1OC4zYTcuOSA3LjkgMCAwMC0xMS4yIDBMMzUzLjMgMzkzLjVhOC4wMyA4LjAzIDAgMDAtLjEgMTEuM2wuMS4xIDQwIDM5LjQtMTE3LjIgMTE1LjNhOC4wMyA4LjAzIDAgMDAtLjEgMTEuM2wuMS4xIDM5LjUgMzguOS0xODkuMSAxODdINzIuMWMtNC40IDAtOC4xIDMuNi04LjEgOHY1NS4yYzAgNC40IDMuNiA4IDggOGgzNDQuOWMyLjEgMCA0LjEtLjggNS42LTIuM2w3Ni4xLTc1LjZMNTM5IDgzMGE3LjkgNy45IDAgMDAxMS4yIDBsMTE3LjEtMTE1LjYgNDAuMSAzOS41YTcuOSA3LjkgMCAwMDExLjIgMGwyMzguNy0yMzUuMmMzLjQtMyAzLjQtOCAuMy0xMS4yek0zODkuOCA3OTYuM0gyMjkuNmwxMzQuNC0xMzMgODAuMSA3OC45LTU0LjMgNTQuMXptMTU0LjgtNjIuMUwzNzMuMiA1NjUuM2w2OC42LTY3LjYgMTcxLjQgMTY4LjktNjguNiA2Ny42em0xNjguNS03Ni4xTDQ1MC4zIDM5OS4ybDE0Ny4zLTE0NS4xIDI2Mi44IDI1OS0xNDcuMyAxNDV6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(HighlightTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'HighlightTwoTone';
}
var _default = RefIcon;
