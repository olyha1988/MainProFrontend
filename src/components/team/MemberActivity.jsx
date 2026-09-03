export default function MemberActivity({

    activities = [],

}) {


    return (

        <div

            className="
                rounded-xl
                border
                bg-white
                p-6
                shadow-sm
                dark:border-gray-700
                dark:bg-gray-900
            "

        >

            <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">

                Recent Activity

            </h2>


            {

                activities.length === 0 ?

                (

                    <p className="text-sm text-gray-500 dark:text-gray-400">

                        No recent activity available.

                    </p>

                )

                :

                (

                    <div className="space-y-5">

                        {

                            activities.map((activity,index)=>(

                                <div

                                    key={index}

                                    className="
                                        flex
                                        gap-4
                                    "

                                >

                                    <div

                                        className="
                                            mt-1
                                            h-3
                                            w-3
                                            rounded-full
                                            bg-blue-600
                                        "

                                    />


                                    <div>

                                        <p className="text-sm text-gray-800 dark:text-gray-200">

                                            {activity.message}

                                        </p>


                                        <span className="text-xs text-gray-500 dark:text-gray-400">

                                            {activity.date}

                                        </span>

                                    </div>


                                </div>

                            ))

                        }

                    </div>

                )

            }


        </div>

    );

}