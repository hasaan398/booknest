import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import useLocalStorageState from "./components/Uselocalstoragestate ·/Uselocalstoragestate ·.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookDetailPage from "./pages/HomePage.jsx";
import BookEditPage from "./pages/BookEditPage.jsx";

const SAMPLE_BOOKS = [
  { id: "sample-1", title: "Atomic Habits", author: "James Clear", read: false, note: "" },
  { id: "sample-2", title: "The Alchemist", author: "Paulo Coelho", read: true, note: "" },
  { id: "sample-3", title: "Harry Potter", author: "J.K. Rowling", read: false, note: "" },
];

export default function App() {
  const [books, setBooks] = useLocalStorageState("booknest-books", SAMPLE_BOOKS);
  const [searchTerm, setSearchTerm] = useLocalStorageState("booknest-search", "");

  const titleRef = useRef(null);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleToggleRead = (id) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, read: !book.read } : book
      )
    );
  };

  const handleRemove = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const handleEdit = (id, updatedFields) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, ...updatedFields } : book
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Page 1 — Home: book list */}
        <Route
          path="/"
          element={
            <HomePage
              books={books}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              titleRef={titleRef}
              onAddBook={handleAddBook}
              onToggleRead={handleToggleRead}
              onRemove={handleRemove}
            />
          }
        />

        {/* Page 2 — Book Detail: ek book ki detail */}
        <Route
          path="/book/:id"
          element={
            <BookDetailPage
              books={books}
              onToggleRead={handleToggleRead}
              onRemove={handleRemove}
            />
          }
        />

        {/* Page 3 — Book Edit: ek book edit karo */}
        <Route
          path="/book/:id/edit"
          element={
            <BookEditPage
              books={books}
              onEdit={handleEdit}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}