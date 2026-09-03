import {

    useDroppable,

} from "@dnd-kit/core";

import {

    CircleCheckBig,

    ClipboardList,

    Clock3,

    Eye,

} from "lucide-react";

import KanbanTaskCard from "./KanbanTaskCard";
import EmptyColumn from "./EmptyColumn";


const COLUMN_STYLES = {

    TODO: {

        title: "To Do",

        icon: ClipboardList,

        dotClassName:

            "bg-slate-400",

        iconClassName:

            `
                bg-slate-100
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
            `,

        countClassName:

            `
                bg-slate-100
                text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
            `,

    },

    IN_PROGRESS: {

        title: "In Progress",

        icon: Clock3,

        dotClassName:

            "bg-blue-500",

        iconClassName:

            `
                bg-blue-50
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
            `,

        countClassName:

            `
                bg-blue-50
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
            `,

    },

    REVIEW: {

        title: "Review",

        icon: Eye,

        dotClassName:

            "bg-amber-500",

        iconClassName:

            `
                bg-amber-50
                text-amber-600
                dark:bg-amber-500/10
                dark:text-amber-400
            `,

        countClassName:

            `
                bg-amber-50
                text-amber-600
                dark:bg-amber-500/10
                dark:text-amber-400
            `,

    },

    COMPLETED: {

        title: "Completed",

        icon: CircleCheckBig,

        dotClassName:

            "bg-emerald-500",

        iconClassName:

            `
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-500/10
                dark:text-emerald-400
            `,

        countClassName:

            `
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-500/10
                dark:text-emerald-400
            `,

    },

};


export default function KanbanColumn({

    status,

    tasks = [],

    onView,

    onEdit,

    onDelete,

}) {

    /*
    |--------------------------------------------------------------------------
    | Droppable
    |--------------------------------------------------------------------------
    */

    const {

        setNodeRef,

        isOver,

    } = useDroppable({

        id: status,

        data: {

            type: "column",

            status,

        },

    });


    /*
    |--------------------------------------------------------------------------
    | Column Style
    |--------------------------------------------------------------------------
    */

    const statusStyle =

        COLUMN_STYLES[status] || {

            title: status,

            icon: ClipboardList,

            dotClassName:

                "bg-indigo-500",

            iconClassName:

                `
                    bg-indigo-50
                    text-indigo-600
                    dark:bg-indigo-500/10
                    dark:text-indigo-400
                `,

            countClassName:

                `
                    bg-indigo-50
                    text-indigo-600
                    dark:bg-indigo-500/10
                    dark:text-indigo-400
                `,

        };


    const StatusIcon =

        statusStyle.icon;


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <section

            ref={setNodeRef}

            className={`
                relative
                flex
                min-h-[560px]
                min-w-0
                flex-col
                overflow-hidden
                rounded-2xl
                border
                shadow-sm
                transition-all
                duration-200
                ${isOver

                    ? `
                            border-indigo-400
                            bg-indigo-50/60
                            shadow-md
                            ring-4
                            ring-indigo-500/10
                            dark:border-indigo-500
                            dark:bg-indigo-500/5
                            dark:ring-indigo-500/10
                        `

                    : `
                            border-gray-200
                            bg-gray-50/80
                            dark:border-gray-800
                            dark:bg-slate-900/80
                        `
                }
            `}

        >

            {/*
            |--------------------------------------------------------------------------
            | Column Header
            |--------------------------------------------------------------------------
            */}

            <header
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-b
                    border-gray-200
                    bg-white/80
                    px-4
                    py-4
                    backdrop-blur-sm
                    dark:border-gray-800
                    dark:bg-slate-950/70
                "
            >

                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                    "
                >

                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${statusStyle.iconClassName}
                        `}
                    >

                        <StatusIcon

                            size={17}

                            strokeWidth={2}

                            aria-hidden="true"

                        />

                    </div>


                    <div className="min-w-0">

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <span
                                className={`
                                    h-2
                                    w-2
                                    shrink-0
                                    rounded-full
                                    ${statusStyle.dotClassName}
                                `}
                            />


                            <h3
                                className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                    dark:text-white
                                "
                            >

                                {statusStyle.title}

                            </h3>

                        </div>


                        <p
                            className="
                                mt-0.5
                                text-xs
                                text-gray-500
                                dark:text-gray-400
                            "
                        >

                            {tasks.length === 1

                                ? "1 task"

                                : `${tasks.length} tasks`}

                        </p>

                    </div>

                </div>


                <span
                    className={`
                        inline-flex
                        h-7
                        min-w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        px-2
                        text-xs
                        font-semibold
                        ${statusStyle.countClassName}
                    `}
                >

                    {tasks.length}

                </span>

            </header>


            {/*
            |--------------------------------------------------------------------------
            | Column Content
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    p-3
                "
            >

          <div className="min-h-[280px] flex-1 space-y-3">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <KanbanTaskCard
                                key={task._id}
                                task={task}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <EmptyColumn status={status} />
                    )}
                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Drag Indicator
            |--------------------------------------------------------------------------
            */}

            {isOver && (

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-3
                        bottom-3
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        border-indigo-400
                        bg-indigo-50/90
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-indigo-600
                        shadow-sm
                        dark:border-indigo-500
                        dark:bg-indigo-500/10
                        dark:text-indigo-400
                    "
                >

                    Drop task here

                </div>

            )}

        </section>

    );

}