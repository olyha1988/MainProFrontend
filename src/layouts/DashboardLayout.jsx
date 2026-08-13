import {

    useState,

} from "react";

import {

    Outlet,

} from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileSidebar from "@/components/layout/MobileSidebar";


export default function DashboardLayout() {

    const [

        collapsed,

        setCollapsed,

    ] = useState(false); // Desktop


    const [

        open,

        setOpen,

    ] = useState(false); // Mobile


    return (

        <div
            className="
                flex
                h-dvh
                w-full
                overflow-hidden
                bg-slate-100
                dark:bg-slate-950
            "
        >

            <Sidebar

                collapsed={collapsed}

                setCollapsed={setCollapsed}

            />


            <MobileSidebar

                open={open}

                setOpen={setOpen}

            />


            <div
                className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    overflow-hidden
                "
            >

                <Navbar

                    setOpen={setOpen}

                />


                <main
                    className="
                        min-h-0
                        min-w-0
                        flex-1
                        overflow-y-auto
                        overflow-x-hidden
                        p-4
                        sm:p-6
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}