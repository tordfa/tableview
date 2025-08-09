export async function createBooking(bookingdetails,tenantUrl) {

  const createBookingUrl = process.env.REACT_APP_HOST_URL + `/api/createbooking`
  try {
    const response = await fetch(createBookingUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({tenant_url: tenantUrl, ...bookingdetails})
    });
    if (!response.ok) {
      throw new Error('Response status:' + response)
    }
    return response.json();
  }
  catch (error) {
    console.error('There was an error getting bookings');
    return { success: false, error: error }
  }
}

export async function getAllBookings(tenantName, chosenDate) {

  const getBookingsUrl = process.env.REACT_APP_HOST_URL + `/booking/${tenantName}`
  try {
    const response = await fetch(getBookingsUrl, {
      credentials: 'include',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({chosenDate: chosenDate})
    });
    if (!response.ok) {
      throw new Error('Response status:' + response)
    }
    return response.json();
  }
  catch (error) {
    console.error('There was an error getting bookings');
    return { success: false, error: error }
  }
}


export async function getClosedDates() {
  // const {data, error} = await supabase.from('closed').select();
  // if(error){
  //     throw new Error("There was an error getting closed dates")
  // }
  // return data;
}
