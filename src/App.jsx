import { useState, useEffect, useRef } from "react";
import './App.css';

const SAMPLE_BOOKS = [
  { id: "sample-1", title: "Atomic Habits", author: "James Clear", read: false, note: "" },
  { id: "sample-2", title: "The Alchemist", author: "Paulo Coelho", read: true, note: "" },
  { id: "sample-3", title: "Harry Potter", author: "J.K. Rowling", read: false, note: "" },
];
    


function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });



  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}



function FormField({ id, label, value, onChange, placeholder, inputRef, ...rest }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}

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

function BookItem({ book, onToggleRead, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(book.title);
  const [editAuthor, setEditAuthor] = useState(book.author);
  const [editNote, setEditNote] = useState(book.note || "");

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(book.id, {
      title: editTitle.trim(),
      author: editAuthor.trim(),
      note: editNote.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditNote(book.note || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className={book.read ? "read" : ""}>
        <div className="edit-form">
          <FormField
            id={`edit-title-${book.id}`}
            label="Book Title *"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="e.g. Atomic Habits"
          />
          <FormField
            id={`edit-author-${book.id}`}
            label="Author"
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
            placeholder="e.g. James Clear"
          />
          <FormField
            id={`edit-note-${book.id}`}
            label="Note (optional)"
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
            placeholder="e.g. Borrowed from a friend"
          />
          <div className="edit-actions">
            <button className="btn-add" onClick={handleSave}>💾 Save</button>
            <button className="btn-remove" onClick={handleCancel}>✖ Cancel</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={book.read ? "read" : ""}>
      <div className="book-info">
        <strong>{book.title}</strong>
        <span className="book-author">
          by {book.author || "Unknown author"}
        </span>
        {book.note && (
          <span className="book-note">📝 {book.note}</span>
        )}
      </div>
      <span className={`book-status ${book.read ? "status-read" : "status-unread"}`}>
        {book.read ? "✔ Read" : "📖 Unread"}
      </span>
      <button className="btn-toggle" onClick={() => onToggleRead(book.id)}>
        {book.read ? "Mark Unread" : "Mark Read"}
      </button>
      <button className="btn-edit" onClick={() => setIsEditing(true)}>
        ✏️ Edit
      </button>
      <button className="btn-remove" onClick={() => onRemove(book.id)}>
        🗑 Remove
      </button>
    </li>
  );
}

function BookList({ books, searchTerm, onToggleRead, onRemove, onEdit }) {
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
           onEdit={onEdit}
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
                   note: "",
             });

        setTitle("");
        setAuthor("");
    titleRef.current.focus();
  };

   return (
    <form onSubmit={handleSubmit}>
        <div className="form-row">
          <FormField
            id="title"
          label="Book Title *"
            value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
             placeholder="e.g. Atomic Habits"
          inputRef={titleRef}
           />
            <FormField
            id="author"
          label="Author (optional)"
                value={author}
            onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. James Clear"
              />
        <button type="submit" className="btn-add">+ Add Book</button>
         </div>
      {error && <p className="error-msg">{error}</p>}
       </form>
  );
}

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
                            <h1>📚 BkNest</h1>
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