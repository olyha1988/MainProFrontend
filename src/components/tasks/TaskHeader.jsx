
import {

    ClipboardList,

    Plus,

} from "lucide-react";


export default function TaskHeader({

    onCreate,

}) {

    return (

        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:flex-row lg:items-center lg:justify-between">

            {/*
            |--------------------------------------------------------------------------
            | Title
            |--------------------------------------------------------------------------
            */}

            <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                    <ClipboardList

                        size={28}

                    />

                </div>


                <div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

                        Tasks

                    </h1>


                    <p className="mt-1 text-gray-500 dark:text-gray-400">

                        Create, assign and track your team&apos;s work.

                    </p>

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Action
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={onCreate}

                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"

            >

                <Plus

                    size={18}

                />

                New Task

            </button>

        </div>

    );

}

