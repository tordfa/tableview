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
        try {
            let bookings = await bookingController.getAllBookings(params.tenantName);
            if(!bookings.success){
                throw new Error("Tenant does not exist!")
            }

            console.log(bookings);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            // Navigate to Error page
            navigate('/');
        }
    }

    useEffect(() => {
        getBookings();
    }, [])



    return (
        <>
            <h1>Bookingpage</h1>
            <p>Params: {params.tenantName}</p>
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
