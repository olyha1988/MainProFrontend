import { useState } from "react";

import {

    FaEye,

    FaEyeSlash,

} from "react-icons/fa";


export default function PasswordInput({

    register,

    name,

    error,

    label,

    className = "",

    required = false,

    ...props

}) {

    const [

        show,

        setShow,

    ] = useState(false);


    return (

        <div className="mb-5">

            {label && (

                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">

                    {label}

                    {required && (

                        <span className="ml-1 text-red-500">

                            *

                        </span>

                    )}

                </label>

            )}


            <div className="relative">

                <input

                    type={

                        show

                            ? "text"

                            : "password"

                    }

                    {...register(name)}

                    {...props}

                    className={`
                        w-full
                        rounded-xl
                        border
                        bg-white
                        px-4
                        py-3
                        pr-12
                        text-sm
                        text-gray-900
                        shadow-sm
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-gray-400
                        focus:border-indigo-600
                        focus:ring-4
                        focus:ring-indigo-500/10
                        disabled:cursor-not-allowed
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        dark:border-gray-700
                        dark:bg-gray-900
                        dark:text-white
                        dark:placeholder:text-gray-500
                        dark:disabled:bg-gray-800
                        ${
                            error
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                : "border-gray-300"
                        }
                        ${className}
                    `}

                />


                <button

                    type="button"

                    onClick={() =>

                        setShow((prev) => !prev)

                    }

                    className="
                        absolute
                        inset-y-0
                        right-3
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        p-2
                        text-gray-400
                        transition-colors
                        hover:text-indigo-600
                        dark:text-gray-500
                        dark:hover:text-indigo-400
                    "

                    aria-label={

                        show

                            ? "Hide password"

                            : "Show password"

                    }

                >

                    {show

                        ? <FaEyeSlash size={16} />

                        : <FaEye size={16} />

                    }

                </button>

            </div>


            {error && (

                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">

                    {error.message}

                </p>

            )}

        </div>

    );

}