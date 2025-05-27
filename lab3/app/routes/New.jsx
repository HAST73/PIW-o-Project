import { useContext, useState } from "react";
import { BookContext } from "../Contexts/BookContext";

export default function New() {
  const { setBooks } = useContext(BookContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks(prev => [...prev, {
      id: Date.now(), title, author, genre
    }]);
    setTitle(""); setAuthor(""); setGenre("");
    alert("Book added!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input className="w-full p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input className="w-full p-2 border rounded" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <select className="w-full p-2 border rounded" value={genre} onChange={e => setGenre(e.target.value)} required>
        <option value="">Select genre</option>
        <option value="fantasy">Fantasy</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="romance">Romance</option>
      </select>
      <button className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700" type="submit">
        Add Book
      </button>
    </form>
  );
}
