import * as React from 'react';
import type { CopyConfig } from '../Base';
declare const useCopyClick: ({ copyConfig, children, }: {
    copyConfig: CopyConfig;
    children?: React.ReactNode;
}) => {
    copied: boolean;
    copyLoading: boolean;
    onClick: (e?: React.MouseEvent<HTMLDivElement>) => Promise<void>;
};
export default useCopyClick;
