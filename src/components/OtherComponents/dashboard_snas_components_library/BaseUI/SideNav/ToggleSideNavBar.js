import React from 'react';

export default function ToggleSideNavBar() {
    const sideNavBarState = false
    const toggleSideNavBar =()=>{
        
    }

    if(sideNavBarState){
        return <></>
    }
    else {
        return <>
            <button
                className={"toggle-sideNavbar d-flex justify-content-center align-items-center " + (sideNavBarState ? "active" : "")}
                data-toggle="tooltip"
                data-original-title="Toggle Menu"
                onClick={() => {
                    toggleSideNavBar()
                }}
            >
                <div></div>
                <div></div>
                <div></div>
            </button>
        </>
    }
};
