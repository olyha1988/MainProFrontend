
import TaskSearch from "./TaskSearch";


const selectClassName = `
    min-w-[170px]
    flex-1
    rounded-xl
    border
    border-gray-200
    bg-white
    px-4
    py-2.5
    text-sm
    text-gray-700
    outline-none
    transition
    hover:border-gray-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500/20
    dark:border-gray-700
    dark:bg-gray-800
    dark:text-gray-100
    dark:hover:border-gray-600
    dark:focus:border-blue-500
    dark:[color-scheme:dark]
`;


export default function TaskFilters({

    filters,

    setFilters,

    projects = [],

    users = [],

}) {

    /*
    |--------------------------------------------------------------------------
    | Update Filter
    |--------------------------------------------------------------------------
    */

    const updateFilter = (

        field,

        value

    ) => {

        setFilters({

            ...filters,

            [field]: value,

            page: 1,

        });

    };


    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                {/*
                |--------------------------------------------------------------------------
                | Search
                |--------------------------------------------------------------------------
                */}

                <div className="w-full sm:min-w-[260px] sm:flex-[2]">

                    <TaskSearch

                        value={

                            filters.search

                        }

                        onChange={(event) =>

                            updateFilter(

                                "search",

                                event.target.value

                            )

                        }

                    />

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Project
                |--------------------------------------------------------------------------
                */}

                <select

                    value={

                        filters.project

                    }

                    onChange={(event) =>

                        updateFilter(

                            "project",

                            event.target.value

                        )

                    }

                    className={selectClassName}

                    aria-label="Filter tasks by project"

                >

                    <option value="" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        All Projects

                    </option>


                    {projects.map(

                        (project) => (

                            <option

                                key={

                                    project._id

                                }

                                value={

                                    project._id

                                }

                                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"

                            >

                                {project.name}

                            </option>

                        )

                    )}

                </select>


                {/*
                |--------------------------------------------------------------------------
                | Status
                |--------------------------------------------------------------------------
                */}

                <select

                    value={

                        filters.status

                    }

                    onChange={(event) =>

                        updateFilter(

                            "status",

                            event.target.value

                        )

                    }

                    className={selectClassName}

                    aria-label="Filter tasks by status"

                >

                    <option value="" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        All Statuses

                    </option>

                    <option value="Todo" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        Todo

                    </option>

                    <option value="In Progress" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        In Progress

                    </option>

                    <option value="Review" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        Review

                    </option>

                    <option value="Done" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        Done

                    </option>

                </select>


                {/*
                |--------------------------------------------------------------------------
                | Priority
                |--------------------------------------------------------------------------
                */}

                <select

                    value={

                        filters.priority

                    }

                    onChange={(event) =>

                        updateFilter(

                            "priority",

                            event.target.value

                        )

                    }

                    className={selectClassName}

                    aria-label="Filter tasks by priority"

                >

                    <option value="" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        All Priorities

                    </option>

                    <option value="Low" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        Low

                    </option>

                    <option value="Medium" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        Medium

                    </option>

                    <option value="High" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">

                        High

                    </option>

                    <option value="Critical" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        Critical

                    </option>

                </select>


                {/*
                |--------------------------------------------------------------------------
                | Assigned Member
                |--------------------------------------------------------------------------
                */}

                <select

                    value={

                        filters.assignedTo

                    }

                    onChange={(event) =>

                        updateFilter(

                            "assignedTo",

                            event.target.value

                        )

                    }

                    className={selectClassName}

                    aria-label="Filter tasks by assigned member"

                >

                    <option value="" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        All Members

                    </option>


                    {users.map(

                        (user) => (

                            <option

                                key={

                                    user._id

                                }

                                value={

                                    user._id

                                }

                                className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"

                            >

                                {user.name}

                            </option>

                        )

                    )}

                </select>


                {/*
                |--------------------------------------------------------------------------
                | Sort
                |--------------------------------------------------------------------------
                */}

                <select

                    value={

                        filters.sort

                    }

                    onChange={(event) =>

                        updateFilter(

                            "sort",

                            event.target.value

                        )

                    }

                    className={selectClassName}

                    aria-label="Sort tasks"

                >

                    <option value="-createdAt" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        Newest First

                    </option>

                    <option value="createdAt" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        Oldest First

                    </option>

                    <option value="title" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        Title A-Z

                    </option>

                    <option value="-title" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        Title Z-A

                    </option>

                    <option value="dueDate" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        Due Date Ascending

                    </option>

                    <option value="-dueDate" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" >

                        Due Date Descending

                    </option>

                </select>

            </div>

        </div>

    );

}

