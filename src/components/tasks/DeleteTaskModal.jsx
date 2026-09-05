import {

    AlertTriangle,

    Loader2,

    X,

} from "lucide-react";

import {

    useDispatch,

} from "react-redux";

import {

    deleteTask,

} from "@/redux/slices/taskSlice";

 import useNotifications from "@/hooks/useNotifications";


export default function DeleteTaskModal({

    open,

    task,

    loading,

    onClose,

}) {

    const dispatch = useDispatch();


    const {

    notify,

    } = useNotifications();


    /*
    |--------------------------------------------------------------------------
    | Delete Task
    |--------------------------------------------------------------------------
    */

    const handleDelete = async () => {

        if (

            !task?._id ||

            loading

        ) {

            return;

        }


        try {

            const taskTitle =

                task.title || "Task";


            await dispatch(

                deleteTask(

                    task._id

                )

            ).unwrap();


             notify({

             title: "Task Deleted",

            message: `${taskTitle} was deleted successfully.`,

            type: "success",

             entityType: "task",

            entityId: task._id,

            });


            onClose();

        }

        catch (error) {

            notify({

              title: "Delete Failed",

             message:

            typeof error === "string"

            ? error

        : error?.message ||

            "Failed to delete the task.",

            type: "error",

            });

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Close Modal
    |--------------------------------------------------------------------------
    */

    const handleClose = () => {

        if (

            loading

        ) {

            return;

        }


        onClose();

    };


    if (

        !open

    ) {

        return null;

    }


    return (

        <div

            role="dialog"

            aria-modal="true"

            aria-labelledby="delete-task-title"

            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm"

            onMouseDown={(event) => {

                if (

                    event.target === event.currentTarget

                ) {

                    handleClose();

                }

            }}

        >

            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">

                {/*
                |--------------------------------------------------------------------------
                | Header
                |--------------------------------------------------------------------------
                */}

                <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-800">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">

                            <AlertTriangle

                                size={24}

                            />

                        </div>


                        <div>

                            <h2

                                id="delete-task-title"

                                className="text-lg font-semibold text-gray-900 dark:text-white"

                            >

                                Delete Task

                            </h2>


                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                This action cannot be undone.

                            </p>

                        </div>

                    </div>


                    <button

                        type="button"

                        onClick={handleClose}

                        disabled={loading}

                        aria-label="Close delete task modal"

                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-200"

                    >

                        <X

                            size={19}

                        />

                    </button>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Body
                |--------------------------------------------------------------------------
                */}

                <div className="px-6 py-6">

                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">

                        Are you sure you want to delete

                        <span className="mx-1 font-semibold text-gray-900 dark:text-white">

                            &quot;{task?.title}&quot;

                        </span>

                        ?

                    </p>


                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">

                        The task and its related information will be permanently removed.

                    </div>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Footer
                |--------------------------------------------------------------------------
                */}

                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/50 sm:flex-row sm:justify-end">

                    <button

                        type="button"

                        onClick={handleClose}

                        disabled={loading}

                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"

                    >

                        Cancel

                    </button>


                    <button

                        type="button"

                        onClick={handleDelete}

                        disabled={loading}

                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30 disabled:cursor-not-allowed disabled:opacity-60"

                    >

                        {loading && (

                            <Loader2

                                size={18}

                                className="animate-spin"

                            />

                        )}


                        {

                            loading

                                ? "Deleting..."

                                : "Delete Task"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

