import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { FeatureLike } from "ol/Feature";

export const activeToggleColor: string = 'rgba(141,174,16,1)';
export const strokeOpacity: number = 0.75;
export const fillOpacity: number = 0.25;
export const selectedColor: string[] = [
    `rgba(141,174, 16,${strokeOpacity})`,
    `rgba(141,174, 16,${fillOpacity})`,
];
export const defaultColor: string[] = [
    `rgba(0,53,96,${strokeOpacity})`,
    `rgba(0,103,188,${fillOpacity})`,
];
export const trackColor: string[] = [
    `rgba(168,0,2,${strokeOpacity})`,
    `rgba(50,188,0,${strokeOpacity})`
] 

export const insertedStyle: Style = new Style({
    stroke: new Stroke({
        color: trackColor[1],
        width: 2,
    }),
});

export const selectedStyle = new Style({
    stroke: new Stroke({
        color: selectedColor[0],
        width: 3,
    }),
    fill: new Fill({
        color: selectedColor[1],
    })
});

export function defaultStyle(feature: FeatureLike): Style {
    let style: Style = new Style({
        stroke: new Stroke({
            color: feature.get('visited') ? selectedColor[0] : defaultColor[0],
            width: 1
        }),
        fill: new Fill({
            color: feature.get('visited') ? selectedColor[1] : defaultColor[1],
        })
    });
    return style;
}
