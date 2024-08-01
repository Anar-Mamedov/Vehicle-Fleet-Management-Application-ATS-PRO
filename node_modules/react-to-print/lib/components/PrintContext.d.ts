import * as React from "react";
export interface IPrintContextProps {
    handlePrint: (event?: unknown, content?: (() => React.ReactInstance | null)) => void;
}
export declare const PrintContext: React.Context<IPrintContextProps> | null;
export declare const PrintContextConsumer: React.Consumer<IPrintContextProps> | (() => null);
