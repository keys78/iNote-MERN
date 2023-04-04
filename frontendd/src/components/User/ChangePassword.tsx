import { changePassword } from '@/features/private/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import * as yup from 'yup'

export type ChangePassworData = {
    password: string;
    newPassword: string;
    confirmPassword: string
};

interface IProps {
    setIsChangePasswordModal: any
}


const ChangePassword = ({ setIsChangePasswordModal }: IProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const { isLoading } = useAppSelector((state) => state.auth);
    const { user } = useAppSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useAppDispatch();


    const LoginValidation = yup.object().shape({
        password: yup
            .string()
            // .min(8, "password must be at least at 6 characters")
            .required("old password is required"),
        newPassword: yup
            .string()
            // .min(8, "password must be at least at 6 characters")
            .required("new password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('newPassword'), null as any], 'passwords must match')
            .nullable() // allow null as a valid value
            .required('confirm new password is required')
    });

    const handleToggle = () => {
        if (inputType === "password") {
            setInputType('text')
            setIsVisible(!isVisible)
        } else {
            setInputType('password')
            setIsVisible(!isVisible)
        }
    }

    return (
        <div>
            <h1 className='pb-6 font-bold'>Change password</h1>
            <div>
                <Formik
                    validationSchema={LoginValidation}
                    initialValues={{
                        password: "",
                        newPassword: "",
                        confirmPassword: ""
                    }}

                    onSubmit={async (
                        values: any,
                        { resetForm }: FormikHelpers<any>
                    ) => {
                        const data = { ...values, };
                        console.log(data)
                        dispatch(changePassword({ resetPasswordData: data, userId: user?._id  }))
                        // setIsChangePasswordModal(false)
                        // resetForm();
                    }}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>

                            <label className='opacity-50 pl-2' htmlFor="password">Old Password</label>
                            <div className='password-input'>
                                <div>
                                    <input
                                        className="input-class-p"
                                        type={'password'}
                                        value={props.values.password}
                                        onBlur={props.handleBlur("password")}
                                        onChange={props.handleChange("password")}
                                        autoComplete={'off'}
                                    />

                                </div>
                            </div>
                            <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                {props.touched.password && props.errors.password}
                            </span> <br />
                            <label className='opacity-50 pl-2 pt-4' htmlFor="password">New Password</label>
                            <div className='password-input'>
                                <div>
                                    <input
                                        className="input-class-p"
                                        type={inputType}
                                        value={props.values.newPassword}
                                        onBlur={props.handleBlur("newPassword")}
                                        onChange={props.handleChange("newPassword")}
                                        autoComplete={'off'}
                                    />

                                </div>
                                <span className='cursor-pointer' onClick={() => handleToggle()}>{!isVisible ? 'SHOW' : 'HIDE'}</span>
                            </div>
                            <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                {props.touched.newPassword && props.errors.newPassword}
                            </span>

                            <br />
                            <label className='opacity-50 pl-2' htmlFor="confirm_password">Confirm New Password</label>
                            <div className='password-input'>
                                <div>
                                    <input
                                        className="input-class-p"
                                        type={'password'}
                                        value={props.values.confirmPassword}
                                        onBlur={props.handleBlur("confirmPassword")}
                                        onChange={props.handleChange("confirmPassword")}
                                        autoComplete={'off'}
                                    />

                                </div>
                            </div>
                            <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                {props.touched.confirmPassword && props.errors.confirmPassword}
                            </span>

                            <br />
                            <div className="my-2 lg:block flex justify-center items-center">
                                <button
                                    type='submit'
                                    className='gen-btn-class w-full py-3 rounded-[5px] text-[18px]'
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ChangePassword