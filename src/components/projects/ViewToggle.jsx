import {

    Grid2X2,

    List,

} from "lucide-react";


export default function ViewToggle({

    view,

    setView,

}) {

    const buttonClass = (active) => `
        inline-flex
        h-10
        w-10
        items-center
        justify-center
        transition
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/20
        ${
            active
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        }
    `;


    return (

        <div

            role="group"

            aria-label="Project view"

            className="inline-flex overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"

        >

            <button

                type="button"

                aria-label="Grid view"

                aria-pressed={view === "grid"}

                onClick={() =>

                    setView("grid")

                }

                className={

                    buttonClass(

                        view === "grid"

                    )

                }

            >

                <Grid2X2

                    size={18}

                    aria-hidden="true"

                />

            </button>


            <div className="w-px bg-gray-200 dark:bg-gray-700" />


            <button

                type="button"

                aria-label="List view"

                aria-pressed={view === "list"}

                onClick={() =>

                    setView("list")

                }

                className={

                    buttonClass(

                        view === "list"

                    )

                }

            >

                <List

                    size={18}

                    aria-hidden="true"

                />

            </button>

        </div>

    );

}