/// <reference types="react" />
import type { Color } from '../color';
import type { ColorValueType } from '../interface';
declare const useColorState: (defaultStateValue: ColorValueType, option: {
    defaultValue?: ColorValueType;
    value?: ColorValueType;
}) => readonly [Color, (color: Color) => void, import("react").MutableRefObject<Color>];
export default useColorState;
