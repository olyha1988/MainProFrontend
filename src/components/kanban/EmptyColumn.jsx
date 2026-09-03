import {
    Inbox,
} from "lucide-react";

import {
    useDroppable,
} from "@dnd-kit/core";


export default function EmptyColumn({
    status,
}) {

    const {
        setNodeRef,
        isOver,
    } = useDroppable({
        id: status,
        data: {
            type: "column",
            status,
        },
    });


    return (

        <div
            ref={setNodeRef}
            className={`
                flex
                min-h-[280px]
                w-full
                flex-1
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                px-6
                py-12
                text-center
                transition-all
                duration-200

                ${
                    isOver
                        ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/30"
                        : "border-gray-300 bg-white/60 dark:border-gray-700 dark:bg-slate-900/40"
                }
            `}
        >

            <div
                className="
                    flex
                    max-w-xs
                    flex-col
                    items-center
                "
            >

                <div
                    className="
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gray-100
                        text-gray-400
                        dark:bg-slate-800
                        dark:text-gray-500
                    "
                >

                    <Inbox
                        size={26}
                        strokeWidth={1.8}
                    />

                </div>


                <h4
                    className="
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                    "
                >

                    No Tasks

                </h4>


                <p
                    className="
                        mt-2
                        text-xs
                        leading-5
                        text-gray-500
                        dark:text-gray-400
                    "
                >

                    {status
                        ? `There are no tasks in "${status}" yet.`
                        : "There are no tasks in this column yet."
                    }

                </p>


                <p
                    className="
                        mt-1
                        text-xs
                        text-indigo-600
                        dark:text-indigo-400
                    "
                >

                    Drag a task here or create a new one.

                </p>

            </div>

        </div>

    );
}