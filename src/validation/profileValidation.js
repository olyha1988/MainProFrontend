import * as yup from "yup";

/*
|--------------------------------------------------------------------------
| Profile Validation
|--------------------------------------------------------------------------
*/

export const profileSchema = yup.object({

    name: yup
        .string()
        .trim()
        .required("Name is required")
        .min(
            3,
            "Name must be at least 3 characters"
        )
        .max(
            100,
            "Name cannot exceed 100 characters"
        ),

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Enter a valid email address"),

    phone: yup
        .string()
        .trim()
        .nullable()
        .transform((value, originalValue) =>

            originalValue === ""

                ? ""

                : value

        )
        .matches(
            /^[0-9+\-\s()]*$/,
            "Enter a valid phone number"
        )
        .max(
            10,
            "Phone number cannot exceed 10 characters"
        ),

});


/*
|--------------------------------------------------------------------------
| Change Password Validation
|--------------------------------------------------------------------------
*/

export const changePasswordSchema = yup.object({

    currentPassword: yup
        .string()
        .required(
            "Current password is required"
        ),

    newPassword: yup
        .string()
        .required(
            "New password is required"
        )
        .min(
            6,
            "Password must be at least 6 characters"
        )
        .max(
            100,
            "Password cannot exceed 100 characters"
        )
        .notOneOf(

            [

                yup.ref(

                    "currentPassword"

                ),

            ],

            "New password must be different from current password"

        ),

    confirmPassword: yup
        .string()
        .required(
            "Confirm password is required"
        )
        .oneOf(

            [

                yup.ref(

                    "newPassword"

                ),

            ],

            "Passwords do not match"

        ),

});