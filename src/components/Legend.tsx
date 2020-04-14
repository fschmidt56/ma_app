import React from 'react';
import { ILegendProps } from '../types/types';
import SvgRect from './SVGRectangle';
import { selectedColor, defaultColor, trackColor } from '../utils/MapStyles';
import SvgLine from './SvgLine';

const Legend = (props: ILegendProps) => {

    const { title } = props
    return (
        <>
            <h3>{title}</h3>
            <SvgLine
                height='25'
                width='25'
                x={['3', '22']}
                y={['3', '22']}
                strokeWidth='2'
                strokeColor={trackColor[1]}
                label=' inserted tracks'
            />
            <SvgLine
                height='25'
                width='25'
                x={['3', '22']}
                y={['3', '22']}
                strokeWidth='2'
                strokeColor={trackColor[0]}
                label=' active tracks'
            />
            
            <SvgRect
                height='25'
                width='25'
                fillColor={selectedColor[0]}
                fillOpacity='0.5'
                strokeColor={selectedColor[1]}
                strokeOpacity='1'
                strokeWidth='5'
                label=' besuchte Gebäude'
            />
            <SvgRect
                height='25'
                width='25'
                fillColor={defaultColor[0]}
                fillOpacity='0.5'
                strokeColor={defaultColor[1]}
                strokeOpacity='1'
                strokeWidth='5'
                label=' nicht besuchte Gebäude'
            />
            <hr></hr>
        </>
    )
}

export default Legend;
