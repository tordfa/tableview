import React from 'react'
import { NavLink } from 'react-router'

const style = {
    backgroundColor: 'grey',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
}
export const Sidepanel = () => {
    return (
        <>
            <div style={style}>
                <h1>Sidepanel</h1>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/tableview'>Tableview</NavLink>
                <NavLink to='/calendar'>Calendar</NavLink>
                <NavLink to='/signin'>Signin</NavLink>
                <NavLink to='/signup'>Signup</NavLink>

            </div>
        </>
    )
}
