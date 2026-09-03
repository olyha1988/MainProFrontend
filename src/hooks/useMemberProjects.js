import {

    useDispatch,

    useSelector,

} from "react-redux";


import {


    fetchMemberProjects,


    selectUserProjects,


    selectUserLoading,


    selectUserError,


} from "@/redux/slices/userSlice";



export default function useMemberProjects() {


    const dispatch = useDispatch();



    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */


    const projects = useSelector(

        selectUserProjects

    );


    const loading = useSelector(

        selectUserLoading

    );


    const error = useSelector(

        selectUserError

    );



    /*
    |--------------------------------------------------------------------------
    | API Actions
    |--------------------------------------------------------------------------
    */


    const getMemberProjects = (userId) =>


        dispatch(

            fetchMemberProjects(userId)

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


        loading,


        error,



        /*
        |--------------------------------------------------------------------------
        | API
        |--------------------------------------------------------------------------
        */


        fetchMemberProjects: getMemberProjects,


    };


}