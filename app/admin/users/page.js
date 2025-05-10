"use client";
import { useState, useEffect } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("members") || "[]");
    setUsers(storedUsers);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users available.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.username} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h3 className="font-bold text-lg">{user.username}</h3>
                <p className="text-gray-600">Borrowing History: {user?.history?.length || 0} books</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 