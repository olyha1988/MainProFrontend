export default function AuthInput({

    label,

    error,

    className = "",

    required = false,

    ...props

}) {

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


            <input

                {...props}

                className={`
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
                    ${error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-300"
                    }
                    ${className}
                `}

            />


            {error && (

                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">

                    {error.message}

                </p>

            )}

        </div>

    );

}