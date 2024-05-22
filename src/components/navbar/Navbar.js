import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { AiOutlineLogout } from "react-icons/ai";
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStoragemanager';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';

function Navbar() {
    const [name, setName] = useState('')

    const navigate = useNavigate()

    const getMyInfo = async () => {
        try {
            const response = await axiosClient.get('/user/getMyInfo')

            const userName = response?.data?.result?.user?.name ?? 'User Name'

            setName(userName)

        } catch (error) {
            console.log(error);
        }
    }

    const handleLogoutClick = async () => {
        try {
            await axiosClient.post('/auth/logout')
            removeItem(KEY_ACCESS_TOKEN)
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getMyInfo()

    }, [])

    return (
        <div className='Navbar'>
            <div className="Navbar__brand">
                <h1 className='Navbar__brandTxt'>{name ? name : 'User Name'} </h1>
            </div>
            <div className="Navbar__heading">
                <h2 className='Navbar__headingTxt'>User Authentication </h2>
            </div>
            <div className="Navbar__logout" onClick={handleLogoutClick}>
                <div className="Navbar__userProfilr"></div>
                <p className='Navbar__logoutTxt'>Logout</p>
                <AiOutlineLogout className='Navbar__icon-logout' />
            </div>
        </div>
    )
}

export default Navbar