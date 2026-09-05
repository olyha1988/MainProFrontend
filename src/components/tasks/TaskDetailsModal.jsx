
import {

    useEffect,

} from "react";

import {

    CalendarDays,

    ClipboardList,

    FolderOpen,

    Pencil,

    User,

    X,

} from "lucide-react";

import TaskAttachments from "@/components/tasks/TaskAttachments";

import TaskPriorityBadge from "@/components/tasks/TaskPriorityBadge";

import TaskStatusBadge from "@/components/tasks/TaskStatusBadge";

import useActivities from "@/hooks/useActivities";

import ActivityTimeline from "@/components/activity/ActivityTimeline";


/*
|--------------------------------------------------------------------------
| Format Date
|--------------------------------------------------------------------------
*/

const formatDate = (date) => {

    if (!date) {

        return "Not specified";

    }


    const parsedDate =

        new Date(date);


    if (

        Number.isNaN(

            parsedDate.getTime()

        )

    ) {

        return "Invalid date";

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


/*
|--------------------------------------------------------------------------
| Task Details Modal
|--------------------------------------------------------------------------
*/

export default function TaskDetailsModal({

    open,

    task,

    onClose,

    onEdit,

}) {

    /*
    |--------------------------------------------------------------------------
    | Activities
    |--------------------------------------------------------------------------
    */

    const {

        activities,

        pagination: activityPagination,

        loading: activitiesLoading,

        error: activitiesError,

        fetchTaskActivities,

        resetActivities,

    } = useActivities();


    /*
    |--------------------------------------------------------------------------
    | Close On Escape
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) {

            return undefined;

        }


        const handleEscape = (event) => {

            if (

                event.key === "Escape"

            ) {

                onClose();

            }

        };


        document.addEventListener(

            "keydown",

            handleEscape

        );


        return () => {

            document.removeEventListener(

                "keydown",

                handleEscape

            );

        };

    }, [

        open,

        onClose,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Load Task Activities
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            !open ||

            !task?._id

        ) {

            return undefined;

        }


        fetchTaskActivities(

            task._id,

            {

                page: 1,

                limit: 10,

            }

        );


        return () => {

            resetActivities();

        };

    }, [

        open,

        task?._id,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Hidden Modal
    |--------------------------------------------------------------------------
    */

    if (

        !open ||

        !task

    ) {

        return null;

    }


    const projectName =

        task.project?.name ||

        "No Project";


    const assignedUser =

        task.assignedTo?.name ||

        "Unassigned";


    /*
    |--------------------------------------------------------------------------
    | Retry Task Activities
    |--------------------------------------------------------------------------
    */

    const handleActivityRetry = () => {

        if (!task?._id) {

            return;

        }


        fetchTaskActivities(

            task._id,

            {

                page:

                    activityPagination?.page || 1,

                limit:

                    activityPagination?.limit || 10,

            }

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Task Activity Pagination
    |--------------------------------------------------------------------------
    */

    const handleActivityPageChange = (

        page

    ) => {

        if (!task?._id) {

            return;

        }


        fetchTaskActivities(

            task._id,

            {

                page,

                limit:

                    activityPagination?.limit || 10,

            }

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Edit Task
    |--------------------------------------------------------------------------
    */

    const handleEdit = () => {

        onClose();

        onEdit?.(task);

    };


       /*
    |--------------------------------------------------------------------------
    | Refresh Task Activities
    |--------------------------------------------------------------------------
    */

    const handleAttachmentActivityChange = () => {

        if (!task?._id) {

            return;

        }


        fetchTaskActivities(

            task._id,

            {

                page: 1,

                limit:

                    activityPagination?.limit || 10,

            }

        );

    };


    return (

        <div

            role="dialog"

            aria-modal="true"

            aria-labelledby="task-details-title"

            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm"

            onMouseDown={(event) => {

                if (

                    event.target ===

                    event.currentTarget

                ) {

                    onClose();

                }

            }}

        >

            <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">

                {/*
                |--------------------------------------------------------------------------
                | Header
                |--------------------------------------------------------------------------
                */}

                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-gray-900">

                    <div className="flex min-w-0 items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                            <ClipboardList

                                size={24}

                            />

                        </div>


                        <div className="min-w-0">

                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">

                                Task Details

                            </p>


                            <h2

                                id="task-details-title"

                                className="mt-1 truncate text-xl font-semibold text-gray-900 dark:text-white"

                            >

                                {task.title}

                            </h2>

                        </div>

                    </div>


                    <button

                        type="button"

                        onClick={onClose}

                        aria-label="Close task details"

                        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"

                    >

                        <X

                            size={20}

                        />

                    </button>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Scrollable Body
                |--------------------------------------------------------------------------
                */}

                <div className="flex-1 overflow-y-auto">

                    <div className="space-y-7 p-6">

                        {/*
                        |--------------------------------------------------------------------------
                        | Status Summary
                        |--------------------------------------------------------------------------
                        */}

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">

                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                    Status

                                </p>


                                <div className="mt-3">

                                    <TaskStatusBadge

                                        status={

                                            task.status ||

                                            "Todo"

                                        }

                                    />

                                </div>

                            </div>


                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">

                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                    Priority

                                </p>


                                <div className="mt-3">

                                    <TaskPriorityBadge

                                        priority={

                                            task.priority ||

                                            "Medium"

                                        }

                                    />

                                </div>

                            </div>


                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">

                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                    Created

                                </p>


                                <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">

                                    {formatDate(

                                        task.createdAt

                                    )}

                                </p>

                            </div>


                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">

                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                    Due Date

                                </p>


                                <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">

                                    {formatDate(

                                        task.dueDate

                                    )}

                                </p>

                            </div>

                        </div>


                        {/*
                        |--------------------------------------------------------------------------
                        | Task Information
                        |--------------------------------------------------------------------------
                        */}

                        <section>

                            <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">

                                Task Information

                            </h3>


                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                                <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                                        <FolderOpen

                                            size={18}

                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">

                                            Project

                                        </p>


                                        <p className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">

                                            {projectName}

                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">

                                        <User

                                            size={18}

                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">

                                            Assigned To

                                        </p>


                                        <p className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">

                                            {assignedUser}

                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">

                                        <CalendarDays

                                            size={18}

                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">

                                            Last Updated

                                        </p>


                                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">

                                            {formatDate(

                                                task.updatedAt

                                            )}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/*
                        |--------------------------------------------------------------------------
                        | Description
                        |--------------------------------------------------------------------------
                        */}

                        <section>

                            <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">

                                Description

                            </h3>


                            <div className="min-h-28 whitespace-pre-wrap rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300">

                                {

                                    task.description ||

                                    "No description provided."

                                }

                            </div>

                        </section>


                                               {/*
                        |--------------------------------------------------------------------------
                        | Attachments
                        |--------------------------------------------------------------------------
                        */}

                        <section className="border-t border-gray-200 pt-7 dark:border-gray-800">

                            <TaskAttachments

                                task={task}

                                onActivityChange={handleAttachmentActivityChange}

                            />

                        </section>


                        {/*
                        |--------------------------------------------------------------------------
                        | Activity
                        |--------------------------------------------------------------------------
                        */}

                        <section className="border-t border-gray-200 pt-7 dark:border-gray-800">

                            <ActivityTimeline

                                activities={activities}

                                loading={activitiesLoading}

                                error={activitiesError}

                                pagination={activityPagination}

                                onRetry={handleActivityRetry}

                                onPageChange={handleActivityPageChange}

                                title="Task Activity"

                                description="Recent changes and actions for this task"

                                className="rounded-2xl shadow-none dark:bg-gray-900"

                            />

                        </section>

                    </div>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Footer
                |--------------------------------------------------------------------------
                */}

                <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/80 sm:flex-row sm:justify-end">

                    <button

                        type="button"

                        onClick={onClose}

                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"

                    >

                        Close

                    </button>


                    {onEdit && (

                        <button

                            type="button"

                            onClick={handleEdit}

                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"

                        >

                            <Pencil

                                size={17}

                            />

                            Edit Task

                        </button>

                    )}

                </div>

            </div>

        </div>

    );

}

