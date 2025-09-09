"use client";

import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ProtectRoute } from "../utils/protectRoute";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectRoute role="admin">
      <div className="flex min-h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 bg-gray-100 flex-1">{children}</main>
        </div>
      </div>
    </ProtectRoute>
  );
}
