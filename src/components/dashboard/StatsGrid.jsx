import { useEffect } from "react";

import {

    FaProjectDiagram,

    FaTasks,

    FaCheckCircle,

    FaExclamationTriangle,

    FaClipboardList,

    FaFolderOpen,

} from "react-icons/fa";

import DashboardCard from "./DashboardCard";

import useDashboard from "@/hooks/useDashboard";


export default function StatsGrid() {

    const {

        summary = {},

        loading,

        fetchDashboard,

    } = useDashboard();


    useEffect(() => {

        fetchDashboard();

    }, [ ]);


    const stats = [

        {

            title: "Total Projects",

            value: summary.totalProjects ?? 0,

            color: "bg-blue-600",

            icon: <FaFolderOpen size={24} />,

        },

        {

            title: "Active Projects",

            value: summary.activeProjects ?? 0,

            color: "bg-cyan-600",

            icon: <FaProjectDiagram size={24} />,

        },

        {

            title: "Total Tasks",

            value: summary.totalTasks ?? 0,

            color: "bg-green-600",

            icon: <FaTasks size={24} />,

        },

        {

            title: "Completed Tasks",

            value: summary.completedTasks ?? 0,

            color: "bg-emerald-600",

            icon: <FaCheckCircle size={24} />,

        },

        {

            title: "Overdue Tasks",

            value: summary.overdueTasks ?? 0,

            color: "bg-red-600",

            icon: <FaExclamationTriangle size={24} />,

        },

        {

            title: "My Tasks",

            value: summary.myTasks ?? 0,

            color: "bg-purple-600",

            icon: <FaClipboardList size={24} />,

        },

    ];


    return (

        <section aria-label="Dashboard statistics">

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {stats.map((item) => (

                    <DashboardCard

                        key={item.title}

                        title={item.title}

                        value={loading ? "—" : item.value}

                        color={item.color}

                        icon={item.icon}

                    />

                ))}

            </div>

        </section>

    );

}