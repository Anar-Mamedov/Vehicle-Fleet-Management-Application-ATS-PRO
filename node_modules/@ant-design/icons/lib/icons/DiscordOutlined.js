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
var _DiscordOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DiscordOutlined"));
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
var DiscordOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DiscordOutlined.default
    }));
};
/**![discord](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDA1IDE1OGwtMjUgM3MtMTEyLjEzIDEyLjI2LTE5NC4wMiA3OC4wMmgtLjk2bC0xLjAyLjk2Yy0xOC4zNyAxNi45LTI2LjM3IDM3LjY3LTM5IDY4LjA0YTk4Mi4wOCA5ODIuMDggMCAwMC0zOCAxMTJDODMuMjcgNTA1Ljg3IDY0IDYwOS44NyA2NCA3MDV2OGw0IDhjMjkuNjMgNTIgODIuMjQgODUuMTIgMTMxIDEwOCA0OC43NCAyMi44OCA5MC44OSAzNSAxMjAgMzZsMTkuMDIuOTkgOS45OC0xNyAzNS02MmMzNy4xMyA4LjM4IDc5Ljg4IDE0IDEyOSAxNCA0OS4xMiAwIDkxLjg3LTUuNjIgMTI5LTE0bDM1IDYyIDEwLjAyIDE3IDE4Ljk3LTFjMjkuMTItLjk4IDcxLjI3LTEzLjExIDEyMC0zNiA0OC43Ny0yMi44NyAxMDEuMzgtNTYgMTMxLjAxLTEwOGw0LTh2LThjMC05NS4xMy0xOS4yNi0xOTkuMTMtNDMtMjg0Ljk4YTk4Mi4wOCA5ODIuMDggMCAwMC0zOC0xMTJjLTEyLjYzLTMwLjQtMjAuNjMtNTEuMTQtMzktNjhsLTEtMS4wM2gtMS4wMkM3NTYuMTYgMTczLjI2IDY0NCAxNjEuMDEgNjQ0IDE2MS4wMUw2MTkgMTU4bC05LjAyIDIzcy05LjI0IDIzLjM3LTE0Ljk3IDUwLjAyYTY0My4wNCA2NDMuMDQgMCAwMC04My4wMS02LjAxYy0xNy4xMiAwLTQ2LjcyIDEuMTItODMgNi4wMWEzNTkuODUgMzU5Ljg1IDAgMDAtMTUuMDItNTAuMDF6bS00NCA3My4wMmMxLjM3IDQuNDggMi43NCA4LjM2IDQgMTItNDEuMzggMTAuMjQtODUuNTEgMjUuODYtMTI2IDUwLjk4bDM0IDU0LjAyQzM1NiAyOTYuNSA0NzUuMjIgMjg5IDUxMiAyODljMzYuNzQgMCAxNTYgNy40OSAyMzkgNTlMNzg1IDI5NGMtNDAuNDktMjUuMTItODQuNjItNDAuNzQtMTI2LTUxIDEuMjYtMy42MiAyLjYzLTcuNSA0LTEyIDI5Ljg2IDYgODYuODkgMTkuNzcgMTM0IDU3LjAyLS4yNi4xMiAxMiAxOC42MiAyMyA0NC45OSAxMS4yNiAyNy4xMyAyMy43NCA2My4yNiAzNSAxMDQgMjEuNjQgNzguMTEgMzguNjMgMTczLjI1IDQwIDI1Ni45OS0yMC4xNSAzMC43NS01Ny41IDU4LjUtOTcuMDIgNzcuMDJBMzExLjggMzExLjggMCAwMTcyMCA3OTUuOThsLTE2LTI2Ljk3YzkuNS0zLjUyIDE4Ljg4LTcuMzYgMjctMTEuMDEgNDkuMjYtMjEuNjMgNzYtNDUgNzYtNDVsLTQyLTQ4cy0xOCAxNi41Mi02MCAzNS4wMkM2NjMuMDMgNzE4LjUyIDU5OC44NyA3MzcgNTEyIDczN3MtMTUxLTE4LjUtMTkzLTM3Yy00Mi0xOC40OS02MC0zNS02MC0zNWwtNDIgNDhzMjYuNzQgMjMuMzYgNzYgNDQuOTlhNDI0LjQ3IDQyNC40NyAwIDAwMjcgMTFsLTE2IDI3LjAyYTMxMS44IDMxMS44IDAgMDEtNzguMDItMjUuMDNjLTM5LjQ4LTE4LjUtNzYuODYtNDYuMjQtOTYuOTYtNzYuOTkgMS4zNS04My43NCAxOC4zNC0xNzguODggNDAtMjU3QTkxNy4yMiA5MTcuMjIgMCAwMTIwNCAzMzNjMTEtMjYuMzYgMjMuMjYtNDQuODYgMjMtNDQuOTggNDcuMTEtMzcuMjUgMTA0LjE0LTUxLjAxIDEzNC01N20zOSAyMTcuOTljLTI0Ljc0IDAtNDYuNjIgMTQuMTEtNjAgMzItMTMuMzggMTcuODktMjAgMzkuODctMjAgNjRzNi42MiA0Ni4xMSAyMCA2NGMxMy4zOCAxNy44OSAzNS4yNiAzMiA2MCAzMiAyNC43NCAwIDQ2LjYyLTE0LjExIDYwLTMyIDEzLjM4LTE3Ljg5IDIwLTM5Ljg3IDIwLTY0cy02LjYyLTQ2LjExLTIwLTY0Yy0xMy4zOC0xNy44OS0zNS4yNi0zMi02MC0zMm0yMjQgMGMtMjQuNzQgMC00Ni42MiAxNC4xMS02MCAzMi0xMy4zOCAxNy44OS0yMCAzOS44Ny0yMCA2NHM2LjYyIDQ2LjExIDIwIDY0YzEzLjM4IDE3Ljg5IDM1LjI2IDMyIDYwIDMyIDI0Ljc0IDAgNDYuNjItMTQuMTEgNjAtMzIgMTMuMzgtMTcuODkgMjAtMzkuODcgMjAtNjRzLTYuNjItNDYuMTEtMjAtNjRjLTEzLjM4LTE3Ljg5LTM1LjI2LTMyLTYwLTMybS0yMjQgNjRjMS43NiAwIDQgLjY0IDggNi4wMSA0IDUuMzUgOCAxNC43MiA4IDI1Ljk5IDAgMTEuMjYtNCAyMC42NC04IDI2LjAxLTQgNS4zNS02LjI0IDUuOTktOCA1Ljk5LTEuNzYgMC00LS42NC04LTYuMDJhNDQuODMgNDQuODMgMCAwMS04LTI1Ljk4YzAtMTEuMjcgNC0yMC42NCA4LTI2LjAyIDQtNS4zNCA2LjI0LTUuOTggOC01Ljk4bTIyNCAwYzEuNzYgMCA0IC42NCA4IDYuMDEgNCA1LjM1IDggMTQuNzIgOCAyNS45OSAwIDExLjI2LTQgMjAuNjQtOCAyNi4wMS00IDUuMzUtNi4yNCA1Ljk5LTggNS45OS0xLjc2IDAtNC0uNjQtOC02LjAyYTQ0LjgzIDQ0LjgzIDAgMDEtOC0yNS45OGMwLTExLjI3IDQtMjAuNjQgOC0yNi4wMiA0LTUuMzQgNi4yNC01Ljk4IDgtNS45OCIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DiscordOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DiscordOutlined';
}
var _default = RefIcon;
