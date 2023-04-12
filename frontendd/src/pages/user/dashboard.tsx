import React, { useEffect } from 'react'
import { getUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'
import Layout from '@/components/Layout'
import Task from '@/components/Board/Task'
import { resetBoard } from '@/features/private/boards/boardSlice'



const Dashboard = () => {
  const { board } = useAppSelector((state) => state.board);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser())
    dispatch(resetBoard())
  }, [dispatch, user?.pairmode.isActive])

  return (
    <Layout>
      <Task task={board?.notes} />
    </Layout>
  )
}

export default Dashboard;
// export default withAuth(Dashboard);
