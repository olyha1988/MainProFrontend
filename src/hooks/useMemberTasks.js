import {

    useDispatch,

    useSelector,

} from "react-redux";


import {


    fetchMemberTasks,


    selectUserTasks,


    selectUserLoading,


    selectUserError,


} from "@/redux/slices/userSlice";



export default function useMemberTasks() {


    const dispatch = useDispatch();



    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */


    const tasks = useSelector(

        selectUserTasks

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


    const getMemberTasks = (

        userId,

        params = {}

    ) => {


        return dispatch(

            fetchMemberTasks({

                userId,

                params,

            })

        );


    };



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


        tasks,


        loading,


        error,



        /*
        |--------------------------------------------------------------------------
        | API
        |--------------------------------------------------------------------------
        */


        fetchMemberTasks: getMemberTasks,


    };


}