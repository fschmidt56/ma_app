import React from 'react';
import { ILegendProps } from '../types/types';
import SvgRect from './SVGRectangle';
import { selectedColor, defaultColor } from '../utils/MapStyles';

const Legend = (props: ILegendProps) => {

    const { title } = props
    return (
        <>
            <h3>{title}</h3>
            <SvgRect
                height='25'
                width='25'
                fillColor={selectedColor[0]}
                fillOpacity='0.5'
                strokeColor={selectedColor[1]}
                strokeOpacity='1'
                strokeWidth='5'
                label=' selektierter Hausumring'
            />
            <SvgRect
                height='25'
                width='25'
                fillColor={defaultColor[0]}
                fillOpacity='0.5'
                strokeColor={defaultColor[1]}
                strokeOpacity='1'
                strokeWidth='5'
                label=' Hausumring'
            />
            <hr></hr>
        </>
    )
}

export default Legend;
