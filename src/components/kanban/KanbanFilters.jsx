import {

    RotateCcw,

    Search,

} from "lucide-react";

import {

    TASK_PRIORITY,

} from "@/constants/taskConstants";


const DEFAULT_FILTERS = {

    search: "",

    project: "",

    assignedTo: "",

    priority: "",

};


export default function KanbanFilters({

    filters = DEFAULT_FILTERS,

    setFilters = () => {},

    projects = [],

    members = [],

}) {

    /*
    |--------------------------------------------------------------------------
    | Input Classes
    |--------------------------------------------------------------------------
    */

    const inputClassName = `
        h-11
        w-full
        rounded-xl
        border
        border-gray-200
        bg-white
        px-3
        text-sm
        text-gray-900
        shadow-sm
        outline-none
        transition-all
        duration-200
        placeholder:text-gray-400
        hover:border-gray-300
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-500/10
        dark:border-gray-700
        dark:bg-slate-800
        dark:text-white
        dark:placeholder:text-gray-500
        dark:hover:border-gray-600
        dark:focus:border-indigo-500
    `;


    /*
    |--------------------------------------------------------------------------
    | Filter Handlers
    |--------------------------------------------------------------------------
    */

    const handleChange = (key, value) => {

        setFilters((previousFilters) => ({

            ...previousFilters,

            [key]: value,

        }));

    };


    const handleReset = () => {

        setFilters(DEFAULT_FILTERS);

    };


    /*
    |--------------------------------------------------------------------------
    | Active Filters
    |--------------------------------------------------------------------------
    */

    const hasActiveFilters =

        Boolean(filters.search) ||

        Boolean(filters.project) ||

        Boolean(filters.assignedTo) ||

        Boolean(filters.priority);


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div className="w-full">

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-[minmax(220px,1.4fr)_repeat(3,minmax(160px,1fr))_auto]
                    xl:items-end
                "
            >

                {/*
                |--------------------------------------------------------------------------
                | Search
                |--------------------------------------------------------------------------
                */}

                <div className="sm:col-span-2 xl:col-span-1">

                    <label
                        htmlFor="kanban-search"
                        className="
                            mb-2
                            block
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-gray-500
                            dark:text-gray-400
                        "
                    >

                        Search

                    </label>


                    <div className="relative">

                        <Search
                            size={17}
                            className="
                                pointer-events-none
                                absolute
                                left-3.5
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                                dark:text-gray-500
                            "
                            aria-hidden="true"
                        />


                        <input

                            id="kanban-search"

                            type="search"

                            placeholder="Search tasks..."

                            value={filters.search || ""}

                            onChange={(event) =>

                                handleChange(

                                    "search",

                                    event.target.value

                                )

                            }

                            className={`
                                ${inputClassName}
                                pl-10
                                pr-4
                            `}

                            autoComplete="off"

                        />

                    </div>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Project
                |--------------------------------------------------------------------------
                */}

                <div>

                    <label
                        htmlFor="kanban-project"
                        className="
                            mb-2
                            block
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-gray-500
                            dark:text-gray-400
                        "
                    >

                        Project

                    </label>


                    <select

                        id="kanban-project"

                        value={filters.project || ""}

                        onChange={(event) =>

                            handleChange(

                                "project",

                                event.target.value

                            )

                        }

                        className={`
                            ${inputClassName}
                            cursor-pointer
                        `}

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

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Assignee
                |--------------------------------------------------------------------------
                */}

                <div>

                    <label
                        htmlFor="kanban-assignee"
                        className="
                            mb-2
                            block
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-gray-500
                            dark:text-gray-400
                        "
                    >

                        Assignee

                    </label>


                    <select

                        id="kanban-assignee"

                        value={filters.assignedTo || ""}

                        onChange={(event) =>

                            handleChange(

                                "assignedTo",

                                event.target.value

                            )

                        }

                        className={`
                            ${inputClassName}
                            cursor-pointer
                        `}

                    >

                        <option value="">

                            All Members

                        </option>


                        {members.map((member) => (

                            <option

                                key={member._id}

                                value={member._id}

                            >

                                {member.name}

                            </option>

                        ))}

                    </select>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Priority
                |--------------------------------------------------------------------------
                */}

                <div>

                    <label
                        htmlFor="kanban-priority"
                        className="
                            mb-2
                            block
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-gray-500
                            dark:text-gray-400
                        "
                    >

                        Priority

                    </label>


                    <select

                        id="kanban-priority"

                        value={filters.priority || ""}

                        onChange={(event) =>

                            handleChange(

                                "priority",

                                event.target.value

                            )

                        }

                        className={`
                            ${inputClassName}
                            cursor-pointer
                        `}

                    >

                        <option value="">

                            All Priorities

                        </option>


                        {TASK_PRIORITY.map((priority) => (

                            <option

                                key={priority}

                                value={priority}

                            >

                                {priority}

                            </option>

                        ))}

                    </select>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Reset
                |--------------------------------------------------------------------------
                */}

                <div className="sm:col-span-2 xl:col-span-1">

                    <button

                        type="button"

                        onClick={handleReset}

                        disabled={!hasActiveFilters}

                        className="
                            inline-flex
                            h-11
                            w-full
                            items-center
                            justify-center
                            gap-2
                            whitespace-nowrap
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            px-4
                            text-sm
                            font-semibold
                            text-gray-600
                            shadow-sm
                            transition-all
                            duration-200
                            hover:border-gray-300
                            hover:bg-gray-50
                            hover:text-gray-900
                            focus:outline-none
                            focus:ring-4
                            focus:ring-indigo-500/10
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:border-gray-700
                            dark:bg-slate-800
                            dark:text-gray-300
                            dark:hover:border-gray-600
                            dark:hover:bg-slate-700
                            dark:hover:text-white
                            xl:w-auto
                        "

                    >

                        <RotateCcw

                            size={15}

                            aria-hidden="true"

                        />


                        <span>

                            Reset

                        </span>

                    </button>

                </div>

            </div>

        </div>

    );

}