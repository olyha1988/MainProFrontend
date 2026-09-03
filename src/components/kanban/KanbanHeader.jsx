import {

    FaPlus,

} from "react-icons/fa";

import KanbanFilters from "./KanbanFilters";


export default function KanbanHeader({

    filters,

    setFilters,

    projects,

    members,

    onCreateTask,

}) {

    return (

        <section
            className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
                dark:border-gray-800
                dark:bg-slate-900
                sm:p-5
                xl:flex-row
                xl:items-end
                xl:justify-between
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Filters
            |--------------------------------------------------------------------------
            */}

            <div className="min-w-0 flex-1">

                <KanbanFilters

                    filters={filters}

                    setFilters={setFilters}

                    projects={projects}

                    members={members}

                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Create Task
            |--------------------------------------------------------------------------
            */}

            {/* <div
                className="
                    flex
                    shrink-0
                    sm:justify-end
                "
            >

                <button

                    type="button"

                    onClick={onCreateTask}

                    className="
                        inline-flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        whitespace-nowrap
                        rounded-xl
                        bg-indigo-600
                        px-5
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        shadow-indigo-600/20
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-indigo-700
                        hover:shadow-md
                        hover:shadow-indigo-600/25
                        focus:outline-none
                        focus:ring-4
                        focus:ring-indigo-500/20
                        active:translate-y-0
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:bg-indigo-500
                        dark:hover:bg-indigo-600
                        sm:w-auto
                    "

                >

                    <FaPlus

                        size={13}

                        aria-hidden="true"

                    />

                    <span>

                        New Task

                    </span>

                </button>

            </div> */}

        </section>

    );

}