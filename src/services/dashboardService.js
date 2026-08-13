import api from "@/services/api";

const getDashboard = async () => {

    const response = await api.get(

        "/dashboard"

    );

    return response.data;

};

export default {

    getDashboard,

};