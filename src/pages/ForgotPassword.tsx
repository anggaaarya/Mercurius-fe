import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"verify" | "newPassword">("verify");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-5xl flex overflow-hidden">

        <div className="w-1/2 p-10 flex flex-col justify-center relative">
          <button onClick={() => navigate("/login")} className="absolute top-5 right-5 text-slate-400 hover:text-black transition">
            <X size={20} />
          </button>
          
          {/* LOGO + KEPANJANGAN - LOGO DIPERBESAR JADI w-20 */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" className="w-20 h-auto" alt="logo" />
            <p className="text-[10px] text-slate-500 leading-tight">
              Minimizing Excess Resource to<br />
              Counter Illegal Use of Service
            </p>
          </div>

          {step === "verify" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-base font-bold text-center mb-2">VERIFIKASI EMAIL</h2>
              <div>
                <p className="text-xs font-semibold mb-1">EMAIL</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400" />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1">CODE</p>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
                  className="w-1/2 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400" />
              </div>
              <button onClick={() => setStep("newPassword")}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition mt-2">
                CONFIRM
              </button>
            </div>
          )}

          {step === "newPassword" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-base font-bold text-center mb-2">NEW PASSWORD</h2>
              <div>
                <p className="text-xs font-semibold mb-1">PASSWORD</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400" />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1">RE-PASSWORD</p>
                <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400" />
              </div>
              <button onClick={() => navigate("/login")}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition mt-2">
                CONFIRM
              </button>
            </div>
          )}
        </div>

        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8">
          <img src="login-ilustrasi.png"
            alt="ilustrasi" className="w-full max-w-sm object-contain" />
        </div>

      </div>
    </div>
  );
}