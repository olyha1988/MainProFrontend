import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaUser,
} from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    name: "Projects",
    icon: <FaProjectDiagram />,
    path: "/projects",
  },
  {
    name: "Tasks",
    icon: <FaTasks />,
    path: "/tasks",
  },
  {
    name: "Teams",
    icon: <FaUsers />,
    path: "/teams",
  },
  {
    name: "Profile",
    icon: <FaUser />,
    path: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 bg-slate-900 text-white md:block">
      <div className="p-6 text-2xl font-bold">
        TeamTask
      </div>

      <nav className="space-y-2 px-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg p-3 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {menu.icon}

            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
