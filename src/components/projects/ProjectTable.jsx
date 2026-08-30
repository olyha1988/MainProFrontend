import {

    CalendarDays,

    Users,

} from "lucide-react";

import {

    useNavigate,

} from "react-router-dom";


import ProjectMenu from "./ProjectMenu";

import ProjectPagination from "./ProjectPagination";

import ProjectStatusBadge from "./ProjectStatusBadge";


export default function ProjectTable({

    projects = [],

    pagination,

    filters,

    setFilters,

    onEdit,

    onDelete,

    onManageMembers,

}) {

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | Format Date
    |--------------------------------------------------------------------------
    */

    const formatDate = (date) => {

        if (!date) {

            return "Unavailable";

        }


        const parsedDate = new Date(date);


        if (

            Number.isNaN(

                parsedDate.getTime()

            )

        ) {

            return "Unavailable";

        }


        return parsedDate.toLocaleDateString(

            "en-US",

            {

                year: "numeric",

                month: "short",

                day: "numeric",

            }

        );

    };


    return (

        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead className="bg-gray-50 dark:bg-gray-800/70">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                Project

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                Status

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                Members

                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                Created

                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                Actions

                            </th>

                        </tr>

                    </thead>


                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                        {projects.map((project) => (

                            <tr

                                key={project._id}

                                onClick={() =>

                                    navigate(

                                        `/projects/${project._id}`

                                    )

                                }

                                className="
                                    cursor-pointer
                                    transition
                                    hover:bg-gray-50
                                    dark:hover:bg-gray-800/60
                                "

                            >

                                {/*
                                |--------------------------------------------------------------------------
                                | Project
                                |--------------------------------------------------------------------------
                                */}

                                <td className="px-6 py-4">

                                    <div className="flex min-w-0 items-center gap-3">

                                        <span

                                            className="h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-gray-100 dark:ring-gray-800"

                                            style={{

                                                backgroundColor:

                                                    project.color ||

                                                    "#3B82F6",

                                            }}

                                            aria-hidden="true"

                                        />


                                        <div className="min-w-0">

                                            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">

                                                {project.name ||

                                                    "Untitled Project"}

                                            </p>


                                            <p className="mt-1 max-w-xs truncate text-sm text-gray-500 dark:text-gray-400">

                                                {project.description ||

                                                    "No description available."}

                                            </p>

                                        </div>

                                    </div>

                                </td>


                                {/*
                                |--------------------------------------------------------------------------
                                | Status
                                |--------------------------------------------------------------------------
                                */}

                                <td className="px-6 py-4">

                                    <ProjectStatusBadge

                                        status={project.status}

                                    />

                                </td>


                                {/*
                                |--------------------------------------------------------------------------
                                | Members
                                |--------------------------------------------------------------------------
                                */}

                                <td className="px-6 py-4">

                                    <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

                                        <Users

                                            size={16}

                                            aria-hidden="true"

                                        />

                                        <span className="font-medium">

                                            {project.members?.length || 0}

                                        </span>

                                    </div>

                                </td>


                                {/*
                                |--------------------------------------------------------------------------
                                | Created Date
                                |--------------------------------------------------------------------------
                                */}

                                <td className="px-6 py-4">

                                    <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

                                        <CalendarDays

                                            size={16}

                                            aria-hidden="true"

                                        />

                                        {formatDate(

                                            project.createdAt

                                        )}

                                    </div>

                                </td>


                                {/*
                                |--------------------------------------------------------------------------
                                | Actions
                                |--------------------------------------------------------------------------
                                */}

                                <td className="px-6 py-4">

                                    <div

                                        className="flex items-center justify-end gap-2"

                                        onClick={(event) =>

                                            event.stopPropagation()

                                        }

                                    >

                                        <button

                                            type="button"

                                            onClick={() =>

                                                onManageMembers?.(

                                                    project

                                                )

                                            }

                                            className="
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                border
                                                border-gray-300
                                                bg-white
                                                px-3
                                                py-2
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

                                                size={16}

                                                aria-hidden="true"

                                            />

                                            Members

                                        </button>


                                        <ProjectMenu

                                            project={project}

                                            onEdit={onEdit}

                                            onDelete={onDelete}

                                        />

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            <ProjectPagination

                pagination={pagination}

                filters={filters}

                setFilters={setFilters}

            />

        </div>

    );

}