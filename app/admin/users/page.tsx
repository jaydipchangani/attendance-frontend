"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetcher } from "../../utils/api";
import { API_BASE } from "../../utils/api";
import UserModal from "../../components/UserModel";

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

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch all users
  useEffect(() => {
    if (!user) return;
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetcher(`users`, user.token);
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Open Add Modal
  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (u: User) => {
    setEditingUser(u);
    setIsModalOpen(true);
  };

  // Delete User
  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await fetch(`${API_BASE}users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(users.filter((u) => u.s_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (formData: Partial<User>) => {
    if (!user) return;

    try {
      if (editingUser) {
        await fetch(`${API_BASE}users/${editingUser.s_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`${API_BASE}users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      setIsModalOpen(false);
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
 <div>
  <h2 className="text-2xl font-bold mb-4">All Users</h2>

  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
    <p className="font-medium">Total Users: {users.length}</p>
    <button
      onClick={handleAdd}
      className="px-4 py-2 bg-blue-600 text-white rounded text-sm sm:text-base"
    >
      + Add User
    </button>
  </div>

  {/* Table wrapper handles horizontal scroll */}
  <div className="overflow-x-auto max-w-full">
    <table className="min-w-[800px] w-full bg-white border text-sm sm:text-base">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-center">ID</th>
          <th className="px-4 py-2 text-center">Name</th>
          <th className="px-4 py-2 text-center">Email</th>
          <th className="px-4 py-2 text-center">Role</th>
          <th className="px-4 py-2 text-center">Department</th>
          <th className="px-4 py-2 text-center">Joining Date</th>
          <th className="px-4 py-2 text-center w-50">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.s_id} className="border-t">
            <td className="px-4 py-2">{u.s_id}</td>
            <td className="px-4 py-2 text-center">
              {u.first_name + " " + u.last_name}
            </td>
            <td className="px-4 py-2 text-center">{u.email}</td>
            <td className="px-4 py-2 text-center capitalize">{u.role}</td>
            <td className="px-4 py-2 text-center">{u.department}</td>
            <td className="px-4 py-2 text-center">
              {new Date(u.joining_date).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 text-center space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center">
              <button
                className="bg-green-500 px-3 py-1 rounded text-white text-sm"
                onClick={() => handleEdit(u)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded text-white text-sm"
                onClick={() => handleDelete(u.s_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Modal */}
  {isModalOpen && (
    <UserModal
      user={editingUser}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
    />
  )}
</div>


  );
};


export default AdminDashboardPage;
