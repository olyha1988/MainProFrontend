import {

    CheckCircle2,

    CircleDashed,

    FolderKanban,

    ListTodo,

} from "lucide-react";


export default function ProfileStats({

    profile,

}) {

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const stats =

        profile?.statistics ||

        {};


    const statistics = [

        {

            title: "Projects",

            value:

                stats.projectsCount ??

                0,

            description: "Assigned projects",

            icon: FolderKanban,

            iconClassName: `
                bg-blue-50
                text-blue-600
                dark:bg-blue-950/40
                dark:text-blue-400
            `,

            accentClassName: `
                bg-blue-500
            `,

        },

        {

            title: "Total Tasks",

            value:

                stats.tasksCount ??

                0,

            description: "Assigned tasks",

            icon: ListTodo,

            iconClassName: `
                bg-violet-50
                text-violet-600
                dark:bg-violet-950/40
                dark:text-violet-400
            `,

            accentClassName: `
                bg-violet-500
            `,

        },

        {

            title: "Completed",

            value:

                stats.completedTasks ??

                0,

            description: "Tasks completed",

            icon: CheckCircle2,

            iconClassName: `
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-950/40
                dark:text-emerald-400
            `,

            accentClassName: `
                bg-emerald-500
            `,

        },

        {

            title: "In Progress",

            value:

                stats.inProgressTasks ??

                0,

            description: "Tasks currently in progress",

            icon: CircleDashed,

            iconClassName: `
                bg-amber-50
                text-amber-600
                dark:bg-amber-950/40
                dark:text-amber-400
            `,

            accentClassName: `
                bg-amber-500
            `,

        },

       

    ];


    return (

        <section>

            {/*
            |--------------------------------------------------------------------------
            | Section Heading
            |--------------------------------------------------------------------------
            */}

            <div className="mb-5">

                <h2
                    className="
                        text-xl
                        font-bold
                        tracking-tight
                        text-gray-900
                        dark:text-white
                    "
                >

                    Overview

                </h2>


                <p
                    className="
                        mt-1
                        text-sm
                        leading-6
                        text-gray-500
                        dark:text-gray-400
                    "
                >

                    Your current project and task statistics.

                </p>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Statistics Cards
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {statistics.map((statistic) => {

                    const Icon =

                        statistic.icon;


                    return (

                        <article

                            key={statistic.title}

                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                p-5
                                shadow-sm
                                transition-all
                                duration-200
                                hover:-translate-y-1
                                hover:shadow-lg
                                dark:border-gray-800
                                dark:bg-gray-900
                            "

                        >

                            {/*
                            |--------------------------------------------------------------------------
                            | Accent
                            |--------------------------------------------------------------------------
                            */}

                            <div
                                className={`
                                    absolute
                                    left-0
                                    top-0
                                    h-full
                                    w-1
                                    ${statistic.accentClassName}
                                `}
                            />


                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                "
                            >

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-gray-500
                                            dark:text-gray-400
                                        "
                                    >

                                        {statistic.title}

                                    </p>


                                    <p
                                        className="
                                            mt-2
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            text-gray-900
                                            dark:text-white
                                        "
                                    >

                                        {Number(

                                            statistic.value

                                        ).toLocaleString()}

                                    </p>

                                </div>


                                <div
                                    className={`
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        transition-transform
                                        duration-200
                                        group-hover:scale-105
                                        ${statistic.iconClassName}
                                    `}
                                >

                                    <Icon size={22} />

                                </div>

                            </div>


                            <div
                                className="
                                    mt-5
                                    border-t
                                    border-gray-100
                                    pt-4
                                    dark:border-gray-800
                                "
                            >

                                <p
                                    className="
                                        text-xs
                                        font-medium
                                        text-gray-400
                                        dark:text-gray-500
                                    "
                                >

                                    {statistic.description}

                                </p>

                            </div>

                        </article>

                    );

                })}

            </div>

        </section>

    );

}