import React from 'react'
import './Home.scss'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import User from '../user/User'

function Home() {
    return (
        <div className='Home'>
            <Navbar />
            {/* <User /> */}
            <Outlet />
        </div>
    )
}

export default Home