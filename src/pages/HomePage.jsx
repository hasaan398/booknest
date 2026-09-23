import { useParams, useNavigate } from "react-router-dom";

export default function BookDetailPage({ books, onToggleRead, onRemove }) {
  const { id } = useParams();       // URL se book id lo — /book/123 → id = "123"
  const navigate = useNavigate();   // page change karne ke liye

  // Us book ko dhoondo jiska id match kare
  const book = books.find((b) => b.id === id);

  // Agar book nahi mili (wrong URL) toh message dikhao
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

  const handleRemove = () => {
    onRemove(book.id);
    navigate("/"); // remove ke baad home pe jao
  };

  return (
    <div className="app">
      <div className="detail-wrap">

        {/* Back button */}
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        {/* Book detail card */}
        <div className="detail-card">
          <h2>{book.title}</h2>
          <p className="detail-author">✍️ by {book.author || "Unknown author"}</p>

          <span className={`book-status ${book.read ? "status-read" : "status-unread"}`}>
            {book.read ? "✔ Read" : "📖 Unread"}
          </span>

          {book.note && (
            <p className="detail-note">📝 {book.note}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="detail-actions">
          <button className="btn-toggle" onClick={() => onToggleRead(book.id)}>
            {book.read ? "Mark Unread" : "Mark Read"}
          </button>

          {/* Edit button — edit page pe jao */}
          <button className="btn-edit" onClick={() => navigate(`/book/${book.id}/edit`)}>
            ✏️ Edit Book
          </button>

          <button className="btn-remove" onClick={handleRemove}>
            🗑 Remove Book
          </button>
        </div>

      </div>
    </div>
  );
}