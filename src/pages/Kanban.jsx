import {

    useCallback,

    useEffect,

    useMemo,

    useState,

} from "react";

import {

    KanbanSquare,

    Plus,

} from "lucide-react";
import {

    useDispatch,

    useSelector,

} from "react-redux";


import {

    fetchProjects,

    selectProjects,

} from "@/redux/slices/projectSlice";


import PageHeader from "@/components/ui/PageHeader";

import KanbanHeader from "@/components/kanban/KanbanHeader";

import KanbanBoard from "@/components/kanban/KanbanBoard";

import TaskModal from "@/components/tasks/TaskModal";

import useTasks from "@/hooks/useTasks";


export default function Kanban() {

    const dispatch =

        useDispatch();


    const {

        tasks = [],

        loading,

        getTasks,

    } = useTasks();


    const projects =

        useSelector(

            selectProjects

        ) || [];


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const [

        filters,

        setFilters,

    ] = useState({

        search: "",

        project: "",

        assignedTo: "",

        priority: "",

    });


    /*
    |--------------------------------------------------------------------------
    | Create Task Modal
    |--------------------------------------------------------------------------
    */

    const [

        taskModalOpen,

        setTaskModalOpen,

    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        getTasks({

            limit: 1000,

        });


        dispatch(

            fetchProjects()

        );

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [

        dispatch,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Members
    |--------------------------------------------------------------------------
    */

    const members = useMemo(() => {

        const memberMap =

            new Map();


        tasks.forEach((task) => {

            const assignedUser =

                task?.assignedTo;


            if (!assignedUser?._id) {

                return;

            }


            memberMap.set(

                assignedUser._id,

                assignedUser

            );

        });


        return Array.from(

            memberMap.values()

        ).sort((firstMember, secondMember) =>

            (

                firstMember?.name || ""

            ).localeCompare(

                secondMember?.name || ""

            )

        );

    }, [

        tasks,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Modal Handlers
    |--------------------------------------------------------------------------
    */

    const openTaskModal = useCallback(() => {

        setTaskModalOpen(true);

    }, []);


    const closeTaskModal = useCallback(() => {

        setTaskModalOpen(false);

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                mx-auto
                w-full
                space-y-6
                pb-6
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Page Header
            |--------------------------------------------------------------------------
            */}

           <PageHeader

    title="Kanban Board"

    subtitle="Manage and track tasks visually across every workflow stage."

    icon={KanbanSquare}

    action={

        <button

            type="button"

            onClick={() => setTaskModalOpen(true)}

            className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/30
                sm:w-auto
            "

        >

            <Plus

                size={18}

                aria-hidden="true"

            />

            New Task

        </button>

    }

/>


            {/*
            |--------------------------------------------------------------------------
            | Filters and Actions
            |--------------------------------------------------------------------------
            */}

            <KanbanHeader

                filters={filters}

                setFilters={setFilters}

                projects={projects}

                members={members}

                onCreateTask={openTaskModal}

            />


            {/*
            |--------------------------------------------------------------------------
            | Kanban Board
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    min-w-0
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-900
                "
            >

                <KanbanBoard

                    filters={filters}

                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Create Task Modal
            |--------------------------------------------------------------------------
            */}

            <TaskModal

                open={taskModalOpen}

                task={null}

                loading={loading}

                onClose={closeTaskModal}

            />

        </div>

    );

}