import React from 'react';
import { ISvgRectProps } from '../types/types';

const SvgRect = (props: ISvgRectProps) => {

    const {
        width,
        height,
        fillColor,
        strokeColor,
        strokeWidth,
        fillOpacity,
        strokeOpacity,
        label
    } = props

    return (
        <>
            <svg width={width} height={height} >
                <rect
                    width={width}
                    height={height}
                    fill={fillColor}
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fillOpacity={fillOpacity}
                    strokeOpacity={strokeOpacity}
                />
            </svg>
            <span className='legendtext'>{label}</span><br></br>
        </>
    );
};

export default SvgRect;