import React, { useEffect } from 'react'
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Admin from './components/PrimaryComponents/Admin';


export default function AppRoutes() {
  const HomepageComponent = lazy(() => import('./components/PrimaryComponents/Homepage'))

  
  return (
    
        <Routes>
          <Route path='' element={
            <HomepageComponent />
          } />
          <Route path='/' element={
            <HomepageComponent />
          } />
          <Route path='/Admin' element={<Admin/>} />
        </Routes>
  )
}