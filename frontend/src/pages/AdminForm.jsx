import Sidebar from '../components/Admin/Sidebar.jsx'
import Dashboard from '../components/Admin/Dashboard.jsx'
import StatCard from '../components/Admin/StatCard.jsx'
import { Users, BookOpen, Settings, GraduationCap } from "lucide-react"

function AdminForm() {
  // Example data for the StatCards
  const stats = [
    { title: "Total Users", value: 1234, icon: Users, index: 0, trend: { value: 4.5, isPositive: true } },
    { title: "Courses", value: 56, icon: BookOpen, index: 1, trend: { value: 2.1, isPositive: false } },
    { title: "Active Students", value: 789, icon: GraduationCap, index: 2, trend: { value: 6.3, isPositive: true } },
    { title: "Settings Changed", value: 12, icon: Settings, index: 3, trend: { value: 1.5, isPositive: false } },
  ]

  return (
    <div className="flex min-h-screen bg-base-200">

      <Sidebar />


      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-primary">Admin Dashboard</h1>

        {/* Stat Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <StatCard key={i} title={stat.title} value={stat.value} Icon={stat.icon} trend={stat.trend} />
          ))}
        </div>

        <Dashboard />
      </div>
    </div>
  )
}

export default AdminForm
