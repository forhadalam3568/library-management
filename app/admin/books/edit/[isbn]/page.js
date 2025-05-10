"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditBookPage({ params }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const book = books.find(b => b.isbn === params.isbn);
    if (book) {
      setTitle(book.title);
      setPrice(book.price);
      setImage(book.image);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setQuantity(book.quantity.toString());
      setDescription(book.description || "");
      setUrl(book.url || "");
    }
  }, [params.isbn]);

  function handleSubmit(e) {
    e.preventDefault();
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const index = books.findIndex(b => b.isbn === params.isbn);
    if (index !== -1) {
      books[index] = { title, image, author, isbn, quantity: parseInt(quantity, 10), description, url, price };
      localStorage.setItem("books", JSON.stringify(books));
      router.push("/admin/books");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Edit Book</h1>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
         <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
       
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Book URL (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">Update Book</button>
      </form>
    </div>
  );
} 