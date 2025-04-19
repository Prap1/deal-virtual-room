import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    // Add more admin-specific routes if needed
    // { label: "Users", path: "/admin/users", icon: <Users size={18} /> },
    // { label: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
    { label: "Logout", path: "/logout", icon: <LogOut size={18} /> },
  ];

  return (
    <div className="min-h-screen w-64 bg-gray-900 text-white flex flex-col px-6 py-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col space-y-4">
        {navLinks.map(({ label, path, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === path ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
