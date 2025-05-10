"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ADMIN_USERS = [
  { username: "admin", password: "admin123" }, // Add more as needed
];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      if (user.role === "admin") {
        router.push("/admin/books");
      } else {
        router.push("/dashboard");
      }
    }
  }, [router]);

  function handleSubmit(e) {
    e.preventDefault();
    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("user", JSON.stringify({ username, role }));
        router.push("/admin/books");
      } else {
        alert("Invalid admin credentials");
      }
    } else {
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      const member = members.find(m => m.username === username && m.password === password);
      if (member) {
        localStorage.setItem("user", JSON.stringify({ ...member, role: "member" }));
        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to BookHaven</h1>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {role === "admin" && (
            <p className="text-sm text-gray-600">Demo Admin: admin / admin123</p>
          )}
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
} 