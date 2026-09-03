import {

    useDispatch,
    useSelector,

} from "react-redux";

import {

    useCallback,

} from "react";


import {

    fetchProjectMembers,

    clearMembers as clearMembersAction,

    selectMembers,

    selectMembersLoading,

    selectMembersError,

} from "@/redux/slices/memberSlice";


export default function useProjectMembers() {


    const dispatch = useDispatch();


    const members = useSelector(
        selectMembers
    );


    const loading = useSelector(
        selectMembersLoading
    );


    const error = useSelector(
        selectMembersError
    );



    const fetchMembers = useCallback(

        (projectId) => {

            return dispatch(
                fetchProjectMembers(projectId)
            );

        },

        [
            dispatch
        ]

    );



    const clearMembers = useCallback(

        () => {

            dispatch(
                clearMembersAction()
            );

        },

        [
            dispatch
        ]

    );



    return {


        members,


        loading,


        error,


        fetchMembers,


        clearMembers,


    };


}