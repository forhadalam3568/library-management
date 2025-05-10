"use client";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = useMemo(() => [
    { label: "Books", href: "/admin/books", icon: "📚" },
    { label: "Users", href: "/admin/users", icon: "👥" }
  ], []);

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-100 to-white h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-blue-600 mb-8 tracking-wide">BookHaven Admin</h2>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium
                    ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition font-medium"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
