import api from "./api";

const getProjectMembers = async (projectId) => {

    const response = await api.get(
        `/projects/${projectId}/members`
    );

    return response.data;

};

export default {

    getProjectMembers,

};