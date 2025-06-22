import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router';

export const PrivateRoute = (props) => {

    let navigate = useNavigate();

    const {session} = UserAuth();
    if (!session) {
        navigate('/signin');

    } else {
        return <>{props.children}</>
    }

}
