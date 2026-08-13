
import {

    useEffect,

    useMemo,

    useRef,

    useState,

} from "react";

import {

    FaChevronDown,

    FaSignOutAlt,

    FaUserCircle,

} from "react-icons/fa";

import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    useNavigate,

} from "react-router-dom";

import {

    logout,

    selectCurrentUser,

} from "@/redux/slices/authSlice";


const API_BASE_URL =

    import.meta.env.VITE_API_BASE_URL;

       


export default function ProfileDropdown() {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const [

        open,

        setOpen,

    ] = useState(false);


    const [

        avatarError,

        setAvatarError,

    ] = useState(false);


    const ref = useRef(null);


    /*
    |--------------------------------------------------------------------------
    | Current User
    |--------------------------------------------------------------------------
    */

    const user = useSelector(

        selectCurrentUser

    );


    /*
    |--------------------------------------------------------------------------
    | User Display Name
    |--------------------------------------------------------------------------
    */

    const displayName =

        user?.name ||

        user?.fullName ||

        user?.username ||

        "User";


    /*
    |--------------------------------------------------------------------------
    | Avatar URL
    |--------------------------------------------------------------------------
    */

    const avatarUrl = useMemo(() => {

        const avatar =

            user?.avatar?.url ||

            user?.avatar ||

            user?.profileImage ||

            user?.image ||

            "";


        if (!avatar) {

            return "";

        }


        if (

            avatar.startsWith(

                "http://"

            ) ||

            avatar.startsWith(

                "https://"

            ) ||

            avatar.startsWith(

                "data:"

            ) ||

            avatar.startsWith(

                "blob:"

            )

        ) {

            return avatar;

        }


        return `${API_BASE_URL}${

            avatar.startsWith("/")

                ? avatar

                : `${avatar}`

        }`;

    }, [

        user,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Reset Avatar Error
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        setAvatarError(false);

    }, [

        avatarUrl,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Initials
    |--------------------------------------------------------------------------
    */

    const initials = useMemo(() => {

        return displayName

            .trim()

            .split(/\s+/)

            .filter(Boolean)

            .map(

                (word) =>

                    word.charAt(0)

            )

            .join("")

            .slice(0, 2)

            .toUpperCase() || "U";

    }, [

        displayName,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Close Outside
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const handleOutsideClick = (

            event

        ) => {

            if (

                ref.current &&

                !ref.current.contains(

                    event.target

                )

            ) {

                setOpen(false);

            }

        };


        document.addEventListener(

            "mousedown",

            handleOutsideClick

        );


        return () => {

            document.removeEventListener(

                "mousedown",

                handleOutsideClick

            );

        };

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    const logoutUser = () => {

        dispatch(

            logout()

        );


        setOpen(false);


        navigate(

            "/"

        );

    };


    /*
    |--------------------------------------------------------------------------
    | Avatar Component
    |--------------------------------------------------------------------------
    */

    const Avatar = ({

        size = "small",

    }) => {

        const sizeClass =

            size === "large"

                ? "h-12 w-12"

                : "h-10 w-10";


        if (

            avatarUrl &&

            !avatarError

        ) {

            return (

                <img

                    key={avatarUrl}

                    src={avatarUrl}

                    alt={`${displayName} avatar`}

                    className={`${sizeClass} shrink-0 rounded-full border border-gray-200 object-cover dark:border-slate-700`}

                    onError={() => {

                        setAvatarError(true);

                    }}

                />

            );

        }


        return (

            <div

                className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white`}

            >

                {initials}

            </div>

        );

    };


    return (

        <div

            ref={ref}

            className="relative"

        >

            {/*
            |--------------------------------------------------------------------------
            | Profile Button
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onClick={() =>

                    setOpen(

                        (current) =>

                            !current

                    )

                }

                className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-slate-800"

                aria-expanded={open}

                aria-haspopup="menu"

            >

                <Avatar />


                <div className="hidden max-w-44 text-left md:block">

                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">

                        {displayName}

                    </p>


                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">

                        {

                            user?.email ||

                            "No email"

                        }

                    </p>

                </div>


                <FaChevronDown

                    size={12}

                    className={`transition-transform ${
                        open

                            ? "rotate-180"

                            : ""
                    }`}

                />

            </button>


            {/*
            |--------------------------------------------------------------------------
            | Dropdown
            |--------------------------------------------------------------------------
            */}

            {open && (

                <div

                    role="menu"

                    className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"

                >

                    {/*
                    |--------------------------------------------------------------------------
                    | User Details
                    |--------------------------------------------------------------------------
                    */}

                    <div className="border-b border-gray-200 px-4 py-4 dark:border-slate-700">

                        <div className="flex items-center gap-3">

                            <Avatar

                                size="large"

                            />


                            <div className="min-w-0">

                                <p className="truncate font-semibold text-gray-900 dark:text-white">

                                    {displayName}

                                </p>


                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">

                                    {

                                        user?.email ||

                                        "No email"

                                    }

                                </p>


                                {user?.role && (

                                    <p className="mt-1 text-xs capitalize text-blue-600 dark:text-blue-400">

                                        {user.role}

                                    </p>

                                )}

                            </div>

                        </div>

                    </div>


                    {/*
                    |--------------------------------------------------------------------------
                    | Actions
                    |--------------------------------------------------------------------------
                    */}

                    <div className="p-2">

                        <button

                            type="button"

                            role="menuitem"

                            onClick={() => {

                                navigate(

                                    "/profile"

                                );

                                setOpen(false);

                            }}

                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-slate-800"

                        >

                            <FaUserCircle />

                            My Profile

                        </button>


                        <button

                            type="button"

                            role="menuitem"

                            onClick={logoutUser}

                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"

                        >

                            <FaSignOutAlt />

                            Logout

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}

