import {
    FolderKanban,
    Users,
    CheckCircle,
    Clock,
    UserCircle2,
} from "lucide-react";

function StatusBadge({ status }) {

    const styles = {

        Planning:
            "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",

        Active:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

        Completed:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

        Archived:
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",

    };

    return (

        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${styles[status] || styles.Active}
            `}
        >

            {status || "Active"}

        </span>

    );

}

export default function MemberProjects({

    projects = [],

}) {

    if (!projects.length) {

        return (

            <div
                className="
                    rounded-2xl
                    border
                    border-dashed
                    border-gray-300
                    bg-white
                    py-16
                    text-center
                    dark:border-gray-700
                    dark:bg-gray-900
                "
            >

                <FolderKanban
                    className="
                        mx-auto
                        mb-4
                        h-12
                        w-12
                        text-gray-400
                    "
                />

                <h3
                    className="
                        text-lg
                        font-semibold
                        text-gray-900
                        dark:text-white
                    "
                >
                    No Projects Assigned
                </h3>

                <p
                    className="
                        mt-2
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                    "
                >
                    This member is not assigned to any projects yet.
                </p>

            </div>

        );

    }

    return (

        <section className="space-y-5">

            <div className="flex items-center justify-between">

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                        dark:text-white
                    "
                >
                    Assigned Projects
                </h2>

                <span
                    className="
                        rounded-full
                        bg-blue-100
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-blue-700
                        dark:bg-blue-900/30
                        dark:text-blue-300
                    "
                >
                    {projects.length} Projects
                </span>

            </div>

            <div
                className="
                    grid
                    gap-5
                    lg:grid-cols-2
                "
            >

                {projects.map((project) => {

                    const progress = project.progress || 0;

                    return (

                        <div

                            key={project._id}

                            className="
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                p-6
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                                dark:border-gray-700
                                dark:bg-gray-900
                            "

                        >

                            {/* Header */}

                            <div className="flex justify-between">

                                <div className="flex gap-4">

                                    <div

                                        className="
                                            h-14
                                            w-14
                                            rounded-xl
                                            shadow-sm
                                        "

                                        style={{

                                            backgroundColor:
                                                project.color || "#2563EB",

                                        }}

                                    />

                                    <div>

                                        <h3
                                            className="
                                                text-lg
                                                font-semibold
                                                text-gray-900
                                                dark:text-white
                                            "
                                        >

                                            {project.name}

                                        </h3>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                text-gray-500
                                                dark:text-gray-400
                                            "
                                        >

                                            {project.description ||
                                                "No description available"}

                                        </p>

                                    </div>

                                </div>

                                <StatusBadge

                                    status={project.status}

                                />

                            </div>

                            {/* Owner */}

                            <div
                                className="
                                    mt-5
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-gray-600
                                    dark:text-gray-400
                                "
                            >

                                <UserCircle2 size={17} />

                                <span>

                                    Owner:

                                    <span
                                        className="
                                            ml-1
                                            font-semibold
                                            text-gray-900
                                            dark:text-white
                                        "
                                    >

                                        {project.owner?.name || "-"}

                                    </span>

                                </span>

                            </div>

                            {/* Progress */}

                            <div className="mt-6">

                                <div
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-gray-600
                                            dark:text-gray-400
                                        "
                                    >
                                        Completion
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-bold
                                            text-blue-600
                                        "
                                    >
                                        {progress}%
                                    </span>

                                </div>

                                <div
                                    className="
                                        h-2.5
                                        overflow-hidden
                                        rounded-full
                                        bg-gray-200
                                        dark:bg-gray-700
                                    "
                                >

                                    <div

                                        className="
                                            h-full
                                            rounded-full
                                            bg-gradient-to-r
                                            from-blue-500
                                            to-indigo-600
                                            transition-all
                                        "

                                        style={{

                                            width: `${progress}%`,

                                        }}

                                    />

                                </div>

                            </div>

                            {/* Statistics */}

                            <div
                                className="
                                    mt-6
                                    grid
                                    grid-cols-3
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        rounded-xl
                                        bg-gray-50
                                        p-4
                                        dark:bg-gray-800
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-gray-500
                                            dark:text-gray-400
                                        "
                                    >

                                        <Users size={16} />

                                        <span className="text-xs">

                                            Members

                                        </span>

                                    </div>

                                    <p
                                        className="
                                            mt-2
                                            text-xl
                                            font-bold
                                            text-gray-900
                                            dark:text-white
                                        "
                                    >

                                        {project.members?.length || 0}

                                    </p>

                                </div>

                                <div
                                    className="
                                        rounded-xl
                                        bg-gray-50
                                        p-4
                                        dark:bg-gray-800
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-gray-500
                                            dark:text-gray-400
                                        "
                                    >

                                        <FolderKanban size={16} />

                                        <span className="text-xs">

                                            Tasks

                                        </span>

                                    </div>

                                    <p
                                        className="
                                            mt-2
                                            text-xl
                                            font-bold
                                            text-gray-900
                                            dark:text-white
                                        "
                                    >

                                        {project.totalTasks || 0}

                                    </p>

                                </div>

                                <div
                                    className="
                                        rounded-xl
                                        bg-gray-50
                                        p-4
                                        dark:bg-gray-800
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-gray-500
                                            dark:text-gray-400
                                        "
                                    >

                                        <CheckCircle size={16} />

                                        <span className="text-xs">

                                            Done

                                        </span>

                                    </div>

                                    <p
                                        className="
                                            mt-2
                                            text-xl
                                            font-bold
                                            text-green-600
                                        "
                                    >

                                        {project.completedTasks || 0}

                                    </p>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

}