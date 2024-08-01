"use client";

import * as React from 'react';
import CheckOutlined from "@ant-design/icons/es/icons/CheckOutlined";
import CopyOutlined from "@ant-design/icons/es/icons/CopyOutlined";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import classNames from 'classnames';
import TransButton from '../../_util/transButton';
import Tooltip from '../../tooltip';
import { getNode, toList } from './util';
const CopyBtn = props => {
  const {
    prefixCls,
    copied,
    locale,
    iconOnly,
    tooltips,
    icon,
    loading: btnLoading,
    tabIndex,
    onCopy
  } = props;
  const tooltipNodes = toList(tooltips);
  const iconNodes = toList(icon);
  const {
    copied: copiedText,
    copy: copyText
  } = locale !== null && locale !== void 0 ? locale : {};
  const copyTitle = copied ? getNode(tooltipNodes[1], copiedText) : getNode(tooltipNodes[0], copyText);
  const systemStr = copied ? copiedText : copyText;
  const ariaLabel = typeof copyTitle === 'string' ? copyTitle : systemStr;
  return /*#__PURE__*/React.createElement(Tooltip, {
    key: "copy",
    title: copyTitle
  }, /*#__PURE__*/React.createElement(TransButton, {
    className: classNames(`${prefixCls}-copy`, {
      [`${prefixCls}-copy-success`]: copied,
      [`${prefixCls}-copy-icon-only`]: iconOnly
    }),
    onClick: onCopy,
    "aria-label": ariaLabel,
    tabIndex: tabIndex
  }, copied ? getNode(iconNodes[1], /*#__PURE__*/React.createElement(CheckOutlined, null), true) : getNode(iconNodes[0], btnLoading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(CopyOutlined, null), true)));
};
export default CopyBtn;