import { useEffect, useState } from 'react';
import { isAuthenticated } from '../controllers/userController';
import { Outlet, useNavigate } from 'react-router';

export const PrivateRoute = (props) => {
    const [auth, setAuth] = useState(false);

    let navigate = useNavigate();

    const isAuth = async () => {
        try {
            const response = await isAuthenticated()
            if (!response.ok) {
                setAuth(false);
                navigate('/signin')
            }
            setAuth(true);

        }
        catch (error) {
            navigate('/signin')
        }

    }
    useEffect(() => {
        isAuth();
    }, [])


    if (auth) {
        return <><Outlet></Outlet></>

    }

}
