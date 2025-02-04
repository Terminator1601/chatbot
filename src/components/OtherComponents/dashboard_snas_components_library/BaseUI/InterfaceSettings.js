import React from 'react'

// export default function InterfaceSettings() {
//     const [showModal, setShowModal] = useState(false);

//     const openModal = () => {
//       setShowModal(true);
//     };

//     const closeModal = () => {
//       setShowModal(false);
//     };

//     return (
//       <div>
//         <h1>React Modal Example</h1>
//         <button onClick={openModal}>Open Modal</button>
//         <Modal showModal={showModal} closeModal={closeModal} />
//       </div>
//     );
// }

export const InterfaceSettingsModal = ({ showModal, closeModal, ...rest }) => {
    return (
        <div className={showModal ? "modal11 display-block11" : "modal11 display-none11"}>
            <div className="modal-content11">
                <span className="close11" onClick={closeModal}>&times;</span>
                <ModalContent {...rest} />
            </div>
        </div>
    );
};

const ModalContent = (props) => {
    const currentThemeState = props.currentThemeState;
    /*let themeName;
    let classList = document.querySelector("body").classList;
    classList.forEach(function(className) {
        if (className.includes("theme-")) {
            themeName = className.replace("theme-", "");
        }
    });*/
    let themeButtonsElements = [];
    Object.keys(window.themeColors).forEach((themeKey, index) => {
        let currentThemeAlreadySet = (currentThemeState === themeKey) ? "selected-theme" : "";
        themeButtonsElements.push(
            (
                <button key={'a'+themeKey+index} className={`btn btn-theme-${themeKey} btn-circle d-flex align-items-center justify-content-center m-2 ${currentThemeAlreadySet}`}
                    id={`${themeKey}_apply_button`}
                    onClick={() => { props.onThemeChange(themeKey) }}
                >
                    <span className="material-icons">insert_emoticon</span>
                </button>
            )
        );
    })

    return <>
        <div className='row d-flex align-items-center justify-content-center'>
            <div className='row d-flex align-items-center justify-content-center mt-5 font-bold h4'>Select Theme</div>

            <div
                className="mt-4 dark-light-mode-toggle-container d-flex align-items-center justify-content-center flex-fill flex-basis-0 flex-grow-1 flex-shrink-0"
                data-toggle="tooltip"
                data-original-title="Click on toggle button to switch between Dark and Light Interface Mode.">
                {
                    props.calledFrom !== "SideNavBar" ?
                        <span className="light-mode-label text-center">Light Mode</span>
                        : null
                }
                {/*<div className={`${props.calledFrom==="SideNavBar"?"w-36px ": ""} mx-3 dark-light-mode-toggle flex-shrink-0 `}*/}
                <div className={`mx-3 dark-light-mode-toggle flex-shrink-0`}
                    onClick={() => {
                        props.toggleDarkModeState()
                    }}
                >
                    <input type="checkbox" className="dark-light-mode-toggle-checkbox" checked={props.darkModeState} onChange={() => { }} />
                    <span className="label-animation" style={{ "textAlign": "initial" }}></span>
                </div>
                {
                    props.calledFrom === "SideNavBar" ?
                        <span className="dark-mode-label text-center">{props.darkModeState ? "Dark Mode" : "Light Mode"}</span>
                        :
                        <span className="dark-mode-label text-center">Dark Mode</span>
                }
            </div>
            <div className='row d-flex align-items-center justify-content-center mt-4'>
                {themeButtonsElements}
            </div>
        </div>
    </>;

}