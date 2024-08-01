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
var _ShopTwoTone = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/ShopTwoTone"));
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
var ShopTwoTone = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _ShopTwoTone.default
    }));
};
/**![shop](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIHZpZXdCb3g9IjY0IDY0IDg5NiA4OTYiIGZvY3VzYWJsZT0iZmFsc2UiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTgzOS41IDM0NGgtNjU1Yy0uMyAwLS41LjItLjUuNXY5MS4yYzAgNTkuOCA0OSAxMDguMyAxMDkuMyAxMDguMyA0MC43IDAgNzYuMi0yMiA5NS4xLTU0LjcgMi45LTUuMSA4LjQtOC4zIDE0LjMtOC4zczExLjMgMy4yIDE0LjMgOC4zYzE4LjggMzIuNyA1NC4zIDU0LjcgOTUgNTQuNyA0MC44IDAgNzYuNC0yMi4xIDk1LjEtNTQuOSAyLjktNSA4LjItOC4xIDEzLjktOC4xaC42YzUuOCAwIDExIDMuMSAxMy45IDguMSAxOC44IDMyLjggNTQuNCA1NC45IDk1LjIgNTQuOUM3OTEgNTQ0IDg0MCA0OTUuNSA4NDAgNDM1Ljd2LTkxLjJjMC0uMy0uMi0uNS0uNS0uNXoiIGZpbGw9IiNlNmY0ZmYiIC8+PHBhdGggZD0iTTg4MiAyNzIuMVYxNDRjMC0xNy43LTE0LjMtMzItMzItMzJIMTc0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnYxMjguMWMtMTYuNyAxLTMwIDE0LjktMzAgMzEuOXYxMzEuN2ExNzcgMTc3IDAgMDAxNC40IDcwLjRjNC4zIDEwLjIgOS42IDE5LjggMTUuNiAyOC45djM0NWMwIDE3LjYgMTQuMyAzMiAzMiAzMmg2NzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWNTM1YTE3NSAxNzUgMCAwMDE1LjYtMjguOWM5LjUtMjIuMyAxNC40LTQ2IDE0LjQtNzAuNFYzMDRjMC0xNy0xMy4zLTMwLjktMzAtMzEuOXpNMjE0IDE4NGg1OTZ2ODhIMjE0di04OHptMzYyIDY1Ni4xSDQ0OFY3MzZoMTI4djEwNC4xem0yMzQuNCAwSDY0MFY3MDRjMC0xNy43LTE0LjMtMzItMzItMzJINDE2Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnYxMzYuMUgyMTRWNTk3LjljMi45IDEuNCA1LjkgMi44IDkgNCAyMi4zIDkuNCA0NiAxNC4xIDcwLjQgMTQuMSAyNC40IDAgNDgtNC43IDcwLjQtMTQuMSAxMy44LTUuOCAyNi44LTEzLjIgMzguNy0yMi4xLjItLjEuNC0uMS42IDBhMTgwLjQgMTgwLjQgMCAwMDM4LjcgMjIuMWMyMi4zIDkuNCA0NiAxNC4xIDcwLjQgMTQuMXM0OC00LjcgNzAuNC0xNC4xYzEzLjgtNS44IDI2LjgtMTMuMiAzOC43LTIyLjEuMi0uMS40LS4xLjYgMGExODAuNCAxODAuNCAwIDAwMzguNyAyMi4xYzIyLjMgOS40IDQ2IDE0LjEgNzAuNCAxNC4xczQ4LTQuNyA3MC40LTE0LjFjMy0xLjMgNi0yLjYgOS00djI0Mi4yek04NDAgNDM1LjdjMCA1OS44LTQ5IDEwOC4zLTEwOS4zIDEwOC4zLTQwLjggMC03Ni40LTIyLjEtOTUuMi01NC45LTIuOS01LTguMS04LjEtMTMuOS04LjFoLS42Yy01LjcgMC0xMSAzLjEtMTMuOSA4LjFBMTA5LjI0IDEwOS4yNCAwIDAxNTEyIDU0NGMtNDAuNyAwLTc2LjItMjItOTUtNTQuNy0zLTUuMS04LjQtOC4zLTE0LjMtOC4zcy0xMS40IDMuMi0xNC4zIDguM2ExMDkuNjMgMTA5LjYzIDAgMDEtOTUuMSA1NC43QzIzMyA1NDQgMTg0IDQ5NS41IDE4NCA0MzUuN3YtOTEuMmMwLS4zLjItLjUuNS0uNWg2NTVjLjMgMCAuNS4yLjUuNXY5MS4yeiIgZmlsbD0iIzE2NzdmZiIgLz48L3N2Zz4=) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(ShopTwoTone);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'ShopTwoTone';
}
var _default = RefIcon;
