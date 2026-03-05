import { useState } from "react";
import { Trash2 } from "lucide-react";

type GrupItem = {
  id: string;
  name: string;
  unbind: boolean;
  bind: boolean;
  active: boolean;
};

interface TabGrupProps {
  userRole: string;
}

export default function TabGrup({ userRole }: TabGrupProps) {
  const isSuperAdmin = userRole === "superadmin";
  
  // State untuk grup
  const [idGroup, setIdGroup] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [grupList, setGrupList] = useState<GrupItem[]>([
    { id: "1", name: "Grup Testing 1", unbind: true, bind: false, active: true },
    { id: "2", name: "Grup Testing 2", unbind: false, bind: true, active: false },
  ]);

  // State untuk modal hapus
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedGroupName, setSelectedGroupName] = useState("");

  // Fungsi-fungsi
  const handleAddGrup = () => {
    if (!idGroup || !nameGroup) return;
    setGrupList([...grupList, { 
      id: idGroup, 
      name: nameGroup, 
      unbind: false, 
      bind: false, 
      active: true 
    }]);
    setIdGroup("");
    setNameGroup("");
  };

  const handleToggleActive = (index: number) => {
    const updated = [...grupList];
    updated[index].active = !updated[index].active;
    setGrupList(updated);
  };

  const handleToggleUnbind = (index: number) => {
    const updated = [...grupList];
    updated[index].unbind = !updated[index].unbind;
    setGrupList(updated);
  };

  const handleToggleBind = (index: number) => {
    const updated = [...grupList];
    updated[index].bind = !updated[index].bind;
    setGrupList(updated);
  };

  const openDeleteModal = (index: number, groupName: string) => {
    setSelectedIndex(index);
    setSelectedGroupName(groupName);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedIndex !== null) {
      const updated = grupList.filter((_, i) => i !== selectedIndex);
      setGrupList(updated);
      setSelectedIndex(null);
      setSelectedGroupName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* INPUT ROW */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="ID GROUP"
          value={idGroup}
          onChange={(e) => setIdGroup(e.target.value)}
          className="border border-slate-300 rounded-full px-5 py-2 text-sm flex-1 focus:outline-none focus:border-red-400 text-center placeholder:text-slate-400"
        />
        <input
          type="text"
          placeholder="NAME GROUP"
          value={nameGroup}
          onChange={(e) => setNameGroup(e.target.value)}
          className="border border-slate-300 rounded-full px-5 py-2 text-sm flex-1 focus:outline-none focus:border-red-400 text-center placeholder:text-slate-400"
        />
        <button
          onClick={handleAddGrup}
          className="bg-red-500 text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition shadow-md"
        >
          ADD
        </button>
      </div>

      {/* TABLE GRUP */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-slate-500">
            <tr className="border-b border-slate-200">
              <th className="text-center py-4 font-semibold">NAME GROUP</th>
              <th className="text-center py-4 font-semibold">ACCESS GROUP</th>
              <th className="text-center py-4 font-semibold">ACTIVATION</th>
            </tr>
          </thead>
          <tbody>
            {grupList.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-24 text-slate-300 text-sm">
                  Belum ada data
                </td>
              </tr>
            ) : (
              grupList.map((grup, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="text-center py-5 font-medium">{grup.name}</td>

                  {/* ACCESS GROUP - checkbox UNBIND & BIND */}
                  <td className="text-center py-5">
                    <div className="flex flex-col items-start gap-2 mx-auto w-fit">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={grup.unbind}
                          onChange={() => handleToggleUnbind(index)}
                          className="w-4 h-4 accent-red-500 cursor-pointer"
                        />
                        <span className="text-sm">UNBIND</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={grup.bind}
                          onChange={() => handleToggleBind(index)}
                          className="w-4 h-4 accent-red-500 cursor-pointer"
                        />
                        <span className="text-sm">BIND</span>
                      </label>
                    </div>
                  </td>

                  {/* ACTIVATION - toggle + delete */}
                  <td className="text-center py-5">
                    <div className="flex items-center justify-center gap-3">
                      {/* Toggle ON/OFF */}
                      <button
                        onClick={() => handleToggleActive(index)}
                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center px-1 ${
                          grup.active ? "bg-red-500" : "bg-slate-300"
                        }`}
                      >
                        {grup.active && (
                          <span className="absolute left-2 text-white text-[10px] font-bold">ON</span>
                        )}
                        <span
                          className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            grup.active ? "translate-x-7" : "translate-x-0"
                          }`}
                        />
                      </button>

                      {/* Tombol Delete - HANYA SUPER ADMIN */}
                      {isSuperAdmin && (
                        <button
                          onClick={() => openDeleteModal(index, grup.name)}
                          className="w-9 h-9 bg-red-500 text-white flex items-center justify-center rounded-lg hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL KONFIRMASI HAPUS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <p className="text-black text-center mb-6">
              Apakah Anda yakin ingin menghapus grup "{selectedGroupName}"?
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