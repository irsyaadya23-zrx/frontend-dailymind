// layouts/MainLayout.jsx
import AdminSidebar from "../components/adminSidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}