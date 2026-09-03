import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice"
import profileReducer from "./slices/profileSlice";
import projectReducer from "./slices/projectSlice"
import userReducer from "./slices/userSlice";
import taskReducer from './slices/taskSlice';
import memberReducer from "./slices/memberSlice";
import teamReducer from "@/redux/slices/teamSlice";
// import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {

    auth: authReducer,
    dashboard: dashboardReducer,
    tasks: taskReducer,
    members: memberReducer,
    team: teamReducer,
// notifications: notificationReducer,
    profile: profileReducer,
    projects: projectReducer,
    users: userReducer,
  },
});

export default store;