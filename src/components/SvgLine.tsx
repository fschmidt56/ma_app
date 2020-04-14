import React from 'react';
import { ISvgLineProps } from '../types/types';

const SvgLine = (props: ISvgLineProps) => {

    const {
        width,
        height,
        strokeColor,
        strokeWidth,
        label,
        x,
        y,
    } = props

    return (
        <>
            <svg height={height} width={width}>
                <line
                    x1={x[0]}
                    y1={y[0]}
                    x2={x[1]}
                    y2={y[1]}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                />
            </svg>
            <span className='legendtext'>{label}</span><br></br>
        </>
    );
};

export default SvgLine;