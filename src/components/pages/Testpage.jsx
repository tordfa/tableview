import * as bookingController from '../../controllers/bookingController';

export const Testpage = () => {

    const handleClick = async () => {
        console.log('creating booking');
        
        try{
           let result = await bookingController.createBooking("Username","Useremail","userPhone",'f5f0b163-3d94-4807-b3db-3e3eeeb23ebc',39);
           console.log(result);
           
        }
        catch(e){
            console.log(e);
            
        }
    }

    const handleClick2 = async () => {
        try{
            let result  = await bookingController.getAllBookings('f5f0b163-3d94-4807-b3db-3e3eeeb23ebc');
            let date = new Date(result[0].date_time)
            console.log(date.getMonth() +' '+ date.getDate() + ' ' +  date.getFullYear());            
            
        }
        catch(error){
            console.log(error);
        }        
    }


    return (
        <>
            <div>
                <h1>Testpage</h1>
                <button onClick={handleClick}>TEST</button>
                <button onClick={handleClick2}>Test 2</button>

            </div>
        </>

    )
}
