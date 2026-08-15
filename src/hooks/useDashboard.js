import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchDashboard,

    clearDashboardError,

    resetDashboard,

} from "@/redux/slices/dashboardSlice";

export default function useDashboard() {

    const dispatch = useDispatch();

    const {

        summary,

        statusChart,

        priorityChart,

        projectProgress,

        recentProjects,

        recentTasks,

        loading,

        error,

    } = useSelector(

        state => state.dashboard

    );

    return {

        summary,

        statusChart,

        priorityChart,

        projectProgress,

        recentProjects,

        recentTasks,

        loading,

        error,

        fetchDashboard: () =>

            dispatch(fetchDashboard()),

        clearDashboardError: () =>

            dispatch(clearDashboardError()),

        resetDashboard: () =>

            dispatch(resetDashboard()),

    };

}