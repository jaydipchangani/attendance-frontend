"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetcher } from "../../utils/api";

interface Attendance {
  date: string;
  status: string;
}

const UserAttendancePage = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetcher(`attendance/student/${user.id}`, user.token)
      .then((data) => setAttendance(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p className="p-6">Loading attendance...</p>;

  // Calculate total present days and total days
  const totalDays = attendance.length;
  const totalPresent = attendance.filter(a => a.status.toLowerCase() === "present").length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">My Attendance</h2>

      <div className="mb-4">
        <span className="font-medium mr-4">Total Days: {totalDays}</span>
        <span className="font-medium">Present Days: {totalPresent}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a, index) => (
              <tr key={index} className="border-t">
                
                <td className="px-4 py-2">{new Date(a.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 capitalize">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendancePage;
