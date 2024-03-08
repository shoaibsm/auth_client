import React, { useState } from 'react'
import './Login.scss'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStoragemanager'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('/auth/login', {
                email,
                password
            })

            // const responseResult = response.data.result.result || response.data.result;
            // const responseResult = response.data.result.result;

            // console.log('response reult login  is :', responseResult);

            // const userId = response.data.result.userId

            // console.log('response from login.js ', response);
            console.log('response from login.js ', response);

            const accessToken = response.result.accessToken
            const userId = response.result.userId

            console.log('accessToken in login.js ', accessToken);

            console.log('userId in login.js ', userId);

            // console.log('access token in login form ', response.data.result.accessToken);

            // console.log('userId in login form ', response.data.result.userId);

            setItem(KEY_ACCESS_TOKEN, response.result.accessToken)
            // setUserId(response.result.accessToken)

            // console.log('User id from response ', userId);

            // setLoggedInUserId(userId)

            // console.log('got user id in login ', { loggedInUserId });


            navigate(`/user/${userId}`)

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='Login'>
            <div className="Login__box">
                <h2 className='Login__headingTxt'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className='Login__email' id='email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" className='Login__password' id='password' onChange={(e) => setPassword(e.target.value)} />

                    <input type="submit" className='Login__submit' />
                </form>
                <p className='Login__navigationTxt'>Dont have an account? <Link className='signup-link' to={'/signup'}>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login