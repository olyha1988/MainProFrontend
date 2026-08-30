export default function ProjectSkeleton({

    count = 6,

}) {

    return (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">

            {Array.from({

                length: count,

            }).map((_, index) => (

                <div

                    key={index}

                    aria-hidden="true"

                    className="
                        animate-pulse
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        shadow-sm
                        dark:border-gray-700
                        dark:bg-gray-900
                    "

                >

                    {/*
                    |--------------------------------------------------------------------------
                    | Top Accent
                    |--------------------------------------------------------------------------
                    */}

                    <div className="h-1 w-full bg-gray-200 dark:bg-gray-700" />


                    <div className="space-y-5 p-5">

                        {/*
                        |--------------------------------------------------------------------------
                        | Header
                        |--------------------------------------------------------------------------
                        */}

                        <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                <div className="h-3.5 w-3.5 rounded-full bg-gray-300 dark:bg-gray-700" />

                                <div className="space-y-2">

                                    <div className="h-5 w-36 rounded bg-gray-300 dark:bg-gray-700" />

                                    <div className="h-5 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />

                                </div>

                            </div>


                            <div className="h-9 w-9 rounded-xl bg-gray-300 dark:bg-gray-700" />

                        </div>


                        {/*
                        |--------------------------------------------------------------------------
                        | Description
                        |--------------------------------------------------------------------------
                        */}

                        <div className="space-y-2">

                            <div className="h-3 rounded bg-gray-300 dark:bg-gray-700" />

                            <div className="h-3 rounded bg-gray-300 dark:bg-gray-700" />

                            <div className="h-3 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />

                        </div>


                        {/*
                        |--------------------------------------------------------------------------
                        | Members Section
                        |--------------------------------------------------------------------------
                        */}

                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">

                            <div className="mb-3 flex items-center justify-between">

                                <div className="h-3 w-24 rounded bg-gray-300 dark:bg-gray-700" />

                                <div className="h-3 w-12 rounded bg-gray-300 dark:bg-gray-700" />

                            </div>


                            <div className="flex -space-x-2">

                                {Array.from({

                                    length: 4,

                                }).map((_, avatarIndex) => (

                                    <div

                                        key={avatarIndex}

                                        className="h-9 w-9 rounded-full border-2 border-white bg-gray-300 dark:border-gray-900 dark:bg-gray-700"

                                    />

                                ))}

                            </div>

                        </div>


                        {/*
                        |--------------------------------------------------------------------------
                        | Footer
                        |--------------------------------------------------------------------------
                        */}

                        <div className="border-t border-gray-100 pt-4 dark:border-gray-800">

                            <div className="mb-4 h-3 w-32 rounded bg-gray-300 dark:bg-gray-700" />


                            <div className="h-10 w-full rounded-xl bg-gray-300 dark:bg-gray-700" />

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}