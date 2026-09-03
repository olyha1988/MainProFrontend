export default function KanbanSkeleton() {

    return (

        <div
            className="
                grid
                min-w-[1100px]
                grid-cols-4
                gap-5
                xl:min-w-0
            "
        >

            {Array.from({

                length: 4,

            }).map((_, column) => (

                <section

                    key={column}

                    className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-4
                        shadow-sm
                        dark:border-gray-800
                        dark:bg-slate-900
                    "

                >

                    {/* Column Header */}

                    <div
                        className="
                            mb-5
                            flex
                            items-center
                            justify-between
                            border-b
                            border-gray-200
                            pb-4
                            dark:border-gray-800
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    h-2.5
                                    w-2.5
                                    animate-pulse
                                    rounded-full
                                    bg-gray-300
                                    dark:bg-gray-700
                                "
                            />

                            <div
                                className="
                                    h-5
                                    w-24
                                    animate-pulse
                                    rounded-md
                                    bg-gray-300
                                    dark:bg-gray-700
                                "
                            />

                        </div>


                        <div
                            className="
                                h-6
                                w-8
                                animate-pulse
                                rounded-full
                                bg-gray-300
                                dark:bg-gray-700
                            "
                        />

                    </div>


                    {/* Cards */}

                    <div className="space-y-4">

                        {Array.from({

                            length: 4,

                        }).map((_, card) => (

                            <div

                                key={card}

                                className="
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-white
                                    p-4
                                    shadow-sm
                                    dark:border-gray-800
                                    dark:bg-slate-950
                                "

                            >

                                {/* Project */}

                                <div className="mb-3 flex items-center gap-2">

                                    <div
                                        className="
                                            h-2.5
                                            w-2.5
                                            animate-pulse
                                            rounded-full
                                            bg-gray-300
                                            dark:bg-gray-700
                                        "
                                    />

                                    <div
                                        className="
                                            h-3
                                            w-20
                                            animate-pulse
                                            rounded
                                            bg-gray-300
                                            dark:bg-gray-700
                                        "
                                    />

                                </div>


                                {/* Title */}

                                <div
                                    className="
                                        h-4
                                        w-4/5
                                        animate-pulse
                                        rounded
                                        bg-gray-300
                                        dark:bg-gray-700
                                    "
                                />

                                <div
                                    className="
                                        mt-2
                                        h-4
                                        w-2/3
                                        animate-pulse
                                        rounded
                                        bg-gray-300
                                        dark:bg-gray-700
                                    "
                                />


                                {/* Description */}

                                <div
                                    className="
                                        mt-4
                                        h-3
                                        w-full
                                        animate-pulse
                                        rounded
                                        bg-gray-200
                                        dark:bg-gray-800
                                    "
                                />

                                <div
                                    className="
                                        mt-2
                                        h-3
                                        w-5/6
                                        animate-pulse
                                        rounded
                                        bg-gray-200
                                        dark:bg-gray-800
                                    "
                                />


                                {/* Footer */}

                                <div className="mt-5 flex items-center justify-between">

                                    <div
                                        className="
                                            h-6
                                            w-20
                                            animate-pulse
                                            rounded-full
                                            bg-gray-300
                                            dark:bg-gray-700
                                        "
                                    />

                                    <div className="flex items-center gap-2">

                                        <div
                                            className="
                                                h-8
                                                w-8
                                                animate-pulse
                                                rounded-full
                                                bg-gray-300
                                                dark:bg-gray-700
                                            "
                                        />

                                        <div
                                            className="
                                                h-3
                                                w-16
                                                animate-pulse
                                                rounded
                                                bg-gray-300
                                                dark:bg-gray-700
                                            "
                                        />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            ))}

        </div>

    );

}