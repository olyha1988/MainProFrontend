import Card from "@/components/ui/Card";

import useDashboard from "@/hooks/useDashboard";

import {

    PieChart,

    Pie,

    Cell,

    ResponsiveContainer,

    Tooltip,

    Legend,

} from "recharts";


const COLORS = [

    "#3B82F6",

    "#10B981",

    "#F59E0B",

    "#EF4444",

    "#8B5CF6",

    "#6B7280",

];


function CustomTooltip({

    active,

    payload,

}) {

    if (

        !active ||

        !payload?.length

    ) {

        return null;

    }


    const item = payload[0];


    return (

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">

            <p className="text-sm font-semibold text-gray-900 dark:text-white">

                {item.name}

            </p>


            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                Tasks:{" "}

                <span className="font-semibold text-gray-900 dark:text-white">

                    {item.value}

                </span>

            </p>

        </div>

    );

}


export default function TaskStatusChart() {

    const {

        statusChart = [],

        loading,

    } = useDashboard();


    const totalTasks = statusChart.reduce(

        (total, item) =>

            total + Number(item.count || 0),

        0

    );


    if (loading) {

        return (

            <Card title="Tasks by Status">

                <div className="flex h-80 items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent" />


                        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">

                            Loading task statuses...

                        </p>

                    </div>

                </div>

            </Card>

        );

    }


    if (!statusChart.length) {

        return (

            <Card title="Tasks by Status">

                <div className="flex h-80 items-center justify-center">

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-10 text-center dark:border-gray-700 dark:bg-gray-800/40">

                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">

                            No task data available

                        </p>


                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">

                            Task status statistics will appear here.

                        </p>

                    </div>

                </div>

            </Card>

        );

    }


    return (

        <Card title="Tasks by Status">

            <div className="relative h-80 w-full">

                <ResponsiveContainer

                    width="100%"

                    height="100%"

                >

                    <PieChart>

                        <Pie

                            data={statusChart}

                            dataKey="count"

                            nameKey="status"

                            cx="50%"

                            cy="45%"

                            innerRadius={62}

                            outerRadius={98}

                            paddingAngle={3}

                            stroke="none"

                        >

                            {statusChart.map(

                                (entry, index) => (

                                    <Cell

                                        key={entry.status}

                                        fill={

                                            COLORS[

                                                index %

                                                COLORS.length

                                            ]

                                        }

                                    />

                                )

                            )}

                        </Pie>


                        <Tooltip

                            content={

                                <CustomTooltip />

                            }

                        />


                        <Legend

                            verticalAlign="bottom"

                            iconType="circle"

                            iconSize={9}

                            formatter={(value) => (

                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">

                                    {value}

                                </span>

                            )}

                        />

                    </PieChart>

                </ResponsiveContainer>


                <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-center">

                    <p className="text-3xl font-bold text-gray-900 dark:text-white">

                        {totalTasks}

                    </p>


                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">

                        Total Tasks

                    </p>

                </div>

            </div>

        </Card>

    );

}