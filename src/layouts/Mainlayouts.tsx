import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function MainLayouts() {
  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">

      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        <Outlet />

        <Footer />

      </div>

    </div>
  )
}