// import Modal from '@components/Modal';
// import MobileBoardMenu from '@components/Modal/MobileBoardMenu';
import { resetUser } from '@/features/private/user/userSlice';
import { useAppSelector, useAppDispatch } from '@/network/hooks';
import React, { useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize';
import BoardNamesTag from './BoardNamesTag'
import CreateNewBoardCTA from './CreateNewBoardCTA';
import SideBardToggle from './HideSideBar'
import ToggleThemeSwitch from './ToggleThemeSwitch'

interface props {
    isSidebar: boolean,
    setIsSidebar: (val: boolean) => void;
}

const SideBar = ({ isSidebar, setIsSidebar }: props): JSX.Element => {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    console.log('hbulb', user)

    function logout() {
        localStorage.removeItem('authToken');
        window.location.href = '/auth/login';
        dispatch(resetUser())
      }


    // const { width } = useWindowSize();
    const [showMobileNav, setShowMobileNav] = useState<boolean>(true)

    return (
        <>
            {/* {width <= 768 ? (
                // <Modal setShowModal={setShowMobileNav} showModal={showMobileNav}>
                //     <MobileBoardMenu />
                // </Modal>
                <div>Hello</div>
            ) : (

                <section className='min-w-[301px] transition-all border-r bg-white dark:bg-darkGrey dark:text-white dark:border-r-darkGreyLine border-r-lightGreyLine ease '>
                    <div className='flex flex-col justify-between h-[calc(90vh-120px)]'>
                        <BoardNamesTag />
                        <div>
                            <ToggleThemeSwitch />
                            <SideBardToggle setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
                        </div>
                    </div>
                </section>
            )
            } */}
            <section className='min-w-[301px] transition-all border-gray-50 border-r bg-white dark:bg-darkGrey dark:text-white dark:border-r-darkGreyLine border-r-lightGreyLine ease'>
                <div className='flex flex-col justify-between h-[calc(90vh-120px)]'>
                    <BoardNamesTag />
                    <div>
                        <ToggleThemeSwitch />
                        <SideBardToggle setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
                    </div>
                    <div className='flex items-center justify-center'>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SideBar
