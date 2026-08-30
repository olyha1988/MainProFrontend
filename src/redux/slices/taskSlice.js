import {

    createSlice,

    createAsyncThunk,

} from "@reduxjs/toolkit";

import taskService from "@/services/taskService";


/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    tasks: [],

    task: null,

    pagination: {

        page: 1,

        limit: 10,

        total: 0,

        totalPages: 0,

    },

    loading: false,

    attachmentLoading: false,

    error: null,

};


/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Fetch Tasks
|--------------------------------------------------------------------------
*/

export const fetchTasks = createAsyncThunk(

    "tasks/fetchTasks",

    async (

        params = {},

        thunkAPI

    ) => {

        try {

            const response =
                await taskService.getTasks(

                    params

                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch tasks"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Fetch Single Task
|--------------------------------------------------------------------------
*/

export const fetchTask = createAsyncThunk(

    "tasks/fetchTask",

    async (

        taskId,

        thunkAPI

    ) => {

        try {

            const response =
                await taskService.getTask(

                    taskId

                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch task"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Create Task
|--------------------------------------------------------------------------
*/

export const createTask = createAsyncThunk(

    "tasks/createTask",

    async (

        taskData,

        thunkAPI

    ) => {

        try {

            const response =
                await taskService.createTask(

                    taskData

                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to create task"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Update Task
|--------------------------------------------------------------------------
*/

export const updateTask = createAsyncThunk(

    "tasks/updateTask",

    async (

        {

            taskId,

            taskData,

        },

        thunkAPI

    ) => {

        try {

            const response =
                await taskService.updateTask(

                    taskId,

                    taskData

                );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to update task"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Delete Task
|--------------------------------------------------------------------------
*/

export const deleteTask = createAsyncThunk(

    "tasks/deleteTask",

    async (

        taskId,

        thunkAPI

    ) => {

        try {

            await taskService.deleteTask(

                taskId

            );

            return taskId;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to delete task"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Upload Task Attachment
|--------------------------------------------------------------------------
*/

export const uploadTaskAttachment = createAsyncThunk(

    "tasks/uploadTaskAttachment",

    async (

        {

            taskId,

            file,

        },

        thunkAPI

    ) => {

        try {

            const response =
                await taskService.uploadTaskAttachment(

                    taskId,

                    file

                );

            return {

                taskId,

                attachments:
                    response.data.attachments,

            };

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to upload attachment"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Delete Task Attachment
|--------------------------------------------------------------------------
*/

export const deleteTaskAttachment = createAsyncThunk(

    "tasks/deleteTaskAttachment",

    async (

        {

            taskId,

            attachmentId,

        },

        thunkAPI

    ) => {

        try {

            const response =
                await taskService.deleteTaskAttachment(

                    taskId,

                    attachmentId

                );

            return {

                taskId,

                attachments:
                    response.data.attachments,

            };

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to delete attachment"

            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const taskSlice = createSlice({

    name: "tasks",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Clear Selected Task
        |--------------------------------------------------------------------------
        */

        clearTask(state) {

            state.task = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Error
        |--------------------------------------------------------------------------
        */

        clearTaskError(state) {

            state.error = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Reset State
        |--------------------------------------------------------------------------
        */

        resetTasks(state) {

            Object.assign(

                state,

                initialState

            );

        },

    },

    extraReducers: (builder) => {

        /*
        |--------------------------------------------------------------------------
        | Fetch Tasks
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            fetchTasks.fulfilled,

            (

                state,

                action

            ) => {

                state.tasks =
                    action.payload.tasks;

                state.pagination =
                    action.payload.pagination;

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Fetch Single Task
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            fetchTask.fulfilled,

            (

                state,

                action

            ) => {

                state.task =
                    action.payload;

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Create Task
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            createTask.fulfilled,

            (

                state,

                action

            ) => {

                const task =
                    action.payload;

                state.task = task;

                state.tasks.unshift(

                    task

                );

                state.pagination.total += 1;

                state.pagination.totalPages =
                    Math.ceil(

                        state.pagination.total /
                        state.pagination.limit

                    );

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Update Task
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            updateTask.fulfilled,

            (

                state,

                action

            ) => {

                const updatedTask =
                    action.payload;

                state.task =
                    updatedTask;

                const index =
                    state.tasks.findIndex(

                        (task) =>

                            task._id ===
                            updatedTask._id

                    );

                if (index !== -1) {

                    state.tasks[index] =
                        updatedTask;

                }

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Delete Task
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            deleteTask.fulfilled,

            (

                state,

                action

            ) => {

                const deletedId =
                    action.payload;

                state.tasks =
                    state.tasks.filter(

                        (task) =>

                            task._id !==
                            deletedId

                    );

                if (

                    state.task?._id ===
                    deletedId

                ) {

                    state.task = null;

                }

                state.pagination.total =
                    Math.max(

                        0,

                        state.pagination.total - 1

                    );

                state.pagination.totalPages =
                    Math.max(

                        1,

                        Math.ceil(

                            state.pagination.total /
                            state.pagination.limit

                        )

                    );

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Upload Attachment Pending
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            uploadTaskAttachment.pending,

            (state) => {

                state.attachmentLoading = true;

                state.error = null;

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Upload Attachment Fulfilled
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            uploadTaskAttachment.fulfilled,

            (

                state,

                action

            ) => {

                const {

                    taskId,

                    attachments,

                } = action.payload;


                state.attachmentLoading = false;


                if (

                    state.task?._id ===
                    taskId

                ) {

                    state.task.attachments =
                        attachments;

                }


                const taskIndex =
                    state.tasks.findIndex(

                        (task) =>

                            task._id ===
                            taskId

                    );


                if (taskIndex !== -1) {

                    state.tasks[
                        taskIndex
                    ].attachments =
                        attachments;

                }

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Upload Attachment Rejected
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            uploadTaskAttachment.rejected,

            (

                state,

                action

            ) => {

                state.attachmentLoading = false;

                state.error =

                    action.payload ||

                    "Failed to upload attachment";

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Delete Attachment Pending
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            deleteTaskAttachment.pending,

            (state) => {

                state.attachmentLoading = true;

                state.error = null;

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Delete Attachment Fulfilled
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            deleteTaskAttachment.fulfilled,

            (

                state,

                action

            ) => {

                const {

                    taskId,

                    attachments,

                } = action.payload;


                state.attachmentLoading = false;


                if (

                    state.task?._id ===
                    taskId

                ) {

                    state.task.attachments =
                        attachments;

                }


                const taskIndex =
                    state.tasks.findIndex(

                        (task) =>

                            task._id ===
                            taskId

                    );


                if (taskIndex !== -1) {

                    state.tasks[
                        taskIndex
                    ].attachments =
                        attachments;

                }

            }

        );


        /*
        |--------------------------------------------------------------------------
        | Delete Attachment Rejected
        |--------------------------------------------------------------------------
        */

        builder.addCase(

            deleteTaskAttachment.rejected,

            (

                state,

                action

            ) => {

                state.attachmentLoading = false;

                state.error =

                    action.payload ||

                    "Failed to delete attachment";

            }

        );


        /*
        |--------------------------------------------------------------------------
        | General Pending
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            (action) =>

                action.type.startsWith(
                    "tasks/"
                ) &&

                action.type.endsWith(
                    "/pending"
                ) &&

                !action.type.includes(
                    "TaskAttachment"
                ),

            (state) => {

                state.loading = true;

                state.error = null;

            }

        );


        /*
        |--------------------------------------------------------------------------
        | General Rejected
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            (action) =>

                action.type.startsWith(
                    "tasks/"
                ) &&

                action.type.endsWith(
                    "/rejected"
                ) &&

                !action.type.includes(
                    "TaskAttachment"
                ),

            (

                state,

                action

            ) => {

                state.loading = false;

                state.error =

                    action.payload ||

                    "Something went wrong";

            }

        );


        /*
        |--------------------------------------------------------------------------
        | General Fulfilled
        |--------------------------------------------------------------------------
        */

        builder.addMatcher(

            (action) =>

                action.type.startsWith(
                    "tasks/"
                ) &&

                action.type.endsWith(
                    "/fulfilled"
                ) &&

                !action.type.includes(
                    "TaskAttachment"
                ),

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

    clearTask,

    clearTaskError,

    resetTasks,

} = taskSlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectTasks = (state) =>
    state.tasks.tasks;

export const selectTask = (state) =>
    state.tasks.task;

export const selectTaskLoading = (state) =>
    state.tasks.loading;

export const selectAttachmentLoading = (state) =>
    state.tasks.attachmentLoading;

export const selectTaskError = (state) =>
    state.tasks.error;

export const selectTaskPagination = (state) =>
    state.tasks.pagination;


/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default taskSlice.reducer;