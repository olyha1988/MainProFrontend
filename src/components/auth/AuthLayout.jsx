import { Link } from "react-router-dom";

export default function AuthLayout({

    logo,

    title,

    subtitle,

    children,

    footerText,

    footerLink,

    footerLabel,
footerContent,

}) {

    return (

        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-100
                via-white
                to-slate-200
                p-4
                dark:from-gray-950
                dark:via-gray-900
                dark:to-slate-950
            "
        >

            <div className="w-full max-w-md">

                <div
                    className="
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                        p-8
                        shadow-2xl
                        dark:border-gray-800
                        dark:bg-gray-900
                    "
                >

                    {/* Logo */}

                    <div className="mb-8 flex justify-center">

                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-indigo-600
                                text-2xl
                                font-bold
                                text-white
                                shadow-lg
                            "
                        >

                            {logo}

                        </div>

                    </div>

                    {/* Header */}

                    <div className="mb-8 text-center">

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">

                            {title}

                        </h1>

                        {subtitle && (

                            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">

                                {subtitle}

                            </p>

                        )}

                    </div>

                    {/* Form */}

                    <div>

                        {children}

                    </div>


                    {/* footerContent */}

                    <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-gray-800">
  <p className="text-sm text-gray-600 dark:text-gray-400">
    {footerContent}{" "}
  </p>
</div>

                    {/* Footer */}

                    <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-gray-800">

                        <p className="text-sm text-gray-600 dark:text-gray-400">

                            {footerText}{" "}

                            <Link

                                to={footerLink}

                                className="
                                    font-semibold
                                    text-indigo-600
                                    transition-colors
                                    hover:text-indigo-700
                                    dark:text-indigo-400
                                    dark:hover:text-indigo-300
                                "

                            >

                                {footerLabel}

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}