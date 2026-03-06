import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Folder, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type DetailItem = {
  id: number;
  noInet: string;
  alasan: string;
  domain: string;
  noTiket: string;
  nikSpv: string;
  district: string;
  clidLama: string;
  clidBaru: string;
  userIdPengirim: string;
  updateId: string;
  status: "Success" | "Failed" | "Pending" | "Rejected";
  dateCreate: string;
  chatId: string;
  namaSpv: string;
  jenis: string;
  userIdForward: string;
  lastUpdate: string;
  isAutoBind: boolean;
  dateAutoBind: string;
  statusAutoBind: string;
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  nomorHp: string;
  aksesBot: string;
  statusString: string;
};

// Tanggal berjarak dari Jan - Mar 2026
const dates = [
  "2026-01-03", "2026-01-07", "2026-01-12", "2026-01-15", "2026-01-20",
  "2026-01-25", "2026-01-28", "2026-02-02", "2026-02-06", "2026-02-10",
  "2026-02-14", "2026-02-18", "2026-02-21", "2026-02-25", "2026-02-28",
  "2026-03-01", "2026-03-04", "2026-03-06", "2026-03-09", "2026-03-11",
  "2026-03-13", "2026-03-15", "2026-03-17", "2026-03-19", "2026-03-21",
  "2026-03-23", "2026-03-25", "2026-03-27", "2026-03-28", "2026-03-30",
];

const generateDummy = (witel: string): DetailItem[] => {
  const statuses: DetailItem["status"][] = ["Success", "Failed", "Pending", "Rejected"];
  const districts = ["Serang", "Tangerang", "Cilegon", "Lebak", "Pandeglang", "Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur"];
  const jenisList = ["Unbind", "Bind", "Auto Bind"];
  const aksesList = ["Admin", "User", "Viewer"];
  const alasanList = ["Ganti Perangkat", "Pindah Lokasi", "Reset Ulang"];

  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    noInet: `192.168.${(i * 17) % 255}.${(i * 31) % 255}`,
    alasan: alasanList[i % 3],
    domain: `domain${i + 1}.telkom.net`,
    noTiket: `TKT-${String(i + 1).padStart(3, "0")}`,
    nikSpv: `NIK${String(100 + i).padStart(5, "0")}`,
    district: districts[i % districts.length],
    clidLama: `CLID-L${String(i + 1).padStart(4, "0")}`,
    clidBaru: `CLID-B${String(i + 1).padStart(4, "0")}`,
    userIdPengirim: `UID-P${i + 1}`,
    updateId: `UPD-${i + 1}`,
    status: statuses[i % statuses.length],
    dateCreate: dates[i],
    chatId: `CHAT-${100000 + i}`,
    namaSpv: `Supervisor ${i + 1}`,
    jenis: jenisList[i % jenisList.length],
    userIdForward: `UID-F${i + 1}`,
    lastUpdate: `${dates[i]} 08:${String(i % 60).padStart(2, "0")}`,
    isAutoBind: i % 2 === 0,
    dateAutoBind: dates[i],
    statusAutoBind: i % 2 === 0 ? "Active" : "Inactive",
    userId: `USR-${i + 1}`,
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    username: `@user${i + 1}_${witel?.toLowerCase()}`,
    nomorHp: `08${String(100000000 + i * 111111).substring(0, 10)}`,
    aksesBot: aksesList[i % aksesList.length],
    statusString: statuses[i % statuses.length].toLowerCase(),
  }));
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Success": return "text-green-600 bg-green-100";
    case "Failed": return "text-red-600 bg-red-100";
    case "Pending": return "text-yellow-600 bg-yellow-100";
    case "Rejected": return "text-slate-600 bg-slate-100";
    default: return "text-slate-600 bg-slate-100";
  }
};

const columns = [
  "ID", "No. Inet", "Alasan", "Domain", "No Tiket", "NIK SPV", "District",
  "CLID Lama", "CLID Baru", "User ID Pengirim", "Update ID", "Status",
  "Date Create", "Chat ID", "Nama SPV", "Jenis", "User ID Forward",
  "Last Update", "Is Auto Bind", "Date Auto Bind", "Status Auto Bind",
  "User ID", "First Name", "Last Name", "Username", "Nomor HP",
  "Akses Bot", "Status String"
];

const ITEMS_PER_PAGE = 10;

export default function Detail() {
  const { witel } = useParams();
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  
  // ===== STATE UNTUK SEARCH =====
  const [searchInput, setSearchInput] = useState("");  // Input dari user
  const [searchTerm, setSearchTerm] = useState("");    // Term yang dipakai filter
  const [isSearching, setIsSearching] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dummyData = generateDummy(witel || "");

  // ===== FUNGSI SEARCH DENGAN LOADING =====
  const handleSearch = () => {
    if (isSearching) return;
    
    setIsSearching(true);
    
    // Simulasi delay (nanti diganti dengan async call)
    setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
      setIsSearching(false);
    }, 500);
  };

  // ===== FUNGSI RESET SEARCH =====
  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // ===== HANDLE KEY PRESS (Enter) =====
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Filter data berdasarkan searchTerm (BUKAN searchInput)
  const filteredData = dummyData.filter((item) => {
    const term = searchTerm.toLowerCase();
    if (!term) return true;
    
    return (
      item.noInet.toLowerCase().includes(term) ||
      item.noTiket.toLowerCase().includes(term) ||
      item.district.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term) ||
      item.username.toLowerCase().includes(term) ||
      item.namaSpv.toLowerCase().includes(term) ||
      item.alasan.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDownloadXLS = () => {
    const exportData = filteredData.map((item) => ({
      "ID": item.id,
      "No. Inet": item.noInet,
      "Alasan": item.alasan,
      "Domain": item.domain,
      "No Tiket": item.noTiket,
      "NIK SPV": item.nikSpv,
      "District": item.district,
      "CLID Lama": item.clidLama,
      "CLID Baru": item.clidBaru,
      "User ID Pengirim": item.userIdPengirim,
      "Update ID": item.updateId,
      "Status": item.status,
      "Date Create": item.dateCreate,
      "Chat ID": item.chatId,
      "Nama SPV": item.namaSpv,
      "Jenis": item.jenis,
      "User ID Forward": item.userIdForward,
      "Last Update": item.lastUpdate,
      "Is Auto Bind": item.isAutoBind ? "Yes" : "No",
      "Date Auto Bind": item.dateAutoBind,
      "Status Auto Bind": item.statusAutoBind,
      "User ID": item.userId,
      "First Name": item.firstName,
      "Last Name": item.lastName,
      "Username": item.username,
      "Nomor HP": item.nomorHp,
      "Akses Bot": item.aksesBot,
      "Status String": item.statusString,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Detail");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Detail_${witel}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const getRowValues = (item: DetailItem) => [
    item.id, item.noInet, item.alasan, item.domain, item.noTiket,
    item.nikSpv, item.district, item.clidLama, item.clidBaru,
    item.userIdPengirim, item.updateId, item.status, item.dateCreate,
    item.chatId, item.namaSpv, item.jenis, item.userIdForward,
    item.lastUpdate, item.isAutoBind ? "Yes" : "No", item.dateAutoBind,
    item.statusAutoBind, item.userId, item.firstName, item.lastName,
    item.username, item.nomorHp, item.aksesBot, item.statusString
  ];

  return (
    <main className="flex-1 p-6 min-w-0">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-black transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm font-semibold text-slate-700 tracking-wide">
            DETAIL UNBIND - TOTAL {witel?.toUpperCase()}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">{formattedDate}</p>
          <p className="text-sm font-semibold">{time.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* CARD KONTEN */}
      <div className="bg-white rounded-2xl shadow-sm p-6 min-w-0">
        {/* SEARCH & XLS */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                placeholder="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-9 pr-4 py-2 w-64 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                disabled={isSearching}
              />
            </div>
            
            {/* TOMBOL SEARCH */}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-red-500 text-white px-6 py-2 rounded-full text-sm shadow-md hover:bg-red-600 transition disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              {isSearching ? "SEARCHING..." : "SEARCH"}
            </button>
            
            {/* TOMBOL RESET */}
            {searchTerm && !isSearching && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm text-red-500 hover:text-red-600 font-semibold"
              >
                RESET
              </button>
            )}
          </div>
          
          <button
            onClick={handleDownloadXLS}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-full text-sm shadow-md hover:bg-red-600 transition"
          >
            XLS <Folder size={16} />
          </button>
        </div>

        <div className="border-t mb-4"></div>

        {/* LOADING SPINNER */}
        {isSearching ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-3 text-slate-500">Mencari data...</span>
          </div>
        ) : (
          <>
            {/* TABEL */}
            <div className="w-full overflow-x-auto">
              <table className="text-sm whitespace-nowrap">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr className="border-b border-slate-200 text-slate-600">
                    {columns.map((col) => (
                      <th key={col} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-10 text-slate-300">
                        {searchTerm ? `Tidak ada data untuk pencarian "${searchTerm}"` : "Tidak ada data"}
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((item) => (
                      <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 h-14">
                        {getRowValues(item).map((val, idx) => {
                          if (idx === 18) {
                            return (
                              <td key={idx} className="px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  val === "Yes" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                                }`}>
                                  {val}
                                </span>
                              </td>
                            );
                          } else if (idx === 11) {
                            return (
                              <td key={idx} className="px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(String(val))}`}>
                                  {val}
                                </span>
                              </td>
                            );
                          } else {
                            return <td key={idx} className="px-4">{String(val)}</td>;
                          }
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && !isSearching && (
              <div className="flex justify-end items-center gap-1 mt-5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition ${
                      currentPage === page ? "bg-red-500 text-white" : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <div className="mt-2 text-xs text-slate-400 text-right">
              {!isSearching && (
                <>
                  Menampilkan {filteredData.length} data
                  {searchTerm && ` untuk pencarian "${searchTerm}"`}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}