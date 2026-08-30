
import {

    AlertTriangle,

    RefreshCcw,

} from "lucide-react";


export default function ErrorTasks({

    message,

    retry,

}) {

    return (

        <div className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center shadow-sm dark:border-red-900/50 dark:bg-gray-900 sm:py-20">

            {/*
            |--------------------------------------------------------------------------
            | Icon
            |--------------------------------------------------------------------------
            */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">

                <AlertTriangle

                    size={38}

                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Content
            |--------------------------------------------------------------------------
            */}

            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">

                Something Went Wrong

            </h2>


            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">

                {message ||

                    "We couldn't load your tasks. Please check your connection and try again."}

            </p>


            <div className="mx-auto mt-6 max-w-lg rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">

                If the problem persists, please try again later or contact your administrator.

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Retry Button
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={retry}

                className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900"

            >

                <RefreshCcw

                    size={18}

                />

                Try Again

            </button>

        </div>

    );

}

