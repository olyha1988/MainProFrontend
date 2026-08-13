import {

    useEffect,

    useRef,

    useState,

} from "react";

import {

    Bell,

} from "lucide-react";

// import useNotifications from "@/hooks/useNotifications";

import NotificationDropdown from "./NotificationDropdown";


export default function NotificationBell() {

    const [

        open,

        setOpen,

    ] = useState(false);


    const containerRef = useRef(

        null

    );


    // const {

    //     unreadCount,

    // } = useNotifications();


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

                containerRef.current &&

                !containerRef.current.contains(

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


    return (

        <div

            ref={containerRef}

            className="relative"

        >

            <button

                type="button"

                onClick={() =>

                    setOpen(

                        (current) =>

                            !current

                    )

                }

                className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"

                aria-label="Notifications"

            >

                <Bell size={21} />


                {/* {

                    unreadCount > 0 && (

                        <span className="absolute right-0.5 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">

                            {

                                unreadCount > 99

                                    ? "99+"

                                    : unreadCount

                            }

                        </span>

                    )

                } */}

            </button>


            <NotificationDropdown

                open={open}

                onClose={() =>

                    setOpen(false)

                }

            />

        </div>

    );

}