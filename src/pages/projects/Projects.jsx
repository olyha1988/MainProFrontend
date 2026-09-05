
import {

    useCallback,
    useState,

} from "react";


import useProjectFilters from "@/hooks/useProjectFilters";

import useProjects from "@/hooks/useProjects";


import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

import EmptyProjects from "@/components/projects/EmptyProjects";

import ErrorProjects from "@/components/projects/ErrorProjects";

import ProjectGrid from "@/components/projects/ProjectGrid";

import ProjectHeader from "@/components/projects/ProjectHeader";

 import ProjectMembersModal from "@/components/projects/ProjectMembersModal";

import ProjectModal from "@/components/projects/ProjectModal";

import ProjectSkeleton from "@/components/projects/ProjectSkeleton";

import ProjectTable from "@/components/projects/ProjectTable";

import ProjectToolbar from "@/components/projects/ProjectToolbar";


export default function Projects() {

    /*
    |--------------------------------------------------------------------------
    | Project Data
    |--------------------------------------------------------------------------
    */

    const {

        projects = [],

        pagination,

        loading,

        error,

        fetchProjects,

    } = useProjects();


    /*
    |--------------------------------------------------------------------------
    | View State
    |--------------------------------------------------------------------------
    */

    const [

        view,

        setView,

    ] = useState("grid");


    /*
    |--------------------------------------------------------------------------
    | Selected Project
    |--------------------------------------------------------------------------
    */

    const [

        selectedProject,

        setSelectedProject,

    ] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Modal States
    |--------------------------------------------------------------------------
    */

    const [

        showProjectModal,

        setShowProjectModal,

    ] = useState(false);


    const [

        showDeleteModal,

        setShowDeleteModal,

    ] = useState(false);


    const [

        showMembersModal,

        setShowMembersModal,

    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

const {

    filters,

    setFilters,

} = useProjectFilters(fetchProjects);


    /*
    |--------------------------------------------------------------------------
    | Load Projects
    |--------------------------------------------------------------------------
    */




    /*
    |--------------------------------------------------------------------------
    | Create Project
    |--------------------------------------------------------------------------
    */

    const handleCreate = () => {

        setSelectedProject(null);

        setShowProjectModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Edit Project
    |--------------------------------------------------------------------------
    */

    const handleEdit = (project) => {

        setSelectedProject(project); // project selected by the user

        setShowProjectModal(true); //

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Project
    |--------------------------------------------------------------------------
    */

    const handleDelete = (project) => {

        setSelectedProject(project);

        setShowDeleteModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Manage Members
    |--------------------------------------------------------------------------
    */

    const handleManageMembers = (project) => {

        setSelectedProject(project);

        setShowMembersModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Close Modals
    |--------------------------------------------------------------------------
    */

    const closeProjectModal = useCallback(() => {

        setShowProjectModal(false);

        setSelectedProject(null);

    }, []);


    const closeDeleteModal = useCallback(() => {

        setShowDeleteModal(false);

        setSelectedProject(null);

    }, []);


    const closeMembersModal = useCallback(() => {

        setShowMembersModal(false);

        setSelectedProject(null);

    }, []);


    return (

        <div className="space-y-6">

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <ProjectHeader

                onCreate={handleCreate}

            />


            {/*
            |--------------------------------------------------------------------------
            | Toolbar
            |--------------------------------------------------------------------------
            */}

            <ProjectToolbar

                filters={filters}

                setFilters={setFilters}

                view={view}

                setView={setView}

            />


            {/*
            |--------------------------------------------------------------------------
            | Loading State
            |--------------------------------------------------------------------------
            */}

            {loading && (

                <ProjectSkeleton />

            )}


            {/*
            |--------------------------------------------------------------------------
            | Error State
            |--------------------------------------------------------------------------
            */}

             {!loading && error && (

                <ErrorProjects

                    message={error}

                    retry={() =>

                        fetchProjects(filters)

                    }

                />

            )} 


            {/*
            |--------------------------------------------------------------------------
            | Empty State
            |--------------------------------------------------------------------------
            */}

            {!loading &&

                !error &&

                projects.length === 0 && (

                    <EmptyProjects

                        onCreate={handleCreate}

                    />

                )} 


            {/*
            |--------------------------------------------------------------------------
            | Projects
            |--------------------------------------------------------------------------
            */}

            {!loading &&

                !error &&

                projects.length > 0 && (

                    view === "grid" ? (

                        <ProjectGrid

                            projects={projects}

                            pagination={pagination}

                            filters={filters}

                            setFilters={setFilters}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                            onManageMembers={
                                handleManageMembers
                            }

                        />

                    ) : (

                        <ProjectTable

                            projects={projects}

                            pagination={pagination}

                            filters={filters}

                            setFilters={setFilters}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                            onManageMembers={
                                handleManageMembers
                            }

                        />

                    )

                )} 


            {/*
            |--------------------------------------------------------------------------
            | Create / Edit Modal
            |--------------------------------------------------------------------------
            */}

            <ProjectModal

                open={showProjectModal}

                project={selectedProject}

                loading={loading}

                onClose={closeProjectModal}

            />


            {/*
            |--------------------------------------------------------------------------
            | Delete Modal
            |--------------------------------------------------------------------------
            */}

             <DeleteProjectModal

                open={showDeleteModal}

                project={selectedProject}

                loading={loading}

                onClose={closeDeleteModal}

            /> 


            {/*
            |--------------------------------------------------------------------------
            | Project Members Modal
            |--------------------------------------------------------------------------
            */}

            <ProjectMembersModal

                open={showMembersModal}

                project={selectedProject}

                onClose={closeMembersModal}

            /> 

        </div>

    );

}

