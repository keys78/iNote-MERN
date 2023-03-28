import TextInput from '../shared/TextInput'
import { Formik, FieldArray, Form, Field } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
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


    useEffect(() => {
        dispatch(getUser())
    }, [])

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
                    setShowModal(false)
                    dispatch(getUser())
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <TextInput label='Board Name' name="title" type="input" placeholder='eg: Web Design' />
                     
                        <br />

                        <Button type="submit"
                            text={'Save Changes'} width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateNewBoard;