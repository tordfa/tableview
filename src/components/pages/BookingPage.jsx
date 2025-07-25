import { useParams, useNavigate } from "react-router"
import * as bookingController from "../../controllers/bookingController";
import { useEffect, useState } from "react";
import { DatePicker } from '../DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Button from '@mui/material/Button';
import dayjs from "dayjs";


//STEP 1: Select Number of Guest
//STEP 2: Chose date and Time
//STEP 3: Enter contact details.

export const BookingPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookingSlots, setBookingSlots] = useState([]);

    let params = useParams();

    async function getDateBookings(timestamp) {
        const chosenDate = new Date(timestamp);
        const dateString = `${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`;
        try {
            let bookings = await bookingController.getAllBookings(params.tenantName, dateString)
            if (!bookings.success) {
                throw new Error("There was an error getting bookings")
            }
            console.log(bookings);
            setBookingSlots(bookings.result);

        } catch (error) {
            console.log(error);

        }



    }


    return (
        <>
            <h1>Bookingpage</h1>
            <p>Params: {params.tenantName}</p>
            <button onClick={bookingController.getAllBookings}>Get Bookings</button>
            {isLoading
                ? <h1>Loading......</h1>

                : <>
                    <div className="bookingdate-container flex justify-center">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                minDate={dayjs()}
                                onChange={getDateBookings}
                                slotProps={{
                                    actionBar: {
                                        actions: [], // This removes all action buttons, including "OK"
                                    },
                                }}
                            ></StaticDatePicker>
                        </LocalizationProvider>
                        <div className="border w-64 p-6 grid grid-cols-2 gap-2">
                            {bookingSlots.map(slot => (
                                slot.is_available
                                    ? <Button variant="outlined" size="medium">{slot.booking_time}</Button>
                                    : <Button disabled variant="outlined" size="medium">{slot.booking_time}</Button>
                            ))}
                        </div>
                    </div>

                </>
            }
        </>

    )
}


export const GuestStep = () => {
    return (
        <h1>Select number of guests: </h1>
    )
}

export const ChoseDateTimeStep = () => {
    return (
        <h1>Chose Date and Time</h1>
    )
}


export const ContactDetailsStep = () => {
    return (
        <h1>Enter contact details!</h1>
    )
}