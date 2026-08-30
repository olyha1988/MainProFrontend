import {

    ArrowDown,

    ArrowUp,

    ArrowUpDown,

} from "lucide-react";


export default function SortButton({

    label,

    field,

    filters,

    setFilters,

}) {

    const active =

        filters.sort.includes(

            field

        );


    const descending =

        filters.sort.startsWith("-");


    /*
    |--------------------------------------------------------------------------
    | Toggle Sort
    |--------------------------------------------------------------------------
    */

    const handleSort = () => {

        let sort = field;


        if (

            active &&

            !descending

        ) {

            sort = `-${field}`;

        }


        setFilters((currentFilters) => ({

            ...currentFilters,

            sort,

            page: 1,

        }));

    };


    const Icon =

        !active

            ? ArrowUpDown

            : descending

                ? ArrowDown

                : ArrowUp;


    return (

        <button

            type="button"

            onClick={handleSort}

            aria-label={`Sort by ${label}`}

            aria-pressed={active}

            className="
                inline-flex
                items-center
                gap-1.5
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:text-blue-600
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/20
                dark:text-gray-300
                dark:hover:text-blue-400
            "

        >

            <span>

                {label}

            </span>


            <Icon

                size={15}

                aria-hidden="true"

                className={

                    active

                        ? "text-blue-600 dark:text-blue-400"

                        : "text-gray-400"

                }

            />

        </button>

    );

}