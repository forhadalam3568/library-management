"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(storedBooks);
  }, []);

  function handleDelete(isbn) {
    const updatedBooks = books.filter(book => book.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Books Management</h1>
          <Link
            href="/admin/books/add"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
          >
            + Add Book
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">No books available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book.isbn}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                    <Link href={`/admin/books/edit/${book.isbn}`} className="text-blue-600 hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                  </div>
                  <p className="text-gray-600 mb-1">Author: {book.author}</p>
                  <p className="text-gray-600 mb-1">ISBN: {book.isbn}</p>
                  <p className="text-gray-600 mb-4">Quantity: {book.quantity}</p>
                  <button
                    onClick={() => handleDelete(book.isbn)}
                    className="mt-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
