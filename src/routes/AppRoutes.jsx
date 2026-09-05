import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import NotFound from "@/pages/NotFound";

import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Register from "@/pages/auth/Register";
import Projects from "@/pages/projects/Projects";
import Tasks from "@/pages/tasks/Tasks";
import Teams from "@/pages/team/Teams";
import Settings from "@/pages/setting/Settings";
import Profile from "@/pages/profile/Profile";
import Kanban from "@/pages/Kanban";
import MemberProfile from "@/pages/team/MemberProfile";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/register"
                element={<Register />}
            />

            <Route element={<ProtectedRoute />}>

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/projects"
                        element={<Projects />}
                    />
                    <Route
                        path="/projects/:projectId"
                        element={<ProjectDetailsPage />}
                    />

                    <Route
                        path="/tasks"
                        element={<Tasks />}
                    />

                    <Route
                        path="/teams"
                        element={<Teams />}
                    />

                    <Route
                        path="/team/:id"
                        element={<MemberProfile />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/kanban"
                        element={<Kanban />}
                    />
                </Route>

            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}