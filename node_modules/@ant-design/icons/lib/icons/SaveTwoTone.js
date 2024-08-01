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
var _SaveTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SaveTwoTone"));
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
var SaveTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SaveTwoTone.default
    }));
};
/**![save](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcwNCAzMjBjMCAxNy43LTE0LjMgMzItMzIgMzJIMzUyYy0xNy43IDAtMzItMTQuMy0zMi0zMlYxODRIMTg0djY1Nmg2NTZWMzQxLjhsLTEzNi0xMzZWMzIwek01MTIgNzMwYy03OS41IDAtMTQ0LTY0LjUtMTQ0LTE0NHM2NC41LTE0NCAxNDQtMTQ0IDE0NCA2NC41IDE0NCAxNDQtNjQuNSAxNDQtMTQ0IDE0NHoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTUxMiA0NDJjLTc5LjUgMC0xNDQgNjQuNS0xNDQgMTQ0czY0LjUgMTQ0IDE0NCAxNDQgMTQ0LTY0LjUgMTQ0LTE0NC02NC41LTE0NC0xNDQtMTQ0em0wIDIyNGMtNDQuMiAwLTgwLTM1LjgtODAtODBzMzUuOC04MCA4MC04MCA4MCAzNS44IDgwIDgwLTM1LjggODAtODAgODB6IiBmaWxsPSIjMTY3N2ZmIiAvPjxwYXRoIGQ9Ik04OTMuMyAyOTMuM0w3MzAuNyAxMzAuN2MtLjctLjctMS40LTEuMy0yLjEtMi0uMS0uMS0uMy0uMi0uNC0uMy0uNy0uNy0xLjUtMS4zLTIuMi0xLjlhNjQgNjQgMCAwMC0yMi0xMS43VjExMkgxNDRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjczNmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg3MzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMzM4LjVjMC0xNy02LjctMzMuMi0xOC43LTQ1LjJ6TTM4NCAxODRoMjU2djEwNEgzODRWMTg0em00NTYgNjU2SDE4NFYxODRoMTM2djEzNmMwIDE3LjcgMTQuMyAzMiAzMiAzMmgzMjBjMTcuNyAwIDMyLTE0LjMgMzItMzJWMjA1LjhsMTM2IDEzNlY4NDB6IiBmaWxsPSIjMTY3N2ZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SaveTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SaveTwoTone';
}
var _default = RefIcon;
