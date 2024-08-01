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
var _InteractionTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/InteractionTwoTone"));
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
var InteractionTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _InteractionTwoTone.default
    }));
};
/**![interaction](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTQwIDcyOEgxODRWMTg0aDY1NnY2NTZ6IiBmaWxsPSIjMTY3N2ZmIiAvPjxwYXRoIGQ9Ik0xODQgODQwaDY1NlYxODRIMTg0djY1NnptMTE0LTQwMS45YzAtNTUuMyA0NC42LTEwMC4xIDk5LjctMTAwLjFoMjA1Ljh2LTUzLjRjMC01LjYgNi41LTguOCAxMC45LTUuM0w3MjMuNSAzNjVjMy41IDIuNyAzLjUgOCAwIDEwLjdsLTEwOS4xIDg1LjdjLTQuNCAzLjUtMTAuOS40LTEwLjktNS4zdi01My40SDM5Ny44Yy0xOS42IDAtMzUuNSAxNS45LTM1LjUgMzUuNnY3OC45YzAgMy44LTMuMSA2LjgtNi44IDYuOGgtNTAuN2MtMy44IDAtNi44LTMtNi44LTd2LTc4Ljl6bTIuNiAyMTAuM2wxMDkuMS04NS43YzQuNC0zLjUgMTAuOS0uNCAxMC45IDUuM3Y1My40aDIwNS42YzE5LjYgMCAzNS41LTE1LjkgMzUuNS0zNS42di03OC45YzAtMy44IDMuMS02LjggNi44LTYuOGg1MC43YzMuOCAwIDYuOCAzLjEgNi44IDYuOHY3OC45YzAgNTUuMy00NC42IDEwMC4xLTk5LjcgMTAwLjFINDIwLjZ2NTMuNGMwIDUuNi02LjUgOC44LTEwLjkgNS4zbC0xMDkuMS04NS43Yy0zLjUtMi43LTMuNS04IDAtMTAuNXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTMwNC44IDUyNGg1MC43YzMuNyAwIDYuOC0zIDYuOC02Ljh2LTc4LjljMC0xOS43IDE1LjktMzUuNiAzNS41LTM1LjZoMjA1Ljd2NTMuNGMwIDUuNyA2LjUgOC44IDEwLjkgNS4zbDEwOS4xLTg1LjdjMy41LTIuNyAzLjUtOCAwLTEwLjdsLTEwOS4xLTg1LjdjLTQuNC0zLjUtMTAuOS0uMy0xMC45IDUuM1YzMzhIMzk3LjdjLTU1LjEgMC05OS43IDQ0LjgtOTkuNyAxMDAuMVY1MTdjMCA0IDMgNyA2LjggN3ptLTQuMiAxMzQuOWwxMDkuMSA4NS43YzQuNCAzLjUgMTAuOS4zIDEwLjktNS4zdi01My40aDIwNS43YzU1LjEgMCA5OS43LTQ0LjggOTkuNy0xMDAuMXYtNzguOWMwLTMuNy0zLTYuOC02LjgtNi44aC01MC43Yy0zLjcgMC02LjggMy02LjggNi44djc4LjljMCAxOS43LTE1LjkgMzUuNi0zNS41IDM1LjZINDIwLjZWNTY4YzAtNS43LTYuNS04LjgtMTAuOS01LjNsLTEwOS4xIDg1LjdjLTMuNSAyLjUtMy41IDcuOCAwIDEwLjV6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(InteractionTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'InteractionTwoTone';
}
var _default = RefIcon;
