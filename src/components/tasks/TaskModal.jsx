import {

    useEffect,

    useRef,

} from "react";

import {

    ClipboardList,

    LoaderCircle,

    X,

} from "lucide-react";

import {

    useDispatch,

    useSelector,

} from "react-redux";

import { toast } from "react-hot-toast";

import useTaskForm from "@/hooks/useTaskForm";

import useProjectMembers from "@/hooks/useProjectMembers";

 import useNotifications from "@/hooks/useNotifications";

import {

    createTask,

    updateTask,

} from "@/redux/slices/taskSlice";

import {

    selectProjects,

} from "@/redux/slices/projectSlice";


/*
|--------------------------------------------------------------------------
| Default Form Values
|--------------------------------------------------------------------------
*/

const DEFAULT_VALUES = {

    title: "",

    description: "",

    project: "",

    assignedTo: "",

    priority: "Medium",

    status: "Todo",

    dueDate: "",

};


/*
|--------------------------------------------------------------------------
| Get Error Message
|--------------------------------------------------------------------------
*/

const getErrorMessage = (

    error,

    fallbackMessage

) => {

    if (

        typeof error === "string"

    ) {

        return error;

    }


    return (

        error?.message ||

        error?.response?.data?.message ||

        fallbackMessage

    );

};


/*
|--------------------------------------------------------------------------
| Task Modal
|--------------------------------------------------------------------------
*/

export default function TaskModal({

    open,

    task,

    loading,

    onClose,

}) {

    const dispatch =

        useDispatch();


    const projects =

        useSelector(

            selectProjects

        ) || [];

    const previousProjectRef =

        useRef("");


    const assigneeHydratedRef =

        useRef(false);


    const {

         notify,

     } = useNotifications();


    /*
    |--------------------------------------------------------------------------
    | Task Form
    |--------------------------------------------------------------------------
    */

    const {

        register,

        handleSubmit,

        reset,

        watch,

        setValue,

        formState: {

            errors = {},

        },

    } = useTaskForm(task);


    const selectedProject =

        watch("project");


    const taskProjectId =

        task?.project?._id?.toString?.() ||

        task?.project?.toString?.() ||

        "";


    const taskAssignedToId =

        task?.assignedTo?._id?.toString?.() ||

        task?.assignedTo?.toString?.() ||

        "";


    /*
    |--------------------------------------------------------------------------
    | Project Members
    |--------------------------------------------------------------------------
    */

    const {

        members = [],

        loading: membersLoading,

        fetchMembers,

        clearMembers,

    } = useProjectMembers();


    /*
    |--------------------------------------------------------------------------
    | Reset Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            open

        ) {

            return;

        }


        reset(

            DEFAULT_VALUES

        );


        clearMembers?.();

    }, [

        open,

        reset,

        clearMembers,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Fetch Project Members
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            !open ||

            !selectedProject

        ) {

            clearMembers?.();

            return;

        }


        fetchMembers(

            selectedProject

        );

    }, [

        open,

        selectedProject,

        fetchMembers,

        clearMembers,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Reset Assignee Hydration
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        assigneeHydratedRef.current =

            false;

    }, [

        open,

        task?._id,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Restore Assigned User In Edit Mode
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            !open ||

            !task?._id ||

            membersLoading ||

            !selectedProject ||

            !taskAssignedToId ||

            assigneeHydratedRef.current

        ) {

            return;

        }


        if (

            String(

                selectedProject

            ) !==

            String(

                taskProjectId

            )

        ) {

            return;

        }


        const assignedMemberExists =

            members.some(

                (member) =>

                    String(

                        member?._id || ""

                    ) ===

                    String(

                        taskAssignedToId

                    )

            );


        if (

            !assignedMemberExists

        ) {

            return;

        }


        setValue(

            "assignedTo",

            taskAssignedToId,

            {

                shouldDirty: false,

                shouldTouch: false,

                shouldValidate: false,

            }

        );


        assigneeHydratedRef.current =

            true;

    }, [

        open,

        task?._id,

        taskProjectId,

        taskAssignedToId,

        selectedProject,

        members,

        membersLoading,

        setValue,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Clear Assigned User When Project Changes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) {

            previousProjectRef.current = "";

            assigneeHydratedRef.current = false;

            return;

        }


        if (

            !previousProjectRef.current

        ) {

            previousProjectRef.current =

                selectedProject || "";

            return;

        }


        if (

            previousProjectRef.current !==

            selectedProject

        ) {

            setValue(

                "assignedTo",

                ""

            );


            assigneeHydratedRef.current =

                true;


            previousProjectRef.current =

                selectedProject || "";

        }

    }, [

        open,

        selectedProject,

        setValue,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Close On Escape
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            !open

        ) {

            return undefined;

        }


        const handleEscape = (event) => {

            if (

                event.key === "Escape" &&

                !loading

            ) {

                onClose();

            }

        };


        document.addEventListener(

            "keydown",

            handleEscape

        );


        return () => {

            document.removeEventListener(

                "keydown",

                handleEscape

            );

        };

    }, [

        open,

        loading,

        onClose,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const onSubmit = async (data) => {

        const taskData = {

            ...data,

        };


        if (

            taskData.assignedTo === ""

        ) {

            delete taskData.assignedTo;

        }


        if (

            taskData.project === ""

        ) {

            delete taskData.project;

        }


        try {

            if (

                task?._id

            ) {

                const updatedTask =

                    await dispatch(

                        updateTask({

                            taskId: task._id,

                            taskData,

                        })

                    ).unwrap();


                 notify({

                   title: "Task Updated",

                   message: `${updatedTask?.title || data.title} was updated successfully.`,

                type: "success",

                entityType: "task",

                entityId:

                    updatedTask?._id ||

                   task._id,

                });

            }

            else {

                const createdTask =

                    await dispatch(

                        createTask(data)

                    ).unwrap();


                 notify({

                title: "Task Created",

                message: `${createdTask?.title || data.title} was created successfully.`,

                 type: "success",

                entityType: "task",

                entityId:

                createdTask?._id,

                 });

            }


            onClose();

        }

        catch (error) {

            toast.error(

                getErrorMessage(

                    error,

                    task

                        ? "Failed to update task."

                        : "Failed to create task."

                )

            );

        }

    };


    if (

        !open

    ) {

        return null;

    }


    const inputClassName = `

        w-full

        rounded-xl

        border

        border-gray-300

        bg-white

        px-4

        py-2.5

        text-sm

        text-gray-900

        outline-none

        transition

        placeholder:text-gray-400

        focus:border-blue-500

        focus:ring-2

        focus:ring-blue-500/20

        disabled:cursor-not-allowed

        disabled:bg-gray-100

        disabled:text-gray-500

        dark:border-gray-700

        dark:bg-gray-800

        dark:text-white

        dark:placeholder:text-gray-500

        dark:disabled:bg-gray-900

    `;


    const labelClassName =

        "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300";


    const errorClassName =

        "mt-1.5 min-h-5 text-sm text-red-500 dark:text-red-400";


    return (

        <div

            role="dialog"

            aria-modal="true"

            aria-labelledby="task-modal-title"

            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm"

            onMouseDown={(event) => {

                if (

                    event.target ===

                    event.currentTarget &&

                    !loading

                ) {

                    onClose();

                }

            }}

        >

            <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">

                {/*
                |--------------------------------------------------------------------------
                | Header
                |--------------------------------------------------------------------------
                */}

                <div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-800">

                    <div className="flex min-w-0 items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">

                            <ClipboardList

                                size={24}

                            />

                        </div>


                        <div className="min-w-0">

                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">

                                {

                                    task

                                        ? "Update Task"

                                        : "New Task"

                                }

                            </p>


                            <h2

                                id="task-modal-title"

                                className="mt-0.5 truncate text-xl font-semibold text-gray-900 dark:text-white"

                            >

                                {

                                    task

                                        ? "Edit Task"

                                        : "Create Task"

                                }

                            </h2>

                        </div>

                    </div>


                    <button

                        type="button"

                        onClick={onClose}

                        disabled={loading}

                        aria-label="Close task modal"

                        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"

                    >

                        <X

                            size={20}

                        />

                    </button>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Form
                |--------------------------------------------------------------------------
                */}

                <form

                    onSubmit={handleSubmit(

                        onSubmit

                    )}

                    className="flex min-h-0 flex-1 flex-col"

                >

                    <div className="flex-1 overflow-y-auto">

                        <div className="grid gap-x-5 gap-y-4 p-6 md:grid-cols-2">

                            {/*
                            |--------------------------------------------------------------------------
                            | Title
                            |--------------------------------------------------------------------------
                            */}

                            <div className="md:col-span-2">

                                <label

                                    htmlFor="task-title"

                                    className={labelClassName}

                                >

                                    Title

                                    <span className="ml-1 text-red-500">

                                        *

                                    </span>

                                </label>


                                <input

                                    id="task-title"

                                    type="text"

                                    placeholder="Enter task title"

                                    {...register(

                                        "title"

                                    )}

                                    className={inputClassName}

                                />


                                <p className={errorClassName}>

                                    {errors.title?.message}

                                </p>

                            </div>


                            {/*
                            |--------------------------------------------------------------------------
                            | Description
                            |--------------------------------------------------------------------------
                            */}

                            <div className="md:col-span-2">

                                <label

                                    htmlFor="task-description"

                                    className={labelClassName}

                                >

                                    Description

                                </label>


                                <textarea

                                    id="task-description"

                                    rows={4}

                                    placeholder="Describe the task requirements"

                                    {...register(

                                        "description"

                                    )}

                                    className={`${inputClassName} resize-none`}

                                />


                                <p className={errorClassName}>

                                    {errors.description?.message}

                                </p>

                            </div>


                            {/*
                            |--------------------------------------------------------------------------
                            | Project
                            |--------------------------------------------------------------------------
                            */}

                            <div>

                                <label

                                    htmlFor="task-project"

                                    className={labelClassName}

                                >

                                    Project

                                    <span className="ml-1 text-red-500">

                                        *

                                    </span>

                                </label>


                                <select

                                    id="task-project"

                                    {...register(

                                        "project"

                                    )}

                                    className={`${inputClassName} dark:[color-scheme:dark]`}

                                >

                                    <option value="">

                                        Select Project

                                    </option>


                                    {projects.map(

                                        (project) => (

                                            <option

                                                key={project._id}

                                                value={project._id}

                                            >

                                                {project.name}

                                            </option>

                                        )

                                    )}

                                </select>


                                <p className={errorClassName}>

                                    {errors.project?.message}

                                </p>

                            </div>


                            {/*
                            |--------------------------------------------------------------------------
                            | Assigned User
                            |--------------------------------------------------------------------------
                            */}

                            <div>

                                <label

                                    htmlFor="task-assigned-user"

                                    className={labelClassName}

                                >

                                    Assign To

                                </label>


                                <select

                                    id="task-assigned-user"

                                    {...register(

                                        "assignedTo"

                                    )}

                                    disabled={

                                        !selectedProject ||

                                        membersLoading

                                    }

                                    className={`${inputClassName} dark:[color-scheme:dark]`}

                                >

                                    <option value="">

                                        {

                                            membersLoading

                                                ? "Loading members..."

                                                : selectedProject

                                                    ? members.length

                                                        ? "Select Member"

                                                        : "No Members Available"

                                                    : "Select Project First"

                                        }

                                    </option>


                                    {members.map(

                                        (member) => (

                                            <option

                                                key={member._id}

                                                value={member._id}

                                            >

                                                {member.name}

                                            </option>

                                        )

                                    )}

                                </select>


                                <p className={errorClassName}>

                                    {errors.assignedTo?.message}

                                </p>

                            </div>


                            {/*
                            |--------------------------------------------------------------------------
                            | Priority
                            |--------------------------------------------------------------------------
                            */}

                            <div>

                                <label

                                    htmlFor="task-priority"

                                    className={labelClassName}

                                >

                                    Priority

                                </label>


                                <select

                                    id="task-priority"

                                    {...register(

                                        "priority"

                                    )}

                                    className={`${inputClassName} dark:[color-scheme:dark]`}

                                >

                                    <option value="Low">

                                        Low

                                    </option>

                                    <option value="Medium">

                                        Medium

                                    </option>

                                    <option value="High">

                                        High

                                    </option>

                                    <option value="Critical">

                                        Critical

                                    </option>

                                </select>


                                <p className={errorClassName}>

                                    {errors.priority?.message}

                                </p>

                            </div>


                            {/*
                            |--------------------------------------------------------------------------
                            | Status
                            |--------------------------------------------------------------------------
                            */}

                            <div>

                                <label

                                    htmlFor="task-status"

                                    className={labelClassName}

                                >

                                    Status

                                </label>


                                <select

                                    id="task-status"

                                    {...register(

                                        "status"

                                    )}

                                    className={`${inputClassName} dark:[color-scheme:dark]`}

                                >

                                    <option value="Todo">

                                        Todo

                                    </option>

                                    <option value="In Progress">

                                        In Progress

                                    </option>

                                    <option value="Review">

                                        Review

                                    </option>

                                    <option value="Done">

                                        Done

                                    </option>

                                </select>


                                <p className={errorClassName}>

                                    {errors.status?.message}

                                </p>

                            </div>


                            {/*
                            |--------------------------------------------------------------------------
                            | Due Date
                            |--------------------------------------------------------------------------
                            */}

                            <div className="md:col-span-2">

                                <label

                                    htmlFor="task-due-date"

                                    className={labelClassName}

                                >

                                    Due Date

                                </label>


                                <input

                                    id="task-due-date"

                                    type="date"

                                    {...register(

                                        "dueDate"

                                    )}

                                    className={`${inputClassName} dark:[color-scheme:dark]`}

                                />


                                <p className={errorClassName}>

                                    {errors.dueDate?.message}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/*
                    |--------------------------------------------------------------------------
                    | Footer
                    |--------------------------------------------------------------------------
                    */}

                    <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/80 sm:flex-row sm:justify-end">

                        <button

                            type="button"

                            onClick={onClose}

                            disabled={loading}

                            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"

                        >

                            Cancel

                        </button>


                        <button

                            type="submit"

                            disabled={loading}

                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"

                        >

                            {loading && (

                                <LoaderCircle

                                    className="h-4 w-4 animate-spin"

                                />

                            )}


                            {

                                loading

                                    ? "Saving..."

                                    : task

                                        ? "Update Task"

                                        : "Create Task"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

