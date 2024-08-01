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
var _ApiTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ApiTwoTone"));
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
var ApiTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ApiTwoTone.default
    }));
};
/**![api](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0OC4yIDY3NC42em0xMDYuNy05Mi4zYy0yNSAyNS0zOC43IDU4LjEtMzguNyA5My40czEzLjggNjguNSAzOC43IDkzLjRjMjUgMjUgNTguMSAzOC43IDkzLjQgMzguNyAzNS4zIDAgNjguNS0xMy44IDkzLjQtMzguN2w1OS40LTU5LjQtMTg2LjgtMTg2LjgtNTkuNCA1OS40em00MjAuOC0zNjYuMWMtMzUuMyAwLTY4LjUgMTMuOC05My40IDM4LjdsLTU5LjQgNTkuNCAxODYuOCAxODYuOCA1OS40LTU5LjRjMjQuOS0yNSAzOC43LTU4LjEgMzguNy05My40cy0xMy44LTY4LjUtMzguNy05My40Yy0yNS0yNS01OC4xLTM4LjctOTMuNC0zOC43eiIgZmlsbD0iI2U2ZjRmZiIgLz48cGF0aCBkPSJNNTc4LjkgNTQ2LjdhOC4wMyA4LjAzIDAgMDAtMTEuMyAwTDUwMSA2MTMuMyA0MTAuNyA1MjNsNjYuNy02Ni43YzMuMS0zLjEgMy4xLTguMiAwLTExLjNMNDQxIDQwOC42YTguMDMgOC4wMyAwIDAwLTExLjMgMEwzNjMgNDc1LjNsLTQzLTQzYTcuODUgNy44NSAwIDAwLTUuNy0yLjNjLTIgMC00LjEuOC01LjcgMi4zTDIwNi44IDUzNC4yYTE5OS40NSAxOTkuNDUgMCAwMC01OC42IDE0MC40Yy0uMiAzOS41IDExLjIgNzkuMSAzNC4zIDExMy4xbC03Ni4xIDc2LjFhOC4wMyA4LjAzIDAgMDAwIDExLjNsNDIuNCA0Mi40YzEuNiAxLjYgMy42IDIuMyA1LjcgMi4zczQuMS0uOCA1LjctMi4zbDc2LjEtNzYuMWMzMy43IDIyLjkgNzIuOSAzNC4zIDExMi4xIDM0LjMgNTEuMiAwIDEwMi40LTE5LjUgMTQxLjUtNTguNmwxMDEuOS0xMDEuOWMzLjEtMy4xIDMuMS04LjIgMC0xMS4zbC00My00MyA2Ni43LTY2LjdjMy4xLTMuMSAzLjEtOC4yIDAtMTEuM2wtMzYuNi0zNi4yek00NDEuNyA3NjkuMWExMzEuMzIgMTMxLjMyIDAgMDEtOTMuNCAzOC43Yy0zNS4zIDAtNjguNC0xMy43LTkzLjQtMzguNy0yNC45LTI0LjktMzguNy01OC4xLTM4LjctOTMuNHMxMy43LTY4LjQgMzguNy05My40bDU5LjQtNTkuNCAxODYuOCAxODYuOC01OS40IDU5LjR6bTQ3Ni02MjAuM2wtNDIuNC00Mi40Yy0xLjYtMS42LTMuNi0yLjMtNS43LTIuM3MtNC4xLjgtNS43IDIuM2wtNzYuMSA3Ni4xYTE5OS4yNyAxOTkuMjcgMCAwMC0xMTIuMS0zNC4zYy01MS4yIDAtMTAyLjQgMTkuNS0xNDEuNSA1OC42TDQzMi4zIDMwOC43YTguMDMgOC4wMyAwIDAwMCAxMS4zTDcwNCA1OTEuN2MxLjYgMS42IDMuNiAyLjMgNS43IDIuMyAyIDAgNC4xLS44IDUuNy0yLjNsMTAxLjktMTAxLjljNjguOS02OSA3Ny0xNzUuNyAyNC4zLTI1My41bDc2LjEtNzYuMWMzLjEtMy4yIDMuMS04LjMgMC0xMS40ek03NjkuMSA0NDEuN2wtNTkuNCA1OS40LTE4Ni44LTE4Ni44IDU5LjQtNTkuNGMyNC45LTI0LjkgNTguMS0zOC43IDkzLjQtMzguN3M2OC40IDEzLjcgOTMuNCAzOC43YzI0LjkgMjQuOSAzOC43IDU4LjEgMzguNyA5My40cy0xMy44IDY4LjQtMzguNyA5My40eiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ApiTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ApiTwoTone';
}
var _default = RefIcon;
