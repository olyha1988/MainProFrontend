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

    UserPlus,

} from "lucide-react";

import toast from "react-hot-toast";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

import {

    register as registerUser, 

} from "@/redux/slices/authSlice";

import {

    registerSchema,

} from "@/validation/authValidation";


export default function Register() {

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

            yupResolver(registerSchema),

        defaultValues: {

            name: "",

            email: "",

            phone: "",

            password: "",

            confirmPassword: "",

        },

    });


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const onSubmit = async (data) => {

        try {

            const {

                confirmPassword,

                ...registrationData

            } = data;


            await dispatch(

                registerUser(

                    registrationData

                )

            ).unwrap();


            toast.success(

                "Registration successful. Please sign in."

            );


            navigate(

                "/",

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

                      "Unable to create your account. Please try again.";


            toast.error(errorMessage);

        }

    };


    return (

        <AuthLayout

           logo="MB"

            title="Create Account"

            subtitle="Create your account to get started"

            footerText="Already have an account?"

            footerLink="/"

            footerLabel="Sign In"

        >

            <form

                onSubmit={handleSubmit(onSubmit)}

                className="space-y-5"

                noValidate

            >

                <AuthInput

                    label="Full Name"

                    type="text"

                    placeholder="Enter your full name"

                    autoComplete="name"

                    disabled={loading}

                    error={errors.name}

                    {...register("name")}

                />


                <AuthInput

                    label="Email Address"

                    type="email"

                    placeholder="Enter your email address"

                    autoComplete="email"

                    disabled={loading}

                    error={errors.email}

                    {...register("email")}

                />


                <AuthInput

                    label="Phone Number"

                    type="tel"

                    placeholder="Enter your phone number"

                    autoComplete="tel"

                    disabled={loading}

                    error={errors.phone}

                    {...register("phone")}

                />


                <PasswordInput

                    register={register}

                    name="password"

                    label="Password"

                    autoComplete="new-password"

                    disabled={loading}

                    error={errors.password}

                />


                <PasswordInput

                    register={register}

                    name="confirmPassword"

                    label="Confirm Password"

                    autoComplete="new-password"

                    disabled={loading}

                    error={errors.confirmPassword}

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

                            Creating Account...

                        </>

                    ) : (

                        <>

                            <UserPlus

                                size={18}

                                aria-hidden="true"

                            />

                            Create Account

                        </>

                    )}

                </button>

            </form>

        </AuthLayout>

    );

}