import { navigation } from "@/constants/navigation";

import NavItem from "./NavItem";


export default function MobileSidebar({

    open,

    setOpen,

}) {

    if (!open) {

        return null;

    }


    return (

        <>

            <div

                className="
                    fixed
                    inset-0
                    z-40
                    bg-black/60
                    backdrop-blur-sm
                "

                onClick={() => setOpen(false)}

            />


            <aside
                className="
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-full
                    w-72
                    flex-col
                    border-r
                    border-gray-200
                    bg-white
                    shadow-2xl
                    dark:border-gray-800
                    dark:bg-gray-950
                "
            >

                <div
                    className="
                        flex
                        h-20
                        items-center
                        border-b
                        border-gray-200
                        px-6
                        dark:border-gray-800
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-indigo-600
                            text-sm
                            font-bold
                            text-white
                            shadow-sm
                        "
                    >

                        TM

                    </div>


                    <div className="ml-3">

                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">

                            TeamTask

                        </h2>

                        <p className="text-xs text-gray-500 dark:text-gray-400">

                            Project Management

                        </p>

                    </div>

                </div>


                <nav
                    className="
                        flex-1
                        space-y-1.5
                        overflow-y-auto
                        px-4
                        py-6
                    "
                >

                    {navigation.map((item) => (

                        <NavItem

                            key={item.path}

                            item={item}

                            onClick={() => setOpen(false)}

                        />

                    ))}

                </nav>


                <div
                    className="
                        border-t
                        border-gray-200
                        px-6
                        py-4
                        dark:border-gray-800
                    "
                >

                    <p className="text-xs text-gray-500 dark:text-gray-500">

                        © 2026 TeamTask

                    </p>

                </div>

            </aside>

        </>

    );

}