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
var _LikeFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/LikeFilled"));
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
var LikeFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _LikeFilled.default
    }));
};
/**![like](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4NS45IDUzMy43YzE2LjgtMjIuMiAyNi4xLTQ5LjQgMjYuMS03Ny43IDAtNDQuOS0yNS4xLTg3LjQtNjUuNS0xMTEuMWE2Ny42NyA2Ny42NyAwIDAwLTM0LjMtOS4zSDU3Mi40bDYtMTIyLjljMS40LTI5LjctOS4xLTU3LjktMjkuNS03OS40QTEwNi42MiAxMDYuNjIgMCAwMDQ3MSA5OS45Yy01MiAwLTk4IDM1LTExMS44IDg1LjFsLTg1LjkgMzExaC0uM3Y0MjhoNDcyLjNjOS4yIDAgMTguMi0xLjggMjYuNS01LjQgNDcuNi0yMC4zIDc4LjMtNjYuOCA3OC4zLTExOC40IDAtMTIuNi0xLjgtMjUtNS40LTM3IDE2LjgtMjIuMiAyNi4xLTQ5LjQgMjYuMS03Ny43IDAtMTIuNi0xLjgtMjUtNS40LTM3IDE2LjgtMjIuMiAyNi4xLTQ5LjQgMjYuMS03Ny43LS4yLTEyLjYtMi0yNS4xLTUuNi0zNy4xek0xMTIgNTI4djM2NGMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NVY0OTZoLTY1Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(LikeFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'LikeFilled';
}
var _default = RefIcon;
