"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ProtectRoute } from "../utils/protectRoute";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectRoute role="admin">
      <div className="flex min-h-screen">
        {/* Sidebar (responsive) */}
        <Sidebar role="admin" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="p-4 sm:p-6 bg-gray-100 flex-1">{children}</main>
        </div>
      </div>
    </ProtectRoute>
  );
}
