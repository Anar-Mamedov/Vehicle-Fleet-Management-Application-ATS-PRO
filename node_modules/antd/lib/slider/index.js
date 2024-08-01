"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcSlider = _interopRequireDefault(require("rc-slider"));
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _SliderTooltip = _interopRequireDefault(require("./SliderTooltip"));
var _style = _interopRequireDefault(require("./style"));
var _useRafLock = _interopRequireDefault(require("./useRafLock"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getTipFormatter(tipFormatter, legacyTipFormatter) {
  if (tipFormatter || tipFormatter === null) {
    return tipFormatter;
  }
  if (legacyTipFormatter || legacyTipFormatter === null) {
    return legacyTipFormatter;
  }
  return val => typeof val === 'number' ? val.toString() : '';
}
const Slider = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      range,
      className,
      rootClassName,
      style,
      disabled,
      // Deprecated Props
      tooltipPrefixCls: legacyTooltipPrefixCls,
      tipFormatter: legacyTipFormatter,
      tooltipVisible: legacyTooltipVisible,
      getTooltipPopupContainer: legacyGetTooltipPopupContainer,
      tooltipPlacement: legacyTooltipPlacement,
      tooltip = {},
      onChangeComplete
    } = props,
    restProps = __rest(props, ["prefixCls", "range", "className", "rootClassName", "style", "disabled", "tooltipPrefixCls", "tipFormatter", "tooltipVisible", "getTooltipPopupContainer", "tooltipPlacement", "tooltip", "onChangeComplete"]);
  const {
    vertical
  } = props;
  const {
    direction,
    slider,
    getPrefixCls,
    getPopupContainer
  } = _react.default.useContext(_configProvider.ConfigContext);
  const contextDisabled = _react.default.useContext(_DisabledContext.default);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  // =============================== Open ===============================
  const [hoverOpen, setHoverOpen] = (0, _useRafLock.default)();
  const [focusOpen, setFocusOpen] = (0, _useRafLock.default)();
  const tooltipProps = Object.assign({}, tooltip);
  const {
    open: tooltipOpen,
    placement: tooltipPlacement,
    getPopupContainer: getTooltipPopupContainer,
    prefixCls: customizeTooltipPrefixCls,
    formatter: tipFormatter
  } = tooltipProps;
  const lockOpen = tooltipOpen !== null && tooltipOpen !== void 0 ? tooltipOpen : legacyTooltipVisible;
  const activeOpen = (hoverOpen || focusOpen) && lockOpen !== false;
  const mergedTipFormatter = getTipFormatter(tipFormatter, legacyTipFormatter);
  // ============================= Change ==============================
  const [dragging, setDragging] = (0, _useRafLock.default)();
  const onInternalChangeComplete = nextValues => {
    onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(nextValues);
    setDragging(false);
  };
  // ============================ Placement ============================
  const getTooltipPlacement = (placement, vert) => {
    if (placement) {
      return placement;
    }
    if (!vert) {
      return 'top';
    }
    return direction === 'rtl' ? 'left' : 'right';
  };
  // ============================== Style ===============================
  const prefixCls = getPrefixCls('slider', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls);
  const cls = (0, _classnames.default)(className, slider === null || slider === void 0 ? void 0 : slider.className, rootClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-lock`]: dragging
  }, hashId, cssVarCls);
  // make reverse default on rtl direction
  if (direction === 'rtl' && !restProps.vertical) {
    restProps.reverse = !restProps.reverse;
  }
  // ============================= Multiple =============================
  // Range config
  const [mergedRange, draggableTrack] = _react.default.useMemo(() => {
    if (!range) {
      return [false];
    }
    return typeof range === 'object' ? [true, range.draggableTrack] : [true, false];
  }, [range]);
  // ============================= Warning ==============================
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Slider');
    [['tooltipPrefixCls', 'prefixCls'], ['getTooltipPopupContainer', 'getPopupContainer'], ['tipFormatter', 'formatter'], ['tooltipPlacement', 'placement'], ['tooltipVisible', 'open']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      warning.deprecated(!(deprecatedName in props), deprecatedName, `tooltip.${newName}`);
    });
  }
  // ============================== Handle ==============================
  _react.default.useEffect(() => {
    const onMouseUp = () => {
      // Delay for 1 frame to make the click to enable hide tooltip
      // even when the handle is focused
      (0, _raf.default)(() => {
        setFocusOpen(false);
      }, 1);
    };
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  const useActiveTooltipHandle = mergedRange && !lockOpen;
  const handleRender = (node, info) => {
    const {
      index
    } = info;
    const nodeProps = node.props;
    const passedProps = Object.assign(Object.assign({}, nodeProps), {
      onMouseEnter: e => {
        var _a;
        setHoverOpen(true);
        (_a = nodeProps.onMouseEnter) === null || _a === void 0 ? void 0 : _a.call(nodeProps, e);
      },
      onMouseLeave: e => {
        var _a;
        setHoverOpen(false);
        (_a = nodeProps.onMouseLeave) === null || _a === void 0 ? void 0 : _a.call(nodeProps, e);
      },
      onMouseDown: e => {
        var _a;
        setFocusOpen(true);
        setDragging(true);
        (_a = nodeProps.onMouseDown) === null || _a === void 0 ? void 0 : _a.call(nodeProps, e);
      },
      onFocus: e => {
        var _a, _b;
        setFocusOpen(true);
        (_a = restProps.onFocus) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
        (_b = nodeProps.onFocus) === null || _b === void 0 ? void 0 : _b.call(nodeProps, e);
      },
      onBlur: e => {
        var _a, _b;
        setFocusOpen(false);
        (_a = restProps.onBlur) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
        (_b = nodeProps.onBlur) === null || _b === void 0 ? void 0 : _b.call(nodeProps, e);
      }
    });
    const cloneNode = /*#__PURE__*/_react.default.cloneElement(node, passedProps);
    const open = (!!lockOpen || activeOpen) && mergedTipFormatter !== null;
    // Wrap on handle with Tooltip when is single mode or multiple with all show tooltip
    if (!useActiveTooltipHandle) {
      return /*#__PURE__*/_react.default.createElement(_SliderTooltip.default, Object.assign({}, tooltipProps, {
        prefixCls: getPrefixCls('tooltip', customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
        title: mergedTipFormatter ? mergedTipFormatter(info.value) : '',
        open: open,
        placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
        key: index,
        overlayClassName: `${prefixCls}-tooltip`,
        getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
      }), cloneNode);
    }
    return cloneNode;
  };
  // ========================== Active Handle ===========================
  const activeHandleRender = useActiveTooltipHandle ? (handle, info) => {
    const cloneNode = /*#__PURE__*/_react.default.cloneElement(handle, {
      style: Object.assign(Object.assign({}, handle.props.style), {
        visibility: 'hidden'
      })
    });
    return /*#__PURE__*/_react.default.createElement(_SliderTooltip.default, Object.assign({}, tooltipProps, {
      prefixCls: getPrefixCls('tooltip', customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
      title: mergedTipFormatter ? mergedTipFormatter(info.value) : '',
      open: mergedTipFormatter !== null && activeOpen,
      placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
      key: "tooltip",
      overlayClassName: `${prefixCls}-tooltip`,
      getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
    }), cloneNode);
  } : undefined;
  // ============================== Render ==============================
  const mergedStyle = Object.assign(Object.assign({}, slider === null || slider === void 0 ? void 0 : slider.style), style);
  return wrapCSSVar(
  /*#__PURE__*/
  // @ts-ignore
  _react.default.createElement(_rcSlider.default, Object.assign({}, restProps, {
    step: restProps.step,
    range: mergedRange,
    draggableTrack: draggableTrack,
    className: cls,
    style: mergedStyle,
    disabled: mergedDisabled,
    ref: ref,
    prefixCls: prefixCls,
    handleRender: handleRender,
    activeHandleRender: activeHandleRender,
    onChangeComplete: onInternalChangeComplete
  })));
});
if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}
var _default = exports.default = Slider;