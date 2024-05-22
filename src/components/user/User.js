import { useParams } from 'react-router-dom'
import './User.scss'
import { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import userImgDummy from '../../assets/userImg.png'
import { MdOutlineDelete } from "react-icons/md";
import AllUser from '../allUser/AllUser';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStoragemanager';

function User() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userImg, setUserImg] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    const getMyInfo = async () => {
        try {
            const response = await axiosClient.get('/user/getMyInfo')

            const userName = response?.data?.result?.user?.name ?? 'User Name'
            const userEmail = response?.data?.result?.user?.email ?? 'User Email'
            const imgUrl = response?.data?.result?.user?.avatar?.url

            setName(userName)
            setEmail(userEmail)
            setUserImg(imgUrl)

        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async () => {
        try {
            const response = await axiosClient.delete(`/user/deleteUser`);
            console.log('response from Delete user API ', response);

            removeItem(KEY_ACCESS_TOKEN)
            setIsDeleted(true);

            window.location.replace('/login', '_self');

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        getMyInfo()

    }, [])

    const getAllUser = async () => {
        try {
            const response = await axiosClient.get('/user/allUser')

            const allUserData = response?.result?.allUser

            setAllUsers(allUserData)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='UserInfo'>
            {isDeleted ? (<p className='UserInfo__deleteText'>User has been deleted...!</p>) :
                (<div className='UserInfo__card'>
                    <div className='UserInfo__userProfile'>
                        <img src={userImg ? userImg : userImgDummy} alt={name} />
                    </div>
                    <div className='UserInfo__userDetails'>
                        <h5 className='UserInfo__userName'>{name}</h5>
                        <p className='UserInfo__userEmail'>{email}</p>
                    </div>
                    <div className='UserInfo__deleteAccount' onClick={deleteUser}>
                        <MdOutlineDelete className='deleteAccount-icon' />
                    </div>
                </div>)
            }
            <button className='UserInfo__showAllUser' onClick={getAllUser}>Show All User</button>
            <AllUser allUsers={allUsers} />
        </div>
    )
}

export default User