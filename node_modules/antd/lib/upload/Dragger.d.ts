import * as React from 'react';
import type { UploadProps } from './interface';
import type { UploadRef } from './Upload';
export type DraggerProps = UploadProps & {
    height?: number;
};
declare const Dragger: React.ForwardRefExoticComponent<UploadProps<any> & {
    height?: number | undefined;
} & React.RefAttributes<UploadRef<any>>>;
export default Dragger;
