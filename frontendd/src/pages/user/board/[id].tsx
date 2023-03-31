import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getBoard } from '@/features/private/boards/boardSlice';
import Task from '@/components/Board/Task';

const BoardDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query.id;
  const { board } = useAppSelector((state) => state.board);

  const prevBoardRef = useRef(board);

  useEffect(() => {
    dispatch(getBoard({ id: query }));
    
  }, [dispatch, query])


  return (
    <Layout>
      <Task task={board?.notes} />
    </Layout>
  )
}

export default BoardDetails