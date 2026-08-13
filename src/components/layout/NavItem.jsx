import clsx from "clsx";

import { NavLink } from "react-router-dom";


export default function NavItem({

    item,

    collapsed = false,

    onClick,

}) {

    const Icon = item.icon;


    return (

        <NavLink

            to={item.path}

            onClick={onClick}

            title={collapsed ? item.name : undefined}

            className={({ isActive }) =>

                clsx(

                    `
                        group
                        flex
                        min-h-11
                        items-center
                        rounded-xl
                        text-sm
                        font-medium
                        transition-all
                        duration-200
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500/40
                    `,

                    collapsed
                        ? "justify-center px-3"
                        : "gap-3 px-4",

                    isActive
                        ? `
                            bg-indigo-600
                            text-white
                            shadow-md
                            shadow-indigo-950/30
                        `
                        : `
                            text-slate-400
                            hover:bg-slate-800
                            hover:text-white
                        `

                )

            }

        >

            {({ isActive }) => (

                <>

                    <Icon

                        size={18}

                        className={clsx(

                            "shrink-0 transition-transform duration-200 group-hover:scale-110",

                            isActive
                                ? "text-white"
                                : "text-slate-400 group-hover:text-white"

                        )}

                    />


                    {!collapsed && (

                        <span className="truncate">

                            {item.name}

                        </span>

                    )}

                </>

            )}

        </NavLink>

    );

}