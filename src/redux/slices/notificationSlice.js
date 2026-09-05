import {

    createSlice,

    nanoid,

} from "@reduxjs/toolkit";


const initialState = {

    notifications: [],

    unreadCount: 0,

};


/*
|--------------------------------------------------------------------------
| Notification Slice
|--------------------------------------------------------------------------
*/

const notificationSlice = createSlice({

    name: "notifications",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Add Notification
        |--------------------------------------------------------------------------
        */

        addNotification: {

            reducer: (

                state,

                action

            ) => {

                state.notifications.unshift(

                    action.payload

                );


                if (

                    !action.payload.read

                ) {

                    state.unreadCount += 1;

                }

            },


            prepare: (notification) => ({

                payload: {

                    id:

                        notification.id ||

                        nanoid(),

                    title:

                        notification.title ||

                        "Notification",

                    message:

                        notification.message ||

                        "",

                    type:

                        notification.type ||

                        "info",

                    read: false,

                    createdAt:

                        notification.createdAt ||

                        new Date().toISOString(),

                    entityType:

                        notification.entityType ||

                        null,

                    entityId:

                        notification.entityId ||

                        null,

                },

            }),

        },


        /*
        |--------------------------------------------------------------------------
        | Mark Notification As Read
        |--------------------------------------------------------------------------
        */

        markNotificationAsRead: (

            state,

            action

        ) => {

            const notification =

                state.notifications.find(

                    (item) =>

                        item.id ===

                        action.payload

                );


            if (

                notification &&

                !notification.read

            ) {

                notification.read = true;

                state.unreadCount = Math.max(

                    0,

                    state.unreadCount - 1

                );

            }

        },


        /*
        |--------------------------------------------------------------------------
        | Mark All As Read
        |--------------------------------------------------------------------------
        */

        markAllNotificationsAsRead: (

            state

        ) => {

            state.notifications.forEach(

                (notification) => {

                    notification.read = true;

                }

            );


            state.unreadCount = 0;

        },


        /*
        |--------------------------------------------------------------------------
        | Delete Notification
        |--------------------------------------------------------------------------
        */

        deleteNotification: (

            state,

            action

        ) => {

            const notification =

                state.notifications.find(

                    (item) =>

                        item.id ===

                        action.payload

                );


            if (

                notification &&

                !notification.read

            ) {

                state.unreadCount = Math.max(

                    0,

                    state.unreadCount - 1

                );

            }


            state.notifications =

                state.notifications.filter(

                    (item) =>

                        item.id !==

                        action.payload

                );

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Notifications
        |--------------------------------------------------------------------------
        */

        clearNotifications: (

            state

        ) => {

            state.notifications = [];

            state.unreadCount = 0;

        },

    },

});


export const {

    addNotification,

    markNotificationAsRead,

    markAllNotificationsAsRead,

    deleteNotification,

    clearNotifications,

} = notificationSlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectNotifications = (

    state

) =>

    state.notifications.notifications;


export const selectUnreadNotificationCount = (

    state

) =>

    state.notifications.unreadCount;


export default notificationSlice.reducer;