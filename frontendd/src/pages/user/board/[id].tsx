import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getBoard } from '@/features/private/boards/boardSlice';
import BoardColumn from '@/components/Board/BoardColumn';

const BoardDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query.id;


  const { board } = useAppSelector((state) => state.board);

  useEffect(() => {
    dispatch(getBoard({ id: query }))
  }, [dispatch, query])



  return (
    <Layout>
      <div className='flex items-center justify-center'>
        <BoardColumn board={board} />
      </div>
    </Layout>
  )
}

export default BoardDetails