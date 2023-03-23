import React, { useState } from 'react'
import Board from './Board'
import Header from './Header'
import SideBar from './SideBar'

const Layout = ({ children }: any) => {
  const [isSidebar, setIsSidebar] = useState<boolean>(false)

  return (
    <section className='w-full border-red-600 border-3'>
      <Header />
      <div className='flex h-[calc(100vh-85px)]'>
        <SideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
        {children}
      </div>

    </section>

  )
}

export default Layout