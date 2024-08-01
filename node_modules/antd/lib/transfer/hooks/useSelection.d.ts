import * as React from 'react';
import type { TransferKey } from '../interface';
export default function useSelection<T extends {
    key: TransferKey;
}>(leftDataSource: T[], rightDataSource: T[], selectedKeys?: TransferKey[]): [
    sourceSelectedKeys: TransferKey[],
    targetSelectedKeys: TransferKey[],
    setSourceSelectedKeys: React.Dispatch<React.SetStateAction<TransferKey[]>>,
    setTargetSelectedKeys: React.Dispatch<React.SetStateAction<TransferKey[]>>
];
