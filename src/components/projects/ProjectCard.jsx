
import {

    CalendarDays,

    Users,

} from "lucide-react";

import {

    useNavigate,

} from "react-router-dom";


import ProjectMembers from "./ProjectMembers";

import ProjectMenu from "./ProjectMenu";

import ProjectStatusBadge from "./ProjectStatusBadge";


export default function ProjectCard({

    project,

    onEdit,

    onDelete,

    onManageMembers,

}) {

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | Open Project
    |--------------------------------------------------------------------------
    */

    const openProject = () => {

        if (!project?._id) {

            return;

        }


        navigate(

            `/projects/${project._id}`

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Keyboard Navigation
    |--------------------------------------------------------------------------
    */

    const handleKeyDown = (event) => {

        if (

            event.key !== "Enter" &&

            event.key !== " "

        ) {

            return;

        }


        event.preventDefault();

        openProject();

    };


    /*
    |--------------------------------------------------------------------------
    | Created Date
    |--------------------------------------------------------------------------
    */

    const formatCreatedDate = () => {

        if (!project?.createdAt) {

            return "Date unavailable";

        }


        const createdDate =

            new Date(

                project.createdAt

            );


        if (

            Number.isNaN(

                createdDate.getTime()

            )

        ) {

            return "Date unavailable";

        }


        return createdDate.toLocaleDateString(

            "en-US",

            {

                year: "numeric",

                month: "short",

                day: "numeric",

            }

        );

    };


    const memberCount =

        project?.members?.length || 0;


    return (

        <article

            role="button"

            tabIndex={0}

            onClick={openProject}

            onKeyDown={handleKeyDown}

            aria-label={`Open ${project?.name || "project"}`}

            className="
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/20
                dark:border-gray-700
                dark:bg-gray-900
                dark:hover:border-blue-800
            "

        >

            {/*
            |--------------------------------------------------------------------------
            | Top Accent
            |--------------------------------------------------------------------------
            */}

            <div

                className="h-1 w-full"

                style={{

                    backgroundColor:

                        project?.color ||

                        "#3B82F6",

                }}

            />


            <div className="p-5">

                {/*
                |--------------------------------------------------------------------------
                | Header
                |--------------------------------------------------------------------------
                */}

                <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-start gap-3">

                        <span

                            className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"

                            style={{

                                backgroundColor:

                                    project?.color ||

                                    "#3B82F6",

                            }}

                            aria-hidden="true"

                        />


                        <div className="min-w-0">

                            <h3 className="truncate text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">

                                {

                                    project?.name ||

                                    "Untitled Project"

                                }

                            </h3>


                            <div className="mt-2">

                                <ProjectStatusBadge

                                    status={project?.status}

                                />

                            </div>

                        </div>

                    </div>


                    <div

                        className="shrink-0"

                        onClick={(event) =>

                            event.stopPropagation()

                        }

                        onKeyDown={(event) =>

                            event.stopPropagation()

                        }

                    >

                        <ProjectMenu

                            project={project}

                            onEdit={onEdit}

                            onDelete={onDelete}

                        />

                    </div>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Description
                |--------------------------------------------------------------------------
                */}

                <p className="mt-5 line-clamp-3 min-h-[60px] text-sm leading-6 text-gray-500 dark:text-gray-400">

                    {

                        project?.description ||

                        "No description available."

                    }

                </p>


                {/*
                |--------------------------------------------------------------------------
                | Members
                |--------------------------------------------------------------------------
                */}

                <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">

                    <div className="mb-3 flex items-center justify-between">

                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                            Team Members

                        </span>


                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">

                            {memberCount}{" "}

                            {memberCount === 1

                                ? "member"

                                : "members"}

                        </span>

                    </div>


                    <ProjectMembers

                        members={
                            project?.members || []
                        }

                    />

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Footer
                |--------------------------------------------------------------------------
                */}

                <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">

                    <div className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">

                        <CalendarDays

                            size={15}

                            aria-hidden="true"

                        />

                        <span>

                            Created{" "}

                            {formatCreatedDate()}

                        </span>

                    </div>


                    <button

                        type="button"

                        onClick={(event) => {

                            event.stopPropagation();

                            onManageMembers?.(

                                project

                            );

                        }}

                        className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-gray-700
                            transition
                            hover:border-blue-300
                            hover:bg-blue-50
                            hover:text-blue-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            dark:border-gray-700
                            dark:bg-gray-900
                            dark:text-gray-300
                            dark:hover:border-blue-800
                            dark:hover:bg-blue-950/30
                            dark:hover:text-blue-400
                        "

                    >

                        <Users

                            size={17}

                            aria-hidden="true"

                        />

                        Manage Members

                    </button>

                </div>

            </div>

        </article>

    );

}

