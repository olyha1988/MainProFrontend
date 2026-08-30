
import {

    useCallback,

    useEffect,

    useMemo,

    useState,

} from "react";

import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchProjects,

    selectProjects,

} from "@/redux/slices/projectSlice";

import useTasks from "@/hooks/useTasks";

import useTaskFilters from "@/hooks/useTaskFilters";

import TaskHeader from "@/components/tasks/TaskHeader";

import TaskToolbar from "@/components/tasks/TaskToolbar";

import TaskGrid from "@/components/tasks/TaskGrid";

import TaskTable from "@/components/tasks/TaskTable";

import TaskSkeleton from "@/components/tasks/TaskSkeleton";

import EmptyTasks from "@/components/tasks/EmptyTasks";

import ErrorTasks from "@/components/tasks/ErrorTasks";

// import TaskModal from "@/components/tasks/TaskModal";

// import DeleteTaskModal from "@/components/tasks/DeleteTaskModal";

// import TaskDetailsModal from "@/components/tasks/TaskDetailsModal";


export default function Tasks() {

    const dispatch = useDispatch();


    const projects = useSelector(

        selectProjects

    );


    /*
    |--------------------------------------------------------------------------
    | Tasks
    |--------------------------------------------------------------------------
    */

    const {

        tasks,

        pagination,

        loading,

        error,

        getTasks,

    } = useTasks();


    /*
    |--------------------------------------------------------------------------
    | Fetch Tasks When Filters Change
    |--------------------------------------------------------------------------
    */

    const handleFiltersChange = useCallback(

        (filterValues) => {

            getTasks(

                filterValues

            );

        },

        [

            getTasks,

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const {

        filters,

        setFilters,

    } = useTaskFilters(

        handleFiltersChange

    );


    /*
    |--------------------------------------------------------------------------
    | UI State
    |--------------------------------------------------------------------------
    */

    const [

        view,

        setView,

    ] = useState("grid");


    const [

        selectedTask,

        setSelectedTask,

    ] = useState(null);


    const [

        showModal,

        setShowModal,

    ] = useState(false);


    const [

        deleteModal,

        setDeleteModal,

    ] = useState(false);


    const [

        detailsTaskId,

        setDetailsTaskId,

    ] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Selected Details Task
    |--------------------------------------------------------------------------
    */

    const detailsTask = useMemo(() => {

        if (!detailsTaskId) {

            return null;

        }


        return tasks.find(

            (task) =>

                task._id === detailsTaskId

        ) || null;

    }, [

        detailsTaskId,

        tasks,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Available Assignees
    |--------------------------------------------------------------------------
    */

    const users = useMemo(() => {

        const userMap = new Map();


        tasks.forEach((task) => {

            const assignedUser =

                task.assignedTo;


            if (

                assignedUser?._id

            ) {

                userMap.set(

                    assignedUser._id,

                    assignedUser

                );

            }

        });


        return [

            ...userMap.values(),

        ];

    }, [

        tasks,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Fetch Projects
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        dispatch(

            fetchProjects()

        );

    }, [

        dispatch,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Create Task
    |--------------------------------------------------------------------------
    */

    const handleCreate = () => {

        setSelectedTask(null);

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Edit Task
    |--------------------------------------------------------------------------
    */

    const handleEdit = (task) => {

        setDetailsTaskId(null);

        setSelectedTask(task);

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Task
    |--------------------------------------------------------------------------
    */

    const handleDelete = (task) => {

        setDetailsTaskId(null);

        setSelectedTask(task);

        setDeleteModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | View Task
    |--------------------------------------------------------------------------
    */

    const handleView = (task) => {

        setDetailsTaskId(

            task._id

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Retry Fetch
    |--------------------------------------------------------------------------
    */

    const handleRetry = () => {

        getTasks(

            filters

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Close Task Modal
    |--------------------------------------------------------------------------
    */

    const handleCloseTaskModal = () => {

        setShowModal(false);

        setSelectedTask(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Close Delete Modal
    |--------------------------------------------------------------------------
    */

    const handleCloseDeleteModal = () => {

        setDeleteModal(false);

        setSelectedTask(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Close Details Modal
    |--------------------------------------------------------------------------
    */

    const handleCloseDetailsModal = () => {

        setDetailsTaskId(null);

    };


    return (

        <div className="min-h-full space-y-6 text-slate-900 dark:text-slate-100">

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <TaskHeader

                onCreate={handleCreate}

            />


            {/*
            |--------------------------------------------------------------------------
            | Toolbar
            |--------------------------------------------------------------------------
            */}

            <TaskToolbar

                filters={filters}

                setFilters={setFilters}

                view={view}

                setView={setView}

                projects={projects}

                users={users}

            />


            {/*
            |--------------------------------------------------------------------------
            | Loading State
            |--------------------------------------------------------------------------
            */}

            {loading && (

                <TaskSkeleton />

            )}


            {/*
            |--------------------------------------------------------------------------
            | Error State
            |--------------------------------------------------------------------------
            */}

            {!loading && error && (

                <ErrorTasks

                    message={error}

                    retry={handleRetry}

                />

            )}


            {/*
            |--------------------------------------------------------------------------
            | Empty State
            |--------------------------------------------------------------------------
            */}

            {

                !loading &&

                !error &&

                tasks.length === 0 && (

                    <EmptyTasks

                        onCreate={handleCreate}

                    />

                )

            }


            {/*
            |--------------------------------------------------------------------------
            | Task Content
            |--------------------------------------------------------------------------
            */}

            {

                !loading &&

                !error &&

                tasks.length > 0 && (

                    view === "grid"

                        ? (

                            <TaskGrid

                                tasks={tasks}

                                onEdit={handleEdit}

                                onDelete={handleDelete}

                                onView={handleView}
                                pagination={pagination}

                                filters={filters}

                                setFilters={setFilters}
                            />

                        )

                        : (

                            <TaskTable

                                tasks={tasks}

                                pagination={pagination}

                                filters={filters}

                                setFilters={setFilters}

                                onEdit={handleEdit}

                                onDelete={handleDelete}

                                onView={handleView}

                            />

                        )

                )

            }


            {/*
            |--------------------------------------------------------------------------
            | Task Details Modal
            |--------------------------------------------------------------------------
            */}

            {/* <TaskDetailsModal

                open={Boolean(

                    detailsTaskId

                )}

                task={detailsTask}

                onClose={

                    handleCloseDetailsModal

                }

                onEdit={handleEdit}

            /> */}


            {/*
            |--------------------------------------------------------------------------
            | Create / Edit Task Modal
            |--------------------------------------------------------------------------
            */}

            {/* <TaskModal

                open={showModal}

                task={selectedTask}

                loading={loading}

                onClose={

                    handleCloseTaskModal

                }

            /> */}


            {/*
            |--------------------------------------------------------------------------
            | Delete Task Modal
            |--------------------------------------------------------------------------
            */}

            {/* <DeleteTaskModal

                open={deleteModal}

                task={selectedTask}

                loading={loading}

                onClose={

                    handleCloseDeleteModal

                }

            /> */}

        </div>

    );

}

