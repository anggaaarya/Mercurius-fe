import { Home, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  
  // State untuk menyimpan role user
  const [userRole, setUserRole] = useState("");

  // Ambil data user dari localStorage saat komponen dimuat
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role);
      console.log("Sidebar - User Role:", user.role); // Buat cek di console
    }
  }, []);

  // Tentukan role
  const isSuperAdmin = userRole === "superadmin";
  const isAdmin = userRole === "admin";
  const isOrganik = userRole === "organik";
  const isUser = userRole === "user";

  // Yang boleh lihat SETTING: SUPER ADMIN dan ADMIN
  const canSeeSetting = isSuperAdmin || isAdmin;

  return (
    <aside className="w-28 bg-white border-r border-slate-200 flex flex-col items-center py-6">
      
      <img src="/logo.png" className="w-20 mb-7" alt="logo" />

      <nav className="flex flex-col gap-6">

        {/* ===== MENU USER ===== */}
        {/* SEMUA ROLE bisa lihat USER (SUPER ADMIN, ADMIN, ORGANIK, USER) */}
        <Link to="/users">
          <button
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-sm transition ${
              location.pathname === "/users"
                ? "bg-red-50 text-red-500"
                : "text-slate-500 hover:bg-slate-100 hover:text-red-500"
            }`}
          >
            <Users size={26} />
            <span className="text-[10px] mt-1 font-medium">USER</span>
          </button>
        </Link>

        {/* ===== MENU HOME ===== */}
        {/* SEMUA ROLE bisa lihat HOME */}
        <Link to="/dashboard">
          <button
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-sm transition ${
              location.pathname === "/dashboard"
                ? "bg-red-50 text-red-500"
                : "text-slate-500 hover:bg-slate-100 hover:text-red-500"
            }`}
          >
            <Home size={26} />
            <span className="text-[10px] mt-1 font-medium">HOME</span>
          </button>
        </Link>

        {/* ===== MENU SETTING ===== */}
        {/* HANYA SUPER ADMIN dan ADMIN yang lihat SETTING */}
        {canSeeSetting && (
          <Link to="/setting">
            <button
              className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-sm transition ${
                location.pathname === "/setting"
                  ? "bg-red-50 text-red-500"
                  : "text-slate-500 hover:bg-slate-100 hover:text-red-500"
              }`}
            >
              <Settings size={26} />
              <span className="text-[10px] mt-1 font-medium">SETTING</span>
            </button>
          </Link>
        )}

      </nav>
    </aside>
  );
}