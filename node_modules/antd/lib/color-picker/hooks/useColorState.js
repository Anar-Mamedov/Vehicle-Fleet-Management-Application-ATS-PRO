"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _util = require("../util");
const INIT_COLOR_REF = {};
function hasValue(value) {
  return value !== undefined;
}
const useColorState = (defaultStateValue, option) => {
  const {
    defaultValue,
    value
  } = option;
  const prevColor = (0, _react.useRef)((0, _util.generateColor)(''));
  const [colorValue, _setColorValue] = (0, _react.useState)(() => {
    let mergedState;
    if (hasValue(value)) {
      mergedState = value;
    } else if (hasValue(defaultValue)) {
      mergedState = defaultValue;
    } else {
      mergedState = defaultStateValue;
    }
    const color = (0, _util.generateColor)(mergedState || '');
    prevColor.current = color;
    return color;
  });
  const setColorValue = color => {
    _setColorValue(color);
    prevColor.current = color;
  };
  const prevValue = (0, _react.useRef)(INIT_COLOR_REF);
  (0, _react.useEffect)(() => {
    // `useEffect` will be executed twice in strict mode even if the deps are the same
    // So we compare the value manually to avoid unnecessary update
    if (prevValue.current === value) {
      return;
    }
    prevValue.current = value;
    const newColor = (0, _util.generateColor)(hasValue(value) ? value || '' : prevColor.current);
    if (prevColor.current.cleared === true) {
      newColor.cleared = 'controlled';
    }
    setColorValue(newColor);
  }, [value]);
  return [colorValue, setColorValue, prevColor];
};
var _default = exports.default = useColorState;