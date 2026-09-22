import { useState } from "react";
import FormField from "../Formfield/Formfield.jsx";

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

export default BookItem;