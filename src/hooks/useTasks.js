import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchTasks,

    fetchTask,

    createTask,

    updateTask,

    deleteTask,

    uploadTaskAttachment,

    deleteTaskAttachment,

    clearTask,

    clearTaskError,

    resetTasks,

    selectTasks,

    selectTask,

    selectTaskLoading,

    selectAttachmentLoading,

    selectTaskError,

    selectTaskPagination,

} from "@/redux/slices/taskSlice";


export default function useTasks() {

    /*
    |--------------------------------------------------------------------------
    | Redux
    |--------------------------------------------------------------------------
    */

    const dispatch =
        useDispatch();


    const tasks =
        useSelector(

            selectTasks

        );


    const task =
        useSelector(

            selectTask

        );


    const loading =
        useSelector(

            selectTaskLoading

        );


    const attachmentLoading =
        useSelector(

            selectAttachmentLoading

        );


    const error =
        useSelector(

            selectTaskError

        );


    const pagination =
        useSelector(

            selectTaskPagination

        );


    /*
    |--------------------------------------------------------------------------
    | Fetch Tasks
    |--------------------------------------------------------------------------
    */

    const getTasks = (

        params = {}

    ) => {

        return dispatch(

            fetchTasks(

                params

            )

        ).unwrap();

    };


    /*
    |--------------------------------------------------------------------------
    | Fetch Single Task
    |--------------------------------------------------------------------------
    */

    const getTask = (

        taskId

    ) => {

        return dispatch(

            fetchTask(

                taskId

            )

        ).unwrap();

    };


    /*
    |--------------------------------------------------------------------------
    | Create Task
    |--------------------------------------------------------------------------
    */

    const addTask = (

        taskData

    ) => {

        return dispatch(

            createTask(

                taskData

            )

        ).unwrap();

    };


    /*
    |--------------------------------------------------------------------------
    | Update Task
    |--------------------------------------------------------------------------
    */

    const editTask = (

        taskId,

        taskData

    ) => {

        return dispatch(

            updateTask({

                taskId,

                taskData,

            })

        ).unwrap();

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Task
    |--------------------------------------------------------------------------
    */

    const removeTask = (

        taskId

    ) => {

        return dispatch(

            deleteTask(

                taskId

            )

        ).unwrap();

    };


    /*
    |--------------------------------------------------------------------------
    | Upload Task Attachment
    |--------------------------------------------------------------------------
    */

    const uploadAttachment = (

        taskId,

        file

    ) => {

        return dispatch(

            uploadTaskAttachment({

                taskId,

                file,

            })

        ).unwrap();

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Task Attachment
    |--------------------------------------------------------------------------
    */

    const deleteAttachment = (

        taskId,

        attachmentId

    ) => {

        return dispatch(

            deleteTaskAttachment({

                taskId,

                attachmentId,

            })

        ).unwrap();

    };


    /*
    |--------------------------------------------------------------------------
    | Clear Selected Task
    |--------------------------------------------------------------------------
    */

    const clearSelectedTask = () => {

        dispatch(

            clearTask()

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Clear Error
    |--------------------------------------------------------------------------
    */

    const clearError = () => {

        dispatch(

            clearTaskError()

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Reset Tasks
    |--------------------------------------------------------------------------
    */

    const resetTaskState = () => {

        dispatch(

            resetTasks()

        );

    };


    return {

        tasks,

        task,

        pagination,

        loading,

        attachmentLoading,

        error,

        getTasks,

        getTask,

        addTask,

        editTask,

        removeTask,

        uploadAttachment,

        deleteAttachment,

        clearSelectedTask,

        clearError,

        resetTaskState,

    };

}