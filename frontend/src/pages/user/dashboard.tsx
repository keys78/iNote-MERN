import React, { useEffect } from 'react'
import { getUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'


const Dashboard = () => {
    const user: any = useAppSelector((state) => state.user);
    console.log(user)


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])


  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}

export default withAuth(Dashboard);
