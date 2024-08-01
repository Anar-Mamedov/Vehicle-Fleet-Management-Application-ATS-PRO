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
var _DockerOutlined = /*#__PURE__*/ _interop_require_default(require("@ant-design/icons-svg/lib/asn/DockerOutlined"));
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
var DockerOutlined = function(props, ref) {
    return /*#__PURE__*/ _react.createElement(_AntdIcon.default, _object_spread_props(_object_spread({}, props), {
        ref: ref,
        icon: _DockerOutlined.default
    }));
};
/**![docker](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTU1Ljg4IDQ4OC4yNGgtOTIuNjJ2LTgyLjc5aDkyLjYyem0wLTI4Ni4yNGgtOTIuNjJ2ODUuNTloOTIuNjJ6bTEwOS40NSAyMDMuNDVINTcyLjd2ODIuNzloOTIuNjJ6bS0yMTguOS0xMDEuMDJoLTkyLjYxdjg0LjE4aDkyLjZ6bTEwOS40NSAwaC05Mi42MXY4NC4xOGg5Mi42em0zODguNjkgMTQwLjNjLTE5LjY1LTE0LjAyLTY3LjM2LTE4LjIzLTEwMi40NC0xMS4yMi00LjItMzMuNjctMjMuODUtNjMuMTQtNTcuNTMtODkuOGwtMTkuNjUtMTIuNjItMTIuNjIgMTkuNjRjLTI1LjI2IDM5LjI5LTMyLjI4IDEwMy44My01LjYyIDE0NS45Mi0xMi42MyA3LjAyLTM2LjQ4IDE1LjQ0LTY3LjM1IDE1LjQ0SDY3LjU2Yy0xMi42MyA3MS41NiA4LjQyIDE2NC4xNiA2MS43NCAyMjcuM0MxODEuMjIgODAxLjEzIDI1OS44IDgzMiAzNjAuODMgODMyYzIyMC4zIDAgMzg0LjQ4LTEwMS4wMiA0NjAuMjUtMjg2LjI0IDI5LjQ3IDAgOTUuNDIgMCAxMjcuNy02My4xNCAxLjQtMi44IDkuODItMTguMjQgMTEuMjItMjMuODV6bS03MTcuMDQtMzkuMjhoLTkyLjYxdjgyLjc5aDkyLjZ6bTEwOS40NSAwaC05Mi42MXY4Mi43OWg5Mi42em0xMDkuNDUgMGgtOTIuNjF2ODIuNzloOTIuNnpNMzM2Ljk4IDMwNC40M2gtOTIuNjF2ODQuMTloOTIuNnoiIC8+PC9zdmc+) */ var RefIcon = /*#__PURE__*/ _react.forwardRef(DockerOutlined);
if (process.env.NODE_ENV !== 'production') {
    RefIcon.displayName = 'DockerOutlined';
}
var _default = RefIcon;
