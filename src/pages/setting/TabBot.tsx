import { useState } from "react";

export default function TabBot() {
  // State untuk Telegram Bot
  const [botStatus, setBotStatus] = useState(true);
  const [durationUnbind, setDurationUnbind] = useState("3 Days");
  const [automaticBind, setAutomaticBind] = useState("24 Hours");

  const durationOptions = ["1 Day", "2 Days", "3 Days", "5 Days", "7 Days", "14 Days", "30 Days"];
  const bindOptions = ["1 Hour", "6 Hours", "12 Hours", "24 Hours", "48 Hours"];

  return (
    <div className="flex flex-col gap-8">
      
      {/* BOT STATUS - SWITCH BUTTON */}
      <div>
        <p className="text-sm font-bold mb-3">BOT STATUS</p>
        <button
          onClick={() => setBotStatus(!botStatus)}
          className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex items-center px-1 ${
            botStatus ? "bg-red-500" : "bg-slate-300"
          }`}
        >
          {botStatus && (
            <span className="absolute left-2 text-white text-[10px] font-bold">ON</span>
          )}
          <span
            className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
              botStatus ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* DURATION UNBIND REQUEST */}
      <div>
        <p className="text-sm font-bold mb-3">DURATION UNBIND REQUEST</p>
        <div className="relative w-48">
          <select
            value={durationUnbind}
            onChange={(e) => setDurationUnbind(e.target.value)}
            className="w-full border border-slate-300 rounded-full px-5 py-2 text-sm appearance-none cursor-pointer focus:outline-none focus:border-red-400"
          >
            {durationOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
        </div>
      </div>

      {/* AUTOMATIC BIND */}
      <div>
        <p className="text-sm font-bold mb-3">AUTOMATIC BIND</p>
        <div className="relative w-48">
          <select
            value={automaticBind}
            onChange={(e) => setAutomaticBind(e.target.value)}
            className="w-full border border-slate-300 rounded-full px-5 py-2 text-sm appearance-none cursor-pointer focus:outline-none focus:border-red-400"
          >
            {bindOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
        </div>
      </div>

      {/* STATUS CONNECTED */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
        <span className="text-sm text-slate-600">Status : Connected</span>
      </div>

    </div>
  );
}