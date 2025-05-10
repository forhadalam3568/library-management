"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-8">Welcome to BookHaven</h1>
          <p className="text-xl text-white mb-12">Your Digital Sanctuary for Books</p>
          <div className="space-x-4">
            <Link href="/login" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Login
            </Link>
            <Link href="/register" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
