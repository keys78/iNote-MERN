import React, { useState } from 'react'

interface FruitProps {
  boardColumns: any,
  setCurrentFruit: React.Dispatch<React.SetStateAction<string>>
}

const Select = ({  setCurrentFruit, boardColumns }: FruitProps) => {
  


  const changeFruit = (newFruit: string): void => {
    setCurrentFruit(newFruit)
  }

  return (
    <>
      <select
        className="w-full px-4 rounded h-10 text-[13px] font-medium text-black dark:text-white bg-white dark:bg-d-gray border border-l-lines dark:border-m-gray"
        // value={currentStatus || data.status}
        onChange={(event) => changeFruit(event.target.value)}
      >
        {boardColumns.map((status: any, i: number) => {
          return <option
            key={i}
            className="text-[13px] font-medium" value={status.name}
          >
            {status.name}
          </option>
        })}
      </select>

    </>
  )
}

export default Select;