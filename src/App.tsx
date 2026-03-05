import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayouts from "./layouts/Mainlayouts";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Users from "./pages/Users";
import Setting from "./pages/setting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth pages - tanpa sidebar & footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main pages - dengan sidebar & footer */}
        <Route element={<MainLayouts />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/detail/:witel" element={<Detail />} />
        </Route>

        {/* Redirect root ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;