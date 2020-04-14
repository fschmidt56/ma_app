import React from 'react';
import { ITabProps } from '../types/types';

const Tab = (props: ITabProps): JSX.Element => {

    const {
        id,
        header,
        active,
    } = props

    const activeStatus = active ? ' active' : '';
    let closeIcon;
    if (typeof (props.closeIcon) === 'string')
        closeIcon = <i className={props.closeIcon} />;
    else if (typeof (props.closeIcon) === 'object')
        closeIcon = props.closeIcon;
    else {
        const closecls = props.position === 'right' ? "fa fa-caret-right" : "fa fa-caret-left";
        closeIcon = <i className={closecls} />
    }
    return (
        <>
            <div id={id} className={"sidebar-pane" + activeStatus}>
                <h1 className="sidebar-header">
                    {header}
                    <div className="sidebar-close" onClick={props.onClose}>
                        {closeIcon}
                    </div>
                </h1>
                {props.children}
            </div>
        </>
    )
}


export default Tab;

