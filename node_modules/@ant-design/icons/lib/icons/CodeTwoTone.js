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
var _CodeTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CodeTwoTone"));
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
var CodeTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CodeTwoTone.default
    }));
};
/**![code](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTQwIDcyOEgxODRWMTg0aDY1NnY2NTZ6IiBmaWxsPSIjMTY3N2ZmIiAvPjxwYXRoIGQ9Ik0xODQgODQwaDY1NlYxODRIMTg0djY1NnptMzM5LjUtMjIzaDE4NWM0LjEgMCA3LjUgMy42IDcuNSA4djQ4YzAgNC40LTMuNCA4LTcuNSA4aC0xODVjLTQuMSAwLTcuNS0zLjYtNy41LTh2LTQ4YzAtNC40IDMuNC04IDcuNS04ek0zMDggNjEwLjNjMC0yLjMgMS4xLTQuNiAyLjktNi4xTDQyMC43IDUxMmwtMTA5LjgtOTIuMmE3LjYzIDcuNjMgMCAwMS0yLjktNi4xVjM1MWMwLTYuOCA3LjktMTAuNSAxMy4xLTYuMWwxOTIgMTYwLjljMy45IDMuMiAzLjkgOS4xIDAgMTIuM2wtMTkyIDE2MWMtNS4yIDQuNC0xMy4xLjctMTMuMS02LjF2LTYyLjd6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik0zMjEuMSA2NzkuMWwxOTItMTYxYzMuOS0zLjIgMy45LTkuMSAwLTEyLjNsLTE5Mi0xNjAuOUE3Ljk1IDcuOTUgMCAwMDMwOCAzNTF2NjIuN2MwIDIuNCAxIDQuNiAyLjkgNi4xTDQyMC43IDUxMmwtMTA5LjggOTIuMmE4LjEgOC4xIDAgMDAtMi45IDYuMVY2NzNjMCA2LjggNy45IDEwLjUgMTMuMSA2LjF6TTUxNiA2NzNjMCA0LjQgMy40IDggNy41IDhoMTg1YzQuMSAwIDcuNS0zLjYgNy41LTh2LTQ4YzAtNC40LTMuNC04LTcuNS04aC0xODVjLTQuMSAwLTcuNSAzLjYtNy41IDh2NDh6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CodeTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CodeTwoTone';
}
var _default = RefIcon;
