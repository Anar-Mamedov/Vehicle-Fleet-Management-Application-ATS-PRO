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
var _BugTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/BugTwoTone"));
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
var BugTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _BugTwoTone.default
    }));
};
/**![bug](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwOCA0MTJ2MjY4YzAgMzYuNzggOS42OCA3MS45NiAyNy44IDEwMi45YTIwNS4zOSAyMDUuMzkgMCAwMDczLjMgNzMuM0EyMDIuNjggMjAyLjY4IDAgMDA1MTIgODg0YzM2Ljc4IDAgNzEuOTYtOS42OCAxMDIuOS0yNy44YTIwNS4zOSAyMDUuMzkgMCAwMDczLjMtNzMuM0EyMDIuNjggMjAyLjY4IDAgMDA3MTYgNjgwVjQxMkgzMDh6bTQ4NCAxNzJ2OTZjMCA2LjUtLjIyIDEyLjk1LS42NiAxOS4zNUM4NTkuOTQgNzI4LjY0IDkwOCA3OTYuNyA5MDggODc2YTggOCAwIDAxLTggOGgtNTZhOCA4IDAgMDEtOC04YzAtNDQuMjQtMjMuOTQtODIuODktNTkuNTctMTAzLjdhMjc4LjYzIDI3OC42MyAwIDAxLTIyLjY2IDQ5LjAyIDI4MS4zOSAyODEuMzkgMCAwMS0xMDAuNDUgMTAwLjQ1QzYxMS44NCA5NDYuMDcgNTYzLjU1IDk2MCA1MTIgOTYwcy05OS44NC0xMy45My0xNDEuMzItMzguMjNhMjgxLjM5IDI4MS4zOSAwIDAxLTEwMC40NS0xMDAuNDUgMjc4LjYzIDI3OC42MyAwIDAxLTIyLjY2LTQ5LjAyQTExOS45NSAxMTkuOTUgMCAwMDE4OCA4NzZhOCA4IDAgMDEtOCA4aC01NmE4IDggMCAwMS04LThjMC03OS4zIDQ4LjA3LTE0Ny4zNiAxMTYuNjYtMTc2LjY1QTI4NC4xMiAyODQuMTIgMCAwMTIzMiA2ODB2LTk2SDg0YTggOCAwIDAxLTgtOHYtNTZhOCA4IDAgMDE4LThoMTQ4VjQxMmMtNzYuNzcgMC0xMzktNjIuMjMtMTM5LTEzOWE4IDggMCAwMTgtOGg2MGE4IDggMCAwMTggOCA2MyA2MyAwIDAwNjMgNjNoNTYwYTYzIDYzIDAgMDA2My02MyA4IDggMCAwMTgtOGg2MGE4IDggMCAwMTggOGMwIDc2Ljc3LTYyLjIzIDEzOS0xMzkgMTM5djEwMGgxNDhhOCA4IDAgMDE4IDh2NTZhOCA4IDAgMDEtOCA4SDc5MnpNMzY4IDI3MmE4IDggMCAwMS04IDhoLTU2YTggOCAwIDAxLTgtOGMwLTQwLjA0IDguNzgtNzYuNzUgMjUuOS0xMDguMDdhMTg0LjU3IDE4NC41NyAwIDAxNzQuMDMtNzQuMDNDNDI3LjI1IDcyLjc4IDQ2My45NiA2NCA1MDQgNjRoMTZjNDAuMDQgMCA3Ni43NSA4Ljc4IDEwOC4wNyAyNS45YTE4NC41NyAxODQuNTcgMCAwMTc0LjAzIDc0LjAzQzcxOS4yMiAxOTUuMjUgNzI4IDIzMS45NiA3MjggMjcyYTggOCAwIDAxLTggOGgtNTZhOCA4IDAgMDEtOC04YzAtMjguMzMtNS45NC01My4xNS0xNy4wOC03My41M2ExMTIuNTYgMTEyLjU2IDAgMDAtNDUuMzktNDUuNEM1NzMuMTUgMTQxLjk1IDU0OC4zMyAxMzYgNTIwIDEzNmgtMTZjLTI4LjMzIDAtNTMuMTUgNS45NC03My41MyAxNy4wOGExMTIuNTYgMTEyLjU2IDAgMDAtNDUuNCA0NS4zOUMzNzMuOTUgMjE4Ljg1IDM2OCAyNDMuNjcgMzY4IDI3MnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTMwOCA0MTJ2MjY4YzAgMzYuNzggOS42OCA3MS45NiAyNy44IDEwMi45YTIwNS4zOSAyMDUuMzkgMCAwMDczLjMgNzMuM0EyMDIuNjggMjAyLjY4IDAgMDA1MTIgODg0YzM2Ljc4IDAgNzEuOTYtOS42OCAxMDIuOS0yNy44YTIwNS4zOSAyMDUuMzkgMCAwMDczLjMtNzMuM0EyMDIuNjggMjAyLjY4IDAgMDA3MTYgNjgwVjQxMkgzMDh6IiBmaWxsPSIjZTZmNGZmIiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(BugTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'BugTwoTone';
}
var _default = RefIcon;
