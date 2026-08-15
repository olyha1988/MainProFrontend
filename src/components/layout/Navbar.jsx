import {

    FaBars,

} from "react-icons/fa";

import ThemeToggle from "@/components/theme/ThemeToggle";
import NotificationBell from "@/components/notifications/NotificationBell";
import ProfileDropdown from "./ProfileDropdown";


export default function Navbar({

    setOpen,

}) {

    return (

        <header
            className="
                sticky
                top-0
                z-30
                flex
                h-20
                shrink-0
                items-center
                justify-between
                border-b
                border-gray-200/80
                bg-white/90
                px-4
                shadow-sm
                backdrop-blur-xl
                dark:border-gray-800
                dark:bg-slate-900/90
                sm:px-6
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Left
            |--------------------------------------------------------------------------
            */}

            <div className="flex min-w-0 items-center gap-4">

                <button

                    type="button"

                    onClick={() =>

                        setOpen(true)

                    }

                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-gray-600
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500/40
                        dark:text-gray-300
                        dark:hover:bg-slate-800
                        dark:hover:text-white
                        md:hidden
                    "

                    aria-label="Open navigation menu"

                >

                    <FaBars size={18} />

                </button>


                <div className="relative hidden md:block">

                    {/* <FaSearch
                        className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-sm
                            text-gray-400
                            dark:text-gray-500
                        "
                    /> */}


                    {/* <input

                        type="search"

                        placeholder="Search..."

                        className="
                            h-11
                            w-72
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            py-2
                            pl-11
                            pr-4
                            text-sm
                            text-gray-900
                            shadow-sm
                            outline-none
                            transition-all
                            placeholder:text-gray-400
                            focus:border-indigo-500
                            focus:bg-white
                            focus:ring-4
                            focus:ring-indigo-500/10
                            dark:border-gray-700
                            dark:bg-slate-800
                            dark:text-white
                            dark:placeholder:text-gray-500
                            dark:focus:border-indigo-500
                            dark:focus:bg-slate-800
                            lg:w-80
                        "

                        aria-label="Search"

                    /> */}

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Right
            |--------------------------------------------------------------------------
            */}

            <div className="flex shrink-0 items-center gap-2">

                <NotificationBell />

                <ThemeToggle />

                <div className="ml-1">

                    <ProfileDropdown />

                </div>

            </div>

        </header>

    );

}