export default function TeamSkeleton() {


    return (

        <div className="
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-3
        ">


            {
                Array.from({

                    length: 6

                })
                .map((_, index)=>(


                    <div

                        key={index}

                        className="
                            animate-pulse
                            rounded-xl
                            border
                            bg-white
                            p-6
                            dark:border-gray-700
                            dark:bg-gray-900
                        "

                    >


                        {/* Profile */}

                        <div className="
                            flex
                            items-center
                            gap-4
                        ">


                            <div className="
                                h-14
                                w-14
                                rounded-full
                                bg-gray-200
                                dark:bg-gray-700
                            "/>


                            <div className="
                                flex-1
                            ">


                                <div className="
                                    h-4
                                    w-32
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700
                                "/>


                                <div className="
                                    mt-2
                                    h-3
                                    w-44
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700
                                "/>


                            </div>


                        </div>



                        {/* Details */}

                        <div className="
                            mt-6
                            flex
                            justify-between
                        ">


                            <div>


                                <div className="
                                    h-3
                                    w-12
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700
                                "/>


                                <div className="
                                    mt-2
                                    h-4
                                    w-20
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700
                                "/>


                            </div>



                            <div>


                                <div className="
                                    h-3
                                    w-14
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700
                                "/>


                                <div className="
                                    mt-2
                                    h-4
                                    w-16
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700
                                "/>


                            </div>


                        </div>


                    </div>


                ))
            }


        </div>

    );

}