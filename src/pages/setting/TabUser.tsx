import { useState } from "react";
import { Trash2 } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import EditUserModal from "../../components/EditUserModal";

// TIPE DATA BARU dengan STO dan JABATAN
type UserItem = {
  email: string;
  nama: string;
  nik: string;
  sto: string;        // <-- BARU
  jabatan: string;    // <-- BARU
  district: string;
  noTelp: string;
  username: string;
  idTelegram: string;
  role: string;
  active: boolean;
};

interface TabUserProps {
  userRole: string;
}

export default function TabUser({ userRole }: TabUserProps) {
  const isSuperAdmin = userRole === "superadmin";
  const isAdmin = userRole === "admin";

  // State untuk form tambah user (TAMBAH STO dan JABATAN)
  const [userEmail, setUserEmail] = useState("");
  const [userNama, setUserNama] = useState("");
  const [userNik, setUserNik] = useState("");
  const [userSto, setUserSto] = useState("");           // <-- BARU
  const [userJabatan, setUserJabatan] = useState("");   // <-- BARU
  const [userDistrict, setUserDistrict] = useState("");
  const [userNoTelp, setUserNoTelp] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userIdTelegram, setUserIdTelegram] = useState("");
  const [userRole2, setUserRole2] = useState("user");
  const [searchUser, setSearchUser] = useState("");

  // State untuk user list (UPDATE DATA DUMMY)
  const [userList, setUserList] = useState<UserItem[]>([
    {
      email: "user1@email.com",
      nama: "User Satu",
      nik: "123456",
      sto: "STO Jakarta Pusat",        // <-- BARU
      jabatan: "Staff",                 // <-- BARU
      district: "Jakarta",
      noTelp: "08123456789",
      username: "@user_satu",
      idTelegram: "123456789",
      role: "user",
      active: true
    },
    {
      email: "user2@email.com",
      nama: "User Dua",
      nik: "789012",
      sto: "STO Bandung Timur",         // <-- BARU
      jabatan: "Supervisor",             // <-- BARU
      district: "Bandung",
      noTelp: "08987654321",
      username: "@user_dua",
      idTelegram: "987654321",
      role: "organik",
      active: false
    },
    {
      email: "user3@email.com",
      nama: "User Tiga",
      nik: "345678",
      sto: "STO Bekasi Kota",           // <-- BARU
      jabatan: "Manager",                // <-- BARU
      district: "Bekasi",
      noTelp: "08123456788",
      username: "@user_tiga",
      idTelegram: "123456788",
      role: "admin",
      active: true
    },
  ]);

  // State untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  // State untuk modal hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  // Opsi district
  const districtOptions = ["Bandung", "Bekasi", "Bogor", "Cirebon", "Karawang", "Northern Jakarta", "Serang", "Soreang", "Southern Jakarta", "Tangerang", "Tasikmalaya"];

  // FILTER USER BERDASARKAN PENCARIAN (UPDATE)
  const filteredUsers = userList.filter(user => {
    const searchTerm = searchUser.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchTerm) ||
      user.nama.toLowerCase().includes(searchTerm) ||
      user.nik.toLowerCase().includes(searchTerm) ||
      user.sto.toLowerCase().includes(searchTerm) ||           // <-- BARU
      user.jabatan.toLowerCase().includes(searchTerm) ||       // <-- BARU
      user.district.toLowerCase().includes(searchTerm) ||
      user.noTelp.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm) ||
      user.idTelegram.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  });

  // ===== FUNGSI TAMBAH USER (UPDATE) =====
  const handleAddUser = () => {
    if (!userEmail || !userNama || !userIdTelegram || !userUsername) return;
    setUserList([...userList, {
      email: userEmail,
      nama: userNama,
      nik: userNik,
      sto: userSto,                 // <-- BARU
      jabatan: userJabatan,         // <-- BARU
      district: userDistrict,
      noTelp: userNoTelp,
      username: userUsername,
      idTelegram: userIdTelegram,
      role: userRole2,
      active: true
    }]);
    // Reset form
    setUserEmail("");
    setUserNama("");
    setUserNik("");
    setUserSto("");                  // <-- BARU
    setUserJabatan("");              // <-- BARU
    setUserDistrict("");
    setUserNoTelp("");
    setUserUsername("");
    setUserIdTelegram("");
    setUserRole2("user");
  };

  // ===== FUNGSI TOGGLE ACTIVE =====
  const handleToggleUserActive = (index: number) => {
    const updated = [...userList];
    updated[index].active = !updated[index].active;
    setUserList(updated);
  };

  // ===== FUNGSI EDIT USER =====
  const handleEditUser = (user: UserItem) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedData: any) => {
    if (selectedUser) {
      const updatedList = userList.map(user =>
        user.email === selectedUser.email ? { ...user, ...updatedData } : user
      );
      setUserList(updatedList);
    }
  };

  // ===== FUNGSI HAPUS USER =====
  const openDeleteUserModal = (index: number, userName: string) => {
    setSelectedUserIndex(index);
    setSelectedUserName(userName);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUserIndex !== null) {
      const updated = userList.filter((_, i) => i !== selectedUserIndex);
      setUserList(updated);
      setSelectedUserIndex(null);
      setSelectedUserName("");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* FORM ADD USER - HANYA SUPER ADMIN (UPDATE) */}
      {isSuperAdmin && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 mb-3">TAMBAH USER BARU</p>

          {/* Baris 1: EMAIL, NAMA, NIK */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <p className="text-[10px] font-semibold mb-1">EMAIL</p>
              <input
                type="email"
                placeholder="user@email.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold mb-1">NAMA</p>
              <input
                type="text"
                placeholder="Nama"
                value={userNama}
                onChange={(e) => setUserNama(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold mb-1">NIK</p>
              <input
                type="text"
                placeholder="NIK"
                value={userNik}
                onChange={(e) => setUserNik(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
          </div>

          {/* Baris 2: STO, JABATAN, DISTRICT (BARU) */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <p className="text-[10px] font-semibold mb-1">STO</p>
              <input
                type="text"
                placeholder="STO"
                value={userSto}
                onChange={(e) => setUserSto(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold mb-1">JABATAN</p>
              <input
                type="text"
                placeholder="Jabatan"
                value={userJabatan}
                onChange={(e) => setUserJabatan(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold mb-1">DISTRICT</p>
              <select
                value={userDistrict}
                onChange={(e) => setUserDistrict(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              >
                <option value="">Pilih District</option>
                {districtOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Baris 3: NO TELP, USER TG, ID TG, ROLE */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-[10px] font-semibold mb-1">NO. TELP</p>
              <input
                type="tel"
                placeholder="08xxx"
                value={userNoTelp}
                onChange={(e) => setUserNoTelp(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold mb-1">USER TG</p>
              <input
                type="text"
                placeholder="@username"
                value={userUsername}
                onChange={(e) => setUserUsername(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold mb-1">ID TG</p>
              <input
                type="text"
                placeholder="123456789"
                value={userIdTelegram}
                onChange={(e) => setUserIdTelegram(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold mb-1">ROLE</p>
              <select
                value={userRole2}
                onChange={(e) => setUserRole2(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-400"
              >
                <option value="user">User</option>
                <option value="organik">Organik</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
          </div>

          {/* Tombol ADD */}
          <div className="flex justify-end">
            <button
              onClick={handleAddUser}
              className="bg-red-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-red-600 transition text-sm"
            >
              ADD USER
            </button>
          </div>
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari user..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="w-full border border-slate-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-red-400 pl-10"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchUser && (
          <button
            onClick={() => setSearchUser("")}
            className="px-4 py-2 text-sm text-red-500 hover:text-red-600 font-semibold"
          >
            RESET
          </button>
        )}
      </div>

      {/* Status hasil pencarian */}
      {searchUser && (
        <p className="text-sm text-slate-500">
          Menampilkan {filteredUsers.length} dari {userList.length} user
        </p>
      )}

      {/* TABLE USER - 9 KOLOM (TAMBAH STO & JABATAN) */}
      <div className="border border-slate-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: "1100px" }}>
          <thead className="text-slate-500">
            <tr className="border-b border-slate-200">
              <th className="text-center py-4 px-3 font-semibold">EMAIL</th>
              <th className="text-center py-4 px-3 font-semibold">NAMA</th>
              <th className="text-center py-4 px-3 font-semibold">NIK</th>
              <th className="text-center py-4 px-3 font-semibold">STO</th>           {/* BARU */}
              <th className="text-center py-4 px-3 font-semibold">JABATAN</th>       {/* BARU */}
              <th className="text-center py-4 px-3 font-semibold">DISTRICT</th>
              <th className="text-center py-4 px-3 font-semibold">NO. TELP</th>
              <th className="text-center py-4 px-3 font-semibold">ROLE</th>
              <th className="text-center py-4 px-3 font-semibold">ACTIVATION</th>
              <th className="text-center py-4 px-3 font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-24 text-slate-300 text-sm">
                  {searchUser ? "Tidak ada user yang cocok dengan pencarian" : "Belum ada data"}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="text-center py-4 px-3">{user.email}</td>
                  <td className="text-center py-4 px-3">{user.nama}</td>
                  <td className="text-center py-4 px-3">{user.nik || "-"}</td>
                  <td className="text-center py-4 px-3">{user.sto || "-"}</td>           {/* BARU */}
                  <td className="text-center py-4 px-3">{user.jabatan || "-"}</td>       {/* BARU */}
                  <td className="text-center py-4 px-3">{user.district || "-"}</td>
                  <td className="text-center py-4 px-3">{user.noTelp || "-"}</td>
                  <td className="text-center py-4 px-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "superadmin" ? "bg-purple-100 text-purple-700" :
                      user.role === "admin" ? "bg-blue-100 text-blue-700" :
                      user.role === "organik" ? "bg-green-100 text-green-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="text-center py-4 px-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleToggleUserActive(index)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${
                          user.active ? "bg-red-500" : "bg-slate-300"
                        }`}
                      >
                        {user.active && (
                          <span className="absolute left-1 text-white text-[8px] font-bold">ON</span>
                        )}
                        <span
                          className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                            user.active ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="text-center py-4 px-3">
                    <div className="flex items-center justify-center gap-2">
                      {/* TOMBOL EDIT */}
                      {(isSuperAdmin || isAdmin) && (
                        <button
                          onClick={() => handleEditUser(user)}
                          className="w-7 h-7 bg-red-500 text-white flex items-center justify-center rounded-lg hover:bg-red-600 transition"
                          title="Edit User"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                          </svg>
                        </button>
                      )}

                      {/* TOMBOL DELETE */}
                      {isSuperAdmin && (
                        <button
                          onClick={() => openDeleteUserModal(index, user.nama)}
                          className="w-7 h-7 bg-red-500 text-white flex items-center justify-center rounded-lg hover:bg-red-600 transition"
                          title="Hapus User"
                        >
                          <Trash2 size={14} />
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

      {/* MODAL EDIT USER */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
        userData={selectedUser}
      />

      {/* MODAL KONFIRMASI HAPUS USER */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        message={`Apakah Anda yakin ingin menghapus user "${selectedUserName}"?`}
      />
    </div>
  );
}