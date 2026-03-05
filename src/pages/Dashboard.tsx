import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Data dummy dengan tanggal berjarak
const allData = [
  { id: 1,  witel: "Bandung",          order: 380, success: 290, fail: 5,  rejected: 70,  unrespond: 15, date: "2026-01-05" },
  { id: 2,  witel: "Bekasi",           order: 410, success: 320, fail: 8,  rejected: 65,  unrespond: 17, date: "2026-01-10" },
  { id: 3,  witel: "Bogor",            order: 360, success: 280, fail: 3,  rejected: 60,  unrespond: 17, date: "2026-01-15" },
  { id: 4,  witel: "Cirebon",          order: 290, success: 210, fail: 2,  rejected: 55,  unrespond: 23, date: "2026-01-20" },
  { id: 5,  witel: "Karawang",         order: 310, success: 230, fail: 4,  rejected: 58,  unrespond: 18, date: "2026-01-25" },
  { id: 6,  witel: "Northern Jakarta", order: 520, success: 400, fail: 10, rejected: 80,  unrespond: 30, date: "2026-02-01" },
  { id: 7,  witel: "Serang",           order: 448, success: 310, fail: 0,  rejected: 130, unrespond: 8,  date: "2026-02-08" },
  { id: 8,  witel: "Soreang",          order: 275, success: 200, fail: 2,  rejected: 50,  unrespond: 23, date: "2026-02-15" },
  { id: 9,  witel: "Southern Jakarta", order: 490, success: 370, fail: 7,  rejected: 90,  unrespond: 23, date: "2026-02-22" },
  { id: 10, witel: "Tangerang",        order: 430, success: 340, fail: 6,  rejected: 68,  unrespond: 16, date: "2026-03-01" },
  { id: 11, witel: "Tasikmalaya",      order: 260, success: 190, fail: 1,  rejected: 48,  unrespond: 21, date: "2026-03-05" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState([{ startDate: null, endDate: null, key: "selection" }]);
  const [selectedRange, setSelectedRange] = useState([{ startDate: null, endDate: null, key: "selection" }]);
  const [filteredData, setFilteredData] = useState(allData);
  const [time, setTime] = useState(new Date());
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role);
    }
  }, []);

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

  const handleSearch = () => {
    const start = selectedRange[0].startDate;
    const end = selectedRange[0].endDate;

    if (!start || !end) {
      setFilteredData(allData);
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59);

    const result = allData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    setFilteredData(result);
  };

  const formatDate = (date: any) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  const handleDetail = (item: any) => {
    navigate(`/detail/${item.witel}`);
  };

  return (
    <main className="flex-1 p-6">
      {/* FILTER + JAM */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 flex justify-between">
        <div className="flex items-end gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">PERIODE</p>
            <div className="relative">
              <input
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                className="border rounded-lg px-3 py-2 text-sm w-56 cursor-pointer"
                placeholder="DD/MM/YY - DD/MM/YY"
                value={
                  selectedRange[0].startDate && selectedRange[0].endDate
                    ? `${formatDate(selectedRange[0].startDate)} - ${formatDate(selectedRange[0].endDate)}`
                    : ""
                }
              />

              {showCalendar && (
                <div className="absolute top-12 z-50 bg-white rounded-xl shadow-lg p-4">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item: any) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                  />
                  <div className="flex justify-end mt-3 gap-2">
                    <button
                      onClick={() => {
                        setRange([{ startDate: null, endDate: null, key: "selection" }]);
                        setSelectedRange([{ startDate: null, endDate: null, key: "selection" }]);
                        setFilteredData(allData);
                        setShowCalendar(false);
                      }}
                      className="px-3 py-2 text-sm text-slate-500 hover:text-black"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRange(range);
                        setShowCalendar(false);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
                    >
                      Save dates
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-red-500 text-white px-6 py-2 rounded-full text-sm shadow-md hover:bg-red-600 transition"
          >
            SEARCH
          </button>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">{formattedDate}</p>
          <p className="text-sm font-semibold">{time.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-4">
        <table className="w-full text-sm">
          <thead className="text-slate-500">
            <tr className="border-b border-slate-100">
              <th className="text-left py-3">No</th>
              <th className="text-left">District</th>
              <th>Order</th>
              <th>Success</th>
              <th>Fail</th>
              <th>Rejected</th>
              <th>Unrespond</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-slate-300 text-sm">
                  Tidak ada data untuk periode yang dipilih
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id} className="border-b border-slate-100 h-14">
                  <td>{index + 1}</td>
                  <td>{item.witel}</td>
                  <td className="text-center">{item.order}</td>
                  <td className="text-center">{item.success}</td>
                  <td className="text-center">{item.fail}</td>
                  <td className="text-center">{item.rejected}</td>
                  <td className="text-center">{item.unrespond}</td>
                  <td className="text-center">
                    {userRole === "user" ? (
                      <span className="text-slate-300 text-xs">-</span>
                    ) : (
                      <button
                        onClick={() => handleDetail(item)}
                        className="bg-red-500 text-white w-9 h-9 flex items-center justify-center rounded-lg mx-auto hover:bg-red-600"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* INFO TOTAL DATA */}
        <div className="flex justify-between items-center mt-4 text-xs text-slate-400">
          <div>
            Menampilkan {filteredData.length} dari {allData.length} data
          </div>
          {selectedRange[0].startDate && selectedRange[0].endDate && (
            <div>
              Periode: {formatDate(selectedRange[0].startDate)} - {formatDate(selectedRange[0].endDate)}
            </div>
          )}
        </div>

        {userRole === "user" && (
          <p className="text-xs text-slate-400 text-center mt-4 italic">
            * Anda hanya dapat melihat data ringkasan
          </p>
        )}
      </div>
    </main>
  );
}