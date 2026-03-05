import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ===== SIMULASI LOGIN BERDASARKAN NIK =====
    // Ini cuma contoh! Nanti diganti dengan panggilan API beneran
    
    let userData;
    
    if (nik === "superadmin") {
      // SUPER ADMIN
      userData = {
        email: "super@mercurius.com",
        nama: "Super Admin",
        role: "superadmin",
        nik: "001",
        jabatan: "Direktur Utama",
        regional: "Pusat"
      };
    } 
    else if (nik === "admin") {
      // ADMIN
      userData = {
        email: "admin.bdg@mercurius.com",
        nama: "Admin Bandung",
        role: "admin",
        nik: "12345",
        jabatan: "Manajer Regional",
        regional: "Bandung",
        kota: "Bandung"  // Admin punya kota
      };
    }
    else if (nik === "organik") {
      // ORGANIK
      userData = {
        email: "organik@mercurius.com",
        nama: "Budi Organik",
        role: "organik",
        nik: "54321",
        jabatan: "Staf Lapangan",
        regional: "Jakarta",
        kota: "Jakarta"
      };
    }
    else if (nik === "user") {
      // USER
      userData = {
        email: "user@mercurius.com",
        nama: "Citra User",
        role: "user",
        nik: "67890",
        jabatan: "Karyawan",
        regional: "Bekasi",
        kota: "Bekasi"
      };
    }
    else {
      // DEFAULT: anggap USER
      userData = {
        email: "default@mercurius.com",
        nama: "Default User",
        role: "user",
        nik: "00000",
        jabatan: "User",
        regional: "Jakarta"
      };
    }
    
    // Simpan data user ke localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    
    // Redirect ke dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-5xl min-h-[520px] flex overflow-hidden">

        {/* KIRI - Form Login */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          
          {/* LOGO + KEPANJANGAN */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" className="w-20 h-auto" alt="logo" />
            <p className="text-[10px] text-slate-500 leading-tight">
              Minimizing Excess Resource to<br />
              Counter Illegal Use of Service
            </p>
          </div>
          
          <h2 className="text-xl font-bold mb-1">SELAMAT DATANG</h2>
          <p className="text-sm text-slate-500 mb-6">
            Silakan masuk untuk mengakses sistem
          </p>
          
          {/* PETUNJUK LOGIN (untuk testing) */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-700">
            <p className="font-semibold mb-1">🔑 TESTING LOGIN:</p>
            <p>superadmin / admin / organik / user</p>
            <p>(password bebas)</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            <div>
              <p className="text-sm font-semibold mb-1">NIK</p>
              <input 
                type="text" 
                value={nik} 
                onChange={(e) => setNik(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400" 
                placeholder="Masukkan NIK"
                required
              />
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-1">PASSWORD</p>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400" 
                placeholder="Masukkan password"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition mt-2"
            >
              CONFIRM
            </button>
            
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <span 
                  onClick={() => navigate("/register")}
                  className="text-red-500 cursor-pointer hover:underline font-medium"
                >
                  Sign up
                </span>
              </p>
              <span 
                onClick={() => navigate("/forgot-password")}
                className="text-red-500 text-sm cursor-pointer hover:underline w-fit"
              >
                Forgot Password
              </span>
            </div>

          </form>
        </div>

        {/* KANAN - Gambar Ilustrasi */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8">
          <img 
            src="/login-ilustrasi.png" 
            alt="ilustrasi login"
            className="w-full max-w-sm object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x300?text=Ilustrasi+Login";
            }}
          />
        </div>

      </div>
    </div>
  );
}