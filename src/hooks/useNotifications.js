import {

    useCallback,

} from "react";

import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    toast,

} from "react-hot-toast";

import {

    addNotification,

    clearNotifications,

    deleteNotification,

    markAllNotificationsAsRead,

    markNotificationAsRead,

    selectNotifications,

    selectUnreadNotificationCount,

} from "@/redux/slices/notificationSlice";


export default function useNotifications() {

    const dispatch = useDispatch();


    const notifications = useSelector(

        selectNotifications

    );


    const unreadCount = useSelector(

        selectUnreadNotificationCount

    );


    /*
    |--------------------------------------------------------------------------
    | Notify
    |--------------------------------------------------------------------------
    */

    const notify = useCallback(

        ({

            title,

            message,

            type = "info",

            entityType = null,

            entityId = null,

        }) => {

            dispatch(

                addNotification({

                    title,

                    message,

                    type,

                    entityType,

                    entityId,

                })

            );


            const toastMessage =

                message || title;


            switch (type) {

                case "success":

                    toast.success(

                        toastMessage

                    );

                    break;


                case "error":

                    toast.error(

                        toastMessage

                    );

                    break;


                case "loading":

                    toast.loading(

                        toastMessage

                    );

                    break;


                default:

                    toast(

                        toastMessage

                    );

            }

        },

        [dispatch]

    );


    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    const markAsRead = useCallback(

        (notificationId) => {

            dispatch(

                markNotificationAsRead(

                    notificationId

                )

            );

        },

        [dispatch]

    );


    const markAllAsRead = useCallback(

        () => {

            dispatch(

                markAllNotificationsAsRead()

            );

        },

        [dispatch]

    );


    const removeNotification = useCallback(

        (notificationId) => {

            dispatch(

                deleteNotification(

                    notificationId

                )

            );

        },

        [dispatch]

    );


    const clearAll = useCallback(

        () => {

            dispatch(

                clearNotifications()

            );

        },

        [dispatch]

    );


    return {

        notifications,

        unreadCount,

        notify,

        markAsRead,

        markAllAsRead,

        removeNotification,

        clearAll,

    };

}