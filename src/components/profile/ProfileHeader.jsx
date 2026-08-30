import {

    CalendarDays,

    Mail,

    Phone,

    ShieldCheck,

} from "lucide-react";


export default function ProfileHeader({

    profile,

}) {

    /*
    |--------------------------------------------------------------------------
    | Profile Values
    |--------------------------------------------------------------------------
    */

    const profileName =

        profile?.name || "User Profile";


    const profileRole =

        profile?.role || "Member";


    const profileEmail =

        profile?.email || "Not available";


    const profilePhone =

        profile?.phone || "Not provided";


    /*
    |--------------------------------------------------------------------------
    | Avatar
    |--------------------------------------------------------------------------
    */

    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(

        profileName

    )}&background=4f46e5&color=ffffff&size=256&bold=true`;


    /*
    |--------------------------------------------------------------------------
    | Backend Base URL
    |--------------------------------------------------------------------------
    */

    const apiBaseUrl = (

        import.meta.env.VITE_API_URL ||

        ""

    ).replace(

        /\/api\/?$/,

        ""

    );


    /*
    |--------------------------------------------------------------------------
    | Avatar URL
    |--------------------------------------------------------------------------
    */

    const avatarUrl = profile?.avatar

        ? profile.avatar.startsWith("http://") ||

          profile.avatar.startsWith("https://")

            ? profile.avatar

            : `${apiBaseUrl}${

                profile.avatar.startsWith("/")

                    ? profile.avatar

                    : `/${profile.avatar}`

            }`

        : avatarFallback;


    /*
    |--------------------------------------------------------------------------
    | Joined Date
    |--------------------------------------------------------------------------
    */

    const joinedDate = (() => {

        if (!profile?.createdAt) {

            return "Not available";

        }


        const date = new Date(

            profile.createdAt

        );


        if (Number.isNaN(date.getTime())) {

            return "Not available";

        }


        return date.toLocaleDateString(

            "en-US",

            {

                month: "long",

                year: "numeric",

            }

        );

    })();


    /*
    |--------------------------------------------------------------------------
    | Profile Details
    |--------------------------------------------------------------------------
    */

    const profileDetails = [

        {

            label: "Email",

            value: profileEmail,

            icon: Mail,

            iconClassName: `
                bg-blue-50
                text-blue-600
                dark:bg-blue-950/40
                dark:text-blue-400
            `,

        },

        {

            label: "Phone",

            value: profilePhone,

            icon: Phone,

            iconClassName: `
                bg-purple-50
                text-purple-600
                dark:bg-purple-950/40
                dark:text-purple-400
            `,

        },

        {

            label: "Role",

            value: profileRole,

            icon: ShieldCheck,

            capitalize: true,

            iconClassName: `
                bg-amber-50
                text-amber-600
                dark:bg-amber-950/40
                dark:text-amber-400
            `,

        },

        {

            label: "Joined",

            value: joinedDate,

            icon: CalendarDays,

            iconClassName: `
                bg-emerald-50
                text-emerald-600
                dark:bg-emerald-950/40
                dark:text-emerald-400
            `,

        },

    ];


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
                dark:bg-gray-900
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Cover
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    relative
                    h-28
                    overflow-hidden
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-purple-600
                    sm:h-36
                "
            >

                <div
                    className="
                        absolute
                        -right-16
                        -top-20
                        h-56
                        w-56
                        rounded-full
                        bg-white/10
                        blur-2xl
                    "
                />


                <div
                    className="
                        absolute
                        -bottom-24
                        left-1/3
                        h-48
                        w-48
                        rounded-full
                        bg-indigo-300/20
                        blur-3xl
                    "
                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Profile Information
            |--------------------------------------------------------------------------
            */}

            <div className="px-5 pb-6 sm:px-7 sm:pb-7">

                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-end
                        "
                    >

                      <img
    key={profile?.avatar || avatarUrl}
    src={avatarUrl}
    onError={(event) => {

        event.currentTarget.onerror = null;

        event.currentTarget.src = avatarFallback;

    }}
    alt={`${profileName} profile picture`}
    className="
        relative
        z-10
        -mt-14
        h-28
        w-28
        rounded-2xl
        border-4
        border-white
        bg-white
        object-cover
        shadow-lg
        ring-1
        ring-gray-200
        dark:border-gray-900
        dark:bg-gray-900
        dark:ring-gray-700
        sm:-mt-16
        sm:h-32
        sm:w-32
    "
/>


                        <div className="min-w-0 pb-1">

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

                                {profileName}

                            </h1>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    font-medium
                                    capitalize
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >

                                {profileRole}

                            </p>

                        </div>

                    </div>


                    <span
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-emerald-200
                            bg-emerald-50
                            px-3
                            py-1.5
                            text-sm
                            font-medium
                            text-emerald-700
                            dark:border-emerald-900/70
                            dark:bg-emerald-950/40
                            dark:text-emerald-400
                        "
                    >

                        <span className="relative flex h-2.5 w-2.5">

                            <span
                                className="
                                    absolute
                                    inline-flex
                                    h-full
                                    w-full
                                    animate-ping
                                    rounded-full
                                    bg-emerald-400
                                    opacity-50
                                "
                            />

                            <span
                                className="
                                    relative
                                    inline-flex
                                    h-2.5
                                    w-2.5
                                    rounded-full
                                    bg-emerald-500
                                "
                            />

                        </span>

                        Active Account

                    </span>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Contact Details
                |--------------------------------------------------------------------------
                */}

                <div
                    className="
                        mt-6
                        grid
                        gap-3
                        border-t
                        border-gray-200
                        pt-6
                        dark:border-gray-800
                        sm:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    {profileDetails.map((detail) => {

                        const Icon = detail.icon;


                        return (

                            <div

                                key={detail.label}

                                className="
                                    flex
                                    min-w-0
                                    items-start
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-gray-50/70
                                    p-4
                                    transition-colors
                                    hover:bg-gray-100
                                    dark:border-gray-800
                                    dark:bg-gray-950/40
                                    dark:hover:bg-gray-800/70
                                "

                            >

                                <div
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${detail.iconClassName}
                                    `}
                                >

                                    <Icon size={18} />

                                </div>


                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-gray-400
                                            dark:text-gray-500
                                        "
                                    >

                                        {detail.label}

                                    </p>


                                    <p
                                        title={detail.value}
                                        className={`
                                            mt-1
                                            truncate
                                            text-sm
                                            font-semibold
                                            text-gray-700
                                            dark:text-gray-200
                                            ${detail.capitalize
                                                ? "capitalize"
                                                : ""
                                            }
                                        `}
                                    >

                                        {detail.value}

                                    </p>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

}