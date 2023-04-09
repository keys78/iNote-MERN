import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getBoard } from '@/features/private/boards/boardSlice';
import Task from '@/components/Board/Task';
import { withAuth } from '@/middlewares/middleware';
import { getUser } from '@/features/private/user/userSlice';

const BoardDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query.id;
  const { board } = useAppSelector((state) => state.board);

  useEffect(() => {
    const fetchBoardAndUser = async () => {
      dispatch(getBoard({ id: router.query.id }));
      dispatch(getUser());
    };
  
    fetchBoardAndUser();
  }, [dispatch, query, router.query.id]);
  
 


  return (
    <Layout>
      <Task task={board?.notes} />
    </Layout>
  )
}

export default withAuth(BoardDetails)


// import React, { useEffect, useMemo, useState } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '@/components/Layout';
// import { useAppDispatch, useAppSelector } from '@/network/hooks';
// import { getBoard } from '@/features/private/boards/boardSlice';
// import Task from '@/components/Board/Task';
// import { withAuth } from '@/middlewares/middleware';
// import { getUser } from '@/features/private/user/userSlice';

// const BoardDetails = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const query = router.query.id;
//   const { board } = useAppSelector((state) => state.board);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchBoardAndUser = async () => {
//       await Promise.all([dispatch(getBoard({ id: router.query.id })), dispatch(getUser())]);
//       setIsLoading(false);
//     };

//     fetchBoardAndUser();
//   }, [dispatch, query, router.query.id]);

//   const memoizedBoard = useMemo(() => board, [board]);

//   return (
//     <Layout>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <Task task={memoizedBoard?.notes} />
//       )}
//     </Layout>
//   );
// };

// export default withAuth(BoardDetails);
