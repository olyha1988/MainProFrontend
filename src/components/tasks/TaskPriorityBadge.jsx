
import {

    AlertCircle,

    AlertTriangle,

    ArrowUp,

    ChevronDown,

} from "lucide-react";


const priorityConfig = {

    Low: {

        icon: ChevronDown,

        className:
            "bg-green-100 text-green-700 ring-1 ring-green-200 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-800",

    },

    Medium: {

        icon: AlertCircle,

        className:
            "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-yellow-800",

    },

    High: {

        icon: ArrowUp,

        className:
            "bg-orange-100 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:ring-orange-800",

    },

    Critical: {

        icon: AlertTriangle,

        className:
            "bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-800",

    },

};


const defaultConfig = {

    icon: AlertCircle,

    className:
        "bg-gray-100 text-gray-700 ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700",

};


export default function TaskPriorityBadge({

    priority = "Medium",

}) {

    const {

        icon: Icon,

        className,

    } =

        priorityConfig[priority] ||

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

            {priority}

        </span>

    );

}

