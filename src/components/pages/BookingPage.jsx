import { useParams,useNavigate } from "react-router"
import { getAllBookings } from "../../controllers/bookingController";
import { useEffect } from "react";

export const BookingPage = () => {
    
    let params = useParams();
    let navigate = useNavigate()

    async function getBookings() {
        //Check if store_id/user_id exists
        // If not : Redirect
        // If exist:
        try{
        let bookings = await getAllBookings(params.store_id);
        console.log(bookings);
        }
        catch(error){
            console.log(error);
            navigate('/'); 
        }

        
    }

    useEffect(()=>{
        getBookings();
    },[])

    

    return (
        <>
            <div>BookingPage</div>
            <h1>Bookingpage</h1>
            <p>Params: {params.store_id}</p>
            <button onClick={getAllBookings}>Get Bookings</button>
        </>

    )
}
