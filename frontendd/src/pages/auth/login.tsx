import { useEffect, useState } from 'react'
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector, } from "@/network/hooks";
import { loginUser, reset } from "@/features/auth/authSlice";
import Logo from "@/components/Logo";
import Link from 'next/link';
import Google_logo from '@/components/assets/svg/Google_logo';
import { useRouter } from 'next/router';
import Loader from '@/components/Loaders/Loader';


export type LoginData = {
    email: string;
    password: string;
};

const Login = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { isSuccess, isLoading, isError, message, token } = useAppSelector((state) => state.auth);
    const { user } = useAppSelector((state) => state.user);

    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const token2 = storedToken ? JSON.parse(storedToken) : '';


    useEffect(() => {
        if (token2 || token) {
            router.push('/user/dashboard')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, router, dispatch, token, token2])


    const LoginValidation = yup.object().shape({
        email: yup
            .string()
            .email("Please provide a valid email address")
            .required("email is required"),
        password: yup
            .string()
            .min(6, "password must be at least at 6 characters")
            .required("password is required"),
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
        <div className="max-w-[100%] min-h-[100vh] w-full mx-auto dark:bg-veryDarkGrey">
            {isLoading && <Loader />}
            <div className='max-w-[400px] mx-auto py-12'>
                <div className='mx-[16px]'>
                    <Logo />
                    <h1 className='pt-6 pb-8 font-bold sm:text-[24px] text-[18px] text-center'>Welcome back</h1>

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

                                    <div className="input-container">
                                        <label className='opacity-50 pl-2' htmlFor="email">Email</label>
                                        <input
                                            className="input-class"
                                            type="text"
                                            value={props.values.email}
                                            onBlur={props.handleBlur("email")}
                                            onChange={props.handleChange("email")}
                                        />
                                        <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all"}>
                                            {props.touched.email && props.errors.email}
                                        </span>
                                    </div>

                                    <label className='opacity-50 pl-2' htmlFor="password">Password</label>
                                    <div className='password-input'>
                                        <div>
                                            <input
                                                className="input-class-p"
                                                type={inputType}
                                                value={props.values.password}
                                                onBlur={props.handleBlur("password")}
                                                onChange={props.handleChange("password")}
                                                autoComplete={'off'}
                                            />

                                        </div>
                                        <div className='cursor-pointer' onClick={() => handleToggle()}>{!isVisible ? 'SHOW' : 'HIDE'}</div>
                                    </div>
                                    <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                        {props.touched.password && props.errors.password}
                                    </span>
                                    <div className='py-2'>
                                        <Link href={'/auth/forgot-password'}><span className='text-[#635FC7]'>Forgot password?</span></Link>
                                    </div>

                                    <br />
                                    <div className="my-2 lg:block flex justify-center items-center">
                                        <button
                                            type='submit'
                                            className='gen-btn-class w-full py-3 rounded-[5px] text-[18px]'
                                        >
                                            Log in
                                        </button>
                                    </div>

                                    <div className='text-center pt-4'>
                                        Don&apos;t have an account? &nbsp;
                                        <Link href={'/auth/signup'}><span className='text-[#635FC7]'>Sign up</span></Link>
                                    </div>

                                    <div className='divide text-center dark:bg-darkGrey'>
                                        <hr />
                                        <span className='dark:bg-veryDarkGrey'>OR</span>
                                    </div>

                                    <div onClick={() => alert('console not ready - try login')} className='flex items-center w-full justify-center rounded-[5px] border border-[#635FC7] py-3 space-x-3 cursor-pointer'>
                                        <Google_logo />
                                        <span>Continue with Google</span>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login