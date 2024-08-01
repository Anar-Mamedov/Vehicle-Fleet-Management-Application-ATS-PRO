import type { ReactNode } from 'react';
import React from 'react';
export type BaseClosableType = {
    closeIcon?: React.ReactNode;
} & React.AriaAttributes;
export type ClosableType = boolean | BaseClosableType;
export type ContextClosable<T extends {
    closable?: ClosableType;
    closeIcon?: ReactNode;
} = any> = Partial<Pick<T, 'closable' | 'closeIcon'>>;
export declare function pickClosable<T extends {
    closable?: ClosableType;
    closeIcon?: ReactNode;
}>(context?: ContextClosable<T>): ContextClosable<T> | undefined;
export type UseClosableParams = {
    closable?: ClosableType;
    closeIcon?: ReactNode;
    defaultClosable?: boolean;
    defaultCloseIcon?: ReactNode;
    customCloseIconRender?: (closeIcon: ReactNode) => ReactNode;
    context?: ContextClosable;
};
/** Collection contains the all the props related with closable. e.g. `closable`, `closeIcon` */
interface ClosableCollection {
    closable?: ClosableType;
    closeIcon?: ReactNode;
}
export default function useClosable(propCloseCollection?: ClosableCollection, contextCloseCollection?: ClosableCollection | null, fallbackCloseCollection?: ClosableCollection & {
    /**
     * Some components need to wrap CloseIcon twice,
     * this method will be executed once after the final CloseIcon is calculated
     */
    closeIconRender?: (closeIcon: ReactNode) => ReactNode;
}): [closable: boolean, closeIcon: React.ReactNode | null];
export {};
