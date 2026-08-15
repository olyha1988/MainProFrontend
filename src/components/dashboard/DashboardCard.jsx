export default function DashboardCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div
            className={`rounded-xl p-6 text-white ${color}`}
        >

            <div className="flex justify-between">

                <div>

                    <p className="opacity-80">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div className="text-5xl">

                    {icon}

                </div>

            </div>

        </div>

    );

}