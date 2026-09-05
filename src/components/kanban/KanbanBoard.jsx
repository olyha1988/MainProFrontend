import {

    useEffect,

    useMemo,

    useRef,

    useState,

} from "react";

import {

    DndContext,

    DragOverlay,

    PointerSensor,

    closestCorners,

    useSensor,

    useSensors,

} from "@dnd-kit/core";

import {

    restrictToWindowEdges,

} from "@dnd-kit/modifiers";

import {

    SortableContext,

    arrayMove,

    verticalListSortingStrategy,

} from "@dnd-kit/sortable";

import { toast } from "react-hot-toast";

import useTasks from "@/hooks/useTasks";

import { TASK_STATUS } from "@/constants/taskConstants";

import KanbanSkeleton from "./KanbanSkeleton";
import KanbanColumn from "./KanbanColumn";
import KanbanTaskCard from "./KanbanTaskCard";

import TaskModal from "@/components/tasks/TaskModal";
import DeleteTaskModal from "@/components/tasks/DeleteTaskModal";
import useNotifications from "@/hooks/useNotifications";
import TaskDetailsModal from "@/components/tasks/TaskDetailsModal";


export default function KanbanBoard({

    filters,

}) {

    const {

        tasks = [],

        loading,

        editTask,

    } = useTasks();

    const {

        notify,

    } = useNotifications();

    /*
    |--------------------------------------------------------------------------
    | Board State
    |--------------------------------------------------------------------------
    */

    const [

        board,

        setBoard,

    ] = useState({});


    const [

        activeTask,

        setActiveTask,

    ] = useState(null);


    const originalBoardRef =

        useRef(null);


    const originalStatusRef =

        useRef(null);

/*
|--------------------------------------------------------------------------
| Task Details Modal
|--------------------------------------------------------------------------
*/

const [

    selectedTask,

    setSelectedTask,

] = useState(null);


const [

    detailsModalOpen,

    setDetailsModalOpen,

] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Task Modal
    |--------------------------------------------------------------------------
    */
/*
|--------------------------------------------------------------------------
| Edit Task Modal
|--------------------------------------------------------------------------
*/

const [

    editingTask,

    setEditingTask,

] = useState(null);


const [

    taskModalOpen,

    setTaskModalOpen,

] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Delete Modal
    |--------------------------------------------------------------------------
    */

    const [

        taskToDelete,

        setTaskToDelete,

    ] = useState(null);


    const [

        deleteModalOpen,

        setDeleteModalOpen,

    ] = useState(false);


    const handleViewTask = (task) => {

    setSelectedTask(task);

    setDetailsModalOpen(true);

};


const closeDetailsModal = () => {

    setDetailsModalOpen(false);

    setSelectedTask(null);

};


const handleEditTask = (task) => {

    setEditingTask(task);

    setTaskModalOpen(true);

};


const closeTaskModal = () => {

    setTaskModalOpen(false);

    setEditingTask(null);

};


    const openTaskModal = (task) => {

        setSelectedTask(task);

        setTaskModalOpen(true);

    };




    /*
    |--------------------------------------------------------------------------
    | Sensors
    |--------------------------------------------------------------------------
    */

    const sensors = useSensors(

        useSensor(

            PointerSensor,

            {

                activationConstraint: {

                    distance: 5,

                },

            }

        )

    );


    /*
    |--------------------------------------------------------------------------
    | Filter Tasks
    |--------------------------------------------------------------------------
    */

    const filteredTasks = useMemo(() => {

        const searchValue =

            filters?.search
                ?.trim()
                ?.toLowerCase() || "";


        return tasks.filter((task) => {

            const taskTitle =

                task?.title
                    ?.toLowerCase() || "";


            if (

                searchValue &&

                !taskTitle.includes(searchValue)

            ) {

                return false;

            }


            if (

                filters?.project &&

                task?.project?._id !== filters.project

            ) {

                return false;

            }


            if (

                filters?.priority &&

                task?.priority !== filters.priority

            ) {

                return false;

            }


            if (

                filters?.assignedTo &&

                task?.assignedTo?._id !== filters.assignedTo

            ) {

                return false;

            }


            return true;

        });

    }, [

        tasks,

        filters,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Build Columns
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const groupedTasks = {};


        TASK_STATUS.forEach((status) => {

            groupedTasks[status] = [];

        });


        filteredTasks.forEach((task) => {

            if (groupedTasks[task?.status]) {

                groupedTasks[task.status].push(task);

            }

        });


        setBoard(groupedTasks);

    }, [

        filteredTasks,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    const getTasksByStatus = (status) => {

        return board?.[status] || [];

    };


 const findContainer = (
    id,
    currentBoard = board
) => {
    const targetId = String(id);

    // If the ID itself is a column
    if (
        TASK_STATUS.includes(targetId)
    ) {
        return targetId;
    }

    // Otherwise find which column contains the task
    for (const status of TASK_STATUS) {
        const columnTasks =
            currentBoard?.[status] || [];

        const taskExists =
            columnTasks.some(
                (task) =>
                    String(task._id) === targetId
            );

        if (taskExists) {
            return status;
        }
    }

    return null;
};


    const findTask = (

        taskId,

        currentBoard = board

    ) => {

        const status =

            findContainer(

                taskId,

                currentBoard

            );


        if (!status) {

            return null;

        }


        const task =

            currentBoard?.[status]?.find(

                (item) => item._id === taskId

            );


        if (!task) {

            return null;

        }


        return {

            task,

            status,

        };

    };


    /*
    |--------------------------------------------------------------------------
    | Drag Start
    |--------------------------------------------------------------------------
    */

const handleDragStart = ({
    active,
}) => {
    const activeId =
        String(active.id);

    const activeContainer =
        findContainer(activeId);

    if (!activeContainer) {
        return;
    }

    const task =
        board[activeContainer]?.find(
            (item) =>
                String(item._id) === activeId
        );

    if (!task) {
        return;
    }

    setActiveTask(task);

    originalStatusRef.current =
        activeContainer;

    originalBoardRef.current =
        structuredClone(board);
};


    /*
    |--------------------------------------------------------------------------
    | Drag Over
    |--------------------------------------------------------------------------
    */

    // const handleDragOver = ({

    //     active,

    //     over,

    // }) => {

    //     if (!over) {

    //         return;

    //     }


    //     const activeId =

    //         String(active.id);


    //     const overId =

    //         String(over.id);


    //     if (activeId === overId) {

    //         return;

    //     }


    //     setBoard((previousBoard) => {

    //         const activeContainer =

    //             findContainer(

    //                 activeId,

    //                 previousBoard

    //             );


    //         const overContainer =

    //             findContainer(

    //                 overId,

    //                 previousBoard

    //             );


    //         if (

    //             !activeContainer ||

    //             !overContainer

    //         ) {

    //             return previousBoard;

    //         }


    //         const activeItems =

    //             previousBoard[activeContainer] || [];


    //         const overItems =

    //             previousBoard[overContainer] || [];


    //         const activeIndex =

    //             activeItems.findIndex(

    //                 (task) => task._id === activeId

    //             );


    //         if (activeIndex === -1) {

    //             return previousBoard;

    //         }


    //         /*
    //         |--------------------------------------------------------------------------
    //         | Reorder Inside Same Column
    //         |--------------------------------------------------------------------------
    //         */

    //         if (

    //             activeContainer === overContainer

    //         ) {

    //             const overIndex =

    //                 overItems.findIndex(

    //                     (task) => task._id === overId

    //                 );


    //             if (

    //                 overIndex === -1 ||

    //                 activeIndex === overIndex

    //             ) {

    //                 return previousBoard;

    //             }


    //             return {

    //                 ...previousBoard,

    //                 [activeContainer]:

    //                     arrayMove(

    //                         activeItems,

    //                         activeIndex,

    //                         overIndex

    //                     ),

    //             };

    //         }


    //         /*
    //         |--------------------------------------------------------------------------
    //         | Move Between Columns
    //         |--------------------------------------------------------------------------
    //         */

    //         const activeTaskItem =

    //             activeItems[activeIndex];


    //         const updatedActiveItems =

    //             activeItems.filter(

    //                 (task) => task._id !== activeId

    //             );


    //         const overIndex =

    //             overItems.findIndex(

    //                 (task) => task._id === overId

    //             );


    //         const insertIndex =

    //             overIndex >= 0
    //                 ? overIndex
    //                 : overItems.length;


    //         const updatedOverItems =

    //             [...overItems];


    //         updatedOverItems.splice(

    //             insertIndex,

    //             0,

    //             {

    //                 ...activeTaskItem,

    //                 status: overContainer,

    //             }

    //         );


    //         return {

    //             ...previousBoard,

    //             [activeContainer]:

    //                 updatedActiveItems,

    //             [overContainer]:

    //                 updatedOverItems,

    //         };

    //     });

    // };


    /*
    |--------------------------------------------------------------------------
    | Drag End
    |--------------------------------------------------------------------------
    */

const handleDragEnd = async ({
    active,
    over,
}) => {
    setActiveTask(null);

    const activeId =
        String(active.id);


    /*
    |--------------------------------------------------------------------------
    | No Drop Target
    |--------------------------------------------------------------------------
    */

    if (!over) {
        if (
            originalBoardRef.current
        ) {
            setBoard(
                originalBoardRef.current
            );
        }

        originalBoardRef.current = null;
        originalStatusRef.current = null;

        return;
    }


    /*
    |--------------------------------------------------------------------------
    | Find Source Column
    |--------------------------------------------------------------------------
    */

    const sourceStatus =
        originalStatusRef.current;

    if (!sourceStatus) {
        return;
    }


    /*
    |--------------------------------------------------------------------------
    | Find Destination Column
    |--------------------------------------------------------------------------
    */

    const overId =
        String(over.id);

    let destinationStatus;


    // Dropped directly on a column
    if (
        TASK_STATUS.includes(overId)
    ) {
        destinationStatus =
            overId;
    } else {
        // Dropped on another task
        destinationStatus =
            findContainer(
                overId,
                board
            );
    }


    if (!destinationStatus) {
        if (
            originalBoardRef.current
        ) {
            setBoard(
                originalBoardRef.current
            );
        }

        originalBoardRef.current = null;
        originalStatusRef.current = null;

        return;
    }


    /*
    |--------------------------------------------------------------------------
    | Get Current Tasks
    |--------------------------------------------------------------------------
    */

    const sourceTasks =
        board[sourceStatus] || [];

    const destinationTasks =
        board[destinationStatus] || [];


    const activeIndex =
        sourceTasks.findIndex(
            (task) =>
                String(task._id) === activeId
        );


    if (activeIndex === -1) {
        return;
    }


    const activeTask =
        sourceTasks[activeIndex];


    /*
    |--------------------------------------------------------------------------
    | Same Column Reorder
    |--------------------------------------------------------------------------
    */

    if (
        sourceStatus ===
        destinationStatus
    ) {
        const overIndex =
            sourceTasks.findIndex(
                (task) =>
                    String(task._id) ===
                    overId
            );


        if (
            overIndex !== -1 &&
            activeIndex !== overIndex
        ) {
            setBoard({
                ...board,

                [sourceStatus]:
                    arrayMove(
                        sourceTasks,
                        activeIndex,
                        overIndex
                    ),
            });
        }


        originalBoardRef.current = null;
        originalStatusRef.current = null;

        return;
    }


    /*
    |--------------------------------------------------------------------------
    | Different Column
    |--------------------------------------------------------------------------
    */

    const newSourceTasks =
        sourceTasks.filter(
            (task) =>
                String(task._id) !== activeId
        );


    const overIndex =
        destinationTasks.findIndex(
            (task) =>
                String(task._id) ===
                overId
        );


    const insertIndex =
        overIndex >= 0
            ? overIndex
            : destinationTasks.length;


    const movedTask = {
        ...activeTask,
        status: destinationStatus,
    };


    const newDestinationTasks =
        [...destinationTasks];


    newDestinationTasks.splice(
        insertIndex,
        0,
        movedTask
    );


    /*
    |--------------------------------------------------------------------------
    | Update UI Immediately
    |--------------------------------------------------------------------------
    */

    setBoard({
        ...board,

        [sourceStatus]:
            newSourceTasks,

        [destinationStatus]:
            newDestinationTasks,
    });


    /*
    |--------------------------------------------------------------------------
    | Save To Backend
    |--------------------------------------------------------------------------
    */

    try {
        await editTask(
            activeId,
            {
                status:
                    destinationStatus,
            }
        );

        notify({
    title: "Task Moved",
    message: `${activeTask?.title || "Task"} was moved to ${destinationStatus} successfully.`,
    type: "success",
    entityType: "task",
    entityId: activeTask?._id || activeId,
});

    } catch (error) {

        console.error(
            "Failed to move task:",
            error
        );


        toast.error(
            error?.response?.data?.message ||
            "Failed to update task status."
        );


        /*
        | Rollback UI
        */

        if (
            originalBoardRef.current
        ) {
            setBoard(
                originalBoardRef.current
            );
        }

    } finally {

        originalBoardRef.current = null;
        originalStatusRef.current = null;

    }
};

    /*
    |--------------------------------------------------------------------------
    | Drag Cancel
    |--------------------------------------------------------------------------
    */

    const handleDragCancel = () => {

        setActiveTask(null);


        if (originalBoardRef.current) {

            setBoard(

                originalBoardRef.current

            );

        }


        originalBoardRef.current = null;

        originalStatusRef.current = null;

    };




    /*
    |--------------------------------------------------------------------------
    | Delete Task
    |--------------------------------------------------------------------------
    */

    const handleDelete = (task) => {

        setTaskToDelete(task);

        setDeleteModalOpen(true);

    };


    const closeDeleteModal = () => {

        setDeleteModalOpen(false);

        setTaskToDelete(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (

        loading &&

        !tasks.length

    ) {

        return <KanbanSkeleton />;

    }


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <>

            <DndContext

                sensors={sensors}

                collisionDetection={closestCorners}

                modifiers={[

                    restrictToWindowEdges,

                ]}

                onDragStart={handleDragStart}

               

                onDragEnd={handleDragEnd}

                onDragCancel={handleDragCancel}

            >

                <div
                    className="
                        grid
                        min-w-[1100px]
                        grid-cols-4
                        gap-5
                        xl:min-w-0
                    "
                >

                    {TASK_STATUS.map((status) => {

                        const columnTasks =

                            getTasksByStatus(status);


                        return (

                            <SortableContext

                                key={status}

                              

                                items={

                                    columnTasks.map(

                                        (task) => task._id

                                    )

                                }

                                strategy={

                                    verticalListSortingStrategy

                                }

                            >

                                <KanbanColumn

    status={status}

    tasks={board[status] || []}

    onView={handleViewTask}

    onEdit={handleEditTask}

    onDelete={handleDelete}

/>

                            </SortableContext>

                        );

                    })}

                </div>


                <DragOverlay>

                    {activeTask ? (

                        <div
                            className="
                                w-[280px]
                                cursor-grabbing
                                opacity-95
                            "
                        >

                            <KanbanTaskCard

                                task={activeTask}

                                overlay

                            />

                        </div>

                    ) : null}

                </DragOverlay>

            </DndContext>


<TaskDetailsModal

    open={detailsModalOpen}

    task={selectedTask}

    onClose={closeDetailsModal}

    onEdit={(task) => {

        closeDetailsModal();

        handleEditTask(task);

    }}

/>


<TaskModal

    open={taskModalOpen}

    task={editingTask}

    loading={loading}

    onClose={closeTaskModal}

/>



            <DeleteTaskModal

                open={deleteModalOpen}

                task={taskToDelete}

                onClose={closeDeleteModal}

            />

            

        </>

    );

}