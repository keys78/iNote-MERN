import ShowSidebar from "./ShowSideBar";
import BoardColumn from "./BoardColumn";
import { useAppSelector, useAppDispatch } from '../../network/hooks'
import CreateNewBoard from "../Modal/CreateNewBoard";
import NoBoard from "./NoBoard";
import { useEffect } from "react";
import { getUser } from "@/features/private/user/userSlice";
import { useRouter } from "next/router";
import Task from "./Task";

interface props {
  isSidebar: boolean,
  setIsSidebar: (val: boolean) => void;
}



const Board = ({ isSidebar, setIsSidebar }: props): JSX.Element => {
  const user: any = useAppSelector((state) => state.user);
  const router = useRouter();

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getUser())
  // }, [dispatch])

  const boards = user?.boards

  // useEffect(() => {
  //   if(boards !== 0){
  //     // router.push(`/user/board/${boards[0]?._id}`)
  //   }
  //   console.log('bo-zero',boards && boards[0]?._id)
  // }, [boards, router])

  return (
    <>
      <ShowSidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
      <div className="bg-lightGrey w-full dark:bg-veryDarkGrey">
        {boards?.length !==0 ? <Task task={boards} /> : <NoBoard />}
      </div>
    </>
  )
}

export default Board;

