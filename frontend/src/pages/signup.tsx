import { useState } from 'react'
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, } from "@/network/hooks";
import { AppDispatch } from "../network/store";
import { signupUser } from "@/features/auth/authSlice";
import Logo from "@/components/Logo";
import Button from '@/components/Button';

export type SignupData = {
  username: string,
  email: string;
  password: string;
};

const Signup = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');
  const dispatch = useAppDispatch();


  const SignUpValidation = yup.object().shape({
    username: yup
      .string()
      .min(3, "username requires at least 3 characters")
      .required("username is required"),
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("email is required"),
    password: yup
      .string()
      // .min(8, "Password must be at least at 6 characters")
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
    <section className="max-w-[400px] w-full mx-auto my-5">
      <Logo />

      <article className="pt-10 pb-10 text-center">
        Kindly be informed that the process of signing up necessitates email verification. Rest assured that your
        email address will solely be utilized for verifying your identity, as a measure of ensuring security.
      </article>

      <div>
        <Formik
          validationSchema={SignUpValidation}
          initialValues={{
            username: "",
            email: "",
            password: ""
          }}

          onSubmit={async (
            values: SignupData,
            { resetForm }: FormikHelpers<SignupData>
          ) => {
            const data = { ...values, };
            dispatch(signupUser(data));
            // resetForm();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="">

                <div className="input-container">
                  <label className='opacity-50 pl-2' htmlFor="username">Username</label>
                  <input
                    className="input-class"
                    type="text"
                    placeholder="enter username"
                    value={props.values.username}
                    onBlur={props.handleBlur("username")}
                    onChange={props.handleChange("username")}
                  />
                  <span className={"text-red-500 text-sm translate-x-2 animate-pulse transition-all"}>
                    {props.touched.username && props.errors.username}
                  </span>
                </div>

                <div className="input-container">
                <label className='opacity-50 pl-2' htmlFor="email">Email</label>
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

                <label className='opacity-50 pl-2' htmlFor="password">Password</label>
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
                  Sign in
                </button>
              </div>
            </form>
          )}
        </Formik>

      </div>
    </section>
  )
}

export default Signup