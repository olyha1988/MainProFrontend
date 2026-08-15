import {

    FaBars,

    FaChevronLeft,

} from "react-icons/fa";

import {

    navigation,

} from "@/constants/navigation";

import NavItem from "./NavItem";


export default function Sidebar({

    collapsed,

    setCollapsed,

}) {

    return (

        <aside
            className={`
                hidden
                h-full
                shrink-0
                flex-col
                overflow-hidden
                border-r
                border-slate-800
                bg-slate-950
                text-white
                shadow-xl
                transition-[width]
                duration-300
                ease-in-out
                md:flex
                ${collapsed
                    ? "w-20"
                    : "w-64"
                }
            `}
        >

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div
                className={`
                    flex
                    h-20
                    shrink-0
                    items-center
                    border-b
                    border-slate-800
                    px-4
                    ${collapsed
                        ? "justify-center"
                        : "justify-between"
                    }
                `}
            >

                {!collapsed && (

                    <div className="flex min-w-0 items-center gap-3">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-indigo-600
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-indigo-950/40
                            "
                        >

                            TM

                        </div>


                        <div className="min-w-0">

                            <h2
                                className="
                                    truncate
                                    text-lg
                                    font-bold
                                    text-white
                                "
                            >

                                TeamTask

                            </h2>


                            <p
                                className="
                                    truncate
                                    text-xs
                                    text-slate-400
                                "
                            >

                                Project Management

                            </p>

                        </div>

                    </div>

                )}


                <button

                    type="button"

                    onClick={() =>

                        setCollapsed(

                            (previous) => !previous

                        )

                    }

                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-slate-400
                        transition-all
                        duration-200
                        hover:bg-slate-800
                        hover:text-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500/40
                    "

                    aria-label={

                        collapsed

                            ? "Expand sidebar"

                            : "Collapse sidebar"

                    }

                >

                    {collapsed

                        ? <FaBars size={17} />

                        : <FaChevronLeft size={16} />

                    }

                </button>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Navigation
            |--------------------------------------------------------------------------
            */}

            <nav
                className="
                    min-h-0
                    flex-1
                    space-y-2
                    overflow-y-auto
                    overflow-x-hidden
                    px-3
                    py-5
                "
            >

                {navigation.map((item) => (

                    <NavItem

                        key={item.path}

                        item={item}

                        collapsed={collapsed}

                    />

                ))}

            </nav>


            {/*
            |--------------------------------------------------------------------------
            | Footer
            |--------------------------------------------------------------------------
            */}

            {!collapsed && (

                <footer
                    className="
                        shrink-0
                        border-t
                        border-slate-800
                        bg-slate-950
                        px-5
                        py-4
                    "
                >

                    <p className="text-xs text-slate-500">

                        © 2026 TeamTask

                    </p>

                </footer>

            )}

        </aside>

    );

}