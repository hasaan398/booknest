import { useState, useEffect, useRef } from "react";
import './App.css';

const SAMPLE_BOOKS = [
  { id: "sample-1", title: "Atomic Habits", author: "James Clear", read: false },
  { id: "sample-2", title: "The Alchemist", author: "Paulo Coelho", read: true },
  { id: "sample-3", title: "Harry Potter", author: "J.K. Rowling", read: false },
];

function SummaryStats({ books }) {
  const total = books.length;
  const readCount = books.filter((b) => b.read).length;

  return (
    <div className="stats">
      <span>📚 Total: <strong>{total}</strong></span>
      <span>✅ Read: <strong>{readCount}</strong></span>
      <span>📖 Unread: <strong>{total - readCount}</strong></span>
    </div>
  );
}

function BookItem({ book, onToggleRead, onRemove }) {
  return (
    <li className={book.read ? "read" : ""}>
      <div className="book-info">
        <strong>{book.title}</strong>
        <span className="book-author">
          by {book.author || "Unknown author"}
        </span>
      </div>
      <span className={`book-status ${book.read ? "status-read" : "status-unread"}`}>
        {book.read ? "✔ Read" : "📖 Unread"}
      </span>
      <button className="btn-toggle" onClick={() => onToggleRead(book.id)}>
        {book.read ? "Mark Unread" : "Mark Read"}
      </button>
      <button className="btn-remove" onClick={() => onRemove(book.id)}>
        🗑 Remove
      </button>
    </li>
  );
}

function BookList({ books, searchTerm, onToggleRead, onRemove }) {
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredBooks.length === 0) {
    return (
      <p className="empty-msg">
        {searchTerm
          ? `No books found for "${searchTerm}"`
          : "No books yet — add one above! 📚"}
      </p>
    );
  }

  return (
    <ul>
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onToggleRead={onToggleRead}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

function AddBookForm({ onAddBook, titleRef }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Title is required!");
      return;
    }
    setError("");

    onAddBook({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      author: author.trim(),
      read: false,
    });

    setTitle("");
    setAuthor("");
    titleRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-group">
          <label htmlFor="title">Book Title *</label>
          <input
            id="title"
            ref={titleRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder="e.g. Atomic Habits"
          />
        </div>
        <div className="input-group">
          <label htmlFor="author">Author (optional)</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. James Clear"
          />
        </div>
        <button type="submit" className="btn-add">+ Add Book</button>
      </div>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────





export default function App() {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("booknest-books");
      return saved ? JSON.parse(saved) : SAMPLE_BOOKS;
    } catch {
      return SAMPLE_BOOKS;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("booknest-books", JSON.stringify(books));
  }, [books]);

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
      />
    </div>
  );
}