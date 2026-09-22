import BookItem from "../bookitem/Bookitem.jsx";

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

export default BookList;