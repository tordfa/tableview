export async function createBooking(customer_name_input, customer_email_input,customer_phone_input,user_id_input, table_id_input,date_time_input) {

    // const { data, error } = await supabase.from('bookings').insert({
    //     customer_name: customer_name_input,
    //     customer_email: customer_email_input,
    //     customer_phone: customer_phone_input,
    //     user_id: user_id_input,
    //     table_id: table_id_input,
    //     date_time: new Date(),
    // }).select();
    // if(error){
    //     console.log(error);
    //     throw new Error('There was an error creatingBooking', error)
    // }
    // return data;
}

export async function getAllBookings(tenantName) {

  const getBookingsUrl = process.env.REACT_APP_HOST_URL + `/booking/${tenantName}`
  try {
    const response = await fetch(getBookingsUrl, {
      method: "GET"
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


export async function getClosedDates(){
    // const {data, error} = await supabase.from('closed').select();
    // if(error){
    //     throw new Error("There was an error getting closed dates")
    // }
    // return data;
}
