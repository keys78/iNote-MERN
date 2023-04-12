import { resetBoard } from '@/features/private/boards/boardSlice';
import { resetUser } from '@/features/private/user/userSlice';
import { useAppDispatch } from '@/network/hooks';
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
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();


    function logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('countdown_start');
        window.location.href = '/auth/login';
        setTimeout(() => {
            dispatch(resetUser());
            dispatch(resetBoard());
        }, 3000);
    }



    return (
        <>
            {
                width > 766 &&
                <section
                    className={`sidebar z-0 transition-all border-gray-50 border-r bg-white dark:bg-darkGrey dark:text-white dark:border-r-darkGreyLine border-r-lightGreyLine ease 
                        ${isSidebar ? "open "
                            :
                            ""}`
                    }
                >
                    <div className='sidebar-content flex flex-col justify-between h-[calc(90vh-120px)]'>
                        <BoardNamesTag />
                        <div>
                            <div onClick={logout} className='rounded flex p-4 w-4/5 mx-6 space-x-6 dark:text-white justify-center items-center bg-lightGrey dark:bg-veryDarkGrey'>
                                <button className='hover:bg-lightGreyLine  flex items-center justify-center dark:border-darkGreyLine border-lightGreyLine rounded-md px-3 py-1 space-x-2 max-w-[220px] w-full'>
                                    <Power size={22} color="#4a4db0" weight="thin" />&nbsp;&nbsp;&nbsp;
                                    <span className='font-normal text-mediumGrey'>Logout</span>
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
