import Card from "@/components/ui/Card";

import useDashboard from "@/hooks/useDashboard";

import {

    CheckSquare2,

    Circle,

    FolderKanban,

} from "lucide-react";


const getStatusStyles = (status) => {

    switch (status?.toLowerCase()) {

        case "completed":

            return {

                badge: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300",

                dot: "bg-green-500",

            };

        case "in progress":

            return {

                badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",

                dot: "bg-blue-500",

            };

        case "pending":

            return {

                badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",

                dot: "bg-amber-500",

            };

        case "cancelled":

            return {

                badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",

                dot: "bg-red-500",

            };

        default:

            return {

                badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",

                dot: "bg-gray-400",

            };

    }

};


export default function RecentTasks() {

    const {

        recentTasks = [],

        loading,

    } = useDashboard();


    return (

        <Card title="Recent Tasks">

            {loading ? (

                <div className="space-y-5">

                    {Array.from({

                        length: 5,

                    }).map((_, index) => (

                        <div

                            key={index}

                            className="flex animate-pulse gap-4"

                        >

                            <div className="flex flex-col items-center">

                                <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-800" />

                                {index !== 4 && (

                                    <div className="mt-2 h-14 w-px bg-gray-200 dark:bg-gray-800" />

                                )}

                            </div>


                            <div className="flex-1 pb-4">

                                <div className="h-4 w-44 rounded bg-gray-200 dark:bg-gray-800" />

                                <div className="mt-2 h-3 w-28 rounded bg-gray-200 dark:bg-gray-800" />

                            </div>

                        </div>

                    ))}

                </div>

            ) : recentTasks.length === 0 ? (

                <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl bg-gray-50 px-6 text-center dark:bg-gray-800/40">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">

                        <CheckSquare2 size={26} />

                    </div>


                    <p className="mt-4 text-sm font-semibold text-gray-800 dark:text-gray-200">

                        No recent tasks

                    </p>


                    <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-gray-400">

                        Recently created and updated tasks will appear here.

                    </p>

                </div>

            ) : (

                <div className="space-y-0">

                    {recentTasks.map((task, index) => {

                        const statusStyles = getStatusStyles(

                            task.status

                        );


                        return (

                            <div

                                key={task._id}

                                className="group flex gap-4"

                            >

                                <div className="flex flex-col items-center">

                                    <div

                                        className={`
                                            mt-1
                                            flex
                                            h-4
                                            w-4
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            ring-4
                                            ring-white
                                            dark:ring-gray-900
                                            ${statusStyles.dot}
                                        `}

                                    >

                                        <Circle

                                            size={6}

                                            className="fill-white text-white"

                                        />

                                    </div>


                                    {index !== recentTasks.length - 1 && (

                                        <div className="my-2 w-px flex-1 bg-gray-200 dark:bg-gray-700" />

                                    )}

                                </div>


                                <div className="min-w-0 flex-1 pb-6">

                                    <div className="rounded-2xl bg-gray-50 p-4 transition-colors group-hover:bg-gray-100 dark:bg-gray-800/60 dark:group-hover:bg-gray-800">

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">

                                                <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">

                                                    {task.title}

                                                </h3>


                                                <div className="mt-2 flex min-w-0 items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">

                                                    <FolderKanban

                                                        size={14}

                                                        className="shrink-0"

                                                    />


                                                    <span className="truncate">

                                                        {task.project?.name ||

                                                            "No Project"}

                                                    </span>
                                                 

                                                </div>

                                                   {/* <div>

                                                      {task.description ||

                                                            "No Description"}
                                                        </div> */}

                                            </div>


                                            <span

                                                className={`
                                                    shrink-0
                                                    rounded-full
                                                    px-2.5
                                                    py-1
                                                    text-xs
                                                    font-semibold
                                                    ${statusStyles.badge}
                                                `}

                                            >

                                                {task.status || "Unknown"}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </Card>

    );

}