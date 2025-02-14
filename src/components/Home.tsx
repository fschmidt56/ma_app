import React from 'react';
import { IHomeProps } from '../types/types';

const Home = (props: IHomeProps) => {

    return (
        <>
            <p>Dies ist ein Projekt im Rahmen einer Masterarbeit des <a target='_blank' href='https://www.geographie.ruhr-uni-bochum.de/news/'>Geographischen Instituts der Ruhr-Universität Bochum</a>.</p>
            <p>Dabei sollen <b>freiwillig & anonymisiert </b>Daten von an <b>COVID-19 erkrankten Personen im Stadtgebiet Kölns</b> erhoben werden.</p>
            <p>Ziel ist es darüber Erkenntnisse zu erlangen wie <b>Krankheitsfälle kleinräumig auf Stadtteil-/PLZ-Ebene innerhalb Kölns</b> verteilt sind und inwiefern <b>freiwillig erhobene Daten</b> einen Beitrag in diesem Kontext leisten können.</p>
            <p>Über den untenstehenden Button findest du eine Anleitung zur <b>Datenerhebung</b> und Informationen zum <b>Datenschutz</b>.</p>
        </>
    );
};

export default Home;