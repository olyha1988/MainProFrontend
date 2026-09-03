import {

    useEffect,

    useMemo,

    useState,

} from "react";

import {

    useSortable,

} from "@dnd-kit/sortable";

import {

    CSS,

} from "@dnd-kit/utilities";

import {

    useNavigate,

} from "react-router-dom";

import {

    CalendarDays,

    GripVertical,

} from "lucide-react";

import TaskPriorityBadge from "@/components/tasks/TaskPriorityBadge";
import KanbanTaskMenu from "./KanbanTaskMenu";


export default function KanbanTaskCard({

    task,

    onEdit,

    onView,

    onDelete,

    overlay = false,

}) {

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | Sortable
    |--------------------------------------------------------------------------
    */

    const {

        attributes,

        listeners,

        setNodeRef,

        transform,

        transition,

        isDragging,

    } =useSortable({
    id: overlay
        ? `${task._id}-overlay`
        : task._id,

    data: {
        task,
    },

    disabled: overlay,
});


    /*
    |--------------------------------------------------------------------------
    | Due Date
    |--------------------------------------------------------------------------
    */

    const dueDateInformation = useMemo(() => {

        if (!task?.dueDate) {

            return null;

        }


        const dueDate =

            new Date(task.dueDate);


        if (

            Number.isNaN(

                dueDate.getTime()

            )

        ) {

            return null;

        }


        const today =

            new Date();


        today.setHours(

            0,

            0,

            0,

            0

        );


        const normalizedDueDate =

            new Date(dueDate);


        normalizedDueDate.setHours(

            0,

            0,

            0,

            0

        );


        return {

            formattedDate:

                dueDate.toLocaleDateString(

                    "en-IN",

                    {

                        day: "numeric",

                        month: "short",

                    }

                ),

            isOverdue:

                normalizedDueDate < today &&

                task?.status !== "COMPLETED",

        };

    }, [

        task?.dueDate,

        task?.status,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Assigned User
    |--------------------------------------------------------------------------
    */

    const assignedUser =

        task?.assignedTo;


    const assignedUserName =

        assignedUser?.name ||

        "Unassigned";


    const assignedUserInitial =

        assignedUser?.name
            ?.trim()
            ?.charAt(0)
            ?.toUpperCase() ||

        "?";


    /*
    |--------------------------------------------------------------------------
    | Avatar URL
    |--------------------------------------------------------------------------
    */

    const backendUrl = useMemo(() => {

        const apiUrl =

            import.meta.env.VITE_API_URL ||

            "http://localhost:8000/api";


        return apiUrl

            .replace(/\/api\/?$/, "")

            .replace(/\/$/, "");

    }, []);


    const avatarPath =

        assignedUser?.avatar ||

        assignedUser?.profileImage ||

        assignedUser?.profilePicture ||

        assignedUser?.image ||

        "";


    const avatarUrl = useMemo(() => {

        if (!avatarPath) {

            return "";

        }


        if (

            avatarPath.startsWith("http://") ||

            avatarPath.startsWith("https://") ||

            avatarPath.startsWith("data:") ||

            avatarPath.startsWith("blob:")

        ) {

            return avatarPath;

        }


        const normalizedPath =

            avatarPath.replace(

                /^\/+/,

                ""

            );


        return `${backendUrl}/${normalizedPath}`;

    }, [

        avatarPath,

        backendUrl,

    ]);


    const [

        avatarError,

        setAvatarError,

    ] = useState(false);


    useEffect(() => {

        setAvatarError(false);

    }, [

        avatarUrl,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Sortable Style
    |--------------------------------------------------------------------------
    */

    const sortableStyle = {

        transform:

            CSS.Transform.toString(

                transform

            ),

        transition,

        opacity:

            isDragging && !overlay
                ? 0.35
                : 1,

        zIndex:

            isDragging
                ? 50
                : "auto",

    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <article

            ref={setNodeRef}

            style={sortableStyle}

            className={`
                group
                relative
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
                transition-[border-color,box-shadow,transform]
                duration-200
                dark:border-gray-800
                dark:bg-slate-950
                ${
                    overlay

                        ? `
                            rotate-2
                            cursor-grabbing
                            border-indigo-300
                            shadow-2xl
                            ring-4
                            ring-indigo-500/10
                            dark:border-indigo-500
                        `

                        : `
                            hover:-translate-y-0.5
                            hover:border-gray-300
                            hover:shadow-md
                            dark:hover:border-gray-700
                        `
                }
            `}

        >

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    mb-3
                    flex
                    items-start
                    justify-between
                    gap-3
                "
            >

                <div className="min-w-0 flex-1">

                    <div
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-2
                        "
                    >

                        <span

                            className="
                                h-2.5
                                w-2.5
                                shrink-0
                                rounded-full
                                ring-2
                                ring-white
                                dark:ring-slate-950
                            "

                            style={{

                                backgroundColor:

                                    task?.project?.color ||

                                    "#6366F1",

                            }}

                        />


                        <span

                            className="
                                truncate
                                text-xs
                                font-semibold
                                text-gray-500
                                dark:text-gray-400
                            "

                            title={

                                task?.project?.name ||

                                "No Project"

                            }

                        >

                            {task?.project?.name || "No Project"}

                        </span>

                    </div>

                </div>


                {!overlay && (

                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1
                        "
                    >

                        <button

                            type="button"

                            {...attributes}

                            {...listeners}

                            className="
                                flex
                                h-8
                                w-8
                                touch-none
                                items-center
                                justify-center
                                rounded-lg
                                text-gray-400
                                transition-colors
                                hover:bg-gray-100
                                hover:text-gray-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500/30
                                active:cursor-grabbing
                                dark:text-gray-500
                                dark:hover:bg-slate-800
                                dark:hover:text-gray-200
                            "

                            aria-label={`Drag ${task?.title || "task"}`}

                            title="Drag task"

                        >

                            <GripVertical

                                size={16}

                                aria-hidden="true"

                            />

                        </button>


                        <KanbanTaskMenu

                          onView={() => {

        onView?.(task);

    }}

    onEdit={() => {

        onEdit?.(task);

    }}

    onDelete={() => {

        onDelete?.(task);

    }} />
                    </div>

                )}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Task Content
            |--------------------------------------------------------------------------
            */}

          <button

    type="button"

    onClick={() => {

        if (!overlay) {

            onView?.(task);

        }

    }}

    className="
        block
        w-full
        cursor-pointer
        text-left
        focus:outline-none
    "

    tabIndex={overlay ? -1 : 0}

>

                <h3

                    className="
                        line-clamp-2
                        text-sm
                        font-semibold
                        leading-5
                        text-gray-900
                        transition-colors
                        group-hover:text-indigo-600
                        dark:text-white
                        dark:group-hover:text-indigo-400
                    "

                    title={task?.title}

                >

                    {task?.title || "Untitled Task"}

                </h3>


                <p
                    className="
                        mt-2
                        line-clamp-2
                        min-h-10
                        text-xs
                        leading-5
                        text-gray-500
                        dark:text-gray-400
                    "
                >

                    {task?.description || "No description provided."}

                </p>

            </button>


            {/*
            |--------------------------------------------------------------------------
            | Priority and Due Date
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    mt-4
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-2
                "
            >

                <TaskPriorityBadge

                    priority={task?.priority}

                />


                {dueDateInformation && (

                    <div
                        className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            ${
                                dueDateInformation.isOverdue

                                    ? `
                                        bg-red-50
                                        text-red-600
                                        dark:bg-red-500/10
                                        dark:text-red-400
                                    `

                                    : `
                                        bg-gray-100
                                        text-gray-600
                                        dark:bg-slate-800
                                        dark:text-gray-300
                                    `
                            }
                        `}
                    >

                        <CalendarDays

                            size={13}

                            aria-hidden="true"

                        />


                        <span>

                            {dueDateInformation.formattedDate}

                        </span>

                    </div>

                )}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Footer
            |--------------------------------------------------------------------------
            */}

            <footer
                className="
                    mt-4
                    border-t
                    border-gray-100
                    pt-4
                    dark:border-gray-800
                "
            >

                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        gap-2.5
                    "
                >

                    {avatarUrl && !avatarError ? (

                        <img

                            key={avatarUrl}

                            src={avatarUrl}

                            alt={assignedUserName}

                            className="
                                h-8
                                w-8
                                shrink-0
                                rounded-full
                                border
                                border-gray-200
                                bg-gray-100
                                object-cover
                                dark:border-gray-700
                                dark:bg-slate-800
                            "

                            loading="lazy"

                            referrerPolicy="no-referrer"

                            onError={() => {

                                setAvatarError(true);

                            }}

                        />

                    ) : (

                        <div
                            className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-indigo-600
                                text-xs
                                font-semibold
                                text-white
                            "
                        >

                            {assignedUserInitial}

                        </div>

                    )}


                    <span

                        className="
                            truncate
                            text-xs
                            font-medium
                            text-gray-600
                            dark:text-gray-300
                        "

                        title={assignedUserName}

                    >

                        {assignedUserName}

                    </span>

                </div>

            </footer>

        </article>

    );

}