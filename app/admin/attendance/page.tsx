"use client";

import { API_BASE } from "@/app/utils/api";
import { useState, useEffect } from "react";

interface Student {
  s_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  role: string;
}

interface AttendanceSummary {
  student: Student;
  totalPresentDays: number;
}

interface AttendanceRecord {
  studentId: string;
  status: "PRESENT" | "ABSENT";
}

export default function Attendance() {
  const [data, setData] = useState<AttendanceSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [markDate, setMarkDate] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

 const fetchStudents = async () => {
  try {
    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).token : null;
    if (!token) return;

    const res = await fetch(`${API_BASE}users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch users");

    const allUsers = await res.json();
    const studentsData = allUsers.filter((user: Student) => user.role === "STUDENT");

    setStudents(studentsData);
    console.log("Fetched students:", studentsData);

    // Initialize attendance records
    const initialRecords = studentsData.map((s: Student) => ({
      studentId: s.s_id,
      status: "ABSENT" as "ABSENT" | "PRESENT",
    }));
    setAttendanceRecords(initialRecords);
  } catch (err) {
    console.error(err);
  }
};


  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;
      if (!token) throw new Error("No token found");

      const queryParams = new URLSearchParams();
      if (fromDate) queryParams.append("from", fromDate);
      if (toDate) queryParams.append("to", toDate);

      const res = await fetch(
        `${API_BASE}attendance/all?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch attendance");

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId: string, status: "PRESENT" | "ABSENT") => {
    setAttendanceRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r))
    );
  };

  const submitAttendance = async () => {
    try {
      if (!markDate) return alert("Please select a date");

      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;
      if (!token) return;

      const body = {
        date: markDate,
        records: attendanceRecords,
      };

      const res = await fetch(`${API_BASE}attendance/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to mark attendance");

      alert("Attendance marked successfully!");
      setModalOpen(false);
      fetchAttendance(); // Refresh table
    } catch (err) {
      console.error(err);
      alert("Error marking attendance");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Attendance Summary</h1>

      <div className="flex justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={fetchAttendance}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition"
          >
            Fetch
          </button>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Mark Attendance
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-center text-gray-500 py-10 text-sm">Loading attendance...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Student ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Present Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.student.s_id} className="border-t">
                      <td className="px-4 py-2 text-center">{item.student.s_id}</td>
                      <td className="px-4 py-2 text-center">
                        {item.student.first_name} {item.student.last_name}
                      </td>
                      <td className="px-4 py-2 text-center">{item.student.email}</td>
                      <td className="px-4 py-2 text-center">{item.student.department}</td>
                      <td className="px-4 py-2 text-center">{item.totalPresentDays}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No attendance data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

            <div className="mb-4">
              <label className="mb-1 font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={markDate}
                onChange={(e) => setMarkDate(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-y-auto max-h-96">
              {students.map((s) => {
                const record = attendanceRecords.find((r) => r.studentId === s.s_id);
                return (
                  <div key={s.s_id} className="flex items-center justify-between border-b py-2">
                    <div>
                      {s.first_name} {s.last_name} ({s.department})
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`status-${s.s_id}`}
                          checked={record?.status === "PRESENT"}
                          onChange={() => handleStatusChange(s.s_id, "PRESENT")}
                        />
                        Present
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`status-${s.s_id}`}
                          checked={record?.status === "ABSENT"}
                          onChange={() => handleStatusChange(s.s_id, "ABSENT")}
                        />
                        Absent
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitAttendance}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
