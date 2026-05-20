import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}