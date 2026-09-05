import {

    LayoutDashboard,

} from "lucide-react";


export default function PageHeader({

    title,

    subtitle,

    icon: Icon = LayoutDashboard,

    action,

}) {

    return (

        <div
            className="
                mb-8
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-700
                dark:bg-gray-900
                sm:flex-row
                sm:items-center
                sm:justify-between
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Header Content
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-4
                "
            >

                <div
                    className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-indigo-100
                        text-indigo-600
                        dark:bg-indigo-900/30
                        dark:text-indigo-400
                    "
                >

                    <Icon

                        size={28}

                        aria-hidden="true"

                    />

                </div>


                <div className="min-w-0">

                    <h1
                        className="
                            truncate
                            text-2xl
                            font-bold
                            text-gray-900
                            dark:text-white
                            sm:text-3xl
                        "
                    >

                        {title}

                    </h1>


                    {subtitle && (

                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                                sm:text-base
                            "
                        >

                            {subtitle}

                        </p>

                    )}

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Optional Action
            |--------------------------------------------------------------------------
            */}

            {action && (

                <div className="shrink-0">

                    {action}

                </div>

            )}

        </div>

    );

}