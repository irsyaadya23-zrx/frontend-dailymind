// layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <main className="flex-1 p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}