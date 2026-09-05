import api from "@/services/api";


/*
|--------------------------------------------------------------------------
| Get Activities
|--------------------------------------------------------------------------
*/

const getActivities = async (

    params = {}

) => {

    const response = await api.get(

        "/activities",

        {

            params,

        }

    );


    return response.data;

};


export default {

    getActivities,

};