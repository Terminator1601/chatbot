import { createSlice } from  '@reduxjs/toolkit'


export const counterSlice  = createSlice({
    name:'agent',
    initialState:{
        currentDisplay:'snas_dashboard',
        selectedDashboard:'Process Global Dashboard',
        dashboardList:[ 'Statistics', 'Plant Network USB access', 'Plant Network Processes', 'Plant Network Connections','Particular Agent Information', 'Particular Process Information', 'Agent Dashboard', 'USB Dashboard', 'Process Global Dashboard' ],
        isInitialConfigurationLoaded:false,
        plantList:['pp','wip','dhruva'],
        layoutParameters:{
            RGL:{
                num_col:{ lg: 4, md: 4, sm: 2, xs: 2, xxs:1 },
                min_row_height:200,
                row_height:Math.floor(window.innerHeight*0.2),
                margin_vertical:30,
                margin_horizontal:30,
            }
        },
        navbarComponent:'',
    },
    reducers:{
        change_selected_dashboard:(state, action)=>{
            state.selectedDashboard = action.payload.selectedDashboard
        },
        inital_configuration_loaded:(state, action)=>{
            state = {...state, ...action.payload.stateChanges}
            state.isInitialConfigurationLoaded = true
        },
        change_state:(state, action)=>{
            state = {...state, ...action.payload.changeObject}
        },
        change_plant_list:(state, action)=>{
            state.plantList = action.payload
        }
    },
})

export const {change_selected_dashboard,inital_configuration_loaded,  change_state, change_plant_list}  = counterSlice.actions

export default counterSlice.reducer