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
      array.push(<div className="flex justify-end pr-2 pt-2  h-20 border-l-2 border-b-2 border-neutral-200 border-solid">{i}</div>)
    }
    return array;
  }
  return (
    <>
      <div className="grid grid-cols-7">
        {dayNames.map((dayname) => {
          return <h3 className="h-12 flex justify-center items-center font-bold p-5 border-b-2 border-t-2 border-l-2">{dayname}</h3>
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

  const bookingWindows = () => {
    let array = [];
    for (let i = 0; i < 47; i++) {
      array.push(<div className="border-2 border-solid border-black h-32">BOOKING</div>)
    }
    return array;
  }

  const times = () => {
    let array = [];
    array.push(<p className=" h-64">12AM</p>)
    for (let i = 1; i < 12; i++) {
      array.push(<p className=" h-64">{i}AM</p>)
    }
    array.push(<p className=" h-64">12PM</p>)
    for (let i = 1; i < 12; i++) {
      array.push(<p className=" h-64">{i}PM</p>)
    }
    return array;
  }
  return (
    <div className="flex max-h-full">
      <div className="flex w-[60%] overflow-y-scroll">
        <div className="flex h-fit w-full">
          <div className="w-12 bg-red-500">
            {times()}
          </div>
          <div className="w-full border-2 border-solid border-black">
            {bookingWindows()}
          </div>
        </div>

      </div>
    </div>
  )
}



