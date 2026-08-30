import {

    ChevronLeft,

    ChevronRight,

} from "lucide-react";


export default function ProjectPagination({

    pagination,

    filters,

    setFilters,

}) {

    const {

        page = 1,

        totalPages = 1,

    } = pagination;


    /*
    |--------------------------------------------------------------------------
    | Change Page
    |--------------------------------------------------------------------------
    */

    const changePage = (newPage) => {

        if (

            newPage < 1 ||

            newPage > totalPages ||

            newPage === page

        ) {

            return;

        }


        setFilters((currentFilters) => ({

            ...currentFilters,

            page: newPage,

        }));

    };


    if (totalPages <= 1) {

        return null;

    }


    return (

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm sm:flex-row dark:border-gray-700 dark:bg-gray-900">

            <p className="text-sm text-gray-500 dark:text-gray-400">

                Page{" "}

                <span className="font-semibold text-gray-900 dark:text-white">

                    {page}

                </span>{" "}

                of{" "}

                <span className="font-semibold text-gray-900 dark:text-white">

                    {totalPages}

                </span>

            </p>


            <div className="flex items-center gap-3">

                <button

                    type="button"

                    disabled={page === 1}

                    onClick={() =>

                        changePage(

                            page - 1

                        )

                    }

                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-100
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500/20
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        dark:border-gray-700
                        dark:bg-gray-900
                        dark:text-gray-300
                        dark:hover:bg-gray-800
                    "

                >

                    <ChevronLeft

                        size={16}

                        aria-hidden="true"

                    />

                    Previous

                </button>


                <button

                    type="button"

                    disabled={page === totalPages}

                    onClick={() =>

                        changePage(

                            page + 1

                        )

                    }

                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-100
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500/20
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        dark:border-gray-700
                        dark:bg-gray-900
                        dark:text-gray-300
                        dark:hover:bg-gray-800
                    "

                >

                    Next

                    <ChevronRight

                        size={16}

                        aria-hidden="true"

                    />

                </button>

            </div>

        </div>

    );

}