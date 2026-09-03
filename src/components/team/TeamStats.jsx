import {
    Users,
    UserCheck,
    FolderKanban,
    ClipboardList,
} from "lucide-react";

function StatCard({
    title,
    value,
    icon,
    iconClass,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
                dark:border-gray-700
                dark:bg-gray-900
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <p
                        className="
                            text-sm
                            font-medium
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        {title}
                    </p>

                    <h3
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        {value}
                    </h3>
                </div>

                <div
                    className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        ${iconClass}
                    `}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function TeamStats({
    members = [],
}) {
    const totalMembers = members.length;

    const activeMembers =
        members.filter(
            (member) => member.isActive
        ).length;

    const totalProjects =
        members.reduce(
            (sum, member) =>
                sum + (member.projectsCount || 0),
            0
        );

    const totalTasks =
        members.reduce(
            (sum, member) =>
                sum + (member.tasksCount || 0),
            0
        );

    return (
        <div
            className="
                grid
                gap-5
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >
            <StatCard
                title="Total Members"
                value={totalMembers}
                icon={<Users size={24} />}
                iconClass="
                    bg-blue-100
                    text-blue-600
                    dark:bg-blue-900/30
                    dark:text-blue-400
                "
            />

            <StatCard
                title="Active Members"
                value={activeMembers}
                icon={<UserCheck size={24} />}
                iconClass="
                    bg-green-100
                    text-green-600
                    dark:bg-green-900/30
                    dark:text-green-400
                "
            />

            <StatCard
                title="Projects"
                value={totalProjects}
                icon={<FolderKanban size={24} />}
                iconClass="
                    bg-purple-100
                    text-purple-600
                    dark:bg-purple-900/30
                    dark:text-purple-400
                "
            />

            <StatCard
                title="Assigned Tasks"
                value={totalTasks}
                icon={<ClipboardList size={24} />}
                iconClass="
                    bg-orange-100
                    text-orange-600
                    dark:bg-orange-900/30
                    dark:text-orange-400
                "
            />
        </div>
    );
}