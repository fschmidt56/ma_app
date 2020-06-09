import { Map, Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';

//interfaces
export interface IButtonProps {
    buttonText: string | Element,
    clickButton?: any,
    response?: string,
    faIcon?: string,
    id?: string,
}

export interface IHomeProps {
    
}
export interface IImageProps {
    link: string,
    img: string,
    altText: string,
}

export interface IInstructionProps {
    token: string | null,
    handleToken?: (newToken: string | null) => void
}

export interface ILegendProps {
    title: string,
}

export interface ILoadingProps {
    
}
export interface IMapProps {
}

export interface IMapSidebarProps extends IMapState {
    map: Map | null,
}

export interface IMapState {
    map: Map | null,
}

export interface ISidebarProps {
    id: string,
    collapsed?: boolean,
    position?: TSidebarPosition,
    selected?: string | undefined,
    closeIcon?: TIcons,
    onClose?: () => void,
    doOpen?: (id: string | undefined) => void,
    children?: any,
    anchor?: string,
}

export interface ISvgLineProps {
    width: string,
    height: string,
    strokeColor: string,
    strokeWidth: string,
    label: string,
    x: string[],
    y: string[],
}

export interface ISvgRectProps {
    width: string,
    height: string,
    fillColor: string,
    strokeColor: string,
    strokeWidth: string,
    fillOpacity: string,
    strokeOpacity: string,
    label?: string
}

export interface ITabContentProps {
    content: string | JSX.Element | Element | Feature | FeatureLike,
}

export interface ITabProps {
    id: string,
    header: string,
    faIcon: TIcons,
    anchor?: TTabPosition,
    disabled?: boolean,
    onClose?: () => void,
    closeIcon?: TIcons,
    position?: TSidebarPosition,
    active?: boolean,
    children?: any,
}

export interface ITabListProps {

}

export interface IToggleProps {
    id: string,
    isOn: boolean,
    isOnColor: string,
    handleToggle: () => void,
    layerName?: string
}

export interface ITransactionsGeoserver<T, U> {
    featureNS: T,
    featurePrefix: T,
    featureType: T,
    nativeElements: U,
    srsName: T,
}

export interface ITwitterProps {
    profileUrl: string,
}
//types
export type TSidebarPosition = 'left' | 'right';
export type TTabPosition = 'top' | 'bottom';
export type TIcons = string | JSX.Element | Element;
export type TSelectableTabs = undefined | 'home' | 'instructions' | 'locations' | 'tracking' | 'user-infos'

//enums

export enum Projections {
    EPSG_4326 = 'EPSG:4326',
    EPSG_3857 = 'EPSG:3857'
}

