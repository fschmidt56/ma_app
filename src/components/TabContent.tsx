import React from 'react';
import { ITabContentProps } from '../types/types';

const TabContent = (props: ITabContentProps) => {
    const {content} = props

     return (
        <>
            <div>
                {content}
            </div>
        </>
    )
}

export default TabContent;
