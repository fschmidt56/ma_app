import React, { useState, useEffect } from 'react';
import { IInstructionProps } from '../types/types';
import Button from './Button';
import { usedIcons } from '../utils/MapConfig';


const Instructions = (props: IInstructionProps) => {
    const { token, handleToken } = props
    const [open, setOpen] = useState([false, true]);

    async function hashUser() {
        fetch('http://corona.geomatik.ruhr-uni-bochum.de/api/hash')
            .then(response => response.json())
            .then(value => {
                localStorage.setItem('VgiUserToken', value)
                handleToken!(value)
            })

    }

    async function removeToken() {
        localStorage.removeItem('VgiUserToken')
        handleToken!(null)
    }

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
                    <li>Du kannst frei entscheiden zu welchen Gebäuden du Informationen teilen möchtest. Es ist für uns und andere nicht ersichtlich welche Gebäude du editierst. Die Daten werden direkt bei der Erfassung aggregiert.</li>
                </div>
                <Button
                    buttonText={`Datenschutz `}
                    faIcon={open[1] ? usedIcons[8] : usedIcons[7]}
                    clickButton={() => setOpen([open[0], !open[1]])}
                />
                <div className={open[1] ? 'notCollapsedInst' : 'collapsedInst'}>
                    <li>Bei der Datenerhebung werden keine nutzerspezifischen Daten erfasst. Jedem User wird ein zufällig generiertes Pseudonym in Form eines Tokens zugeordnet. Eine Registrierung ist nicht erforderlich. Die Daten werden nach Abschluss des Projektes gelöscht.</li>
                    <li>Bei einem Update eines Gebäudes sendest du nur den gewählten Status von diesem. Gleichzeitig wird der Zeitpunkt der letzten Aktualisierung in der Datenbank gespeichert sowie das Pseudonym des Nutzers. Letzteres wird getrennt vom jeweiligen Gebäudedatensatz abgespeichert, sodass nicht nachvollzogen werden kann welches Gebäude du editiert hast.</li>
                    <li>Die hier erfassten Daten dürfen nicht kommerziell oder für andere Zwecke genutzt werden. Sie dienen ausschließlich dem wissenschaftlichen Erkenntnisinteresse dieser Arbeit.</li>
                    <li>Die dargestellten Hausumringe basieren auf einem Datensatz der <a target='_blank' href='https://www.bezreg-koeln.nrw.de/brk_internet/geobasis/liegenschaftskataster/hausumringe/index.html'> Bezirksregierung Köln</a>.</li>
                    <li>Falls du nicht möchtest, dass nachvollzogen werden kann wie viele Datensätze von dir editiert worden sind, kannst du dein Pseudonym nach jeder Änderung erneuern.</li>
                    <li>Falls du komplett anonym Daten beitragen möchtest, kannst du über den Button unten jederzeit dein Pseudonym entfernen.</li>
                </div>
                <Button
                    buttonText={`Token erneuern `}
                    faIcon={`${usedIcons[9]}`}
                    clickButton={() => hashUser()}
                />
                {
                    token === null ?
                        <p>Ich möchte anonym Daten beitragen.</p>
                        :
                        <p>Ich erkläre mich einverstanden, dass mein Pseudonym für das wissenschaftliche Erkenntnisinteresse dieser Arbeit gespeichert wird. Es darf für keine anderen Zwecke verwendet werden. Erste 10 Zeichen des Tokens:<b> {token!.substring(0, 10)}</b></p>

                }
                <Button
                    buttonText={`Token entfernen `}
                    faIcon={`${usedIcons[10]}`}
                    clickButton={() => removeToken()}
                />

            </div>
        </>
    )
}

export default Instructions;
