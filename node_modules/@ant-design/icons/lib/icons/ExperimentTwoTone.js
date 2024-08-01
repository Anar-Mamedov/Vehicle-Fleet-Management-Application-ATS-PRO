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
var _ExperimentTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ExperimentTwoTone"));
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
var ExperimentTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ExperimentTwoTone.default
    }));
};
/**![experiment](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU1MS45IDUxM2MxOS42IDAgMzUuOS0xNC4yIDM5LjMtMzIuOEE0MC4wMiA0MC4wMiAwIDAxNTUyIDUxMmE0MCA0MCAwIDAxLTQwLTM5LjR2LjVjMCAyMiAxNy45IDM5LjkgMzkuOSAzOS45ek03NTIgNjg3LjhsLS4zLS4zYy0yOS0xNy41LTYyLjMtMjYuOC05Ny0yNi44LTQ0LjkgMC04Ny4yIDE1LjctMTIxIDQzLjhhMjU2LjI3IDI1Ni4yNyAwIDAxLTE2NC45IDU5LjljLTQxLjIgMC04MS05LjgtMTE2LjctMjhMMjEwLjUgODQ0aDYwM2wtNTkuOS0xNTUuMi0xLjYtMXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTg3OSA4MjQuOUw2OTYuMyAzNTJWMTc4SDc2OHYtNjhIMjU2djY4aDcxLjd2MTc0TDE0NSA4MjQuOWMtMi44IDcuNC00LjMgMTUuMi00LjMgMjMuMSAwIDM1LjMgMjguNyA2NCA2NCA2NGg2MTQuNmM3LjkgMCAxNS43LTEuNSAyMy4xLTQuMyAzMy0xMi43IDQ5LjQtNDkuOCAzNi42LTgyLjh6TTM5NS43IDM2NC43VjE4MGgyMzIuNnYxODQuN0w3MTkuMiA2MDBjLTIwLjctNS4zLTQyLjEtOC02My45LTgtNjEuMiAwLTExOS4yIDIxLjUtMTY1LjMgNjBhMTg4Ljc4IDE4OC43OCAwIDAxLTEyMS4zIDQzLjljLTMyLjcgMC02NC4xLTguMy05MS44LTIzLjdsMTE4LjgtMzA3LjV6TTIxMC41IDg0NGw0MS42LTEwNy42LjEtLjJjMzUuNyAxOC4xIDc1LjQgMjcuOCAxMTYuNiAyNy44IDYxLjIgMCAxMTkuMi0yMS41IDE2NS4zLTYwIDMzLjktMjguMiA3Ni4zLTQzLjkgMTIxLjMtNDMuOSAzNSAwIDY4LjQgOS41IDk3LjYgMjcuMWwuNiAxLjZMODEzLjUgODQ0aC02MDN6IiBmaWxsPSIjMTY3N2ZmIiAvPjxwYXRoIGQ9Ik01NTIgNTEyYzE5LjMgMCAzNS40LTEzLjYgMzkuMi0zMS44LjYtMi43LjgtNS40LjgtOC4yIDAtMjIuMS0xNy45LTQwLTQwLTQwcy00MCAxNy45LTQwIDQwdi42YTQwIDQwIDAgMDA0MCAzOS40eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ExperimentTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ExperimentTwoTone';
}
var _default = RefIcon;
