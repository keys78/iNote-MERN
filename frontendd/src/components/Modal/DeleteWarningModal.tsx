import { deleteBoard, deleteTask } from '../../../features/board/boardSlice'
import { useAppDispatch } from 'app/hooks'
import { Task } from '@src/types'
import { RootState } from 'app/store'
import { useAppSelector } from 'app/hooks'


interface deleteWarningProps {
    currentBoard: string
    currentTask: Task
    type: string
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
    setShowDeleteBoardModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteWarningModal = ({ type, currentBoard, setShowDetails, currentTask, setShowMenu, setShowDeleteBoardModal }: deleteWarningProps) => {

    const data = useAppSelector((state: RootState) => state.boards.boards)
    const currentBoardx = useAppSelector((state: RootState) => state?.currentBoard)
    const boardTitle: any = data?.length && (data)[ currentBoardx.value].name

    const dispatch = useAppDispatch();
    const deleteBoardAction = () => {
        dispatch(deleteBoard(currentBoard))
        setShowDeleteBoardModal(false)
    }

    const deleteTaskAction = () => {
        dispatch(deleteTask({taskTitle: currentTask.title, boardName: boardTitle, columnName: currentTask.status }))
        setShowDetails(false)
    }

    return (
        <div className="space-y-6 w-full mx-auto rounded-md bg-white dark:bg-darkGrey">
            <h1 className="text-mainRed font-bold text-[16px]">Delete this {type === "Board" ? 'board' : 'task'}?</h1>
            {type === 'Board' ? <p className="text-[13px] text-black">Are you sure you want to delete the &apos;{currentBoard}&apos; board? This action will remove all columns and tasks and cannot be reversed.</p> :
                <p className="text-[13px] text-black">Are you sure you want to delete the  &apos;{currentTask.title}&apos; task and its subtasks? This action cannot be reversed</p>
            }
            <div className="flex gap-4">

                <button className="flex-1 bg-mainRed text-white text-[13px] rounded-full p-2 transition duration-200 hover:bg-mainRedHover"
                    onClick={type === "Board"? deleteBoardAction : deleteTaskAction}
                >
                    Delete
                </button>
                <button onClick={() => { setShowDeleteBoardModal(false); setShowMenu(false) }} className="flex-1 bg-mainPurple bg-opacity-10 text-mainPurple text-[13px] rounded-full p-2 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white"  >
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default DeleteWarningModal;
