"use client";

import { API_BASE } from "@/app/utils/api";
import { useState } from "react";

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

export default function Attendance() {
    const [data, setData] = useState<AttendanceSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

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

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Attendance Summary</h1>

          
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-end justify-between flex-wrap gap-4">
               
                <div className="flex items-end gap-8 flex-wrap ">
                
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">From</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px] mx-5 my-2"
                        />
                    </div>

                 
                    <div className="flex flex-col ">
                        <label className="mb-1 font-medium text-gray-700 ">To</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px] "
                        />
                    </div>
                </div>

    
                <div className="ml-auto">
                    <button
                        onClick={fetchAttendance}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded transition"
                    >
                        Fetch
                    </button>
                </div>
            </div>



            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                {loading ? (
                    <p className="text-center text-gray-500 py-10 text-sm">Loading attendance...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 ">Student ID</th>
                                    <th className="px-4 py-2 ">Name</th>
                                    <th className="px-4 py-2 ">Email</th>
                                    <th className="px-4 py-2 ">Department</th>
                                    <th className="px-4 py-2 ">Present Days</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr
                                            key={item.student.s_id}
                                            className=" border-t"
                                        >
                                            <td className="px-4 py-2 text-center">{item.student.s_id}</td>
                                            <td className="px-4 py-2 text-center">
                                                {item.student.first_name} {item.student.last_name}
                                            </td>
                                            <td className="px-4 py-2 text-center">{item.student.email}</td>
                                            <td className="px-4 py-2  text-center">{item.student.department}</td>
                                            <td className="px-4 py-2 text-center">
                                                {item.totalPresentDays}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No attendance data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}
