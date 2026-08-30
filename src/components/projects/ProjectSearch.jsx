import {

    Search,

    X,

} from "lucide-react";


export default function ProjectSearch({

    filters,

    setFilters,

}) {

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearchChange = (event) => {

        setFilters((currentFilters) => ({

            ...currentFilters,

            search: event.target.value,

            page: 1,

        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Clear Search
    |--------------------------------------------------------------------------
    */

    const clearSearch = () => {

        setFilters((currentFilters) => ({

            ...currentFilters,

            search: "",

            page: 1,

        }));

    };


    return (

        <div className="relative w-full lg:max-w-sm">

            <Search

                size={18}

                aria-hidden="true"

                className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                "

            />


            <input

                type="text"

                value={filters.search || ""}

                placeholder="Search projects..."

                onChange={handleSearchChange}

                aria-label="Search projects"

                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    py-2.5
                    pl-10
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


            {filters.search && (

                <button

                    type="button"

                    onClick={clearSearch}

                    aria-label="Clear search"

                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-md
                        p-1
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-600
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500/20
                        dark:hover:bg-gray-800
                        dark:hover:text-gray-300
                    "

                >

                    <X

                        size={16}

                        aria-hidden="true"

                    />

                </button>

            )}

        </div>

    );

}