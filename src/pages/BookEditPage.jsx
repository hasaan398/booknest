import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormField from "../components/Formfield/Formfield.jsx";

export default function BookEditPage({ books, onEdit }) {
  const { id } = useParams();       // URL se book id lo
  const navigate = useNavigate();   // page change karne ke liye

  // Us book ko dhoondo
  const book = books.find((b) => b.id === id);

  // Edit fields ka state — book ki current values se start karo
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [note, setNote] = useState(book?.note || "");
  const [error, setError] = useState("");

  // Agar book nahi mili
  if (!book) {
    return (
      <div className="app">
        <div className="detail-wrap">
          <p>Book not found!</p>
          <button className="btn-back" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title is required!");
      return;
    }
    setError("");

    // App mein update karo
    onEdit(book.id, {
      title: title.trim(),
      author: author.trim(),
      note: note.trim(),
    });

    // Save ke baad detail page pe wapas jao
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="app">
      <div className="detail-wrap">

        {/* Back button */}
        <button className="btn-back" onClick={() => navigate(`/book/${book.id}`)}>
          ← Cancel
        </button>

        <h2>✏️ Edit Book</h2>

        {/* Form fields — FormField component reuse ho raha hai */}
        <div className="edit-page-form">
          <FormField
            id="edit-title"
            label="Book Title *"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder="e.g. Atomic Habits"
          />
          <FormField
            id="edit-author"
            label="Author (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. James Clear"
          />
          <FormField
            id="edit-note"
            label="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Borrowed from a friend"
          />

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-add" onClick={handleSave}>
            💾 Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}