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
var _FileImageTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/FileImageTwoTone"));
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
var FileImageTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _FileImageTwoTone.default
    }));
};
/**![file-image](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUzNCAzNTJWMTM2SDIzMnY3NTJoNTYwVjM5NEg1NzZhNDIgNDIgMCAwMS00Mi00MnptLTEzNCA1MGMyMi4xIDAgNDAgMTcuOSA0MCA0MHMtMTcuOSA0MC00MCA0MC00MC0xNy45LTQwLTQwIDE3LjktNDAgNDAtNDB6bTI5NiAyOTRIMzI4LjFjLTYuNyAwLTEwLjQtNy43LTYuMy0xMi45bDk5LjgtMTI3LjJhOCA4IDAgMDExMi42IDBsNDEuMSA1Mi40IDc3LjgtOTkuMmE4LjEgOC4xIDAgMDExMi43IDBsMTM2LjUgMTc0YzQuMSA1LjIuNCAxMi45LTYuMyAxMi45eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNODU0LjYgMjg4LjZMNjM5LjQgNzMuNGMtNi02LTE0LjEtOS40LTIyLjYtOS40SDE5MmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2ODMyYzAgMTcuNyAxNC4zIDMyIDMyIDMyaDY0MGMxNy43IDAgMzItMTQuMyAzMi0zMlYzMTEuM2MwLTguNS0zLjQtMTYuNy05LjQtMjIuN3pNNjAyIDEzNy44TDc5MC4yIDMyNkg2MDJWMTM3Ljh6TTc5MiA4ODhIMjMyVjEzNmgzMDJ2MjE2YTQyIDQyIDAgMDA0MiA0MmgyMTZ2NDk0eiIgZmlsbD0iIzE2NzdmZiIgLz48cGF0aCBkPSJNNTUzLjEgNTA5LjFsLTc3LjggOTkuMi00MS4xLTUyLjRhOCA4IDAgMDAtMTIuNiAwbC05OS44IDEyNy4yYTcuOTggNy45OCAwIDAwNi4zIDEyLjlINjk2YzYuNyAwIDEwLjQtNy43IDYuMy0xMi45bC0xMzYuNS0xNzRhOC4xIDguMSAwIDAwLTEyLjcgMHpNMzYwIDQ0MmE0MCA0MCAwIDEwODAgMCA0MCA0MCAwIDEwLTgwIDB6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(FileImageTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'FileImageTwoTone';
}
var _default = RefIcon;
