import React from 'react'
import { Sidepanel } from './Sidepanel'
import { Outlet } from 'react-router'

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
}

export const DashboardLayout = () => {
  return (
    <div style={style}>
        <Sidepanel></Sidepanel>
        <Outlet></Outlet>
    </div>
  )
}
