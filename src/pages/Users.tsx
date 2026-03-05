import { useEffect, useState } from "react"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Users() {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const handleLogout = () => {
    // Redirect ke halaman login
    navigate("/login")
  }

  return (
    <main className="flex-1 p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[80vh] relative flex items-center justify-center">
        
        {/* JAM */}
        <div className="absolute top-6 right-6 text-right">
          <p className="text-sm text-slate-500">{formattedDate}</p>
          <p className="text-sm font-semibold">{time.toLocaleTimeString()}</p>
        </div>

        {/* USER PROFILE */}
        <div className="text-center">
          
          {/* Icon User */}
          <User size={120} className="mx-auto mb-6 text-slate-400" />

          {/* Data User */}
          <p className="font-semibold text-xl">Rifqi Amir Hamza</p>
          <p className="text-sm mt-2 text-slate-600">NIK 95*****</p>
          <p className="text-sm mt-2 text-slate-600">Officer 2 Assurance</p>
          <p className="text-sm mt-2 mb-8 text-slate-600">Regional Jakarta Banten</p>

          {/* Tombol LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-8 py-2 rounded-full hover:bg-red-600 transition shadow-md"
          >
            LOGOUT
          </button>

        </div>

      </div>
    </main>
  )
}