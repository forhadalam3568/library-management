"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(storedBooks);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book.isbn} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <img src={book.image} alt={book.title} className="object-cover w-full h-96 rounded-lg mb-4" />
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-gray-600 mb-1">ISBN: {book.isbn}</p>
              <p className="text-gray-600 mb-4">Quantity: {book.quantity}</p>
              <Link href={`/dashboard/book/${book.isbn}`} className="block w-full bg-green-600 text-white text-center p-3 rounded-lg hover:bg-green-700 transition duration-300">
                Read The Book
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 