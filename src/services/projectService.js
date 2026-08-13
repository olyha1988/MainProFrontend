import api from "./api";

/*
|--------------------------------------------------------------------------
| Get All Projects
|--------------------------------------------------------------------------
*/

const getProjects = async (params = {}) => {

    const response = await api.get(
        "/projects",
        {
            params,
        }
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Single Project
|--------------------------------------------------------------------------
*/

const getProject = async (projectId) => {

    const response = await api.get(
        `/projects/${projectId}`
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Create Project
|--------------------------------------------------------------------------
*/

const createProject = async (projectData) => {

    const response = await api.post(
        "/projects",
        projectData
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Update Project
|--------------------------------------------------------------------------
*/

const updateProject = async (
    projectId,
    projectData
) => {

    const response = await api.put(
        `/projects/${projectId}`,
        projectData
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Delete Project
|--------------------------------------------------------------------------
*/

const deleteProject = async (projectId) => {

    const response = await api.delete(
        `/projects/${projectId}`
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Project Members
|--------------------------------------------------------------------------
*/

const getProjectMembers = async (projectId) => {

    const response = await api.get(
        `/projects/${projectId}/members`
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Add Members to Project
|--------------------------------------------------------------------------
*/

const addProjectMembers = async (
    projectId,
    members
) => {

    const response = await api.post(
        `/projects/${projectId}/members`,
        {
            members,
        }
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Remove Member from Project
|--------------------------------------------------------------------------
*/

const removeProjectMember = async (
    projectId,
    userId
) => {

    const response = await api.delete(
        `/projects/${projectId}/members/${userId}`
    );

    return response.data;

};

export default {

    getProjects,

    getProject,

    createProject,

    updateProject,

    deleteProject,

    getProjectMembers,

    addProjectMembers,

    removeProjectMember,

};