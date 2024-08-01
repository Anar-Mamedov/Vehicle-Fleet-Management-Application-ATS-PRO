/// <reference types="react" />
import type { ArrowOffsetToken } from '../../style/placementArrow';
import type { ArrowToken } from '../../style/roundedArrow';
import type { GetDefaultToken } from '../../theme/internal';
export interface ComponentToken extends ArrowOffsetToken, ArrowToken {
    /**
     * @desc 文字提示 z-index
     * @descEN z-index of tooltip
     */
    zIndexPopup: number;
}
export declare const prepareComponentToken: GetDefaultToken<'Tooltip'>;
declare const _default: (prefixCls: string, injectStyle?: boolean) => readonly [(node: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, string, string | undefined];
export default _default;
