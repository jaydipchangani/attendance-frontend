"use client";

import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

type ProtectRouteProps = {
  children: React.ReactNode;
  role: "admin" | "user";
};

export const ProtectRoute = ({ children, role }: ProtectRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Not logged in, redirect to login
    } else if (user.role !== role) {
      router.push("/login"); // Logged in but wrong role
    }
  }, [user, router, role]);

  if (!user || user.role !== role) {
    return null; // Optionally a loader or blank screen while redirecting
  }

  return <>{children}</>;
};
