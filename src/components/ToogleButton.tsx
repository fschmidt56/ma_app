import React from 'react';
import { IToggleProps } from '../types/types';

const ToggleButton = (props: IToggleProps) => {
    const {
        id,
        isOn,
        handleToggle,
        isOnColor,
        layerName
    } = props
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox "
                id={id}
                type="checkbox"
            />
            <label
                style={isOn ? { backgroundColor: isOnColor } : { backgroundColor: '' }}
                className="react-switch-label"
                htmlFor={id}
            >
                <span className={`react-switch-button`} /><p className="layerlabel">{layerName}</p>
            </label>
        </>
    )
}

export default ToggleButton;
