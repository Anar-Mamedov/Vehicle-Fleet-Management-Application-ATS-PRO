import * as React from 'react';
import type { Components, ItemType } from '../interface';
export declare function parseItems(children: React.ReactNode | undefined, items: ItemType[] | undefined, keyPath: string[], components: Components): React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
