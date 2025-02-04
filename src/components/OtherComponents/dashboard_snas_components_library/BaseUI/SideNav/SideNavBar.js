import React, { useState } from 'react'
import './SideNavBar.css';
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import AppLogo from "./AppLogo";

export default function SideNavBar(props) {
    const sideNavBarPinnedState = true
    const modules = ['agent', 'plant','nac']

    const handleSideNavBarDropDownClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let dropdownElement = event.currentTarget.closest(".sidebar-dropdown");
        dropdownElement.classList.add("clicked");
        let allDropDownElements = document.querySelectorAll('.sidebar-dropdown.dropdown-submenu-visible:not(.clicked)');
        Array.from(allDropDownElements).forEach(function (el) {
            if (!el.contains(dropdownElement)) {
                el.classList.remove('dropdown-submenu-visible');
            }
        });

        if (dropdownElement.classList.contains("dropdown-submenu-visible")) {
            dropdownElement.classList.remove("dropdown-submenu-visible");
        }
        else {
            dropdownElement.classList.add("dropdown-submenu-visible");
        }
        dropdownElement.classList.remove("clicked");
    }

    const handleSideNavBarLinkClick = (event) => {
        let linkElement = event.currentTarget.closest("a");
        linkElement.classList.add("active");
    }

    let initNavLinks = props.navLinks
    if(Array.isArray(initNavLinks)){
        initNavLinks.forEach((link_item)=>{
            if(link_item['onClick']){
                // let tempFunc = link_item['onClick']
                // link_item['onClick'] = null
                // link_item['onClick'] = (e)=>{ tempFunc(); handleSideNavBarLinkClick(e)}
            }
            else{
                link_item['onClick'] = handleSideNavBarLinkClick
            }
        })
    }
    
    const [sideNavBarList, setSideNavBarList] = useState(initNavLinks)

    const renderNavBarMainItem = (item, index) =>
        !item?null:
        item.type === 'break' ?
            <div className="sidebar-menu-header" key={index}>
                <hr />
            </div>
            : item.type === 'header' ?
                <div className="sidebar-menu-header" key={index}>
                    <hr />
                    <span className="w-100">{item.name}</span>
                </div>
                :
                item['children'] === undefined || (item.children.length === 0) ?
                    <Link to={item.link || '#'} className="text-decoration-none"  key={index}>
                        <div className="sidebar-item" onClick={item.onClick}>
                            <div className="sidebar-item-info active">
                                <span className="sidebar-item-icon">
                                    {item.icon}
                                </span>
                                <span className="sidebar-item-title">{item.name}</span>
                            </div>
                        </div>
                    </Link>
                    : <div className="sidebar-item sidebar-dropdown" key={index}>
                        <div className="sidebar-item-info sidebar-dropdown-info" onClick={handleSideNavBarDropDownClick}>
                            <span className="sidebar-item-icon">
                                {item.icon}
                            </span>
                            <span className="sidebar-item-title">{item.name}</span>
                        </div>
                        <div className="sidebar-dropdown-submenu">
                            {
                                item.children.map((childItem, index) => renderNavBarSubMenuItem(childItem, index))
                            }
                        </div>
                    </div>

    const renderNavBarSubMenuItem = (subMenuItem, index) =>
        !subMenuItem?null:
        subMenuItem['children'] === undefined || subMenuItem.children.length === 0 ?
            <Link to={subMenuItem.link || '#'} className="text-decoration-none" onClick={subMenuItem.onClick} key={index}>
                <div className="sidebar-dropdown-submenu-item">
                    <span className="sidebar-item-title">{subMenuItem.name}</span>
                </div>
            </Link>
            :
            <div className="sidebar-dropdown-submenu-items" key={index}>
                <div className="sidebar-dropdown-submenu-item sidebar-dropdown">
                    <div className="sidebar-dropdown-info" onClick={handleSideNavBarDropDownClick}>
                        <span className="sidebar-item-title">{subMenuItem.name}</span>
                    </div>
                    <div className="sidebar-dropdown-submenu">
                        <div className="sidebar-dropdown-submenu-items">
                            {
                                subMenuItem.children.map((childItem, index) => renderNavBarSubMenuItem(childItem, index))
                            }
                        </div>
                    </div>
                </div>
            </div>

    const appName = ( props.appInfo && props.appInfo.appName ) || 'APP'
    const appVersion = ( props.appInfo && props.appInfo.appVersion ) || '1.0.1'
    return (
        <>
            <div id="sideNavbarOverlay" className="sideNavbar-overlay" onClick={props.toggleSideNavBarToggleState}></div>
            <nav id="sideNavbar" className="sideNavbar-wrapper d-flex flex-column justify-content-between no-text-selection-allowed"
                onMouseEnter={() => {
                    // let pageWrapperClassNames = document.querySelector(".page-wrapper").classList;
                    // if (!(pageWrapperClassNames.contains('sidebar-hovered')) && pageWrapperClassNames.contains('pinned')) {
                    //     pageWrapperClassNames.add("sidebar-hovered");
                    // }
                    props.toggleSideNavBarHoverState()
                }}

                onMouseLeave={() => {
                    // let pageWrapperClassNames = document.querySelector(".page-wrapper").classList;
                    // if (pageWrapperClassNames.contains('sidebar-hovered')) {
                    //     pageWrapperClassNames.remove("sidebar-hovered");
                    // }
                    props.toggleSideNavBarHoverState()
                }}
            >
                <div className="sidebar-content">
                    <div className="sidebar-header app-color-bg d-flex flex-column justify-content-around align-items-center">
                        <div className="sidebar-brand d-flex w-100 h-100">
                            <div className="d-flex justify-content-center flex-nowrap align-items-center h-100 w-100">
                                <div className="sidebar-brand-logo d-flex flex-nowrap flex-shrink-0 justify-content-center">
                                    <AppLogo size={"40px"} contrastLogo={true} />
                                </div>
                                <div className="sidebar-brand-name my-0 flex-nowrap flex-shrink-0 flex-grow-1">
                                    <span className="app-name app-name-shimmer contrast d-flex align-items-center no-text-selection-allowed">
                                        {appName}
                                    </span>
                                </div>
                                <div className="close-sideNavbar justify-content-end align-items-center">
                                    <button className={`toggle-sideNavbar ${props.state.sideNavBarToggleState? 'active': ''} d-flex justify-content-center align-items-center `}  onClick={props.toggleSideNavBarToggleState}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-menu py-2">
                        {sideNavBarList.map((item, index) => renderNavBarMainItem(item, index))
                        }
                    </div>
                </div>
                <div className="sidebar-footer d-flex flex-column justify-content-center align-items-center">
                    {/* <ToggleDarkMode calledFrom="SideNavBar"/> */}
                    <div
                        className="app-version-container d-flex justify-content-center align-items-center flex-fill flex-basis-0 flex-grow-1 flex-shrink-0 w-100 cursor-pointer"
                        data-toggle="tooltip" data-original-title="Click to know what's new in this release.">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center" data-toggle="modal" data-target="#whats_new_modal">
                            <span className="app-name me-2">{appName}</span>
                            <span className="app-version">{appVersion}</span>
                            <span className="release-stability ms-2 badge badge-light d-none">BETA</span>
                        </div>
                    </div>
                    <div className="pin-sideNavbar-container d-flex flex-fill flex-basis-0 flex-grow-1 flex-shrink-0 w-100" data-toggle="tooltip"
                         data-original-title="Click to Expand Sidebar."
                         onClick={()=>{
                            // sideNavbarPinnedChange()
                            props.toggleSideNavBarPinnedState()
                         }}
                    >
                        <div id="pin-sideNavbar" className="cursor-pointer d-flex justify-content-center align-items-center w-100">
                            <span className="material-icons-outlined">{sideNavBarPinnedState?'keyboard_double_arrow_right':'keyboard_double_arrow_left'}</span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

SideNavBar.propTypes = {
    appName: PropTypes.string,
    appAbout: PropTypes.string,
    isPinned: PropTypes.bool
}

SideNavBar.defaultProps = {
    appName: "My App",
    appAbout: "My Website",
    isPinned: true
}




