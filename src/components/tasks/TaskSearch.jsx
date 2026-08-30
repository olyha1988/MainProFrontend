
import {

    Search,

    X,

} from "lucide-react";


export default function TaskSearch({

    value,

    onChange,

}) {

    const clearSearch = () => {

        onChange({

            target: {

                value: "",

            },

        });

    };


    return (

        <div className="relative w-full md:max-w-sm">

            <Search

                size={18}

                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"

            />


            <input

                type="text"

                value={value}

                onChange={onChange}

                placeholder="Search tasks..."

                aria-label="Search tasks"

                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    py-2.5
                    pl-11
                    pr-10
                    text-sm
                    text-gray-900
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-white
                    dark:placeholder:text-gray-500
                "

            />


            {value && (

                <button

                    type="button"

                    onClick={clearSearch}

                    aria-label="Clear search"

                    className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-7
                        w-7
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-md
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500/20
                        dark:text-gray-500
                        dark:hover:bg-gray-800
                        dark:hover:text-gray-300
                    "

                >

                    <X size={16} />

                </button>

            )}

        </div>

    );

}

