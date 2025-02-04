import { useEffect, useState } from "react"
import SideNavBar from "./SideNav/SideNavBar"
import { BrowserRouter } from 'react-router-dom';
import { applyAppTheme, createThemeColorsJSON } from "./AppThemes/AppThemes";
import { InterfaceSettingsModal } from "./InterfaceSettings";
import './BaseUI.css'
import './App.css'
import TopNavbar from "./TopNavbar";

export function BaseUI(props) {
  //Appearance configurations
  const [state, setState] = useState({
    isSidebarPinned: true,
    isSidebarToggled: true,
    currentThemeState: '',
    isSidebarHovering: false,
    showInterfaceSettingsModal: false,
  })

  const [darkModeState, setDarkModeState] = useState(false)

  const toggleSideNavBarPinnedState = () => {
    setState(prev => ({ ...prev, isSidebarPinned: !prev.isSidebarPinned }))
  }

  const toggleSideNavBarToggleState = () => {
    setState(prev => ({ ...prev, isSidebarToggled: !prev.isSidebarToggled }))
  }

  const toggleSideNavBarHoverState = () => {
    setState(prev => ({ ...prev, isSidebarHovering: !prev.isSidebarHovering }))
  }

  const openInterfaceSettingsModal = () => {
    setState(prev => ({ ...prev, showInterfaceSettingsModal: true }))
  }

  const closeInterfaceSettingsModal = () => {
    setState(prev => ({ ...prev, showInterfaceSettingsModal: false }))
  }

  const onThemeChange = (theme) => {
    if (applyAppTheme) {
      if (state.currentThemeState != theme) {
        setState(prev => ({ ...prev, currentThemeState: theme }))
        applyAppTheme(theme);
        localStorage.setItem("appTheme", theme)
      }
    }
  }

  const toggleDarkModeState = () => {
    let newMode = !Boolean(darkModeState)
    setDarkModeState(newMode)
    changeDarkMode(newMode)
  }

  useEffect(() => {
    if (window.localStorage['darkMode'] && window.localStorage['darkMode'] == 'true') {
      changeDarkMode(true)
    }
    if (window.localStorage['appTheme']) {
      setTimeout(() => {
        onThemeChange(window.localStorage['appTheme'])
      }, 50)
    }
    createThemeColorsJSON()
  }, [])


  const changeDarkMode = (newMode) => {
    if (newMode) {
      window.localStorage["darkMode"] = "true"
      document.querySelector("html").setAttribute("data-bs-theme", "dark");
    }
    else {
      window.localStorage["darkMode"] = "false"
      document.querySelector("html").setAttribute("data-bs-theme", "light");
    }
  }

  return (
    <div style={{ width: props.width ? props.width : '100vw' }} className="h-100">
      <div className={`page-wrapper h-100 w-100 default-ux-mode dark 
                ${state.isSidebarPinned ? ' pinned ' : ''}
                ${state.isSidebarToggled ? ' toggled ' : ''}
                ${state.isSidebarHovering && state.isSidebarPinned ? ' sidebar-hovered ' : ''}
                `
      }>
        <div className=" app-dark-background-color opacity-1"></div>
        <SideNavBar
          state={state}
          toggleSideNavBarPinnedState={toggleSideNavBarPinnedState}
          toggleSideNavBarToggleState={toggleSideNavBarToggleState}
          toggleSideNavBarHoverState={toggleSideNavBarHoverState}
          navLinks={(props.navLinks ? props.navLinks : []).concat([
            {
              type: 'break'
            },
            {
              name: 'Interface Settings',
              icon: <span className="material-icons">settings</span>,
              onClick: openInterfaceSettingsModal,
              children: []
            }
          ])}
          appInfo={props.appInfo}
        />
        <div id="pageContent" className="page-content d-flex flex-column h-100 w-100 app-light-background-color ">
          <div id="pageContentContainer"
            className=" w-100 h-100 "
            onClick={(event) => {
              if (props.onPageClick) {
                props.onPageClick(event)
              }
            }}
          >
            <div className=" mainContent p-0 m-0 w-100 h-100">
              <TopNavbar
                toggleSideNavBarToggleState={toggleSideNavBarToggleState}
                showTopNavbar={props.showTopNavbar}
                isSidebarToggled={state.isSidebarToggled}
                isSidebarPinned={state.isSidebarPinned}
                topNavbarTitle={props.topNavbarTitle}
                topNavbarComponent={props.topNavbarComponent}
              />
              <InterfaceSettingsModal
                showModal={state.showInterfaceSettingsModal}
                closeModal={closeInterfaceSettingsModal}
                onThemeChange={onThemeChange}
                currentThemeState={state.currentThemeState}
                darkModeState={state.darkModeState}
                toggleDarkModeState={toggleDarkModeState}
              />
              <div className="w-100 "
                style={{ paddingTop: props.showTopNavbar ? '60px' : 0}}
              >
                {
                  props.children ?
                    props.children
                    : 'Nothing to display'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SideNavBar.defaultProps = {
  appName: "My App",
  appAbout: "My Website",
  isSidebarPinned: true
}

