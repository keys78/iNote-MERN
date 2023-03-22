import React, { useEffect, useState } from 'react'
import { getUser, resetUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'



const Dashboard = () => {
  const user: any = useAppSelector((state) => state.user);
  console.log(user)


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/auth/login';
    // dispatch(resetUser())
  }

  const [isSidebar, setIsSidebar] = useState<boolean>(false)



  return (
    <>
    <Header />
    <SideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar}/>
    <br /><br />
      {!user && 'loading...'}
      <div>
        {JSON.stringify(user)}

        <br /><br /><br />
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </>
  )
}

export default withAuth(Dashboard);
