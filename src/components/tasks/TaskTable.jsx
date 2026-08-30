
import {

    ArrowDownAZ,

    ArrowUpAZ,

    CalendarDays,

} from "lucide-react";


import TaskMenu from "./TaskMenu";

import TaskPagination from "./TaskPagination";

import TaskPriorityBadge from "./TaskPriorityBadge";

import TaskStatusBadge from "./TaskStatusBadge";


export default function TaskTable({

    tasks = [],

    pagination = {},

    filters = {},

    setFilters,

    onEdit,

    onDelete,

    onView,

}) {

    /*
    |--------------------------------------------------------------------------
    | Sort
    |--------------------------------------------------------------------------
    */

    const handleSort = (field) => {

        setFilters((currentFilters) => {

            const currentSort =

                currentFilters.sort ||

                "-createdAt";


            const nextSort =

                currentSort === field

                    ? `-${field}`

                    : field;


            return {

                ...currentFilters,

                sort: nextSort,

                page: 1,

            };

        });

    };


    /*
    |--------------------------------------------------------------------------
    | View Task
    |--------------------------------------------------------------------------
    */

    const handleView = (task) => {

        if (

            typeof onView === "function"

        ) {

            onView(task);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Keyboard Navigation
    |--------------------------------------------------------------------------
    */

    const handleRowKeyDown = (

        event,

        task

    ) => {

        if (

            event.key !== "Enter" &&

            event.key !== " "

        ) {

            return;

        }


        event.preventDefault();

        handleView(task);

    };


    /*
    |--------------------------------------------------------------------------
    | Date Helpers
    |--------------------------------------------------------------------------
    */

    const formatDueDate = (dueDate) => {

        if (!dueDate) {

            return "No Due Date";

        }


        const date =

            new Date(dueDate);


        if (

            Number.isNaN(

                date.getTime()

            )

        ) {

            return "Invalid Date";

        }


        return date.toLocaleDateString(

            "en-US",

            {

                year: "numeric",

                month: "short",

                day: "numeric",

            }

        );

    };


    const isTaskOverdue = (task) => {

        if (

            !task.dueDate ||

            task.status === "Done"

        ) {

            return false;

        }


        const dueDate =

            new Date(task.dueDate);


        if (

            Number.isNaN(

                dueDate.getTime()

            )

        ) {

            return false;

        }


        dueDate.setHours(

            23,

            59,

            59,

            999

        );


        return dueDate < new Date();

    };


    /*
    |--------------------------------------------------------------------------
    | Sort Button
    |--------------------------------------------------------------------------
    */

    const SortButton = ({

        label,

        field,

    }) => {

        const isAscending =

            filters.sort === field;


        const isDescending =

            filters.sort === `-${field}`;


        const SortIcon =

            isAscending

                ? ArrowUpAZ

                : ArrowDownAZ;


        return (

            <button

                type="button"

                onClick={() =>

                    handleSort(field)

                }

                aria-label={`Sort by ${label}`}

                className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-lg
                    font-semibold
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/20
                    ${
                        isAscending ||
                        isDescending

                            ? "text-blue-600 dark:text-blue-400"

                            : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    }
                `}

            >

                {label}

                <SortIcon

                    size={14}

                    aria-hidden="true"

                />

            </button>

        );

    };


    return (

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

            {/*
            |--------------------------------------------------------------------------
            | Horizontal Scroll
            |--------------------------------------------------------------------------
            */}

            <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                    <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60">

                        <tr>

                            <th

                                scope="col"

                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"

                            >

                                <SortButton

                                    label="Task"

                                    field="title"

                                />

                            </th>


                            <th

                                scope="col"

                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"

                            >

                                Project

                            </th>


                            <th

                                scope="col"

                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"

                            >

                                Priority

                            </th>


                            <th

                                scope="col"

                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"

                            >

                                Status

                            </th>


                            <th

                                scope="col"

                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"

                            >

                                Assigned

                            </th>


                            <th

                                scope="col"

                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"

                            >

                                <SortButton

                                    label="Due Date"

                                    field="dueDate"

                                />

                            </th>


                            <th

                                scope="col"

                                className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"

                            >

                                Actions

                            </th>

                        </tr>

                    </thead>


                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                        {tasks.map((task) => {

                            const overdue =

                                isTaskOverdue(task);


                            return (

                                <tr

                                    key={task._id}

                                    tabIndex={0}

                                    onClick={() =>

                                        handleView(task)

                                    }

                                    onKeyDown={(event) =>

                                        handleRowKeyDown(

                                            event,

                                            task

                                        )

                                    }

                                    aria-label={`View task ${task.title}`}

                                    className="
                                        group
                                        cursor-pointer
                                        transition-colors
                                        hover:bg-blue-50/50
                                        focus:bg-blue-50/50
                                        focus:outline-none
                                        dark:hover:bg-gray-800/70
                                        dark:focus:bg-gray-800/70
                                    "

                                >

                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Task
                                    |--------------------------------------------------------------------------
                                    */}

                                    <td className="px-6 py-4">

                                        <div className="flex items-start gap-3">

                                            <span

                                                className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"

                                                style={{

                                                    backgroundColor:

                                                        task.project?.color ||

                                                        "#3B82F6",

                                                }}

                                                aria-hidden="true"

                                            />


                                            <div className="min-w-0">

                                                <p className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">

                                                    {

                                                        task.title ||

                                                        "Untitled Task"

                                                    }

                                                </p>


                                                <p className="mt-1 max-w-xs truncate text-sm text-gray-500 dark:text-gray-400">

                                                    {

                                                        task.description ||

                                                        "No description"

                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Project
                                    |--------------------------------------------------------------------------
                                    */}

                                    <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">

                                        {

                                            task.project?.name ||

                                            "No Project"

                                        }

                                    </td>


                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Priority
                                    |--------------------------------------------------------------------------
                                    */}

                                    <td className="px-6 py-4">

                                        <TaskPriorityBadge

                                            priority={task.priority}

                                        />

                                    </td>


                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Status
                                    |--------------------------------------------------------------------------
                                    */}

                                    <td className="px-6 py-4">

                                        <TaskStatusBadge

                                            status={task.status}

                                        />

                                    </td>


                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Assigned User
                                    |--------------------------------------------------------------------------
                                    */}

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2.5">

                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                                                {

                                                    task.assignedTo?.name

                                                        ?.charAt(0)

                                                        ?.toUpperCase() ||

                                                    "U"

                                                }

                                            </div>


                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">

                                                {

                                                    task.assignedTo?.name ||

                                                    "Unassigned"

                                                }

                                            </span>

                                        </div>

                                    </td>


                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Due Date
                                    |--------------------------------------------------------------------------
                                    */}

                                    <td className="px-6 py-4">

                                        <div

                                            className={`
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-sm
                                                font-medium
                                                ${
                                                    overdue

                                                        ? "text-red-600 dark:text-red-400"

                                                        : "text-gray-700 dark:text-gray-300"
                                                }
                                            `}

                                        >

                                            <CalendarDays

                                                size={16}

                                                className="shrink-0"

                                                aria-hidden="true"

                                            />


                                            <span>

                                                {

                                                    formatDueDate(

                                                        task.dueDate

                                                    )

                                                }

                                            </span>


                                            {overdue && (

                                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">

                                                    Overdue

                                                </span>

                                            )}

                                        </div>

                                    </td>


                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Actions
                                    |--------------------------------------------------------------------------
                                    */}

                                    <td className="px-6 py-4 text-right">

                                        <div

                                            className="inline-flex"

                                            onClick={(event) =>

                                                event.stopPropagation()

                                            }

                                            onKeyDown={(event) =>

                                                event.stopPropagation()

                                            }

                                        >

                                            <TaskMenu

                                                task={task}

                                                onEdit={onEdit}

                                                onDelete={onDelete}

                                            />

                                        </div>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Pagination
            |--------------------------------------------------------------------------
            */}

            <TaskPagination

                pagination={pagination}

                filters={filters}

                setFilters={setFilters}

            />

        </div>

    );

}

