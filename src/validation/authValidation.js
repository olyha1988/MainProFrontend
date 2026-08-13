import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters"),
});

export const registerSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(2),

    email: yup
        .string()
        .email("Enter a valid email")
        .required(),

    phone: yup
        .string()
        .nullable(),

    password: yup
        .string()
        .required()
        .min(6),

    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("password")],
            "Passwords do not match"
        )
        .required(),
});