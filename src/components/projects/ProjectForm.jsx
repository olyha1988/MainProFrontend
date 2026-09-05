
import {

    useEffect,

} from "react";

import {

    useDispatch,

} from "react-redux";

import {

    useForm,

} from "react-hook-form";

import {

    yupResolver,

} from "@hookform/resolvers/yup";

import {

    FolderKanban,

    Loader2,

    Save,

} from "lucide-react";

import toast from "react-hot-toast";


import useNotifications from "@/hooks/useNotifications";

import getErrorMessage from "@/utils/getErrorMessage";

import {

    projectSchema,

} from "@/validation/projectValidation";

import {

    createProject,

    updateProject,

} from "@/redux/slices/projectSlice";


const inputClassName = `
    w-full
    rounded-xl
    border
    border-gray-300
    bg-white
    px-4
    py-2.5
    text-sm
    text-gray-900
    outline-none
    transition
    placeholder:text-gray-400
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500/20
    dark:border-gray-700
    dark:bg-gray-900
    dark:text-white
    dark:placeholder:text-gray-500
`;


const labelClassName = `
    mb-2
    block
    text-sm
    font-semibold
    text-gray-700
    dark:text-gray-300
`;


const errorClassName = `
    mt-1.5
    text-sm
    font-medium
    text-red-600
    dark:text-red-400
`;


export default function ProjectForm({

    project,

    onSuccess,

}) {

    const dispatch = useDispatch();  // redux


    const {

      notify,

    } = useNotifications();


    const isEditing =

        Boolean(project?._id);


    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors,

            isSubmitting,

        },

    } = useForm({

        resolver: yupResolver(

            projectSchema

        ),

        defaultValues: {

            name: "",

            description: "",

            status: "Planning",

            color: "#2563EB",

        },

    });


    /*
    |--------------------------------------------------------------------------
    | Populate Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        reset({

            name:

                project?.name ||

                "",

            description:

                project?.description ||

                "",

            status:

                project?.status ||

                "Planning",

            color:

                project?.color ||

                "#2563EB",

        });

    }, [

        project,

        reset,

    ]);


    /*
    |--------------------------------------------------------------------------
    | Submit Project
    |--------------------------------------------------------------------------
    */

    const submitHandler = async (data) => {

        try {

            if (isEditing) {

                const updatedProject = await dispatch(

                    updateProject({

                        projectId:

                            project._id,

                        projectData:

                            data,

                    })

                ).unwrap();


                notify({

                  title: "Project Updated",

                 message: `${updatedProject?.name || data.name} was updated successfully.`,

                type: "success",

                entityType: "project",

                entityId:

                updatedProject?._id ||

                project._id,

                });

            }

            else {

                const createdProject = await dispatch(

                    createProject(data)

                ).unwrap();


                notify({

                title: "Project Created",

                 message: `${createdProject?.name || data.name} was created successfully.`,

                type: "success",

                entityType: "project",

                entityId:

                createdProject?._id,

                });

            }


            onSuccess?.();

        }

        catch (error) {

            toast.error(

                getErrorMessage(error)

            );

        }

    };


    return (

        <form

            onSubmit={

                handleSubmit(

                    submitHandler

                )

            }

            className="space-y-6"

            noValidate

        >

            {/*
            |--------------------------------------------------------------------------
            | Project Name
            |--------------------------------------------------------------------------
            */}

            <div>

                <label

                    htmlFor="project-name"

                    className={labelClassName}

                >

                    Project Name

                </label>


                <input

                    id="project-name"

                    type="text"

                    {...register("name")}

                    placeholder="Enter project name"

                    aria-invalid={

                        Boolean(errors.name)

                    }

                    className={inputClassName}

                />


                {errors.name && (

                    <p

                        role="alert"

                        className={errorClassName}

                    >

                        {errors.name.message}

                    </p>

                )}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Description
            |--------------------------------------------------------------------------
            */}

            <div>

                <label

                    htmlFor="project-description"

                    className={labelClassName}

                >

                    Description

                </label>


                <textarea

                    id="project-description"

                    rows={4}

                    {...register("description")}

                    placeholder="Describe the project"

                    aria-invalid={

                        Boolean(

                            errors.description

                        )

                    }

                    className={`${inputClassName} resize-none`}

                />


                {errors.description && (

                    <p

                        role="alert"

                        className={errorClassName}

                    >

                        {

                            errors.description.message

                        }

                    </p>

                )}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */}

            <div>

                <label

                    htmlFor="project-status"

                    className={labelClassName}

                >

                    Project Status

                </label>


                <select

                    id="project-status"

                    {...register("status")}

                    aria-invalid={

                        Boolean(errors.status)

                    }

                    className={inputClassName}

                >

                    <option value="Planning">

                        Planning

                    </option>

                    <option value="Active">

                        Active

                    </option>

                    <option value="Completed">

                        Completed

                    </option>

                    <option value="Archived">

                        Archived

                    </option>

                </select>


                {errors.status && (

                    <p

                        role="alert"

                        className={errorClassName}

                    >

                        {errors.status.message}

                    </p>

                )}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Project Color
            |--------------------------------------------------------------------------
            */}

            <div>

                <label

                    htmlFor="project-color"

                    className={labelClassName}

                >

                    Project Color

                </label>


                <div className="flex items-center gap-4 rounded-xl border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">

                    <input

                        id="project-color"

                        type="color"

                        {...register("color")}

                        className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent p-0"

                    />


                    <div>

                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">

                            Choose an accent color

                        </p>


                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">

                            This color identifies the project across the app.

                        </p>

                    </div>

                </div>


                {errors.color && (

                    <p

                        role="alert"

                        className={errorClassName}

                    >

                        {errors.color.message}

                    </p>

                )}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Submit
            |--------------------------------------------------------------------------
            */}

            <button

                type="submit"

                disabled={isSubmitting}

                className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-blue-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "

            >

                {isSubmitting ? (

                    <>

                        <Loader2

                            size={18}

                            className="animate-spin"

                            aria-hidden="true"

                        />

                        Saving...

                    </>

                ) : (

                    <>

                        {isEditing ? (

                            <Save

                                size={18}

                                aria-hidden="true"

                            />

                        ) : (

                            <FolderKanban

                                size={18}

                                aria-hidden="true"

                            />

                        )}

                        {isEditing

                            ? "Update Project"

                            : "Create Project"}

                    </>

                )}

            </button>

        </form>

    );

}

