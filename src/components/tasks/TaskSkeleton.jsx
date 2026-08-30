
export default function TaskSkeleton() {

    return (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {Array.from({

                length: 6,

            }).map((_, index) => (

                <div

                    key={index}

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


                    <div className="p-5">

                        {/*
                        |--------------------------------------------------------------------------
                        | Header
                        |--------------------------------------------------------------------------
                        */}

                        <div className="flex items-start justify-between gap-4">

                            <div className="flex flex-1 items-start gap-3">

                                <div className="mt-1 h-3.5 w-3.5 rounded-full bg-gray-300 dark:bg-gray-600" />


                                <div className="flex-1">

                                    <div className="h-5 w-40 rounded-lg bg-gray-300 dark:bg-gray-700" />

                                    <div className="mt-3 h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />

                                    <div className="mt-2 h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />

                                </div>

                            </div>


                            <div className="h-9 w-9 rounded-lg bg-gray-300 dark:bg-gray-700" />

                        </div>


                        {/*
                        |--------------------------------------------------------------------------
                        | Details Section
                        |--------------------------------------------------------------------------
                        */}

                        <div className="mt-5 space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">

                            {[1, 2, 3].map((item) => (

                                <div

                                    key={item}

                                    className="flex items-center gap-3"

                                >

                                    <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700" />

                                    <div className="h-4 flex-1 rounded bg-gray-200 dark:bg-gray-700" />

                                </div>

                            ))}

                        </div>


                        {/*
                        |--------------------------------------------------------------------------
                        | Footer
                        |--------------------------------------------------------------------------
                        */}

                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">

                            <div className="h-7 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />

                            <div className="h-7 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}

