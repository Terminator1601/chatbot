import { Typography } from '@mui/material'
import React from 'react'

export default function TopNavbar(props) {
    return props.showTopNavbar && (
        <nav className={`navbar navbar-dark navbar-expand-lg app-font-color app-color-bg overflow-visible top-nav-bar-height p-0 m-0 ${props.isSidebarToggled  ? (props.isSidebarPinned ? 'top-nav-bar-width': 'top-nav-bar-short-width') :'w-100' } position-fixed row`} style={{ zIndex: window.zIndexes['topNavbar'] }}>
                <div className='col-2'>
                    <button
                        className={"toggle-sideNavbar d-flex justify-content-center align-items-center ps-3 " + (props.isSidebarToggled ? "active" : "")}
                        data-toggle="tooltip"
                        data-original-title="Toggle Menu"
                        onClick={props.toggleSideNavBarToggleState}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                </div>
                <div className='col-8 '>
                    {
                        props.topNavbarTitle ?
                            <div className='d-flex justify-content-center app-name-shimmer contrast '>
                                <Typography variant='h4'  fontFamily={'inherit'} >{props.topNavbarTitle}</Typography>
                            </div>
                            : props.topNavbarComponent ?
                                props.topNavbarComponent
                                : null
                    }
                </div>
                <div className='col-2'></div>
        </nav>
    )
}