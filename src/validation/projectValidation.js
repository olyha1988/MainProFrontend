import * as yup from "yup";


export const projectSchema = yup.object({

    name: yup
        .string()
        .required("Project name is required")
        .min(
            3,
            "Project name must contain minimum 3 characters"
        ),


    description: yup
        .string()
        .max(
            500,
            "Description cannot exceed 500 characters"
        ),


    status: yup
        .string()
        .oneOf([
            "Planning",
            "Active",
            "Completed",
            "Archived"
        ])
        .required(
            "Status is required"
        ),


    color: yup
        .string()
        .required(
            "Project color is required"
        )

});