export default function Card({

    title,

    children,

    className = ""

}) {

    return (

        <div
            className={`rounded-xl bg-white dark:bg-slate-800 shadow p-6 ${className}`}
        >

            {title && (

                <h3 className="text-lg font-semibold mb-4">

                    {title}

                </h3>

            )}

            {children}

        </div>

    );

}