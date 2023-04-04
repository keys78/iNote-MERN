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
import { useRouter } from 'next/router'
import useWindowSize from '@/hooks/useWindowSize'
import Logo from '../Logo'
import { characterLimit } from '@/utils/general'





const Header = () => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false)
  const router = useRouter();
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const { board } = useAppSelector((state) => state.board);
  const { user } = useAppSelector(state => state.user)

  const [showMenu, setShowMenu] = useState<boolean>(false)



  return (
    <>
      <header className='flex items-center justify-between h-[85px] bg-white dark:bg-darkGrey dark:text-white dark:border-darkGreyLine border-b-2'>
      <div className="flex items-center ">
            <AnimatePresence>
        {
          width > 768 ? (
            <div className="w-[360px] p-8 box-border transition-all ease border-r border-r-lightGreyLine dark:border-r-darkGreyLine">
              <div onClick={() => router.push('/user/dashboard')} className='text-[30px] font-bold cursor-pointer' style={{ background: 'linear-gradient(to right, #02002e, #b6b4df 50%, #FFFFFF 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>iNote</div>
            </div>) : (
            <div className='pl-[16px]'>
              <Image src="/assets/logo-mobile.svg" alt="kanban logo" height={25} width={24} />
              <button className="flex justify-center items-center" onClick={() => setShowMenu(true)}>
                <h2 className="heading-lg ml-5 mr-2">{characterLimit(board ? board?.title : 'No Board Found', 6)}</h2>
                {
                  showMenu ? (
                    <Image src="/assets/icon-chevron-up.svg" alt="chevron" height={4} width={8} />
                  ) : (
                    <Image src="/assets/icon-chevron-down.svg" alt="chevron" height={4} width={8} />
                  )
                }
              </button>
            </div>
          )}
            </AnimatePresence>

</div>

        <div className='flex items-center justify-between w-[100%] sm:px-6 px-3'>
          {width > 768 ? <h1 className='font-semibold text-[18px] text-mediumGrey capitalize'>{characterLimit(board ? board?.title : 'No Board Found', 6)}</h1> : <span>&nbsp;</span>} 
          {user?.boards?.length > 0 &&
            <div className='flex items-center space-x-4'>
              {
                width > 768 ? (
                  <Button text={"+ Add New Task"} padding={'py-3 px-4'} width={''} color={'text-white'} font_weight={'font-bold'} onClick={() => setIsAddNewTask(!isAddNewTask)} />
                ) : (
                  <button className="bg-mainPurple rounded-2xl py-3 px-4 flex justify-center items-center" onClick={() => setIsAddNewTask(!isAddNewTask)}>
                    <Image src="/assets/icon-add-task-mobile.svg" alt="plus icon" height={12} width={12} />
                  </button>
                )}
              <EditButton
                className={'-bottom-28 -left-44 border bg-red-500 '}
                type="Board" task={undefined} setShowDetails={function (value: React.SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.')
                }} />
              <UserActions />
            </div>
          }
        </div>

        <Modal showModal={isAddNewTask} setShowModal={setIsAddNewTask}>
          <AddNewTaskModal />
        </Modal>
      </header>
    </>
  )
}

export default Header;