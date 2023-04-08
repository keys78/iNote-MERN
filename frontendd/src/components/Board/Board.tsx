// import ShowSidebar from "./ShowSideBar";
// import { useAppSelector, useAppDispatch } from '../../network/hooks'
// import CreateNewBoard from "../Modal/CreateNewBoard";
// import NoBoard from "./NoBoard";
// import { useEffect } from "react";
// import { getUser } from "@/features/private/user/userSlice";
// import { useRouter } from "next/router";
// import Task from "./Task";

// interface props {
//   isSidebar: boolean,
//   setIsSidebar: (val: boolean) => void;
// }



// const Board = ({ isSidebar, setIsSidebar }: props): JSX.Element => {
//   const { boards }: any = useAppSelector((state) => state.user);

//   // const boards = user?.boards


//   return (
//     <>
//       <ShowSidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
//       {/* <div className="bg-lightGrey w-full dark:bg-veryDarkGrey">
//         {boards?.length !== 0 ? <Task task={boards} /> : <NoBoard />}
//       </div> */}
//     </>
//   )
// }

// export default Board;

