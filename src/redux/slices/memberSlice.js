import {

    createSlice,
    createAsyncThunk,

} from "@reduxjs/toolkit";

import memberService from "@/services/memberService";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    members: [],

    loading: false,

    error: null,

};

/*
|--------------------------------------------------------------------------
| Fetch Project Members
|--------------------------------------------------------------------------
*/

export const fetchProjectMembers = createAsyncThunk(

    "members/fetchProjectMembers",

    async (projectId, thunkAPI) => {

        try {

            const response =
                await memberService.getProjectMembers(
                    projectId
                );

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to load members"

            );

        }

    }

);

const memberSlice = createSlice({

    name: "members",

    initialState,

    reducers: {

        clearMembers(state) {

            state.members = [];

        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchProjectMembers.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchProjectMembers.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.members = action.payload;

                }
            )

            .addCase(
                fetchProjectMembers.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =

                        action.payload ||

                        "Unable to fetch members";

                }
            );

    },

});

export const {

    clearMembers,

} = memberSlice.actions;

export const selectMembers =

(state) => state.members.members;

export const selectMembersLoading =

(state) => state.members.loading;

export const selectMembersError =

(state) => state.members.error;

export default memberSlice.reducer;