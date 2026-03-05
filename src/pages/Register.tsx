import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", 
    nama: "", 
    nik: "", 
    noTelp: "",
    perusahaan: "",
    jabatan: "", 
    district: "", 
    password: "", 
    rePassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const districtOptions = ["Bandung", "Bekasi", "Bogor", "Cirebon", "Karawang", "Northern Jakarta", "Serang", "Soreang", "Southern Jakarta", "Tangerang", "Tasikmalaya"];
  const perusahaanOptions = ["TIF", "TA", "ISH"];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-5xl flex overflow-hidden">

        <div className="w-1/2 p-8 flex flex-col justify-center relative">
          <button onClick={() => navigate("/login")} className="absolute top-4 right-4 text-slate-400 hover:text-black transition">
            <X size={18} />
          </button>
          
          {/* LOGO + KEPANJANGAN */}
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" className="w-20 h-auto" alt="logo" />
            <p className="text-[10px] text-slate-500 leading-tight">
              Minimizing Excess Resource to<br />
              Counter Illegal Use of Service
            </p>
          </div>
          
          <h2 className="text-sm font-bold text-center mb-3">SIGN UP</h2>
          
          {/* GRID 2 KOLOM */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* EMAIL (col-span-2) */}
            <div className="col-span-2">
              <p className="text-[10px] font-semibold mb-0.5">EMAIL</p>
              <input 
                name="email" 
                type="email"
                value={form.email} 
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400" 
              />
            </div>

            {/* NAMA (col-span-2) */}
            <div className="col-span-2">
              <p className="text-[10px] font-semibold mb-0.5">NAMA</p>
              <input 
                name="nama" 
                type="text"
                value={form.nama} 
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400" 
              />
            </div>

            {/* NIK - kiri */}
            <div>
              <p className="text-[10px] font-semibold mb-0.5">NIK</p>
              <input 
                name="nik" 
                type="text"
                value={form.nik} 
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400" 
              />
            </div>

            {/* NO. TELP - kanan */}
            <div>
              <p className="text-[10px] font-semibold mb-0.5">NO. TELP</p>
              <input 
                name="noTelp" 
                type="tel"
                value={form.noTelp} 
                onChange={handleChange}
                placeholder="08xxx"
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400" 
              />
            </div>

            {/* PERUSAHAAN - kiri */}
            <div>
              <p className="text-[10px] font-semibold mb-0.5">PERUSAHAAN</p>
              <div className="relative">
                <select 
                  name="perusahaan" 
                  value={form.perusahaan} 
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400 appearance-none cursor-pointer"
                >
                  <option value="">Pilih</option>
                  {perusahaanOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>

            {/* JABATAN - kanan */}
            <div>
              <p className="text-[10px] font-semibold mb-0.5">JABATAN</p>
              <input 
                name="jabatan" 
                type="text"
                value={form.jabatan} 
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400" 
              />
            </div>
            
            {/* DISTRICT (col-span-2) - karena pilihannya panjang */}
            <div className="col-span-2">
              <p className="text-[10px] font-semibold mb-0.5">DISTRICT</p>
              <div className="relative">
                <select 
                  name="district" 
                  value={form.district} 
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400 appearance-none cursor-pointer"
                >
                  <option value="">Pilih District</option>
                  {districtOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            
            {/* PASSWORD - kiri */}
            <div>
              <p className="text-[10px] font-semibold mb-0.5">PASSWORD</p>
              <input 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400" 
              />
            </div>

            {/* RE-PASSWORD - kanan */}
            <div>
              <p className="text-[10px] font-semibold mb-0.5">RE-PASSWORD</p>
              <input 
                name="rePassword" 
                type="password" 
                value={form.rePassword} 
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-red-400" 
              />
            </div>

          </div>

          <button 
            onClick={() => navigate("/login")}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition mt-3 text-sm"
          >
            CONFIRM
          </button>

        </div>

        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8">
          <img src="/login-ilustrasi.png"
            alt="ilustrasi register" className="w-full max-w-sm object-contain" />
        </div>

      </div>
    </div>
  );
}