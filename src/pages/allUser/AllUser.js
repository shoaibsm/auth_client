import React, { useEffect } from 'react'
import './AllUser.scss'
import { axiosClient } from '../../utils/axiosClient';

function AllUser({ allUsers }) {


    console.log('All Users in AllUser.js : ', allUsers);

    return (
        <div className='AllUser'>
            {allUsers?.result?.allUser && <h2 className='AllUser__headingTxt'>All Users</h2>}

            <div className="AllUser__cardContainer">
                {allUsers?.result?.allUser && allUsers.result.allUser.map((user) => {
                    return (
                        <div key={user._id} className='AllUser__userCard'>
                            <p className='AllUser__userName'>{user.name}</p>
                            <p className='AllUser__userEmail'>{user.email}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllUser