
import {

    Grid2X2,

    List,

    Search,

    X,

} from "lucide-react";


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


export default function TaskToolbar({

    filters = {},

    setFilters,

    view,

    setView,

    projects = [],

    users = [],

}) {

    /*
    |--------------------------------------------------------------------------
    | Update Filters
    |--------------------------------------------------------------------------
    */

    const handleChange = (

        key,

        value

    ) => {

        setFilters((currentFilters) => ({

            ...currentFilters,

            page: 1,

            [key]: value,

        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Clear Search
    |--------------------------------------------------------------------------
    */

    const clearSearch = () => {

        handleChange(

            "search",

            ""

        );

    };


    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                {/*
                |--------------------------------------------------------------------------
                | Search
                |--------------------------------------------------------------------------
                */}

                <div className="relative w-full xl:max-w-sm">

                    <Search

                        size={18}

                        aria-hidden="true"

                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"

                    />


                    <input

                        type="search"

                        placeholder="Search tasks..."

                        value={filters.search || ""}

                        onChange={(event) =>

                            handleChange(

                                "search",

                                event.target.value

                            )

                        }

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
                            outline-none
                            transition
                            placeholder:text-gray-400
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

                            aria-label="Clear task search"

                            className="
                                absolute
                                right-3
                                top-1/2
                                inline-flex
                                h-7
                                w-7
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-lg
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

                            <X size={15} />

                        </button>

                    )}

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Filters
                |--------------------------------------------------------------------------
                */}

                <div className="flex flex-wrap items-center gap-3">

                    <select

                        value={filters.project || ""}

                        onChange={(event) =>

                            handleChange(

                                "project",

                                event.target.value

                            )

                        }

                        aria-label="Filter tasks by project"

                        className={selectClassName}

                    >

                        <option value="">

                            All Projects

                        </option>


                        {projects.map((project) => (

                            <option

                                key={project._id}

                                value={project._id}

                            >

                                {project.name}

                            </option>

                        ))}

                    </select>


                    <select

                        value={filters.status || ""}

                        onChange={(event) =>

                            handleChange(

                                "status",

                                event.target.value

                            )

                        }

                        aria-label="Filter tasks by status"

                        className={selectClassName}

                    >

                        <option value="">

                            All Statuses

                        </option>

                        <option value="Todo">

                            Todo

                        </option>

                        <option value="In Progress">

                            In Progress

                        </option>

                        <option value="Review">

                            Review

                        </option>

                        <option value="Done">

                            Done

                        </option>

                        <option value="Blocked">

                            Blocked

                        </option>

                    </select>


                    <select

                        value={filters.priority || ""}

                        onChange={(event) =>

                            handleChange(

                                "priority",

                                event.target.value

                            )

                        }

                        aria-label="Filter tasks by priority"

                        className={selectClassName}

                    >

                        <option value="">

                            All Priorities

                        </option>

                        <option value="Low">

                            Low

                        </option>

                        <option value="Medium">

                            Medium

                        </option>

                        <option value="High">

                            High

                        </option>

                        <option value="Critical">

                            Critical

                        </option>

                    </select>


                    <select

                        value={filters.assignedTo || ""}

                        onChange={(event) =>

                            handleChange(

                                "assignedTo",

                                event.target.value

                            )

                        }

                        aria-label="Filter tasks by assignee"

                        className={selectClassName}

                    >

                        <option value="">

                            All Members

                        </option>


                        {users.map((user) => (

                            <option

                                key={user._id}

                                value={user._id}

                            >

                                {user.name}

                            </option>

                        ))}

                    </select>


                    <select

                        value={filters.sort || "-createdAt"}

                        onChange={(event) =>

                            handleChange(

                                "sort",

                                event.target.value

                            )

                        }

                        aria-label="Sort tasks"

                        className={selectClassName}

                    >

                        <option value="-createdAt">

                            Newest

                        </option>

                        <option value="createdAt">

                            Oldest

                        </option>

                        <option value="dueDate">

                            Due Date Ascending

                        </option>

                        <option value="-dueDate">

                            Due Date Descending

                        </option>

                        <option value="priority">

                            Priority Ascending

                        </option>

                        <option value="-priority">

                            Priority Descending

                        </option>

                    </select>


                    {/*
                    |--------------------------------------------------------------------------
                    | View Toggle
                    |--------------------------------------------------------------------------
                    */}

                    <div

                        role="group"

                        aria-label="Task view options"

                        className="flex overflow-hidden rounded-xl border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-gray-900"

                    >

                        <button

                            type="button"

                            onClick={() =>

                                setView("grid")

                            }

                            aria-label="Show task grid"

                            aria-pressed={view === "grid"}

                            className={`
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                transition
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500/20
                                ${
                                    view === "grid"

                                        ? "bg-blue-600 text-white shadow-sm"

                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                }
                            `}

                        >

                            <Grid2X2 size={18} />

                        </button>


                        <button

                            type="button"

                            onClick={() =>

                                setView("table")

                            }

                            aria-label="Show task table"

                            aria-pressed={view === "table"}

                            className={`
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                transition
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500/20
                                ${
                                    view === "table"

                                        ? "bg-blue-600 text-white shadow-sm"

                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                }
                            `}

                        >

                            <List size={18} />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

