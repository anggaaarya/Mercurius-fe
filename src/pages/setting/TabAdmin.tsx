import { useState } from "react";
import { Trash2 } from "lucide-react";
import { districtOptions } from "../../constants/districts";

type AdminItem = {
  email: string;
  nik: string;
  nama: string;
  district: string;
  jabatan: string;
  active: boolean;
};

interface TabAdminProps {
  userRole: string;
}

export default function TabAdmin({ userRole }: TabAdminProps) {
  const isSuperAdmin = userRole === "superadmin";
  const isAdmin = userRole === "admin";

  const [adminEmail, setAdminEmail] = useState("");
  const [adminNik, setAdminNik] = useState("");
  const [adminDistrict, setAdminDistrict] = useState("");
  const [adminList, setAdminList] = useState<AdminItem[]>([
    { email: "admin1@telkom.com", nik: "123456", nama: "Admin Satu", district: "Jakarta", jabatan: "Manager", active: true },
    { email: "admin2@telkom.com", nik: "789012", nama: "Admin Dua", district: "Banten", jabatan: "Supervisor", active: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedAdminName, setSelectedAdminName] = useState("");

  const handleAddAdmin = () => {
    if (!adminEmail || !adminNik) return;
    setAdminList([...adminList, { 
      email: adminEmail, 
      nik: adminNik, 
      nama: "", 
      district: adminDistrict, 
      jabatan: "", 
      active: true 
    }]);
    setAdminEmail("");
    setAdminNik("");
    setAdminDistrict("");
  };

  const handleToggleAdminActive = (index: number) => {
    const updated = [...adminList];
    updated[index].active = !updated[index].active;
    setAdminList(updated);
  };

  const openDeleteModal = (index: number, adminName: string) => {
    setSelectedIndex(index);
    setSelectedAdminName(adminName);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedIndex !== null) {
      const updated = adminList.filter((_, i) => i !== selectedIndex);
      setAdminList(updated);
      setSelectedIndex(null);
      setSelectedAdminName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {isSuperAdmin && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 mb-3">TAMBAH ADMIN BARU</p>
          <div className="flex gap-4 items-center">
            <input
              type="email"
              placeholder="EMAIL"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="border border-slate-300 rounded-full px-5 py-2 text-sm flex-1 focus:outline-none focus:border-red-400"
            />
            <input
              type="text"
              placeholder="NIK"
              value={adminNik}
              onChange={(e) => setAdminNik(e.target.value)}
              className="border border-slate-300 rounded-full px-5 py-2 text-sm flex-1 focus:outline-none focus:border-red-400"
            />
            <select
              value={adminDistrict}
              onChange={(e) => setAdminDistrict(e.target.value)}
              className="border border-slate-300 rounded-full px-5 py-2 text-sm flex-1 focus:outline-none focus:border-red-400"
            >
              <option value="">Pilih District</option>
              {districtOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <button
              onClick={handleAddAdmin}
              className="bg-red-500 text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition shadow-md whitespace-nowrap"
            >
              ADD
            </button>
          </div>
        </div>
      )}

      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-slate-500">
            <tr className="border-b border-slate-200">
              <th className="text-center py-4 font-semibold">EMAIL</th>
              <th className="text-center py-4 font-semibold">NIK</th>
              <th className="text-center py-4 font-semibold">NAMA</th>
              <th className="text-center py-4 font-semibold">DISTRICT</th>
              <th className="text-center py-4 font-semibold">JABATAN</th>
              <th className="text-center py-4 font-semibold">ACTIVATION</th>
            </tr>
          </thead>
          <tbody>
            {adminList.map((admin, index) => (
              <tr key={index} className="border-b border-slate-100">
                <td className="text-center py-5">{admin.email}</td>
                <td className="text-center py-5">{admin.nik}</td>
                <td className="text-center py-5">{admin.nama || "-"}</td>
                <td className="text-center py-5">{admin.district || "-"}</td>
                <td className="text-center py-5">{admin.jabatan || "-"}</td>
                <td className="text-center py-5">
                  <div className="flex items-center justify-center gap-3">
                    {(isSuperAdmin || isAdmin) && (
                      <button
                        onClick={() => handleToggleAdminActive(index)}
                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center px-1 ${
                          admin.active ? "bg-red-500" : "bg-slate-300"
                        }`}
                      >
                        {admin.active && (
                          <span className="absolute left-2 text-white text-[10px] font-bold">ON</span>
                        )}
                        <span
                          className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            admin.active ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </button>
                    )}
                    
                    {isSuperAdmin && (
                      <button
                        onClick={() => openDeleteModal(index, admin.nama || admin.email)}
                        className="w-9 h-9 bg-red-500 text-white flex items-center justify-center rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <p className="text-black text-center mb-6">
              Apakah Anda yakin ingin menghapus admin "{selectedAdminName}"?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition"
              >
                BATAL
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                HAPUS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}