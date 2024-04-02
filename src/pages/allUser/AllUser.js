import React from 'react'
import './AllUser.scss'

function AllUser({ allUsers }) {

    return (
        <div className='AllUser'>

            {allUsers && <h2 className='AllUser__headingTxt'>All Users</h2>}

            <div className="AllUser__cardContainer">
                {allUsers && allUsers.map((user) => {
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