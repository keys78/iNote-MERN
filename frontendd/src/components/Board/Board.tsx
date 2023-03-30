import ShowSidebar from "./ShowSideBar";
import { useAppSelector } from '../../network/hooks'
import NoBoard from "./NoBoard";
import Task from "./Task";

interface props {
  isSidebar: boolean,
  setIsSidebar: (val: boolean) => void;
}


const Board = ({ isSidebar, setIsSidebar }: props): JSX.Element => {
  const user: any = useAppSelector((state) => state.user);
  const boards = user?.boards


  return (
    <>
      <ShowSidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
      <div className="bg-red-500 w-full dark:bg-veryDarkGrey">
        {boards?.length !== 0 ? <Task task={boards} /> : <NoBoard />}
      </div>
    </>
  )
}

export default Board;

