import {

    Archive,

    CheckCircle2,

    Clock3,

    PlayCircle,

} from "lucide-react";


const STATUS_CONFIG = {

    Planning: {

        icon: Clock3,

        className:
            "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-300 dark:ring-yellow-500/30",

    },

    Active: {

        icon: PlayCircle,

        className:
            "bg-green-100 text-green-700 ring-1 ring-green-200 dark:bg-green-500/15 dark:text-green-300 dark:ring-green-500/30",

    },

    Completed: {

        icon: CheckCircle2,

        className:
            "bg-blue-100 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30",

    },

    Archived: {

        icon: Archive,

        className:
            "bg-gray-100 text-gray-700 ring-1 ring-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:ring-gray-600",

    },

};


const DEFAULT_STATUS = {

    icon: Clock3,

    className:
        "bg-gray-100 text-gray-700 ring-1 ring-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:ring-gray-600",

};


export default function ProjectStatusBadge({

    status,

}) {

    const {

        icon: StatusIcon,

        className,

    } =

        STATUS_CONFIG[status] ||

        DEFAULT_STATUS;


    return (

        <span

            className={`
                mt-2
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${className}
            `}

        >

            <StatusIcon

                size={12}

                aria-hidden="true"

            />

            {status || "Unknown"}

        </span>

    );

}