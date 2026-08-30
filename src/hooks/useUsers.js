import {

    useCallback,

} from "react";

import {

    useDispatch,

    useSelector,

} from "react-redux";


import {

    fetchUsers as fetchUsersAction,

    fetchUser as fetchUserAction,

    clearUser as clearUserAction,

    clearUserError as clearUserErrorAction,


    selectUsers,

    selectUser,

    selectUserPagination,

    selectUserLoading,

    selectUserError,

} from "@/redux/slices/userSlice";


export default function useUsers() {

    const dispatch = useDispatch();


    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const users = useSelector(

        selectUsers

    );


    const user = useSelector(

        selectUser

    );


    const pagination = useSelector(

        selectUserPagination

    );


    const loading = useSelector(

        selectUserLoading

    );


    const error = useSelector(

        selectUserError

    );


    /*
    |--------------------------------------------------------------------------
    | API Actions
    |--------------------------------------------------------------------------
    */

    const fetchUsers = useCallback(

        (params = {}) => {

            return dispatch(

                fetchUsersAction(params)

            );

        },

        [dispatch]

    );


    const fetchUser = useCallback(

        (userId) => {

            return dispatch(

                fetchUserAction(userId)

            );

        },

        [dispatch]

    );


    /*
    |--------------------------------------------------------------------------
    | Utility Actions
    |--------------------------------------------------------------------------
    */

    const clearUser = useCallback(

        () => {

            dispatch(

                clearUserAction()

            );

        },

        [dispatch]

    );


    const clearError = useCallback(

        () => {

            dispatch(

                clearUserErrorAction()

            );

        },

        [dispatch]

    );


    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {

        /*
        |--------------------------------------------------------------------------
        | State
        |--------------------------------------------------------------------------
        */

        users,

        user,

        pagination,

        loading,

        error,


        /*
        |--------------------------------------------------------------------------
        | API
        |--------------------------------------------------------------------------
        */

        fetchUsers,

        fetchUser,


        /*
        |--------------------------------------------------------------------------
        | Helpers
        |--------------------------------------------------------------------------
        */

        clearUser,

        clearError,

    };

}