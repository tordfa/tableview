import React, { useEffect, useState } from 'react'
import { DateDay } from './DateDay';

export const DatePicker = ({ setDateTime }) => {

    const [activeMonth, setActiveMonth] = useState(1);
    const [activeYear, setActiveYear] = useState(2025);
    const [activeYearArray, setActiveYearArray] = useState(null);

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



    function createDaysArray(year_input) {
        let daysInYear = []
        //Loop through months
        for (let i = 1; i < 13; i++) {
            let month = [];
            let daysInMonth = new Date(year_input, i, 0).getDate();
            for (let j = 0; j < daysInMonth; j++) {
                month.push(j);
            }
            daysInYear.push(month)
            month = {};
        }
        return daysInYear;
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

        let daysArray = createDaysArray(activeYear)
        setActiveYearArray(daysArray);


    }, [activeYear])

    return (
        <>

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
                        {activeYearArray
                            ? activeYearArray[activeMonth].map((day) => {
                                return <DateDay key={day} isActive={true} day={day}></DateDay>
                            })
                            : <></>
                        }
                    </div>
                </div>


        </>

    )
}
