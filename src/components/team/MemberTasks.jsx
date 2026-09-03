import { CalendarDays, FolderOpen } from "lucide-react";

import TaskPriorityBadge from "@/components/tasks/TaskPriorityBadge";
import TaskStatusBadge from "@/components/tasks/TaskStatusBadge";

export default function MemberTasks({
    tasks = [],
}) {

    if (!tasks.length) {
        return (
            <div className="
                rounded-xl
                border
                bg-white
                p-8
                text-center
                text-gray-500
                dark:border-gray-700
                dark:bg-gray-900
                dark:text-gray-400
            ">
                No assigned tasks.
            </div>
        );
    }

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">

                <h2 className="
                    text-xl
                    font-semibold
                    text-gray-900
                    dark:text-white
                ">
                    Assigned Tasks
                </h2>

                <span className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-blue-700
                    dark:bg-blue-900/30
                    dark:text-blue-400
                ">
                    {tasks.length} Tasks
                </span>

            </div>

            <div className="
                space-y-4
            ">

                {tasks.map((task) => (

                    <div
                        key={task._id}
                        className="
                            rounded-xl
                            border
                            bg-white
                            p-5
                            shadow-sm
                            transition
                            hover:shadow-md
                            dark:border-gray-700
                            dark:bg-gray-900
                        "
                    >

                        {/* Top */}

                        <div className="
                            flex
                            flex-col
                            gap-4
                            lg:flex-row
                            lg:items-start
                            lg:justify-between
                        ">

                            {/* Left */}

                            <div className="flex-1">

                                <h3 className="
                                    text-lg
                                    font-semibold
                                    text-gray-900
                                    dark:text-white
                                ">
                                    {task.title}
                                </h3>

                                {task.description && (

                                    <p className="
                                        mt-2
                                        line-clamp-2
                                        text-sm
                                        text-gray-600
                                        dark:text-gray-400
                                    ">
                                        {task.description}
                                    </p>

                                )}

                            </div>

                            {/* Badges */}

                            <div className="
                                flex
                                flex-wrap
                                gap-2
                            ">

                                <TaskPriorityBadge
                                    priority={task.priority}
                                />

                                <TaskStatusBadge
                                    status={task.status}
                                />

                            </div>

                        </div>

                        {/* Divider */}

                        <div className="
                            my-5
                            border-t
                            dark:border-gray-700
                        " />

                        {/* Bottom */}

                        <div className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        ">

                            {/* Project */}

                            <div>

                                <p className="
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Project
                                </p>

                                <div className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-2
                                    font-medium
                                    text-gray-900
                                    dark:text-white
                                ">

                                    <FolderOpen
                                        size={17}
                                        className="text-blue-500"
                                    />

                                    {task.project?.name || "-"}

                                </div>

                            </div>

                            {/* Due */}

                            <div>

                                <p className="
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Due Date
                                </p>

                                <div className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-2
                                    font-medium
                                    text-gray-900
                                    dark:text-white
                                ">

                                    <CalendarDays
                                        size={17}
                                        className="text-orange-500"
                                    />

                                    {task.dueDate
                                        ? new Date(
                                              task.dueDate
                                          ).toLocaleDateString()
                                        : "No Due Date"}

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );

}