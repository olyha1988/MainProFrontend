import {

    createAsyncThunk,

    createSlice,

} from "@reduxjs/toolkit";

import activityService from "@/services/activityService";


/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    activities: [],

    pagination: {

        page: 1,

        limit: 20,

        total: 0,

        totalPages: 0,

    },

    filters: {

        page: 1,

        limit: 20,

        action: "",

        entityType: "",

        project: "",

        task: "",

        user: "",

    },

    loading: false,

    error: null,

};


/*
|--------------------------------------------------------------------------
| Fetch Activities
|--------------------------------------------------------------------------
*/

export const fetchActivities = createAsyncThunk(

    "activities/fetchActivities",

    async (

        params = {},

        thunkAPI

    ) => {

        try {

            return await activityService.getActivities(

                params

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message ||

                "Failed to fetch activities"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Activity Slice
|--------------------------------------------------------------------------
*/

const activitySlice = createSlice({

    name: "activities",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Set Activity Filters
        |--------------------------------------------------------------------------
        */

        setActivityFilters: (

            state,

            action

        ) => {

            state.filters = {

                ...state.filters,

                ...action.payload,

            };

        },


        /*
        |--------------------------------------------------------------------------
        | Set Activity Page
        |--------------------------------------------------------------------------
        */

        setActivityPage: (

            state,

            action

        ) => {

            state.filters.page =

                action.payload;

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Activity Filters
        |--------------------------------------------------------------------------
        */

        clearActivityFilters: (

            state

        ) => {

            state.filters = {

                ...initialState.filters,

            };

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Activity Error
        |--------------------------------------------------------------------------
        */

        clearActivityError: (

            state

        ) => {

            state.error = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Reset Activities
        |--------------------------------------------------------------------------
        */

        resetActivities: () => {

            return initialState;

        },

    },


    extraReducers: (

        builder

    ) => {

        builder

            /*
            |--------------------------------------------------------------------------
            | Fetch Activities
            |--------------------------------------------------------------------------
            */

            .addCase(

                fetchActivities.pending,

                (state) => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchActivities.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error = null;


                    const data =

                        action.payload?.data || {};


                    state.activities =

                        data.activities || [];


                    state.pagination = {

                        ...state.pagination,

                        ...data.pagination,

                    };

                }

            )

            .addCase(

                fetchActivities.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =

                        action.payload;

                }

            );

    },

});


/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

export const {

    setActivityFilters,

    setActivityPage,

    clearActivityFilters,

    clearActivityError,

    resetActivities,

} = activitySlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectActivities = (

    state

) =>

    state.activities.activities;


export const selectActivityPagination = (

    state

) =>

    state.activities.pagination;


export const selectActivityFilters = (

    state

) =>

    state.activities.filters;


export const selectActivityLoading = (

    state

) =>

    state.activities.loading;


export const selectActivityError = (

    state

) =>

    state.activities.error;


export default activitySlice.reducer;