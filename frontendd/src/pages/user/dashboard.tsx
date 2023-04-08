import React, { useEffect, useState } from 'react'
import { getUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'
import Layout from '@/components/Layout'
import Task from '@/components/Board/Task'
import { resetBoard } from '@/features/private/boards/boardSlice'



const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  const { board } = useAppSelector((state) => state.board);



  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser())
    dispatch(resetBoard())
  }, [dispatch])



  const [isSidebar, setIsSidebar] = useState<boolean>(true)


  return (
    <Layout>
      <Task task={board?.notes} />
    </Layout>
  )
}

// export default withAuth(Dashboard);
export default Dashboard;
