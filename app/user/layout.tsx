"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ProtectRoute } from "../utils/protectRoute";

export default function UserLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProtectRoute role="user">
      <div className="flex min-h-screen">
        <Sidebar role="user" isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 bg-gray-100 flex-1">{children}</main>
        </div>
      </div>
    </ProtectRoute>
  );
}
