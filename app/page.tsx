// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-800 py-20 sm:py-24 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to Attendance Manager
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-8">
            Effortlessly track and manage student attendance in a simple and organized way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition"
            >
              View Attendance
            </Link>
            <Link
              href="/login"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-700 transition"
            >
              Mark Attendance
            </Link>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-16 sm:py-20 text-center bg-gray-50 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-gray-800">Why Choose Us?</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold text-lg sm:text-xl mb-3 text-indigo-600">Easy to Use</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Mark and view attendance with a simple, intuitive interface designed for efficiency.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold text-lg sm:text-xl mb-3 text-indigo-600">Real-time Data</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                All attendance data is instantly updated and stored securely in the cloud.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold text-lg sm:text-xl mb-3 text-indigo-600">Reports & Insights</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Generate attendance reports and monitor student performance effortlessly.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-gray-100 text-gray-700 py-4 text-center mt-auto">
        &copy; {new Date().getFullYear()} Attendance Management System
      </footer>
    </div>
  );
}
