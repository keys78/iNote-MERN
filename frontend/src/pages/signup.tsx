import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, } from "@/network/hooks";
import { AppDispatch } from "../network/store";
import { signupUser } from "@/features/auth/authSlice";

export type SignupData = {
  username: string,
  email: string;
  password: string;
};

const Signup = () => {
  const dispatch = useAppDispatch();


  const SignUpValidation = yup.object().shape({
    username: yup
      .string()
      .min(3, "username requires at least 3 characters")
      .required("username is required"),
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      // .min(8, "Password must be at least at 6 characters")
      .required("Password is required"),
  });


  return (
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
            <div className="flex flex-col flex-wrap w-full md:gap-6 gap-3 px-0 md:flex-row">

              <div className="flex flex-col  w-full md:w-[29%]">
                <label className="inline-flex text-base text-gray-600 w-52">
                  Username
                </label>
                <input
                  value={props.values.username}
                  onBlur={props.handleBlur("username")}
                  onChange={props.handleChange("username")}
                  placeholder="enter username"
                  type="text"
                  className="w-full h-12 p-2 text-base font-normal border rounded-md "
                />
                <span className={""}>
                  {props.touched.username &&
                    props.errors.username}
                </span>
              </div>
              <div className="flex flex-col  w-full md:w-[29%]">
                <label className="inline-flex text-base text-gray-600 w-52">
                  Email
                </label>
                <input
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                  onChange={props.handleChange("email")}
                  placeholder="enter email"
                  type="text"
                  className="w-full h-12 p-2 text-base font-normal border rounded-md "
                />
                <span className={""}>
                  {props.touched.email &&
                    props.errors.email}
                </span>
              </div>
              <div className="flex flex-col  w-full md:w-[29%]">
                <label className="inline-flex text-base text-gray-600 w-52">
                  Password
                </label>
                <input
                  value={props.values.password}
                  onBlur={props.handleBlur("password")}
                  onChange={props.handleChange("password")}
                  placeholder="enter password"
                  type="text"
                  className="w-full h-12 p-2 text-base font-normal border rounded-md "
                />
                <span className={""}>
                  {props.touched.password &&
                    props.errors.password}
                </span>
              </div>


            </div>

            <div className="my-2 lg:block flex justify-center items-center">
              <button>Sign In</button>
            </div>
          </form>
        )}
      </Formik>

    </div>
  )
}

export default Signup