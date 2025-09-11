"use client";
import React, { useState } from "react";

interface User {
  s_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  department: string;
  joining_date: string;
}

const UserModal = ({
  user,
  onClose,
  onSubmit,
}: {
  user: User | null;
  onClose: () => void;
  onSubmit: (formData: Partial<User> & { password?: string }) => void;
}) => {
  const departments = [
    "BTECH",
    "BPHARM",
    "MBA",
    "MCA",
    "MTECH",
    "PHD",
    "DIPLOMA",
    "BCA",
    "BSC",
    "MSC",
    "BCOM",
    "MCOM",
    "BA",
    "MA",
    "BBA",
  ];

  const roles = ["ADMIN", "STUDENT"];

  const [formData, setFormData] = useState<Partial<User> & { password?: string }>(
    user
      ? { ...user } // Editing existing user
      : {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          role: "STUDENT",
          department: "",
          joining_date: new Date().toISOString().split("T")[0],
        }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4">
          {user ? "Edit User" : "Add User"}
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            required
          />
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            required
          />

          {/* Show password only when adding a new user */}
          {!user && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded text-sm sm:text-base"
              required
            />
          )}

          <input
            type="date"
            name="joining_date"
            value={formData.joining_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            required
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400 text-sm sm:text-base w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto"
          >
            {user ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
