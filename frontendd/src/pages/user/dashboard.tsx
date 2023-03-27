import React, { useEffect, useState } from 'react'
import { getUser, resetUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import Board from '../../components/Board/Board'
import Layout from '@/components/Layout'



const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  // console.log(user)


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch, user])



  const [isSidebar, setIsSidebar] = useState<boolean>(true)


  return (
    <Layout>
      <Board setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
    </Layout>
  )
}

export default withAuth(Dashboard);
