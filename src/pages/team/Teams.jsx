import {
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";


import useTeam from "@/hooks/useTeam";
import MemberHeader from "@/components/team/MemberHeader";
import MemberFilters from "@/components/team/MemberFilters";
import MemberTable from "@/components/team/MemberTable";
import MemberGrid from "@/components/team/MemberGrid";

import TeamSkeleton from "@/components/team/TeamSkeleton";
import EmptyMembers from "@/components/team/EmptyMembers";
import TeamStats from "@/components/team/TeamStats";


export default function Team() {


    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */


    const navigate = useNavigate();

const {
    members,
    pagination,
    loading,
    error,
    fetchMembers,
} = useTeam();



    /*
    |--------------------------------------------------------------------------
    | View State
    |--------------------------------------------------------------------------
    */


    const [view, setView] = useState("table");



    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */


    const [filters, setFilters] = useState({


        page: 1,


        limit: 10,


        search: "",


        sort: "-createdAt",


    });



    /*
    |--------------------------------------------------------------------------
    | Initial Fetch
    |--------------------------------------------------------------------------
    */

useEffect(() => {
    fetchMembers(filters);
}, [filters]);



    /*
    |--------------------------------------------------------------------------
    | Manage Member
    |--------------------------------------------------------------------------
    */


    const handleManageMembers = () => {

    navigate("/projects");

};



    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */


    const changePage = (page) => {


        setFilters((prev)=>({


            ...prev,


            page,


        }));


    };



    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */


    return (

        <div className="space-y-6">


            {/* Header */}

            <MemberHeader

    onManageMembers={handleManageMembers}

    view={view}

    setView={setView}

/>

            <TeamStats
    members={members}
/>





            {/* Filters */}

            <MemberFilters

                filters={filters}

                setFilters={setFilters}

            />



            {/* Loading */}

            {

                loading &&

                <TeamSkeleton />

            }



            {/* Error */}

            {

                !loading &&

                error &&

                (

                    <div

                        className="
                        rounded-lg
                        border
                        border-red-300
                        bg-red-50
                        p-4
                        text-red-700
                        dark:border-red-800
                        dark:bg-red-900/20
                        dark:text-red-400
                        "

                    >

                        {error}

                    </div>

                )

            }



            {/* Empty */}

            {

                !loading &&

                !error &&

                members.length === 0 &&

                (

                    <EmptyMembers />

                )

            }



            {/* Members */}

            {

                !loading &&

                !error &&

                members.length > 0 &&

                (

                    view === "table"

                    ?

                    <MemberTable

                        members={members}

                        pagination={pagination}

                        onPageChange={changePage}

                    />

                    :

                    <MemberGrid

                        members={members}

                    />

                )

            }


        </div>

    );

}