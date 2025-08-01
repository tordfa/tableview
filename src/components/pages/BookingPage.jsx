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
    const [dateTime, setDateTime] = useState({ date: null, time: null });
    const [contactDetails, setContactDetails] = useState(null);

    return (
        <>
            <div className="h-full w-full flex justify-center">
                <div className="h-screen w-2/5 min-w-[400px] flex flex-col pt-24">
                    <Wizard header={<Header />} wrapper={<Wrapper />}>
                        <GuestStep numOfGuest={numOfGuest} setNumOfGuest={setNumOfGuest} />
                        <ChoseDateTimeStep dateTime={dateTime} setDateTime={setDateTime} />
                        <ContactDetailsStep contactDetails={contactDetails} setContactDetails={setContactDetails} />
                        <SummaryStep></SummaryStep>
                    </Wizard>
                </div>
                {/* <Button onClick={()=>{console.log(`Number of guests: ${numOfGuest} Date: ${dateTime.date} Time: ${dateTime.time}`);
                }}> Log</Button> */}
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
            <div className="h-[550px] border">{children}</div>
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
        <div className="h-full flex flex-col">
            <div className="flex flex-col justify-center items-center">
                <h1>Select number of guests: </h1>
                <ul className="w-96 pt-5 grid grid-cols-3 gap-8">{guestList()}</ul>
            </div>
            <div className="mt-auto">
                <Footer className="mt-24"></Footer>
            </div>

        </div>
    )
}

export const ChoseDateTimeStep = ({ dateTime, setDateTime }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookingSlots, setBookingSlots] = useState([]);
    const { handleStep, previousStep, nextStep } = useWizard();
    let params = useParams();

    async function getDateBookings(timestamp) {
        const chosenDate = new Date(timestamp);
        const dateString = `${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`;
        setDateTime({ date: dateString, time: null })
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

    const handleClick = (time_input) => {
        setDateTime({ ...dateTime, time: time_input });
        nextStep();
    }
    return (
        <>

            <div className="flex justify-center">
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
                            ? <Button onClick={() => { handleClick(slot.booking_time) }} variant="outlined" size="medium">{slot.booking_time}</Button>
                            : <Button disabled variant="outlined" size="medium">{slot.booking_time}</Button>
                    ))}
                    {/* <Button onClick={()=>{handleClick('17:00')}} variant="outlined" size="medium">17:00</Button> */}
                </div>
            </div>
            <div className="mt-auto">
                <Footer></Footer>
            </div>

        </>
    )
}


export const ContactDetailsStep = () => {
    const { handleStep } = useWizard();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    handleStep(() => {
        alert(formData);
    })

    return (
        <>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl">
                <form className="space-y-4">
                    <div className="flex justify-between">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                                First Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                                Last Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">
                            Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </>
    );
}

export const SummaryStep = () => {
    return (
        <><h1>Summary</h1></>
    )
}