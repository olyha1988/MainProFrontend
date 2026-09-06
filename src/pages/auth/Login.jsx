import {

    useForm,

} from "react-hook-form";

import {

    yupResolver,

} from "@hookform/resolvers/yup";

import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    useNavigate,

} from "react-router-dom";

import {

    LoaderCircle,

    LogIn,

} from "lucide-react";

import toast from "react-hot-toast";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

import {

    login,

} from "@/redux/slices/authSlice";

import {

    loginSchema,

} from "@/validation/authValidation";


export default function Login() {

    const dispatch =

        useDispatch();


    const navigate =

        useNavigate();


    const {

        loading,

    } = useSelector(

        (state) => state.auth

    );


    const {

        register,

        handleSubmit,

        formState: {

            errors,

        },

    } = useForm({

        resolver:

            yupResolver(loginSchema),

        defaultValues: {

            email: "",

            password: "",

        },

    });


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const onSubmit = async (data) => {

        try {

            await dispatch(

                login(data)

            ).unwrap();


            toast.success(

                "Login successful."

            );


            navigate(

                "/dashboard",

                {

                    replace: true,

                }

            );

        }

        catch (error) {

            const errorMessage =

                typeof error === "string"

                    ? error

                    : error?.message ||

                      error?.response?.data?.message ||

                      "Unable to login. Please check your credentials.";


            toast.error(errorMessage);

        }

    };


    return (

        <AuthLayout

            logo="ML"

            title="Welcome Back"

            subtitle="Sign in to continue to your workspace"

            footerText="Don't have an account?"
            

            footerLink="/register"

            footerLabel="Create account"
             footerContent={
    <>
      <br />
      <span className=" text-blue-500">
  Email address: 2026@gmail.com
  <br />
  Password: 2026@123
      </span>
    </>
  }
        
    
    
        >

 
   
  
            <form

                onSubmit={handleSubmit(onSubmit)}

                className="space-y-5"

                noValidate

            >

                <AuthInput

                    label="Email Address"

                    type="email"

                    placeholder="Enter your email address"

                    autoComplete="email"

                    disabled={loading}

                    error={errors.email}

                    {...register("email")}

                />


                <PasswordInput

                    register={register}

                    name="password"

                    label="Password"

                    autoComplete="current-password"

                    disabled={loading}

                    error={errors.password}

                />


                <button

                    type="submit"

                    disabled={loading}

                    className="
                        inline-flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-indigo-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        transition-all
                        duration-200
                        hover:bg-indigo-700
                        hover:shadow-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500/30
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:bg-indigo-500
                        dark:hover:bg-indigo-600
                    "

                >

                    {loading ? (

                        <>

                            <LoaderCircle

                                size={18}

                                className="animate-spin"

                                aria-hidden="true"

                            />

                            Signing In...

                        </>

                    ) : (

                        <>

                            <LogIn

                                size={18}

                                aria-hidden="true"

                            />

                            Sign In

                        </>

                    )}

                </button>

            </form>

        </AuthLayout>

    );

}