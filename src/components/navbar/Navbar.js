import React from 'react'
import './Navbar.scss'
import { AiOutlineLogout } from "react-icons/ai";
// import { FaUserCircle } from "react-icons/fa";
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStoragemanager';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';

function Navbar() {
    const navigate = useNavigate()

    // const fetchData = async()=> {
    //     const response = await axiosClient.post('/auth/login');

    //     const name = response.data.
    // }

    const handleLogoutClick = async () => {
        try {
            await axiosClient.post('/auth/logout')
            removeItem(KEY_ACCESS_TOKEN)
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='Navbar'>
            <div className="Navbar__brand">
                {/* letter put here user name */}
                <h1 className='Navbar__brandTxt'>Shoaib Mohammed</h1>
            </div>
            <div className="Navbar__heading">
                <h2 className='Navbar__headingTxt'>User Authentication </h2>
            </div>
            <div className="Navbar__logout" onClick={handleLogoutClick}>
                <div className="Navbar__userProfilr"></div>
                {/* <FaUserCircle className='Navbar__icon-user' /> */}
                <p className='Navbar__logoutTxt'>Logout</p>
                <AiOutlineLogout className='Navbar__icon-logout' />
            </div>
        </div>
    )
}

export default Navbar