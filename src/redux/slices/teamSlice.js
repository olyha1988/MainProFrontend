import {

    createSlice,

    createAsyncThunk,

} from "@reduxjs/toolkit";

import teamService from "@/services/teamService";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    members: [],

    member: null,

    projects: [],

    tasks: [],

    workload: {},

    pagination: {

        page: 1,

        limit: 10,

        total: 0,

        totalPages: 0,

    },

    loading: false,

    error: null,

};

/*
|--------------------------------------------------------------------------
| Team Members
|--------------------------------------------------------------------------
*/

export const fetchTeamMembers = createAsyncThunk(

    "team/fetchMembers",

    async (params = {}, thunkAPI) => {

        try {

            return await teamService.getTeamMembers(params);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch team members"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Member Profile
|--------------------------------------------------------------------------
*/

export const fetchMemberProfile = createAsyncThunk(

    "team/fetchMember",

    async (id, thunkAPI) => {

        try {

            return await teamService.getMemberProfile(id);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch member"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Member Projects
|--------------------------------------------------------------------------
*/

export const fetchMemberProjects = createAsyncThunk(

    "team/fetchProjects",

    async (id, thunkAPI) => {

        try {

            return await teamService.getMemberProjects(id);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch projects"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Member Tasks
|--------------------------------------------------------------------------
*/

export const fetchMemberTasks = createAsyncThunk(

    "team/fetchTasks",

    async (

        {

            memberId,

            params = {},

        },

        thunkAPI

    ) => {

        try {

            return await teamService.getMemberTasks(

                memberId,

                params

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch tasks"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Member Workload
|--------------------------------------------------------------------------
*/

export const fetchMemberWorkload = createAsyncThunk(

    "team/fetchWorkload",

    async (id, thunkAPI) => {

        try {

            return await teamService.getMemberWorkload(id);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch workload"

            );

        }

    }

);

const teamSlice = createSlice({

    name: "team",

    initialState,

    reducers: {

        clearMember(state) {

            state.member = null;

        },

    },

    extraReducers: (builder) => {

        builder.addCase(

            fetchTeamMembers.fulfilled,

            (state, action) => {

                state.members = action.payload.data.users;

                state.pagination = action.payload.data.pagination;

            }

        );

        builder.addCase(

            fetchMemberProfile.fulfilled,

            (state, action) => {

                state.member = action.payload.data;

            }

        );

        builder.addCase(

            fetchMemberProjects.fulfilled,

            (state, action) => {

                state.projects = action.payload.data;

            }

        );

        builder.addCase(

            fetchMemberTasks.fulfilled,

            (state, action) => {

                state.tasks =

                    action.payload.data.tasks;

            }

        );

        builder.addCase(

    fetchMemberWorkload.fulfilled,

    (state, action) => {

        console.log("Workload Payload:", action.payload);

        state.workload = action.payload.workload;

    }

);

        builder.addMatcher(

            action =>

                action.type.startsWith("team/") &&

                action.type.endsWith("/pending"),

            state => {

                state.loading = true;

                state.error = null;

            }

        );

        builder.addMatcher(

            action =>

                action.type.startsWith("team/") &&

                action.type.endsWith("/fulfilled"),

            state => {

                state.loading = false;

            }

        );

        builder.addMatcher(

            action =>

                action.type.startsWith("team/") &&

                action.type.endsWith("/rejected"),

            (state, action) => {

                state.loading = false;

                state.error = action.payload;

            }

        );

    },

});

export const {

    clearMember,

} = teamSlice.actions;

export const selectTeamMembers = state => state.team.members;

export const selectTeamMember = state => state.team.member;

export const selectTeamProjects = state => state.team.projects;

export const selectTeamTasks = state => state.team.tasks;

export const selectTeamWorkload = state => state.team.workload;

export const selectTeamPagination = state => state.team.pagination;

export const selectTeamLoading = state => state.team.loading;

export const selectTeamError = state => state.team.error;

export default teamSlice.reducer;