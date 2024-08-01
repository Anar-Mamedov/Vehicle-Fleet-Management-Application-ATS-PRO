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
var _CarryOutTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CarryOutTwoTone"));
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
var CarryOutTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CarryOutTwoTone.default
    }));
};
/**![carry-out](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxODRINzEydi02NGMwLTQuNC0zLjYtOC04LThoLTU2Yy00LjQgMC04IDMuNi04IDh2NjRIMzg0di02NGMwLTQuNC0zLjYtOC04LThoLTU2Yy00LjQgMC04IDMuNi04IDh2NjRIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY2NjRjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjIxNmMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTQwIDY1NkgxODRWMjU2aDEyOHY0OGMwIDQuNCAzLjYgOCA4IDhoNTZjNC40IDAgOC0zLjYgOC04di00OGgyNTZ2NDhjMCA0LjQgMy42IDggOCA4aDU2YzQuNCAwIDgtMy42IDgtOHYtNDhoMTI4djU4NHoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTcxMiAzMDRjMCA0LjQtMy42IDgtOCA4aC01NmMtNC40IDAtOC0zLjYtOC04di00OEgzODR2NDhjMCA0LjQtMy42IDgtOCA4aC01NmMtNC40IDAtOC0zLjYtOC04di00OEgxODR2NTg0aDY1NlYyNTZINzEydjQ4em0tMTcuNSAxMjguOEw0ODEuOSA3MjUuNWExNi4xIDE2LjEgMCAwMS0yNiAwbC0xMjYuNC0xNzRjLTMuOC01LjMgMC0xMi43IDYuNS0xMi43aDU1LjJjNS4yIDAgMTAgMi41IDEzIDYuNmw2NC43IDg5IDE1MC45LTIwNy44YzMtNC4xIDcuOS02LjYgMTMtNi42SDY4OGM2LjUgMCAxMC4zIDcuNCA2LjUgMTIuOHoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTY4OCA0MjBoLTU1LjJjLTUuMSAwLTEwIDIuNS0xMyA2LjZMNDY4LjkgNjM0LjRsLTY0LjctODljLTMtNC4xLTcuOC02LjYtMTMtNi42SDMzNmMtNi41IDAtMTAuMyA3LjQtNi41IDEyLjdsMTI2LjQgMTc0YTE2LjEgMTYuMSAwIDAwMjYgMGwyMTIuNi0yOTIuN2MzLjgtNS40IDAtMTIuOC02LjUtMTIuOHoiIGZpbGw9IiMxNjc3ZmYiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CarryOutTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CarryOutTwoTone';
}
var _default = RefIcon;
