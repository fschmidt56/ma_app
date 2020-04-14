
import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import { IMapSidebarProps, TSelectableTabs } from '../types/types';
import Sidebar from './Sidebar';
import Tab from './Tab';
import ToggleButton from './ToogleButton';
import TabContent from './TabContent';
import { Feature, MapBrowserEvent } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { activeToggleColor } from '../utils/MapStyles';
import Button from './Button';
import { geoserverWfsUrl, wfsTransaction, geoserverHeaders, trackFeature, usedIcons, insertParameters, updateParameters } from '../utils/MapConfig';
import VectorLayer from 'ol/layer/Vector';
import { MapUtils } from '../utils/MapUtils';
import LineString from 'ol/geom/LineString';
import Legend from './Legend';
import { Utils } from '../utils/Utils';
import MultiLineString from 'ol/geom/MultiLineString';
import Instructions from './Instructions';
import Home from './Home';

const mapListeners = [];

const MapSidebar = (props: IMapSidebarProps): JSX.Element => {

    const { map } = props;

    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState<TSelectableTabs>('home');
    const [toggleValue, setToggleValue] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(new Feature());
    const [transactionResponse, setTransactionResponse] = useState('');
    const [trackResponse, setTrackResponse] = useState('');
    const [token, setToken] = useState(localStorage.getItem('VgiUserToken'));

    function hashUser() {
        fetch('http://192.168.2.185:8000/hash')
            .then(response => response.json())
            .then(value => localStorage.setItem('VgiUserToken', value))
    }

    useEffect(() => {
        if (localStorage.getItem('VgiUserToken') === null) {
            hashUser()
        }
        else { return }
    }, [])

    function onClose() {
        setCollapsed(true);
        //@ts-ignore
        setSelected(undefined);
    }
    function onOpen(id: string) {
        setCollapsed(false)
        //@ts-ignore
        setSelected(id)
    };

    function onToggleChange() {
        setToggleValue(!toggleValue)
        selectedFeature.set('visited', !toggleValue)
    }

    const saveData = () => {
        if (selectedFeature) {
            if (selectedFeature.getId()) {
                selectedFeature.unset('selected')
                selectedFeature.getId();
                selectedFeature.setGeometryName('geom');
                selectedFeature.set('visited', toggleValue);
                selectedFeature.set('edited_by', token);
                let xmlString = new XMLSerializer().serializeToString(
                    wfsTransaction.writeTransaction([], [selectedFeature], [], updateParameters)
                )
                fetch(geoserverWfsUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: geoserverHeaders,
                    body: xmlString
                })
                    .then(response => setTransactionResponse(`Updated Location with id ${selectedFeature.getId()} successfully.`))
                    .then(() => setTimeout(() => setTransactionResponse(''), 3000))
                    .then(() => {
                        //@ts-ignore
                        const layer: VectorLayer = map!.getLayers().getArray()[1];
                        layer.getSource().clear();
                        layer.getSource().refresh();
                    })
                    .catch(error => console.log(error + 'Feature could not be updated.'));
            }
            else {
                setTransactionResponse('No feature selected.')
                setTimeout(() => setTransactionResponse(''), 3000);
                return;
            }
        }
        else {
            setTransactionResponse('Feature could not be updated.')
            setTimeout(() => setTransactionResponse(''), 3000);
            return;
        }
    }

    const saveTrack = () => {
        let linestring = trackFeature.getGeometry() as LineString;
        if (linestring) {
            const insertFeature = new Feature({
                geom: new MultiLineString([linestring])
            });
            insertFeature.set('user', 'fabi')
            let xmlString = new XMLSerializer().serializeToString(
                wfsTransaction.writeTransaction([insertFeature], [], [], insertParameters)
            )
            MapUtils.removeLastLayer(map)
            fetch(geoserverWfsUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: geoserverHeaders,
                body: xmlString
            })
                .then(response => setTrackResponse(`Track inserted to database with timestamp ${Utils.getDate()}.`))
                .then(() => {
                    //@ts-ignore
                    const layer: VectorLayer = map!.getLayers().getArray()[2];
                    layer.getSource().clear();
                    layer.getSource().refresh();
                })
                .then(() => setTimeout(() => setTrackResponse(''), 3000))
                .catch(error => console.log(error + 'Error while saving data.'));
        }
        else {
            setTrackResponse('No Track to save.');
            setTimeout(() => setTrackResponse(''), 3000);
            return;
        }
    }

    let prevSelected: Feature[] = []
    if (map) {
        if (mapListeners.length === 0) {
            const mapListener = map.on('click', function (e: MapBrowserEvent): void {
                map!.forEachFeatureAtPixel(e.pixel, (feature: Feature | FeatureLike): void => {
                    let castedFeature: Feature = feature as Feature;
                    prevSelected.unshift(castedFeature)
                    setSelectedFeature(prevSelected[0]);
                    prevSelected[0].set('selected', true);
                    if (prevSelected.length > 1) {
                        prevSelected[1].set('selected', false);
                    }
                    prevSelected.splice(1)
                });
            });
            mapListeners.push(mapListener);
        }
    }

    return (
        <>
            <Sidebar
                id='sidebar'
                collapsed={collapsed}
                selected={selected}
                onClose={onClose}
                //@ts-ignore
                doOpen={onOpen}
            >
                <Tab
                    id='home'
                    header='Beschreibung'
                    faIcon={usedIcons[0]}
                >
                    <TabContent content={
                        <>
                            <Home />
                            <Button
                                buttonText={`Informationen `}
                                faIcon={usedIcons[1]}
                                clickButton={() => setSelected('instructions')}
                            />
                        </>
                    }
                    />
                </Tab>
                <Tab
                    id='locations'
                    header='Besuchte Gebäude'
                    faIcon={usedIcons[2]}
                >
                    <TabContent content={
                        <>
                            <Legend
                                title='Legende'
                            />
                            <ToggleButton
                                id='toggleVisited'
                                isOn={selectedFeature.get('visited')}
                                isOnColor={activeToggleColor}
                                handleToggle={onToggleChange}
                            />
                            {
                                JSON.stringify(selectedFeature.get('visited'))
                            }
                            <Button
                                buttonText='Update'
                                response={transactionResponse}
                                clickButton={saveData}
                            />
                        </>
                    } />
                </Tab>
                <Tab
                    id='instructions'
                    header='Informationen'
                    faIcon={usedIcons[1]}
                    anchor='bottom'
                >
                    <TabContent content={
                        <>
                            <Instructions />
                        </>
                    }
                    />
                </Tab>
                <Tab
                    id='tracking'
                    header='Tracking'
                    faIcon={usedIcons[3]}
                >
                    <TabContent content={
                        <>
                            <Button
                                buttonText='Start tracking'
                                clickButton={() => MapUtils.createGeolocation(map)}
                            />
                            <Button
                                buttonText='Quit tracking'
                                clickButton={saveTrack}
                                response={trackResponse}
                            />
                        </>
                    } />
                </Tab>
                <Tab
                    id='user-infos'
                    header='Nutzerinformationen'
                    faIcon='fa fa-user'
                    anchor='bottom'
                >
                    <TabContent content={
                        <>
                            <li>Nutzer Token entfernen lassen, selbst generieren?</li>
                            <li>auf API hinweisen?</li>
                        </>
                    } />
                </Tab>
            </Sidebar>
        </>
    )
}

export default MapSidebar;