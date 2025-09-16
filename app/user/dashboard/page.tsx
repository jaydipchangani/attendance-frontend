import Link from "next/link"

export default function StudentDashboard(){
  return(
    <div className="h-full bg-gray-50 flex flex-col items-center justify-center gap-6">
  <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 max-w-md w-full text-center">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
      Welcome, Student!
    </h1>
    <p className="text-gray-700">
      This is your personal dashboard. Here you can view your details and updates related to your attendance and academic information.
    </p>
  </div>

  <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
    <Link href="/user/attendance" >

    View Attendance
    </Link>
  </button>
</div>

  )
}