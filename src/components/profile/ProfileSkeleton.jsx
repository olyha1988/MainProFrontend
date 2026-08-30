export default function ProfileSkeleton() {

    return (

        <div
            className="
                animate-pulse
                space-y-6
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Profile Header Skeleton
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-900
                "
            >

                <div
                    className="
                        h-28
                        bg-gray-200
                        dark:bg-gray-800
                        sm:h-36
                    "
                />


                <div
                    className="
                        relative
                        px-5
                        pb-6
                        sm:px-7
                        sm:pb-7
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                                sm:flex-row
                                sm:items-end
                            "
                        >

                            <div
                                className="
                                    relative
                                    z-10
                                    -mt-14
                                    h-28
                                    w-28
                                    rounded-2xl
                                    border-4
                                    border-white
                                    bg-gray-200
                                    shadow-lg
                                    ring-1
                                    ring-gray-200
                                    dark:border-gray-900
                                    dark:bg-gray-700
                                    dark:ring-gray-700
                                    sm:-mt-16
                                    sm:h-32
                                    sm:w-32
                                "
                            />


                            <div
                                className="
                                    space-y-3
                                    pb-1
                                "
                            >

                                <div
                                    className="
                                        h-8
                                        w-52
                                        rounded-lg
                                        bg-gray-200
                                        dark:bg-gray-700
                                    "
                                />


                                <div
                                    className="
                                        h-4
                                        w-24
                                        rounded-md
                                        bg-gray-200
                                        dark:bg-gray-700
                                    "
                                />

                            </div>

                        </div>


                        <div
                            className="
                                h-9
                                w-36
                                rounded-full
                                bg-gray-200
                                dark:bg-gray-700
                            "
                        />

                    </div>


                    <div
                        className="
                            mt-6
                            grid
                            gap-3
                            border-t
                            border-gray-200
                            pt-6
                            dark:border-gray-800
                            sm:grid-cols-2
                            xl:grid-cols-4
                        "
                    >

                        {

                            Array.from({

                                length: 4,

                            }).map((_, index) => (

                                <div

                                    key={index}

                                    className="
                                        flex
                                        min-w-0
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-gray-50/70
                                        p-4
                                        dark:border-gray-800
                                        dark:bg-gray-950/40
                                    "

                                >

                                    <div
                                        className="
                                            h-10
                                            w-10
                                            shrink-0
                                            rounded-xl
                                            bg-gray-200
                                            dark:bg-gray-700
                                        "
                                    />


                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                            space-y-2
                                        "
                                    >

                                        <div
                                            className="
                                                h-3
                                                w-16
                                                rounded
                                                bg-gray-200
                                                dark:bg-gray-700
                                            "
                                        />


                                        <div
                                            className="
                                                h-4
                                                w-full
                                                max-w-28
                                                rounded
                                                bg-gray-200
                                                dark:bg-gray-700
                                            "
                                        />

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Statistics Heading Skeleton
            |--------------------------------------------------------------------------
            */}

            <div className="space-y-2">

                <div
                    className="
                        h-6
                        w-28
                        rounded-md
                        bg-gray-200
                        dark:bg-gray-700
                    "
                />


                <div
                    className="
                        h-4
                        w-64
                        max-w-full
                        rounded
                        bg-gray-200
                        dark:bg-gray-700
                    "
                />

            </div>


            {/*
            |--------------------------------------------------------------------------
            | Statistics Cards Skeleton
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {

                    Array.from({

                        length: 4,

                    }).map((_, index) => (

                        <div

                            key={index}

                            className="
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                p-5
                                shadow-sm
                                dark:border-gray-800
                                dark:bg-gray-900
                            "

                        >

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                "
                            >

                                <div className="space-y-3">

                                    <div
                                        className="
                                            h-4
                                            w-24
                                            rounded
                                            bg-gray-200
                                            dark:bg-gray-700
                                        "
                                    />


                                    <div
                                        className="
                                            h-9
                                            w-14
                                            rounded-md
                                            bg-gray-200
                                            dark:bg-gray-700
                                        "
                                    />

                                </div>


                                <div
                                    className="
                                        h-12
                                        w-12
                                        shrink-0
                                        rounded-xl
                                        bg-gray-200
                                        dark:bg-gray-700
                                    "
                                />

                            </div>


                            <div
                                className="
                                    mt-5
                                    h-3
                                    w-28
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700
                                "
                            />

                        </div>

                    ))

                }

            </div>

        </div>

    );

}