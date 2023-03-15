import { useState } from 'react'
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, } from "@/network/hooks";
import { loginUser, signupUser } from "@/features/auth/authSlice";

export type LoginData = {
    email: string;
    password: string;
};

const Login = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const dispatch = useAppDispatch();


    const LoginValidation = yup.object().shape({
        email: yup
            .string()
            .email("Please provide a valid email address")
            .required("Email is required"),
        password: yup
            .string()
            // .min(8, "Password must be at least at 6 characters")
            .required("Password is required"),
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
            <Formik
                validationSchema={LoginValidation}
                initialValues={{
                    email: "",
                    password: ""
                }}

                onSubmit={async (
                    values: LoginData,
                    { resetForm }: FormikHelpers<LoginData>
                ) => {
                    const data = { ...values, };
                    dispatch(loginUser(data));
                    resetForm();
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <div className="flex flex-col flex-wrap w-full md:gap-6 gap-3 px-0 md:flex-row">

                            <div className="input-container">
                                <input
                                    className="input-class"
                                    type="text"
                                    placeholder="enter email"
                                    value={props.values.email}
                                    onBlur={props.handleBlur("email")}
                                    onChange={props.handleChange("email")}
                                />
                                <span className={"text-red-500 text-sm translate-x-2 animate-pulse transition-all"}>
                                    {props.touched.email && props.errors.email}
                                </span>
                            </div>
                            <div className='password-input'>
                                <div>
                                    <input
                                        className="input-class-p"
                                        type={inputType}
                                        placeholder="enter password"
                                        value={props.values.password}
                                        onBlur={props.handleBlur("password")}
                                        onChange={props.handleChange("password")}
                                        autoComplete={'off'}
                                    />

                                </div>
                                <span className='cursor-pointer' onClick={() => handleToggle()}>{!isVisible ? 'SHOW' : 'HIDE'}</span>
                            </div>
                            <span className={"text-red-500 text-sm -ml-2 translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                {props.touched.password && props.errors.password}
                            </span>
                        </div>

                        <div className="my-2 lg:block flex justify-center items-center">
                            <button
                                type='submit'
                                className='gen-btn-class w-full py-3 rounded-[5px] text-[18px]'
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}

export default Login