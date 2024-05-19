// import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStoragemanager'

function IsUserLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN)

    return (
        user ? <Navigate to={'/'} /> : <Outlet />
    )
}

export default IsUserLoggedIn