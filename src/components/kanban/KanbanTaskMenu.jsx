import {

    useEffect,

    useRef,

    useState,

} from "react";

import {

    FiEdit2,

    FiEye,

    FiMoreVertical,

    FiTrash2,

} from "react-icons/fi";


export default function KanbanTaskMenu({

    onView,

    onEdit,

    onDelete,

}) {

    const [

        open,

        setOpen,

    ] = useState(false);


    const menuRef =

        useRef(null);


    const firstMenuItemRef =

        useRef(null);


    /*
    |--------------------------------------------------------------------------
    | Close Menu
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) {

            return undefined;

        }


        const handleClickOutside = (event) => {

            if (

                menuRef.current &&

                !menuRef.current.contains(event.target)

            ) {

                setOpen(false);

            }

        };


        const handleEscape = (event) => {

            if (event.key === "Escape") {

                setOpen(false);

            }

        };


        document.addEventListener(

            "mousedown",

            handleClickOutside

        );


        document.addEventListener(

            "keydown",

            handleEscape

        );


        firstMenuItemRef.current?.focus();


        return () => {

            document.removeEventListener(

                "mousedown",

                handleClickOutside

            );


            document.removeEventListener(

                "keydown",

                handleEscape

            );

        };

    }, [

        open,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Action Handler
    |--------------------------------------------------------------------------
    */

    const handleAction = (

        event,

        callback

    ) => {

        event.preventDefault();

        event.stopPropagation();


        callback?.();


        setOpen(false);

    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div

            ref={menuRef}

            className="relative"

            onClick={(event) =>

                event.stopPropagation()

            }

        >

            {/*
            |--------------------------------------------------------------------------
            | Menu Trigger
            |--------------------------------------------------------------------------
            */}

            <button

                type="button"

                onPointerDown={(event) =>

                    event.stopPropagation()

                }

                onClick={(event) => {

                    event.preventDefault();

                    event.stopPropagation();


                    setOpen(

                        (previousOpen) =>

                            !previousOpen

                    );

                }}

                className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-gray-400
                    transition-all
                    duration-200
                    hover:bg-gray-100
                    hover:text-gray-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/30
                    dark:text-gray-500
                    dark:hover:bg-slate-800
                    dark:hover:text-gray-200
                    ${
                        open

                            ? `
                                bg-gray-100
                                text-gray-700
                                dark:bg-slate-800
                                dark:text-gray-200
                            `

                            : ""
                    }
                `}

                aria-label="Open task actions"

                aria-haspopup="menu"

                aria-expanded={open}

            >

                <FiMoreVertical

                    size={18}

                    aria-hidden="true"

                />

            </button>


            {/*
            |--------------------------------------------------------------------------
            | Menu
            |--------------------------------------------------------------------------
            */}

            {open && (

                <div
                    role="menu"
                    className="
                        absolute
                        right-0
                        top-10
                        z-[60]
                        w-44
                        overflow-hidden
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-1.5
                        shadow-xl
                        shadow-gray-900/10
                        dark:border-gray-700
                        dark:bg-slate-900
                        dark:shadow-black/30
                    "
                >

                    {onView && (

                        <button

                            ref={firstMenuItemRef}

                            type="button"

                            role="menuitem"

                            onPointerDown={(event) =>

                                event.stopPropagation()

                            }

                            onClick={(event) =>

                                handleAction(

                                    event,

                                    onView

                                )

                            }

                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2.5
                                text-left
                                text-sm
                                font-medium
                                text-gray-700
                                transition-colors
                                hover:bg-gray-100
                                focus:bg-gray-100
                                focus:outline-none
                                dark:text-gray-300
                                dark:hover:bg-slate-800
                                dark:focus:bg-slate-800
                            "

                        >

                            <FiEye

                                size={16}

                                className="
                                    shrink-0
                                    text-gray-400
                                    dark:text-gray-500
                                "

                                aria-hidden="true"

                            />


                            <span>

                                View Task

                            </span>

                        </button>

                    )}


                    {onEdit && (

                        <button

                            ref={

                                !onView

                                    ? firstMenuItemRef

                                    : undefined

                            }

                            type="button"

                            role="menuitem"

                            onPointerDown={(event) =>

                                event.stopPropagation()

                            }

                            onClick={(event) =>

                                handleAction(

                                    event,

                                    onEdit

                                )

                            }

                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2.5
                                text-left
                                text-sm
                                font-medium
                                text-gray-700
                                transition-colors
                                hover:bg-gray-100
                                focus:bg-gray-100
                                focus:outline-none
                                dark:text-gray-300
                                dark:hover:bg-slate-800
                                dark:focus:bg-slate-800
                            "

                        >

                            <FiEdit2

                                size={16}

                                className="
                                    shrink-0
                                    text-gray-400
                                    dark:text-gray-500
                                "

                                aria-hidden="true"

                            />


                            <span>

                                Edit Task

                            </span>

                        </button>

                    )}


                    {onDelete && (

                        <>

                            <div
                                className="
                                    my-1
                                    border-t
                                    border-gray-100
                                    dark:border-gray-800
                                "
                            />


                            <button

                                ref={

                                    !onView && !onEdit

                                        ? firstMenuItemRef

                                        : undefined

                                }

                                type="button"

                                role="menuitem"

                                onPointerDown={(event) =>

                                    event.stopPropagation()

                                }

                                onClick={(event) =>

                                    handleAction(

                                        event,

                                        onDelete

                                    )

                                }

                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-left
                                    text-sm
                                    font-medium
                                    text-red-600
                                    transition-colors
                                    hover:bg-red-50
                                    focus:bg-red-50
                                    focus:outline-none
                                    dark:text-red-400
                                    dark:hover:bg-red-500/10
                                    dark:focus:bg-red-500/10
                                "

                            >

                                <FiTrash2

                                    size={16}

                                    className="shrink-0"

                                    aria-hidden="true"

                                />


                                <span>

                                    Delete Task

                                </span>

                            </button>

                        </>

                    )}

                </div>

            )}

        </div>

    );

}