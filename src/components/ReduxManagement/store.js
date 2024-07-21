import {configureStore} from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import agentReducer from './agentDashboradSlice'
export default configureStore(
    {
        reducer:{
            ui:uiReducer,
            agent:agentReducer,
        }
    }
)