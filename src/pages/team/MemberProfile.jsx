import {

    useEffect,

} from "react";

import {

    ArrowLeft,

    LoaderCircle,

    UserRoundX,

} from "lucide-react";

import {

    useNavigate,

    useParams,

} from "react-router-dom";


import useTeam from "@/hooks/useTeam";
import useMemberProjects from "@/hooks/useMemberProjects";
import useMemberTasks from "@/hooks/useMemberTasks";
import useMemberWorkload from "@/hooks/useMemberWorkload";
// import useActivities from "@/hooks/useActivities";


import MemberProfileCard from "@/components/team/MemberProfileCard";
import MemberProjects from "@/components/team/MemberProjects";
import MemberTasks from "@/components/team/MemberTasks";
import MemberWorkload from "@/components/team/MemberWorkload";
// import ActivityTimeline from "@/components/activity/ActivityTimeline";


export default function MemberProfile() {

    const {

        id,

    } = useParams();


    const navigate =

        useNavigate();


    /*
    |--------------------------------------------------------------------------
    | Member
    |--------------------------------------------------------------------------
    */

    const {

        member,

        loading: userLoading,

        fetchMember,

    } = useTeam();


    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */

    const {

        projects,

        loading: projectsLoading,

        fetchMemberProjects,

    } = useMemberProjects();


    /*
    |--------------------------------------------------------------------------
    | Tasks
    |--------------------------------------------------------------------------
    */

    const {

        tasks,

        loading: tasksLoading,

        fetchMemberTasks,

    } = useMemberTasks();


    /*
    |--------------------------------------------------------------------------
    | Workload
    |--------------------------------------------------------------------------
    */

    const {

        workload,

        loading: workloadLoading,

        fetchMemberWorkload,

    } = useMemberWorkload();


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

    //     fetchMemberActivities,

    //     resetActivities,

    // } = useActivities();


    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!id) {

            return;

        }


        fetchMember(id);

        fetchMemberProjects(id);

        fetchMemberTasks(

            id,

            {

                page: 1,

                limit: 10,

            }

        );

        fetchMemberWorkload(id);

        // fetchMemberActivities(

        //     id,

        //     {

        //         page: 1,

        //         limit: 10,

        //     }

        // );


        // return () => {

        //     resetActivities();

        // };

    }, [id]);


    /*
    |--------------------------------------------------------------------------
    | Activity Retry
    |--------------------------------------------------------------------------
    */

    const handleActivityRetry = () => {

        if (!id) {

            return;

        }


        fetchMemberActivities(

            id,

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
    | Activity Pagination
    |--------------------------------------------------------------------------
    */

    const handleActivityPageChange = (

        page

    ) => {

        if (!id) {

            return;

        }


        fetchMemberActivities(

            id,

            {

                page,

                limit:

                    activityPagination?.limit || 10,

            }

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (userLoading) {

        return (

            <div
                className="
                    flex
                    min-h-[420px]
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-slate-900
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        gap-3
                        text-center
                    "
                >

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-indigo-50
                            text-indigo-600
                            dark:bg-indigo-500/10
                            dark:text-indigo-400
                        "
                    >

                        <LoaderCircle

                            size={27}

                            className="animate-spin"

                            aria-hidden="true"

                        />

                    </div>


                    <div>

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-gray-900
                                dark:text-white
                            "
                        >

                            Loading member profile

                        </p>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                            "
                        >

                            Please wait while we retrieve the member details.

                        </p>

                    </div>

                </div>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Member Not Found
    |--------------------------------------------------------------------------
    */

    if (!member) {

        return (

            <div
                className="
                    flex
                    min-h-[420px]
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    p-8
                    text-center
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-slate-900
                "
            >

                <div className="max-w-md">

                    <div
                        className="
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-red-50
                            text-red-500
                            dark:bg-red-500/10
                            dark:text-red-400
                        "
                    >

                        <UserRoundX

                            size={30}

                            aria-hidden="true"

                        />

                    </div>


                    <h2
                        className="
                            mt-5
                            text-xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >

                        Member not found

                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            leading-6
                            text-gray-500
                            dark:text-gray-400
                        "
                    >

                        The member may have been removed or the profile link may
                        be invalid.

                    </p>


                    <button

                        type="button"

                        onClick={() => navigate("/teams")}

                        className="
                            mt-6
                            inline-flex
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
                        "

                    >

                        <ArrowLeft

                            size={18}

                            aria-hidden="true"

                        />

                        Back to Team

                    </button>

                </div>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-6">

            {/*
            |--------------------------------------------------------------------------
            | Navigation
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={() => navigate("/teams")}

                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-gray-700
                    shadow-sm
                    transition
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/20
                    dark:border-gray-800
                    dark:bg-slate-900
                    dark:text-gray-300
                    dark:hover:border-indigo-500/40
                    dark:hover:bg-indigo-500/10
                    dark:hover:text-indigo-400
                "

            >

                <ArrowLeft

                    size={17}

                    aria-hidden="true"

                />

                Back to Team

            </button>


            {/*
            |--------------------------------------------------------------------------
            | Profile
            |--------------------------------------------------------------------------
            */}

            <MemberProfileCard

                user={member}

            />


            {/*
            |--------------------------------------------------------------------------
            | Workload
            |--------------------------------------------------------------------------
            */}

            <MemberWorkload

                workload={workload}

                loading={workloadLoading}

            />


            {/*
            |--------------------------------------------------------------------------
            | Projects And Tasks
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    grid
                    gap-6
                    xl:grid-cols-2
                "
            >

                <MemberProjects

                    projects={projects}

                    loading={projectsLoading}

                />


                <MemberTasks

                    tasks={tasks}

                    loading={tasksLoading}

                />

            </div>


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

                title="Member Activity"

                description={`Recent actions involving ${member.name}`}

            /> */}

        </div>

    );

}