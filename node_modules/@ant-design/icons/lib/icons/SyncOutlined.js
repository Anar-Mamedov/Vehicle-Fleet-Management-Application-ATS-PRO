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
var _SyncOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/SyncOutlined"));
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
var SyncOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _SyncOutlined.default
    }));
};
/**![sync](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE2OCA1MDQuMmMxLTQzLjcgMTAtODYuMSAyNi45LTEyNiAxNy4zLTQxIDQyLjEtNzcuNyA3My43LTEwOS40UzMzNyAyMTIuMyAzNzggMTk1YzQyLjQtMTcuOSA4Ny40LTI3IDEzMy45LTI3czkxLjUgOS4xIDEzMy44IDI3QTM0MS41IDM0MS41IDAgMDE3NTUgMjY4LjhjOS45IDkuOSAxOS4yIDIwLjQgMjcuOCAzMS40bC02MC4yIDQ3YTggOCAwIDAwMyAxNC4xbDE3NS43IDQzYzUgMS4yIDkuOS0yLjYgOS45LTcuN2wuOC0xODAuOWMwLTYuNy03LjctMTAuNS0xMi45LTYuM2wtNTYuNCA0NC4xQzc2NS44IDE1NS4xIDY0Ni4yIDkyIDUxMS44IDkyIDI4Mi43IDkyIDk2LjMgMjc1LjYgOTIgNTAzLjhhOCA4IDAgMDA4IDguMmg2MGM0LjQgMCA3LjktMy41IDgtNy44em03NTYgNy44aC02MGMtNC40IDAtNy45IDMuNS04IDcuOC0xIDQzLjctMTAgODYuMS0yNi45IDEyNi0xNy4zIDQxLTQyLjEgNzcuOC03My43IDEwOS40QTM0Mi40NSAzNDIuNDUgMCAwMTUxMi4xIDg1NmEzNDIuMjQgMzQyLjI0IDAgMDEtMjQzLjItMTAwLjhjLTkuOS05LjktMTkuMi0yMC40LTI3LjgtMzEuNGw2MC4yLTQ3YTggOCAwIDAwLTMtMTQuMWwtMTc1LjctNDNjLTUtMS4yLTkuOSAyLjYtOS45IDcuN2wtLjcgMTgxYzAgNi43IDcuNyAxMC41IDEyLjkgNi4zbDU2LjQtNDQuMUMyNTguMiA4NjguOSAzNzcuOCA5MzIgNTEyLjIgOTMyYzIyOS4yIDAgNDE1LjUtMTgzLjcgNDE5LjgtNDExLjhhOCA4IDAgMDAtOC04LjJ6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(SyncOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'SyncOutlined';
}
var _default = RefIcon;
