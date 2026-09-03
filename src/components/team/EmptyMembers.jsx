import {
    Users,
    UserPlus,
} from "lucide-react";

export default function EmptyMembers({
    onInvite,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-dashed
                border-gray-300
                bg-white
                px-8
                py-20
                text-center
                dark:border-gray-700
                dark:bg-gray-900
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    dark:bg-blue-900/30
                    dark:text-blue-400
                "
            >
                <Users size={42} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                No Team Members Found
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-500 dark:text-gray-400">
                No members match your current search or filter criteria.
                Try adjusting your filters or invite a new member to start collaborating.
            </p>

            {onInvite && (
                <button
                    onClick={onInvite}
                    className="
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    <UserPlus size={18} />
                    Invite Member
                </button>
            )}
        </div>
    );
}