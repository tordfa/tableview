import React from 'react'
import { Outlet } from 'react-router'
import SidePanel from './Sidepanel'

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
}

export const DashboardLayout = () => {
  return (
    <div style={style}>
        {/* <Sidepanel></Sidepanel> */}
        <SidePanel></SidePanel>
        <Outlet></Outlet>
    </div>
  )
}
