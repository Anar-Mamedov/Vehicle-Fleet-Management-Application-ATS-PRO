import type { CSSObject } from '@ant-design/cssinjs';
import type { CSSUtil } from 'antd/es/theme/util/genComponentStyleHook';
import type { AliasToken } from '../theme/interface';
export interface ArrowToken {
}
export declare function getArrowToken(token: AliasToken): ArrowToken;
export declare const genRoundedArrow: <T extends AliasToken & ArrowToken & CSSUtil>(token: T, bgColor: string, boxShadow: string) => CSSObject;
