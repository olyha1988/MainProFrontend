
import {

    ClipboardList,

    Plus,

} from "lucide-react";


export default function EmptyTasks({

    onCreate,

}) {

    return (

        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:py-20">

            {/*
            |--------------------------------------------------------------------------
            | Icon
            |--------------------------------------------------------------------------
            */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                <ClipboardList

                    size={38}

                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Content
            |--------------------------------------------------------------------------
            */}

            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">

                No Tasks Found

            </h2>


            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">

                Start organizing your work by creating your first task.
                Assign members, priorities, and due dates to keep your team productive.

            </p>


            {/*
            |--------------------------------------------------------------------------
            | Action
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={onCreate}

                className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900"

            >

                <Plus

                    size={18}

                />

                Create Task

            </button>

        </div>

    );

}

