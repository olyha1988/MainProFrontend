
import {

    useEffect,

    useRef,

    useState,

} from "react";

import {

    MoreVertical,

    Pencil,

    Trash2,

} from "lucide-react";


export default function TaskMenu({

    task,

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
    | Close Menu On Outside Click
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

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

            if (

                event.key === "Escape"

            ) {

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

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Edit Task
    |--------------------------------------------------------------------------
    */

    const handleEdit = () => {

        onEdit(task);

        setOpen(false);

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Task
    |--------------------------------------------------------------------------
    */

    const handleDelete = () => {

        onDelete(task);

        setOpen(false);

    };


    return (

        <div

            ref={menuRef}

            className="relative"

        >

            {/*
            |--------------------------------------------------------------------------
            | Menu Trigger
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

                aria-label="Open task actions"

                aria-expanded={open}

                className={`
                    inline-flex
                    h-9
                    w-9
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    hover:text-gray-900
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    dark:text-gray-400
                    dark:hover:bg-gray-800
                    dark:hover:text-white
                    ${
                        open
                            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                            : ""
                    }
                `}

            >

                <MoreVertical

                    size={18}

                />

            </button>


            {/*
            |--------------------------------------------------------------------------
            | Dropdown Menu
            |--------------------------------------------------------------------------
            */}

            {open && (

                <div className="absolute right-0 z-30 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl shadow-gray-200/60 dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/30">

                    <button

                        type="button"

                        onClick={handleEdit}

                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"

                    >

                        <Pencil

                            size={16}

                            className="text-gray-500 dark:text-gray-400"

                        />

                        Edit Task

                    </button>


                    <div className="my-1 border-t border-gray-100 dark:border-gray-800" />


                    <button

                        type="button"

                        onClick={handleDelete}

                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:text-red-400 dark:hover:bg-red-950/30"

                    >

                        <Trash2

                            size={16}

                        />

                        Delete Task

                    </button>

                </div>

            )}

        </div>

    );

}

