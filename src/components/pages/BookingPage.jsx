import { useParams, useNavigate } from "react-router"
import * as bookingController from "../../controllers/bookingController";
import { useEffect, useState } from "react";
import { DatePicker } from '../DatePicker'


export const BookingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dateTime, setDateTime] = useState(null);


    let params = useParams();
    let navigate = useNavigate()

    async function getBookings() {
        //Check if store_id/user_id exists
        // If not : Redirect
        // If exist:
        try {
            let bookings = await bookingController.getAllBookings(params.store_id);
            console.log(bookings);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            // Navigate to Error page
            navigate('/');
        }


    }

    async function createBooking() {
        try {
            // "Username","Useremail","userPhone",'f5f0b163-3d94-4807-b3db-3e3eeeb23ebc',39,date_time
            bookingController.createBooking()
        } catch (error) {

        }
    }

    useEffect(() => {
        getBookings();
    }, [])



    return (
        <>
            <button onClick={() => { navigate('/') }}>Home</button>
            <div>BookingPage</div>
            <h1>Bookingpage</h1>
            <p>Params: {params.store_id}</p>
            <button onClick={bookingController.getAllBookings}>Get Bookings</button>
            {isLoading
                ? <h1>Loading......</h1>

                : <>
                    <div className="bookingdate-container">
                        <DatePicker setDateTime={setDateTime}></DatePicker>
                        <div className="date-sidepanel">
                            <h1>Sidepanel</h1>
                            <p>Select date</p>
                        </div>
                    </div>

                </>
            }
        </>

    )
}
