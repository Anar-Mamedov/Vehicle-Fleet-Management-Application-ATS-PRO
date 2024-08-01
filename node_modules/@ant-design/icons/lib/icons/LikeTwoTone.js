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
var _LikeTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/LikeTwoTone"));
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
var LikeTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _LikeTwoTone.default
    }));
};
/**![like](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI3MyA0OTUuOXY0MjhsLjMtNDI4em01MzguMi04OC4zSDQ5Ni44bDkuNi0xOTguNGMuNi0xMS45LTQuNy0yMy4xLTE0LjYtMzAuNS02LjEtNC41LTEzLjYtNi44LTIxLjEtNi43LTE5LjYuMS0zNi45IDEzLjQtNDIuMiAzMi4zLTM3LjEgMTM0LjQtNjQuOSAyMzUuMi04My41IDMwMi41Vjg1MmgzOTkuNGE1Ni44NSA1Ni44NSAwIDAwMzMuNi01MS44YzAtOS43LTIuMy0xOC45LTYuOS0yNy4zbC0xMy45LTI1LjQgMjEuOS0xOWE1Ni43NiA1Ni43NiAwIDAwMTkuNi00M2MwLTkuNy0yLjMtMTguOS02LjktMjcuM2wtMTMuOS0yNS40IDIxLjktMTlhNTYuNzYgNTYuNzYgMCAwMDE5LjYtNDNjMC05LjctMi4zLTE4LjktNi45LTI3LjNsLTE0LTI1LjUgMjEuOS0xOWE1Ni43NiA1Ni43NiAwIDAwMTkuNi00M2MwLTE5LjEtMTEtMzcuNS0yOC44LTQ4LjR6IiBmaWxsPSIjZTZmNGZmIiAvPjxwYXRoIGQ9Ik0xMTIgNTI4djM2NGMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NVY0OTZoLTY1Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnptNzczLjkgNS43YzE2LjgtMjIuMiAyNi4xLTQ5LjQgMjYuMS03Ny43IDAtNDQuOS0yNS4xLTg3LjUtNjUuNS0xMTFhNjcuNjcgNjcuNjcgMCAwMC0zNC4zLTkuM0g1NzIuM2w2LTEyMi45YzEuNS0yOS43LTktNTcuOS0yOS41LTc5LjRhMTA2LjQgMTA2LjQgMCAwMC03Ny45LTMzLjRjLTUyIDAtOTggMzUtMTExLjggODUuMWwtODUuOCAzMTAuOC0uMyA0MjhoNDcyLjFjOS4zIDAgMTguMi0xLjggMjYuNS01LjQgNDcuNi0yMC4zIDc4LjMtNjYuOCA3OC4zLTExOC40IDAtMTIuNi0xLjgtMjUtNS40LTM3IDE2LjgtMjIuMiAyNi4xLTQ5LjQgMjYuMS03Ny43IDAtMTIuNi0xLjgtMjUtNS40LTM3IDE2LjgtMjIuMiAyNi4xLTQ5LjQgMjYuMS03Ny43IDAtMTIuNi0xLjgtMjUtNS40LTM3ek04MjAuNCA0OTlsLTIxLjkgMTkgMTQgMjUuNWE1Ni4yIDU2LjIgMCAwMTYuOSAyNy4zYzAgMTYuNS03LjEgMzIuMi0xOS42IDQzbC0yMS45IDE5IDEzLjkgMjUuNGE1Ni4yIDU2LjIgMCAwMTYuOSAyNy4zYzAgMTYuNS03LjEgMzIuMi0xOS42IDQzbC0yMS45IDE5IDEzLjkgMjUuNGE1Ni4yIDU2LjIgMCAwMTYuOSAyNy4zYzAgMjIuNC0xMy4yIDQyLjYtMzMuNiA1MS44SDM0NVY1MDYuOGMxOC42LTY3LjIgNDYuNC0xNjggODMuNS0zMDIuNWE0NC4yOCA0NC4yOCAwIDAxNDIuMi0zMi4zYzcuNS0uMSAxNSAyLjIgMjEuMSA2LjcgOS45IDcuNCAxNS4yIDE4LjYgMTQuNiAzMC41bC05LjYgMTk4LjRoMzE0LjRDODI5IDQxOC41IDg0MCA0MzYuOSA4NDAgNDU2YzAgMTYuNS03LjEgMzIuMi0xOS42IDQzeiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(LikeTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'LikeTwoTone';
}
var _default = RefIcon;
