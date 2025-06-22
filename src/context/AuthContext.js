import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl,supabaseAnonKey);


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password })
            if (error) {
                console.error("There was an error signing in");
                return { success: false, error: error.message };
            }
            console.log("Sign in sucess" , data);
            return {success: true, data}
        }catch(error){
            console.error("An error occured ", error)
        }
    }

    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email: email, password: password })
        if (error) {
            console.error("There was an error signing Up", error);
            return { success: false, error }
        }
        return { success: true, data };
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext value={{ session, signInUser, signUpNewUser }}>
            {children}
        </AuthContext>
    )
}


export const UserAuth = () => {
    return useContext(AuthContext);
}
