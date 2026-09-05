import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchActivities,

    setActivityFilters,

    setActivityPage,

    clearActivityFilters,

    clearActivityError,

    resetActivities,

    selectActivities,

    selectActivityPagination,

    selectActivityFilters,

    selectActivityLoading,

    selectActivityError,

} from "@/redux/slices/activitySlice";


export default function useActivities() {

    const dispatch =

        useDispatch();


    const activities =

        useSelector(

            selectActivities

        );


    const pagination =

        useSelector(

            selectActivityPagination

        );


    const filters =

        useSelector(

            selectActivityFilters

        );


    const loading =

        useSelector(

            selectActivityLoading

        );


    const error =

        useSelector(

            selectActivityError

        );


    /*
    |--------------------------------------------------------------------------
    | Fetch All Activities
    |--------------------------------------------------------------------------
    */

    const getActivities = (

        params = {}

    ) => {

        return dispatch(

            fetchActivities(

                params

            )

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Fetch Activities Using Current Filters
    |--------------------------------------------------------------------------
    */

    const getFilteredActivities = (

        additionalFilters = {}

    ) => {

        return dispatch(

            fetchActivities({

                ...filters,

                ...additionalFilters,

            })

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Fetch Project Activities
    |--------------------------------------------------------------------------
    */

    const getProjectActivities = (

        projectId,

        params = {}

    ) => {

        return dispatch(

            fetchActivities({

                ...params,

                project:

                    projectId,

            })

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Fetch Task Activities
    |--------------------------------------------------------------------------
    */

    const getTaskActivities = (

        taskId,

        params = {}

    ) => {

        return dispatch(

            fetchActivities({

                ...params,

                task:

                    taskId,

            })

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Fetch Member Activities
    |--------------------------------------------------------------------------
    */

    const getMemberActivities = (

        userId,

        params = {}

    ) => {

        return dispatch(

            fetchActivities({

                ...params,

                user:

                    userId,

            })

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Update Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = (

        newFilters

    ) => {

        dispatch(

            setActivityFilters({

                ...newFilters,

                page:

                    newFilters.page || 1,

            })

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Update Page
    |--------------------------------------------------------------------------
    */

    const updatePage = (

        page

    ) => {

        dispatch(

            setActivityPage(

                page

            )

        );

    };


    return {

        activities,

        pagination,

        filters,

        loading,

        error,


        fetchActivities:

            getActivities,

        fetchFilteredActivities:

            getFilteredActivities,

        fetchProjectActivities:

            getProjectActivities,

        fetchTaskActivities:

            getTaskActivities,

        fetchMemberActivities:

            getMemberActivities,


        setActivityFilters:

            updateFilters,

        setActivityPage:

            updatePage,


        clearActivityFilters: () =>

            dispatch(

                clearActivityFilters()

            ),

        clearActivityError: () =>

            dispatch(

                clearActivityError()

            ),

        resetActivities: () =>

            dispatch(

                resetActivities()

            ),

    };

}