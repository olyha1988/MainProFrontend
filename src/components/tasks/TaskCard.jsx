
import {

    CalendarDays,

    FolderOpen,

    User,

} from "lucide-react";

import TaskPriorityBadge from "./TaskPriorityBadge";

import TaskStatusBadge from "./TaskStatusBadge";

import TaskMenu from "./TaskMenu";


const formatDueDate = (date) => {

    if (!date) {

        return "No Due Date";

    }


    const parsedDate =

        new Date(date);


    if (

        Number.isNaN(

            parsedDate.getTime()

        )

    ) {

        return "Invalid Due Date";

    }


    return parsedDate.toLocaleDateString(

        "en-US",

        {

            year: "numeric",

            month: "short",

            day: "numeric",

        }

    );

};


export default function TaskCard({

    task,

    onEdit,

    onDelete,

    onView,

}) {

    const handleView = () => {

        if (

            typeof onView === "function"

        ) {

            onView(task);

        }

    };


    const handleKeyDown = (event) => {

        if (

            event.key === "Enter" ||

            event.key === " "

        ) {

            event.preventDefault();

            handleView();

        }

    };


    return (

        <article

            role="button"

            tabIndex={0}

            onClick={handleView}

            onKeyDown={handleKeyDown}

            aria-label={`View task ${task.title}`}

            className="
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                duration-200
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/30
                focus:ring-offset-2
                dark:border-gray-700
                dark:bg-gray-900
                dark:hover:border-blue-900
                dark:focus:ring-offset-gray-900
            "

        >

            {/*
            |--------------------------------------------------------------------------
            | Top Accent
            |--------------------------------------------------------------------------
            */}

            <div

                className="absolute inset-x-0 top-0 h-1"

                style={{

                    backgroundColor:

                        task.project?.color ||

                        "#3B82F6",

                }}

            />


            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 items-start gap-3">

                    <div

                        className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"

                        style={{

                            backgroundColor:

                                task.project?.color ||

                                "#3B82F6",

                        }}

                    />


                    <div className="min-w-0">

                        <h3 className="truncate text-base font-semibold text-gray-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">

                            {task.title}

                        </h3>


                        <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">

                            {

                                task.description ||

                                "No description provided."

                            }

                        </p>

                    </div>

                </div>


                <div

                    className="shrink-0"

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

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Task Details
            |--------------------------------------------------------------------------
            */}

            <div className="mt-5 space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">

                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">

                        <FolderOpen

                            size={16}

                        />

                    </div>


                    <span className="truncate">

                        {

                            task.project?.name ||

                            "No Project"

                        }

                    </span>

                </div>


                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">

                        <User

                            size={16}

                        />

                    </div>


                    <span className="truncate">

                        {

                            task.assignedTo?.name ||

                            "Unassigned"

                        }

                    </span>

                </div>


                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">

                        <CalendarDays

                            size={16}

                        />

                    </div>


                    <span>

                        {formatDueDate(

                            task.dueDate

                        )}

                    </span>

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Footer
            |--------------------------------------------------------------------------
            */}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">

                <TaskPriorityBadge

                    priority={task.priority}

                />


                <TaskStatusBadge

                    status={task.status}

                />

            </div>

        </article>

    );

}

