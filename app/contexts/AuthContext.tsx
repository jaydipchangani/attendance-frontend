'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeJWT } from "../utils/jwt";

type User = {
  id: string;
  name: string;
  role: "admin" | "user";
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user"); // clear invalid value
    }
  }
}, []);


  const login = async (email: string, password: string) => {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

 if (res.ok) {
  const decoded = decodeJWT(data.access_token);

  const loggedInUser: User = {
    id: decoded?.sub || "",      
    name: email,                 
    role: decoded?.role?.toLowerCase() === "admin" ? "admin" : "user",
    token: data.access_token,
  };

  setUser(loggedInUser);
  localStorage.setItem("user", JSON.stringify(loggedInUser));

  router.push(loggedInUser.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
}
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
