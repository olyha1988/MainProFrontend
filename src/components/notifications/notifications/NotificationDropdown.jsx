import {

    Bell,

    CheckCheck,

    Trash2,

} from "lucide-react";

import useNotifications from "@/hooks/useNotifications";

import NotificationItem from "./NotificationItem";


export default function NotificationDropdown({

    open,

    onClose,

    onNotificationClick,

}) {

    const {

        notifications,

        unreadCount,

        markAsRead,

        markAllAsRead,

        removeNotification,

        clearAll,

    } = useNotifications();


    if (!open) {

        return null;

    }


    return (

        <div className="absolute right-0 top-full z-50 mt-3 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">

                <div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">

                        Notifications

                    </h3>


                    <p className="text-xs text-gray-500">

                        {unreadCount} unread

                    </p>

                </div>


                {

                    unreadCount > 0 && (

                        <button

                            type="button"

                            onClick={markAllAsRead}

                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"

                        >

                            <CheckCheck size={15} />

                            Mark all read

                        </button>

                    )

                }

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Notification List
            |--------------------------------------------------------------------------
            */}

            <div className="max-h-[420px] overflow-y-auto">

                {

                    notifications.length > 0

                        ? notifications.map(

                            (notification) => (

                                <NotificationItem

                                    key={

                                        notification.id

                                    }

                                    notification={

                                        notification

                                    }

                                    onRead={

                                        markAsRead

                                    }

                                    onDelete={

                                        removeNotification

                                    }

                                    onClick={(item) => {

                                        if (

                                            typeof onNotificationClick ===

                                            "function"

                                        ) {

                                            onNotificationClick(

                                                item

                                            );

                                        }


                                        onClose();

                                    }}

                                />

                            )

                        )

                        : (

                            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">

                                <Bell

                                    size={35}

                                    className="text-gray-300"

                                />


                                <p className="mt-3 font-medium text-gray-700 dark:text-gray-300">

                                    No notifications

                                </p>


                                <p className="mt-1 text-sm text-gray-500">

                                    New notifications will appear here.

                                </p>

                            </div>

                        )

                }

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Footer
            |--------------------------------------------------------------------------
            */}

            {

                notifications.length > 0 && (

                    <div className="border-t border-gray-200 p-3 dark:border-gray-800">

                        <button

                            type="button"

                            onClick={clearAll}

                            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"

                        >

                            <Trash2 size={16} />

                            Clear all notifications

                        </button>

                    </div>

                )

            }

        </div>

    );

}