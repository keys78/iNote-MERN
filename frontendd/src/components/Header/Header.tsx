import React, { useState } from 'react'
import Image from 'next/image'
import Button from '../shared/Button'
import EditButton from '../shared/EditButton'
import { useTheme } from "next-themes"
// import Modal from '@components/Modal'
// import AddNewTaskModal from '@components/Modal/AddNewTaskModal'
// import { RootState } from 'app/store'
import { useAppSelector } from '../../network/hooks'
import UpdateBoardModal from '../Modal/UpdateBoardModal'
import Modal from '../Modal'
import AddNewTaskModal from '../Modal/AddNewTaskModal'
import UserActions from '../User/UserActions'
// import { useWindowSize } from 'usehooks-ts'





const Header = () => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false)
  const { theme } = useTheme();
  // const { width } = useWindowSize()
  const { board } = useAppSelector((state) => state.board);
  const { user } = useAppSelector(state => state.user)



  return (
    <>
      <header className='flex items-center justify-between h-[85px] bg-white dark:bg-darkGrey dark:text-white dark:border-darkGreyLine border-b-2 w-[100vw]'>
        <div className="w-[360px] p-8 box-border transition-all ease border-r border-r-lightGreyLine dark:border-r-darkGreyLine">
          <div className='text-2xl font-bold'>iNote</div>
        </div>

        <div className='flex items-center justify-between w-[100%] px-6'>
          <h1>{board ? board?.title : 'No Board Found'}</h1>
          {user?.boards?.length > 0 &&
            <div className='flex items-center space-x-4'>
              <Button text={"+ Add New Task"} padding={'py-3 px-4'} width={''} color={'text-white'} font_weight={'font-bold'} onClick={() => setIsAddNewTask(!isAddNewTask)} />
              <EditButton
                className={'-bottom-28 -left-44 border bg-red-500 '}
                type="Board" task={undefined} setShowDetails={function (value: React.SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.')
                }} />
            </div>
          }
          {/* <div className='relative'>
            <div className='flex items-center cursor-pointer'>
              <div className='uppercase border-2 border-bg-lightGrey text-mainPurple px-2 py-1 rounded-full'>
                {user?.username?.substring(0, 2)}
              </div>&nbsp;
              <div>V</div>
            </div>
            <div className='rounded-[6px] shadow-sm  absolute right-0 top-10 bg-white w-[150px] border'>
              <ul>
                <li className='py-2 px-3 text-[14px] hover:bg-lightGreyLine cursor-pointer'>Profile</li>
                <li className='py-2 px-3 text-[14px] hover:bg-lightGreyLine cursor-pointer'>Rate Us</li>
              </ul>
            </div>
          </div> */}
          <UserActions />
        </div>

        <Modal showModal={isAddNewTask} setShowModal={setIsAddNewTask}>
          <AddNewTaskModal />
        </Modal>
      </header>
    </>
  )
}

export default Header;