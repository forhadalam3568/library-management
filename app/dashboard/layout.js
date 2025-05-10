"use client";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-600">BookHaven Library</h2>
        <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition duration-300">Logout</button>
      </header>
      <main className="p-8">{children}</main>
    </div>
  );
} 