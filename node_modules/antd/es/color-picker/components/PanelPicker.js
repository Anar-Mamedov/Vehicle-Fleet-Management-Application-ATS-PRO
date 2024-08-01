"use client";

var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useContext } from 'react';
import RcColorPicker from '@rc-component/color-picker';
import { PanelPickerContext } from '../context';
import { generateColor } from '../util';
import ColorClear from './ColorClear';
import ColorInput from './ColorInput';
const PanelPicker = () => {
  const _a = useContext(PanelPickerContext),
    {
      prefixCls,
      allowClear,
      value,
      disabledAlpha,
      onChange,
      onClear,
      onChangeComplete
    } = _a,
    injectProps = __rest(_a, ["prefixCls", "allowClear", "value", "disabledAlpha", "onChange", "onClear", "onChangeComplete"]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, allowClear && ( /*#__PURE__*/React.createElement(ColorClear, Object.assign({
    prefixCls: prefixCls,
    value: value,
    onChange: clearColor => {
      onChange === null || onChange === void 0 ? void 0 : onChange(clearColor);
      onClear === null || onClear === void 0 ? void 0 : onClear();
    }
  }, injectProps))), /*#__PURE__*/React.createElement(RcColorPicker, {
    prefixCls: prefixCls,
    value: value === null || value === void 0 ? void 0 : value.toHsb(),
    disabledAlpha: disabledAlpha,
    onChange: (colorValue, type) => {
      onChange === null || onChange === void 0 ? void 0 : onChange(generateColor(colorValue), type, true);
    },
    onChangeComplete: colorValue => {
      onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(generateColor(colorValue));
    }
  }), /*#__PURE__*/React.createElement(ColorInput, Object.assign({
    value: value,
    onChange: onChange,
    prefixCls: prefixCls,
    disabledAlpha: disabledAlpha
  }, injectProps)));
};
export default PanelPicker;