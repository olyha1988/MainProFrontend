import {

    useDispatch,

    useSelector,

} from "react-redux";


import {


    fetchMemberWorkload,


    selectUserWorkload,


    selectUserLoading,


    selectUserError,


} from "@/redux/slices/userSlice";



export default function useMemberWorkload() {


    const dispatch = useDispatch();



    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */


    const workload = useSelector(

        selectUserWorkload

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


    const getMemberWorkload = (userId) => {


        return dispatch(

            fetchMemberWorkload(userId)

        );


    };



    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */
console.log("Redux workload:", workload);

    return {


        /*
        |--------------------------------------------------------------------------
        | State
        |--------------------------------------------------------------------------
        */


        workload,


        loading,


        error,



        /*
        |--------------------------------------------------------------------------
        | API
        |--------------------------------------------------------------------------
        */


        fetchMemberWorkload: getMemberWorkload,


    };


}