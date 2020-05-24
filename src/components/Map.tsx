
import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import { IMapProps, IMapState } from '../types/types';
import { MapUtils } from '../utils/MapUtils';
import MapSidebar from './MapSidebar';
import { typeName } from '../utils/MapConfig';

const Basemap = (props: IMapProps) => {
    //@ts-ignore
    const [map, setMap] = useState<IMapState>(null);

    useEffect(() => {
        const basemap = MapUtils.createMap();
        setMap(basemap);
        const huLayer = MapUtils.createVector(typeName[0]);
        basemap.addLayer(huLayer);
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