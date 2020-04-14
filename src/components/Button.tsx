import React from 'react';
import { IButtonProps } from '../types/types';

const Button = (props: IButtonProps) => {
    const {
        buttonText,
        clickButton,
        response,
        faIcon,
    } = props
    return (
        <>
            <button
                className='button'
                onClick={clickButton}>
                <b>{buttonText}
                    <i className={faIcon}></i>
                </b>
            </button>
            <p>{response}</p>
        </>
    )
}

export default Button;
