import React, { useState, useEffect } from 'react';
import App from './App'
import {
  updateAllowedModules
} from "./components/ReduxManagement/uiSlice";
import { getCurrentClientTime, getCurrentServerTime, syncTimeWithServer } from './components/OtherComponents/Utilities/TimeUtilities';
import { getCookie } from './components/OtherComponents/dashboard_snas_components_library/LocalStorageHandler';
import { useDispatch } from "react-redux";
import { fetchPostJson } from './components/OtherComponents/dashboard_snas_components_library/FetchUtils';

const AppWrapper = () => {
  const dispatch = useDispatch()

  const initializeConfiguration = (props) => {
    // alert('initializeConfiguration called')
    window.production = process.env.NODE_ENV === 'production'
    window.dashboardConfig = {
      API_URL: window.production ? window.location.protocol + '//' + window.location.host + '/' : process.env.REACT_APP_API_URL_ROOT,
      latestFetchIDs: {},
      default_timeperiod:'today',
      updateCounter: { 'category_name': 'count' },
    }
    window.appInfo  = {
      'appName':'SNAS-IDS',
      'appVersion':'1.0.1',
    }
    window.zIndexes = {
      topNavbar:100
    }
    window.dashboardConfig.csrfToken = getCookie('csrftoken')

    window.getCurrentClientTime = getCurrentClientTime
    window.getCurrentServerTime = getCurrentServerTime

    window.projectRootURLPath = '/'

    if(window.production){
      let rootPath = window.location.pathname
      rootPath = rootPath.split('/')
      rootPath = rootPath[1]
      if (rootPath) {
        window.projectRootURLPath = '/' + rootPath + '/'
      }
    }
    window.projectRootURLPath = window.projectRootURLPath.replace('//', '/')
    // await syncTimeWithServer()
    return 'success'
  }

  const [initializeConfigurationSuccess, setIntializeConfigurationSuccess] = useState('loading')

  useEffect(() => {
    function setSuccessStatus() {
      let success = 'failed'
      try {
        success = initializeConfiguration()
      }
      catch (err) {
        console.log(err)
      }
      success = 'success'
      setIntializeConfigurationSuccess(success)
    }
    setSuccessStatus()
  }, [])
  return (<App />)
  return (
    initializeConfigurationSuccess === 'success' ?
      <App />
      : initializeConfigurationSuccess === 'failed' ?
        <div>Unable to load initial configuration. Please contact system administrator.</div>
        : <div>Loading Configuration ... ! </div>
  )
}

export default AppWrapper