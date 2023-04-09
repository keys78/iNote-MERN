import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getBoard } from '@/features/private/boards/boardSlice';
import Task from '@/components/Board/Task';
import { withAuth } from '@/middlewares/middleware';
import { getUser } from '@/features/private/user/userSlice';
import LoadingScreen from '@/components/Loaders/LoadingScreen';

const BoardDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query.id;
  const { board, isLoading } = useAppSelector((state) => state.board);

  const prevBoardRef = useRef(board);

  // useEffect(() => {
    
  //   dispatch(getBoard({ id: query }));
  //   dispatch(getUser())

  //   if (isLoading) {
  //     return <LoadingScreen />
  //   }
  // }, [dispatch, isLoading, query])

  useEffect(() => {
    const fetchBoardAndUser = async () => {
      dispatch(getBoard({ id: query }));
      dispatch(getUser());
    };
  
    fetchBoardAndUser();
  }, [dispatch, query]);
  
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  


  return (
    <Layout>
      <Task task={board?.notes} />
    </Layout>
  )
}

// export default withAuth(BoardDetails)
export default BoardDetails;