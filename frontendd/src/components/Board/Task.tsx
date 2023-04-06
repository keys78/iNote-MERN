import Modal from '../Modal'
import TaskDetailsModal from '../Modal/TaskDetailsModal'
import React, { useEffect, useState } from 'react'
import EmptyBoard from './EmptyBoard'
import { CircleWavyCheck, ProhibitInset, TagChevron } from 'phosphor-react'
import { priorityArr } from '@/utils/data'
import { useAppDispatch, useAppSelector } from '@/network/hooks'
import NoBoard from './NoBoard'
import { getUser } from '@/features/private/user/userSlice'


interface IProps {
    task: any,
}

const Task = ({ task }: IProps) => {
    const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
    const { user }: any = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])



    const getGroupName = (status: any) => {
        switch (status) {
            case status:
                return status;
            default:
                break;
        }
    };


    const remed = task?.map((el: any) => {
        return {
            ...el,
            groupName: getGroupName(el.status)
        }
    })

    const groupByName = remed && remed.reduce((acc: any, obj: any) => {
        const key = obj.groupName;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});

    const priorityComponents = (item: any) => priorityArr.map(p => (
        item?.priority === p.name && <span key={p.name}>{p.icon}</span>
    ));




    const lists = groupByName && Object.keys(groupByName).map((key) => {
        const items = groupByName[key].map((item: any, i: number) => {
            const showModal = showDetails[item._id];
            const subtaskLength = item?.subTasks?.length
            const completedTaskCount = item?.subTasks?.filter((val: any) => val.isCompleted).length
            const isAllSubtasksCompleted = completedTaskCount === subtaskLength

            return (
                <>
                    <li onClick={() => setShowDetails({ ...showDetails, [item._id]: true })} key={i} className='group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white'>
                        <h4 className="font-bold text-[15px] mb-2 group-hover:text-mainPurple">{item.title}</h4>
                        <div className='flex items-center space-x-3'>
                            <p className="font-bold text-[12px] text-mediumGrey"> {item.subTasks.filter((val: any) => val.isCompleted).length} of {item.subTasks.length} subtasks</p>
                            {isAllSubtasksCompleted && subtaskLength !== 0 && <CircleWavyCheck size={20} color="#635FC7" weight="thin" />}
                            {priorityComponents(item)}
                        </div>
                    </li>
                    {/* {showModal && ( */}
                    <Modal showModal={showModal} setShowModal={(value) => setShowDetails({ ...showDetails, [item._id]: value })}>
                        <TaskDetailsModal item={item} setShowDetails={setShowDetails} priority={priorityComponents(item)} isAllSubtasksCompleted={isAllSubtasksCompleted} subtaskLength={subtaskLength} />
                    </Modal>
                    {/* )} */}
                </>
            );
        });
        return (
            <div key={key} className='column w-[280px] shrink-0'>
                <h3 className="text-[13px] tracking-widest font-bold text-mediumGrey uppercase mb-6">
                    <span className="inline-block h-3 w-3 rounded-full mr-3"></span>
                    {key} ({items?.length})
                </h3>
                <ul className="scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5">
                    {items}
                </ul>
            </div>
        );
    });


    return (
        <>
            {lists?.length ?
                <div
                    className='h-[calc(100vh-85px)] w-full overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple 
                    scrollbar-track-transparent flex-1 p-4 gap-[20px] bg-lightGrey dark:bg-veryDarkGrey flex'
                >
                    {lists}
                </div> :

                <>
                    {user?.boards.length <= 0 && <NoBoard />}
                    {user?.boards.length > 0 && <EmptyBoard />}

                </>
            }
        </>
    )
}

export default Task;
