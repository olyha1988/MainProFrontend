
import {

    AlertTriangle,

    Loader2,

    Trash2,

} from "lucide-react";

import {

    useDispatch,

} from "react-redux";

import toast from "react-hot-toast";


import Modal from "@/components/common/Modal";

// import useNotifications from "@/hooks/useNotifications";

import getErrorMessage from "@/utils/getErrorMessage";


import {

    deleteProject,

} from "@/redux/slices/projectSlice";


export default function DeleteProjectModal({

    open,

    onClose,

    loading = false,

    project,

}) {

    const dispatch = useDispatch(); 


    // const {

    //     notify,

    // } = useNotifications();


    /*
    |--------------------------------------------------------------------------
    | Delete Project
    |--------------------------------------------------------------------------
    */

    const removeProject = async () => {

        if (

            !project?._id ||

            loading

        ) {

            return;

        }  // If above validation is passed 


        const projectId =

            project._id;


        const projectName =

            project.name ||

            "Project";


        try {

            await dispatch(

                deleteProject(

                    projectId

                )

            ).unwrap();


            // notify({

            //     title: "Project Deleted",

            //     message: `${projectName} was deleted successfully.`,

            //     type: "success",

            //     entityType: "project",

            //     entityId: projectId,

            // });


            onClose();

        }

        catch (error) {

            toast.error(

                getErrorMessage(error)

            );

        }

    };


    return (

        <Modal

            open={open}

            onClose={onClose}

            loading={loading}

            title="Delete Project"

        >

            <div className="space-y-6">

                {/*
                |--------------------------------------------------------------------------
                | Warning
                |--------------------------------------------------------------------------
                */}

                <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">

                        <AlertTriangle

                            size={20}

                            aria-hidden="true"

                        />

                    </div>


                    <div>

                        <h3 className="font-semibold text-gray-900 dark:text-white">

                            Delete this project permanently?

                        </h3>


                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">

                            Are you sure you want to delete{" "}

                            <span className="font-semibold text-gray-900 dark:text-white">

                                {project?.name || "this project"}

                            </span>

                            ? This action cannot be undone.

                        </p>

                    </div>

                </div>


                {/*
                |--------------------------------------------------------------------------
                | Actions
                |--------------------------------------------------------------------------
                */}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <button

                        type="button"

                        onClick={onClose}

                        disabled={loading}

                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-gray-700
                            transition
                            hover:bg-gray-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-gray-500/20
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:border-gray-700
                            dark:bg-gray-900
                            dark:text-gray-300
                            dark:hover:bg-gray-800
                        "

                    >

                        Cancel

                    </button>


                    <button

                        type="button"

                        onClick={removeProject}

                        disabled={

                            loading ||

                            !project?._id

                        }

                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-red-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-red-500/30
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "

                    >

                        {loading ? (

                            <>

                                <Loader2

                                    size={17}

                                    className="animate-spin"

                                    aria-hidden="true"

                                />

                                Deleting...

                            </>

                        ) : (

                            <>

                                <Trash2

                                    size={17}

                                    aria-hidden="true"

                                />

                                Delete Project

                            </>

                        )}

                    </button>

                </div>

            </div>

        </Modal>

    );

}

