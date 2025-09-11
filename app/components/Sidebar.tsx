"use client";

import Link from "next/link";

type SidebarProps = {
  role: "admin" | "user";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const Sidebar = ({ role, isOpen, setIsOpen }: SidebarProps) => {
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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-lg font-bold mb-6">Menu</h2>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="px-3 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => setIsOpen(false)} // close on mobile
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
