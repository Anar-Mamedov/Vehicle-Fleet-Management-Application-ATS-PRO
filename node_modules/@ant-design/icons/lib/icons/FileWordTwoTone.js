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
var _FileWordTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FileWordTwoTone"));
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
var FileWordTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FileWordTwoTone.default
    }));
};
/**![file-word](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUzNCAzNTJWMTM2SDIzMnY3NTJoNTYwVjM5NEg1NzZhNDIgNDIgMCAwMS00Mi00MnptMTAxLjMgMTI5LjNjMS4zLTUuNCA2LjEtOS4zIDExLjctOS4zaDM1LjZhMTIuMDQgMTIuMDQgMCAwMTExLjYgMTUuMWwtNzQuNCAyNzZjLTEuNCA1LjMtNi4yIDguOS0xMS42IDguOWgtMzEuOGMtNS40IDAtMTAuMi0zLjctMTEuNi04LjlsLTUyLjgtMTk3LTUyLjggMTk3Yy0xLjQgNS4zLTYuMiA4LjktMTEuNiA4LjloLTMyYy01LjQgMC0xMC4yLTMuNy0xMS42LTguOWwtNzQuMi0yNzZhMTIuMDIgMTIuMDIgMCAwMTExLjYtMTUuMWgzNS40YzUuNiAwIDEwLjQgMy45IDExLjcgOS4zTDQzNC42IDY4MGw0OS43LTE5OC45YzEuMy01LjQgNi4xLTkuMSAxMS42LTkuMWgzMi4yYzUuNSAwIDEwLjMgMy43IDExLjYgOS4xbDQ5LjggMTk5LjMgNDUuOC0xOTkuMXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTg1NC42IDI4OC42TDYzOS40IDczLjRjLTYtNi0xNC4xLTkuNC0yMi42LTkuNEgxOTJjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjgzMmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NDBjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzExLjNjMC04LjUtMy40LTE2LjctOS40LTIyLjd6TTYwMiAxMzcuOEw3OTAuMiAzMjZINjAyVjEzNy44ek03OTIgODg4SDIzMlYxMzZoMzAydjIxNmE0MiA0MiAwIDAwNDIgNDJoMjE2djQ5NHoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTUyOC4xIDQ3MmgtMzIuMmMtNS41IDAtMTAuMyAzLjctMTEuNiA5LjFMNDM0LjYgNjgwbC00Ni4xLTE5OC43Yy0xLjMtNS40LTYuMS05LjMtMTEuNy05LjNoLTM1LjRhMTIuMDIgMTIuMDIgMCAwMC0xMS42IDE1LjFsNzQuMiAyNzZjMS40IDUuMiA2LjIgOC45IDExLjYgOC45aDMyYzUuNCAwIDEwLjItMy42IDExLjYtOC45bDUyLjgtMTk3IDUyLjggMTk3YzEuNCA1LjIgNi4yIDguOSAxMS42IDguOWgzMS44YzUuNCAwIDEwLjItMy42IDExLjYtOC45bDc0LjQtMjc2YTEyLjA0IDEyLjA0IDAgMDAtMTEuNi0xNS4xSDY0N2MtNS42IDAtMTAuNCAzLjktMTEuNyA5LjNsLTQ1LjggMTk5LjEtNDkuOC0xOTkuM2MtMS4zLTUuNC02LjEtOS4xLTExLjYtOS4xeiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FileWordTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FileWordTwoTone';
}
var _default = RefIcon;
