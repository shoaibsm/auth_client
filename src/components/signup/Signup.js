import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.scss'
import { axiosClient } from '../../utils/axiosClient'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axiosClient.post('/auth/signup', {
                name,
                email,
                password
            })

            navigate('/login')
            console.log('signup result ', result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='Signup'>
            <div className="Signup__box">
                <h2 className='Signup__headingTxt'>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="name" className='Signup__name' id='name' onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" className='Signup__email' id='email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" className='Signup__password' id='password' onChange={(e) => setPassword(e.target.value)} />

                    <input type="submit" className='Signup__submit' />
                </form>
                <p className='Signup__navigationTxt'>Already have an account? <Link className='login-link' to={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup