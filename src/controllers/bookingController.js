import { supabase } from "../supabaseClient";

export async function createBooking(customer_name_input, customer_email_input,customer_phone_input,user_id_input, table_id_input,date_time_input) {

    const { data, error } = await supabase.from('bookings').insert({
        customer_name: customer_name_input,
        customer_email: customer_email_input,
        customer_phone: customer_phone_input,
        user_id: user_id_input,
        table_id: table_id_input,
        date_time: new Date(),
    }).select();
    if(error){
        console.log(error);
        throw new Error('There was an error creatingBooking', error)
    }
    return data;
}

export async function getAllBookings(user_id_input) {
    const { data, error } = await supabase.from('bookings').select().eq('user_id', user_id_input)
    if (error) {
        throw new Error("There was an error getting bookings", error)
    }
    return data;
}
