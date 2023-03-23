import TextInput from '../shared/TextInput'
import { Formik, FieldArray, Form, Field } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import Button from '../shared/Button'
import { createNewBoard } from '../../features/private/boards/boardSlice'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { getUser } from '@/features/private/user/userSlice'



interface IProps {
    showModal: boolean,
    setShowModal: (val: boolean) => void;
  }



const CreateNewBoard = ({ showModal, setShowModal}: IProps) => {

    const dispatch = useAppDispatch()
    const validate = Yup.object({
        title: Yup.string().required("Board title is required"),
        // columns: Yup.array().of(
        // Yup.string().required("Column title is required"),
        // )
    })


    return (
        <div>
            <h1 className="text-lg font-bold mb-6">Add New Board</h1>
            <Formik
                initialValues={{
                    title: "",
                }}
                validationSchema={validate}

                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)

                    const data = { ...values, };
                    dispatch(createNewBoard(data))
                    setSubmitting(false)
                    resetForm()
                    setShowModal(!showModal)
                    dispatch(getUser())
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <TextInput label='Board Name' name="title" type="input" placeholder='eg: Web Design' />
                        {/* <label className="body-md capitalize text-mediumGrey dark:text-white mt-6 block">
                            Board Columns
                        </label> */}

                        {/* <div className="input-container">
                            <label className='opacity-50 pl-2' htmlFor="name">Board Name</label>
                            <input
                                className="input-class"
                                type="text"
                                value={props.values.name}
                                onBlur={props.handleBlur("name")}
                                onChange={props.handleChange("name")}
                            />
                            <span className={"text-red-500 text-xs translate-x-2 animate-pulse transition-all"}>
                                {props.touched.name && props.errors.name}
                            </span>
                        </div> */}

                        {/* <FieldArray name="columns"
                            render={arrayHelpers => (
                                <div>
                                    {values.columns.map((_, i) => (
                                        <div key={i} className="flex">
                                            <TextInput label='' name={`columns[${i}]`} type="text" placeholder="e.g. Archived" />
                                            <TextInput label='' name={`columns.${i}.name`} type="text" placeholder="e.g. Archived" />
                            
                                            <button onClick={() => arrayHelpers.remove(i)}
                                                className="text-mediumGrey hover:text-mainRed ml-4"
                                            >
                                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="currentColor" fillRule="evenodd">
                                                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <br />

                                    <button
                                        type='button'
                                        onClick={() => arrayHelpers.push({name: '', tasks: []})}
                                        className={'bg-[#635FC71A] rounded-full w-full py-[7px] text-mainPurple transition duration-200 text-base hover:bg-mainPurpleHover font-sans'}
                                    >
                                        {'+ Add New Column'}
                                    </button>
                                </div>
                            )}
                        /> */}
                        <br />

                        <Button type="submit"
                            // disabled={isSubmitting}
                            text={'Save Changes'} width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateNewBoard;



