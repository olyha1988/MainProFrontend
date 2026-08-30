import * as yup from "yup";

export const taskSchema = yup.object({

    title: yup
        .string()
        .required("Task title is required")
        .min(3, "Minimum 3 characters")
        .max(150, "Maximum 150 characters"),

    description: yup
        .string()
        .max(1000, "Maximum 1000 characters"),

    project: yup
        .string()
        .required("Please select a project"),

    assignedTo: yup
        .string()
        .nullable(),

    priority: yup
        .string()
        .oneOf([
            "Low",
            "Medium",
            "High",
            "Critical"
        ])
        .required(),

    status: yup
        .string()
        .oneOf([
            "Todo",
            "In Progress",
            "Review",
            "Done",
        ])
        .required(),

    dueDate: yup
        .date()
        .nullable()
        .transform((value, originalValue) =>

            originalValue === ""

                ? null

                : value

        ),

});