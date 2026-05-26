import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import Sidebar from "@/components/layout/Sidebar/Sidebar";


export default function MainLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);
  
  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      
      <div className="flex-1 flex flex-col md:ml-0">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}