import {

    useForm,

} from "react-hook-form";


import {

    yupResolver,

} from "@hookform/resolvers/yup";


import {

    useDispatch,

} from "react-redux";


import {

    KeyRound,

    LoaderCircle,

    LockKeyhole,

} from "lucide-react";


import toast from "react-hot-toast";


import useNotifications from "@/hooks/useNotifications";


import {

    changePasswordSchema,

} from "@/validation/profileValidation";


import {

    changePassword,

} from "@/redux/slices/profileSlice";


import getErrorMessage from "@/utils/getErrorMessage";


export default function ChangePasswordForm() {

    const dispatch = useDispatch();


    const {

     notify,

    } = useNotifications();


    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors,

            isSubmitting,

        },

    } = useForm({

        resolver: yupResolver(

            changePasswordSchema

        ),

        defaultValues: {

            currentPassword: "",

            newPassword: "",

            confirmPassword: "",

        },

    });


    /*
    |--------------------------------------------------------------------------
    | Submit Password
    |--------------------------------------------------------------------------
    */

    const submitHandler = async (data) => {

        try {

            const passwordData = {

                currentPassword:

                    data.currentPassword,

                newPassword:

                    data.newPassword,

                confirmPassword:

                    data.confirmPassword,

            };


            const response = await dispatch(

                changePassword(

                    passwordData

                )

            ).unwrap();


            notify({

                title: "Password Updated",

            message: "Your account password was changed successfully.",

             type: "success",

             entityType: "profile",

            entityId:

             response?._id ||

            response?.user?._id ||

     null,

             });


            reset();

        } catch (error) {

            toast.error(

                getErrorMessage(

                    error

                )

            );

        }

    };


    const inputClassName = (error) => `

        mt-2
        w-full
        rounded-xl
        border
        bg-white
        px-4
        py-3
        text-sm
        text-gray-900
        shadow-sm
        outline-none
        transition-all
        duration-200
        placeholder:text-gray-400
        focus:ring-4
        disabled:cursor-not-allowed
        disabled:bg-gray-100
        disabled:text-gray-500
        dark:bg-gray-950
        dark:text-white
        dark:placeholder:text-gray-500
        dark:disabled:bg-gray-800

        ${error

            ? `
                border-red-500
                focus:border-red-500
                focus:ring-red-500/10
            `

            : `
                border-gray-300
                focus:border-indigo-600
                focus:ring-indigo-500/10
                dark:border-gray-700
            `
        }

    `;


    return (

        <section
            className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                dark:border-gray-800
                dark:bg-gray-900
            "
        >

            <div
                className="
                    flex
                    items-start
                    gap-4
                    border-b
                    border-gray-200
                    px-6
                    py-5
                    dark:border-gray-800
                "
            >

                <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-100
                        text-indigo-600
                        dark:bg-indigo-950/50
                        dark:text-indigo-400
                    "
                >

                    <KeyRound size={21} />

                </div>


                <div>

                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                        Change Password

                    </h2>


                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">

                        Use a strong password that you do not use elsewhere.

                    </p>

                </div>

            </div>


            <form

                onSubmit={

                    handleSubmit(

                        submitHandler

                    )

                }

                className="p-6"

            >

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5
                        lg:grid-cols-2
                    "
                >

                    <div className="lg:col-span-2">

                        <label

                            htmlFor="currentPassword"

                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                            "

                        >

                            Current Password

                        </label>


                        <input

                            id="currentPassword"

                            type="password"

                            autoComplete="current-password"

                            disabled={isSubmitting}

                            {...register(

                                "currentPassword"

                            )}

                            placeholder="Enter your current password"

                            className={

                                inputClassName(

                                    errors.currentPassword

                                )

                            }

                        />


                        {errors.currentPassword && (

                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">

                                {errors.currentPassword.message}

                            </p>

                        )}

                    </div>


                    <div>

                        <label

                            htmlFor="newPassword"

                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                            "

                        >

                            New Password

                        </label>


                        <input

                            id="newPassword"

                            type="password"

                            autoComplete="new-password"

                            disabled={isSubmitting}

                            {...register(

                                "newPassword"

                            )}

                            placeholder="Enter your new password"

                            className={

                                inputClassName(

                                    errors.newPassword

                                )

                            }

                        />


                        {errors.newPassword && (

                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">

                                {errors.newPassword.message}

                            </p>

                        )}

                    </div>


                    <div>

                        <label

                            htmlFor="confirmPassword"

                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                            "

                        >

                            Confirm New Password

                        </label>


                        <input

                            id="confirmPassword"

                            type="password"

                            autoComplete="new-password"

                            disabled={isSubmitting}

                            {...register(

                                "confirmPassword"

                            )}

                            placeholder="Confirm your new password"

                            className={

                                inputClassName(

                                    errors.confirmPassword

                                )

                            }

                        />


                        {errors.confirmPassword && (

                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">

                                {errors.confirmPassword.message}

                            </p>

                        )}

                    </div>

                </div>


                <div
                    className="
                        mt-6
                        flex
                        flex-col
                        gap-3
                        border-t
                        border-gray-200
                        pt-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        dark:border-gray-800
                    "
                >

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

                        <LockKeyhole

                            size={16}

                            className="shrink-0"

                        />

                        <span>

                            Your password is securely encrypted.

                        </span>

                    </div>


                    <button

                        type="submit"

                        disabled={isSubmitting}

                        className="
                            inline-flex
                            h-11
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-5
                            text-sm
                            font-medium
                            leading-none
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:bg-indigo-700
                            hover:shadow-md
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500/40
                            disabled:translate-y-0
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "

                    >

                        {isSubmitting && (

                            <LoaderCircle

                                size={17}

                                className="shrink-0 animate-spin"

                            />

                        )}


                        {isSubmitting

                            ? "Changing Password..."

                            : "Change Password"

                        }

                    </button>

                </div>

            </form>

        </section>

    );

}