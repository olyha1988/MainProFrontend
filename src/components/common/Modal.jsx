import { FiLoader, FiX } from "react-icons/fi";

export default function Modal({

    open,

    onClose,

    loading = false,

    title,

    children,

}) {

    if (!open) {

        return null;

    }

    return (

        <div

            onClick={onClose}

            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/60
                p-4
                backdrop-blur-sm
                animate-in
                fade-in
            "

        >

            <div

                onClick={(e) => e.stopPropagation()}

                className="
                    w-full
                    max-w-lg
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    shadow-2xl
                    dark:bg-gray-900
                "

            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-200
                        px-6
                        py-4
                        dark:border-gray-700
                    "
                >

                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                        {title}

                    </h2>

                    <button

                        type="button"

                        onClick={onClose}

                        disabled={loading}

                        className="
                            rounded-lg
                            p-2
                            text-gray-500
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:text-gray-400
                            dark:hover:bg-gray-800
                            dark:hover:text-white
                        "

                    >

                        <FiX size={20} />

                    </button>

                </div>

                <div
                    className="
                        relative
                        max-h-[70vh]
                        overflow-y-auto
                        p-6
                    "
                >

                    {loading && (

                        <div
                            className="
                                absolute
                                inset-0
                                z-10
                                flex
                                items-center
                                justify-center
                                bg-white/70
                                backdrop-blur-[2px]
                                dark:bg-gray-900/70
                            "
                        >

                            <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-lg dark:bg-gray-800">

                                <FiLoader
                                    size={20}
                                    className="animate-spin text-blue-600"
                                />

                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">

                                    Loading...

                                </span>

                            </div>

                        </div>

                    )}

                    {children}

                </div>

            </div>

        </div>

    );

}