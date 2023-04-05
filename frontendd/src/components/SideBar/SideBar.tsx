import { resetUser } from '@/features/private/user/userSlice';
import { useAppSelector, useAppDispatch } from '@/network/hooks';
import { Power } from 'phosphor-react';
import React from 'react'
import useWindowSize from '../../hooks/useWindowSize';
import BoardNamesTag from './BoardNamesTag'
import SideBardToggle from './HideSideBar'
import ToggleThemeSwitch from './ToggleThemeSwitch'

interface props {
    isSidebar: boolean,
    setIsSidebar: (val: boolean) => void;
}

const SideBar = ({ isSidebar, setIsSidebar }: props): JSX.Element => {
    const { user } = useAppSelector((state) => state.user);/*  */
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();


    function logout() {
        localStorage.removeItem('authToken');
        window.location.href = '/auth/login';
        dispatch(resetUser())
    }


    return (
        <>
            {
                width > 768 &&
                <section
                    className={`sidebar transition-all border-gray-50 border-r bg-white dark:bg-darkGrey dark:text-white dark:border-r-darkGreyLine border-r-lightGreyLine ease 
                        ${isSidebar ? "open transition-all border-gray-50 border-r bg-white dark:bg-darkGrey dark:text-white dark:border-r-darkGreyLine border-r-lightGreyLine ease"
                            :
                            ""}`
                    }
                >
                    <div className='sidebar-content flex flex-col justify-between h-[calc(90vh-120px)]'>
                        <BoardNamesTag />
                        <div>
                            <div onClick={logout} className='rounded flex p-4 w-4/5 mx-6 space-x-6 justify-center items-center bg-lightGrey dark:bg-veryDarkGrey'>
                                <button onClick={logout} className='hover:bg-lightGreyLine flex items-center justify-center border rounded-md p-3 space-x-2 max-w-[220px] w-full'>
                                    <Power size={22} color="#4a4db0" weight="thin" />&nbsp;&nbsp;&nbsp;
                                    <span className='font-normal text-darkGreyLine'>Logout</span>
                                </button>
                            </div>
                            <ToggleThemeSwitch />
                            <SideBardToggle setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default SideBar;
