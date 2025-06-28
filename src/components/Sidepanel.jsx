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
                <NavLink to='/testpage'>Testpage</NavLink>
                <NavLink to={'/booking/f5f0b163-3d94-4807-b3db-3e3eeeb23ebc'}>Booking</NavLink>
                <NavLink to='/tableview'>Tableview</NavLink>
                <NavLink to='/calendar'>Calendar</NavLink>
                <NavLink to='/signin'>Signin</NavLink>
                <NavLink to='/signup'>Signup</NavLink>

            </div>
        </>
    )
}
