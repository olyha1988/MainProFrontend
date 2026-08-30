import api from "./api";

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

const getUsers = async (params = {}) => {

    const filteredParams = Object.fromEntries(

        Object.entries(params).filter(

            ([, value]) =>

                value !== "" &&
                value !== null &&
                value !== undefined

        )

    );

    const response = await api.get(

        "/users",

        {

            params: filteredParams,

        }

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Single User
|--------------------------------------------------------------------------
*/

const getUser = async (userId) => {

    const response = await api.get(

        `/users/${userId}`

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Member Projects (Team Module)
|--------------------------------------------------------------------------
*/

const getMemberProjects = async (userId) => {

    const response = await api.get(

        `/team/${userId}/projects`

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Member Tasks (Team Module)
|--------------------------------------------------------------------------
*/

const getMemberTasks = async (

    userId,

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

        `/team/${userId}/tasks`,

        {

            params: filteredParams,

        }

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Get Member Workload (Team Module)
|--------------------------------------------------------------------------
*/

const getMemberWorkload = async (userId) => {

    const response = await api.get(

        `/team/${userId}/workload`

    );

    return response.data;

};

export default {

    getUsers,

    getUser,

    getMemberProjects,

    getMemberTasks,

    getMemberWorkload,

};