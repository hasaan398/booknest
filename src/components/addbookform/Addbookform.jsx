import { useState } from "react";
import FormField from "../Formfield/Formfield.jsx";

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

export default AddBookForm;