
import {

    AlertTriangle,

    RefreshCw,

} from "lucide-react";


export default function ErrorProjects({

    message,

    retry,

}) {

    return (

        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center shadow-sm dark:border-red-900/50 dark:bg-red-950/30">

            {/*
            |--------------------------------------------------------------------------
            | Icon
            |--------------------------------------------------------------------------
            */}

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">

                <AlertTriangle

                    size={40}

                    aria-hidden="true"

                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Content
            |--------------------------------------------------------------------------
            */}

            <h2 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">

                Unable to Load Projects

            </h2>


            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600 dark:text-gray-400">

                {message ||

                    "Something went wrong while loading your projects. Please try again."}

            </p>


            {/*
            |--------------------------------------------------------------------------
            | Retry Button
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={retry}

                className="
                    mt-6
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-red-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500/30
                "

            >

                <RefreshCw

                    size={17}

                    aria-hidden="true"

                />

                Try Again

            </button>

        </div>

    );

}

