import { Form, Formik, FieldArray } from "formik"
import * as Yup from 'yup';
import Button from "../shared/Button";
import TextInput from "../shared/TextInput";
// import { editBoard } from "features/board/boardSlice";
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { addNewColumn } from "@/features/private/boards/boardSlice";
import { useRouter } from "next/router";
import { Key } from "react";
import { getUser } from "@/features/private/user/userSlice";


interface props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewColumnModal = ({ setOpenModal }: props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const query = router.query.id;


    const validate = Yup.object({
        name: Yup.string().required("Can't be empty"),
    })




    return (
        <Formik
            initialValues={{
                columns: [{ title: '' }],
            }}
            // onSubmit={(values, { setSubmitting, resetForm }) => {
            //   setSubmitting(true)
            //   const columnTitles = values.columns.map(({ title }) => title); // extract the title property from each column object
            //   // make async call for each title
            //   Promise.all(columnTitles.map(title => dispatch(addNewColumn({ id: query, columnData: { title } })))).then(() => {
            //     setSubmitting(false)
            //     resetForm()
            //     setOpenModal(false)
            //     dispatch(getUser())
            //   })
            // }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const columnTitles = values.columns.map(({ title }) => title);
                // make async call
                console.log('columnVal:', columnTitles);
                dispatch(addNewColumn({ id: query, columnData: { titles: columnTitles } }))
                setSubmitting(false)
                resetForm()
                setOpenModal(false)
                dispatch(getUser())
            }}

        >
            {({ values, isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <label className="body-md capitalize text-veryDarkGrey dark:text-white font-bold block">
                        Add New Column
                    </label>

                    <FieldArray
                        name="columns"
                        render={({ remove, push }) => (
                            <div>
                                {values.columns.map((column, i) => (
                                    <div key={i} className="flex">
                                        <TextInput
                                            label=""
                                            name={`columns.${i}.title`}
                                            type="text"
                                            placeholder="e.g. Archived"
                                        />
                                        {values.columns.length > 1 && (
                                            <button type="button" onClick={() => remove(i)}>
                                                X
                                            </button>
                                        )}
                                        {values.columns.length - 1 === i && (
                                            <button type="button" onClick={() => push({ title: '' })}>
                                                +
                                            </button>
                                        )}
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