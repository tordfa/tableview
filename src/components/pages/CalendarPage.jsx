import { useState } from "react"

export const CalendarPage = () => {
  const [view, setView] = useState('day');


  const renderView = () => {
    switch (view) {
      case 'month':
        return <MonthView />;
      case 'week':
        return <WeekView />;
      case 'day':
        return <DayView />;
      default:
        return null;
    }
  }



  return (
    <>
      <div className="w-full overflow-y-hidden">
        <div id="calendar-header" className="bg-zinc-100 h-20 flex items-center border-2 border-neutral-100 border-solid">
          <h1 className="min-w-fit pl-12 pr-24 font-bold">January 2025</h1>
          <button onClick={() => { setView('day') }} className="border border-solid border-black mr-3">DAYVIEW</button>
          <button onClick={() => { setView('month') }} className="border border-solid border-black">MONThVIEW</button>
          <div className="flex min-w-fit ml-auto pr-12">
            <button>&lt;--</button>
            <h1 className="p-5 font-bold">Day</h1>
            <button>--&gt;</button>
          </div>
          <div className="flex min-w-fit pr-12 border-r-2 border-neutral-400">
            <h1 className="pl-5 pr-5 font-bold">View</h1>
            <button>&darr;</button>
          </div>
          <button className="min-w-fit pl-12 pr-12">Add Booking</button>
        </div>

        {renderView()}


      </div>
    </>
  )
}

export const MonthView = () => {

  const dayNames = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ]

  const renderDays = () => {
    let array = []
    for (let i = 1; i < 36; i++) {
      array.push(<div key={i} className="flex justify-end pr-2 pt-2  h-20 border-l-2 border-b-2 border-neutral-200 border-solid">{i}</div>)
    }
    return array;
  }
  return (
    <>
      <div className="grid grid-cols-7 border-r-2">
        {dayNames.map((dayname,index) => {
          return <h3 key={index} className="rounded-t-xl h-12 flex justify-center items-center font-bold p-5 border-b-2 border-t-2 border-l-2">{dayname}</h3>
        })}
        {renderDays()}
      </div>

    </>)
}

export const WeekView = () => {
  return (
    <div>WeekView</div>
  )
}

export const DayView = () => {

  const HALFHOURHEIGHT = 4;
  const tempBookings = [
    {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Ola',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      date_time: new Date("Wed Jul 09 2025 17:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
    {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Kari',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      company_name: 'Tord As',
      date_time: new Date("Wed Jul 09 2025 17:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
    {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Kari',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      company_name: 'Tord As',
      date_time: new Date("Wed Jul 09 2025 17:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
    {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Kari',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      company_name: 'Tord As',
      date_time: new Date("Wed Jul 09 2025 17:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
       {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Kari',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      company_name: 'Tord As',
      date_time: new Date("Wed Jul 09 2025 20:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
           {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Kari',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      company_name: 'Tord As',
      date_time: new Date("Wed Jul 09 2025 20:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
           {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Kari',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      company_name: 'Tord As',
      date_time: new Date("Wed Jul 09 2025 20:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
           {
      // 'Wed Jul 09 2025 16:11:54 GMT+0200 (Central European Summer Time)'
      createdAt: new Date(),
      first_name: 'Kari',
      last_name: 'Nordmann',
      phone: '48509900',
      email: 'test@test.no',
      company_name: 'Tord As',
      date_time: new Date("Wed Jul 09 2025 20:00:00"),
      duration: 2,
      guests: 4,
      note: '',
      allergies: ''
    },
  ]

  const renderBookings = (bookings) => {
    let output = []
    let prevTime = "";
    let counter = 1;
    bookings.forEach((booking, index) => {
      let multStyle = {};
      if (booking.date_time.getHours() === prevTime) {
        multStyle = { left: 50 * counter };
        counter++;
      } else { counter = 1 }
      let toppos = (booking.date_time.getHours() * 2 * HALFHOURHEIGHT);
      output.push(
        <div
          key={index}
          className={`absolute ml-1 w-32 bg-blue-100 border border-solid border-black rounded-md`}
          style={{ top: `${toppos}rem`, height: `${booking.duration * HALFHOURHEIGHT * 2}rem`, zIndex: index, ...multStyle }}
        >
          <h1>{booking.first_name} {booking.last_name}</h1>
        </div>)
      prevTime = booking.date_time.getHours();
    })
    return output;
  }

  const bookingWindows = () => {
    let array = [];
    for (let i = 0; i < 47; i++) {
      array.push(
        <div
        key={i}
          className="border border-solid border-black"
          style={{ height: `${HALFHOURHEIGHT}rem` }}
        >
        </div>)
    }
    return array;
  }

  const times = () => {
    let array = [];
    array.push(<p key={1} style={{ height: `${HALFHOURHEIGHT * 2}rem` }}>12AM</p>)
    for (let i = 1; i < 12; i++) {
      array.push(<p key={i+1} style={{ height: `${HALFHOURHEIGHT * 2}rem` }}>{i}AM</p>)
    }
    array.push(<p key={13} style={{ height: `${HALFHOURHEIGHT * 2}rem` }}>12PM</p>)
    for (let i = 1; i < 12; i++) {
      array.push(<p key={i+13} style={{ height: `${HALFHOURHEIGHT * 2}rem` }}>{i}PM</p>)
    }
    return array;
  }
  return (
    <>
      <div className="flex max-h-full">
        <div className="flex w-[50%] overflow-y-scroll">
          <div className="flex h-fit w-full">
            <div className="w-12 bg-red-400">
              {times()}
            </div>
            <div className="relative w-full border-2 border-solid border-black mt-3">
              <div id="booking-container" className="absolute w-full h-full">
                {renderBookings(tempBookings)}
              </div>
              {bookingWindows()}
            </div>
          </div>
        </div>
        <div id="test" className="flex justify-center mt-12 h-vh w-[50%]">
          <div className="w-full pl-12 pr-12">
            <MonthView></MonthView>
          </div>

        </div>
      </div>
    </>

  )
}



