import React, { useState, useEffect } from 'react';
import { IInstructionProps } from '../types/types';
import Button from './Button';
import { usedIcons } from '../utils/MapConfig';


const Instructions = (props: IInstructionProps) => {
    const { token, handleToken } = props
    const [open, setOpen] = useState([false, true, false]);

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
                <Button
                    buttonText={`Besuchte Orte markieren `}
                    faIcon={open[0] ? usedIcons[8] : usedIcons[7]}
                    clickButton={() => setOpen([!open[0], open[1], open[2]])}
                />
                <div className={open[0] ? 'notCollapsedInst' : 'collapsedInst'}>
                    <li>Zoome in die Karte hinein. Es erscheinen Hausumringe von allen Gebäuden im Stadtgebiet.</li>
                    <li>Wenn du an Corona erkrankt bist/warst, kannst du per Klick ein Gebäude selektieren in dem du dich kurz vor deiner Diagnose aufgehalten hast.</li>
                    <li>Wähle dann <i className={usedIcons[2]}></i> vom Menü links. Über den dortigen Button kannst du den Status des gewählten Gebäudes festlegen (besucht oder unbesucht).</li>
                    <li>Über den Update Button sendest du deinen gewählten Status an die Datenbank.</li>
                    <li>Du kannst frei entscheiden zu welchen Gebäuden du Informationen teilen möchtest. Es ist für Dritte nicht ersichtlich welche Gebäude du editierst. Die Daten werden direkt bei der Erfassung auf Stadtteil/PLZ-Ebene aggregiert.</li>
                </div>
                <Button
                    buttonText={`Datenschutz `}
                    faIcon={open[1] ? usedIcons[8] : usedIcons[7]}
                    clickButton={() => setOpen([open[0], !open[1], open[2]])}
                />
                <div className={open[1] ? 'notCollapsedInst' : 'collapsedInst'}>
                    <li>Bei der Datenerhebung werden keine nutzerspezifischen Daten erfasst. Jedem User wird ein zufällig generiertes Pseudonym in Form eines Tokens zugeordnet. Eine Registrierung ist nicht erforderlich. Die Daten werden nach Abschluss des Projektes gelöscht.</li>
                    <li>Bei einem Update eines Gebäudes sendest du nur den gewählten Status von diesem. Gleichzeitig wird der Zeitpunkt der letzten Aktualisierung in der Datenbank gespeichert sowie das Pseudonym des Nutzers. Letzteres wird getrennt vom jeweiligen Gebäudedatensatz abgespeichert, sodass für Dritte nicht nachvollzogen werden kann welches Gebäude du editiert hast.</li>
                    <li>Die hier erfassten Daten dürfen nicht kommerziell oder für andere Zwecke genutzt werden. Sie dienen ausschließlich dem wissenschaftlichen Erkenntnisinteresse dieser Arbeit.</li>
                    <li>Die dargestellten Hausumringe basieren auf einem Datensatz der <a target='_blank' href='https://www.bezreg-koeln.nrw.de/brk_internet/geobasis/liegenschaftskataster/hausumringe/index.html'> Bezirksregierung Köln</a>.</li>
                    <li>Falls du nicht möchtest, dass nachvollzogen werden kann wie viele Datensätze von dir editiert worden sind, kannst du dein Pseudonym nach jeder Änderung erneuern.</li>
                    <li>Falls du komplett anonym Daten beitragen möchtest, kannst du über den Button oben jederzeit dein Pseudonym entfernen.</li>
                </div>
                <Button
                    buttonText={`Impressum `}
                    faIcon={open[2] ? usedIcons[8] : usedIcons[7]}
                    clickButton={() => setOpen([open[0], open[1], !open[2]])}
                />
                <div className={open[2] ? 'notCollapsedInst' : 'collapsedInst'}>
                    <p className='imprinttext'>
                        Die Ruhr-Universität ist eine Körperschaft des Öffentlichen Rechts. Sie wird durch ihren Rektor Herrn Prof. Dr. Axel Schölmerich gesetzlich vertreten.
                        Zuständige Aufsichtsbehörde ist:
                        Ministerium für Innovation, Wissenschaft und Forschung des Landes Nordrhein-Westfalen
                        Völklinger Straße 49
                        40221 Düsseldorf<br></br>
                        Soweit nicht anders gekennzeichnet ist das Geographische Institut der Ruhr-Universität Bochum ist Urheber aller Texte, des Layouts und der Fotos auf allen Internetseiten, die auf dieses Impressum verweisen. Die Inhalte sind urheberrechtlich geschützt. Für alle anderen Inhalte auf www-Servern der Ruhr-Universität Bochum sind die jeweiligen Bereiche redaktionell verantwortlich.
                        Das Geographische Institut der Ruhr-Universität Bochum übernimmt keine Gewähr für die Richtigkeit und Vollständigkeit der auf seinen Internetseiten befindlichen Informationen. Das gleiche gilt für die Inhalte verlinkter Seiten.
                        Anfragen per Mail an: <a className='imprinttext' href='mailto:fabian.schmidt-c8t@rub.de'>Fabian Schmidt</a>
                    </p>                    
                </div>
            </div>
        </>
    )
}

export default Instructions;
