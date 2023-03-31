import Button from "../shared/Button"
import { useEffect, useState } from 'react'
import Modal from "../Modal"
import CreateNewBoard from "../Modal/CreateNewBoard"
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { getUser } from "@/features/private/user/userSlice"

const NoBoard = () => {
    const [isCreateBoardModal, setIsCreateBoardModal] = useState<boolean>(false)
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <>
            {user?.username &&
                <>
                    <div className="flex flex-col justify-center items-center w-full h-full bg-lightGrey dark:bg-veryDarkGrey">
                        <h2 className="heading-lg text-mediumGrey text-center">Hi {user?.username}, you have no boards created yet.</h2> <br />
                        <Button onClick={() => setIsCreateBoardModal(!isCreateBoardModal)} text={"+ Create New Board"} padding={'py-3 px-4'} width={''} color={'text-white'} font_weight={'font-bold'} />
                    </div>
                    <Modal showModal={isCreateBoardModal} setShowModal={setIsCreateBoardModal} >
                        <CreateNewBoard showModal={isCreateBoardModal} setShowModal={setIsCreateBoardModal} />
                    </Modal>
                </>
            }
        </>
    )
}
export default NoBoard
