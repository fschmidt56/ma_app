import React from 'react';
import { ISidebarProps } from '../types/types';

const Sidebar = (props: ISidebarProps): JSX.Element => {

    const {
        id,
        selected,
        closeIcon,
    } = props


    function onClose(e: any) {
        e.preventDefault();
        e.stopPropagation();
        props.onClose && props.onClose();
    }

    function onOpen(e: any, tabid: string) {
        e.preventDefault();
        e.stopPropagation();
        props.doOpen && props.doOpen(tabid);
    }

    function renderTab(tab: any) {
        let icon: any;
        if (typeof (tab.props.faIcon) === 'string')
            icon = <i className={tab.props.faIcon} />;
        else if (typeof (tab.props.faIcon) === 'object')
            icon = tab.props.faIcon;
        const active: string = tab.props.id === selected ? ' active' : '';
        const disabled: string = tab.props.disabled ? ' disabled' : '';
        return (
            <li className={active + disabled} key={tab.props.id}>
                <a href={'#' + tab.props.id} role="tab" onClick={e => tab.props.disabled || onOpen(e, tab.props.id)}>
                    {icon}
                </a>
            </li>
        );
    }

    function renderPanes(children: any) {
        return React.Children.map(children,
            p => React.cloneElement(p, {
                onClose: onClose,
                closeIcon: closeIcon,
                active: p.props.id === selected,
                position: position || 'left'
            }));
    }

    const position: string = ' sidebar-' + (props.position || 'left');
    const collapsed: string = props.collapsed ? ' collapsed' : '';

    const tabs = React.Children.toArray(props.children).filter(c => !!c);
    //@ts-ignore
    const bottomtabs = tabs.filter(t => t.props.anchor === 'bottom');
    //@ts-ignore
    const toptabs = tabs.filter(t => t.props.anchor !== 'bottom');

    return (
        <>
            <div id={id} className={"sidebar leaflet-touch" + position + collapsed}> {/* ref={el => rootElement = el} */}
                <div className="sidebar-tabs">
                    <ul role="tablist">   {/* Top-aligned */}
                        {toptabs.map(t => renderTab(t))}
                    </ul>
                    <ul role="tablist">   {/* Bottom-aligned */}
                        {bottomtabs.map(t => renderTab(t))}
                    </ul>
                </div>
                <div className="sidebar-content">
                    {renderPanes(tabs)}
                </div>
            </div>
        </>
    )
}

export default Sidebar;