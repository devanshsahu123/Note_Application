
import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

export default function LayOut() {
    const checkToken = localStorage.getItem('token')

    return (<>
       {checkToken ? <Outlet />: <Navigate to='/login-signup'/>}
    </>)
}
