
import { Map, Geolocation } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import VectorLayer from 'ol/layer/Vector';
import Select from 'ol/interaction/Select';
import XYZSource from 'ol/source/XYZ';
import { baseLayerUrl, geoserverWfsUrl, view, locationFeature } from './MapConfig';
import { selectedStyle, defaultStyle } from './MapStyles';
import Point from 'ol/geom/Point';

export class MapUtils {
    static createBaseLayer() {
        const xyzURL: string = baseLayerUrl;
        const baseSource: XYZSource = new XYZSource({
            url: xyzURL
        });
        const baseLayer: TileLayer = new TileLayer({
            source: baseSource
        });

        return baseLayer;
    }

    static createMap() {
        const baseLayer: TileLayer = this.createBaseLayer();
        const map: Map = new Map({
            target: 'map',
            layers: [baseLayer],
            view: view
        });
        return map;
    }
    //creates a vector source based on a publised geoserver layer
    static createSource(typename: string) {
        const source: VectorSource = new VectorSource({
            format: new GeoJSON(),
            url: function (extent: number[]) {
                return `${geoserverWfsUrl}
                &request=GetFeature&typename=${typename}
                &outputFormat=application/json&propertyName=(geom,visited)&
                &srsname=EPSG:3857&bbox=${extent.join(',')},EPSG:3857`;
            },
            strategy: bboxStrategy,
        });
        return source;
    }
    //creates a vector layer based on a vector source from a published geoserver layer
    static createVector(typename: string) {
        const vectorSource: VectorSource = this.createSource(typename);
        const vectorLayer: VectorLayer = new VectorLayer({
            source: vectorSource,
            extent: vectorSource.getExtent(),
            style: defaultStyle,
        });
        vectorLayer.setMinZoom(16)
        return vectorLayer;
    }
    //creates select interaction
    static createSelect(): Select {
        const select: Select = new Select({
            style: selectedStyle
        });
        return select;
    }

    static createGeolocation(map: Map | null): Geolocation {
        const geolocation = new Geolocation({
            tracking: true,
            projection: 'EPSG:3857',
        });
        locationFeature.setGeometryName('geom');
        geolocation.on('change', function () {
            let coordinate: number[] = geolocation.getPosition();
            let track: Point = locationFeature.getGeometry() as Point;
            track.setCoordinates(coordinate);
            let center =  track.getLastCoordinate();
            view.animate({
                zoom: 18,
                duration: 3000,
                center: center,
            })
            geolocation.setTracking(false)
        });
        let trackLayer = new VectorLayer({
            source: new VectorSource({
                features: [locationFeature],
            }),
        });
        map!.addLayer(trackLayer);
        alert('User successfully located. Map will zoom to current location. Your position will not be tracked.')
        return geolocation;
    }

    static removeLastLayer(map: Map | null) {
        const layers = map!.getLayers().getArray();
        const layer = layers[layers.length - 1] as VectorLayer;
        layer.getSource().clear();
    }
}