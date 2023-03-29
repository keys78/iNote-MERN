import TextInput from '../shared/TextInput'
import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../shared/Button'
import TextArea from '../shared/TextArea'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { editTask, getBoard } from '@/features/private/boards/boardSlice'
import React from 'react'
import EditButton from '../shared/EditButton';
import StatusDropdown from '../shared/StatusDropdown';
import SubTaskItem from './SubTaskItem';

interface IProps {
  item: any;
  setShowDetails: any
}

const TaskDetailsModal = ({ item, setShowDetails }: IProps) => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board)

  const arr = board?.notes?.map((val: any) => val.status)
  const status = [...new Set(arr)];



  const onChangeSubtaskStatus = (description: string) => {
    const newSubTasks = item?.subTasks.map((subtask: any) => {
      if (subtask.description === description) {
        return {
          ...subtask,
          isCompleted: !subtask.isCompleted,
        };
      }
      return subtask;
    });

    console.log(newSubTasks);

    const newTask = { ...item, subTasks: newSubTasks };
    dispatch(editTask({ noteId: item?._id, taskData: newTask }));
    dispatch(getBoard({ id: board?._id }))
  };

  const validate = Yup.object({
    title: Yup.string().required("required"),
    status: Yup.string().required("required"),
    subTasks: Yup.array().of(
      Yup.object().shape({
        description: Yup.string().required("Subtask description is required"),
      })
    ),
  })




  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-[18px] font-bold">{item.title}</h1>
        <EditButton setShowDetails={setShowDetails} task={item} type='' className={'-bottom-22 -left-44 border '} currentBoard='' />
      </div>
      <p className="text-[13px] text-mediumGrey">
        {item.description ? item.description : 'no description'}
      </p>

      <br />

      {
        item?.subTasks?.map((subtask: any, i: number) => {
          return <SubTaskItem subtask={subtask} i={i} key={i}
            onChangeSubtaskStatus={() => onChangeSubtaskStatus(subtask.description)}
          />
        })
      }

      <Formik
        initialValues={{
          title: item?.title,
          description: item?.description,
          subTasks: item?.subTasks,
          status:item?.status
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)

          dispatch(editTask({ noteId: item?._id, taskData: values }))
          dispatch(getBoard({ id: board?._id }))
          setSubmitting(false)
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <StatusDropdown status={status && status} setStatus={props.setFieldValue} label={'Status'} /> <br />
            <Button type="submit" disabled={props.isSubmitting} text={'Move Task'} width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
          </Form>
        )}
      </Formik>

    </>
  )
}

export default TaskDetailsModal