import { supabase } from "../supabaseClient";

const createTenant = async (tenantname) =>{
    const {data, error} = await supabase.from('tenants').insert({name: tenantname})
    if(error){
        console.error("There was an erro creating Tenant", error)
    }
    return {success: true, data}
}