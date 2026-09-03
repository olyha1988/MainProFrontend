import {
    Users,
    Plus,
    Grid,
    List,
    UsersRound
} from "lucide-react";


export default function MemberHeader({

    onManageMembers,

    view,

    setView,

}) {
    return (
        <div
            className="
                flex
                flex-col
                gap-6
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-700
                dark:bg-gray-900
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >
            <div className="flex items-center gap-4">
                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-100
                        text-blue-600
                        dark:bg-blue-900/30
                        dark:text-blue-400
                    "
                >
                    <Users size={28} />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Team Members
                    </h1>

                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage members, assignments and workloads.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div
                    className="
                        flex
                        overflow-hidden
                        rounded-xl
                        border
                        border-gray-200
                        dark:border-gray-700
                    "
                >
                    <button
                        onClick={() => setView("table")}
                        className={`px-4 py-2 transition ${
                            view === "table"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                        <List size={18} />
                    </button>

                    <button
                        onClick={() => setView("grid")}
                        className={`px-4 py-2 transition ${
                            view === "grid"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                        <Grid size={18} />
                    </button>
                </div>

                <button
                    onClick={onManageMembers}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                        cursor-pointer
                    "
                >
                    <UsersRound size={18} />
                    Manage Members
                </button>
            </div>
        </div>
    );
}