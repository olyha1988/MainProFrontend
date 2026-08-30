
import TaskCard from "./TaskCard";

import TaskPagination from "./TaskPagination";


export default function TaskGrid({

    tasks = [],

    onEdit,

    onDelete,

    onView,

    pagination,

    filters,

    setFilters,

}) {

    return (

        <div className="space-y-6">

            {/*
            |--------------------------------------------------------------------------
            | Task Grid
            |--------------------------------------------------------------------------
            */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {tasks.map((task) => (

                    <TaskCard

                        key={task._id}

                        task={task}

                        onEdit={onEdit}

                        onDelete={onDelete}

                        onView={onView}

                    />

                ))}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Pagination
            |--------------------------------------------------------------------------
            */}

            <TaskPagination

                pagination={pagination}

                filters={filters}

                setFilters={setFilters}

            />

        </div>

    );

}

