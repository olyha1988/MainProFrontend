
import {

    FolderKanban,

    Plus,

} from "lucide-react";


export default function ProjectHeader({

    onCreate,

}) {

    return (

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">

            {/*
            |--------------------------------------------------------------------------
            | Header Content
            |--------------------------------------------------------------------------
            */}

            <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                    <FolderKanban

                        size={28}

                        aria-hidden="true"

                    />

                </div>


                <div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

                        Projects

                    </h1>


                    <p className="mt-1 text-gray-500 dark:text-gray-400">

                        Create and manage your team projects.

                    </p>

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Create Project
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={onCreate}

                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-blue-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "

            >

                <Plus

                    size={18}

                    aria-hidden="true"

                />

                New Project

            </button>

        </div>

    );

}

