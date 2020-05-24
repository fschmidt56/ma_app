
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
import { wfsTransaction, usedIcons, updateParameters, geoserverFetchUrl } from '../utils/MapConfig';
import VectorLayer from 'ol/layer/Vector';
import { MapUtils } from '../utils/MapUtils';
import Legend from './Legend';
import Instructions from './Instructions';
import Home from './Home';
import Image from './Image';
import logo from '../img/rub_logo.png';
import Loading from './Loading';

const mapListeners = [];

const MapSidebar = (props: IMapSidebarProps): JSX.Element => {

    const { map } = props;

    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState<TSelectableTabs>('home');
    const [toggleValue, setToggleValue] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(new Feature());
    const [transactionResponse, setTransactionResponse] = useState('');
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
            setTransactionResponse('Updating')
            if (selectedFeature.getId()) {
                selectedFeature.unset('selected')
                selectedFeature.getId();
                selectedFeature.setGeometryName('geom');
                selectedFeature.set('visited', toggleValue);
                selectedFeature.set('edited_by', token);
                let xmlString = new XMLSerializer().serializeToString(
                    wfsTransaction.writeTransaction([], [selectedFeature], [], updateParameters)
                )
                let body = {
                    xml: xmlString,
                }
                fetch(geoserverFetchUrl, {
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                    .then(() => setTransactionResponse(`Gebäude mit id ${selectedFeature.getId()} erfolgreich editiert.`))
                    .then(() => setTimeout(() => setTransactionResponse(''), 3000))
                    .then(() => {
                        //@ts-ignore
                        const layer: VectorLayer = map!.getLayers().getArray()[1];
                        layer.getSource().clear();
                        layer.getSource().refresh();
                    })
                    .catch(error => console.log('Die Änderungen konnten nicht gespeichert werden.'));
            }
            else {
                setTransactionResponse('Kein Gebäude selektiert.')
                setTimeout(() => setTransactionResponse(''), 3000);
                return;
            }
        }
        else {
            setTransactionResponse('Die Änderungen konnten nicht gespeichert werden, probiere es bitte erneut.')
            setTimeout(() => setTransactionResponse(''), 3000);
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
                            <Image
                                altText='RUB-Logo'
                                img={logo}
                                link='https://www.geographie.ruhr-uni-bochum.de/forschung/geomatik/home-news/'
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
                            {
                                transactionResponse !== 'Updating' ?
                                    <Button
                                        buttonText='Update'
                                        response={transactionResponse}
                                        clickButton={saveData}
                                    />
                                    :
                                    <Loading />
                            }
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
                    header='Standort lokalisieren'
                    faIcon={usedIcons[3]}
                >
                    <TabContent content={
                        <>
                            <Button
                                buttonText='Standort lokalisieren'
                                clickButton={() => MapUtils.createGeolocation(map)}
                            />                            
                        </>
                    } />
                </Tab>
            </Sidebar>
        </>
    )
}

export default MapSidebar;