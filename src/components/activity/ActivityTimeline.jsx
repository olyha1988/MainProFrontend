import {

    useState,

} from "react";

import {

    Activity,

    AlertCircle,

    ArrowRight,

    CheckCircle2,

    CircleUserRound,

    FileMinus,

    FilePlus2,

    FolderKanban,

    FolderPen,

    FolderPlus,

    FolderX,

    ListChecks,

    RefreshCcw,

    Trash2,

    UserMinus,

    UserPlus,

    UserRoundCheck,

} from "lucide-react";


/*
|--------------------------------------------------------------------------
| Activity Configuration
|--------------------------------------------------------------------------
*/

const activityConfig = {

    PROJECT_CREATED: {

        icon: FolderPlus,

        label: "Project Created",

        iconClasses:

            "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",

    },

    PROJECT_UPDATED: {

        icon: FolderPen,

        label: "Project Updated",

        iconClasses:

            "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",

    },

    PROJECT_DELETED: {

        icon: FolderX,

        label: "Project Deleted",

        iconClasses:

            "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",

    },

    PROJECT_MEMBER_ADDED: {

        icon: UserPlus,

        label: "Member Added",

        iconClasses:

            "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",

    },

    PROJECT_MEMBER_REMOVED: {

        icon: UserMinus,

        label: "Member Removed",

        iconClasses:

            "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",

    },

    TASK_CREATED: {

        icon: ListChecks,

        label: "Task Created",

        iconClasses:

            "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",

    },

    TASK_UPDATED: {

        icon: RefreshCcw,

        label: "Task Updated",

        iconClasses:

            "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",

    },

    TASK_DELETED: {

        icon: Trash2,

        label: "Task Deleted",

        iconClasses:

            "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",

    },

    TASK_ASSIGNED: {

        icon: UserRoundCheck,

        label: "Task Assigned",

        iconClasses:

            "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",

    },

    TASK_STATUS_CHANGED: {

        icon: ArrowRight,

        label: "Status Changed",

        iconClasses:

            "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",

    },

    ATTACHMENT_UPLOADED: {

        icon: FilePlus2,

        label: "Attachment Uploaded",

        iconClasses:

            "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",

    },

    ATTACHMENT_DELETED: {

        icon: FileMinus,

        label: "Attachment Deleted",

        iconClasses:

            "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",

    },

    PROFILE_UPDATED: {

        icon: CircleUserRound,

        label: "Profile Updated",

        iconClasses:

            "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",

    },

};


/*
|--------------------------------------------------------------------------
| Format Relative Time
|--------------------------------------------------------------------------
*/

const formatRelativeTime = (

    dateValue

) => {

    if (!dateValue) {

        return "";

    }


    const date =

        new Date(dateValue);


    if (

        Number.isNaN(

            date.getTime()

        )

    ) {

        return "";

    }


    const difference =

        Date.now() -

        date.getTime();


    const seconds =

        Math.floor(

            difference / 1000

        );


    if (seconds < 60) {

        return "Just now";

    }


    const minutes =

        Math.floor(

            seconds / 60

        );


    if (minutes < 60) {

        return `${minutes} minute${

            minutes === 1

                ? ""

                : "s"

        } ago`;

    }


    const hours =

        Math.floor(

            minutes / 60

        );


    if (hours < 24) {

        return `${hours} hour${

            hours === 1

                ? ""

                : "s"

        } ago`;

    }


    const days =

        Math.floor(

            hours / 24

        );


    if (days < 7) {

        return `${days} day${

            days === 1

                ? ""

                : "s"

        } ago`;

    }


    return date.toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

        }

    );

};


/*
|--------------------------------------------------------------------------
| Format Exact Date
|--------------------------------------------------------------------------
*/

const formatExactDate = (

    dateValue

) => {

    if (!dateValue) {

        return "";

    }


    const date =

        new Date(dateValue);


    if (

        Number.isNaN(

            date.getTime()

        )

    ) {

        return "";

    }


    return date.toLocaleString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit",

        }

    );

};


/*
|--------------------------------------------------------------------------
| Get Initials
|--------------------------------------------------------------------------
*/

const getInitials = (

    name = ""

) => {

    const initials =

        name

            .trim()

            .split(/\s+/)

            .slice(0, 2)

            .map(

                (word) =>

                    word.charAt(0)

            )

            .join("")

            .toUpperCase();


    return initials || "U";

};


/*
|--------------------------------------------------------------------------
| Avatar
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Backend Base URL
|--------------------------------------------------------------------------
*/

const API_BASE_URL =

    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


/*
|--------------------------------------------------------------------------
| Get Avatar URL
|--------------------------------------------------------------------------
*/

const getAvatarUrl = (

    avatar

) => {

    if (!avatar) {

        return null;

    }


    if (

        avatar.startsWith("http://") ||

        avatar.startsWith("https://") ||

        avatar.startsWith("data:")

    ) {

        return avatar;

    }


    return `${API_BASE_URL}${

        avatar.startsWith("/")

            ? avatar

            : `/${avatar}`

    }`;

};


/*
|--------------------------------------------------------------------------
| Avatar
|--------------------------------------------------------------------------
*/

function ActivityAvatar({

    actor,

}) {

    const [

        imageFailed,

        setImageFailed,

    ] = useState(false);


    const name =

        actor?.name ||

        "Unknown User";


    const avatarUrl =

        getAvatarUrl(

            actor?.avatar

        );


    if (

        avatarUrl &&

        !imageFailed

    ) {

        return (

            <img

                src={avatarUrl}

                alt={name}

                className="
                    h-10
                    w-10
                    rounded-full
                    border
                    border-gray-200
                    object-cover
                    dark:border-gray-700
                "

                onError={() => {

                    setImageFailed(

                        true

                    );

                }}

            />

        );

    }


    return (

        <div

            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-indigo-100
                bg-indigo-50
                text-xs
                font-bold
                text-indigo-600
                dark:border-indigo-500/20
                dark:bg-indigo-500/10
                dark:text-indigo-400
            "

            aria-label={name}

        >

            {getInitials(name)}

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Activity Skeleton
|--------------------------------------------------------------------------
*/

function ActivityTimelineSkeleton({

    count = 5,

}) {

    return (

        <div className="space-y-0">

            {Array.from({

                length: count,

            }).map((

                _,

                index

            ) => (

                <div

                    key={index}

                    className="relative flex gap-4 pb-8"

                >

                    {index !== count - 1 && (

                        <div className="absolute left-5 top-11 h-[calc(100%-2rem)] w-px bg-gray-200 dark:bg-gray-800" />

                    )}


                    <div className="relative z-10 h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />


                    <div className="min-w-0 flex-1 pt-0.5">

                        <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                        <div className="mb-2 h-4 w-full max-w-md animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                        <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                    </div>

                </div>

            ))}

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Activity Empty State
|--------------------------------------------------------------------------
*/

function ActivityEmptyState() {

    return (

        <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                <Activity

                    size={28}

                    strokeWidth={1.8}

                />

            </div>


            <h3 className="text-base font-semibold text-gray-900 dark:text-white">

                No activity yet

            </h3>


            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">

                Important project, task, member and attachment actions will appear here.

            </p>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Activity Error State
|--------------------------------------------------------------------------
*/

function ActivityErrorState({

    error,

    onRetry,

}) {

    return (

        <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">

                <AlertCircle

                    size={28}

                    strokeWidth={1.8}

                />

            </div>


            <h3 className="text-base font-semibold text-gray-900 dark:text-white">

                Unable to load activity

            </h3>


            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">

                {error ||

                    "Something went wrong while fetching activity logs."}

            </p>


            {onRetry && (

                <button

                    type="button"

                    onClick={onRetry}

                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"

                >

                    <RefreshCcw size={16} />

                    Try Again

                </button>

            )}

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Activity Item
|--------------------------------------------------------------------------
*/

function ActivityItem({

    activity,

    isLast,

}) {

    const config =

        activityConfig[

            activity.action

        ] || {

            icon: CheckCircle2,

            label:

                "Activity",

            iconClasses:

                "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",

        };


    const Icon =

        config.icon;


    const actorName =

        activity.actor?.name ||

        "Unknown User";


    return (

        <div className="relative flex gap-4 pb-8">

            {!isLast && (

                <div className="absolute left-5 top-11 h-[calc(100%-2rem)] w-px bg-gray-200 dark:bg-gray-800" />

            )}


            <div className="relative z-10 shrink-0">

                <ActivityAvatar

                    actor={activity.actor}

                />


                <div

                    className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 ${config.iconClasses}`}

                >

                    <Icon

                        size={11}

                        strokeWidth={2.2}

                    />

                </div>

            </div>


            <div className="min-w-0 flex-1 pt-0.5">

                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">

                    <div className="min-w-0">

                        <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">

                            <span className="font-semibold text-gray-950 dark:text-white">

                                {actorName}

                            </span>

                            {" "}

                            <span>

                                {activity.message

                                    ?.replace(

                                        actorName,

                                        ""

                                    )

                                    .trim() ||

                                    config.label}

                            </span>

                        </p>


                        <div className="mt-2 flex flex-wrap items-center gap-2">

                            <span

                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.iconClasses}`}

                            >

                                <Icon

                                    size={13}

                                    strokeWidth={2}

                                />

                                {config.label}

                            </span>


                            {activity.project?.name && (

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300">

                                    <FolderKanban

                                        size={13}

                                    />

                                    {activity.project.name}

                                </span>

                            )}


                            {activity.task?.title && (

                                <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300">

                                    <ListChecks

                                        size={13}

                                        className="shrink-0"

                                    />

                                    <span className="truncate">

                                        {activity.task.title}

                                    </span>

                                </span>

                            )}

                        </div>

                    </div>


                    <time

                        dateTime={activity.createdAt}

                        title={formatExactDate(

                            activity.createdAt

                        )}

                        className="shrink-0 text-xs font-medium text-gray-400 dark:text-gray-500"

                    >

                        {formatRelativeTime(

                            activity.createdAt

                        )}

                    </time>

                </div>

            </div>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

function ActivityPagination({

    pagination,

    onPageChange,

    loading,

}) {

    const currentPage =

        Number(

            pagination?.page

        ) || 1;


    const totalPages =

        Number(

            pagination?.totalPages

        ) || 0;


    if (

        totalPages <= 1 ||

        !onPageChange

    ) {

        return null;

    }


    return (

        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">

            <p className="text-sm text-gray-500 dark:text-gray-400">

                Page{" "}

                <span className="font-semibold text-gray-900 dark:text-white">

                    {currentPage}

                </span>

                {" "}of{" "}

                <span className="font-semibold text-gray-900 dark:text-white">

                    {totalPages}

                </span>

            </p>


            <div className="flex items-center gap-2">

                <button

                    type="button"

                    disabled={

                        loading ||

                        currentPage <= 1

                    }

                    onClick={() =>

                        onPageChange(

                            currentPage - 1

                        )

                    }

                    className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"

                >

                    Previous

                </button>


                <button

                    type="button"

                    disabled={

                        loading ||

                        currentPage >= totalPages

                    }

                    onClick={() =>

                        onPageChange(

                            currentPage + 1

                        )

                    }

                    className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-gray-800"

                >

                    Next

                </button>

            </div>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Activity Timeline
|--------------------------------------------------------------------------
*/

export default function ActivityTimeline({

    activities = [],

    loading = false,

    error = null,

    pagination = null,

    onPageChange,

    onRetry,

    title = "Activity",

    description = "Recent actions and updates",

    showHeader = true,

    className = "",

}) {

    return (

        <section

            className={`overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-slate-900 ${className}`}

        >

            {showHeader && (

                <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-5 sm:px-6 dark:border-gray-800">

                    <div className="min-w-0">

                        <div className="flex items-center gap-2.5">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                                <Activity

                                    size={20}

                                    strokeWidth={2}

                                />

                            </div>


                            <div className="min-w-0">

                                <h2 className="truncate text-base font-semibold text-gray-950 dark:text-white">

                                    {title}

                                </h2>


                                {description && (

                                    <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">

                                        {description}

                                    </p>

                                )}

                            </div>

                        </div>

                    </div>


                    {pagination?.total > 0 && (

                        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">

                            {pagination.total}

                        </span>

                    )}

                </div>

            )}


            <div className="px-5 py-6 sm:px-6">

                {loading ? (

                    <ActivityTimelineSkeleton />

                ) : error ? (

                    <ActivityErrorState

                        error={error}

                        onRetry={onRetry}

                    />

                ) : activities.length === 0 ? (

                    <ActivityEmptyState />

                ) : (

                    <div>

                        {activities.map((

                            activity,

                            index

                        ) => (

                            <ActivityItem

                                key={activity._id}

                                activity={activity}

                                isLast={

                                    index ===

                                    activities.length - 1

                                }

                            />

                        ))}

                    </div>

                )}

            </div>


            {!loading &&

                !error &&

                activities.length > 0 && (

                    <ActivityPagination

                        pagination={pagination}

                        onPageChange={onPageChange}

                        loading={loading}

                    />

                )}

        </section>

    );

}