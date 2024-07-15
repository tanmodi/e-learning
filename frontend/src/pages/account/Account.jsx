import React from 'react'
import { MdDashboard } from "react-icons/md";
import './account.css'

const Account = ( {user }) => {
  return (
    <div className='profile'>
        <h2>My profile</h2>
        <div className="profile-info">
            <p>
                <strong><span>Name - </span>{user.name}</strong>
            </p>
            <p>
                <strong><span>Email - </span>{user.email}</strong>

            </p>
            <p>
                <strong><span>Role - </span>{user.role}</strong>
            </p>

            <button className='common-btn'>
                <MdDashboard  />
                Dashboard
            </button>

        </div>

    </div>
  )
}

export default Account