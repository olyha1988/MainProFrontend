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

    LabelList,

} from "recharts";


export default function ProjectProgressChart() {

    const {

        projectProgress = [],

        loading,

    } = useDashboard();


    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <Card title="Project Progress">

                <div className="flex h-96 items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent" />


                        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">

                            Loading project progress...

                        </p>

                    </div>

                </div>

            </Card>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!projectProgress.length) {

        return (

            <Card title="Project Progress">

                <div className="flex h-96 items-center justify-center">

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-10 text-center dark:border-gray-700 dark:bg-gray-800/40">

                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">

                            No projects found

                        </p>


                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">

                            Project progress will appear here once projects are available.

                        </p>

                    </div>

                </div>

            </Card>

        );

    }


    return (

        <Card title="Project Progress">

            <div className="h-96 w-full">

                <ResponsiveContainer

                    width="100%"

                    height="100%"

                >

                    <BarChart

                        data={projectProgress}

                        layout="vertical"

                        margin={{

                            top: 20,

                            right: 50,

                            left: 30,

                            bottom: 10,

                        }}

                    >

                        <CartesianGrid

                            strokeDasharray="4 4"

                            horizontal={false}

                            stroke="currentColor"

                            className="text-gray-200 dark:text-gray-700"

                        />


                        <XAxis

                            type="number"

                            domain={[0, 100]}

                            unit="%"

                            axisLine={false}

                            tickLine={false}

                            tick={{

                                fill: "currentColor",

                                fontSize: 12,

                            }}

                            className="text-gray-500 dark:text-gray-400"

                        />


                        <YAxis

                            type="category"

                            dataKey="name"

                            width={120}

                            axisLine={false}

                            tickLine={false}

                            tick={{

                                fill: "currentColor",

                                fontSize: 12,

                            }}

                            className="text-gray-600 dark:text-gray-300"

                        />


                        <Tooltip

                            cursor={{

                                fill: "rgba(59, 130, 246, 0.08)",

                            }}

                            formatter={(value) => [

                                `${value}%`,

                                "Progress",

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

                            dataKey="progress"

                            fill="#2563EB"

                            radius={[0, 8, 8, 0]}

                            maxBarSize={34}

                        >

                            <LabelList

                                dataKey="progress"

                                position="right"

                                formatter={(value) =>

                                    `${value}%`

                                }

                                fill="currentColor"

                                className="text-gray-700 dark:text-gray-300"

                                fontSize={12}

                                fontWeight={600}

                            />

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}