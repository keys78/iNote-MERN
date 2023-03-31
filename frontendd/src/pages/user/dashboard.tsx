import React, { useEffect, useState } from 'react'
import { getUser, resetUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'
import Board from '../../components/Board/Board'
import Layout from '@/components/Layout'



const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  // console.log(user)


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])



  const [isSidebar, setIsSidebar] = useState<boolean>(true)


  return (
    <Layout>
      <Board setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
    </Layout>
  )
}

// export default withAuth(Dashboard);
export default Dashboard;
