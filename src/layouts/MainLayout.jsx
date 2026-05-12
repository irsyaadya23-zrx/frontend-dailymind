import {useState} from "react";
import {Menu, X} from "lucide-react"

// layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col w-full overflow-x-hidden">

        {/* TOPBAR MOBILE */}
        <div className="lg:hidden flex items-center p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl bg-white shadow"
          >
            <Menu size={24} />
          </button>  
        </div>

        <main className="flex-1 lg:ml-[180px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}