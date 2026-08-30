import {

    useEffect,


    useMemo,

    useState,

} from "react";

import {

    ArrowLeft,

    CalendarDays,

    Clock3,

    Edit3,

    FolderKanban,

    Mail,

    MoreVertical,

    Trash2,

    UserRound,

    Users,

} from "lucide-react";

import {

    useNavigate,

    useParams,

} from "react-router-dom";

import toast from "react-hot-toast";


import useProjects from "@/hooks/useProjects";

// import useNotifications from "@/hooks/useNotifications";

import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";

import ProjectModal from "@/components/projects/ProjectModal";

import ProjectMembersModal from "@/components/projects/ProjectMembersModal";

// import useActivities from "@/hooks/useActivities";

// import ActivityTimeline from "@/components/activity/ActivityTimeline";

const API_BASE_URL =

    import.meta.env.VITE_API_BASE_URL ||

    "http://localhost:5000";


const getFallbackAvatar = (user) =>

    `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User"
    )}&background=2563EB&color=ffffff`;


const getAvatarUrl = (user) => {

    if (!user?.avatar) {

        return getFallbackAvatar(user);

    }


    if (

        user.avatar.startsWith("http://") ||

        user.avatar.startsWith("https://")

    ) {

        return user.avatar;

    }


    return `${API_BASE_URL}${

        user.avatar.startsWith("/")

            ? user.avatar

            : `/${user.avatar}`

    }`;

};


const formatDate = (date) => {

    if (!date) {

        return "Unavailable";

    }


    const parsedDate = new Date(date);


    if (

        Number.isNaN(

            parsedDate.getTime()

        )

    ) {

        return "Unavailable";

    }


    return parsedDate.toLocaleDateString(

        "en-US",

        {

            year: "numeric",

            month: "long",

            day: "numeric",

        }

    );

};


const formatDateTime = (date) => {

    if (!date) {

        return "Unavailable";

    }


    const parsedDate = new Date(date);


    if (

        Number.isNaN(

            parsedDate.getTime()

        )

    ) {

        return "Unavailable";

    }


    return parsedDate.toLocaleString(

        "en-US",

        {

            year: "numeric",

            month: "short",

            day: "numeric",

            hour: "numeric",

            minute: "2-digit",

        }

    );

};


export default function ProjectDetailsPage() {

    const navigate = useNavigate();

    const {

        projectId,

    } = useParams(); // Access the Project ID of the current Project


    const {

        project,

        fetchProject,

        deleteProject,

        loading,

        error,

    } = useProjects();


    // const {

    //     notify,

    // } = useNotifications();


        /*
    |--------------------------------------------------------------------------
    | Activities
    |--------------------------------------------------------------------------
    */

    // const {

    //     activities,

    //     pagination: activityPagination,

    //     loading: activitiesLoading,

    //     error: activitiesError,

    //     fetchProjectActivities,

    //     resetActivities,

    // } = useActivities();



    const [

        editModalOpen,

        setEditModalOpen,

    ] = useState(false);


    const [

        membersModalOpen,

        setMembersModalOpen,

    ] = useState(false);


    const [

        actionsOpen,

        setActionsOpen,

    ] = useState(false);


    const [

        deleting,

        setDeleting,

    ] = useState(false);


    useEffect(() => {

        if (!projectId) {

            return;

        }

        fetchProject(projectId);

    }, [

        projectId,

        fetchProject,

    ]);


    const members = useMemo(

        () => project?.members || [],

        [project?.members]

    );


    //     useEffect(() => {

    //     if (!projectId) {

    //         return;

    //     }

    //     fetchProject(projectId);

    // }, [

    //     projectId,

    //     fetchProject,

    // ]);

        /*
    |--------------------------------------------------------------------------
    | Load Project Activities
    |--------------------------------------------------------------------------
    */

    // useEffect(() => {

    //     if (!projectId) {

    //         return;

    //     }


    //     fetchProjectActivities(

    //         projectId,

    //         {

    //             page: 1,

    //             limit: 10,

    //         }

    //     );


    //     return () => {

    //         resetActivities();

    //     };

    // }, [

    //     projectId,

    // ]);





    /*
    |--------------------------------------------------------------------------
    | Delete Project
    |--------------------------------------------------------------------------
    */

    const handleDelete = async () => {

        const confirmed = window.confirm(

            `Are you sure you want to delete "${project?.name}"?`

        );


        if (!confirmed) {

            return;

        }


        try {

            setDeleting(true);


            await deleteProject(

                project._id

            );


            // notify({

            //     title: "Project Deleted",

            //     message: `${project.name} was deleted successfully.`,

            //     type: "success",

            //     entityType: "project",

            //     entityId: project._id,

            // });


            navigate(

                "/projects"

            );

        } catch (deleteError) {

            toast.error(

                deleteError?.message ||

                "Failed to delete project."

            );

        } finally {

            setDeleting(false);

        }

    };


        /*
    |--------------------------------------------------------------------------
    | Retry Project Activities
    |--------------------------------------------------------------------------
    */

    const handleActivityRetry = () => {

        if (!projectId) {

            return;

        }


        fetchProjectActivities(

            projectId,

            {

                page:

                    activityPagination?.page || 1,

                limit:

                    activityPagination?.limit || 10,

            }

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Project Activity Pagination
    |--------------------------------------------------------------------------
    */

    const handleActivityPageChange = (

        page

    ) => {

        if (!projectId) {

            return;

        }


        fetchProjectActivities(

            projectId,

            {

                page,

                limit:

                    activityPagination?.limit || 10,

            }

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

if (

    loading &&

    !project

) {

    return (

        <ProjectDetailsSkeleton />

    );

}


    /*
    |--------------------------------------------------------------------------
    | Error State
    |--------------------------------------------------------------------------
    */

    if (

        error ||

        !project

    ) {

        return (

            <div className="p-6">

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">

                    <FolderKanban

                        size={40}

                        className="mx-auto text-red-500"

                        aria-hidden="true"

                    />


                    <h2 className="mt-4 text-lg font-semibold text-red-800 dark:text-red-300">

                        Project unavailable

                    </h2>


                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">

                        {error ||

                            "The requested project could not be found."}

                    </p>


                    <button

                        type="button"

                        onClick={() =>

                            navigate(

                                "/projects"

                            )

                        }

                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30"

                    >

                        <ArrowLeft

                            size={17}

                            aria-hidden="true"

                        />

                        Back to Projects

                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="space-y-6 p-4 sm:p-6">

            {/*
            |--------------------------------------------------------------------------
            | Back Button
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={() =>

                    navigate(

                        "/projects"

                    )

                }

                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-400 dark:hover:text-blue-400"

            >

                <ArrowLeft

                    size={18}

                    aria-hidden="true"

                />

                Back to Projects

            </button>


            {/*
            |--------------------------------------------------------------------------
            | Project Header
            |--------------------------------------------------------------------------
            */}

            <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

                <div

                    className="h-2 w-full"

                    style={{

                        backgroundColor:

                            project.color ||

                            "#2563EB",

                    }}

                />


                <div className="p-6">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-3">

                                <div

                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"

                                    style={{

                                        backgroundColor:

                                            project.color ||

                                            "#2563EB",

                                    }}

                                >

                                    <FolderKanban

                                        size={24}

                                        aria-hidden="true"

                                    />

                                </div>


                                <div className="min-w-0">

                                    <h1 className="break-words text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">

                                        {project.name}

                                    </h1>


                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                        Project ID:{" "}

                                        <span className="font-medium">

                                            {project._id}

                                        </span>

                                    </p>

                                </div>


                                <ProjectStatusBadge

                                    status={project.status}

                                />

                            </div>


                            <p className="mt-5 max-w-3xl leading-7 text-gray-600 dark:text-gray-400">

                                {project.description ||

                                    "No project description has been added yet."}

                            </p>

                        </div>


                        <div className="flex flex-wrap items-center gap-3">

                            <button

                                type="button"

                                onClick={() =>

                                    setMembersModalOpen(

                                        true

                                    )

                                }

                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"

                            >

                                <Users

                                    size={17}

                                    aria-hidden="true"

                                />

                                Manage Members

                            </button>


                            <button

                                type="button"

                                onClick={() =>

                                    setEditModalOpen(

                                        true

                                    )

                                }

                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"

                            >

                                <Edit3

                                    size={17}

                                    aria-hidden="true"

                                />

                                Edit Project

                            </button>


                            <div className="relative">

                                <button

                                    type="button"

                                    onClick={() =>

                                        setActionsOpen(

                                            (current) =>

                                                !current

                                        )

                                    }

                                    aria-label="Project actions"

                                    aria-expanded={actionsOpen}

                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"

                                >

                                    <MoreVertical

                                        size={18}

                                        aria-hidden="true"

                                    />

                                </button>


                                {actionsOpen && (

                                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">

                                        <button

                                            type="button"

                                            disabled={deleting}

                                            onClick={handleDelete}

                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/30"

                                        >

                                            <Trash2

                                                size={16}

                                                aria-hidden="true"

                                            />

                                            {deleting

                                                ? "Deleting..."

                                                : "Delete Project"}

                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/*
            |--------------------------------------------------------------------------
            | Project Statistics
            |--------------------------------------------------------------------------
            */}

            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard

                    icon={Users}

                    label="Members"

                    value={members.length}

                    description="People assigned to this project"

                />


                <StatCard

                    icon={UserRound}

                    label="Owner"

                    value={project.owner?.name || "Unavailable"}

                    description="Project owner"

                />


                <StatCard

                    icon={CalendarDays}

                    label="Created"

                    value={formatDate(

                        project.createdAt

                    )}

                    description="Project creation date"

                />


                <StatCard

                    icon={Clock3}

                    label="Last Updated"

                    value={formatDate(

                        project.updatedAt

                    )}

                    description="Most recent update"

                />

            </section>


            <div className="grid gap-6 xl:grid-cols-3">

                {/*
                |--------------------------------------------------------------------------
                | Main Column
                |--------------------------------------------------------------------------
                */}

                <div className="space-y-6 xl:col-span-2">

                    {/*
                    |--------------------------------------------------------------------------
                    | Overview
                    |--------------------------------------------------------------------------
                    */}

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">

                                <FolderKanban

                                    size={20}

                                    aria-hidden="true"

                                />

                            </div>


                            <div>

                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                                    Project Overview

                                </h2>


                                <p className="text-sm text-gray-500 dark:text-gray-400">

                                    General project information

                                </p>

                            </div>

                        </div>


                        <div className="mt-6 grid gap-5 sm:grid-cols-2">

                            <DetailItem

                                label="Project Name"

                                value={project.name}

                            />


                            <DetailItem

                                label="Status"

                                value={project.status}

                            />


                            <DetailItem

                                label="Created On"

                                value={formatDateTime(

                                    project.createdAt

                                )}

                            />


                            <DetailItem

                                label="Last Updated"

                                value={formatDateTime(

                                    project.updatedAt

                                )}

                            />

                        </div>


                        <div className="mt-6">

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                                Description

                            </p>


                            <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300">

                                {project.description ||

                                    "No description available."}

                            </div>

                        </div>

                    </section>


                    {/*
                    |--------------------------------------------------------------------------
                    | Members
                    |--------------------------------------------------------------------------
                    */}

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">

                                    <Users

                                        size={20}

                                        aria-hidden="true"

                                    />

                                </div>


                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                                        Project Members

                                    </h2>


                                    <p className="text-sm text-gray-500 dark:text-gray-400">

                                        {members.length}{" "}

                                        {members.length === 1

                                            ? "member"

                                            : "members"}{" "}

                                        assigned

                                    </p>

                                </div>

                            </div>


                            <button

                                type="button"

                                onClick={() =>

                                    setMembersModalOpen(

                                        true

                                    )

                                }

                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"

                            >

                                <Users

                                    size={16}

                                    aria-hidden="true"

                                />

                                Manage

                            </button>

                        </div>


                        {members.length > 0 ? (

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                {members.map((member) => (

                                    <MemberCard

                                        key={member._id}

                                        member={member}

                                        ownerId={project.owner?._id}

                                    />

                                ))}

                            </div>

                        ) : (

                            <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">

                                <Users

                                    size={34}

                                    className="mx-auto text-gray-400"

                                    aria-hidden="true"

                                />


                                <p className="mt-3 font-medium text-gray-700 dark:text-gray-300">

                                    No members assigned

                                </p>


                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                    Add users to collaborate on this project.

                                </p>

                            </div>

                        )}

                    </section>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Sidebar
                |--------------------------------------------------------------------------
                */}

                <div className="space-y-6">

                    {/*
                    |--------------------------------------------------------------------------
                    | Owner
                    |--------------------------------------------------------------------------
                    */}

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">

                                <UserRound

                                    size={20}

                                    aria-hidden="true"

                                />

                            </div>


                            <div>

                                <h2 className="font-semibold text-gray-900 dark:text-white">

                                    Project Owner

                                </h2>


                                <p className="text-sm text-gray-500 dark:text-gray-400">

                                    Responsible person

                                </p>

                            </div>

                        </div>


                        {project.owner ? (

                            <div className="mt-6">

                                <div className="flex items-center gap-3">

                                    <img

                                        src={getAvatarUrl(

                                            project.owner

                                        )}

                                        alt={project.owner.name}

                                        onError={(event) => {

                                            event.currentTarget.onerror = null;

                                            event.currentTarget.src =

                                                getFallbackAvatar(

                                                    project.owner

                                                );

                                        }}

                                        className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800"

                                    />


                                    <div className="min-w-0">

                                        <p className="truncate font-semibold text-gray-900 dark:text-white">

                                            {project.owner.name}

                                        </p>


                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">

                                            {project.owner.email}

                                        </p>

                                    </div>

                                </div>


                                {project.owner.email && (

                                    <a

                                        href={`mailto:${project.owner.email}`}

                                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"

                                    >

                                        <Mail

                                            size={16}

                                            aria-hidden="true"

                                        />

                                        Send Email

                                    </a>

                                )}

                            </div>

                        ) : (

                            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">

                                Owner information is unavailable.

                            </p>

                        )}

                    </section>


                    {/*
                    |--------------------------------------------------------------------------
                    | Activity
                    |--------------------------------------------------------------------------
                    */}

                    {/* <ActivityTimeline

                        activities={activities}

                        loading={activitiesLoading}

                        error={activitiesError}

                        pagination={activityPagination}

                        onRetry={handleActivityRetry}

                        onPageChange={handleActivityPageChange}

                        title="Project Activity"

                        description="Recent actions and updates"

                        className="rounded-2xl dark:bg-gray-900"

                    /> */}

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Edit Modal
            |--------------------------------------------------------------------------
            */}

            <ProjectModal

                open={editModalOpen}

                onClose={() =>

                    setEditModalOpen(

                        false

                    )

                }

                project={project}

            />


            {/*
            |--------------------------------------------------------------------------
            | Members Modal
            |--------------------------------------------------------------------------
            */}

            <ProjectMembersModal

    open={membersModalOpen}

    onClose={() => {

        setMembersModalOpen(false);

    }}

    project={project}

/>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Statistic Card
|--------------------------------------------------------------------------
*/

function StatCard({

    icon: Icon,

    label,

    value,

    description,

}) {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">

                        {label}

                    </p>


                    <p className="mt-2 truncate text-lg font-bold text-gray-900 dark:text-white">

                        {value}

                    </p>


                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">

                        {description}

                    </p>

                </div>


                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">

                    <Icon

                        size={20}

                        aria-hidden="true"

                    />

                </div>

            </div>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Detail Item
|--------------------------------------------------------------------------
*/

function DetailItem({

    label,

    value,

}) {

    return (

        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">

                {label}

            </p>


            <p className="mt-2 break-words text-sm font-semibold text-gray-900 dark:text-white">

                {value || "Unavailable"}

            </p>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Member Card
|--------------------------------------------------------------------------
*/

function MemberCard({

    member,

    ownerId,

}) {

    const isOwner =

        member._id === ownerId;


    return (

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/40 dark:border-gray-700 dark:hover:border-blue-900 dark:hover:bg-blue-950/10">

            <img

                src={getAvatarUrl(

                    member

                )}

                alt={member.name || "Project member"}

                onError={(event) => {

                    event.currentTarget.onerror = null;

                    event.currentTarget.src =

                        getFallbackAvatar(

                            member

                        );

                }}

                className="h-11 w-11 shrink-0 rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800"

            />


            <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">

                        {member.name ||

                            "Unnamed User"}

                    </p>


                    {isOwner && (

                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-700 dark:bg-purple-500/15 dark:text-purple-300">

                            Owner

                        </span>

                    )}

                </div>


                <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">

                    {member.email ||

                        "Email unavailable"}

                </p>

            </div>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Activity Item
|--------------------------------------------------------------------------
*/

function ActivityItem({

    title,

    date,

}) {

    return (

        <div className="relative flex gap-3">

            <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-500/10" />


            <div>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">

                    {title}

                </p>


                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">

                    {date}

                </p>

            </div>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| Loading Skeleton
|--------------------------------------------------------------------------
*/

function ProjectDetailsSkeleton() {

    return (

        <div className="space-y-6 p-4 sm:p-6">

            <div className="h-5 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />


            <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

                <div className="h-2 bg-gray-200 dark:bg-gray-700" />


                <div className="space-y-5 p-6">

                    <div className="flex items-center gap-4">

                        <div className="h-12 w-12 rounded-2xl bg-gray-200 dark:bg-gray-700" />

                        <div className="space-y-2">

                            <div className="h-7 w-52 rounded bg-gray-200 dark:bg-gray-700" />

                            <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />

                        </div>

                    </div>


                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />

                    <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />

                </div>

            </div>


            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({

                    length: 4,

                }).map((_, index) => (

                    <div

                        key={index}

                        className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"

                    >

                        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />

                        <div className="mt-4 h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />

                    </div>

                ))}

            </div>


            <div className="grid gap-6 xl:grid-cols-3">

                <div className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 xl:col-span-2" />

                <div className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900" />

            </div>

        </div>

    );

}