import {

    useEffect,

} from "react";

import {

    useForm,

} from "react-hook-form";

import {

    yupResolver,

} from "@hookform/resolvers/yup";

import {

    taskSchema,

} from "@/validation/taskValidation";


/*
|--------------------------------------------------------------------------
| Default Values
|--------------------------------------------------------------------------
*/

const defaultValues = {

    title: "",

    description: "",

    project: "",

    assignedTo: "",

    priority: "Medium",

    status: "Todo",

    dueDate: "",

};


/*
|--------------------------------------------------------------------------
| Normalize ID
|--------------------------------------------------------------------------
*/

const getIdValue = (

    value

) => {

    if (!value) {

        return "";

    }


    if (

        typeof value === "string"

    ) {

        return value;

    }


    return (

        value?._id?.toString?.() ||

        ""

    );

};


/*
|--------------------------------------------------------------------------
| Format Date For Input
|--------------------------------------------------------------------------
*/

const formatDateForInput = (

    dateValue

) => {

    if (!dateValue) {

        return "";

    }


    const date =

        new Date(

            dateValue

        );


    if (

        Number.isNaN(

            date.getTime()

        )

    ) {

        return "";

    }


    return date

        .toISOString()

        .split("T")[0];

};


/*
|--------------------------------------------------------------------------
| Task Form
|--------------------------------------------------------------------------
*/

export default function useTaskForm(

    task = null

) {

    const form = useForm({

        resolver:

            yupResolver(

                taskSchema

            ),

        defaultValues,

    });


    const {

        reset,

    } = form;


    /*
    |--------------------------------------------------------------------------
    | Create / Edit Values
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        /*
        |--------------------------------------------------------------------------
        | Create Mode
        |--------------------------------------------------------------------------
        */

        if (!task) {

            reset(

                defaultValues

            );


            return;

        }


        /*
        |--------------------------------------------------------------------------
        | Edit Mode
        |--------------------------------------------------------------------------
        */

        reset({

            title:

                task?.title ||

                "",


            description:

                task?.description ||

                "",


            project:

                getIdValue(

                    task?.project

                ),


            assignedTo:

                getIdValue(

                    task?.assignedTo

                ),


            priority:

                task?.priority ||

                "Medium",


            status:

                task?.status ||

                "Todo",


            dueDate:

                formatDateForInput(

                    task?.dueDate

                ),

        });

    }, [

        task,

        reset,

    ]);


    return form;

}