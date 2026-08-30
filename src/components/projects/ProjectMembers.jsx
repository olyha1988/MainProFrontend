import {

    Users,

} from "lucide-react";


const API_BASE_URL =

    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


const getAvatarUrl = (member) => {

    if (!member?.avatar) {

        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
            member?.name || "User"
        )}&background=2563EB&color=ffffff`;
    }


    if (

        member.avatar.startsWith("http://") ||

        member.avatar.startsWith("https://")

    ) {

        return member.avatar;
    }


    return `${API_BASE_URL}${

        member.avatar.startsWith("/")

            ? member.avatar

            : `/${member.avatar}`

    }`;

};


const getFallbackAvatar = (member) =>

    `https://ui-avatars.com/api/?name=${encodeURIComponent(
        member?.name || "User"
    )}&background=2563EB&color=ffffff`;


export default function ProjectMembers({

    members = [],

}) {

    const visibleMembers =

        members.slice(0, 4);


    const remainingMembers =

        Math.max(

            members.length - 4,

            0

        );


    return (

        <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">

                <Users

                    size={16}

                    aria-hidden="true"

                />


                <span className="font-medium">

                    {members.length}{" "}

                    {members.length === 1

                        ? "Member"

                        : "Members"}

                </span>

            </div>


            <div

                className="flex -space-x-2"

                aria-label={`${members.length} project members`}

            >

                {visibleMembers.map((member) => (

                    <img

                        key={member._id}

                        src={getAvatarUrl(member)}

                        alt={member.name || "Project member"}

                        title={member.name || "Project member"}

                        loading="lazy"

                        onError={(event) => {

                            event.currentTarget.onerror = null;

                            event.currentTarget.src =

                                getFallbackAvatar(member);

                        }}

                        className="
                            h-9
                            w-9
                            rounded-full
                            border-2
                            border-white
                            object-cover
                            shadow-sm
                            dark:border-gray-900
                        "

                    />

                ))}


                {remainingMembers > 0 && (

                    <div

                        title={`${remainingMembers} more members`}

                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-white
                            bg-gray-200
                            text-xs
                            font-semibold
                            text-gray-700
                            shadow-sm
                            dark:border-gray-900
                            dark:bg-gray-700
                            dark:text-gray-200
                        "

                    >

                        +{remainingMembers}

                    </div>

                )}

            </div>

        </div>

    );

}