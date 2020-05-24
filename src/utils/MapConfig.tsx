import { ITransactionsGeoserver } from "../types/types";
import WFS from 'ol/format/WFS';
import View from "ol/View";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

const baseLayerArr: string[] = [
    'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
];

export const baseLayerUrl: string = baseLayerArr[2];
export const mapCenter: number[] = [774577.0148,6610935.8641];
export const mapZoom: number = 13;
export const maxZoom: number = 19;
export const minZoom: number = 12;
export const rotationStatus: boolean = false;
export const view = new View({
    center: mapCenter,
    zoom: mapZoom,
    maxZoom: maxZoom,
    minZoom: minZoom,
    enableRotation: rotationStatus,
})
export const geoserverWfsUrl: string = 'http://192.168.2.185:8080/geoserver/pg/wfs?service=WFS&version=1.1.0';
export const typeName: string[] = [
    'pg:hu_koeln',
];
export const wfsTransaction: WFS = new WFS();

export const updateParameters: ITransactionsGeoserver<string, object[]> = {
    featureNS: 'pg',
    featurePrefix: 'pg',
    featureType: typeName[0],
    nativeElements: [],
    srsName: 'EPSG:3857',
};

export const insertParameters: ITransactionsGeoserver<string, object[]> = {
    featureNS: 'pg',
    featurePrefix: 'pg',
    featureType: typeName[1],
    nativeElements: [],
    srsName: 'EPSG:3857',
};

export const locationFeature: Feature = new Feature({
    geom: new Point([]),
})

export const usedIcons: string[] = [
    'fa fa-home',
    'fa fa-info',
    'fa fa-mouse-pointer',
    'fa fa-map-marker',
    'fa fa-twitter',
    'fa fa-cogs',
    'fa fa-result',
    'fa fa-chevron-down',
    'fa fa-chevron-up',
    'fa fa-lock',
];

export const geoserverFetchUrl = 'http://192.168.2.185:8000/handleGeoserver';
export const license = 'https://creativecommons.org/licenses/by-nc-nd/4.0/deed.de';


