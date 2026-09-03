import Card from "@/components/ui/Card";

import useDashboard from "@/hooks/useDashboard";

import { useNavigate } from "react-router-dom";


import {

    FolderKanban,

    ArrowRight,

} from "lucide-react";




const getStatusStyles = (status) => {

    switch (status?.toLowerCase()) {

        case "active":

            return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300";

        case "completed":

            return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";

        case "on hold":

            return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";

        case "cancelled":

            return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300";

        default:

            return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

    }

};


export default function RecentProjects() {

    const navigate = useNavigate();


    const {

        recentProjects = [],

        loading,

    } = useDashboard();


    return (

        <Card title="Recent Projects">

            {loading ? (

                <div className="space-y-3">

                    {Array.from({

                        length: 5,

                    }).map((_, index) => (

                        <div

                            key={index}

                            className="flex animate-pulse items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700"

                        >

                            <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-800" />

                       
                            <div className="flex-1 space-y-2">

                                <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800" />

                                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />

                            </div>

                        </div>

                    ))}

                </div>

            ) : recentProjects.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-800/40">

                    <FolderKanban

                        size={32}

                        className="mx-auto text-gray-400"

                        aria-hidden="true"

                    />


                    <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">

                        No recent projects

                    </p>


                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                        Recently created or updated projects will appear here.

                    </p>

                </div>

            ) : (

                <ul className="space-y-3">

                    {recentProjects.map((project) => (

                        <li

                            key={project._id}

                        >

                            <button

                                type="button"

                                onClick={() =>

                                    navigate(

                                        `/projects/${project._id}`

                                    )

                                }

                                className="
                                    group
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    gap-4
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    p-4
                                    text-left
                                    transition
                                    hover:border-blue-200
                                    hover:bg-blue-50/40
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                    dark:border-gray-700
                                    dark:bg-gray-900
                                    dark:hover:border-blue-900
                                    dark:hover:bg-blue-950/10
                                "

                            >

                                <div className="flex min-w-0 items-center gap-3">

                                    <div

                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"

                                        style={{

                                            backgroundColor:

                                                project.color ||

                                                "#3B82F6",

                                        }}

                                    >

                                        <FolderKanban

                                            size={18}

                                            aria-hidden="true"

                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">

                                            {project.name}

                                        </h3>


                                        <span

                                            className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                                                project.status
                                            )}`}

                                        >

                                            {project.status ||

                                                "Unknown"}

                                        </span>

                                    </div>

                                </div>


                                <ArrowRight

                                    size={18}

                                    className="shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"

                                    aria-hidden="true"

                                />

                            </button>

                        </li>

                    ))}

                </ul>

            )}

        </Card>

    );

}