import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import projectService from "@/services/projectService";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    projects: [],

    project: null,

    projectMembers: [],

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
| Async Thunks
|--------------------------------------------------------------------------
*/

/**
 * Get All Projects
 */
export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async (params = {}, thunkAPI) => {
        try {

            const response =
                await projectService.getProjects(params);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch projects"
            );

        }
    }
);

/**
 * Get Single Project
 */
export const fetchProject = createAsyncThunk(
    "projects/fetchProject",
    async (projectId, thunkAPI) => {

        try {

            const response =
                await projectService.getProject(projectId);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch project"
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Fetch Project Members
|--------------------------------------------------------------------------
*/

export const fetchProjectMembers = createAsyncThunk(

    "projects/fetchProjectMembers",

    async (projectId, thunkAPI) => {

        try {

            const response =
                await projectService.getProjectMembers(
                    projectId
                );

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch members"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Add Project Members
|--------------------------------------------------------------------------
*/

export const addProjectMembers = createAsyncThunk(

    "projects/addProjectMembers",

    async (

        {

            projectId,

            members,

        },

        thunkAPI

    ) => {

        try {

            const response =
                await projectService.addProjectMembers(

                    projectId,

                    members

                );

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to add members"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Remove Project Member
|--------------------------------------------------------------------------
*/

export const removeProjectMember = createAsyncThunk(

    "projects/removeProjectMember",

    async (

        {

            projectId,

            userId,

        },

        thunkAPI

    ) => {

        try {

            const response =
                await projectService.removeProjectMember(

                    projectId,

                    userId

                );

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to remove member"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Create Project
|--------------------------------------------------------------------------
*/

export const createProject = createAsyncThunk(
    "projects/createProject",
    async (projectData, thunkAPI) => {
        try {

            const response =
                await projectService.createProject(
                    projectData
                );

            /*
            Refresh Project List
            */

            thunkAPI.dispatch(
                fetchProjects()
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to create project"
            );

        }
    }
);


/*
|--------------------------------------------------------------------------
| Update Project
|--------------------------------------------------------------------------
*/

export const updateProject = createAsyncThunk(
    "projects/updateProject",
    async (
        {
            projectId,
            projectData,
        },
        thunkAPI
    ) => {

        try {

            const response =
                await projectService.updateProject(
                    projectId,
                    projectData
                );

            /*
            Refresh Project List
            */

            thunkAPI.dispatch(
                fetchProjects()
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update project"
            );

        }

    }
);


/*
|--------------------------------------------------------------------------
| Delete Project
|--------------------------------------------------------------------------
*/

export const deleteProject = createAsyncThunk(
    "projects/deleteProject",
    async (
        projectId,
        thunkAPI
    ) => {

        try {

            const response =
                await projectService.deleteProject(
                    projectId
                );

            /*
            Refresh Project List
            */

            thunkAPI.dispatch(
                fetchProjects()
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete project"
            );

        }

    }
);


/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const projectSlice = createSlice({

    name: "projects",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Clear Selected Project
        |--------------------------------------------------------------------------
        */

       clearProject(state) {

    state.project = null;

    state.projectMembers = [];

},

        /*
        |--------------------------------------------------------------------------
        | Clear Errors
        |--------------------------------------------------------------------------
        */

        clearProjectError(state) {
            state.error = null;
        },

        /*
        |--------------------------------------------------------------------------
        | Reset Slice
        |--------------------------------------------------------------------------
        */

        resetProjects(state) {
            Object.assign(state, initialState);
        },

    },

   extraReducers: (builder) => {

    /*
    |--------------------------------------------------------------------------
    | Fetch Projects
    |--------------------------------------------------------------------------
    */

    builder.addCase(
        fetchProjects.fulfilled,
        (state, action) => {

            state.projects =
                action.payload.projects;

            state.pagination =
                action.payload.pagination;

        }
    );

    /*
    |--------------------------------------------------------------------------
    | Fetch Single Project
    |--------------------------------------------------------------------------
    */

    builder.addCase(
        fetchProject.fulfilled,
        (state, action) => {

            state.project =
                action.payload;

        }
    );

    /*
|--------------------------------------------------------------------------
| Fetch Project Members
|--------------------------------------------------------------------------
*/

builder.addCase(

    fetchProjectMembers.fulfilled,

    (state, action) => {

        state.projectMembers = action.payload;

    }

);

/*
|--------------------------------------------------------------------------
| Add Project Members
|--------------------------------------------------------------------------
*/

builder.addCase(

    addProjectMembers.fulfilled,

    (state, action) => {

        // Updated members returned from API
        state.projectMembers = action.payload;

        const { projectId } = action.meta.arg;

        // Update selected project
        if (
            state.project &&
            state.project._id === projectId
        ) {
            state.project.members = action.payload;
        }

        // Update project inside project list
        const project = state.projects.find(
            (p) => p._id === projectId
        );

        if (project) {
            project.members = action.payload;
        }

    }

);

/*
|--------------------------------------------------------------------------
| Remove Project Member
|--------------------------------------------------------------------------
*/

builder.addCase(

    removeProjectMember.fulfilled,

    (state, action) => {

        // Updated members returned from API
        state.projectMembers = action.payload;

        const { projectId } = action.meta.arg;

        // Update selected project
        if (
            state.project &&
            state.project._id === projectId
        ) {
            state.project.members = action.payload;
        }

        // Update project inside project list
        const project = state.projects.find(
            (p) => p._id === projectId
        );

        if (project) {
            project.members = action.payload;
        }

    }

);

    /*
    |--------------------------------------------------------------------------
    | Create Project
    |--------------------------------------------------------------------------
    */

    builder.addCase(
        createProject.fulfilled,
        (state, action) => {

            state.project =
                action.payload;

        }
    );

    /*
    |--------------------------------------------------------------------------
    | Update Project
    |--------------------------------------------------------------------------
    */

    builder.addCase(
        updateProject.fulfilled,
        (state, action) => {

            state.project =
                action.payload;

        }
    );

    /*
    |--------------------------------------------------------------------------
    | Delete Project
    |--------------------------------------------------------------------------
    */

    builder.addCase(
        deleteProject.fulfilled,
        (state) => {

            state.project = null;

        }
    );

    /*
    |--------------------------------------------------------------------------
    | Pending State
    |--------------------------------------------------------------------------
    */

    builder.addMatcher(

        (action) =>
            action.type.startsWith("projects/")
            && action.type.endsWith("/pending"),

        (state) => {

            state.loading = true;
            state.error = null;

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Rejected State
    |--------------------------------------------------------------------------
    */

    builder.addMatcher(

        (action) =>
            action.type.startsWith("projects/")
            && action.type.endsWith("/rejected"),

        (state, action) => {

            state.loading = false;

            state.error =
                action.payload ||
                "Something went wrong";

        }

    );

    /*
    |--------------------------------------------------------------------------
    | Fulfilled State
    |--------------------------------------------------------------------------
    */

    builder.addMatcher(

        (action) =>
            action.type.startsWith("projects/")
            && action.type.endsWith("/fulfilled"),

        (state) => {

            state.loading = false;

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

    clearProject,

    clearProjectError,

    resetProjects,

} = projectSlice.actions;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectProjects = (state) =>
    state.projects.projects;

export const selectProject = (state) =>
    state.projects.project;

export const selectProjectMembers = (state) =>
    state.projects.projectMembers;

export const selectProjectLoading = (state) =>
    state.projects.loading;

export const selectProjectError = (state) =>
    state.projects.error;

export const selectProjectPagination = (state) =>
    state.projects.pagination;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default projectSlice.reducer;