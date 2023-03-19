import React, { useState } from 'react'
import Image from 'next/image'
import Button from '../shared/Button'
import EditButton from '../shared/EditButton'
import { useTheme } from "next-themes"
// import Modal from '@components/Modal'
// import AddNewTaskModal from '@components/Modal/AddNewTaskModal'
// import { RootState } from 'app/store'
import { useAppSelector } from '../../network/hooks'
// import { useWindowSize } from 'usehooks-ts'





const Header = () => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false)
  const { theme } = useTheme();
  // const { width } = useWindowSize()

  const { user } = useAppSelector(state => state.user)
  // const currentBoard = useAppSelector((state: RootState) => state?.currentBoard)
  // const boardTitle: any = data?.length && (data)[currentBoard.value].name


  return (
    <>
      <header className='flex items-center justify-between h-[85px] bg-white dark:bg-darkGrey dark:text-white dark:border-darkGreyLine border-b-2 w-[100vw]'>
        <div className="w-[360px] p-8 box-border transition-all ease border-r border-r-lightGreyLine dark:border-r-darkGreyLine">
          <div className=''>iNote</div>
        </div>
        
        <div className='flex items-center justify-between w-[100%] px-6'>
          <h1>{'board name'}</h1>
          <div className='flex items-center space-x-4'>
            <Button text={"+ Add New Task"} padding={'py-3 px-4'} width={''} color={'text-white'} font_weight={'font-bold'} onClick={() => setIsAddNewTask(!isAddNewTask)} />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;