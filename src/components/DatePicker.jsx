import React, { useEffect, useState } from 'react'

export const DatePicker = () => {

    const [activeMonth, setActiveMonth ] = useState(0);
    const [activeYear, setActiveYear] = useState(0);

    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    function getDaysInMonth(year_input, month_input) {
        return new Date(year_input, month_input, 0).getDate();
    }

    function createDaysObject(year_input) {
        let dates = [];
        //Loop through months
        for (let i = 0; i < 12; i++) {
            let month = [];
            let daysInMonth = getDaysInMonth(year_input, i);
            for (let j = 0; j < daysInMonth; j++) {
                month.push(j);
            }
            dates.push(month)
            month = {};
        }
        return dates;

    }

    useEffect(()=>{
    let obj = createDaysObject(2025)
    setActiveYear(obj);
    
    },[])


    return (
        <>
            <h1>DatePicker</h1>

            <div className='datepicker-container'>
                <div className='month-container'>
                    <button>&lt;--</button>
                    <h1>{months[activeMonth]}</h1>
                    <button>--&gt;</button>
                </div>
                <div className='calendar-container'>
                    {activeYear[activeMonth].map((day)=>{
                        return <div className='day-container'>{day}</div>
                    })}
                </div>
            </div>
        </>

    )
}
