import {

    Bell,

    CheckCircle2,

    CircleAlert,

    Info,

    Trash2,

} from "lucide-react";


const notificationIcons = {

    success: CheckCircle2,

    error: CircleAlert,

    warning: CircleAlert,

    info: Info,

};


const formatNotificationDate = (

    date

) => {

    if (!date) {

        return "";

    }


    return new Date(

        date

    ).toLocaleString(

        "en-US",

        {

            month: "short",

            day: "numeric",

            hour: "numeric",

            minute: "2-digit",

        }

    );

};


export default function NotificationItem({

    notification,

    onRead,

    onDelete,

    onClick,

}) {

    const Icon =

        notificationIcons[

            notification.type

        ] || Bell;


    const handleClick = () => {

        if (

            !notification.read

        ) {

            onRead(

                notification.id

            );

        }


        if (

            typeof onClick === "function"

        ) {

            onClick(

                notification

            );

        }

    };


    return (

        <div

            role="button"

            tabIndex={0}

            onClick={handleClick}

            onKeyDown={(event) => {

                if (

                    event.key === "Enter" ||

                    event.key === " "

                ) {

                    event.preventDefault();

                    handleClick();

                }

            }}

            className={`group flex cursor-pointer gap-3 border-b border-gray-100 p-4 transition last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 ${
                notification.read

                    ? "bg-white dark:bg-gray-900"

                    : "bg-blue-50/70 dark:bg-blue-950/20"
            }`}

        >

            <div className="mt-1 shrink-0">

                <Icon

                    size={19}

                    className="text-blue-600"

                />

            </div>


            <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                        <p className="font-medium text-gray-900 dark:text-white">

                            {

                                notification.title

                            }

                        </p>


                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">

                            {

                                notification.message

                            }

                        </p>


                        <p className="mt-2 text-xs text-gray-400">

                            {

                                formatNotificationDate(

                                    notification.createdAt

                                )

                            }

                        </p>

                    </div>


                    <button

                        type="button"

                        onClick={(event) => {

                            event.stopPropagation();

                            onDelete(

                                notification.id

                            );

                        }}

                        className="rounded-lg p-1.5 text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-950/30"

                        aria-label="Delete notification"

                    >

                        <Trash2 size={16} />

                    </button>

                </div>

            </div>


            {

                !notification.read && (

                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />

                )

            }

        </div>

    );

}