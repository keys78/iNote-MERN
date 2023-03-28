// import React, { useState } from 'react'
// import Image from 'next/image'
// import { useAppDispatch } from 'app/hooks'
// import { editSubtasks } from '../../../features/board/boardSlice'
// import SubTaskItem from './SubTaskItem';
// import { Task } from '@src/types';
// import { CircleWavyCheck } from 'phosphor-react'
// import StatustDropdown from '@components/shared/StatustDropdown'
// import Modal from '@components/Modal'
// import EditButton from '@components/shared/EditButton';

import React from 'react'
import SubTaskItem from './SubTaskItem';

interface IProps {
  item: any;
  // completedTaskCount: number
  // i: number
  // j: number
  // boardNameTag: string,
  // setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskDetailsModal = ({ item }: IProps) => {

  console.log('hekwo-details', item?.subTasks)
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-[18px] font-bold">{item.title}</h1>
        {/* <EditButton setShowDetails={setShowDetails} task={data} type='' className={'-bottom-22 -left-44 border '} currentBoard='' /> */}
      </div>
      <p className="text-[13px] text-mediumGrey">
        {item.description ? item.description : 'no description'}
      </p>
      {/* <h3 className="flex items-center mt-6 mb-4 text-[13px] font-bold text-mediumGrey dark:text-white">
        Subtasks ({completedTaskCount} of {data.subtasks.length})&nbsp;
        {completedTaskCount === data.subtasks.length && data.subtasks.length !== 0 && <CircleWavyCheck size={28} color="#635FC7" weight="thin" />}
      </h3> */}

      <form>
        {
          item?.subTasks?.map((subtask: any, i: number) => {
            return <SubTaskItem subtask={subtask} i={i} key={i}
            // onChangeSubtaskStatus={() => onChangeSubtaskStatus(subtask.title)} 
            />

          })
        }
        {/* <StatustDropdown boardColumns={data} currentStatus={data.status} /> */}

      </form>
      {/* <Modal setShowModal={setIsEditTask} showModal={isEditTask}>
                Hello Tester
            </Modal> */}
    </>
  )
}

export default TaskDetailsModal