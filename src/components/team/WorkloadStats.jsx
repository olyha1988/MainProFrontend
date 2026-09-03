import {
    FolderKanban,
    CheckCircle2,
    Clock3,
    Eye,
    AlertTriangle,
    ListTodo,
    TrendingUp,
} from "lucide-react";

export default function WorkloadStats({

    workload = {},

}) {

    const stats = [

        {
            label: "Projects",
            value: workload.totalProjects || 0,
            icon: FolderKanban,
            color: "text-indigo-600",
        },

        {
            label: "Tasks",
            value: workload.totalTasks || 0,
            icon: ListTodo,
            color: "text-blue-600",
        },

        {
            label: "Completed",
            value: workload.completedTasks || 0,
            icon: CheckCircle2,
            color: "text-green-600",
        },

        {
            label: "In Progress",
            value: workload.inProgressTasks || 0,
            icon: Clock3,
            color: "text-yellow-600",
        },

        {
            label: "Review",
            value: workload.reviewTasks || 0,
            icon: Eye,
            color: "text-purple-600",
        },

        {
            label: "Overdue",
            value: workload.overdueTasks || 0,
            icon: AlertTriangle,
            color: "text-red-600",
        },

        {
            label: "High Priority",
            value: workload.highPriorityTasks || 0,
            icon: TrendingUp,
            color: "text-orange-600",
        },

        {
            label: "Completion",
            value: `${workload.completionRate || 0}%`,
            icon: CheckCircle2,
            color: "text-emerald-600",
        },

    ];

    return (

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {

                stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.label}
                            className="
                                rounded-xl
                                border
                                bg-white
                                p-5
                                shadow-sm
                                dark:border-gray-700
                                dark:bg-gray-900
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">

                                        {item.label}

                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">

                                        {item.value}

                                    </h3>

                                </div>

                                <Icon
                                    size={28}
                                    className={item.color}
                                />

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}