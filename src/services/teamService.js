import api from "./api";

/*
|--------------------------------------------------------------------------
| Get Team Members
|--------------------------------------------------------------------------
*/

const getTeamMembers = async (params = {}) => {

    const filteredParams = Object.fromEntries(

        Object.entries(params).filter(

            ([, value]) =>

                value !== "" &&
                value !== null &&
                value !== undefined

        )

    );

    const response = await api.get(

        "/team",

        {

            params: filteredParams,

        }

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Member Profile
|--------------------------------------------------------------------------
*/

const getMemberProfile = async (memberId) => {

    const response = await api.get(

        `/team/${memberId}`

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Member Projects
|--------------------------------------------------------------------------
*/

const getMemberProjects = async (memberId) => {

    const response = await api.get(

        `/team/${memberId}/projects`

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Member Tasks
|--------------------------------------------------------------------------
*/

const getMemberTasks = async (

    memberId,

    params = {}

) => {

    const filteredParams = Object.fromEntries(

        Object.entries(params).filter(

            ([, value]) =>

                value !== "" &&
                value !== null &&
                value !== undefined

        )

    );

    const response = await api.get(

        `/team/${memberId}/tasks`,

        {

            params: filteredParams,

        }

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Member Workload
|--------------------------------------------------------------------------
*/

const getMemberWorkload = async (userId) => {

    const response = await api.get(
        `/team/${userId}/workload`
    );

    console.log("WORKLOAD RESPONSE", response.data);

    return response.data;

};

export default {

    getTeamMembers,

    getMemberProfile,

    getMemberProjects,

    getMemberTasks,

    getMemberWorkload,

};