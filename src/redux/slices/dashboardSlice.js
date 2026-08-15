import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import dashboardService from "@/services/dashboardService";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    summary: {

        totalProjects: 0,

        activeProjects: 0,

        totalTasks: 0,

        completedTasks: 0,

        overdueTasks: 0,

        myTasks: 0,

    },

    statusChart: [],

    priorityChart: [],

    projectProgress: [],

    recentProjects: [],

    recentTasks: [],

    loading: false,

    error: null,

};

/*
|--------------------------------------------------------------------------
| Fetch Dashboard
|--------------------------------------------------------------------------
*/

export const fetchDashboard = createAsyncThunk(

    "dashboard/fetchDashboard",

    async (_, thunkAPI) => {

        try {

            return await dashboardService.getDashboard();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message ||

                "Failed to fetch dashboard"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const dashboardSlice = createSlice({

    name: "dashboard",

    initialState,

    reducers: {

        clearDashboardError(state) {

            state.error = null;

        },

        resetDashboard() {

            return initialState;

        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(fetchDashboard.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchDashboard.fulfilled, (state, action) => {

                state.loading = false;

                const data = action.payload.data;

                state.summary = data.summary;

                state.statusChart = data.statusChart;

                state.priorityChart = data.priorityChart;

                state.projectProgress = data.projectProgress;

                state.recentProjects = data.recentProjects;

                state.recentTasks = data.recentTasks;

            })

            .addCase(fetchDashboard.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export const {

    clearDashboardError,

    resetDashboard,

} = dashboardSlice.actions;

export default dashboardSlice.reducer;