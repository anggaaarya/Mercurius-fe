import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => void;
  userData: any;
}

export default function EditUserModal({ isOpen, onClose, onSave, userData }: EditUserModalProps) {
  
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    sto: "",           // <-- BARU
    jabatan: "",       // <-- BARU
    noTelp: "",
    district: "",
    idTelegram: "",
    username: "",
    role: "user",
  });

  // Isi form dengan data user ketika modal dibuka
  useEffect(() => {
    if (userData) {
      setForm({
        nik: userData.nik || "",
        nama: userData.nama || "",
        sto: userData.sto || "",           // <-- BARU
        jabatan: userData.jabatan || "",   // <-- BARU
        noTelp: userData.noTelp || "",
        district: userData.district || "",
        idTelegram: userData.idTelegram || "",
        username: userData.username || "",
        role: userData.role || "user",
      });
    }
  }, [userData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const districtOptions = ["Bandung", "Bekasi", "Bogor", "Cirebon", "Karawang", "Northern Jakarta", "Serang", "Soreang", "Southern Jakarta", "Tangerang", "Tasikmalaya"];
  const roleOptions = [
    { value: "user", label: "User" },
    { value: "organik", label: "Organik" },
    { value: "admin", label: "Admin" },
    { value: "superadmin", label: "Super Admin" }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackgroundClick}
    >
      
      {/* MODAL - UKURAN BESAR (max-w-2xl) */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* HEADER MODAL */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-700">EDIT USER</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM EDIT */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4">
            
            {/* NIK */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">NIK</label>
              <input
                type="text"
                name="nik"
                value={form.nik}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                placeholder="Masukkan NIK"
              />
            </div>

            {/* NAMA */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">NAMA</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                placeholder="Masukkan Nama Lengkap"
              />
            </div>

            {/* STO - BARU */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">STO</label>
              <input
                type="text"
                name="sto"
                value={form.sto}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                placeholder="Masukkan STO"
              />
            </div>

            {/* JABATAN - BARU */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">JABATAN</label>
              <input
                type="text"
                name="jabatan"
                value={form.jabatan}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                placeholder="Masukkan Jabatan"
              />
            </div>

            {/* NO. HP */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">NO. HP</label>
              <input
                type="tel"
                name="noTelp"
                value={form.noTelp}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* DISTRICT */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">DISTRICT</label>
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400 appearance-none cursor-pointer"
              >
                <option value="">Pilih District</option>
                {districtOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* ID TELEGRAM */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">ID TELEGRAM</label>
              <input
                type="text"
                name="idTelegram"
                value={form.idTelegram}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                placeholder="123456789"
              />
            </div>

            {/* USER TELEGRAM */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">USER TELEGRAM</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                placeholder="@username"
              />
            </div>

            {/* ROLE */}
            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-600 mb-1 block">ROLE</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-400 appearance-none cursor-pointer"
              >
                {roleOptions.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

          </div>

          {/* FOOTER MODAL - TOMBOL */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 transition"
            >
              BATAL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition shadow-md"
            >
              SIMPAN
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}