import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-10">
      {/* Atmósfera cálida de fondo */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />

      <Outlet />
    </main>
  );
}
