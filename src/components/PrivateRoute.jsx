import React from 'react'
import { UserAuth } from '../context/AuthContext'

export const PrivateRoute = (props) => {

    const {session} = UserAuth();
    if (!session) {
        return <h1>Not session</h1>

    } else {
        return <>{props.children}</>
    }

}
