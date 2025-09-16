"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      await login(email, password);
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded shadow">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-xs sm:text-sm text-center text-gray-600">
          Don&apos;t have an account? <span className="font-medium">Contact the Admin</span> for registration.

          <p>Admin id & password : admin@gmail.com</p>

        <p>Student id & password : jaydip@gmail.com</p>
        </p>
        
      </div>
    </div>
  );
};

export default LoginPage;
