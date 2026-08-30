
import ProjectCard from "./ProjectCard";
import ProjectPagination from "./ProjectPagination";


export default function ProjectGrid({

    projects = [],


    onEdit,

    onDelete,

    onManageMembers,

    pagination,

    filters,

    setFilters,

}) {

    if (!projects.length) {

        return null;

    }


    return (

        <>

            <div

                role="list"

                aria-label="Projects"

                className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                2xl:grid-cols-4
            "

            >

                {projects.map((project) => (

                    <div

                        key={project._id}

                        role="listitem"

                        className="
                        h-full
                        animate-in
                        fade-in
                        duration-300
                    "

                    >

                        <ProjectCard

                            project={project}

                            onEdit={onEdit}

                            onDelete={onDelete}

                            onManageMembers={onManageMembers}

                        />

                    </div>

                ))}




            </div>

            <ProjectPagination

                pagination={pagination}

                filters={filters}

                setFilters={setFilters}

            />

        </>

    );

}

