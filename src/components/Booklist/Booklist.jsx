import { useNavigate } from "react-router-dom";

export default function BookList({ books, searchTerm, onToggleRead, onRemove }) {
  const navigate = useNavigate();

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
        <li key={book.id} className={book.read ? "read" : ""}>
          <div className="book-info">
            {/* Title pe click karo — detail page pe jao */}
            <strong
              className="book-title-link"
              onClick={() => navigate(`/book/${book.id}`)}
            >
              {book.title}
            </strong>
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

          {/* Edit — seedha edit page pe jao */}
          <button className="btn-edit" onClick={() => navigate(`/book/${book.id}/edit`)}>
            ✏️ Edit
          </button>

          <button className="btn-remove" onClick={() => onRemove(book.id)}>
            🗑 Remove
          </button>
        </li>
      ))}
    </ul>
  );
}