
import {

    CheckCircle2,

    Circle,

    Clock3,

    PauseCircle,

    ShieldAlert,

} from "lucide-react";


const statusConfig = {

    Todo: {

        icon: Circle,

        className:
            "bg-gray-100 text-gray-700 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",

    },

    "In Progress": {

        icon: Clock3,

        className:
            "bg-blue-100 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800",

    },

    Review: {

        icon: PauseCircle,

        className:
            "bg-purple-100 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:ring-purple-800",

    },

    Done: {

        icon: CheckCircle2,

        className:
            "bg-green-100 text-green-700 ring-1 ring-green-200 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-800",

    },

    Blocked: {

        icon: ShieldAlert,

        className:
            "bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-800",

    },

};


const defaultConfig = {

    icon: Circle,

    className:
        "bg-gray-100 text-gray-700 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",

};


export default function TaskStatusBadge({

    status = "Todo",

}) {

    const {

        icon: Icon,

        className,

    } =

        statusConfig[status] ||

        defaultConfig;


    return (

        <span

            className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-1.5
                text-xs
                font-semibold
                whitespace-nowrap
                transition-colors
                ${className}
            `}

        >

            <Icon

                size={13}

            />

            {status}

        </span>

    );

}

