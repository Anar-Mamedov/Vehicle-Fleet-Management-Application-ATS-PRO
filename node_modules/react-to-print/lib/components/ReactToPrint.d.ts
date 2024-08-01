import * as React from "react";
import type { IReactToPrintProps } from "../types/reactToPrintProps";
export declare class ReactToPrint extends React.Component<IReactToPrintProps> {
    private numResourcesToLoad;
    private resourcesLoaded;
    private resourcesErrored;
    static defaultProps: {
        copyStyles: boolean;
        pageStyle: string;
        removeAfterPrint: boolean;
        suppressErrors: boolean;
    };
    startPrint: (target: HTMLIFrameElement) => void;
    triggerPrint: (target: HTMLIFrameElement) => void;
    handleClick(_event?: unknown, content?: (() => React.ReactInstance | null)): void;
    handlePrint: (optionalContent?: (() => React.ReactInstance | null)) => void;
    handleRemoveIframe: (force?: boolean) => void;
    logMessages: (messages: unknown[], level?: 'error' | 'warning' | 'debug') => void;
    render(): React.JSX.Element | null;
}
