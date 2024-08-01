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
var _QuestionCircleTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/QuestionCircleTwoTone"));
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
var QuestionCircleTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _QuestionCircleTwoTone.default
    }));
};
/**![question-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0wIDgyMGMtMjA1LjQgMC0zNzItMTY2LjYtMzcyLTM3MnMxNjYuNi0zNzIgMzcyLTM3MiAzNzIgMTY2LjYgMzcyIDM3Mi0xNjYuNiAzNzItMzcyIDM3MnoiIGZpbGw9IiMxNjc3ZmYiIC8+PHBhdGggZD0iTTUxMiAxNDBjLTIwNS40IDAtMzcyIDE2Ni42LTM3MiAzNzJzMTY2LjYgMzcyIDM3MiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzItMTY2LjYtMzcyLTM3Mi0zNzJ6bTAgNjMyYy0yMi4xIDAtNDAtMTcuOS00MC00MHMxNy45LTQwIDQwLTQwIDQwIDE3LjkgNDAgNDAtMTcuOSA0MC00MCA0MHptNjIuOS0yMTkuNWE0OC4zIDQ4LjMgMCAwMC0zMC45IDQ0LjhWNjIwYzAgNC40LTMuNiA4LTggOGgtNDhjLTQuNCAwLTgtMy42LTgtOHYtMjEuNWMwLTIzLjEgNi43LTQ1LjkgMTkuOS02NC45IDEyLjktMTguNiAzMC45LTMyLjggNTIuMS00MC45IDM0LTEzLjEgNTYtNDEuNiA1Ni03Mi43IDAtNDQuMS00My4xLTgwLTk2LTgwcy05NiAzNS45LTk2IDgwdjcuNmMwIDQuNC0zLjYgOC04IDhoLTQ4Yy00LjQgMC04LTMuNi04LThWNDIwYzAtMzkuMyAxNy4yLTc2IDQ4LjQtMTAzLjNDNDMwLjQgMjkwLjQgNDcwIDI3NiA1MTIgMjc2czgxLjYgMTQuNSAxMTEuNiA0MC43QzY1NC44IDM0NCA2NzIgMzgwLjcgNjcyIDQyMGMwIDU3LjgtMzguMSAxMDkuOC05Ny4xIDEzMi41eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNNDcyIDczMmE0MCA0MCAwIDEwODAgMCA0MCA0MCAwIDEwLTgwIDB6bTE1MS42LTQxNS4zQzU5My42IDI5MC41IDU1NCAyNzYgNTEyIDI3NnMtODEuNiAxNC40LTExMS42IDQwLjdDMzY5LjIgMzQ0IDM1MiAzODAuNyAzNTIgNDIwdjcuNmMwIDQuNCAzLjYgOCA4IDhoNDhjNC40IDAgOC0zLjYgOC04VjQyMGMwLTQ0LjEgNDMuMS04MCA5Ni04MHM5NiAzNS45IDk2IDgwYzAgMzEuMS0yMiA1OS42LTU2IDcyLjctMjEuMiA4LjEtMzkuMiAyMi4zLTUyLjEgNDAuOS0xMy4yIDE5LTE5LjkgNDEuOC0xOS45IDY0LjlWNjIwYzAgNC40IDMuNiA4IDggOGg0OGM0LjQgMCA4LTMuNiA4LTh2LTIyLjdhNDguMyA0OC4zIDAgMDEzMC45LTQ0LjhjNTktMjIuNyA5Ny4xLTc0LjcgOTcuMS0xMzIuNSAwLTM5LjMtMTcuMi03Ni00OC40LTEwMy4zeiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(QuestionCircleTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'QuestionCircleTwoTone';
}
var _default = RefIcon;
