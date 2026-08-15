import Card from "@/components/ui/Card";

import { useNavigate } from "react-router-dom";

import {

    FaFolderPlus,

    FaTasks,

    FaUsers,

    FaChartLine,

} from "react-icons/fa";


export default function QuickActions() {

    const navigate = useNavigate();


    const actions = [

        {

            title: "New Project",

            description: "Create a new project",

            icon: <FaFolderPlus size={22} />,

            color: "bg-blue-600",

            path: "/projects",

        },

        {

            title: "New Task",

            description: "Create and assign tasks",

            icon: <FaTasks size={22} />,

            color: "bg-green-600",

            path: "/tasks",

        },

        {

            title: "Members",

            description: "Manage project members",

            icon: <FaUsers size={22} />,

            color: "bg-purple-600",

            path: "/teams",

        },

        {

            title: "Projects",

            description: "View all projects",

            icon: <FaChartLine size={22} />,

            color: "bg-orange-500",

            path: "/projects",

        },

    ];


    return (

        <Card title="Quick Actions">

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {actions.map((action) => (

                    <button

                        key={action.title}

                        type="button"

                        onClick={() => navigate(action.path)}

                        className="
                            group
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-5
                            text-left
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-blue-200
                            hover:shadow-lg
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                            dark:border-gray-700
                            dark:bg-gray-900
                            dark:hover:border-blue-800
                        "

                    >

                        <div

                            className={`
                                ${action.color}
                                mb-4
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                text-white
                                shadow-sm
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            `}

                        >

                            {action.icon}

                        </div>


                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">

                            {action.title}

                        </h3>


                        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">

                            {action.description}

                        </p>

                    </button>

                ))}

            </div>

        </Card>

    );

}