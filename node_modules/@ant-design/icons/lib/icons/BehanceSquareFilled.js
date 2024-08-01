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
var _BehanceSquareFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/BehanceSquareFilled"));
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
var BehanceSquareFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _BehanceSquareFilled.default
    }));
};
/**![behance-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnpNNTk4LjUgMzUwLjloMTM4LjR2MzMuN0g1OTguNXYtMzMuN3pNNTEyIDYyOC44YTg5LjUyIDg5LjUyIDAgMDEtMjcgMzFjLTExLjggOC4yLTI0LjkgMTQuMi0zOC44IDE3LjdhMTY3LjQgMTY3LjQgMCAwMS00NC42IDUuN0gyMzZWMzQyLjFoMTYxYzE2LjMgMCAzMS4xIDEuNSA0NC42IDQuMyAxMy40IDIuOCAyNC44IDcuNiAzNC40IDE0LjEgOS41IDYuNSAxNyAxNS4yIDIyLjMgMjYgNS4yIDEwLjcgNy45IDI0LjEgNy45IDQwIDAgMTcuMi0zLjkgMzEuNC0xMS43IDQyLjktNy45IDExLjUtMTkuMyAyMC44LTM0LjggMjguMSAyMS4xIDYgMzYuNiAxNi43IDQ2LjggMzEuNyAxMC40IDE1LjIgMTUuNSAzMy40IDE1LjUgNTQuOCAwIDE3LjQtMy4zIDMyLjMtMTAgNDQuOHpNNzkwLjggNTc2SDYxMi40YzAgMTkuNCA2LjcgMzggMTYuOCA0OCAxMC4yIDkuOSAyNC44IDE0LjkgNDMuOSAxNC45IDEzLjggMCAyNS41LTMuNSAzNS41LTEwLjQgOS45LTYuOSAxNS45LTE0LjIgMTguMS0yMS44aDU5LjhjLTkuNiAyOS43LTI0LjIgNTAuOS00NCA2My43LTE5LjYgMTIuOC00My42IDE5LjItNzEuNSAxOS4yLTE5LjUgMC0zNy0zLjItNTIuNy05LjMtMTUuMS01LjktMjguNy0xNC45LTM5LjktMjYuNWExMjEuMiAxMjEuMiAwIDAxLTI1LjEtNDEuMmMtNi4xLTE2LjktOS4xLTM0LjctOC45LTUyLjYgMC0xOC41IDMuMS0zNS43IDkuMS01MS43IDExLjUtMzEuMSAzNS40LTU2IDY1LjktNjguOSAxNi4zLTYuOCAzMy44LTEwLjIgNTEuNS0xMCAyMSAwIDM5LjIgNCA1NSAxMi4yYTExMS42IDExMS42IDAgMDEzOC42IDMyLjhjMTAuMSAxMy43IDE3LjIgMjkuMyAyMS43IDQ2LjkgNC4zIDE3LjMgNS44IDM1LjUgNC42IDU0Ljd6bS0xMjItOTUuNmMtMTAuOCAwLTE5LjkgMS45LTI2LjkgNS42LTcgMy43LTEyLjggOC4zLTE3LjIgMTMuNmE0OC40IDQ4LjQgMCAwMC05LjEgMTcuNGMtMS42IDUuMy0yLjcgMTAuNy0zLjEgMTYuMkg3MjNjLTEuNi0xNy4zLTcuNi0zMC4xLTE1LjYtMzkuMS04LjQtOC45LTIxLjktMTMuNy0zOC42LTEzLjd6bS0yNDguNS0xMC4xYzguNy02LjMgMTIuOS0xNi43IDEyLjktMzEgLjMtNi44LTEuMS0xMy41LTQuMS0xOS42LTIuNy00LjktNi43LTktMTEuNi0xMS45YTQ0LjggNDQuOCAwIDAwLTE2LjYtNmMtNi40LTEuMi0xMi45LTEuOC0xOS4zLTEuN2gtNzAuM3Y3OS43aDc2LjFjMTMuMS4xIDI0LjItMy4xIDMyLjktOS41em0xMS44IDcyYy05LjgtNy41LTIyLjktMTEuMi0zOS4yLTExLjJoLTgxLjh2OTRoODAuMmM3LjUgMCAxNC40LS43IDIxLjEtMi4xczEyLjctMy44IDE3LjgtNy4yYzUuMS0zLjMgOS4yLTcuOCAxMi4zLTEzLjYgMy01LjggNC41LTEzLjIgNC41LTIyLjEgMC0xNy43LTUtMzAuMi0xNC45LTM3Ljh6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(BehanceSquareFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'BehanceSquareFilled';
}
var _default = RefIcon;
