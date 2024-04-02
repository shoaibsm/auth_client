import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './User.scss'
import { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import userImg from '../../assets/userImg.png'
import { MdOutlineDelete } from "react-icons/md";
import AllUser from '../allUser/AllUser';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStoragemanager';

function User() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    const params = useParams()

    const deleteUser = async () => {
        try {
            const response = await axiosClient.delete(`/user/deleteUser/${params.userId}`);
            console.log('response from Delete user API ', response);

            removeItem(KEY_ACCESS_TOKEN)

            window.location.replace('/login', '_self');

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/user/getUser/${params.userId}`)

                setName(response.result.user.name)
                setEmail(response.result.user.email)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [params.userId, isDeleted])

    const getAllUser = async () => {
        try {
            const response = await axiosClient.get('/user/allUser')

            const allUserData = response.result.allUser

            setAllUsers(allUserData)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='UserInfo'>
            <Navbar />
            {isDeleted ? (<p className='UserInfo__deleteText'>User has been deleted...!</p>) :
                (<div className='UserInfo__card'>
                    <div className='UserInfo__userProfile'>
                        <img src={userImg} alt={name} />
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