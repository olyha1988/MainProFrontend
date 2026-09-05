import {

    useEffect,

    useMemo,

    useRef,

    useState,

} from "react";

import {

    Check,

    Loader2,

    Trash2,

    UserPlus,

    Users,

} from "lucide-react";

import toast from "react-hot-toast";


import Button from "@/components/common/Button";

import Modal from "@/components/common/Modal";

 import useNotifications from "@/hooks/useNotifications";

import useProjects from "@/hooks/useProjects";

import useUsers from "@/hooks/useUsers";


import getErrorMessage from "@/utils/getErrorMessage";


const API_BASE_URL =

    import.meta.env.VITE_API_BASE_URL ||

    "http://localhost:5000";


const getFallbackAvatar = (user) =>

    `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User"
    )}&background=2563EB&color=ffffff&bold=true`;


const getAvatarUrl = (user) => {

    const avatar = user?.avatar;


    if (!avatar) {

        return getFallbackAvatar(user);

    }


    if (

        avatar.startsWith("http://") ||

        avatar.startsWith("https://")

    ) {

        return avatar;

    }


    return `${API_BASE_URL}${

        avatar.startsWith("/")

            ? avatar

            : `/${avatar}`

    }`;

};


export default function ProjectMembersModal({

    open,

    onClose,

    project,

}) {

    const {

        projectMembers = [],

        fetchProjectMembers,

        addProjectMembers,

        removeProjectMember,

        loading: projectLoading,

    } = useProjects(); // Project Data Importing 


    const {

        users = [],

        fetchUsers,

        loading: usersLoading,

    } = useUsers(); // Users Data Importing 


    const {

     notify,

    } = useNotifications();


    /*
    |--------------------------------------------------------------------------
    | Local State
    |--------------------------------------------------------------------------
    */

    const [

        selectedUsers,

        setSelectedUsers,

    ] = useState([]);


    const [

        addingMembers,

        setAddingMembers,

    ] = useState(false);


    const [

        removingMemberId,

        setRemovingMemberId,

    ] = useState(null); // The ID of the Member that we want to remove


    /*
    |--------------------------------------------------------------------------
    | Loaded Project Reference
    |--------------------------------------------------------------------------
    */

    const loadedProjectRef = useRef(null);


    /*
    |--------------------------------------------------------------------------
    | Load Members And Users
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const projectId = project?._id;


        if (

            !open ||

            !projectId

        ) {

            return;

        }


        /*
         * Prevent the effect from fetching repeatedly when
         * Redux state updates cause the component to re-render.
         */

        if (

            loadedProjectRef.current ===

            projectId

        ) {

            return;

        }


        loadedProjectRef.current =

            projectId;


        fetchProjectMembers(

            projectId

        );


        fetchUsers();

    }, [

        open,

        project?._id,

        fetchProjectMembers,

        fetchUsers,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Reset Modal State When Closed
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (open) {

            return;

        }


        loadedProjectRef.current = null;

        setSelectedUsers([]);

        setRemovingMemberId(null);

    }, [

        open,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Available Users
    |--------------------------------------------------------------------------
    */

    const availableUsers = useMemo(() => {

        const memberIds = new Set(

            projectMembers.map(

                (member) =>

                    member._id

            )

        );


        return users.filter(

            (user) =>

                !memberIds.has(

                    user._id

                )

        );

    }, [

        users,

        projectMembers,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Toggle User Selection
    |--------------------------------------------------------------------------
    */

    const toggleUser = (userId) => {

        setSelectedUsers(

            (currentUsers) =>

                currentUsers.includes(

                    userId

                )

                    ? currentUsers.filter(

                        (id) =>

                            id !== userId

                    )

                    : [

                        ...currentUsers,

                        userId,

                    ]

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Add Members
    |--------------------------------------------------------------------------
    */

    const handleAddMembers = async () => {

        if (

            !project?._id ||

            selectedUsers.length === 0 ||

            addingMembers

        ) {

            return;

        }


        try {

            setAddingMembers(true);


            await addProjectMembers(

                project._id,

                selectedUsers

            );


            const selectedNames = users

                .filter(

                    (user) =>

                        selectedUsers.includes(

                            user._id

                        )

                )

                .map(

                    (user) =>

                        user.name

                );


            notify({

              title: "Members Added",

            message:

            selectedNames.length === 1

            ? `${selectedNames[0]} was added to ${project.name}.`

             : `${selectedNames.length} members were added to ${project.name}.`,

            type: "success",

            entityType: "project",

            entityId: project._id,

            });


            setSelectedUsers([]);


            /*
             * Refresh members after adding.
             * This is an intentional request, not an effect loop.
             */

            await fetchProjectMembers(

                project._id

            );

        }

        catch (error) {

            toast.error(

                getErrorMessage(error)

            );

        }

        finally {

            setAddingMembers(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Remove Member
    |--------------------------------------------------------------------------
    */

    const handleRemove = async (member) => {

        if (

            !project?._id ||

            !member?._id ||

            removingMemberId

        ) {

            return;

        }


        try {

            setRemovingMemberId(

                member._id

            );  // setting the memberID ( Hari ) to state variable


            await removeProjectMember(

                project._id,

                member._id

            );


            notify({

             title: "Member Removed",

            message: `${member.name} was removed from ${project.name}.`,

            type: "success",

             entityType: "project",

            entityId: project._id,

            });


            /*
             * Refresh members after removing.
             */

            await fetchProjectMembers(

                project._id

            );

        }

        catch (error) {

            toast.error(

                getErrorMessage(error)

            );

        }

        finally {

            setRemovingMemberId(null);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Close Modal
    |--------------------------------------------------------------------------
    */

    const handleClose = () => {

        if (

            addingMembers ||

            removingMemberId

        ) {

            return;

        }


        setSelectedUsers([]);

        onClose();

    };


    if (

        !open ||

        !project

    ) {

        return null;

    }


    const modalLoading =

        projectLoading ||

        usersLoading;


    return (

        <Modal

            open={open}

            onClose={handleClose}

            title="Project Members"

            loading={modalLoading}

        >

            <div className="space-y-8">

                {/*
                |--------------------------------------------------------------------------
                | Current Members
                |--------------------------------------------------------------------------
                */}

                <section>

                    <div className="mb-4 flex items-center justify-between gap-4">

                        <div>

                            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">

                                <Users

                                    size={18}

                                    aria-hidden="true"

                                />

                                Current Members

                            </h3>


                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                                Members currently assigned to this project.

                            </p>

                        </div>


                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">

                            {projectMembers.length}

                        </span>

                    </div>


                    {projectMembers.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-800/40">

                            <Users

                                size={32}

                                className="mx-auto text-gray-400"

                                aria-hidden="true"

                            />


                            <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">

                                No members have been added yet.

                            </p>

                        </div>

                    ) : (

                        <div className="space-y-3">

                            {projectMembers.map(

                                (member) => {

                                    const isOwner =

                                        project.owner?._id ===

                                        member._id;


                                    const isRemoving =

                                        removingMemberId ===

                                        member._id;


                                    return (

                                        <div

                                            key={member._id}

                                            className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900"

                                        >

                                            <div className="flex min-w-0 items-center gap-3">

                                                <img

                                                    src={getAvatarUrl(

                                                        member

                                                    )}

                                                    alt={

                                                        member?.name ||

                                                        "Project member"

                                                    }

                                                    onError={(event) => {

                                                        event.currentTarget.onerror = null;

                                                        event.currentTarget.src =

                                                            getFallbackAvatar(

                                                                member

                                                            );

                                                    }}

                                                    className="h-11 w-11 shrink-0 rounded-full bg-gray-200 object-cover dark:bg-gray-700"

                                                />


                                                <div className="min-w-0">

                                                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">

                                                        {member.name || "Unnamed User"}

                                                    </p>


                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">

                                                        {member.email || "Email unavailable"}

                                                    </p>

                                                </div>

                                            </div>


                                            {isOwner ? (

                                                <span className="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">

                                                    Owner

                                                </span>

                                            ) : (

                                                <button

                                                    type="button"

                                                    disabled={

                                                        isRemoving ||

                                                        addingMembers ||

                                                        Boolean(

                                                            removingMemberId

                                                        )

                                                    }

                                                    onClick={() =>

                                                        handleRemove(

                                                            member

                                                        )

                                                    }

                                                    aria-label={`Remove ${

                                                        member.name ||

                                                        "member"

                                                    }`}

                                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30 disabled:cursor-not-allowed disabled:opacity-50"

                                                >

                                                    {isRemoving ? (

                                                        <Loader2

                                                            size={15}

                                                            className="animate-spin"

                                                            aria-hidden="true"

                                                        />

                                                    ) : (

                                                        <Trash2

                                                            size={15}

                                                            aria-hidden="true"

                                                        />

                                                    )}

                                                    Remove

                                                </button>

                                            )}

                                        </div>

                                    );

                                }

                            )}

                        </div>

                    )}

                </section>


                {/*
                |--------------------------------------------------------------------------
                | Available Users
                |--------------------------------------------------------------------------
                */}

                <section>

                    <div className="mb-4">

                        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">

                            <UserPlus

                                size={18}

                                aria-hidden="true"

                            />

                            Add Members

                        </h3>


                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">

                            Select users to add to this project.

                        </p>

                    </div>


                    {availableUsers.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-800/40">

                            <Check

                                size={32}

                                className="mx-auto text-gray-400"

                                aria-hidden="true"

                            />


                            <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">

                                All available users are already members.

                            </p>

                        </div>

                    ) : (

                        <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">

                            {availableUsers.map(

                                (user) => {

                                    const isSelected =

                                        selectedUsers.includes(

                                            user._id

                                        );


                                    return (

                                        <label

                                            key={user._id}

                                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${

                                                isSelected

                                                    ? "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"

                                                    : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"

                                            }`}

                                        >

                                            <input

                                                type="checkbox"

                                                checked={isSelected}

                                                disabled={

                                                    addingMembers ||

                                                    Boolean(

                                                        removingMemberId

                                                    )

                                                }

                                                onChange={() =>

                                                    toggleUser(

                                                        user._id

                                                    )

                                                }

                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"

                                            />


                                            <img

                                                src={getAvatarUrl(

                                                    user

                                                )}

                                                alt={

                                                    user?.name ||

                                                    "User"

                                                }

                                                onError={(event) => {

                                                    event.currentTarget.onerror = null;

                                                    event.currentTarget.src =

                                                        getFallbackAvatar(

                                                            user

                                                        );

                                                }}

                                                className="h-10 w-10 shrink-0 rounded-full bg-gray-200 object-cover dark:bg-gray-700"

                                            />


                                            <div className="min-w-0">

                                                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">

                                                    {user.name ||

                                                        "Unnamed User"}

                                                </p>


                                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">

                                                    {user.email ||

                                                        "Email unavailable"}

                                                </p>

                                            </div>

                                        </label>

                                    );

                                }

                            )}

                        </div>

                    )}


                    <div className="mt-6 flex justify-end">

                       <Button

    type="button"

    disabled={

        selectedUsers.length === 0 ||

        addingMembers ||

        Boolean(removingMemberId)

    }

    onClick={handleAddMembers}

>

    <span className="inline-flex items-center justify-center gap-2">

        {addingMembers ? (

            <>

                <Loader2

                    size={17}

                    className="shrink-0 animate-spin"

                    aria-hidden="true"

                />

                <span>

                    Adding Members...

                </span>

            </>

        ) : (

            <>

                <UserPlus

                    size={17}

                    className="shrink-0"

                    aria-hidden="true"

                />

                <span>

                    Add Selected ({selectedUsers.length})

                </span>

            </>

        )}

    </span>

</Button>

                    </div>

                </section>

            </div>

        </Modal>

    );

}