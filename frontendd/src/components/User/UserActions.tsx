import { useAppSelector } from '@/network/hooks'
import React, { useRef, useState } from 'react'
import Modal from '../Modal'
import Ratings from './Ratings'
import ChangePassword from './ChangePassword'
import UserProfileModal from './UserProfileModal'
import Image from 'next/image'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import PairSystem from './Pair/PairSystem'

const UserActions = () => {
    const { user } = useAppSelector(state => state.user)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [isUser, setIsUser] = useState<boolean>(false)
    const [isRating, setIsRating] = useState<boolean>(false)
    const [isChangePasswordModal, setIsChangePasswordModal] = useState<boolean>(false)
    const modalRef = useRef(null);
    const handleClickOutside = () => { setShowModal(!showModal) }
    useOnClickOutside(modalRef, handleClickOutside)


    return (
        <>
            <div className='relative dark:bg-darkGrey dark:text-white'>
                <div onClick={() => setShowModal(!showModal)} className='flex items-center cursor-pointer'>
                    <div className='name-tag uppercase bg-mainPurple text-white'>
                        {user?.username?.substring(0, 2)}
                    </div>
                    {user?.pairmode?.isActive &&
                        <div className='name-tag-two bg-white dark:bg-veryDarkGrey dark:text-white text-mainPurple uppercase border-2 dark:border-veryDarkGrey border-bg-lightGrey '>
                            {user?.pairmode?.initials?.substring(0, 2)}
                        </div>
                    }
                    &nbsp;
                    <Image alt='chevron-down' src={'/assets/icon-chevron-down.svg'} width="0" height="0" className="w-[13px] h-auto" />

                </div>
                {showModal &&
                    <div ref={modalRef} className='rounded-[6px]  border z-10 border-lightGreyLine dark:border-darkGreyLine shadow-sm absolute right-0 top-14 bg-white dark:bg-darkGrey dark:text-whitedark:bg-darkGrey dark:text-white w-[300px]'>
                        <ul>
                            <PairSystem setShowModal={setShowModal}/>
                            <li onClick={() => setIsUser(!isUser)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>Profile</li>
                            <li onClick={() => setIsChangePasswordModal(!isChangePasswordModal)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>Change Password</li>
                            <li onClick={() => setIsRating(!isRating)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>Rate App</li>
                        </ul>
                    </div>
                }
            </div>

            <Modal setShowModal={setIsUser} showModal={isUser}>
                <UserProfileModal />
            </Modal>
            <Modal setShowModal={setIsRating} showModal={isRating}>
                <Ratings setIsRating={setIsRating} />
            </Modal>
            <Modal setShowModal={setIsChangePasswordModal} showModal={isChangePasswordModal}>
                <ChangePassword setIsChangePasswordModal={setIsChangePasswordModal} />
            </Modal>
        </>
    )
}

export default UserActions