import React, { useState } from 'react'
import './Login.scss'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStoragemanager'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)

        try {
            const response = await axiosClient.post('/auth/login', {
                email,
                password
            })

            if (response && response.result) {

                const accessToken = response.result.accessToken
                const userId = response.result.userId

                console.log('accessToken in login.js ', accessToken);

                setItem(KEY_ACCESS_TOKEN, response.result.accessToken)

                navigate('/')
            } else {
                setError(response.message || 'Login failed. Please check your credentials and try again.')
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';

            setError(errorMessage);
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

                    <input type="submit" className='Login__submit' value="Login" />
                </form>
                <p className='Login__navigationTxt'>Dont have an account? <Link className='signup-link' to={'/signup'}>Sign Up</Link></p>

                {error && <p className="Signup__error">{error}</p>}
            </div>
        </div>
    )
}

export default Login