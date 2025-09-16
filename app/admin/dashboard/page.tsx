import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="h-full bg-gray-50 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-12 max-w-md w-full text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome, Admin!
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-8">
          This is your admin dashboard. From here, you can manage students, view attendance, and monitor reports.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            href="/admin/attendance"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition text-center w-full sm:w-auto"
          >
            View Attendance
          </Link>

          <Link
            href="/admin/users"
            className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition text-center w-full sm:w-auto"
          >
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}
