import React from 'react';
import { ILoadingProps } from '../types/types';

const Loading = (props: ILoadingProps) => {

    const {

    } = props

    return (
        <>
            <div className='loading'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </>
    )
}

export default Loading;