import Card from "@/components/ui/Card";

import useDashboard from "@/hooks/useDashboard";

import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    Cell,

} from "recharts";


const COLORS = {

    Low: "#10B981",

    Medium: "#F59E0B",

    High: "#EF4444",

    Critical: "#7C3AED",

};


export default function TaskPriorityChart() {

    const {

        priorityChart = [],

        loading,

    } = useDashboard();


    if (loading) {

        return (

            <Card title="Tasks by Priority">

                <div className="flex h-80 items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent" />

                        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">

                            Loading task priorities...

                        </p>

                    </div>

                </div>

            </Card>

        );

    }


    if (!priorityChart.length) {

        return (

            <Card title="Tasks by Priority">

                <div className="flex h-80 items-center justify-center">

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-10 text-center dark:border-gray-700 dark:bg-gray-800/40">

                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">

                            No task data available

                        </p>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">

                            Task priority statistics will appear here.

                        </p>

                    </div>

                </div>

            </Card>

        );

    }


    return (

        <Card title="Tasks by Priority">

            <div className="h-80 w-full">

                <ResponsiveContainer

                    width="100%"

                    height="100%"

                >

                    <BarChart

                        data={priorityChart}

                        margin={{

                            top: 20,

                            right: 20,

                            left: 0,

                            bottom: 5,

                        }}

                    >

                        <CartesianGrid

                            strokeDasharray="4 4"

                            vertical={false}

                            stroke="currentColor"

                            className="text-gray-200 dark:text-gray-700"

                        />


                        <XAxis

                            dataKey="priority"

                            axisLine={false}

                            tickLine={false}

                            tick={{

                                fill: "currentColor",

                                fontSize: 12,

                            }}

                            className="text-gray-500 dark:text-gray-400"

                        />


                        <YAxis

                            allowDecimals={false}

                            axisLine={false}

                            tickLine={false}

                            tick={{

                                fill: "currentColor",

                                fontSize: 12,

                            }}

                            className="text-gray-500 dark:text-gray-400"

                        />


                        <Tooltip

                            cursor={{

                                fill: "rgba(59, 130, 246, 0.06)",

                            }}

                            formatter={(value) => [

                                value,

                                "Tasks",

                            ]}

                            contentStyle={{

                                borderRadius: "12px",

                                border: "1px solid rgb(229 231 235)",

                                backgroundColor: "var(--chart-tooltip-bg, white)",

                                boxShadow:

                                    "0 10px 25px rgba(0, 0, 0, 0.08)",

                                fontSize: "13px",

                            }}

                            labelStyle={{

                                fontWeight: 600,

                                marginBottom: "4px",

                            }}

                        />


                        <Bar

                            dataKey="count"

                            radius={[8, 8, 0, 0]}

                            maxBarSize={52}

                        >

                            {priorityChart.map((item) => (

                                <Cell

                                    key={item.priority}

                                    fill={

                                        COLORS[item.priority] ||

                                        "#3B82F6"

                                    }

                                />

                            ))}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}