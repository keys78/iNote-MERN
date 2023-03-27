import React, { useState } from 'react'
import { useAppSelector } from '../../network/hooks'
import AddNewColumn from './AddNewColumn'
import Task from './Task'
import EmptyBoard from './EmptyBoard'

interface IProps {
    board?: any
}

const BoardColumn = ({ board }: IProps) => {
    const { user } = useAppSelector(state => state.user)


    const showBoards = (board?.columns)?.map((column: any, i:number) =>
        <div key={i} className='column w-[280px] shrink-0'>
            <h3 className="text-[13px] tracking-widest font-bold text-mediumGrey uppercase mb-6">
                <span className="inline-block h-3 w-3 rounded-full mr-3"></span>
                {column.title} 
                ({column.notes.length})
            </h3>
            <ul className="scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5">
                {(column.notes).map((task: any, j: any) => (
                    task.status === column.name && (
                        <>
                            <Task task={task} i={i} j={j} column={column} boardNameTag={'Waiting'}/>
                        </>
                    )))}
            </ul>
        </div>
    )



    return (
        <>
            {showBoards?.length?
                <div
                    className='h-[calc(100vh-85px)] overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 gap-[20px] bg-lightGrey dark:bg-veryDarkGrey flex'>
                    {showBoards}
                    <AddNewColumn />
                </div> :
                <EmptyBoard />
            }
        </>
    )
}

export default BoardColumn;