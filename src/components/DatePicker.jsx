import React, { useEffect, useState } from 'react'

export const DatePicker = () => {

    const [activeMonth, setActiveMonth] = useState(1);
    const [activeYear, setActiveYear] = useState(2027);
    const [activeYearObject, setActiveYearObject] = useState(null);

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

    // function getDaysInMonth(year_input, month_input) {
    //     return new Date(year_input, month_input, 0).getDate();
    // }

    function createDaysObject(year_input) {
        let dates = [];
        //Loop through months
        for (let i = 1; i < 13; i++) {
            let month = [];
            let daysInMonth = new Date(year_input, i, 0).getDate();
            for (let j = 0; j < daysInMonth; j++) {
                month.push(j);
            }
            dates.push(month)
            month = {};
        }
        return dates;

    }

    function handleChangeMonth(direction) {
        if (activeMonth + direction < 0) {
            setActiveMonth(11);
            setActiveYear(prevState => prevState - 1);

        }
        else if (activeMonth + direction > 11) {
            setActiveMonth(0);
            setActiveYear(prevState => prevState + 1);
        }
        else {
            setActiveMonth(prevState => prevState + direction);
        }
    }

    function handleChangeYear(direction) {
        setActiveYear(prevState => prevState + direction);
    }

    function testfunc() {
        console.log(new Date(activeYear, activeMonth, 0).getDate())

    }

    useEffect(() => {

        let obj = createDaysObject(activeYear)

        setActiveYearObject(obj);


    }, [activeYear])

    return (
        <>
            <button onClick={testfunc}>test</button>
            <div className='datepicker-container'>

                <div className='month-container'>
                    <button onClick={() => { handleChangeYear(-1) }}>&lt;--</button>
                    <p>{activeYear}</p>
                    <button onClick={() => { handleChangeYear(1) }}>--&gt;</button>
                </div>
                <div className='month-container'>
                    <button onClick={() => { handleChangeMonth(-1) }}>&lt;--</button>
                    <h3>{months[activeMonth]}</h3>
                    <button onClick={() => { handleChangeMonth(1) }}>--&gt;</button>
                </div>
                <div className='calendar-container'>
                    {activeYearObject
                        ? activeYearObject[activeMonth].map((day) => {
                            return <div key={day} className='day-container'>{day + 1}</div>
                        })
                        : <></>
                    }
                </div>
            </div>
        </>

    )
}
