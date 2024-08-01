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
var _CodepenCircleOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/CodepenCircleOutlined"));
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
var CodepenCircleOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _CodepenCircleOutlined.default
    }));
};
/**![codepen-circle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ4OC4xIDQxNC43VjMwMy40TDMwMC45IDQyOGw4My42IDU1Ljh6bTI1NC4xIDEzNy43di03OS44bC01OS44IDM5Ljl6TTUxMiA2NEMyNjQuNiA2NCA2NCAyNjQuNiA2NCA1MTJzMjAwLjYgNDQ4IDQ0OCA0NDggNDQ4LTIwMC42IDQ0OC00NDhTNzU5LjQgNjQgNTEyIDY0em0yNzggNTMzYzAgMS4xLS4xIDIuMS0uMiAzLjEgMCAuNC0uMS43LS4yIDFhMTQuMTYgMTQuMTYgMCAwMS0uOCAzLjJjLS4yLjYtLjQgMS4yLS42IDEuNy0uMi40LS40LjgtLjUgMS4yLS4zLjUtLjUgMS4xLS44IDEuNi0uMi40LS40LjctLjcgMS4xLS4zLjUtLjcgMS0xIDEuNS0uMy40LS41LjctLjggMS0uNC40LS44LjktMS4yIDEuMy0uMy4zLS42LjYtMSAuOS0uNC40LS45LjgtMS40IDEuMS0uNC4zLS43LjYtMS4xLjgtLjEuMS0uMy4yLS40LjNMNTI1LjIgNzg2Yy00IDIuNy04LjYgNC0xMy4yIDQtNC43IDAtOS4zLTEuNC0xMy4zLTRMMjQ0LjYgNjE2LjljLS4xLS4xLS4zLS4yLS40LS4zbC0xLjEtLjhjLS41LS40LS45LS43LTEuMy0xLjEtLjMtLjMtLjYtLjYtMS0uOS0uNC0uNC0uOC0uOC0xLjItMS4zYTcgNyAwIDAxLS44LTFjLS40LS41LS43LTEtMS0xLjUtLjItLjQtLjUtLjctLjctMS4xLS4zLS41LS42LTEuMS0uOC0xLjYtLjItLjQtLjQtLjgtLjUtMS4yLS4yLS42LS40LTEuMi0uNi0xLjctLjEtLjQtLjMtLjgtLjQtMS4yLS4yLS43LS4zLTEuMy0uNC0yLS4xLS4zLS4xLS43LS4yLTEtLjEtMS0uMi0yLjEtLjItMy4xVjQyNy45YzAtMSAuMS0yLjEuMi0zLjEuMS0uMy4xLS43LjItMWExNC4xNiAxNC4xNiAwIDAxLjgtMy4yYy4yLS42LjQtMS4yLjYtMS43LjItLjQuNC0uOC41LTEuMi4yLS41LjUtMS4xLjgtMS42LjItLjQuNC0uNy43LTEuMS42LS45IDEuMi0xLjcgMS44LTIuNS40LS40LjgtLjkgMS4yLTEuMy4zLS4zLjYtLjYgMS0uOS40LS40LjktLjggMS4zLTEuMS40LS4zLjctLjYgMS4xLS44LjEtLjEuMy0uMi40LS4zTDQ5OC43IDIzOWM4LTUuMyAxOC41LTUuMyAyNi41IDBsMjU0LjEgMTY5LjFjLjEuMS4zLjIuNC4zbDEuMS44IDEuNCAxLjFjLjMuMy42LjYgMSAuOS40LjQuOC44IDEuMiAxLjMuNy44IDEuMyAxLjYgMS44IDIuNS4yLjQuNS43LjcgMS4xLjMuNS42IDEgLjggMS42LjIuNC40LjguNSAxLjIuMi42LjQgMS4yLjYgMS43LjEuNC4zLjguNCAxLjIuMi43LjMgMS4zLjQgMiAuMS4zLjEuNy4yIDEgLjEgMSAuMiAyLjEuMiAzLjFWNTk3em0tMjU0LjEgMTMuM3YxMTEuM0w3MjMuMSA1OTdsLTgzLjYtNTUuOHpNMjgxLjggNDcyLjZ2NzkuOGw1OS44LTM5Ljl6TTUxMiA0NTYuMWwtODQuNSA1Ni40IDg0LjUgNTYuNCA4NC41LTU2LjR6TTcyMy4xIDQyOEw1MzUuOSAzMDMuNHYxMTEuM2wxMDMuNiA2OS4xek0zODQuNSA1NDEuMkwzMDAuOSA1OTdsMTg3LjIgMTI0LjZWNjEwLjNsLTEwMy42LTY5LjF6IiAvPjwvc3ZnPg==) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(CodepenCircleOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'CodepenCircleOutlined';
}
var _default = RefIcon;
