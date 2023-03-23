import { Form, Formik, FieldArray } from "formik"
import * as Yup from 'yup';
import Button from "../shared/Button";
import TextInput from "../shared/TextInput";
// import { editBoard } from "features/board/boardSlice";
import { useAppDispatch, useAppSelector } from '../../network/hooks';
// import { RootState } from "app/store";


interface props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewColumnModal = ({ setOpenModal }: props) => {
    const dispatch = useAppDispatch();
    const currentBoard = []
    const data = []

    const validate = Yup.object({
        name: Yup.string().required("Can't be empty"),
    })




    return (
        <Formik
            initialValues={{
                id: currentBoard,
                name: data[currentBoard].name,
                columns: [...data[currentBoard].columns, { name: '', tasks: [] }]
            }}
            // validationSchema={validate}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)

                //make async call
                console.log('submit:', values);
                dispatch(editBoard(values))
                setSubmitting(false)
                resetForm()
                setOpenModal(false)
            }
            }
        >
            {({ values, isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <label className="body-md capitalize text-veryDarkGrey dark:text-white font-bold block">
                        Add New Column
                    </label>

                    <FieldArray name="columns"
                        render={() => (
                            <div>
                                {values.columns.map((_, i) => (
                                    <div key={i} className="flex">
                                        {(values.columns).length - 1 === i && <TextInput label='' name={`columns.${i}.name`} type="text" placeholder="e.g. Archived" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    <br />

                    <Button type="submit" disabled={isSubmitting} text={'+ Add New Column'} width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
                </Form>
            )}
        </Formik>
    )
}
export default AddNewColumnModal
