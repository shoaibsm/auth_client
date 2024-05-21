import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.scss'
import { axiosClient } from '../../utils/axiosClient'
import { MdUpload } from "react-icons/md";

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userImg, setUserImg] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        try {
            const result = await axiosClient.post('/auth/signup', {
                name,
                email,
                password,
                userImg
            })

            if (result.status === 'ok') {
                navigate('/login')
            } else {
                console.log('error in signup ', error);
                setError(result.message || 'Something went wrong, please try again.')
            }

        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        }
    }

    const handleChange = async (e) => {
        try {
            const file = e.target.files[0]
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                if (fileReader.readyState === fileReader.DONE) {
                    setUserImg(fileReader.result)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='Signup'>
            <div className="Signup__box">
                <h2 className='Signup__headingTxt'>Signup</h2>
                <form onSubmit={handleSubmit} className='Signup__signupForm'>
                    <label htmlFor="name">Name</label>
                    <input type="name" className='Signup__name' id='name' onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" className='Signup__email' id='email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" className='Signup__password' id='password' onChange={(e) => setPassword(e.target.value)} />

                    <div className="Signup__userImg-box">
                        <label htmlFor="Signup__inputImg" className='Signup__uploadLabel'>Upload Image</label>
                        <input className='Signup__inputImg' type="file" id='inputImg' accept='image/*' onChange={handleChange} />
                        <MdUpload className='Signup__upload' />
                    </div>

                    <input type="submit" className='Signup__submit' value="Signup" />
                </form>
                <p className='Signup__navigationTxt'>Already have an account? <Link className='login-link' to={'/login'}>Login</Link></p>

                {error && <p className="Signup__error">{error}</p>}
            </div>

        </div>
    )
}

export default Signup