
import {

    ChevronLeft,

    ChevronRight,

} from "lucide-react";


export default function TaskPagination({

    pagination = {},

    filters,

    setFilters,

}) {

    const page =

        pagination.page || 1;


    const totalPages =

        pagination.totalPages || 1;


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


    const isPreviousDisabled =

        page <= 1;


    const isNextDisabled =

        page >= totalPages;


    return (

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">

            {/*
            |--------------------------------------------------------------------------
            | Page Information
            |--------------------------------------------------------------------------
            */}

            <p

                className="text-sm text-gray-500 dark:text-gray-400"

                aria-live="polite"

            >

                Page{" "}

                <span className="font-semibold text-gray-900 dark:text-white">

                    {page}

                </span>{" "}

                of{" "}

                <span className="font-semibold text-gray-900 dark:text-white">

                    {totalPages}

                </span>

            </p>


            {/*
            |--------------------------------------------------------------------------
            | Pagination Controls
            |--------------------------------------------------------------------------
            */}

            <div className="flex items-center gap-2">

                <button

                    type="button"

                    onClick={() =>

                        changePage(

                            page - 1

                        )

                    }

                    disabled={isPreviousDisabled}

                    aria-label="Go to previous page"

                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"

                >

                    <ChevronLeft

                        size={16}

                    />

                    Previous

                </button>


                <button

                    type="button"

                    onClick={() =>

                        changePage(

                            page + 1

                        )

                    }

                    disabled={isNextDisabled}

                    aria-label="Go to next page"

                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"

                >

                    Next

                    <ChevronRight

                        size={16}

                    />

                </button>

            </div>

        </div>

    );

}

