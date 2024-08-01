import * as React from "react";
import type { IReactToPrintProps } from "../types/reactToPrintProps";
type UseReactToPrintHookReturn = (event?: unknown, content?: (() => React.ReactInstance | null)) => void;
export declare const useReactToPrint: (props: IReactToPrintProps) => UseReactToPrintHookReturn;
export {};
