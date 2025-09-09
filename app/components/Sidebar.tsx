"use client";

import Link from "next/link";

type SidebarProps = {
  role: "admin" | "user";
};

const Sidebar = ({ role }: SidebarProps) => {
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Attendance", path: "/admin/attendance" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "My Attendance", path: "/user/attendance" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className="px-3 py-2 rounded hover:bg-gray-700 transition"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
