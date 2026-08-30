import {

    useEffect,

    useState,

} from "react";


import useDebounce from "./useDebounce";


export default function useProjectFilters(

    fetchProjects

) {

    const [

        filters,

        setFilters,

    ] = useState({

        search: "",

        status: "",

        sort: "-createdAt",

        page: 1,

        limit: 4,

    });


    const debouncedSearch = useDebounce(

        filters.search,

        500

    );


    useEffect(() => {

        fetchProjects({

            ...filters,

            search: debouncedSearch,

        });

    }, [

        fetchProjects,

        debouncedSearch,

        filters.status,

        filters.sort,

        filters.page,

        filters.limit,

    ]);


    return {

        filters,

        setFilters,

    };

}