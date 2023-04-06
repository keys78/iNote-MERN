import React, { useEffect, useState } from 'react'
import { getUser, resetUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'
import Board from '../../components/Board/Board'
import Layout from '@/components/Layout'
import Task from '@/components/Board/Task'



const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  const { board } = useAppSelector((state) => state.board);



  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getUser())
  // }, [dispatch])



  const [isSidebar, setIsSidebar] = useState<boolean>(true)


  return (
    <Layout>
      {/* <Board setIsSidebar={setIsSidebar} isSidebar={isSidebar} /> */}
      <Task task={board?.notes} />
    </Layout>
  )
}

// export default withAuth(Dashboard);
export default Dashboard;
