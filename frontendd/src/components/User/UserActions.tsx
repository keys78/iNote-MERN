import { useAppSelector } from '@/network/hooks'
import React, { useState } from 'react'
import Modal from '../Modal'
import Ratings from './Ratings'
import UserProfileModal from './UserProfileModal'

const UserActions = () => {
    const { user } = useAppSelector(state => state.user)
    const [isUser, setIsUser] = useState<boolean>(false)
    const [isRating, setIsRating] = useState<boolean>(false)

    return (
        <>
            <div className='relative'>
                <div className='flex items-center cursor-pointer'>
                    <div className='uppercase border-2 border-bg-lightGrey text-mainPurple px-2 py-1 rounded-full'>
                        {user?.username?.substring(0, 2)}
                    </div>&nbsp;
                    <div>V</div>
                </div>
                <div className='rounded-[6px] shadow-sm  absolute right-0 top-10 bg-white w-[150px] border'>
                    <ul>
                        <li onClick={() => setIsUser(!isUser)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine cursor-pointer'>Profile</li>
                        <li onClick={() => setIsRating(!isRating)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine cursor-pointer'>Rate Us</li>
                    </ul>
                </div>
            </div>

            <Modal setShowModal={setIsUser} showModal={isUser}>
                <UserProfileModal />
            </Modal>
            <Modal setShowModal={setIsRating} showModal={isRating}>
                <Ratings />
            </Modal>
        </>
    )
}

export default UserActions