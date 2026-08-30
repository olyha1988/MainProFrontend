import {

    useCallback,

} from "react";

import {

    useDispatch,

    useSelector,

} from "react-redux";


import {

    fetchProjects as fetchProjectsAction,

    fetchProject as fetchProjectAction,

    fetchProjectMembers as fetchProjectMembersAction,

    addProjectMembers as addProjectMembersAction,

    removeProjectMember as removeProjectMemberAction,

    createProject as createProjectAction,

    updateProject as updateProjectAction,

    deleteProject as deleteProjectAction,

    clearProject as clearProjectAction,

    clearProjectError as clearProjectErrorAction,

    resetProjects as resetProjectsAction,

} from "@/redux/slices/projectSlice";


const useProjects = () => {

    const dispatch = useDispatch();


    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {

        projects,

        project,

        projectMembers,

        pagination,

        loading,

        error,

    } = useSelector(

        (state) => state.projects

    );


    /*
    |--------------------------------------------------------------------------
    | Project Actions
    |--------------------------------------------------------------------------
    */

    const fetchProjects = useCallback(

        (params = {}) => {

            return dispatch(

                fetchProjectsAction(params)

            );

        },

        [dispatch]

    );


    const fetchProject = useCallback(

        (projectId) => {

            return dispatch(

                fetchProjectAction(projectId)

            );

        },

        [dispatch]

    );


    const createProject = useCallback(

        (projectData) => {

            return dispatch(

                createProjectAction(projectData)

            );

        },

        [dispatch]

    );


    const updateProject = useCallback(

        (

            projectId,

            projectData

        ) => {

            return dispatch(

                updateProjectAction({

                    projectId,

                    projectData,

                })

            );

        },

        [dispatch]

    );


    const deleteProject = useCallback(

        (projectId) => {

            return dispatch(

                deleteProjectAction(projectId)

            );

        },

        [dispatch]

    );


    /*
    |--------------------------------------------------------------------------
    | Project Member Actions
    |--------------------------------------------------------------------------
    */

    const fetchProjectMembers = useCallback(

        (projectId) => {

            return dispatch(

                fetchProjectMembersAction(

                    projectId

                )

            );

        },

        [dispatch]

    );


    const addProjectMembers = useCallback(

        (

            projectId,

            members

        ) => {

            return dispatch(

                addProjectMembersAction({

                    projectId,

                    members,

                })

            );

        },

        [dispatch]

    );


    const removeProjectMember = useCallback(

        (

            projectId,

            userId

        ) => {

            return dispatch(

                removeProjectMemberAction({

                    projectId,

                    userId,

                })

            );

        },

        [dispatch]

    );


    /*
    |--------------------------------------------------------------------------
    | Utility Actions
    |--------------------------------------------------------------------------
    */

    const clearProject = useCallback(

        () => {

            dispatch(

                clearProjectAction()

            );

        },

        [dispatch]

    );


    const clearProjectError = useCallback(

        () => {

            dispatch(

                clearProjectErrorAction()

            );

        },

        [dispatch]

    );


    const resetProjects = useCallback(

        () => {

            dispatch(

                resetProjectsAction()

            );

        },

        [dispatch]

    );


    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {

        /*
        |--------------------------------------------------------------------------
        | State
        |--------------------------------------------------------------------------
        */

        projects,

        project,

        projectMembers,

        pagination,

        loading,

        error,


        /*
        |--------------------------------------------------------------------------
        | Projects
        |--------------------------------------------------------------------------
        */

        fetchProjects,

        fetchProject,

        createProject,

        updateProject,

        deleteProject,


        /*
        |--------------------------------------------------------------------------
        | Project Members
        |--------------------------------------------------------------------------
        */

        fetchProjectMembers,

        addProjectMembers,

        removeProjectMember,


        /*
        |--------------------------------------------------------------------------
        | Helpers
        |--------------------------------------------------------------------------
        */

        clearProject,

        clearProjectError,

        resetProjects,

    };

};


export default useProjects;