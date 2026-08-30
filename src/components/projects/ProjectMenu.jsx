
import {

    useEffect,

    useRef,

    useState,

} from "react";

import {

    Edit3,

    MoreVertical,

    Trash2,

} from "lucide-react";


export default function ProjectMenu({

    project,

    onEdit,

    onDelete,

}) {

    const [

        open,

        setOpen,

    ] = useState(false);


    const menuRef = useRef(null);


    /*
    |--------------------------------------------------------------------------
    | Close Menu
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) {

            return;

        }


        const handleOutsideClick = (event) => {

            if (

                menuRef.current &&

                !menuRef.current.contains(

                    event.target

                )

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

            handleOutsideClick

        );


        document.addEventListener(

            "keydown",

            handleEscape

        );


        return () => {

            document.removeEventListener(

                "mousedown",

                handleOutsideClick

            );


            document.removeEventListener(

                "keydown",

                handleEscape

            );

        };

    }, [open]);


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
            | Trigger
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

                aria-label={`Open actions for ${project?.name || "project"}`}

                aria-expanded={open}

                aria-haspopup="menu"

                className="
                    inline-flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    hover:text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/20
                    dark:text-gray-400
                    dark:hover:bg-gray-800
                    dark:hover:text-white
                "

            >

                <MoreVertical

                    size={19}

                    aria-hidden="true"

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

                    className="
                        absolute
                        right-0
                        top-11
                        z-50
                        w-48
                        overflow-hidden
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-1.5
                        shadow-xl
                        dark:border-gray-700
                        dark:bg-gray-900
                    "

                >

                    <button

                        type="button"

                        role="menuitem"

                        onClick={() => {

                            setOpen(false);

                            onEdit?.(project);

                        }}

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
                            transition
                            hover:bg-gray-100
                            focus:outline-none
                            focus:bg-gray-100
                            dark:text-gray-300
                            dark:hover:bg-gray-800
                            dark:focus:bg-gray-800
                        "

                    >

                        <Edit3

                            size={16}

                            aria-hidden="true"

                        />

                        Edit Project

                    </button>


                    <button

                        type="button"

                        role="menuitem"

                        onClick={() => {

                            setOpen(false);

                            onDelete?.(project);

                        }}

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
                            transition
                            hover:bg-red-50
                            focus:outline-none
                            focus:bg-red-50
                            dark:text-red-400
                            dark:hover:bg-red-950/40
                            dark:focus:bg-red-950/40
                        "

                    >

                        <Trash2

                            size={16}

                            aria-hidden="true"

                        />

                        Delete Project

                    </button>

                </div>

            )}

        </div>

    );

}

