"use client";

import { HiMenu } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";

type NavbarProps = {
  toggleSidebar?: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white px-4 sm:px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="md:hidden focus:outline-none"
          >
            <HiMenu size={24} />
          </button>
        )}
        <h1 className="text-lg sm:text-xl font-bold">Attendance System</h1>
      </div>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
          <span className="capitalize hidden xs:inline">
            {user.name} ({user.role})
          </span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
