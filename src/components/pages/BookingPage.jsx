import { useParams, useNavigate } from "react-router"
import * as bookingController from "../../controllers/bookingController";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Button from '@mui/material/Button';
import dayjs from "dayjs";
import { Wizard, useWizard } from 'react-use-wizard';

export const BookingPage = () => {
    const [numOfGuest, setNumOfGuest] = useState(null);
    const [dateTime, setDateTime] = useState(null);
    const [contactDetails, setContactDetails] = useState(null);

    return (
        <>
            <div className="h-full w-full flex justify-center">
                <div className="h-screen w-2/5 min-w-[400px] flex flex-col pt-24">
                    <Wizard header={<Header />} footer={<Footer />} wrapper={<Wrapper />}>
                        <GuestStep numOfGuest={numOfGuest} setNumOfGuest={setNumOfGuest} />
                        <ChoseDateTimeStep setContactDetails={setContactDetails} />
                        <ContactDetailsStep setDateTime={setDateTime} />
                    </Wizard>
                </div>
            </div>
        </>

    )
}

const Header = () => {
    const { activeStep, goToStep } = useWizard();
    return (
        <>
            <div className="flex flex-col bg-sky-50">
                <p
                    className={`border cursor-pointer p-1 ${(activeStep == 0) ? 'bg-sky-200' : ''}`}
                    onClick={() => { goToStep(0) }}
                >

                    Number of guests:
                </p>
                <p
                    className={`border cursor-pointer p-1 ${(activeStep == 1) ? 'bg-sky-200' : ''}`}
                    onClick={() => { goToStep(1) }}
                >
                    Date and time:
                </p>
                <p
                    className={`border cursor-pointer p-1 ${(activeStep == 2) ? 'bg-sky-200' : ''}`}
                    onClick={() => { goToStep(2) }}
                >
                    Contact info
                </p>
                <p
                    className={`border cursor-pointer p-1 ${(activeStep == 3) ? 'bg-sky-200' : ''}`}
                    onClick={() => { goToStep(3) }}
                >
                    Summary
                </p>
            </div>
        </>
    );
}

const Footer = () => {
    const { previousStep, nextStep } = useWizard();
    return (
        <>
            <div className="border flex justify-between p-3 pl-10 pr-10">
                <button className="border p-2" onClick={previousStep}>Previous</button>
                <button className="border p-2" onClick={nextStep}>Next</button>
            </div>
        </>
    );
}

const Wrapper = ({ children }) => {
    return (
        <>
            <div className="h-[450px] border">{children}</div>
        </>
    )
}

export const GuestStep = ({ numOfGuest, setNumOfGuest }) => {
    const { nextStep } = useWizard();
    const maxNumberOfGuests = 9;

    const handleClick = (index) => {
        setNumOfGuest(index);
        nextStep();
    }
    const guestList = () => {
        let guestArray = [];
        let activeStyle = "";
        for (let i = 1; i <= maxNumberOfGuests; i++) {
            { (i == numOfGuest) ? activeStyle = "bg-sky-200" : activeStyle = "" }
            guestArray.push(<li
                onClick={() => { handleClick(i) }}
                className={`${activeStyle} flex justify-center border p-2 hover:bg-sky-200 cursor-pointer rounded-md`}>
                {i}
            </li>)
        }
        return guestArray;
    }

    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <h1>Select number of guests: </h1>
            <ul className="w-96 pt-5 grid grid-cols-3 gap-8">{guestList()}</ul>
        </div>
    )
}

export const ChoseDateTimeStep = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookingSlots, setBookingSlots] = useState([]);
    const { handleStep, previousStep, nextStep } = useWizard();
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

            <div className="flex h-full justify-center">
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
    )
}


export const ContactDetailsStep = () => {
    const { previousStep, nextStep } = useWizard();
    return (
        <>
            <div>
                <h1>Enter contact details!</h1>
            </div>

        </>

    )
}