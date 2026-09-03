import WorkloadStats from "./WorkloadStats";
import WorkloadChart from "./WorkloadChart";

export default function MemberWorkload({

    workload = {},

}) {

    return (

        <div className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

                    Workload Overview

                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                    Task distribution and productivity summary.

                </p>

            </div>

            <WorkloadStats workload={workload} />

            <WorkloadChart workload={workload} />

        </div>

    );

}