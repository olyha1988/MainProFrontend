import {

    useEffect,

} from "react";


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

    LoaderCircle,

    Mail,

    Phone,

    Save,

    UserRound,

} from "lucide-react";


import toast from "react-hot-toast";


import useNotifications from "@/hooks/useNotifications";


import {

    profileSchema,

} from "@/validation/profileValidation";


import {

    updateProfile,

} from "@/redux/slices/profileSlice";


import getErrorMessage from "@/utils/getErrorMessage";


export default function ProfileForm({

    profile,

}) {

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

            isDirty,

        },

    } = useForm({

        resolver: yupResolver(

            profileSchema

        ),

        defaultValues: {

            name: "",

            email: "",

            phone: "",

        },

    });


    /*
    |--------------------------------------------------------------------------
    | Populate Profile
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!profile) {

            return;

        }


        reset({

            name: profile.name || "",

            email: profile.email || "",

            phone: profile.phone || "",

        });

    }, [

        profile,

        reset,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Submit Profile
    |--------------------------------------------------------------------------
    */

    const submitHandler = async (data) => {

        try {

            const profileData = {

                name: data.name,

                phone: data.phone || "",

            };


            const updatedProfile = await dispatch(

                updateProfile(

                    profileData

                )

            ).unwrap();


             notify({

                title: "Profile Updated",

                message: "Your profile information was updated successfully.",

               type: "success",

                entityType: "profile",

              entityId:

                  updatedProfile?._id ||

                   updatedProfile?.user?._id ||

                   profile?._id,

            });


            reset({

                name:

                    updatedProfile?.name ||

                    data.name,

                email:

                    updatedProfile?.email ||

                    profile?.email ||

                    data.email,

                phone:

                    updatedProfile?.phone ??

                    data.phone ??

                    "",

            });

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
        py-3
        pl-11
        pr-4
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

                    <UserRound size={21} />

                </div>


                <div>

                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                        Edit Profile

                    </h2>


                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">

                        Update your personal information and contact details.

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
                        md:grid-cols-2
                    "
                >

                    <div>

                        <label

                            htmlFor="name"

                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                            "

                        >

                            Full Name

                        </label>


                        <div className="relative">

                            <UserRound
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    z-10
                                    mt-1
                                    -translate-y-1/2
                                    text-gray-400
                                    dark:text-gray-500
                                "
                            />


                            <input

                                id="name"

                                type="text"

                                disabled={isSubmitting}

                                {...register("name")}

                                placeholder="Enter your full name"

                                className={

                                    inputClassName(

                                        errors.name

                                    )

                                }

                            />

                        </div>


                        {errors.name && (

                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">

                                {errors.name.message}

                            </p>

                        )}

                    </div>


                    <div>

                        <label

                            htmlFor="email"

                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                            "

                        >

                            Email Address

                        </label>


                        <div className="relative">

                            <Mail
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    z-10
                                    -translate-y-1/2
                                    text-gray-400
                                    dark:text-gray-500
                                "
                            />


                            <input

                                id="email"

                                type="email"

                                

                                {...register("email")}

                                className="
                                    mt-2
                                    w-full
                                    cursor-not-allowed
                                    rounded-xl
                                    border
                                    border-gray-300
                                    bg-gray-100
                                    py-3
                                    pl-11
                                    pr-4
                                    text-sm
                                    text-gray-500
                                    outline-none
                                    dark:border-gray-700
                                    dark:bg-gray-800/70
                                    dark:text-gray-400
                                "

                            />

                        </div>


                        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">

                            Email cannot be changed from your profile settings.

                        </p>

                    </div>


                    <div className="md:col-span-2">

                        <label

                            htmlFor="phone"

                            className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                dark:text-gray-300
                            "

                        >

                            Phone Number

                        </label>


                        <div className="relative">

                            <Phone
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    z-10
                                    mt-1
                                    -translate-y-1/2
                                    text-gray-400
                                    dark:text-gray-500
                                "
                            />


                            <input

                                id="phone"

                                type="tel"

                                disabled={isSubmitting}

                                {...register("phone")}

                                placeholder="Enter your phone number"

                                className={

                                    inputClassName(

                                        errors.phone

                                    )

                                }

                            />

                        </div>


                        {errors.phone && (

                            <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">

                                {errors.phone.message}

                            </p>

                        )}

                    </div>

                </div>


                <div
                    className="
                        mt-6
                        flex
                        justify-end
                        border-t
                        border-gray-200
                        pt-5
                        dark:border-gray-800
                    "
                >

                    <button

                        type="submit"

                        disabled={

                            isSubmitting ||

                            !isDirty

                        }

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

                        {isSubmitting ? (

                            <LoaderCircle

                                size={17}

                                className="shrink-0 animate-spin"

                            />

                        ) : (

                            <Save

                                size={17}

                                className="shrink-0"

                            />

                        )}


                        {isSubmitting

                            ? "Saving Changes..."

                            : "Save Changes"

                        }

                    </button>

                </div>

            </form>

        </section>

    );

}