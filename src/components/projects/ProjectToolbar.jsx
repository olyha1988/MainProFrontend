import ProjectFilters from "./ProjectFilters";

import ProjectSearch from "./ProjectSearch";

import ViewToggle from "./ViewToggle";


export default function ProjectToolbar({

    filters,

    setFilters,

    view,

    setView,

}) {

    return (

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-gray-700 dark:bg-gray-900">

            <div className="w-full lg:max-w-sm">

                <ProjectSearch

                    filters={filters}

                    setFilters={setFilters}

                />

            </div>


            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto lg:justify-end">

                <ProjectFilters

                    filters={filters}

                    setFilters={setFilters}

                />


                <ViewToggle

                    view={view}

                    setView={setView}

                />

            </div>

        </div>

    );

}