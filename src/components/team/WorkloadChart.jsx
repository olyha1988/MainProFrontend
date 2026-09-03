export default function WorkloadChart({

    workload = {},

}) {

    const data = [

        {
            label: "Todo",
            value: workload.todoTasks || 0,
            color: "bg-gray-500",
        },

        {
            label: "In Progress",
            value: workload.inProgressTasks || 0,
            color: "bg-blue-600",
        },

        {
            label: "Review",
            value: workload.reviewTasks || 0,
            color: "bg-purple-600",
        },

        {
            label: "Completed",
            value: workload.completedTasks || 0,
            color: "bg-green-600",
        },

    ];

    const total = workload.totalTasks || 1;

    return (

        <div
            className="
                rounded-xl
                border
                bg-white
                p-6
                shadow-sm
                dark:border-gray-700
                dark:bg-gray-900
            "
        >

            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">

                    Task Distribution

                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">

                    Status-wise workload

                </p>

            </div>

            <div className="space-y-5">

                {

                    data.map((item) => (

                        <div key={item.label}>

                            <div className="mb-2 flex justify-between">

                                <span className="text-sm text-gray-600 dark:text-gray-300">

                                    {item.label}

                                </span>

                                <span className="text-sm font-semibold text-gray-900 dark:text-white">

                                    {item.value}

                                </span>

                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">

                                <div
                                    className={`h-full rounded-full ${item.color}`}
                                    style={{
                                        width: `${(item.value / total) * 100}%`,
                                    }}
                                />

                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="mt-8 rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">

                <div className="flex items-center justify-between">

                    <span className="font-medium text-blue-700 dark:text-blue-300">

                        Overall Completion

                    </span>

                    <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">

                        {workload.completionRate || 0}%

                    </span>

                </div>

            </div>

        </div>

    );

}