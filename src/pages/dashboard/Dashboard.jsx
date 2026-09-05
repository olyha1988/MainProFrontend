
//HELLO
import StatsGrid from "@/components/dashboard/StatsGrid";

import RecentProjects from "@/components/dashboard/RecentProjects";

 import RecentTasks from "@/components/dashboard/RecentTasks";

import QuickActions from "@/components/dashboard/QuickActions";

import TaskStatusChart from "@/components/dashboard/TaskStatusChart";

import TaskPriorityChart from "@/components/dashboard/TaskPriorityChart";

import ProjectProgressChart from "@/components/dashboard/ProjectProgressChart";


export default function Dashboard() {

    return (

        <div className="min-h-full bg-gray-50   dark:bg-gray-950">

            <div className="mx-auto  space-y-8">

                



                {/*
                |--------------------------------------------------------------------------
                | Statistics
                |--------------------------------------------------------------------------
                */}

                <section>

                    <StatsGrid />

                </section>


                {/*
                |--------------------------------------------------------------------------
                | Quick Actions
                |--------------------------------------------------------------------------
                */}

                <section>

                    <QuickActions />

                </section>


                {/*
                |--------------------------------------------------------------------------
                | Task Charts
                |--------------------------------------------------------------------------
                */}

                <section className="grid gap-6 lg:grid-cols-2">

                   <TaskStatusChart />

                     <TaskPriorityChart />

                </section>


                {/*
                |--------------------------------------------------------------------------
                | Project Progress
                |--------------------------------------------------------------------------
                */}

                <section>

                    <ProjectProgressChart />

                </section>


                {/*
                |--------------------------------------------------------------------------
                | Recent Data
                |--------------------------------------------------------------------------
                */}

                <section className="grid gap-6 lg:grid-cols-2">

                    <RecentProjects />

                    <RecentTasks /> 

                </section>

            </div>

        </div>

    );

}