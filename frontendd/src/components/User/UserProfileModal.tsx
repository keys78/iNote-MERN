import { useAppSelector } from '@/network/hooks'
import formatDate from '@/utils/general'
import React from 'react'

const UserProfileModal = () => {
    const { user } = useAppSelector(state => state.user)

    return (
    <div>
        <h1 className='font-bold text-[24px]'>User Profile</h1>
        <br />
       <div className='border p-2 rounded-md'>
       <div className='grid grid-cols-2'>
            <span>Username:</span><span>{user?.username}</span><br />
        </div>
        <div className='grid grid-cols-2'>
            <span>Email:</span><span>{user?.email}</span><br />
        </div>
        <div className='grid grid-cols-2'>
            <span>Role:</span><span>{user?.role}</span><br />
        </div>
        <div className='grid grid-cols-2'>
            <span>Date Joined:</span><span>{formatDate(user?.createdAt)}</span><br />
        </div>
       </div>
    </div>
  )
}

export default UserProfileModal