import React from 'react'
import './Home.scss'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

function Home() {
    return (
        <div className='Home'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Home