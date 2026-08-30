import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchProfile,

    updateProfile,

    changePassword,

    uploadAvatar,

    removeAvatar,

    clearProfileSuccess,

    clearProfileError,

    clearProfile,

    selectProfile,

    selectProfileLoading,

    selectProfileError,

    selectProfileSuccess,

    selectAvatarUploading,

    selectAvatarRemoving,

} from "@/redux/slices/profileSlice";


export default function useProfile() {

    const dispatch = useDispatch();


    return {

        /*
        |--------------------------------------------------------------------------
        | State
        |--------------------------------------------------------------------------
        */

        profile: useSelector(

            selectProfile

        ),

        loading: useSelector(

            selectProfileLoading

        ),

        error: useSelector(

            selectProfileError

        ),

        success: useSelector(

            selectProfileSuccess

        ),

        avatarUploading: useSelector(

            selectAvatarUploading

        ),

        avatarRemoving: useSelector(

            selectAvatarRemoving

        ),


        /*
        |--------------------------------------------------------------------------
        | Actions
        |--------------------------------------------------------------------------
        */

        fetchProfile: () =>

            dispatch(

                fetchProfile()

            ),

        updateProfile: profileData =>

            dispatch(

                updateProfile(

                    profileData

                )

            ),

        changePassword: passwordData =>

            dispatch(

                changePassword(

                    passwordData

                )

            ),

        uploadProfileAvatar: (

            file,

            onUploadProgress

        ) =>

            dispatch(

                uploadAvatar({

                    file,

                    onUploadProgress,

                })

            ),

        removeProfileAvatar: () =>

            dispatch(

                removeAvatar()

            ),

        clearSuccess: () =>

            dispatch(

                clearProfileSuccess()

            ),

        clearError: () =>

            dispatch(

                clearProfileError()

            ),

        clearProfile: () =>

            dispatch(

                clearProfile()

            ),

    };

}