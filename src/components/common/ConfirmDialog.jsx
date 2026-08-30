import { LoaderCircle, TriangleAlert, X } from "lucide-react";

export default function ConfirmDialog({

    open,

    title = "Confirm Action",

    description = "Are you sure you want to continue?",

    confirmText = "Confirm",

    cancelText = "Cancel",

    confirmVariant = "danger",

    loading = false,

    onConfirm,

    onCancel,

}) {

    

    if (!open) {

        return null;

    }


    const confirmButtonClass =

        confirmVariant === "danger"

            ? "bg-red-600 hover:bg-red-700 focus:ring-red-500/30"

            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/30";


    return (

        <div

            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"

            onMouseDown={(event) => {

                if (

                    event.target ===

                    event.currentTarget

                ) {

                    onCancel?.();

                }

            }}

        >

            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">

                {/* Header */}

                <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">

                    <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">

                            <TriangleAlert size={24} />

                        </div>


                        <div>

                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">

                                {title}

                            </h2>

                        </div>

                    </div>


                    <button

                        type="button"

                        onClick={onCancel}

                        disabled={loading}

                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-200"

                    >

                        <X size={18} />

                    </button>

                </div>


                {/* Body */}

                <div className="px-6 py-5">

                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">

                        {description}

                    </p>

                </div>


                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/70">

                    <button

                        type="button"

                        onClick={onCancel}

                        disabled={loading}

                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"

                    >

                        {cancelText}

                    </button>


                    <button

                        type="button"

                        onClick={onConfirm}

                        disabled={loading}

                        className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${confirmButtonClass}`}

                    >

                        {loading && (

                            <LoaderCircle

                                size={16}

                                className="animate-spin"

                            />

                        )}

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}