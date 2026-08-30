import { Loader2 } from "lucide-react";

export default function Button({

    children,

    className = "",

    variant = "primary",

    size = "md",

    loading = false,

    disabled,

    ...props

}) {

    const variants = {

        primary: `
            bg-indigo-600
            text-white
            hover:bg-indigo-700
            focus:ring-indigo-500/30
        `,

        secondary: `
            border
            border-gray-300
            bg-white
            text-gray-700
            hover:bg-gray-50
            dark:border-gray-700
            dark:bg-gray-900
            dark:text-gray-200
            dark:hover:bg-gray-800
            focus:ring-gray-500/20
        `,

        danger: `
            bg-red-600
            text-white
            hover:bg-red-700
            focus:ring-red-500/30
        `,

        success: `
            bg-emerald-600
            text-white
            hover:bg-emerald-700
            focus:ring-emerald-500/30
        `,

    };


    const sizes = {

        sm: "h-9 px-3 text-sm",

        md: "h-11 px-4 text-sm",

        lg: "h-12 px-6 text-base",

    };


    return (

        <button

            disabled={disabled || loading}

            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                font-medium
                leading-none
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                disabled:translate-y-0
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}

            {...props}

        >

            {loading && (

                <Loader2

                    size={16}

                    className="shrink-0 animate-spin"

                />

            )}

            {children}

        </button>

    );

}