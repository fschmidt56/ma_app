import React, { useState } from 'react';
import { IInstructionProps } from '../types/types';
import Button from './Button';
import { usedIcons, license } from '../utils/MapConfig';
import Image from './Image';
import cc from '../img/cc.png';

const Instructions = (props: IInstructionProps) => {

    const [open, setOpen] = useState([false, true]);

    return (
        <>
            <div>
                <Button
                    buttonText={`Besuchte Orte markieren `}
                    faIcon={open[0] ? usedIcons[8] : usedIcons[7]}
                    clickButton={() => setOpen([!open[0], open[1]])}
                />
                <div className={open[0] ? 'notCollapsedInst' : 'collapsedInst'}>
                    <li>Zoome in die Karte hinein. Es erscheinen Hausumringe von allen Gebäuden im Stadtgebiet.</li>
                    <li>Wenn du an Corona erkrankt bist/warst, kannst du per Klick ein Gebäude selektieren in dem du dich kurz vor deiner Diagnose aufgehalten hast.</li>
                    <li>Wähle dann <i className={usedIcons[2]}></i> vom Menü links. Über den dortigen Button kannst du den Status des gewählten Gebäudes festlegen (true | besucht & false | nicht besucht).</li>
                    <li>Über den Update Button sendest du deinen gewählten Status an die Datenbank.</li>
                    <li>Du kannst frei entscheiden zu welchen Gebäuden du Informationen teilen möchtest. Du kannst den Status eines Gebäudes jederzeit wieder auf gleichem Weg ändern.</li>
                </div>
                <Button
                    buttonText={`Datenschutz `}
                    faIcon={open[1] ? usedIcons[8] : usedIcons[7]}
                    clickButton={() => setOpen([open[0], !open[1]])}
                />
                <div className={open[1] ? 'notCollapsedInst' : 'collapsedInst'}>
                    <li>Bei der Datenerhebung werden keine nutzerspezifischen Daten erfasst. Jedem User wird ein vom Server zufällig generiertes Pseudonym in Form eines 128-stelligen Tokens zugeordnet. Eine Registrierung ist nicht erforderlich.</li>
                    <li>Bei einem Update eines Gebäudes sendest du nur den gewählten Status von diesem. Gleichzeitig wird der Zeitpunkt der letzten Aktualisierung in der Datenbank gespeichert sowie das Pseudonym des Nutzers.</li>
                    <li>Die hier erfassten Daten dürfen nicht kommerziell oder für andere Zwecke genutzt werden. Sie dienen ausschließlich dem wissenschaftlichen Erkenntnisinteresse dieser Arbeit.</li>
                    <li>Du kannst die Ergebnisse der Datenerhebung live <a target='_blank' href='http://192.168.2.185:4000'>HIER</a> mitverfolgen.</li>
                    <li>Die dargestellten Hausumringe basieren auf einem Datensatz der <a target='_blank' href='https://www.bezreg-koeln.nrw.de/brk_internet/geobasis/liegenschaftskataster/hausumringe/index.html'> Bezirksregierung Köln</a>.</li>
                </div>
            </div>
        </>
    )
}

export default Instructions;
