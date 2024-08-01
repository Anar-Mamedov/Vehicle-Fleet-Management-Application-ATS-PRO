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
var _PoundCircleTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/PoundCircleTwoTone"));
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
var PoundCircleTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _PoundCircleTwoTone.default
    }));
};
/**![pound-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDgyMGMtMjA1LjQgMC0zNzItMTY2LjYtMzcyLTM3MnMxNjYuNi0zNzIgMzcyLTM3MiAzNzIgMTY2LjYgMzcyIDM3Mi0xNjYuNiAzNzItMzcyIDM3MnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTUxMiAxNDBjLTIwNS40IDAtMzcyIDE2Ni42LTM3MiAzNzJzMTY2LjYgMzcyIDM3MiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzItMTY2LjYtMzcyLTM3Mi0zNzJ6bTE0NiA1ODIuMWMwIDQuNC0zLjYgOC04IDhIMzc2LjJjLTQuNCAwLTgtMy42LTgtOHYtMzguNWMwLTMuNyAyLjUtNi45IDYuMS03LjggNDQtMTAuOSA3Mi44LTQ5IDcyLjgtOTQuMiAwLTE0LjctMi41LTI5LjQtNS45LTQ0LjJIMzc0Yy00LjQgMC04LTMuNi04LTh2LTMwYzAtNC40IDMuNi04IDgtOGg1My43Yy03LjgtMjUuMS0xNC42LTUwLjctMTQuNi03Ny4xIDAtNzUuOCA1OC42LTEyMC4zIDE1MS41LTEyMC4zIDI2LjUgMCA1MS40IDUuNSA3MC4zIDEyLjcgMy4xIDEuMiA1LjIgNC4yIDUuMiA3LjV2MzkuNWE4IDggMCAwMS0xMC42IDcuNmMtMTcuOS02LjQtMzktMTAuNS02MC40LTEwLjUtNTMuMyAwLTg3LjMgMjYuNi04Ny4zIDcwLjIgMCAyNC43IDYuMiA0Ny45IDEzLjQgNzAuNWgxMTJjNC40IDAgOCAzLjYgOCA4djMwYzAgNC40LTMuNiA4LTggOGgtOTguNmMzLjEgMTMuMiA1LjMgMjYuOSA1LjMgNDEgMCA0MC43LTE2LjUgNzMuOS00My45IDkxLjF2NC43aDE4MGM0LjQgMCA4IDMuNiA4IDh2MzkuOHoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTY1MCA2NzQuM0g0NzB2LTQuN2MyNy40LTE3LjIgNDMuOS01MC40IDQzLjktOTEuMSAwLTE0LjEtMi4yLTI3LjgtNS4zLTQxaDk4LjZjNC40IDAgOC0zLjYgOC04di0zMGMwLTQuNC0zLjYtOC04LThoLTExMmMtNy4yLTIyLjYtMTMuNC00NS44LTEzLjQtNzAuNSAwLTQzLjYgMzQtNzAuMiA4Ny4zLTcwLjIgMjEuNCAwIDQyLjUgNC4xIDYwLjQgMTAuNWE4IDggMCAwMDEwLjYtNy42di0zOS41YzAtMy4zLTIuMS02LjMtNS4yLTcuNS0xOC45LTcuMi00My44LTEyLjctNzAuMy0xMi43LTkyLjkgMC0xNTEuNSA0NC41LTE1MS41IDEyMC4zIDAgMjYuNCA2LjggNTIgMTQuNiA3Ny4xSDM3NGMtNC40IDAtOCAzLjYtOCA4djMwYzAgNC40IDMuNiA4IDggOGg2Ny4yYzMuNCAxNC44IDUuOSAyOS41IDUuOSA0NC4yIDAgNDUuMi0yOC44IDgzLjMtNzIuOCA5NC4yLTMuNi45LTYuMSA0LjEtNi4xIDcuOHYzOC41YzAgNC40IDMuNiA4IDggOEg2NTBjNC40IDAgOC0zLjYgOC04di0zOS44YzAtNC40LTMuNi04LTgtOHoiIGZpbGw9IiMxNjc3ZmYiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(PoundCircleTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'PoundCircleTwoTone';
}
var _default = RefIcon;
