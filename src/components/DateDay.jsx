import React from 'react'

export const DateDay = ({ isActive, day }) => {

    return (
        <>
            {isActive
                ? <div key={day} className='day-container'>{day + 1}</div>
                : <div key={day} className='day-container-inactive'>{day + 1}</div>
            }
        </>

    )
}
