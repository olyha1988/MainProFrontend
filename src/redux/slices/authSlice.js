import {

    createAsyncThunk,

    createSlice,

} from "@reduxjs/toolkit";

import authService from "@/services/authService";

import {

    resetProjects,

} from "./projectSlice";

import {

    resetDashboard,

} from "./dashboardSlice";


/*
|--------------------------------------------------------------------------
| Local User
|--------------------------------------------------------------------------
*/

const storedUser =

    localStorage.getItem("user");


const user = storedUser

    ? JSON.parse(storedUser)

    : null;


const initialState = {

    user,

    loading: false,

    error: null,

};


/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const register = createAsyncThunk(

    "auth/register",

    async (

        userData,

        thunkAPI

    ) => {

        try {

            return await authService.register(

                userData

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const login = createAsyncThunk(

    "auth/login",

    async (

        userData,

        thunkAPI

    ) => {

        try {

            return await authService.login(

                userData

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Fetch Profile
|--------------------------------------------------------------------------
*/

export const fetchProfile = createAsyncThunk(

    "auth/fetchProfile",

    async (

        _,

        thunkAPI

    ) => {

        try {

            return await authService.getProfile();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logoutUser = createAsyncThunk(

    "auth/logoutUser",

    async (

        _,

        thunkAPI

    ) => {

        try {

            authService.logout();


            thunkAPI.dispatch(

                resetProjects()

            );


            thunkAPI.dispatch(

                resetDashboard()

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.message

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Auth Slice
|--------------------------------------------------------------------------
*/

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Synchronous Logout
        |--------------------------------------------------------------------------
        */

        logout: (state) => {

            state.user = null;

            state.loading = false;

            state.error = null;


            authService.logout();

        },


        /*
        |--------------------------------------------------------------------------
        | Update User Locally
        |--------------------------------------------------------------------------
        */

        updateAuthUser: (

            state,

            action

        ) => {

            state.user = {

                ...state.user,

                ...action.payload,

            };


            localStorage.setItem(

                "user",

                JSON.stringify(

                    state.user

                )

            );

        },


        /*
        |--------------------------------------------------------------------------
        | Reset Auth Error
        |--------------------------------------------------------------------------
        */

        clearAuthError: (

            state

        ) => {

            state.error = null;

        },

    },


    extraReducers: (

        builder

    ) => {

        builder

            /*
            |--------------------------------------------------------------------------
            | Login
            |--------------------------------------------------------------------------
            */

            .addCase(

                login.pending,

                (state) => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                login.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error = null;


                    const loggedInUser =

                        action.payload?.data?.user ||

                        action.payload?.data ||

                        action.payload;


                    state.user = loggedInUser;


                    localStorage.setItem(

                        "user",

                        JSON.stringify(

                            loggedInUser

                        )

                    );

                }

            )

            .addCase(

                login.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =

                        action.payload;

                }

            )


            /*
            |--------------------------------------------------------------------------
            | Register
            |--------------------------------------------------------------------------
            */

            .addCase(

                register.pending,

                (state) => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                register.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error = null;


                    const registeredUser =

                        action.payload?.data?.user ||

                        action.payload?.data ||

                        action.payload;


                    state.user = registeredUser;


                    localStorage.setItem(

                        "user",

                        JSON.stringify(

                            registeredUser

                        )

                    );

                }

            )

            .addCase(

                register.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =

                        action.payload;

                }

            )


            /*
            |--------------------------------------------------------------------------
            | Fetch Profile
            |--------------------------------------------------------------------------
            */

            .addCase(

                fetchProfile.pending,

                (state) => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchProfile.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error = null;


                    const profileUser =

                        action.payload?.data?.user ||

                        action.payload?.data ||

                        action.payload;


                    state.user = {

                        ...state.user,

                        ...profileUser,

                    };


                    localStorage.setItem(

                        "user",

                        JSON.stringify(

                            state.user

                        )

                    );

                }

            )

            .addCase(

                fetchProfile.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =

                        action.payload;

                }

            )


            /*
            |--------------------------------------------------------------------------
            | Logout
            |--------------------------------------------------------------------------
            */

            .addCase(

                logoutUser.fulfilled,

                (state) => {

                    state.user = null;

                    state.loading = false;

                    state.error = null;

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

    logout,

    updateAuthUser,

    clearAuthError,

} = authSlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectCurrentUser = (

    state

) =>

    state.auth.user;


export const selectAuthLoading = (

    state

) =>

    state.auth.loading;


export const selectAuthError = (

    state

) =>

    state.auth.error;


export default authSlice.reducer;