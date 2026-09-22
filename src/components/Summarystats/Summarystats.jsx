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

export default SummaryStats;