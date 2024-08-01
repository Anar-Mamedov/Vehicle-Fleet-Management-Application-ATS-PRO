import React from 'react';
export interface WaveProps {
    disabled?: boolean;
    children?: React.ReactNode;
    component?: 'Tag' | 'Button' | 'Checkbox' | 'Radio' | 'Switch';
}
declare const Wave: React.FC<WaveProps>;
export default Wave;
