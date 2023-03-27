import Modal from '../Modal'
import TaskDetailsModal from '../Modal/TaskDetailsModal'
import React, { useState } from 'react'
// import { CircleWavyCheck } from 'phosphor-react'
// // import { Task } from '@src/types'
// // import StatustDropdown from '../shared/StatustDropdown'


// interface props {
//     data: any,
//     column: any
//     j: number,
//     i: number
//     boardNameTag: string,
// }

// const Task = ({ data, i, j, column, boardNameTag }: props) => {
//     const [showDetails, setShowDetails] = useState<boolean>(false)
//     // const [status, setStatus] = useState('');

//     // const subtaskLength = data.subtasks.length
//     const completedTaskCount = data.subtasks.filter((val: any) => val.isCompleted).length
//     // const isAllSubtasksCompleted = completedTaskCount === subtaskLength
//     // console.log('cl', [column])

//     return (
//         <>
//             <li onClick={() => setShowDetails(!showDetails)} key={j} className='group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white'>
//                 <h4 className="font-bold text-[15px] mb-2 group-hover:text-mainPurple">{data.title}</h4>
//                 <div className='flex items-center space-x-3'>
//                     <p className="font-bold text-[12px] text-mediumGrey"> {data.subtasks.filter((val: any) => val.isCompleted).length} of {data.subtasks.length} subtasks</p>
//                     {/* {isAllSubtasksCompleted && subtaskLength !== 0 && <CircleWavyCheck size={20} color="#635FC7" weight="thin" /> } */}
//                 </div>
//             </li>
//             {/* <StatustDropdown /> */}
//             {/* <Modal setShowModal={setShowDetails} showModal={showDetails}>
//                 <TaskDetailsModal setShowDetails={setShowDetails} data={data} i={i} j={j} boardNameTag={boardNameTag} completedTaskCount={completedTaskCount}/>
//             </Modal> */}
//         </>
//     )
// }

// export default Task;



interface IProps {
    task: any,
    column: any
    j: number,
    i: number
    boardNameTag: string,
}

const Task = ({ task, i, j, boardNameTag }: IProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [status, setStatus] = useState('');
    return (
        <div>
            <li onClick={() => setShowDetails(!showDetails)} key={j} className='group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white'>
                <h4 className="font-bold text-[15px] mb-2 group-hover:text-mainPurple">{task.title}</h4>
                <h4 className="font-bold text-[15px] mb-2 group-hover:text-mainPurple">{task.description}</h4>
                <div className='flex items-center space-x-3'>
                    {/* <p className="font-bold text-[12px] text-mediumGrey"> {task.subtasks.filter((val: any) => val.isCompleted).length} of {task.subtasks.length} subtasks</p> */}
                    {/* {isAllSubtasksCompleted && subtaskLength !== 0 && <CircleWavyCheck size={20} color="#635FC7" weight="thin" /> } */}
                </div>
            </li>
            <Modal setShowModal={setShowDetails} showModal={showDetails}>
                <TaskDetailsModal setShowDetails={setShowDetails} task={task} i={i} j={j} boardNameTag={boardNameTag} completedTaskCount={0}  />
            </Modal>
        </div>
    )
}

export default Task 