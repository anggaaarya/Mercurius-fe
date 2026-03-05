import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import TabBot from "./TabBot";
import TabGrup from "./TabGrup";
import TabAdmin from "./TabAdmin";
import TabUser from "./TabUser";

export default function Setting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"bot" | "grup" | "admin" | "user">("bot");
  const [userRole, setUserRole] = useState("");
  
  // Clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Ambil role user dari localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role);
    }
  }, []);

  const formattedDate = time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="flex-1 p-6">

      {/* ===== HEADER ===== */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-black transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* 4 TAB NAVIGASI */}
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("bot")}
              className={`text-sm font-bold pb-1 border-b-2 transition ${
                activeTab === "bot"
                  ? "border-black text-black"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              TELEGRAM BOT
            </button>
            <button
              onClick={() => setActiveTab("grup")}
              className={`text-sm font-bold pb-1 border-b-2 transition ${
                activeTab === "grup"
                  ? "border-black text-black"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              GRUP TELEGRAM APPROVE
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`text-sm font-bold pb-1 border-b-2 transition ${
                activeTab === "admin"
                  ? "border-black text-black"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              LIST ADMIN
            </button>
            <button
              onClick={() => setActiveTab("user")}
              className={`text-sm font-bold pb-1 border-b-2 transition ${
                activeTab === "user"
                  ? "border-black text-black"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              LIST USER
            </button>
          </div>
        </div>

        {/* JAM */}
        <div className="text-right">
          <p className="text-xs text-slate-500">{formattedDate}</p>
          <p className="text-sm font-semibold">{time.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* ===== CONTENT (ISI TAB) ===== */}
      <div className="bg-white rounded-2xl shadow-sm px-8 py-8 min-h-[480px]">
        {activeTab === "bot" && <TabBot />}
        {activeTab === "grup" && <TabGrup userRole={userRole} />}
        {activeTab === "admin" && <TabAdmin userRole={userRole} />}
        {activeTab === "user" && <TabUser userRole={userRole} />}
      </div>

    </main>
  );
}