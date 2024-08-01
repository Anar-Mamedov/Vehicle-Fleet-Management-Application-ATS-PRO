import * as React from 'react';
import type { ShowWave } from './interface';
declare const useWave: (nodeRef: React.RefObject<HTMLElement>, className: string, component?: 'Tag' | 'Button' | 'Checkbox' | 'Radio' | 'Switch') => ShowWave;
export default useWave;
