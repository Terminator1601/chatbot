import { createSlice } from '@reduxjs/toolkit'


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        sideNavBarToggled: true,
        sideNavBarPinned: true,
        darkModeEnabled: false,
        // darkModeEnabled: document.querySelector("html").getAttribute("data-bs-theme") === "dark",
        currentTheme: "darkBlue",
        isLoading: false,
        modalElementConfig: null,
        showModalElement: false,
        rightClickContextMenu: null,
        modules: [],
        topNavbarTitle:'',
        topNavbarComponent:null,
    },
    reducers: {
        showLoadingElement: (state, action) => {
            state.isLoading = action.payload.show
        },
        editModalConfig: (state, action) => {
            if (action.payload.showModalElement === true) {
                state.showModalElement = true
                if (action.payload.modalElementConfig !== undefined) {
                    state.modalElementConfig = action.payload.modalElementConfig
                }
            }
            else {
                state.showModalElement = false
                state.modalElementConfig = null
                window.universalModalElement = null
            }
        },
        editRightClickContextMenu: (state, action) => {
            let menu = action.payload
            if (menu && menu.show && menu.x && menu.y && menu.data) {
                state.rightClickContextMenu = menu
            }
        },
        hideRightClickContextMenu: (state, action) => {
            state.rightClickContextMenu = null
        },
        updateAllowedModules: (state, action) => {
            state.modules = action.payload.modules
        },
        updateTopNavbarTitle: (state, action)=>{
            if(state.topNavbarTitle !== action.payload){
                state.topNavbarTitle = action.payload
                state.topNavbarComponent = null
            }
        },
        updateTopNavbarComponent: (state, action)=>{
            if(state.topNavbarComponent != action.payload){
                state.topNavbarComponent = action.payload
                state.topNavbarTitle = ''
            }
        }
    },
})

export const {
    showLoadingElement, editModalConfig,
    editRightClickContextMenu, hideRightClickContextMenu,
    updateAllowedModules, updateTopNavbarTitle, updateTopNavbarComponent
} = uiSlice.actions

export default uiSlice.reducer