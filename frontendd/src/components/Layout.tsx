import { useAppDispatch, useAppSelector } from '@/network/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Board from './Board'
import Header from './Header'
import Loader from './Loader'
import SideBar from './SideBar'

const Layout = ({ children }: any) => {
  const [isSidebar, setIsSidebar] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, user } = useAppSelector((state) => state.user)
  const { isLoading: boardLoader } = useAppSelector((state) => state.board)

  
  useEffect(() => {
    if (user?.boards?.length === 0) {
      router.replace('/user/dashboard')
    }
  }, [dispatch, router, user?.boards?.length])

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