"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetcher } from "../../utils/api";

interface User {
  s_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  department: string;
  joining_date: string;
}

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetcher("users", user.token)
      .then((data) => {setUsers(data), console.log(data)})
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.s_id} className="border-t">
                <td className="px-4 py-2">{u.s_id}</td>
                <td className="px-4 py-2">{u.first_name}</td>
                <td className="px-4 py-2">{u.last_name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2">{u.department}</td>
                <td className="px-4 py-2">{new Date(u.joining_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
