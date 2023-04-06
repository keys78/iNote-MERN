import ThemeToggle from "../SideBar/ToggleThemeSwitch";
import { useAppDispatch, useAppSelector } from "@/network/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import CreateNewBoardCTA from "../SideBar/CreateNewBoardCTA";
import { resetUser } from "@/features/private/user/userSlice";
import { Power } from "phosphor-react";


interface IProps {
    setShowMenu: any
}

const MobileMenu = ({setShowMenu}: IProps) => {
    const { user } = useAppSelector((state) => state.user)
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [activeBoard, setActiveBoard] = useState("");

    const handleBoardClick = (id: string) => {
        setActiveBoard(id);
        router.push(`/user/board/${id}`);
        setShowMenu( false)
    };


    function logout() {
        localStorage.removeItem('authToken');
        window.location.href = '/auth/login';
        dispatch(resetUser())
    }


    return (
        <div className="bg-white dark:bg-darkGrey rounded-lg py-6 mobile-adjust">
            <h3 className="font-bold text-sm text-mediumGrey tracking-widest ml-6 uppercase">All boards ({user?.boards?.length})</h3>
            <div className="mt-4 mb-4">
                {
                    user?.boards?.map((board: any, i: number) => (
                        <div
                            key={i}
                            onClick={() => handleBoardClick(board._id)}
                            className={`group text-mediumGrey cursor-pointer bg-mainPurple flex space-x-3 items-center pl-6 w-11/12 transition duration-500 bg-opacity-0 dark:hover:bg-white rounded-r-full hover:bg-opacity-10 hover:text-mainPurple ${activeBoard === board?._id && 'active-board'}`}>
                            <svg className="w-[20px]" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor" /></svg>
                            <h3
                                key={i}
                                className={`w-full  font-bold text-mediumGrey py-3 group-hover:text-mainPurple ${activeBoard === board?._id && 'active-board'}`}
                                onClick={() => handleBoardClick(board._id)}
                            >
                                {board.title}
                            </h3>
                        </div>
                    ))
                }
                <CreateNewBoardCTA />
            </div>
            <div onClick={logout} className='rounded flex p-4 w-5/5 mx-6 space-x-6 justify-center items-center bg-lightGrey dark:bg-veryDarkGrey'>
                <button onClick={logout} className='hover:bg-lightGreyLine flex items-center justify-center border rounded-md p-3 space-x-2 max-w-[220px] w-full'>
                    <Power size={22} color="#4a4db0" weight="thin" />&nbsp;&nbsp;&nbsp;
                    <span className='font-normal text-darkGreyLine'>Logout</span>
                </button>
            </div>
            <ThemeToggle />
        </div>
    )
}
export default MobileMenu;

