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
var _UsergroupAddOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/UsergroupAddOutlined"));
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
var UsergroupAddOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _UsergroupAddOutlined.default
    }));
};
/**![usergroup-add](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg5MiA3NzJoLTgwdi04MGMwLTQuNC0zLjYtOC04LThoLTQ4Yy00LjQgMC04IDMuNi04IDh2ODBoLTgwYy00LjQgMC04IDMuNi04IDh2NDhjMCA0LjQgMy42IDggOCA4aDgwdjgwYzAgNC40IDMuNiA4IDggOGg0OGM0LjQgMCA4LTMuNiA4LTh2LTgwaDgwYzQuNCAwIDgtMy42IDgtOHYtNDhjMC00LjQtMy42LTgtOC04ek0zNzMuNSA0OTguNGMtLjktOC43LTEuNC0xNy41LTEuNC0yNi40IDAtMTUuOSAxLjUtMzEuNCA0LjMtNDYuNS43LTMuNi0xLjItNy4zLTQuNS04LjgtMTMuNi02LjEtMjYuMS0xNC41LTM2LjktMjUuMWExMjcuNTQgMTI3LjU0IDAgMDEtMzguNy05NS40Yy45LTMyLjEgMTMuOC02Mi42IDM2LjMtODUuNiAyNC43LTI1LjMgNTcuOS0zOS4xIDkzLjItMzguNyAzMS45LjMgNjIuNyAxMi42IDg2IDM0LjQgNy45IDcuNCAxNC43IDE1LjYgMjAuNCAyNC40IDIgMy4xIDUuOSA0LjQgOS4zIDMuMiAxNy42LTYuMSAzNi4yLTEwLjQgNTUuMy0xMi40IDUuNi0uNiA4LjgtNi42IDYuMy0xMS42LTMyLjUtNjQuMy05OC45LTEwOC43LTE3NS43LTEwOS45LTExMC44LTEuNy0yMDMuMiA4OS4yLTIwMy4yIDIwMCAwIDYyLjggMjguOSAxMTguOCA3NC4yIDE1NS41LTMxLjggMTQuNy02MS4xIDM1LTg2LjUgNjAuNC01NC44IDU0LjctODUuOCAxMjYuOS04Ny44IDIwNGE4IDggMCAwMDggOC4yaDU2LjFjNC4zIDAgNy45LTMuNCA4LTcuNyAxLjktNTggMjUuNC0xMTIuMyA2Ni43LTE1My41IDI5LjQtMjkuNCA2NS40LTQ5LjggMTA0LjctNTkuNyAzLjgtMS4xIDYuNC00LjggNS45LTguOHpNODI0IDQ3MmMwLTEwOS40LTg3LjktMTk4LjMtMTk2LjktMjAwQzUxNi4zIDI3MC4zIDQyNCAzNjEuMiA0MjQgNDcyYzAgNjIuOCAyOSAxMTguOCA3NC4yIDE1NS41YTMwMC45NSAzMDAuOTUgMCAwMC04Ni40IDYwLjRDMzU3IDc0Mi42IDMyNiA4MTQuOCAzMjQgODkxLjhhOCA4IDAgMDA4IDguMmg1NmM0LjMgMCA3LjktMy40IDgtNy43IDEuOS01OCAyNS40LTExMi4zIDY2LjctMTUzLjVDNTA1LjggNjk1LjcgNTYzIDY3MiA2MjQgNjcyYzExMC40IDAgMjAwLTg5LjUgMjAwLTIwMHptLTEwOS41IDkwLjVDNjkwLjMgNTg2LjcgNjU4LjIgNjAwIDYyNCA2MDBzLTY2LjMtMTMuMy05MC41LTM3LjVhMTI3LjI2IDEyNy4yNiAwIDAxLTM3LjUtOTEuOGMuMy0zMi44IDEzLjQtNjQuNSAzNi4zLTg4IDI0LTI0LjYgNTYuMS0zOC4zIDkwLjQtMzguNyAzMy45LS4zIDY2LjggMTIuOSA5MSAzNi42IDI0LjggMjQuMyAzOC40IDU2LjggMzguNCA5MS40LS4xIDM0LjItMTMuNCA2Ni4zLTM3LjYgOTAuNXoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(UsergroupAddOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'UsergroupAddOutlined';
}
var _default = RefIcon;
