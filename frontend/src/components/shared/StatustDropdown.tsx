import { useAppDispatch } from 'app/hooks'
import React, { useState } from 'react'
import { Field } from 'formik'


interface statusProps {
  boardColumns?: any,
  setStatus?: any,
  status?: any,
  currentStatus?: any
  // data: any
}

const StatustDropdown = ({ boardColumns, currentStatus, status, setStatus }: statusProps) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const dispatch = useAppDispatch();


  const changeTaskStatus = (column: any) => {
    setStatus(column.name)
    console.log('status', status)

  }



  return (
    <>
      <h3 className="mt-6 text-[13px] font-bold font-sans mb-[4px] text-mediumGrey dark:text-white">{'Status'}</h3>

      {/* <div className="relative">
          <button
            onClick={() => setShowDropDown(!showDropDown)}
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md outline outline-1 outline-lightGreyLine shadow-sm px-4 py-2 bg-white text-sm font-medium text-black focus:outline-mainPurple dark:bg-darkGrey dark:text-white dark:outline-darkGreyLine"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {status}
            <svg className="-mr-1 ml-2 h-5 w-5 fill-mainPurple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {showDropDown && <div
            className="origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white  focus:outline-none dark:bg-veryDarkGrey"
          >
            <div className="py-1" >
              {boardColumns.map((column: any, i: number) => (
                <span
                 onClick={() => changeTaskStatus(column)}
                  key={i}
                  className="text-mediumGrey block px-4 py-2 text-sm hover:text-mainPurple hover:bg-mainPurple dark:hover:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10"
                >
                  {column.name}
                </span>
              ))}
            </div>
          </div>}
        </div> */}
      <Field className="inline-flex justify-between items-center w-full rounded-md outline outline-1 outline-lightGreyLine shadow-sm px-4 py-2 bg-white text-sm font-medium text-black focus:outline-mainPurple dark:bg-darkGrey dark:text-white dark:outline-darkGreyLine" 
      as="select" name="task.status" value={currentStatus}>
        {boardColumns && boardColumns.map((column: any) => (
          <option className="text-mediumGrey block px-4 py-2 text-sm hover:text-mainPurple hover:bg-mainPurple dark:hover:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10" value={column.name}>{column.name}</option>
        ))}
      </Field>
    </>
  )
}



export default StatustDropdown;