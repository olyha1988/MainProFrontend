
import {

    FolderPlus,

    Plus,

} from "lucide-react";


export default function EmptyProjects({

    onCreate,

}) {

    return (

        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">

            {/*
            |--------------------------------------------------------------------------
            | Icon
            |--------------------------------------------------------------------------
            */}

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                <FolderPlus

                    size={38}

                    aria-hidden="true"

                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Content
            |--------------------------------------------------------------------------
            */}

            <h2 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">

                No Projects Found

            </h2>


            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">

                Create your first project to organize tasks, assign team members, and track progress.

            </p>


            {/*
            |--------------------------------------------------------------------------
            | Create Action
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={onCreate}

                className="
                    mt-6
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
                "

            >

                <Plus

                    size={18}

                    aria-hidden="true"

                />

                Create Project

            </button>

        </div>

    );

}

