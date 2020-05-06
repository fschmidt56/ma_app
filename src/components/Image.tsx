import React from 'react';
import { IImageProps } from '../types/types';

const Image = (props: IImageProps) => {

    const {
        link,
        img,
        altText,
    } = props

    return (
        <>
            <div className='image'>
                <a
                    href={link}
                    target='_blank'
                >
                    <img
                        src={img}
                        alt={altText}
                    />
                </a>
            </div>
        </>
    )
}

export default Image;
