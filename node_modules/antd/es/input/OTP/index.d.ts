import * as React from 'react';
import type { InputStatus } from '../../_util/statusUtils';
import type { SizeType } from '../../config-provider/SizeContext';
import type { Variant } from '../../form/hooks/useVariants';
export interface OTPRef {
    focus: VoidFunction;
    blur: VoidFunction;
    nativeElement: HTMLDivElement;
}
export interface OTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    prefixCls?: string;
    length?: number;
    variant?: Variant;
    rootClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: SizeType;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    formatter?: (value: string) => string;
    disabled?: boolean;
    status?: InputStatus;
    mask?: boolean | string;
}
declare const OTP: React.ForwardRefExoticComponent<OTPProps & React.RefAttributes<OTPRef>>;
export default OTP;
