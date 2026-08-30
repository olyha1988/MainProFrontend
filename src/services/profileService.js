import api from "./api";

/*
|--------------------------------------------------------------------------
| Get Profile
|--------------------------------------------------------------------------
*/

const getProfile = async () => {

    const response = await api.get(

        "/profile"

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

const updateProfile = async (profileData) => {

    const response = await api.put(

        "/profile",

        profileData

    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

const changePassword = async (passwordData) => {

    const response = await api.put(

        "/profile/password",

        passwordData

    );

    return response.data;

};




/*
|--------------------------------------------------------------------------
| Upload Profile Avatar
|--------------------------------------------------------------------------
*/

const uploadProfileAvatar = async (

    file,

    onUploadProgress

) => {

    const formData = new FormData();


    formData.append(

        "avatar",

        file

    );


    const response = await api.post(

        "/profile/avatar",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

            onUploadProgress: (progressEvent) => {

                if (

                    !progressEvent.total ||

                    !onUploadProgress

                ) {

                    return;

                }


                const progress = Math.round(

                    (

                        progressEvent.loaded *

                        100

                    ) /

                    progressEvent.total

                );


                onUploadProgress(

                    progress

                );

            },

        }

    );


    return response.data;

};


/*
|--------------------------------------------------------------------------
| Remove Profile Avatar
|--------------------------------------------------------------------------
*/

const removeProfileAvatar = async () => {

    const response = await api.delete(

        "/profile/avatar"

    );


    return response.data;

};

export default {

    getProfile,

    updateProfile,

    changePassword,

    uploadProfileAvatar,

    removeProfileAvatar,

};