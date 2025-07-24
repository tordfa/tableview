import { useParams, useNavigate } from "react-router"
import * as bookingController from "../../controllers/bookingController";
import { useEffect, useState } from "react";
import { DatePicker } from '../DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from "dayjs";

export const BookingPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookingSlots, setBookingSlots] = useState([1, 2, 3, 4]);


    let params = useParams();
    let navigate = useNavigate()

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
                            ></StaticDatePicker>
                        </LocalizationProvider>
                        <div className="bg-red-500 w-64 pt-12 grid grid-cols-2">
                            {bookingSlots.map(slot => (
                                slot.is_available 
                                    ? <h1>{slot.booking_time}</h1> 
                                    : <h1 className="text-blue-500">{slot.booking_time}</h1>
                            ))}
                        </div>
                    </div>

                </>
            }
        </>

    )
}
