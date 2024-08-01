import type * as React from 'react';
export declare const fillRef: <T>(ref: React.Ref<T>, node: T) => void;
/**
 * Merge refs into one ref function to support ref passing.
 */
export declare const composeRef: <T>(...refs: React.Ref<T>[]) => React.Ref<T>;
export declare const useComposeRef: <T>(...refs: React.Ref<T>[]) => React.Ref<T>;
export declare const supportRef: (nodeOrComponent: any) => boolean;
interface RefAttributes<T> extends React.Attributes {
    ref: React.Ref<T>;
}
export declare const supportNodeRef: <T = any>(node: React.ReactNode) => node is React.ReactElement<any, string | React.JSXElementConstructor<any>> & RefAttributes<T>;
export {};
