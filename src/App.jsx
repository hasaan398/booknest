import { useEffect, useRef } from "react";
import './App.css';

import useLocalStorageState from "./components/Uselocalstoragestate ·/Uselocalstoragestate ·.jsx";
import SummaryStats from "./components/Summarystats/Summarystats.jsx";
import AddBookForm from "./components/addbookform/Addbookform.jsx";
import BookList from "./components/Booklist/Booklist.jsx";

const SAMPLE_BOOKS = [
  { id: "sample-1", title: "Atomic Habits", author: "James Clear", read: false, note: "" },
  { id: "sample-2", title: "The Alchemist", author: "Paulo Coelho", read: true, note: "" },
  { id: "sample-3", title: "Harry Potter", author: "J.K. Rowling", read: false, note: "" },
];

export default function App() {
  const [books, setBooks] = useLocalStorageState("booknest-books", SAMPLE_BOOKS);
  const [searchTerm, setSearchTerm] = useLocalStorageState("booknest-search", "");

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

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
    <div className="app">
      <header>
        <h1>📚 BookNest</h1>
        <p>Your personal reading list tracker</p>
      </header>

      <SummaryStats books={books} />

      <AddBookForm onAddBook={handleAddBook} titleRef={titleRef} />

      <div className="search-wrap">
        <label htmlFor="search">🔍 Search by title</label>
        <input
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g. Harry..."
        />
      </div>

      <BookList
        books={books}
        searchTerm={searchTerm}
        onToggleRead={handleToggleRead}
        onRemove={handleRemove}
        onEdit={handleEdit}
      />
    </div>
  );
}