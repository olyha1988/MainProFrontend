import { Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import Projects from "@/pages/projects/Projects";
import Team from "@/pages/team/Team";
import Tasks from "@/pages/tasks/Tasks";
import Profile from "@/pages/profile/Profile";

import NotFound from "@/pages/NotFound";

import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Register from "@/pages/auth/Register";
import Kanban from "@/pages/Kanban";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

       <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

             <Route
                        path="/projects"
                        element={<Projects />}
                    />
                  


                    <Route
                        path="/tasks"
                        element={<Tasks />}
                    />

                    <Route
                        path="/teams"
                        element={<Team />}
                    />

                      <Route
                        path="/kanban"
                        element={<Kanban />}
                    />

                   


                  

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                 
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
