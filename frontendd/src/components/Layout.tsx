import { getUser } from '@/features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/network/hooks'
import React, { useEffect, useState } from 'react'
import Board from './Board'
import Header from './Header'
import Loader from './Loader'
import SideBar from './SideBar'

const Layout = ({ children }: any) => {
  const [isSidebar, setIsSidebar] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.user) 
  const { isLoading: boardLoader } = useAppSelector((state) => state.board) 


  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <section className='w-full'>
      {isLoading || boardLoader && <Loader />}
      <Header />
      <div className='flex h-[calc(100vh-85px)] w-full'>
        <SideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
        {children}
      </div>

    </section>

  )
}

export default Layout