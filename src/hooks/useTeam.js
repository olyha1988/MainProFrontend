import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchTeamMembers,

    fetchMemberProfile,

    fetchMemberProjects,

    fetchMemberTasks,

    fetchMemberWorkload,

    clearMember,

    selectTeamMembers,

    selectTeamMember,

    selectTeamProjects,

    selectTeamTasks,

    selectTeamWorkload,

    selectTeamPagination,

    selectTeamLoading,

    selectTeamError,

} from "@/redux/slices/teamSlice";

export default function useTeam() {

    const dispatch = useDispatch();

    return {

        members: useSelector(selectTeamMembers),

        member: useSelector(selectTeamMember),

        projects: useSelector(selectTeamProjects),

        tasks: useSelector(selectTeamTasks),

        workload: useSelector(selectTeamWorkload),

        pagination: useSelector(selectTeamPagination),

        loading: useSelector(selectTeamLoading),

        error: useSelector(selectTeamError),

        fetchMembers: params =>

            dispatch(fetchTeamMembers(params)),

        fetchMember: id =>

            dispatch(fetchMemberProfile(id)),

        fetchProjects: id =>

            dispatch(fetchMemberProjects(id)),

        fetchTasks: (memberId, params = {}) =>

            dispatch(

                fetchMemberTasks({

                    memberId,

                    params,

                })

            ),

        fetchWorkload: id =>

            dispatch(fetchMemberWorkload(id)),

        clearMember: () =>

            dispatch(clearMember()),

    };

}