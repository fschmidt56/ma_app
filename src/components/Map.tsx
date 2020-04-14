
import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import { IMapProps, IMapState } from '../types/types';
import { MapUtils } from '../utils/MapUtils';
import MapSidebar from './MapSidebar';
import { typeName } from '../utils/MapConfig';
import { insertedStyle } from '../utils/MapStyles';

const Basemap = (props: IMapProps) => {
    //@ts-ignore
    const [map, setMap] = useState<IMapState>(null);

    useEffect(() => {
        const basemap = MapUtils.createMap();
        setMap(basemap);
        const huLayer = MapUtils.createVector(typeName[0]);
        const trackLayer = MapUtils.createVector(typeName[1]);
        basemap.addLayer(huLayer);
        basemap.addLayer(trackLayer);
        trackLayer.setStyle(insertedStyle);
        const select = MapUtils.createSelect();
        basemap.addInteraction(select);
    }, []);

    return (
        <>
            <div id='map' className='map'></div>
            <MapSidebar map={map} />
        </>
    )
}

export default Basemap;