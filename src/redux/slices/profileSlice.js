import {

    createSlice,

    createAsyncThunk,

} from "@reduxjs/toolkit";

import profileService from "@/services/profileService";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    profile: null,

    loading: false,

    avatarUploading: false,

    avatarRemoving: false,

    error: null,

    success: null,

};

/*
|--------------------------------------------------------------------------
| Fetch Profile
|--------------------------------------------------------------------------
*/

export const fetchProfile = createAsyncThunk(

    "profile/fetchProfile",

    async (_, thunkAPI) => {

        try {

            return await profileService.getProfile();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch profile"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

export const updateProfile = createAsyncThunk(

    "profile/updateProfile",

    async (profileData, thunkAPI) => {

        try {

            return await profileService.updateProfile(

                profileData

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to update profile"

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

export const changePassword = createAsyncThunk(

    "profile/changePassword",

    async (passwordData, thunkAPI) => {

        try {

            return await profileService.changePassword(

                passwordData

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to change password"

            );

        }

    }

);



/*
|--------------------------------------------------------------------------
| Upload Avatar
|--------------------------------------------------------------------------
*/

export const uploadAvatar = createAsyncThunk(

    "profile/uploadAvatar",

    async (

        {

            file,

            onUploadProgress,

        },

        thunkAPI

    ) => {

        try {

            return await profileService.uploadProfileAvatar(

                file,

                onUploadProgress

            );

        } catch (error) {

            return thunkAPI.rejectWithValue(

                getErrorMessage(

                    error

                )

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Remove Avatar
|--------------------------------------------------------------------------
*/

export const removeAvatar = createAsyncThunk(

    "profile/removeAvatar",

    async (

        _,

        thunkAPI

    ) => {

        try {

            return await profileService.removeProfileAvatar();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                getErrorMessage(

                    error

                )

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Profile Slice
|--------------------------------------------------------------------------
*/

const profileSlice = createSlice({

    name: "profile",

    initialState,

    reducers: {

        clearProfileSuccess(state) {

            state.success = null;

        },

        clearProfileError(state) {

            state.error = null;

        },

        clearProfile(state) {

            state.profile = null;

            state.loading = false;

            state.error = null;

            state.success = null;

        },

    },

    extraReducers: (builder) => {

        /*
        |--------------------------------------------------------------------------
        | Fetch Profile
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            fetchProfile.fulfilled,

            (state, action) => {

                state.profile = action.payload.data;

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Update Profile
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            updateProfile.fulfilled,

            (state, action) => {

                state.profile = action.payload.data;

                state.success = action.payload.message;

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Change Password
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            changePassword.fulfilled,

            (state, action) => {

                state.success = action.payload.message;

            }

        );


        /*
|--------------------------------------------------------------------------
| Upload Avatar
|--------------------------------------------------------------------------
*/

builder

    .addCase(

        uploadAvatar.pending,

        (state) => {

            state.avatarUploading = true;

            state.error = null;

            state.success = null;

        }

    )

    .addCase(

        uploadAvatar.fulfilled,

        (

            state,

            action

        ) => {

            state.avatarUploading = false;

            state.success =

                action.payload.message ||

                "Avatar uploaded successfully";


            if (state.profile) {

                state.profile.avatar =

                    action.payload.data.avatar;

            }

        }

    )

    .addCase(

        uploadAvatar.rejected,

        (

            state,

            action

        ) => {

            state.avatarUploading = false;

            state.error =

                action.payload ||

                "Failed to upload avatar";

        }

    );


/*
|--------------------------------------------------------------------------
| Remove Avatar
|--------------------------------------------------------------------------
*/

builder

    .addCase(

        removeAvatar.pending,

        (state) => {

            state.avatarRemoving = true;

            state.error = null;

            state.success = null;

        }

    )

    .addCase(

        removeAvatar.fulfilled,

        (

            state,

            action

        ) => {

            state.avatarRemoving = false;

            state.success =

                action.payload.message ||

                "Avatar removed successfully";


            if (state.profile) {

                state.profile.avatar =

                    action.payload.data.avatar;

            }

        }

    )

    .addCase(

        removeAvatar.rejected,

        (

            state,

            action

        ) => {

            state.avatarRemoving = false;

            state.error =

                action.payload ||

                "Failed to remove avatar";

        }

    );

        /*
        |--------------------------------------------------------------------------
        | Pending Matcher
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            action =>

                action.type.startsWith("profile/") &&

                action.type.endsWith("/pending"),

            state => {

                state.loading = true;

                state.error = null;

                state.success = null;

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Fulfilled Matcher
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            action =>

                action.type.startsWith("profile/") &&

                action.type.endsWith("/fulfilled"),

            state => {

                state.loading = false;

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Rejected Matcher
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            action =>

                action.type.startsWith("profile/") &&

                action.type.endsWith("/rejected"),

            (state, action) => {

                state.loading = false;

                state.error = action.payload;

            }

        );

    },

});

export const {

    clearProfileSuccess,

    clearProfileError,

    clearProfile,

} = profileSlice.actions;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectProfile = state =>

    state.profile.profile;

    export const selectAvatarUploading = (

    state

) => state.profile.avatarUploading;


export const selectAvatarRemoving = (

    state

) => state.profile.avatarRemoving;

export const selectProfileLoading = state =>

    state.profile.loading;

export const selectProfileError = state =>

    state.profile.error;

export const selectProfileSuccess = state =>

    state.profile.success;

export default profileSlice.reducer;