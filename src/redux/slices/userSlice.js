import {

    createSlice,

    createAsyncThunk,

} from "@reduxjs/toolkit";


import userService from "@/services/userService";



/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {


    users: [],


    user: null,


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
| Fetch Users
|--------------------------------------------------------------------------
*/

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (params = {}, thunkAPI) => {
        try {
            const response = await userService.getUsers(params);

            return response;   // <-- NOT response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch users"
            );
        }
    }
);


/*
|--------------------------------------------------------------------------
| Fetch Single User
|--------------------------------------------------------------------------
*/

export const fetchUser = createAsyncThunk(

    "users/fetchUser",

    async(userId, thunkAPI)=>{


        try{


            const response =

                await userService.getUser(userId);



            return response.data;


        }

        catch(error){


            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch member"

            );


        }


    }

);



/*
|--------------------------------------------------------------------------
| Fetch Member Projects
|--------------------------------------------------------------------------
*/

export const fetchMemberProjects = createAsyncThunk(

    "users/fetchMemberProjects",

    async(userId, thunkAPI)=>{


        try{


            const response =

                await userService.getMemberProjects(userId);



            return response.data;


        }

        catch(error){


            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch projects"

            );


        }


    }

);



/*
|--------------------------------------------------------------------------
| Fetch Member Tasks
|--------------------------------------------------------------------------
*/

export const fetchMemberTasks = createAsyncThunk(

    "users/fetchMemberTasks",

    async(

        {

            userId,

            params = {},

        },

        thunkAPI

    )=>{


        try{


            const response =

                await userService.getMemberTasks(

                    userId,

                    params

                );



            return response.data;


        }

        catch(error){


            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch tasks"

            );


        }


    }

);



/*
|--------------------------------------------------------------------------
| Fetch Workload
|--------------------------------------------------------------------------
*/

export const fetchMemberWorkload = createAsyncThunk(

    "users/fetchMemberWorkload",

    async(userId, thunkAPI)=>{


        try{


            const response =

                await userService.getMemberWorkload(userId);



            return response.data;


        }

        catch(error){


            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch workload"

            );


        }


    }

);

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const userSlice = createSlice({

    name: "users",

    initialState,


    reducers: {


        /*
        |--------------------------------------------------------------------------
        | Clear Selected User
        |--------------------------------------------------------------------------
        */

        clearUser(state) {

            state.user = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Error
        |--------------------------------------------------------------------------
        */

        clearUserError(state) {

            state.error = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Reset Users
        |--------------------------------------------------------------------------
        */

        resetUsers(state) {

            Object.assign(

                state,

                initialState

            );

        },


    },


    extraReducers: (builder) => {


        /*
        |--------------------------------------------------------------------------
        | Fetch Users
        |--------------------------------------------------------------------------
        */

  builder.addCase(
    fetchUsers.fulfilled,
    (state, action) => {

        console.log("fetchUsers reducer fired");
        console.log(action.payload.data);

        state.users = action.payload.data;

        console.log("After assignment:", state.users);

        state.pagination = {
            page: 1,
            limit: state.users.length,
            total: state.users.length,
            totalPages: 1,
        };
    }
);

        /*
        |--------------------------------------------------------------------------
        | Fetch Single User
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            fetchUser.fulfilled,

            (state, action) => {


                state.user = action.payload;


            }

        );



        /*
        |--------------------------------------------------------------------------
        | Fetch Member Projects
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            fetchMemberProjects.fulfilled,

            (state, action) => {


                state.projects = action.payload;


            }

        );



        /*
        |--------------------------------------------------------------------------
        | Fetch Member Tasks
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            fetchMemberTasks.fulfilled,

            (state, action) => {


                /*
                Backend may return:

                {
                    tasks: [],
                    pagination:{}
                }

                */


                if(action.payload.tasks){


                    state.tasks =

                        action.payload.tasks;


                }

                else{


                    state.tasks =

                        action.payload;


                }


            }

        );



        /*
        |--------------------------------------------------------------------------
        | Fetch Member Workload
        |--------------------------------------------------------------------------
        */

      builder.addCase(
    fetchMemberWorkload.fulfilled,
    (state, action) => {

        state.workload = action.payload.workload;

    }
);



        /*
        |--------------------------------------------------------------------------
        | Pending Handler
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            (action) =>


                action.type.startsWith("users/") &&

                action.type.endsWith("/pending"),



            (state) => {


                state.loading = true;

                state.error = null;


            }

        );



        /*
        |--------------------------------------------------------------------------
        | Rejected Handler
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            (action) =>


                action.type.startsWith("users/") &&

                action.type.endsWith("/rejected"),



            (state, action) => {


                state.loading = false;


                state.error =

                    action.payload ||

                    "Something went wrong";


            }

        );



        /*
        |--------------------------------------------------------------------------
        | Fulfilled Handler
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            (action) =>


                action.type.startsWith("users/") &&

                action.type.endsWith("/fulfilled"),



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


    clearUser,

    clearUserError,

    resetUsers,


} = userSlice.actions;



/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectUsers = (state) =>

    state.users.users;



export const selectUser = (state) =>

    state.users.user;



export const selectUserProjects = (state) =>

    state.users.projects;



export const selectUserTasks = (state) =>

    state.users.tasks;



export const selectUserWorkload = (state) =>

    state.users.workload;



export const selectUserPagination = (state) =>

    state.users.pagination;



export const selectUserLoading = (state) =>

    state.users.loading;



export const selectUserError = (state) =>

    state.users.error;



/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default userSlice.reducer;