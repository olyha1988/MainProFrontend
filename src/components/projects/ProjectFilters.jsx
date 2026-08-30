
const selectClassName = `
    min-h-10
    rounded-xl
    border
    border-gray-300
    bg-white
    px-3
    py-2
    text-sm
    text-gray-700
    outline-none
    transition
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500/20
    dark:border-gray-700
    dark:bg-gray-900
    dark:text-gray-300
`;

export default function ProjectFilters({

    filters,

    setFilters,

}) {

    /*
    |--------------------------------------------------------------------------
    | Update Filter
    |--------------------------------------------------------------------------
    */

    const updateFilter = (

        key,

        value

    ) => {

        setFilters((currentFilters) => ({

            ...currentFilters,

            [key]: value,

            page: 1,

        }));

    };


    return (

        <div className="flex flex-wrap items-center gap-3">

            {/*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */}

            <select

                value={filters.status || ""}

                onChange={(event) =>

                    updateFilter(

                        "status",

                        event.target.value

                    )

                }

                aria-label="Filter projects by status"

                className={selectClassName}

            >

                <option value="">

                    All Statuses

                </option>

                <option value="Planning">

                    Planning

                </option>

                <option value="Active">

                    Active

                </option>

                <option value="Completed">

                    Completed

                </option>

                <option value="Archived">

                    Archived

                </option>

            </select>


            {/*
            |--------------------------------------------------------------------------
            | Sort
            |--------------------------------------------------------------------------
            */}

            <select

                value={filters.sort || "-createdAt"}

                onChange={(event) =>

                    updateFilter(

                        "sort",

                        event.target.value

                    )

                }

                aria-label="Sort projects"

                className={selectClassName}

            >

                <option value="-createdAt">

                    Newest

                </option>

                <option value="createdAt">

                    Oldest

                </option>

                <option value="name">

                    Name A–Z

                </option>

                <option value="-name">

                    Name Z–A

                </option>

            </select>

        </div>

    );

}

