import React, { useEffect } from 'react'
import { getUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"


const Dashboard = () => {
    const user: any = useAppSelector((state) => state.user);
    console.log(user)


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, [])


  return (
    <div>dashboard</div>
  )
}

export default Dashboard