import React, { useState } from 'react'
import Sidebar from '../components/misc/Sidebar'
import NurseDashboard from './NurseDashboard'

const DashboardPage = () => {
    const [sidebarExpanded,setSidebarExpanded]=useState(false);
    const toggleSidebar=()=>{
        setSidebarExpanded(!sidebarExpanded);
    }
  return (
    <div>
        <Sidebar expanded={sidebarExpanded} toggleSidebar={toggleSidebar}></Sidebar>
        <NurseDashboard sidebarExpanded={sidebarExpanded}></NurseDashboard>
    </div>
  )
}

export default DashboardPage