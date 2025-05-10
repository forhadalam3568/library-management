"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookDetailsPage({ params }) {
  const [book, setBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const foundBook = books.find(b => b.isbn === params.isbn);
    if (foundBook) {
      setBook(foundBook);
    } else {
      router.push("/dashboard");
    }
  }, [params.isbn, router]);

  if (!book) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {book.image && (
            <img
              src={book.image}
              alt={book.title}
              className="w-full md:w-1/2 h-auto rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Author:</span> {book.author}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">ISBN:</span> {book.isbn}</p>
            <p className="text-gray-700 mb-4"><span className="font-semibold">Available Quantity:</span> {book.quantity}</p>
            {book.description && (
              <p className="text-gray-600 mb-6">{book.description}</p>
            )}
            {book.url && (
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Read or Buy the Book
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
