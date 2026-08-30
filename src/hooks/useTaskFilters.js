import { useEffect, useState } from "react";

export default function useTaskFilters(onChange) {

    /*
    |--------------------------------------------------------------------------
    | Filter State
    |--------------------------------------------------------------------------
    */

    const [filters, setFilters] = useState({

        page: 1,

        limit: 10,

        search: "",

        project: "",

        assignedTo: "",

        status: "",

        priority: "",

        sort: "-createdAt",

    });

    /*
    |--------------------------------------------------------------------------
    | Debounced Search
    |--------------------------------------------------------------------------
    */

    const [debouncedSearch, setDebouncedSearch] =
        useState(filters.search);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(
                filters.search
            );

        }, 500);

        return () => clearTimeout(timer);

    }, [filters.search]);

    /*
    |--------------------------------------------------------------------------
    | Notify Parent
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        onChange({

            ...filters,

            search: debouncedSearch,

        });

    }, [

        debouncedSearch,

        filters.page,

        filters.limit,

        filters.project,

        filters.assignedTo,

        filters.status,

        filters.priority,

        filters.sort,

    ]);

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    const updateFilter = (key, value) => {

        setFilters((prev) => ({

            ...prev,

            page: 1,

            [key]: value,

        }));

    };

    const updateFilters = (values) => {

        setFilters((prev) => ({

            ...prev,

            page: 1,

            ...values,

        }));

    };

    const changePage = (page) => {

        setFilters((prev) => ({

            ...prev,

            page,

        }));

    };

    const resetFilters = () => {

        setFilters({

            page: 1,

            limit: 10,

            search: "",

            project: "",

            assignedTo: "",

            status: "",

            priority: "",

            sort: "-createdAt",

        });

    };

    return {

        filters,

        setFilters,

        updateFilter,

        updateFilters,

        changePage,

        resetFilters,

    };

}