import {

    useMemo,

    useState,

} from "react";

import {

    FiCalendar,

    FiCheckCircle,

    FiClock,

    FiFolder,

    FiMail,

    FiPhone,

    FiUser,

} from "react-icons/fi";


export default function MemberProfileCard({

    user,

}) {

    /*
    |--------------------------------------------------------------------------
    | Avatar
    |--------------------------------------------------------------------------
    */

    const [avatarError, setAvatarError] =

        useState(false);


    const avatarUrl = useMemo(() => {

        const avatar =

            user?.avatar ||

            user?.profileImage ||

            user?.profilePicture ||

            user?.image;


        if (!avatar) {

            return null;

        }


        if (

            avatar.startsWith("http://") ||

            avatar.startsWith("https://") ||

            avatar.startsWith("data:") ||

            avatar.startsWith("blob:")

        ) {

            return avatar;

        }


        const apiUrl =

            import.meta.env.VITE_API_URL ||

            "http://localhost:8000";


        const baseUrl =

            apiUrl.replace(/\/api\/?$/, "");


        return `${baseUrl}/${avatar.replace(/^\/+/, "")}`;

    }, [user]);


    const showAvatar =

        avatarUrl && !avatarError;


    const initial =

        user?.name
            ?.trim()
            ?.charAt(0)
            ?.toUpperCase() || "U";


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <section
            className="
                overflow-hidden
                rounded-3xl
                border
                border-gray-200
                bg-white
                shadow-sm
                dark:border-gray-800
                dark:bg-slate-900
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Banner
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    relative
                    h-32
                    bg-gradient-to-r
                    from-indigo-600
                    via-blue-600
                    to-violet-600
                "
            >

                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_38%)]
                    "
                />

            </div>


            <div
                className="
                    px-5
                    pb-6
                    sm:px-8
                    sm:pb-8
                "
            >

                {/*
                |--------------------------------------------------------------------------
                | Profile Information
                |--------------------------------------------------------------------------
                */}

                <div
                    className="
                        relative
                        -mt-10
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-end
                    "
                >

                    {/*
                    |--------------------------------------------------------------------------
                    | Avatar
                    |--------------------------------------------------------------------------
                    */}

                    <div
                        className="
                            h-28
                            w-28
                            shrink-0
                            overflow-hidden
                            rounded-2xl
                            border-4
                            border-white
                            bg-gray-100
                            shadow-lg
                            dark:border-slate-900
                            dark:bg-slate-800
                        "
                    >

                        {showAvatar ? (

                            <img

                                src={avatarUrl}

                                alt={`${user?.name || "Member"} profile`}

                                onError={() => setAvatarError(true)}

                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "

                            />

                        ) : (

                            <div
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    bg-gradient-to-br
                                    from-indigo-500
                                    to-blue-600
                                    text-4xl
                                    font-bold
                                    text-white
                                "
                            >

                                {initial}

                            </div>

                        )}

                    </div>


                    {/*
                    |--------------------------------------------------------------------------
                    | Name, Status And Contact
                    |--------------------------------------------------------------------------
                    */}

                    <div
                        className="
                            min-w-0
                            flex-1
                            
                            pb-1
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            <div className="min-w-0">

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-3
                                    "
                                >

                                    <h1
                                        className="
                                            truncate
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                            text-gray-900
                                            dark:text-white
                                            sm:text-3xl
                                        "
                                    >

                                        {user?.name || "Unnamed Member"}

                                    </h1>


                                    <StatusBadge

                                        active={user?.isActive}

                                    />

                                </div>


                                <p
                                    className="
                                        mt-2
                                        flex
                                        min-w-0
                                        items-center
                                        gap-2
                                        text-sm
                                        text-gray-500
                                        dark:text-gray-400
                                        sm:text-base
                                    "
                                >

                                    <FiMail

                                        className="shrink-0"

                                        aria-hidden="true"

                                    />

                                    <span className="truncate">

                                        {user?.email || "No email available"}

                                    </span>

                                </p>

                            </div>


                            <RoleBadge

                                role={user?.role}

                            />

                        </div>

                    </div>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Statistics
                |--------------------------------------------------------------------------
                */}

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        sm:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    <StatCard

                        icon={<FiFolder />}

                        label="Projects"

                        value={user?.projectsCount ?? 0}

                        color="blue"

                    />


                    <StatCard

                        icon={<FiCheckCircle />}

                        label="Completed"

                        value={user?.completedTasks ?? 0}

                        color="green"

                    />


                    <StatCard

                        icon={<FiClock />}

                        label="Pending"

                        value={user?.pendingTasks ?? 0}

                        color="amber"

                    />


                    <StatCard

                        icon={<FiCalendar />}

                        label="Tasks"

                        value={user?.tasksCount ?? 0}

                        color="purple"

                    />

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Member Details
                |--------------------------------------------------------------------------
                */}

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        md:grid-cols-3
                    "
                >

                    <InfoItem

                        icon={<FiPhone />}

                        label="Phone"

                        value={user?.phone || "-"}

                    />


                    <InfoItem

                        icon={<FiCalendar />}

                        label="Joined"

                        value={formatDate(user?.createdAt)}

                    />


                    <InfoItem

                        icon={<FiClock />}

                        label="Last Updated"

                        value={formatDate(user?.updatedAt)}

                    />

                </div>

            </div>

        </section>

    );

}


function RoleBadge({

    role,

}) {

    const normalizedRole =

        role?.toLowerCase();


    const colors = {

        admin:
            `
                bg-red-50
                text-red-700
                ring-red-600/10
                dark:bg-red-500/10
                dark:text-red-400
                dark:ring-red-500/20
            `,

        manager:
            `
                bg-indigo-50
                text-indigo-700
                ring-indigo-600/10
                dark:bg-indigo-500/10
                dark:text-indigo-400
                dark:ring-indigo-500/20
            `,

        member:
            `
                bg-blue-50
                text-blue-700
                ring-blue-600/10
                dark:bg-blue-500/10
                dark:text-blue-400
                dark:ring-blue-500/20
            `,

    };


    return (

        <span
            className={`
                inline-flex
                w-fit
                shrink-0
                items-center
                gap-2
                rounded-full
                px-3
                py-1.5
                text-xs
                font-semibold
                capitalize
                ring-1
                ring-inset
                ${colors[normalizedRole] || colors.member}
            `}
        >

            <FiUser

                aria-hidden="true"

            />

            {role || "Member"}

        </span>

    );

}


function StatusBadge({

    active,

}) {

    return (

        <span
            className={`
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-full
                px-3
                py-1.5
                text-xs
                font-semibold
                ring-1
                ring-inset
                ${
                    active

                        ? `
                            bg-emerald-50
                            text-emerald-700
                            ring-emerald-600/10
                            dark:bg-emerald-500/10
                            dark:text-emerald-400
                            dark:ring-emerald-500/20
                        `

                        : `
                            bg-red-50
                            text-red-700
                            ring-red-600/10
                            dark:bg-red-500/10
                            dark:text-red-400
                            dark:ring-red-500/20
                        `
                }
            `}
        >

            <span
                className={`
                    h-2
                    w-2
                    rounded-full
                    ${
                        active

                            ? "bg-emerald-500"

                            : "bg-red-500"
                    }
                `}
            />

            {active ? "Active" : "Inactive"}

        </span>

    );

}


function StatCard({

    icon,

    label,

    value,

    color,

}) {

    const colors = {

        blue:
            `
                bg-blue-50
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
            `,

        green:
            `
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-500/10
                dark:text-emerald-400
            `,

        amber:
            `
                bg-amber-50
                text-amber-600
                dark:bg-amber-500/10
                dark:text-amber-400
            `,

        purple:
            `
                bg-violet-50
                text-violet-600
                dark:bg-violet-500/10
                dark:text-violet-400
            `,

    };


    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-gray-50/80
                p-5
                transition
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                dark:border-gray-800
                dark:bg-slate-800/60
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-4
                "
            >

                <div className="min-w-0">

                    <p
                        className="
                            text-sm
                            font-medium
                            text-gray-500
                            dark:text-gray-400
                        "
                    >

                        {label}

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
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-xl
                        ${colors[color]}
                    `}
                >

                    {icon}

                </div>

            </div>

        </div>

    );

}


function InfoItem({

    icon,

    label,

    value,

}) {

    return (

        <div
            className="
                min-w-0
                rounded-2xl
                border
                border-gray-200
                bg-gray-50/80
                p-5
                dark:border-gray-800
                dark:bg-slate-800/60
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

                <span className="shrink-0">

                    {icon}

                </span>


                <span className="text-sm">

                    {label}

                </span>

            </div>


            <p
                className="
                    mt-3
                    truncate
                    text-base
                    font-semibold
                    text-gray-900
                    dark:text-white
                "
                title={String(value)}
            >

                {value}

            </p>

        </div>

    );

}


function formatDate(date) {

    if (!date) {

        return "-";

    }


    const parsedDate =

        new Date(date);


    if (Number.isNaN(parsedDate.getTime())) {

        return "-";

    }


    return parsedDate.toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

        }

    );

}