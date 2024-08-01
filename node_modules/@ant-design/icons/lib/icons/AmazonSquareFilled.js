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
var _AmazonSquareFilled = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/AmazonSquareFilled"));
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
var AmazonSquareFilled = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _AmazonSquareFilled.default
    }));
};
/**![amazon-square](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg4MCAxMTJIMTQ0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY3MzZjMCAxNy43IDE0LjMgMzIgMzIgMzJoNzM2YzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE0NGMwLTE3LjctMTQuMy0zMi0zMi0zMnpNNTQ3LjggMzI2LjdjLTcuMi0xMC45LTIwLjEtMTYuNC0zOC43LTE2LjQtMS4zIDAtMyAuMS01LjMuMy0yLjIuMi02LjYgMS41LTEyLjkgMy43YTc5LjQgNzkuNCAwIDAwLTE3LjkgOS4xYy01LjUgMy44LTExLjUgMTAtMTggMTguNC02LjQgOC41LTExLjUgMTguNC0xNS4zIDI5LjhsLTk0LTguNGMwLTEyLjQgMi40LTI0LjcgNy0zNi45czExLjgtMjMuOSAyMS40LTM1YzkuNi0xMS4yIDIxLjEtMjEgMzQuNS0yOS40IDEzLjQtOC41IDI5LjYtMTUuMiA0OC40LTIwLjMgMTguOS01LjEgMzkuMS03LjYgNjAuOS03LjYgMjEuMyAwIDQwLjYgMi42IDU3LjggNy43IDE3LjIgNS4yIDMxLjEgMTEuNSA0MS40IDE5LjFhMTE3IDExNyAwIDAxMjUuOSAyNS43YzYuOSA5LjYgMTEuNyAxOC41IDE0LjQgMjYuNyAyLjcgOC4yIDQgMTUuNyA0IDIyLjh2MTgyLjVjMCA2LjQgMS40IDEzIDQuMyAxOS44IDIuOSA2LjggNi4zIDEyLjggMTAuMiAxOCAzLjkgNS4yIDcuOSA5LjkgMTIgMTQuMyA0LjEgNC4zIDcuNiA3LjcgMTAuNiA5LjlsNC4xIDMuNC03Mi41IDY5LjRjLTguNS03LjctMTYuOS0xNS40LTI1LjItMjMuNC04LjMtOC0xNC41LTE0LTE4LjUtMTguMWwtNi4xLTYuMmMtMi40LTIuMy01LTUuNy04LTEwLjItOC4xIDEyLjItMTguNSAyMi44LTMxLjEgMzEuOC0xMi43IDktMjYuMyAxNS42LTQwLjcgMTkuNy0xNC41IDQuMS0yOS40IDYuNS00NC43IDcuMS0xNS4zLjYtMzAtMS41LTQzLjktNi41LTEzLjktNS0yNi41LTExLjctMzcuNi0yMC4zLTExLjEtOC42LTE5LjktMjAuMi0yNi41LTM1LTYuNi0xNC44LTkuOS0zMS41LTkuOS01MC40IDAtMTcuNCAzLTMzLjMgOC45LTQ3LjcgNi0xNC41IDEzLjYtMjYuNSAyMy0zNi4xIDkuNC05LjYgMjAuNy0xOC4yIDM0LTI1LjdzMjYuNC0xMy40IDM5LjItMTcuN2MxMi44LTQuMiAyNi42LTcuOCA0MS41LTEwLjcgMTQuOS0yLjkgMjcuNi00LjggMzguMi01LjcgMTAuNi0uOSAyMS4yLTEuNiAzMS44LTJ2LTM5LjRjMC0xMy41LTIuMy0yMy41LTYuNy0zMC4xem0xODAuNSAzNzkuNmMtMi44IDMuMy03LjUgNy44LTE0LjEgMTMuNXMtMTYuOCAxMi43LTMwLjUgMjEuMWMtMTMuNyA4LjQtMjguOCAxNi00NSAyMi45LTE2LjMgNi45LTM2LjMgMTIuOS02MC4xIDE4LTIzLjcgNS4xLTQ4LjIgNy42LTczLjMgNy42LTI1LjQgMC01MC43LTMuMi03Ni4xLTkuNi0yNS40LTYuNC00Ny42LTE0LjMtNjYuOC0yMy43LTE5LjEtOS40LTM3LjYtMjAuMi01NS4xLTMyLjItMTcuNi0xMi4xLTMxLjctMjIuOS00Mi40LTMyLjUtMTAuNi05LjYtMTkuNi0xOC43LTI2LjgtMjcuMS0xLjctMS45LTIuOC0zLjYtMy4yLTUuMS0uNC0xLjUtLjMtMi44LjMtMy43LjYtLjkgMS41LTEuNiAyLjYtMi4yYTcuNDIgNy40MiAwIDAxNy40LjhjNDAuOSAyNC4yIDcyLjkgNDEuMyA5NS45IDUxLjQgODIuOSAzNi40IDE2OCA0NS43IDI1NS4zIDI3LjkgNDAuNS04LjMgODIuMS0yMi4yIDEyNC45LTQxLjggMy4yLTEuMiA2LTEuNSA4LjMtLjkgMi4zLjYgMy41IDIuNCAzLjUgNS40IDAgMi44LTEuNiA2LjMtNC44IDEwLjJ6bTU5LjktMjljLTEuOCAxMS4xLTQuOSAyMS42LTkuMSAzMS44LTcuMiAxNy4xLTE2LjMgMzAtMjcuMSAzOC40LTMuNiAyLjktNi40IDMuOC04LjMgMi44LTEuOS0xLTEuOS0zLjUgMC03LjQgNC41LTkuMyA5LjItMjEuOCAxNC4yLTM3LjcgNS0xNS44IDUuNy0yNiAyLjEtMzAuNS0xLjEtMS41LTIuNy0yLjYtNS0zLjYtMi4yLS45LTUuMS0xLjUtOC42LTEuOXMtNi43LS42LTkuNC0uOGMtMi44LS4yLTYuNS0uMi0xMS4yIDAtNC43LjItOCAuNC0xMC4xLjZhODc0LjQgODc0LjQgMCAwMS0xNy4xIDEuNWMtMS4zLjItMi43LjQtNC4xLjUtMS41LjEtMi43LjItMy41LjNsLTIuNy4zYy0xIC4xLTEuNy4yLTIuMi4yaC0zLjJsLTEtLjItLjYtLjUtLjUtLjljLTEuMy0zLjMgMy43LTcuNCAxNS0xMi40czIyLjMtOC4xIDMyLjktOS4zYzkuOC0xLjUgMjEuMy0xLjUgMzQuNS0uM3MyMS4zIDMuNyAyNC4zIDcuNGMyLjMgMy41IDIuNSAxMC43LjcgMjEuN3pNNDg1IDQ2Ny41Yy0xMS42IDQuOS0yMC45IDEyLjItMjcuOCAyMi02LjkgOS44LTEwLjQgMjEuNi0xMC40IDM1LjUgMCAxNy44IDcuNSAzMS41IDIyLjQgNDEuMiAxNC4xIDkuMSAyOC45IDExLjQgNDQuNCA2LjggMTcuOS01LjIgMzAtMTcuOSAzNi40LTM4LjEgMy05LjMgNC41LTE5LjcgNC41LTMxLjN2LTUwLjJjLTEyLjYuNC0yNC40IDEuNi0zNS41IDMuNy0xMS4xIDIuMS0yMi40IDUuNi0zNCAxMC40eiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(AmazonSquareFilled);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'AmazonSquareFilled';
}
var _default = RefIcon;
