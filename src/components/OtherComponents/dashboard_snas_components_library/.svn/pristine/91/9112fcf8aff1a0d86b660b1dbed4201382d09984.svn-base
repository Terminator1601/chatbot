import React from "react";
import PropTypes from "prop-types";

export default function AppLogo(props){
    return <>
        <div className={`app-logo ${props.contrastLogo?"contrast": ""}`}  style={{"height": props.size, "width": props.size}}>
            <div className="electron-path first"></div>
            <div className="electron-path second"></div>
            <div className="electron-path third"></div>
            <div className="svg-icon-container">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="312pt" height="312pt" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                    <metadata> SNAS logo, Created by Surya Pratap Singh, 2023.</metadata>
                    <path d="M12 4.942c1.827 1.105 3.474 1.6 5 1.833v7.76c0 1.606-.415 1.935-5 4.76v-14.353zm9-1.942v11.535c0 4.603-3.203 5.804-9 9.465-5.797-3.661-9-4.862-9-9.465v-11.535c3.516 0 5.629-.134 9-3 3.371 2.866 5.484 3 9 3zm-2 1.96c-2.446-.124-4.5-.611-7-2.416-2.5 1.805-4.554 2.292-7 2.416v9.575c0 3.042 1.69 3.83 7 7.107 5.313-3.281 7-4.065 7-7.107v-9.575z"/>
                </svg>
            </div>
        </div>
    </>
}

AppLogo.propTypes = {
    size: PropTypes.string,
    contrastLogo: PropTypes.bool
}

AppLogo.defaultProps = {
    size: "300px",
    contrastLogo: false
}